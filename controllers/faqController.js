const cheerio = require("cheerio");
const request = require("request-promise");

const url = "https://nest.botble.com/vi/faq";

const faqController = {
  get: (req, res) => {
    try {
      let data = [];
      let titles = [];
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          $(".faqs-list").each((index, el) => {
            $(el).each((i, e) => {
              $(e)
                .find("h4")
                .each(function () {
                  titles.push($(this).text());
                });
              $(e)
                .find(".accordion")
                .each((i, e) => {
                  let cards = [];
                  let title = titles[i];
                  $(e)
                    .find(".card")
                    .each((i, card) => {
                      cards.push({
                        header: $(card).find(".card-header button").text(),
                        body: $(card).find(".card-body").text(),
                      });
                    });
                  data.push({ title, cards });
                });
            });
          });
        }
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = faqController;
