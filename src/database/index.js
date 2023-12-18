import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://oghenevictor54p:123456782023@cluster0.9b9ob13.mongodb.net/";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Database connection established"))
    .catch((err) =>
      console.log(`Getting Erro from DB connection failed: ${err.message}`)
    );
};

export default connectToDB;
