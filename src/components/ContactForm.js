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

    if (!firstNameValid || !lastNameValid || !emailValid || !passwordValid) {
      return;
    }

    onFormSubmit({
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
    });

    clearInputs();
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
