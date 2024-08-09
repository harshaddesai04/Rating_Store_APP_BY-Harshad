import React from "react";

const FormPage = (props) => {
  return (
    <div
      className={`flex items-center justify-center w-full max-w-[436px] gap-9 p-5 flex-col`}
    >
      {props.children}
    </div>
  );
};

export default FormPage;
