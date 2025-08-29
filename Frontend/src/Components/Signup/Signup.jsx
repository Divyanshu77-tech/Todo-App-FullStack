import { useForm, FormProvider } from "react-hook-form";
import signupSchema from "../../schemas/signupSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import LoadingPage from "../LoadingPage.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(formData) {
    try {
      const res = await dispatch(signupUser(formData)).unwrap();
      if (res.success && !loading) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Signup error ❌", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-[#FAF9FB] text-[#111827] flex justify-center items-center">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="bg-[#FFFFFF] w-[380px] p-4 flex flex-col items-center rounded-xl border border-gray-200 shadow-md">
          <h1 className="text-3xl font-semibold">Signup</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-6 mt-6 w-full"
            >
              {/* Name Input */}
              <InputField
                name="name"
                type="text"
                placeholder="Enter your name"
              />

              {/* Email Input */}

              <InputField
                name="email"
                type="text"
                placeholder="Enter your email"
              />
              {/* Password Input */}
              <InputField
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Submit */}
              <input
                className="w-[90%] bg-blue-600 py-3 cursor-pointer text-[#FFFFFF] text-xl rounded-lg hover:bg-blue-700"
                type="submit"
                value="Signup"
              />
            </form>
          </FormProvider>

          <p className="mt-3 text-[#111827]">
            Existing user?{" "}
            <span className="text-blue-500 cursor-pointer">Sign in</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;
