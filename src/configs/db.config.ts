import mongoose from "mongoose";
export const connectDb = () => {
  mongoose.connect(
    "mongodb+srv://anhchangcut:nhut.nguyenpro@cluster0.hg4krsi.mongodb.net/testDB"
  );
  console.log("DB connected !!!");
};
