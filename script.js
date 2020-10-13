const { default: Axios } = require("axios");
const cheerio = require("cheerio");
const {writeFile} = require('fs');

// const ax = require('axios').create({
//     baseURL: 'https://www.businesslist.my/location/kuala-lumpur'
// });
//const colors = require("colors");

const getData = async (pageNum, linkLength) => {
    //await ax.get('/company/377236/klinik-dr-lo').then(rsp => {console.log(rsp.data)})
    var mainLink = `https://www.businesslist.my`;

    const axios = require("axios").create({
        baseURL: mainLink,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    const html = await axios.get('/location/kuala-lumpur').then(rsp => rsp.data);
    const $ = cheerio.load(html);
    const arrayList = [];

    $('.company').each((a, el) => {
        //console.log($(el).find('h4 a').attr("href"));
        var subLink = $(el).find('h4 a').attr("href");

        subLink ? arrayList.push(subLink) : null;
    });

    //Go to SubLink Page
    //Cannot do like this? company name is empty
    for (var i = 0; i < 1; i++) {
        const subHtml = await axios.get(arrayList[i])
            .then(rsp => rsp.data).catch(err => console.log(err));


        const $ = cheerio.load(subHtml);
        const companyName = $('#company_name').text().trim();
        console.log(companyName);
        // console.log('company name: ' + companyName);
        // break;
    }

}

(async () => {
    await getData(1, 51);

    // const html = await axios.get('https://www.businesslist.my/company/380133/money-life-research').then(rsp => {
    //     return rsp.data
    // });

    // const $ = cheerio.load(html);
    // const companyName = $('#company_name').text().trim();

    // console.log(companyName);

})();