const { default: Axios } = require("axios");
const cheerio = require("cheerio");
const { writeFile } = require('fs');

const getData = async (pageNum) => {
    var mainLink = `https://www.businesslist.my`;

    const axios = require("axios").create({
        baseURL: mainLink,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    const html = await axios.get(`/location/kuala-lumpur/${pageNum}`).then(rsp => rsp.data);
    const $ = cheerio.load(html);
    const arrayList = [];

    $('.company').each((a, el) => {
        var subLink = $(el).find('h4 a').attr("href");

        subLink ? arrayList.push(subLink) : null;
    });

    //Go to SubLink Page
    //Cannot do like this? company name is empty
    for (var i = 0; i < arrayList.length; i++) {
        const subHtml = await axios.get(arrayList[i])
            .then(rsp => rsp.data).catch(err => console.log(err));

        const $ = cheerio.load(subHtml);
        const companyName = $('#company_name').text().trim();
        console.log('company name: ' + companyName);
    }
    if (pageNum < 3) {
        console.log();
        pageNum+=1;
        console.log("========");
        console.log("Page "+pageNum);
        console.log("========");
        return getData(pageNum);
    }

}

(async () => {
    await getData(1);
})();