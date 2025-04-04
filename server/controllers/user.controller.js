// Importa o modelo do usuário para interagir com o banco de dados
import UserModel from "../models/user.model.js";

// Importa a biblioteca bcrypt para hashing de senhas
import bcrypt from "bcryptjs";

// Importa a função para enviar emails
import sendEmail from "../config/sendEmail.js";

// Importa o template do email de verificação
import verifyEmailTemplate from "./../utils/verifyEmailTemplate.js";

// Importa funções para gerar tokens de acesso e atualização
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";

// Importa dotenv para carregar variáveis de ambiente
import dotenv from "dotenv";
dotenv.config();

// Controller para registrar um novo usuário
export async function registerUserController(req, res) {
  try {
    // Obtém os dados do corpo da requisição
    const { name, email, password } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    // Verifica se o usuário já existe no banco de dados
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    // Gera um hash para a senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Cria o objeto com os dados do novo usuário
    const payload = {
      name,
      email,
      password: hashPassword,
    };

    // Cria uma nova instância do usuário e salva no banco de dados
    const newUser = new UserModel(payload);
    const save = await newUser.save();

    // Gera um link de verificação de email
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    // Envia email de verificação para o usuário
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify your email",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    // Retorna resposta de sucesso
    return res.json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    // Retorna erro interno do servidor
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Controller para verificar email do usuário
export async function verifyEmailController(req, res) {
  try {
    // Obtém o código de verificação do corpo da requisição
    const { code } = req.body;

    // Procura o usuário no banco de dados com base no código fornecido
    const user = await UserModel.findOne({ _id: code });

    // Se o usuário não for encontrado, retorna erro
    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    // Atualiza o status de verificação do email no banco de dados
    const updatedUser = await UserModel.findOne(
      { _id: code },
      { verify_email: true }
    );

    // Retorna sucesso
    return res.json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    // Retorna erro interno do servidor
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Controller para login de usuário
export async function loginController(req, res) {
  try {
    // Obtém email e senha do corpo da requisição
    const { email, password } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    // Busca o usuário pelo email no banco de dados
    const user = await UserModel.findOne({ email });

    // Se o usuário não for encontrado, retorna erro
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    // Verifica se a conta do usuário está ativa
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Sorry, your account is not active, contact support",
        error: true,
        success: false,
      });
    }

    // Compara a senha fornecida com a senha armazenada no banco
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Se a senha estiver incorreta, retorna erro
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is incorrect",
        error: true,
        success: false,
      });
    }

    // Gera tokens de acesso e atualização
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // Configurações para armazenar os tokens como cookies
    const cookieOptions = {
      httpOnly: true, // Impede acesso via JavaScript (proteção contra XSS)
      secure: true, // Requer HTTPS
      sameSite: "None", // Permite envio de cookies entre diferentes domínios
    };

    // Armazena os tokens nos cookies
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // Retorna sucesso com os tokens gerados
    return res.json({
      message: "User logged in successfully",
      error: false,
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    // Retorna erro interno do servidor
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Controller para logout do usuário
export async function logoutController(req, res) {
  try {
    // Obtém o ID do usuário autenticado
    const userId = req.userId;

    // Configurações para limpar os cookies
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // Remove os cookies de tokens
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    // Remover o token de atualização do banco de dados
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    // Retorna sucesso ao deslogar o usuário
    return res.json({
      message: "User logged out successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    // Retorna erro interno do servidor
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file; // A imagem deve ser enviada como um arquivo no corpo da requisição

    const upload = await uploadImageCloudinary(image); // Faz o upload da imagem para o Cloudinary

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: upload.url } // Atualiza o campo avatar com o caminho da imagem
    );

    return res.json({
      message: "Avatar uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url, // Retorna o caminho da imagem
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, phone, password } = req.body; // Obtém os dados do corpo da requisição

    let hashPassword = ""; // Inicializa a variável hashPassword

    if (password) {
      const salt = await bcrypt.genSalt(10); // Gera um salt para o hash
      hashPassword = await bcrypt.hash(password, salt); // Faz o hash da senha
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }), // Atualiza o nome se fornecido
        ...(email && { email: email }), // Atualiza o nome se fornecido
        ...(phone && { phone: phone }), // Atualiza o nome se fornecido
        ...(password && { password: hashPassword }), // Atualiza o nome se fornecido
      }
    );

    return res.json({
      message: "UPDATE SUCESS",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body; // Obtém o email do corpo da requisição

    // Procura o usuário no banco de dados com base no email fornecido
    const user = await UserModel.findOne({ email: email });

    // Se o usuário nao for encontrado, retorna erro
    if (!user) {
      return res.status(404).json({
        message: "Email not found",
        error: true,
        success: false,
      });
    }

    const otp = generateOtp(); // Gera um OTP aleatório
    const expireTimeOtp = new Date(Date.now() + 10 * 60 * 1000); // Define o tempo de expiração do OTP (10 minutos)

    const updateOtp = await UserModel.updateOne(
      user._id,
      { otp: otp, otpExpireTime: expireTimeOtp } // Atualiza o OTP e o tempo de expiração no banco de dados
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
