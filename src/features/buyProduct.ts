import { Page } from "puppeteer";
import { delay } from "../helpers";

export const buyProduct = async (page: Page) => {
  const productToBuyURL =
    "https://www.etsy.com/listing/1698835601/formula-f1-jacket-formula-f1-retro?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sr_gallery-1-1&pro=1&frs=1&content_source=be30bcac4c4c84d39dbbc59abd00caa311843224%253A1698835601&organic_search_click=1";

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
