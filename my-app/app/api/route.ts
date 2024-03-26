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
  await page.goto("https://research.com/upcoming-conferences/computer-science");

  try {
    await page.waitForSelector("#rankingItems", {
      timeout: 120000,
      visible: true,
    }); // Adjust the timeout as needed

    const tableData = await page.evaluate(async () => {
      const divRankingItems = document.getElementById("rankingItems");

      if (!divRankingItems) {
        return [];
      }

      const listItem = divRankingItems.children;

      let rs = [];
      for (let i = 0; i < divRankingItems.children.length; i++) {
        // query h4 -> a, get text and href
        let objData: Record<string, any> = {
          id: "",
          name: "",
          link: "",
        };

        const elementA = listItem.item(i)?.querySelector("a");
        if (elementA) {
          objData.link = elementA.getAttribute("href");
          objData.name = elementA.textContent;

          rs.push(objData);
        }
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
