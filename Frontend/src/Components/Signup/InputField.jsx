import { useFormContext } from "react-hook-form";

const InputField = ({ name, type, placeholder }) => {
  const {
    register,
    formState: { errors, dirtyFields },
    clearErrors,
  } = useFormContext();
  return (
    <>
      <input
        className="w-[90%] bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-3 rounded-lg"
        type={type}
        placeholder={placeholder}
        {...register(name, {
          onChange: () => clearErrors(name),
        })}
      />
      {dirtyFields[name] && errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>
      )}
    </>
  );
};

export default InputField;
