import { Page } from "puppeteer";
import { delay } from "../helpers/delay";

export const checkout = async (page: Page) => {
  const cartUrl = "https://www.etsy.com/cart";
  await page.goto(cartUrl);

  // Submit cart and start checkout process
  await page.click('.multi-shop-cart-payment [type="submit"]');

  // Wait for modal with Continue as guest to appear
  await page.waitForSelector("#join-neu-continue-as-guest button");
  await delay(1000);

  // Continue as guest
  await page.click("#join-neu-continue-as-guest button");
  await page.waitForNavigation();

  // Form input
  // Email
  await page.type("#shipping-form-email-input", "pera@mailinator.com");
  // Confirm email
  await page.type("#shipping-form-email-confirmation", "pera@mailinator.com");
  // Full name
  await page.type('#name11 [type="text"]', "Pera Petrovic");
  // await page.focus('#name11 [type="text"]');
  // await page.keyboard.type("Pera Petrovic");
  // Street address
  await page.type('#first_line12 [type="text"]', "Pera's street");
  // await page.focus('#first_line12 [type="text"]');
  // await page.keyboard.type("Pera's street");
  // City
  await page.type('#city15 [type="text"]', "Pera town");
  // await page.focus('#city15 [type="text"]');
  // await page.keyboard.type("Pera town");

  // Continue to payment
  await page.click(".wt-btn.wt-btn--filled.wt-width-full");
  await page.waitForNavigation();

  // Continue as guest
  // Wait for modal with Continue as guest to appear
  await page.waitForSelector("#join-neu-form .wt-btn.wt-btn--transparent");
  // Continue as guest
  await delay(1000);
  await page.evaluate(() => {
    const continueAsGuestButton = document.querySelector<HTMLButtonElement>(
      "#join-neu-form .wt-btn.wt-btn--transparent"
    );
    continueAsGuestButton.click();
  });
};
