import dotenv from "dotenv";
dotenv.config();
import app from "./Src/app.js";
import connectDb from "./Src/Config/db.js";
const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Server connection error ${error.message}`)
  }
}

startServer();