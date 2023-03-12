import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import { validateName } from "../helpers/validators";

const LastNameInput = ({ inputRef, isValid, setValid }) => {
  const intl = useIntl();

  const lastNameChangeHandler = (event) => {
    const name = event.target.value.trim();
    if (!validateName(name)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Form.Group isInvalid={!isValid}>
      <Form.Label>
        <FormattedMessage id="last_name_label" />
      </Form.Label>
      <Form.Control
        ref={inputRef}
        onChange={lastNameChangeHandler}
        placeholder={intl.messages.last_name_placeholder}
      />
      {!isValid && (
        <Form.Control.Feedback>
          <FormattedMessage id="last_name_error" />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default LastNameInput;
