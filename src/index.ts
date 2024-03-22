import { Browser } from "puppeteer";
import { productDiscovery } from "./features/productDiscovery";
import { productDetailsExtraction } from "./features/productDeatilsExtraction";
import { delay } from "./helpers";
import { buyProduct } from "./features/buyProduct";

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const { executablePath } = require("puppeteer");

puppeteer.use(StealthPlugin());

const main = async () => {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();

    // // Product Discovery
    // const productsData = await productDiscovery(page);

    // Write productData.json
    // fs.writeFile(
    //   "src/data/productsData.json",
    //   JSON.stringify(productsData),
    //   (err: any) => {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log("Successfully saved productsData.json");
    //   }
    // );

    // Product Details Extraction
    // const productsDetails = await productDetailsExtraction(page, productsData);

    // Write productsDetailsData.json
    // fs.writeFile(
    //   "src/data/productsDetailsData.json",
    //   JSON.stringify(productsDetails),
    //   (err: any) => {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log("Successfully saved productsDetailsData.json");
    //   }
    // );

    // Buy product
    await buyProduct(page);

    // Checkout
    const cartUrl = "https://www.etsy.com/cart";
    await page.goto(cartUrl);
    await delay(500);
    await page.click('.multi-shop-cart-payment [type="submit"]');
    await delay(500);
    //Continue as guest
    await page.click("#join-neu-continue-as-guest button");
    // Wait for page to fully load to make sure buy product action is finished
    await page.waitForNavigation();
    //Email
    await page.focus("#shipping-form-email-input");
    await page.keyboard.type("pera@mailinator.com");
    //Confirm email
    await page.focus("#shipping-form-email-confirmation");
    await page.keyboard.type("pera@mailinator.com");
    //Full name
    await page.focus('#name11 [type="text"]');
    await page.keyboard.type("Pera Petrovic");
    //Street address
    await page.focus('#first_line12 [type="text"]');
    await page.keyboard.type("Pera's street");
    //City
    await page.focus('#city15 [type="text"]');
    await page.keyboard.type("Pera town");
    //Continue to payment
    await delay(1000);
    await page.click(".wt-btn.wt-btn--filled.wt-width-full");
    // await featureFourFunction();
    // await browser.close();
  } catch (error) {
    console.error("error", error);
  }
};

main();
