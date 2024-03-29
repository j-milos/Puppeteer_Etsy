import { Page } from "puppeteer";
import {
  ProductDetailsType,
  ProductDetailsVariation,
  ProductType,
} from "../types";

export const productDetailsExtraction = async (
  page: Page,
  productsData: ProductType[]
) => {
  const productDetailsList: ProductDetailsType[] = [];

  for (const product of productsData) {
    await page.goto(product.url);

    // Handle scraping if page is soldout and go to details page
    // If item is sold out return link to page details
    const soldOutItemPageDetailsLink = await page.evaluate(() => {
      const source = document.getElementsByTagName("html")[0].innerHTML;
      const isItemSoldOut = source.search("Sorry, this item is sold out");

      if (isItemSoldOut !== -1) {
        const seeProductDetailsLink = document.querySelector<HTMLLinkElement>(
          ".wt-arrow-link.wt-arrow-link--forward"
        ).href;

        return seeProductDetailsLink;
      }

      return null;
    });

    if (soldOutItemPageDetailsLink) {
      await page.goto(soldOutItemPageDetailsLink);
    }

    // Scrape page details
    const productDetails = await page.evaluate(() => {
      const title =
        document.querySelector<HTMLElement>(".wt-mb-xs-1 h1")?.innerText ?? "";

      const price =
        document.querySelector<HTMLElement>(".appears-ready p")?.innerText ??
        "";

      const description =
        document.querySelector<HTMLElement>(
          "#wt-content-toggle-product-details-read-more p"
        )?.innerText ?? "";

      const selectVariationElements = Array.from(
        document.querySelectorAll<HTMLSelectElement>(
          "[id^='variation-selector']"
        )
      );

      const variations: ProductDetailsVariation[] = selectVariationElements.map(
        (element) => {
          const labelName = document
            .querySelector<HTMLLabelElement>(`label[for="${element.id}"]`)
            ?.innerText?.trim();

          const selectOptions = Array.from(
            element.querySelectorAll<HTMLOptionElement>("option")
          ).map((e) => {
            return {
              optionName: e?.text?.trim(),
              optionValue: e?.value,
            };
          });

          return {
            labelName,
            selectOptions,
          };
        }
      );

      const imageURL = document
        .querySelector<HTMLElement>(".image-carousel-container img")
        .getAttribute("src");

      return {
        title,
        price,
        description,
        variations,
        imageURL,
      };
    });

    productDetailsList.push(productDetails);
  }

  return productDetailsList;
};
