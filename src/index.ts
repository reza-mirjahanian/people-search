import Crawler from "./classes/Crawler";
import Logger from "./utils/logger"

const test = async () => {
    const crawler = new Crawler();

    // const url1 = await crawler.searchPeople('sdsds','Smith', '', 'Texas' , 'Houston');
    // console.log({url1})
    //
    const url2 = await crawler.searchPeople('Bob','Smith', '', 'Texas' , 'Houston');
    console.log({url2})
    //
    // const url3 = await crawler.searchPeople('Rob', 'Edmiston', 'J', 'Ohio', 'Columbus');
    // console.log({url3})

    // const url4 = await crawler.searchPeople('john', '', '', 'New york', 'Nyack');
    // console.log({url4})
};

test().catch((error) => {
    Logger.error(error, {
        message: 'Error in running test()'
    });
}).finally(() => {
    process.exit();
});



