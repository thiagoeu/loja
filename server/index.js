// Importa a função para conectar ao MongoDB
import connectDB from "./config/connectDB.js";

// Importa as rotas do usuário
import userRouter from "./routes/user.route.js";

// Cria a instância do aplicativo Express
const app = express();

// Configura o middleware CORS para permitir requisições do frontend
app.use(
  cors({
    credentials: true, // Permite envio de cookies e autenticação entre domínios
    origin: process.env.FRONTEND_URL, // Define qual URL pode acessar a API
  })
);

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// Middleware para lidar com cookies nas requisições
app.use(cookieParser());

// Middleware para registrar logs das requisições no console
app.use(morgan());

// Middleware de segurança que adiciona cabeçalhos HTTP para proteção contra ataques
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Permite que recursos sejam carregados de diferentes origens
  })
);

// Define a porta do servidor, priorizando a variável de ambiente (se existir)
const PORT = 8080 || process.env.PORT;

// Define uma rota GET para a raiz do servidor
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" }); // Retorna um JSON de boas-vindas
});

// Usa as rotas definidas no userRouter para a rota base "/api/user"
app.use("/api/user", userRouter);

// Conecta ao MongoDB antes de iniciar o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Mensagem exibida no console ao iniciar
  });
});
