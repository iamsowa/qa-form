import { expect, Page } from '@playwright/test';

export class RegistrationPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // navigates to the registration page and verifies that the URL and heading are correct
  async navigate() {
    await this.page.goto('http://localhost:8080/');
    await expect(this.page).toHaveURL('http://localhost:8080/');
    await expect(this.page.locator('h1')).toBeVisible();
  }

  // fills the registration form with the provided data
  async fillForm({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    language,
    phoneNumber,
  }) {
    await this.page.getByPlaceholder('Imię').fill(firstName);
    await this.page.getByPlaceholder('Nazwisko').fill(lastName);
    await this.page.getByPlaceholder('Twój adres e-mail').fill(email);
    await this.page.getByPlaceholder('Hasło', { exact: true }).fill(password);
    await this.page.getByPlaceholder('Powtórz hasło').fill(confirmPassword);

    // wait until the date field is ready for interaction
    const dateInput = this.page.locator('input[name="date"]');
    await dateInput.waitFor();
    await dateInput.fill(dateOfBirth);

    // check if the language options are available and select the specified language
    await expect(this.page.locator('select')).toBeVisible();
    await this.page.selectOption('select', language);

    await this.page.getByPlaceholder('Numer telefonu').fill(phoneNumber);
  }

  // clicks the consent checkboxes and verifies that they are checked
  async acceptTerms() {
    const termsCheckbox = this.page
      .locator('form div')
      .filter({ hasText: 'Akceptuję regulamin oraz' })
      .locator('div');
    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();

    const marketingCheckbox = this.page
      .locator('form div')
      .filter({ hasText: 'Wyrażam zgodę na otrzymywanie' })
      .locator('div');
    await marketingCheckbox.click();
    await expect(marketingCheckbox).toBeChecked();
  }

  // submits the form by clicking the submit button
  async submit() {
    const submitButton = this.page.getByRole('button', { name: 'Zarejestruj' });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
  }

  // verifies that the registration was successful by checking for a success message
  async expectRegistrationSuccess() {
    const successMessage = this.page.getByRole('heading');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('dziękujemy za rejestrację!');
  }

  // checks for validation error messages in case required fields are not filled in
  async expectRequiredFieldsError() {
    await expect(this.page.locator('form')).toContainText(
      'Pole Imię jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'Pole Nazwisko jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'Pole E-mail jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'Pole password jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'Pole Powtórz hasło jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'Pole Data urodzenia jest wymagane'
    );
    await expect(this.page.locator('form')).toContainText(
      'To pole jest wymagane'
    );
  }
}
