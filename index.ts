const puppeteer = require("puppeteer");
import { log } from "console";
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
    return productListings;
  });
  console.log(productsData);

  await browser.close();
};

main();
