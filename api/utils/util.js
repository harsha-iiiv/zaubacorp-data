const cheerio = require('cheerio');
const fetch = require("node-fetch");

const getCompanyDetails = (htmlText) => {

    const $ = cheerio.load(htmlText);
    let companyArr = []
    $('div').each((index, element) => {
        companyArr.push($(element).attr('id'));
    });
    companyArr = companyArr.map(ele => {
        return {
            companyName: ele.split('/')[1],
            cin: ele.split('/')[2]
        }
    })
    return companyArr || []
}

const callZaubacorpApi = async (query) => {

    var options = {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: "drupal.samesite=1",
        },
        body: `search= ${query}&filter=company`,
    };

    const htmlText = await fetch("https://www.zaubacorp.com/custom-search", options).then(response => response.text())

    return htmlText

}

module.exports = {getCompanyDetails, callZaubacorpApi}