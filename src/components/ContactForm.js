import { Button, Form } from "@edx/paragon";
import { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classes from "./ContactForm.module.scss";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";

const ContactForm = ({ onFormSubmit }) => {
  const intl = useIntl();
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  // const emailRef = useRef(null);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!firstNameValid || !lastNameValid) {
      return;
    }

    onFormSubmit({
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      // email: emailRef.current.value.trim(),
    });

    clearInputs();
  };

  const clearInputs = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    // emailRef.current.value = "";
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

      <Form.Group controlId="formGridEmail" isInvalid>
        <Form.Label>
          <FormattedMessage id="email_label" />
        </Form.Label>
        <Form.Control
          type="email"
          placeholder={intl.messages.email_placeholder}
        />
        <Form.Control.Feedback>
          <FormattedMessage id="email_error" />
        </Form.Control.Feedback>
      </Form.Group>

      {/*
        first-name
        last-name
        email
        password
        country-select
      */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
