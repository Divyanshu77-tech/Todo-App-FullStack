import { useState } from "react";
import api from "../api/axios.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/signup", { name, email, password });
      const userData = res.data.data.user;
      setData(userData);
    } catch (error) {
      console.log(`Signup error - ${error}`);
    }
  }
  return (
    <>
      <div
        id="container"
        className="w-screen h-screen bg-[#FAF9FB] text-[#111827] flex justify-center items-center"
      >
        <div
          id="wrapper"
          className="bg-[#FFFFFF]  w-[360px] h-[400px] flex flex-col items-center rounded-xl border-1 border-gray-200 shadow-md"
        >
          <h1 className="text-3xl font-sembold mt-6">Signup</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 mt-6 w-full"
          >
            <input
              className="w-[90%] bg-gray-50 border-gray-300 border-1 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
              type="text"
              placeholder="Enter your name."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="w-[90%] bg-gray-50 border-gray-300 border-1 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
              type="email"
              placeholder="Enter your email."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="w-[90%] bg-gray-50 border-gray-300 border-1 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
              type="password"
              placeholder="Enter your password."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="w-[90%] bg-blue-600 py-3 cursor-pointer text-[#FFFFFF] text-xl rounded-lg hover:bg-blue-700 "
              type="Submit"
            />
          </form>
          <p className="mt-3 text-[#111827]">
            Existing user ? <span className="text-blue-500 cursor-pointer">sign in</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
