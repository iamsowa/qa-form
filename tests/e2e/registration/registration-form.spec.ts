import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('Registration Form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  test('should successfully submit the form', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo12#',
      dateOfBirth: '2000-01-19',
      language: 'aa',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await registrationPage.expectRegistrationSuccess();
  });

  test('should validate required fields', async () => {
    await registrationPage.submit();
    await registrationPage.expectRequiredFieldsError();
  });

  test('should display error if first name contains invalid characters', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan123',
      lastName: 'Kowalski',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo12#',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'To pole może zawierać tylko litery, spacje i "-"',
      })
    ).toBeVisible();
  });

  test('should display error if last name contains invalid characters', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski!',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo12#',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'To pole może zawierać tylko litery, spacje i "-"',
      })
    ).toBeVisible();
  });

  test('should accept valid characters (including space and `-`)in first and last name', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan ',
      lastName: 'Kowalski-Kowal',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo12#',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await registrationPage.expectRegistrationSuccess();
  });

  test('should display error for invalid email format', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@invalid',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo12#',
      dateOfBirth: '2000-01-19',
      language: 'afar',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'Pole E-mail musi być poprawnym adresem email',
      })
    ).toBeVisible();
  });

  test('should display error for non-matching passwords', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12#',
      confirmPassword: 'BardzoSilneHaslo13#',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'Hasła nie są jednakowe!',
      })
    ).toBeVisible();
  });

  test('should show error if password does not contain a special character', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@niepodam.pl',
      password: 'BardzoSilneHaslo12',
      confirmPassword: 'BardzoSilneHaslo12',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'Hasło musi zawierać: znak specjalny!',
      })
    ).toBeVisible();
  });

  test('should show error if password does not contain an uppercase letter', async () => {
    await registrationPage.fillForm({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@niepodam.pl',
      password: 'bardzosilnehaslo12@',
      confirmPassword: 'bardzosilnehaslo12@',
      dateOfBirth: '2000-01-01',
      language: 'pl',
      phoneNumber: '123456789',
    });
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await expect(
      registrationPage.page.locator('span.errors', {
        hasText: 'Hasło musi zawierać: dużą literę!',
      })
    ).toBeVisible();
  });
});
