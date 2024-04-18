"use server";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Box, Container, FormControl, Typography } from "@mui/material";
import ResultSearch from "@/components/resultsearch";
import { NUMBER_ITEM_PER_PAGE } from "@/const/const";
import SearchBox from "@/components/searchBox";
import FilterConferencesEvent from "@/components/filter";
import ResponsiveAppBar from "@/components/appbar";
import { Conferences } from "../api/route";
import { client, dbName } from "../db/mongo";

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export default async function Home(props: PageProps) {
  console.log(props);
  //get country
  const countryItem = props.searchParams.countryItem || "";

  //get searchITem
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

  let countries = findResult.map((item): string => {
    return item.country;
  });
  //remove duplicate countries item
  let newcountries: string[] = [];
  countries.forEach((item) => {
    if (!newcountries.includes(item)) {
      newcountries.push(item);
    }
  });
  if (countryItem) {
    events = events.filter((event) =>
      countryItem.toLowerCase().includes(event.country.toLowerCase())
    );
  }

  events = events.filter((event) =>
    event.name.toLowerCase().includes(searchItem.toLowerCase())
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
      </Box>

      <Container sx={{ marginTop: 4 }}>
        <FilterConferencesEvent countries={newcountries} />
        <ResultSearch events={events} totalPage={totalPage} />
      </Container>
    </div>
  );
}
