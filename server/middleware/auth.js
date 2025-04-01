import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
    // Obtém o token do cookie ou do header de autorização

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id; // Armazena o ID do usuário no objeto de requisição
    next(); // Chama o próximo middleware ou rota
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: true,
      success: false,
    });
  }
};

export default auth;
