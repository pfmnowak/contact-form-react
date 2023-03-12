import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import ContactForm from "./ContactForm";

function renderComponent() {
  render(
    <IntlProvider
      messages={messages[LOCALES.ENGLISH]}
      locale={LOCALES.ENGLISH}
      defaultLocale={LOCALES.ENGLISH}
    >
      <ContactForm />
    </IntlProvider>
  );
}

describe("ContactForm component", () => {
  it("renders a name input", () => {
    renderComponent();
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(nameInput).toBeInTheDocument();
  });

  it("renders an email input", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toBeInTheDocument();
  });
});
