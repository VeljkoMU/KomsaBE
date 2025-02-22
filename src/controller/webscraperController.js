const handleError = require("../utils/handleError");
const { TanjugWebScraper, BlicWebScraper, B92WebScraper, NovineInfoWebScraper } = require("../utils/webscraper/webscraper");


class WebScraperController {
    static webscrapers = [new TanjugWebScraper(), new BlicWebScraper(), new B92WebScraper(), new NovineInfoWebScraper()];
    static eachSourceMaxNews = 5;

    static async getNewsByLocation(req, res) {
        const {address, country, province, city, street} = req.query;

        const unfilteredScraperResults = [];

        try {

            for(const scraper of WebScraperController.webscrapers) {
                unfilteredScraperResults.push(await scraper.scrapeRSS([street , city, province, country, address]));
            }

            let scraperResults = [];
            for(const resultsPart of unfilteredScraperResults) {
                scraperResults.push(resultsPart.slice(0, WebScraperController.eachSourceMaxNews < resultsPart.length ? WebScraperController.eachSourceMaxNews : resultsPart.length));
            }
            scraperResults = scraperResults.flat();

            //TODO Check response structure
            return res.status(200).json({
                news: scraperResults
            });
        }
        catch(err) {
            handleError(res, [err], "WebScraping");
        }
    }   
}

module.exports = WebScraperController;