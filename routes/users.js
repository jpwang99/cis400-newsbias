var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");
const asyncRoute = require("route-async");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  const [el2] = await page.$x(
    '//*[@id="wrapper"]/div[3]/div[1]/main/article/div/div[1]/div[1]/p[3]'
  ); //('//*[@id="body-text"]/div[1]/div[2]');
  const txt = await el2.getProperty("textContent");
  const rawTxt = await txt.jsonValue();

  browser.close();
  var jsn = [{ id: url }, { text: rawTxt }];

  console.log(jsn);
  return jsn;
  //   const [el3] = await page.$x("/html/body/div[7]/article/div[1]/h1");
  //   const src = await el.getProperty('src');
  //   const srcTxt = await src.jsonValue();
}
// var router = express.Router();

// router.get("/jem", function (req, res, next) {
//   res.json([
//     { id: 1, username: "somebody" },
//     { id: 2, username: "somebody_else" },
//   ]);
//   // alert("hi");
//   // res.send(
//   //   scrapeProduct(
//   //     "https://www.cnn.com/2020/12/18/politics/us-government-hack-early-signs/index.html"
//   //   )
//   // );
// });
/* GET users listing. */
router.get("/", async function (req, res, next) {
  // res.json([
  //   { id: 1, username: "somebody" },
  //   { id: 2, username: "somebody_else" },
  // ]);
  await res.json(
    scrapeProduct(
      "https://www.foxnews.com/politics/where-does-coronavirus-relief-stand-in-congress"
    )
    // scrapeProduct(
    //   "https://www.cnn.com/2020/12/18/politics/us-government-hack-early-signs/index.html"
    // )
  );
});

module.exports = asyncRoute(router);
