import Form from "@/components/UI/FormComponents/Form/Form";
import FormButton from "@/components/UI/FormComponents/FormButton/FormButton";
import Input from "@/components/UI/FormComponents/Input/Input";
import InputContainer from "@/components/UI/FormComponents/InputContainer/InputContainer";
import React from "react";

const SignIn = () => {
  return (
    <Form>
      <InputContainer>
        <Input
          _id="signin-email"
          label="Email Address"
          type="text"
          error="true"
          errorMessage={"someMessage"}
        />
      </InputContainer>
      <FormButton type="submit" label="Sign In" />
    </Form>
  );
};

export default SignIn;
