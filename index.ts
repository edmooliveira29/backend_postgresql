import { config } from "dotenv";
import "./src/database/data-source"
import { conection } from "./src/database/data-source";
import { app } from "./src";
import{env} from 'node:process';
config()

const PORT_SERVER = env.PORT_BACKEND_EXPRESS
const PORT_DB = env.POSTGRES_PORT_DEVELOPMENT
let HOST = env.POSTGRES_HOST_DEVELOPMENT

if (env.NODE_ENV === "production") {
  HOST = env.POSTGRES_HOST_PRODUCTION
}

async function startServer() {
  try {

    await conection.initialize();
    console.log(`Database connection successfully established at ${HOST}:${PORT_DB}`);
    app.listen(3000, () =>
      console.log(`Server is running successfully on port ${PORT_SERVER}!`)
    );

  } catch (error) {
    console.error("❌ Erro ao conectar", error)
  }
}

startServer();