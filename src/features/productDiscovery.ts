import { Page } from "puppeteer";
import { ProductType } from "../types";

export const productDiscovery = async (page: Page) => {
  const productDiscoveryUrl = "https://www.etsy.com/c/clothing";
  await page.goto(productDiscoveryUrl);

  //Finding 10 products.The 'from' method is used to convert a node list to an array.
  const productsData = await page.evaluate(() => {
    const productList = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        "[data-search-results] .listing-link"
      )
    ).slice(0, 10);

    //Mapping through the data to extract the name, price, and URL for every product.
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
