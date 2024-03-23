# Etsy scraping project

## Description

For product discovery, I listed the first 10 products, including their names, prices, and URLs, within the clothing category.

The names, prices, and URLs of the 10 extracted products are stored inside productData.json.

During the product extraction task, I encountered an issue with one of the items being sold. The code addressing this problem is inside productDetailsExtraction.ts.
For each listed product, the names, prices, descriptions, variations, and image URLs are stored in productDetailsData.json.

To bypass Etsy's bot detection, I utilized the Puppeteer-stealth library. While it improved bot detection evasion, occasional failures still occurred because of Etsy's strong bot detection. For more reliable evasion, options like 2captcha or Oxylabs are available, though they are not free of charge.

When captchas occur, manually complete it and re-run the program.

The code has been thoroughly tested and is functioning correctly. However, during my final testing today, I noticed that possibly due to excessive scraping of a particular product, Etsy may have flagged my activity. As a result, when attempting to proceed with the checkout process, I found that there was no 'continue as guest' button available, requiring registration to proceed. Upon changing the network and selecting a different product to add to the cart, the process ran smoothly again.

## Instructions

### Install necesery npm modules

```bash
npm install
```

```bash
npm run start
```
