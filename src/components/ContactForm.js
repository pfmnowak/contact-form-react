import { Button, Form } from "@edx/paragon";
import { useRef, useState } from "react";
import classes from "./ContactForm.module.scss";
import EmailInput from "./EmailInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import PasswordInput from "./PasswordInput";

const ContactForm = ({ onFormSubmit }) => {
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (
      inputsEmpty({
        firstName,
        lastName,
        email,
        password,
      })
    ) {
      return;
    }

    if (!firstNameValid || !lastNameValid || !emailValid || !passwordValid) {
      return;
    }

    onFormSubmit({
      firstName,
      lastName,
      email,
      password,
    });

    clearInputs();
  };

  const inputsEmpty = ({ firstName, lastName, email, password }) => {
    let inputsEmpty = false;

    if (firstName === "") {
      setFirstNameValid(false);
      inputsEmpty = true;
    }
    if (lastName === "") {
      setLastNameValid(false);
      inputsEmpty = true;
    }
    if (email === "") {
      setEmailValid(false);
      inputsEmpty = true;
    }
    if (password === "") {
      setPasswordValid(false);
      inputsEmpty = true;
    }

    return inputsEmpty;
  };

  const clearInputs = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Form className={classes["contact-form"]} onSubmit={submitFormHandler}>
      <FirstNameInput
        inputRef={firstNameRef}
        isValid={firstNameValid}
        setValid={setFirstNameValid}
      />
      <LastNameInput
        inputRef={lastNameRef}
        isValid={lastNameValid}
        setValid={setLastNameValid}
      />
      <EmailInput
        inputRef={emailRef}
        isValid={emailValid}
        setValid={setEmailValid}
      />
      <PasswordInput
        inputRef={passwordRef}
        isValid={passwordValid}
        setValid={setPasswordValid}
      />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
