import api from "../api/axios.js";
import { useForm } from "react-hook-form";
import signupSchema from "../schemas/signupSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    clearErrors,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(formData) {
    try {
      const res = await api.post("/signup", formData);
      const userData = res.data.data.user;
      setData(userData);
      console.log("Signup successful ✅", userData);
    } catch (error) {
      console.error("Signup error ❌", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-[#FAF9FB] text-[#111827] flex justify-center items-center">
      <div className="bg-[#FFFFFF] w-[380px] p-4 flex flex-col items-center rounded-xl border border-gray-200 shadow-md">
        <h1 className="text-3xl font-semibold">Signup</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6 mt-6 w-full"
        >
          {/* Name Input */}
          <input
            className="w-[90%] bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              onChange: () => clearErrors("name"),
            })}
          />
          {dirtyFields.name && errors.name && (
            <p className="text-red-600 text-sm mt-1 ml-1">
              {errors.name.message}
            </p>
          )}

          {/* Email Input */}
          <input
            className="w-[90%] bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              onChange: () => clearErrors("email"),
            })}
          />
          {dirtyFields.email && errors.email && (
            <p className="text-red-600 text-sm mt-1 ml-1">
              {errors.email.message}
            </p>
          )}

          {/* Password Input */}
          <input
            className="w-[90%] bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              onChange: () => clearErrors("password"),
            })}
          />
          {dirtyFields.password && errors.password && (
            <p className="text-red-600 text-sm mt-1 ml-1">
              {errors.password.message}
            </p>
          )}

          {/* Submit */}
          <input
            className="w-[90%] bg-blue-600 py-3 cursor-pointer text-[#FFFFFF] text-xl rounded-lg hover:bg-blue-700"
            type="submit"
            value="Signup"
          />
        </form>

        <p className="mt-3 text-[#111827]">
          Existing user?{" "}
          <span className="text-blue-500 cursor-pointer">Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
