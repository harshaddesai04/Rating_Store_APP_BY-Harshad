const Input = ({
  label,
  id,
  type,
  onChange,
  value,
  errorMessage,
  as = "input",
}) => {
  return (
    <div className="relative">
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700`}>
        {label}
        {as != "textarea" ? (
          <input
            name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none`}
            id={id}
            type={type}
            onChange={onChange}
            value={value}
          />
        ) : (
          <textarea
            name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none`}
            id={id}
            type={type}
            onChange={onChange}
            value={value}
          />
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
