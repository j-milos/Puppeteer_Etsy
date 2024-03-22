# Etsy scraping project

## Description

For product discovery, I listed the first 10 products, including their names, prices, and URLs, within the clothing category.

The names, prices, and URLs of the 10 extracted products are stored inside productData.json.

During the product extraction task, I encountered an issue with one of the items being sold. The code addressing this problem is inside productDetailsExtraction.ts.
For each listed product, the names, prices, descriptions, variations, and image URLs are stored in productDetailsData.json.

To bypass Etsy's bot detection, I utilized the Puppeteer-stealth library. While it improved bot detection evasion, occasional failures still occurred because of Etsy's strong bot detection. For more reliable evasion, options like 2captcha or Oxylabs are available, though they are not free of charge.

When captchas occur, manually complete it and re-run the program.

## Instructions

### Install necesery npm modules

```bash
npm install
```

```bash
npm run start
```
