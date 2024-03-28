// app/api/route.js 👈🏽
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// To handle a GET request to /api
export async function GET(request) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://dev.events/tech");

  try {
    await page.waitForSelector("#events", {
      timeout: 120000,
      visible: true,
    }); // Adjust the timeout as needed

    const tableData = await page.evaluate(async () => {
      const divEventsItems = document.getElementById("events");

      if (!divEventsItems) {
        return [];
      }

      const listItem = divEventsItems.children;

      let rs = [];
      for (let i = 4; i < divEventsItems.children.length; i++) {
        // query h4 -> a, get text and href
        let objData: Record<string, any> = {
          id: "",
          name: "",
          link: "",
          date: "",
          location: "",
        };

        const elementTime = listItem.item(i)?.querySelector("time");
        if (elementTime) {
          let temp = (elementTime.textContent || "")
            .split(/\n| /)
            .filter((timeItem) => timeItem);

          if (temp.length === 3) {
            objData.date = `${temp[0]} ${temp[1]}, 20${temp[2]}`;
          }
        }
        const elementLink = listItem.item(i)?.querySelector("a");
        if (elementLink) {
          objData.link =
            "https://dev.events" + elementLink.getAttribute("href");
          objData.name = elementLink.textContent;
        }
        const elementLocation = listItem.item(i)?.querySelector("h3");
        if (elementLocation) {
          objData.location = elementLocation.innerText;
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
    });

    await browser.close();

    return NextResponse.json(
      { message: "Hello World", tableData },
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
