import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import { validateEmail } from "../helpers/validators";

const EmailInput = ({ inputRef, isValid, setValid }) => {
  const intl = useIntl();

  const emailChangeHandler = (event) => {
    const email = event.target.value.trim();
    if (!validateEmail(email)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Form.Group isInvalid={!isValid}>
      <Form.Label>
        <FormattedMessage id="email_label" />
      </Form.Label>
      <Form.Control
        ref={inputRef}
        type="email"
        onChange={emailChangeHandler}
        placeholder={intl.messages.email_placeholder}
      />
      {!isValid && (
        <Form.Control.Feedback>
          <FormattedMessage id="email_error" />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default EmailInput;
