const rss = require("rss-parser");
const { TANJUG_RSS_URL, TANJUG_SOURCE_TAG } = require("../constants");
const NewsItem = require("../../model/newsItem");
const rssParser = new rss();

const test = async () => {
    try {
        const feed = await (new B92WebScraper()).scrapeRSS(["od"]);
        console.log(feed);
    }
    catch(error) {

    }
};

class WebScraper {
    constructor(url) {
        this.url = url;
    };

    async scrapeRSS(keywords, limitPerKeyword = 5) {
        try {
            const feed = await rssParser.parseURL(this.url);
            const items = feed.items.flat();
            const scapredNews = [];
            let counter = 0;

           itemLoop: for(const item of items) {
                for(const keyword of keywords) {
                    if(item.content?.includes(keyword) || item.title?.includes(keyword)) {
                        counter++;
                        scapredNews.push(new NewsItem(
                            item.title ?? "",
                            item.enclosure?.url,
                            item.content ?? "",
                            TANJUG_SOURCE_TAG,
                            item.link ?? "",
                            item.pubDate ?? ""
                            
                        ));
                        if(counter == limitPerKeyword) {
                            break itemLoop;
                        }
                        break;
                    }
                }
                }
            return scapredNews;
        }
        catch(error) {
            console.log("Error while scraping: " + error);
            throw new Error(error);
        }
    }

    async scrapeWeb() {}
};

class TanjugWebScraper extends WebScraper {
    constructor() {
        super(TANJUG_RSS_URL);
    };

    async scrapeRSS(keywords) {
       return super.scrapeRSS(keywords);
    }

    async scrapeWeb() {}
}

class NovineInfoWebScraper extends WebScraper {
    constructor() {
        super("https://novine.info/rss/latest-posts")
    }

    async scrapeRSS(keywords) {
        return super.scrapeRSS(keywords);
    }
 
     async scrapeWeb() {}
}

class BlicWebScraper extends WebScraper {
    constructor() {
        super("https://www.blic.rs/rss/Vesti")
        this.pathExtensions = ["/Drustvo", "/Hronika", "/Srbija"]
    }

    async scrapeRSS(keywords, limitPerKeyword = 5) {
        try {
            let scapredNews = [];

            keywords = keywords.map((item) => item.toLowerCase());
            if(keywords.includes("beograd")) {
            this.pathExtensions.push("/Beograd");
            }
            if(keywords.includes("vojvodina")) {
                this.pathExtensions.push("/Vojvodina");
            }

            for(const path of this.pathExtensions) {
            const feed = await rssParser.parseURL(this.url + path);
            const items = feed.items.flat();

            let counter = 0;

            itemLoop: for(const item of items) {
                 for(const keyword of keywords) {
                    if(item.content?.includes(keyword) || item.title?.includes(keyword)) {
                        counter++;
                        scapredNews.push(new NewsItem(
                            item.title ?? "",
                            item.enclosure?.url,
                            item.content ?? "",
                            TANJUG_SOURCE_TAG,
                            item.link ?? "",
                            item.pubDate ?? ""
                            
                        ));
                        if(counter == limitPerKeyword) {
                            break itemLoop;
                        }
                        break;
                    }
                 }
                }
        }

            return scapredNews;
        }
        catch(error) {
            console.log("Error while scraping: " + error);
            throw new Error(error);
        }
    }
 
     async scrapeWeb() {}
}

class B92WebScraper extends WebScraper {
    constructor() {
        super("https://www.b92.net/rss")
        this.pathExtensions = ["/b92/info", "/lokal"]
    }

    async scrapeRSS(keywords, limitPerKeyword = 5) {
        try {
            let scapredNews = [];

            for(const path of this.pathExtensions) {
            const feed = await rssParser.parseURL(this.url + path);
            const items = feed.items.flat();
            let counter = 0;

            itemLoop: for(const item of items) {
                for(const keyword of keywords) {
                    if(item.content?.includes(keyword) || item.title?.includes(keyword)) {
                        counter ++;
                        scapredNews.push(new NewsItem(
                            item.title ?? "",
                            item.enclosure?.url,
                            item.content ?? "",
                            TANJUG_SOURCE_TAG,
                            item.link ?? "",
                            item.pubDate ?? ""
                            
                        ));
                        if(counter == limitPerKeyword) {
                            break itemLoop;
                        }
                        break;
                    }
                }
            }
        }
        

            return scapredNews;
        }
        catch(error) {
            console.log("Error while scraping: " + error);
            throw new Error(error);
        }
    }
 
     async scrapeWeb() {}
}



module.exports = {
    TanjugWebScraper,
    BlicWebScraper,
    NovineInfoWebScraper,
    B92WebScraper
};