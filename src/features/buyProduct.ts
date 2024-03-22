import { Page } from "puppeteer";
import { delay } from "../helpers/delay";

export const buyProduct = async (page: Page) => {
  //The product URL is hardcoded to display the checkout process because not every product has the option to pay with a card (only PayPal payment is available).
  const productToBuyURL =
    "https://www.etsy.com/listing/1574120506/indian-handmade-patch-work-vintage?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sr_gallery-1-15&pro=1&frs=1&content_source=ba78845181a26881cc4a66b17079edd74f261ac2%253A1574120506&organic_search_click=1";

  await page.goto(productToBuyURL);

  // Get value to select
  const valueToSelect = await page.evaluate(() => {
    const selectOptions = Array.from(
      document.querySelectorAll<HTMLOptionElement>(
        "#variation-selector-0 option"
      )
    ).map((e) => e.value);

    return selectOptions[1];
  });
  // Set selected value
  await page.select("#variation-selector-0", valueToSelect);
  // Timeout for select validation
  await delay(500);
  // Click buy button
  await page.click('[data-buy-box] [type="submit"]');
  // Wait for page to fully load to make sure buy product action is finished
  await page.waitForNavigation();
};
