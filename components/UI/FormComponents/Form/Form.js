import React from "react";

const Form = (props) => {
  const { submitFunction } = props;

  return (
    <form
      className={`flex flex-col bg-white py-8 px-4  sm:rounded-lg sm:px-10 w-full h-auto gap-5`}
      onSubmit={submitFunction}
      method="post"
    >
      {props.children}
    </form>
  );
};

export default Form;
