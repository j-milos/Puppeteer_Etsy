import { Browser } from "puppeteer";
import { productDiscovery } from "./features/productDiscovery";
import { productDetailsExtraction } from "./features/productDeatilsExtraction";

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

    // const productToBuyURL =
    //   "https://www.etsy.com/listing/1698835601/formula-f1-jacket-formula-f1-retro?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sr_gallery-1-1&pro=1&frs=1&content_source=be30bcac4c4c84d39dbbc59abd00caa311843224%253A1698835601&organic_search_click=1";

    // Buy product
    // await featureThreeFucntion();

    // Checkout
    // await featureFourFunction();
    // await browser.close();
  } catch (error) {
    console.error("error", error);
  }
};

main();
