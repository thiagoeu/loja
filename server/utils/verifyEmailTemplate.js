const verifyEmailTemplate = ({ name, url }) => {
  return `
    <p> Prezado(a) ${name},</p>
    <p> Obrigado por se cadastrar no comercio, Estamos felizes em tê-lo(a) conosco.</p>
    <a href=${url}> Clique aqui para verificar seu email</a>
    
    `;
};

export default verifyEmailTemplate;
