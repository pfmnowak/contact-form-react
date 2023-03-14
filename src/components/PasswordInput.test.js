import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import ContactForm from "./ContactForm";

jest.mock("./CountrySelect", () => {
  return () => {
    return "CountrySelect Component";
  };
});

async function renderComponent() {
  render(
    <IntlProvider
      messages={messages[LOCALES.ENGLISH]}
      locale={LOCALES.ENGLISH}
      defaultLocale={LOCALES.ENGLISH}
    >
      <ContactForm />
    </IntlProvider>
  );
  await screen.findByRole("button", {
    name: /submit/i,
  });
}

describe("PasswordInput component", () => {
  it("doesn't display an error when entering a valid password", () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.click(passwordInput);
    userEvent.keyboard("qweRTY123$%^&*");

    const passwordInputError = screen.queryByText(
      /password should have between/i
    );
    expect(passwordInputError).not.toBeInTheDocument();
  });

  it("displays an error when entering a password with spaces", () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.click(passwordInput);
    userEvent.keyboard("test password");

    const passwordInputError = screen.getByText(
      /password should have between/i
    );
    expect(passwordInputError).toBeInTheDocument();
  });

  it("displays an error when entering too short password", () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.click(passwordInput);
    userEvent.keyboard("1234567"); // 7 characters

    const passwordInputError = screen.getByText(
      /password should have between/i
    );
    expect(passwordInputError).toBeInTheDocument();
  });

  it("displays an error when entering too long password", () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.click(passwordInput);
    userEvent.keyboard("1234567890123456789012345678901"); // 31 characters

    const passwordInputError = screen.getByText(
      /password should have between/i
    );
    expect(passwordInputError).toBeInTheDocument();
  });
});
