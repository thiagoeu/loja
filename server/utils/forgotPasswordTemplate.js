const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <p> Prezado(a) ${name},</p>
    <p> Foi solicitado o reset de senha da sua conta, seu codigo de verificação:</p>
    <h2>  ${otp} </h2>
    <p> este codigo tem validade por 60 minutos </p>
    <br>
    <p> Atenciosamente Comercio.</p>
    `;
};

export default forgotPasswordTemplate;
