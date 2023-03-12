import { Button, Form } from "@edx/paragon";
import { useRef, useState } from "react";
import classes from "./ContactForm.module.scss";
import EmailInput from "./EmailInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";

const ContactForm = ({ onFormSubmit }) => {
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!firstNameValid || !lastNameValid || !emailValid) {
      return;
    }

    onFormSubmit({
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
    });

    clearInputs();
  };

  const clearInputs = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
