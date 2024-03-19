const puppeteer = require("puppeteer");
const fs = require("fs");
import { Browser } from "puppeteer";

const url = "https://www.etsy.com/market/etsy_home_page";

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const productsData = await page.evaluate(() => {
    const productListings = Array.from(
      document.querySelectorAll(".listing-link")
    );
    const data = productListings.map((product: any) => ({
      name: product.querySelector("h2").innerText,
      price: product.querySelector(".wt-text-title-01 .currency-value")
        .innerText,
      url: product.querySelector(".listing-link").href,
    }));

    return data;
  });
  console.log(productsData);

  await browser.close();

  fs.writeFile("data.json", JSON.stringify(productsData), (err: any) => {
    if (err) throw err;
    console.log("Successfully saved JSON");
  });
};

main();
