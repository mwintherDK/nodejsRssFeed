const express = require("express");
let Parser = require("rss-parser");
var cors = require("cors");

let parser = new Parser();

let feed;
let feedArray = [];

const app = express();
app.use(cors());

(async () => {
  feed = await parser.parseURL("https://nordjyske.dk/rss/aalborg");
  feed.items.forEach((item) => {
    feedArray.push({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      content: item.content,
      bldlSrc: item.enclosure.url,
    });
  });
})();

app.get("/", function (req, res) {
  console.log(feedArray);
  res.json(feedArray);
});

app.listen(3000);
