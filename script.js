const cheerio = require("cheerio");
const axios = require("axios");
//const colors = require("colors");

const getData = async (pageNum, linkLength) => {

    var mainLink = `https://www.businesslist.my/location/kuala-lumpur/${pageNum}`;

    const html = await axios.get(mainLink)
        .then(rsp => rsp.data);
    const $ = cheerio.load(html);
    const arrayList = [];
    const title = $('.company').each((a, el) => {
        //console.log($(el).find('h4 a').attr("href"));
        var subLink = $(el).find('h4 a').attr("href");
        console.log('sublink is = ' + subLink);

        if (typeof subLink == 'undefined') {
            console.log("@@@@@@@@@@@@@");
            subLink = '';
        }
        else {
            var fullSubLink = mainLink + subLink;
            console.log(fullSubLink);
            arrayList.push(fullSubLink);
            console.log(arrayList.length);
            //console.log('length is = ' + fullSubLink.length)
            console.log();

        }

    });
//Cannot do like this? company name is empty
    for (var i = 0; i < arrayList.length; i++) {
        
        //console.log(arrayList[i]);
        const subHtml = await axios.get(arrayList[i]).then(rsp=>{
            return rsp.data
        });
        const $ = cheerio.load(subHtml);
        const companyName = $('#company_name').text().trim();

        console.log('company name: '+ companyName);
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