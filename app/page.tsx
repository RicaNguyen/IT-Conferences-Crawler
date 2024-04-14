"use server";
import ResponsiveAppBar from "../components/appbar";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Box, Container, FormControl, Typography } from "@mui/material";
import ResultSearch from "@/components/resultsearch";
import { client, dbName } from "./db/mongo";
import { Conferences } from "./api/route";
import { NUMBER_ITEM_PER_PAGE } from "@/const/const";
import SearchBox from "@/components/searchBox";

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export default async function Home(props: PageProps) {
  console.log(props);
  const searchItem = props.searchParams.searchItem || "";
  let currentPageNumber = Number(props.searchParams.pageNumber) || 1;
  if (currentPageNumber < 0) {
    currentPageNumber = 1;
  }
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("events");
  const findResult = await collection.find({}).toArray();
  let events = findResult.map((item): Conferences => {
    return {
      id: item.id,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
      link: item.link,
      country: item.country,
    };
  });

  events = events.filter((user) =>
    user.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const totalPage = Math.ceil(events.length / NUMBER_ITEM_PER_PAGE);

  events = events.slice(
    (currentPageNumber - 1) * NUMBER_ITEM_PER_PAGE,
    currentPageNumber * NUMBER_ITEM_PER_PAGE
  );

  console.log("Found documents =>", findResult.length);
  console.log("currentPageNumber", currentPageNumber, totalPage);

  return (
    <div
      style={{
        backgroundImage: `url(images/background.png)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // height: "100vh",
        padding: 6,
      }}
    >
      <ResponsiveAppBar />
      <Box>
        <Typography
          textAlign="center"
          variant="h1"
          sx={{ marginBottom: 2 }}
          color={"black"}
        >
          IT CONFERENCES
        </Typography>
        {/* <Typography
          textAlign="center"
          variant="h4"
          sx={{ marginBottom: 2, marginTop: 2 }}
          color={"black"}
        >
          Crawler
        </Typography>
        <Typography
          textAlign="center"
          variant="h4"
          sx={{ marginBottom: 1, marginTop: 1 }}
          color={"black"}
        >
          Explore technology events with
        </Typography>
        <Typography
          textAlign="center"
          variant="h4"
          sx={{ marginBottom: 1 }}
          color={"black"}
        >
          the IT Conferences Crawler
        </Typography> */}
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <>
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  background: "white",
                }}
              >
                <SearchBox />
              </FormControl>
            </>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        <Typography
          textAlign="center"
          variant="h6"
          sx={{ marginTop: 2 }}
          color={"black"}
        >
          Rica Nguyen
        </Typography>
      </Box>
      <Container sx={{ marginTop: 4 }}>
        <ResultSearch events={events} totalPage={totalPage} />
      </Container>
    </div>
  );
}
