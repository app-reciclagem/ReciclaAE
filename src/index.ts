import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/userRoutes";
import errorHandlingMiddleware from "./middlewares/errorHandling";

const app = express();
dotenv.config();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(routes);

app.use(errorHandlingMiddleware);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
