import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo  ",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;