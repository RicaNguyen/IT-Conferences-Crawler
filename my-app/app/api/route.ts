// app/api/route.js 👈🏽
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as _ from "lodash";
type Event = {
  id: string;
  name: string;
  link: string;
  country: string;
  location: string;
  startDate: string;
  endDate: string;
};

const MONTH2CHAR: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
// To handle a GET request to /api
export async function GET(request) {
  // Launch the browser and open a new blank page

  let result: Event[] = [];
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  try {
    // lấy 20 page đầu tiên
    for (let pageNumber = 1; pageNumber <= 20; pageNumber++) {
      // Navigate the page to a URL
      const queryPageNumber = "?page=" + pageNumber;
      await page.goto(
        `https://dev.events/tech${pageNumber === 1 ? "" : queryPageNumber}`
      );

      try {
        await page.waitForSelector("#events", {
          timeout: 120000,
          visible: true,
        }); // Adjust the timeout as needed

        const tableData = await page.evaluate(async (MONTH2CHAR) => {
          const divEventsItems = document.getElementById("events");

          if (!divEventsItems) {
            return [];
          }

          const listItem = divEventsItems.children;

          let rs: Event[] = [];
          for (let i = 4; i < divEventsItems.children.length; i++) {
            // query h4 -> a, get text and href
            let objData: Event = {
              id: "",
              name: "",
              link: "",
              country: "",
              location: "",
              startDate: "",
              endDate: "",
            };

            const elementTime = listItem.item(i)?.querySelector("time");
            if (elementTime) {
              let temp = (elementTime.textContent || "")
                .split(/\n| /)
                .filter((timeItem) => timeItem);

              // if (temp.length === 3) {
              //   objData.date = `${temp[0]} ${temp[1]}, 20${temp[2]}`;
              // }

              const year = `20${temp[2]}`;
              const month = MONTH2CHAR[temp[0]];
              if (temp[1].length > 2) {
                let [startDate, endDate] = temp[1].split("-");
                startDate = startDate.padStart(2, "0");
                endDate = endDate.padStart(2, "0");
                objData.startDate = `${year}-${month}-${startDate}`;
                objData.endDate = `${year}-${month}-${endDate}`;
              } else {
                objData.startDate = `${year}-${month}-${temp[1]}`;
                objData.endDate = objData.startDate;
              }
            }
            const elementLink = listItem.item(i)?.querySelector("a");
            if (elementLink) {
              objData.link =
                "https://dev.events" + elementLink.getAttribute("href");
              objData.name = elementLink.textContent || "";
              objData.id = objData.link;
            }

            const elementLocation = listItem.item(i)?.querySelector("h3");
            if (elementLocation) {
              objData.location = elementLocation.innerText;
              const locationAndCountry = elementLocation.innerText.split(",");
              objData.country =
                locationAndCountry[locationAndCountry.length - 1].trim();
            } // const elementSpans = listItem.item(i)?.querySelectorAll("span");
            // if (elementSpans) {
            //   const elementBTextContent = elementSpans[1].textContent;
            //   if (elementBTextContent) {
            //     // tách chuỗi theo \n hoặc space
            //     // https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
            //     // remove các chuỗi rỗng, chuỗi "-" bằng hàm filter
            //     let temp = elementBTextContent
            //       .split(/\n| /)
            //       .filter((i: string) => i);
            //     // vd: "08-04-2024 - 11-04-2024 -\n            Leuven\n" sẽ ra
            //     // output  [
            //     //      "08-04-2024",
            //     //     "-",
            //     //      "11-04-2024",
            //     //      "-",
            //     //      "Leuven"
            //     //  ]
            //     // let startDate =
            //     objData.startDate = temp[0];
            //     objData.endDate = temp[2];
            //     objData.location = temp[4];
            //   }
            // }
            rs.push(objData);
          }

          return rs;
        }, MONTH2CHAR);

        result = result.concat(tableData);
      } catch (error) {
        console.log(error);
      }
    }

    await browser.close();
    // loại bỏ các event không có link, name khỏi kq
    result = result.filter(
      (eventItem: Event) => eventItem.id && eventItem.name
    );

    const countryList = _.countBy(result, "country");
    return NextResponse.json(
      {
        message: "Hello World",
        count: result.length,
        tableData: result,
        countryList,
      },
      { status: 200 }
    );
  } catch (error) {
    await browser.close();
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// To handle a POST request to /api
export async function POST(request) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://developer.chrome.com/");
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
