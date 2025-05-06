import * as cheerio from "cheerio";
export const load = async ({ fetch }) => {
  try {
    const response = await fetch("https://www.kajariaeternity.com/ajaxgetData.php", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,en-IN;q=0.7,ru;q=0.6",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"136\", \"Microsoft Edge\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      body: `row=0&table_name=product&order_by=++&where=+where+category+LIKE+'Eternity%25'+AND+region+like+'%25North%25'+AND+filter1+like+'%25Infinity%25'`,
      method: "POST"
    });


    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const extractedData = [];
    $('li.post').each((_, element) => {
      const imgLink = $(element).find('img.animate').attr('src');
      const title = $(element).find('h4').text().trim();
      const description = $(element).find('p').text().trim();
      const size = $(element).find('.etnPdtSize').text().trim();

      extractedData.push({ imgLink, title, description, size });
    });
    console.log(extractedData)
    return { extractedData }
  } catch (error) {
    console.error(error)
    return { error: 'Unable to fetch currencies' }
  }
}