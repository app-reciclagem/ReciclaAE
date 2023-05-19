import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/userRoutes";

const app = express();
dotenv.config();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(routes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});