import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import { useGetAllCountriesQuery } from "../services/countries";
import CustomSpinner from "./CustomSpinner";

const CountrySelect = ({ inputRef, isValid, setValid }) => {
  const intl = useIntl();
  const { data, error, isLoading } = useGetAllCountriesQuery();

  const renderCountries = () => {
    if (error || !data) {
      const noDataOption = intl.messages.country_no_data;
      return <option value={"no-data"}>{noDataOption}</option>;
    }

    const countryNames = data
      .map((country) => country.name.common)
      .sort((a, b) => a.localeCompare(b));

    return countryNames.map((name) => <option key={name}>{name}</option>);
  };

  const countryChangeHandler = (event) => {
    const country = event.target.value;
    if (country === "") {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Form.Group isInvalid={!isValid}>
      <Form.Label>
        <FormattedMessage id="country_label" />
      </Form.Label>
      {!isLoading && <CustomSpinner />}
      <Form.Control ref={inputRef} as="select" onChange={countryChangeHandler}>
        <option value="">
          <FormattedMessage id="country_placeholder" />
        </option>
        {renderCountries()}
      </Form.Control>
      {!isValid && (
        <Form.Control.Feedback>
          <FormattedMessage id="country_error" />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CountrySelect;
