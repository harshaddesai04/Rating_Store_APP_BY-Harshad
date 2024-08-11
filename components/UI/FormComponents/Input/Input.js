import { useState } from "react";

const Input = ({
  label,
  id,
  type,
  onChange,
  value,
  errorMessage,
  as = "input",
  className,
}) => {
  const [inputType, setinputType] = useState("password");
  const isPassword = type === "password";
  return (
    <div className={`${className ? className : "relative"}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700`}>
        {label}
        {as != "textarea" ? (
          <input
            name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none disabled:bg-gray-100`}
            id={id}
            type={isPassword ? inputType : type}
            onChange={onChange}
            value={value}
          />
        ) : (
          <textarea
            name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none disabled:bg-gray-100`}
            id={id}
            type={type}
            onChange={onChange}
            value={value}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-50%] right-[10px] text-gray-500"
            onClick={() =>
              setinputType((prev) => (prev == "password" ? "text" : "password"))
            }
          >
            {inputType == "text" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
      </label>
      <div
        className={`h-5 text-sm flex gap-1 text-red-500 items-center origin-top transition-transform overflow-hidden ${
          errorMessage ? "delay-100 scale-y-100" : "scale-y-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Input;
