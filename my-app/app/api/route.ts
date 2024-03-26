// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// To handle a GET request to /api
export async function GET(request) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1080,
      height: 1024,
    },
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://research.com/upcoming-conferences/computer-science",
    { waitUntil: "domcontentloaded" }
  );

  //   const result = await page.waitForSelector("#header");
  //   console.log(result?.toString());
  // return NextResponse.json({ message: "Hello World" , length: result}, { status: 200 });

  //   await page.setContent(`
  //     <div class="container">
  //         <div class="child">A</div>
  //         <div class="child">B</div>
  //         <div class="child">C</div>
  //     </div>
  //     `);

  //   let children = await page.$eval("[id='header']", (e) => {
  //     console.log(e.tagName);
  //     const data = [];
  //     for (const child of e.children) {
  //       data.push({ tagName: child.tagName, innerText: child.innerText });
  //     }
  //     return data;
  //   });
  //   console.log(children);
  // Getting the element with ID 'unique-element'
  //   const uniqueElement = await page.$("#rankingItems");

  //   const uniqueElement = await page.waitForSelector("#rankingItems", {
  //     timeout: 12000,
  //   });

  //   console.log(uniqueElement);

  //   const element = await page.evaluate(() => {
  //     // executed in the browser
  //     return document.querySelector("#rankingItems");
  //   });

  //   const selector = "#rankingItems";
  const selector = "#rankingItems";
  const text = await page.evaluate(`
  document.querySelector("${selector}").children.length
    `);

  console.log(text); // => Example Domain
  //   await browser.close();
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
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
