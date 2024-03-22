import { Browser } from "puppeteer";
import { productDiscovery } from "./features/productDiscovery";
import { productDetailsExtraction } from "./features/productDeatilsExtraction";
import { delay } from "./helpers/delay";
import { buyProduct } from "./features/buyProduct";
import { checkout } from "./features/checkout";

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const { executablePath } = require("puppeteer");

// Using Puppeteer StealthPlugin to bypass detection
puppeteer.use(StealthPlugin());

const main = async () => {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();

    // Product Discovery
    const productsData = await productDiscovery(page);

    // Write productData.json
    fs.writeFile(
      "src/data/productsData.json",
      JSON.stringify(productsData),
      (err: any) => {
        if (err) {
          throw err;
        }
        console.log("Successfully saved productsData.json");
      }
    );

    // Product Details Extraction
    const productsDetails = await productDetailsExtraction(page, productsData);

    // Write productsDetailsData.json
    fs.writeFile(
      "src/data/productsDetailsData.json",
      JSON.stringify(productsDetails),
      (err: any) => {
        if (err) {
          throw err;
        }
        console.log("Successfully saved productsDetailsData.json");
      }
    );

    // Buy product
    await buyProduct(page);

    // Checkout
    await checkout(page);

    // 5s delay before browser close
    await delay(5000);
    // Close browser
    await browser.close();
  } catch (error) {
    console.error("error", error);
  }
};

main();
