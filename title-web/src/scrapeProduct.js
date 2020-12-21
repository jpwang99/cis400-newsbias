const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  const [el2] = await page.$x('//*[@id="body-text"]/div[1]');
  const txt = await el2.getProperty("textContent");
  const rawTxt = await txt.jsonValue();

  //   const [el2] = await page.$x('//*[@id="body-text"]/div[1]/div[1]');
  //   const txt = await el2.getProperty("textContent");
  //   const rawTxt = await txt.jsonValue();

  //   const [el] = await page.$x('//*[@id="body-text"]/div[1]/div[2]');
  //   const txt2 = await el.getProperty("textContent");
  //   const srcTxt = await txt2.jsonValue();

  //   const [el3] = await page.$x('//*[@id="body-text"]/div[1]/div[3]');
  //   const txt3 = await el3.getProperty("textContent");
  //   const srcTxt3 = await txt3.jsonValue();

  //   const [el5] = await page.$x('//*[@id="body-text"]/div[1]/div[4]');
  //   const txt5 = await el5.getProperty("textContent");
  //   const srcTxt5 = await txt5.jsonValue();

  //   const [el6] = await page.$x('//*[@id="body-text"]/div[1]/div[5]');
  //   const txt6 = await el6.getProperty("textContent");
  //   const srcTxt6 = await txt6.jsonValue();

  console.log({ rawTxt }); //, srcTxt, srcTxt3, srcTxt5, srcTxt6 });

  browser.close();

  return rawTxt;
  //   const [el3] = await page.$x("/html/body/div[7]/article/div[1]/h1");
  //   const src = await el.getProperty('src');
  //   const srcTxt = await src.jsonValue();
}
// scrapeProduct(
//   "https://www.cnn.com/2020/12/18/politics/us-government-hack-early-signs/index.html"
// );
// scrapeProduct(
//   "https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X"
// );
