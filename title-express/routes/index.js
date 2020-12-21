var express = require("express");
var router = express.Router();

const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");
/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
router.use(
  cors({
    origin: "*",
  })
);

router.get("/scrape", function (req, res) {
  url = req.query.url;
  var $;
  request(url, function (error, response, html) {
    if (!error) {
      $ = cheerio.load(html);
    }
    res.send($.html());
  });
});
module.exports = router;
