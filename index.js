var request = require('request');
var cheerio = require('cheerio');
var ctrl = require('./controllers/item');

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    try {
      var $ = cheerio.load(body);
      var item = {};
      item.info = []
      item.hobby = []

      item.id = $('div#wrapper_left > div.tc.f16.fb > a').attr('href').replace(/[^0-9]/ig, "");
      item.name = $('div#wrapper_left .tc.f16.fb').text().trim();
      item.head = $('div#wrapper_left .tc.mt5.p10 a img').attr('src');
      item.city = $('div#wrapper_left ul:nth-child(4) li:nth-child(2) span:nth-child(2)').text();
      item.org = $('div#wrapper_left ul:nth-child(4) li:nth-child(1) a').text();
      item.email = $('div#wrapper_left ul:nth-child(4) li:nth-child(3) span:nth-child(2)').text();

      // info
      $('div#ctl00_ContentPlaceHolderMain_UserInfoDiv ul li').each(function () {
        let sign = ($(this).text().split(":"));
        let obj = {}
        obj[sign[0]] = sign[1];
        item.info.push(obj);
      });

      // hobby
      $('div#ctl00_ContentPlaceHolderMain_HobbyInfo ul li').each(function () {
        let sign = ($(this).text().split(":"));
        let obj = {}
        obj[sign[0]] = sign[1];
        item.hobby.push(obj);
      });

      // console.log(item);
      ctrl.saveItem(item);
    } catch (error) {
      console.log('error');
    }
  } else {
    console.log('net error');
  }
}

async function spider(begin = 1, end = 3424260) {
  for (let i = begin; i <= end; i++) {
    await request({
      url: `http://worlduc.com/SpaceShow/UserInfo.aspx?uid=${i}`,
      method: "GET", // body: JSON.stringify(requestData)  //post参数字符串
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "ASP.NET_SessionId=a3k5sfxv0avi5t1oqd2s34ss; BIGipServerweb_80=386076844.0.0000; WorldUC_ClientIdentity=e30f608aadb24ec39aafe0c127169f38; SnsUserToken=token=ZlGRKai3W1An1qZR0CfLrwGfLyF35Ku7J7iV00e250hHwMM8GZom+B+LSPx7V12Hxt34BJq0UMY=&headpic=201879105748rCNFB.jpg"
      }
    }, callback)
  }
}

spider(1, 10000);