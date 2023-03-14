import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import { store } from "../store/store";
import { createServer } from "../test/server";
import ContactForm from "./ContactForm";

async function renderComponent() {
  render(
    <Provider store={store}>
      <IntlProvider
        messages={messages[LOCALES.ENGLISH]}
        locale={LOCALES.ENGLISH}
        defaultLocale={LOCALES.ENGLISH}
      >
        <ContactForm />
      </IntlProvider>
    </Provider>
  );
  await screen.findByRole("option", { name: /poland/i });
}

describe("CountrySelect component", () => {
  createServer([
    {
      path: "https://restcountries.com/v3.1/all",
      res: () => {
        return [
          { name: { common: "Cambodia" } },
          { name: { common: "Poland" } },
          { name: { common: "England" } },
          { name: { common: "France" } },
        ];
      },
    },
  ]);

  it("doesn't display an error when some country is selected", async () => {
    renderComponent();
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });

    const testOption = await screen.findByRole("option", { name: /poland/i });

    userEvent.selectOptions(countrySelect, testOption);
    expect(testOption.selected).toBe(true);

    const countrySelectError = screen.queryByText(/please select a country/i);
    expect(countrySelectError).not.toBeInTheDocument();
  });

  it("displays an error when no country is selected", () => {
    renderComponent();
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });
    const defaultOption = screen.getByRole("option", {
      name: /select a country/i,
    });

    userEvent.selectOptions(countrySelect, defaultOption);
    expect(defaultOption.selected).toBe(true);
    expect(countrySelect).toHaveValue("");

    const countrySelectError = screen.queryByText(/please select a country/i);
    expect(countrySelectError).toBeInTheDocument();
  });
});
