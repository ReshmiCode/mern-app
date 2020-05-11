import React from "react";

import "./Auth.css";

import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <Input
          element="input"
          type="email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          id="email"
          label="E-Mail"
          onInput={inputHandler}
        />
        <Input
          element="input"
          type="input"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (at least 5 characters)."
          id="password"
          label="Password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          LOG IN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
