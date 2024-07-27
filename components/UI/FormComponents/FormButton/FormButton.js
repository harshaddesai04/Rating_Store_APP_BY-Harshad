import React from "react";

const FormButton = ({ type, label }) => {
  return (
    <button
      className="form-btn rounded-md py-2 px-4 gap-2 border font-medium bg-[#0284C7] text-white hover:bg-blue-600"
      type={type}
    >
      {label}
    </button>
  );
};

export default FormButton;
