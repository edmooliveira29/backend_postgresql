import { config } from "dotenv";
import "./src/database/data-source"
import { conection } from "./src/database/data-source";
import { app } from "./src";
import{env} from 'node:process';
config()


const PORT_SERVER = env.PORT_BACKEND_EXPRESS

async function startServer() {
  try {
    await conection.initialize();
    console.log(`Database connection successfully!!`);
    app.listen(3000, () =>
      console.log(`Server is running successfully on port ${PORT_SERVER}!`)
    );

  } catch (error) {
    console.error("❌ Erro ao conectar: ", error)
  }
}

startServer();