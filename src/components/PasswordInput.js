import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import { validatePassword } from "../helpers/validators";

const PasswordInput = ({ inputRef, isValid, setValid }) => {
  const intl = useIntl();

  const passwordChangeHandler = (event) => {
    const password = event.target.value;
    if (!validatePassword(password)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Form.Group isInvalid={!isValid}>
      <Form.Label>
        <FormattedMessage id="password_label" />
      </Form.Label>
      <Form.Control
        ref={inputRef}
        minLength="8"
        type="password"
        onChange={passwordChangeHandler}
        placeholder={intl.messages.password_placeholder}
      />
      {!isValid && (
        <Form.Control.Feedback>
          <FormattedMessage id="password_error" />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default PasswordInput;
