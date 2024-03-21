import { Page } from "puppeteer";
import { ProductType } from "../types";

const PRODUCT_DICOVERY_URL = "https://www.etsy.com/c/clothing";

export const productDiscovery = async (page: Page) => {
  await page.goto(PRODUCT_DICOVERY_URL);

  const productsData = await page.evaluate(() => {
    const productList = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        "[data-search-results] .listing-link"
      )
    ).slice(0, 10);

    const formattedData = productList.map((product) => {
      const name =
        product.querySelector<HTMLElement>(".v2-listing-card__info h2")
          ?.innerText ?? "";

      const price =
        product.querySelector<HTMLElement>(".currency-value")?.innerText ?? "";

      const productUrl = product?.href ?? "";

      const data: ProductType = {
        name,
        price,
        url: productUrl,
      };

      return data;
    });

    return formattedData;
  });

  return productsData;
};
