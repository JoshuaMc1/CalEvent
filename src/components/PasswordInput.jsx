import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function PasswordInput({
  label = "Contraseña",
  name = "password",
  id = "password",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </button>
      </div>
    </>
  );
}

export default PasswordInput;
