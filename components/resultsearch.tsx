"use client";
import * as React from "react";
import { Conferences } from "@/app/api/route";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Grid, Stack, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ResultSearch({
  events,
  totalPage,
}: {
  totalPage: number;
  events: Conferences[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("pageNumber", value + "");
    } else {
      params.delete("pageNumber");
    }
    console.log(value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Grid container spacing={2}>
        {events.map((row, index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ minHeight: "175px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  {row.name}
                </Typography>

                <Stack alignItems="center" direction="row" gap={1}>
                  <EventIcon color="success" />
                  <Typography variant="body1">
                    {row.startDate} to {row.endDate}{" "}
                  </Typography>
                </Stack>

                <Stack alignItems="center" direction="row" gap={1}>
                  <LocationOnIcon color="warning" />
                  <Typography variant="body1">{row.location}</Typography>
                </Stack>

                <Stack alignItems="center" direction="row" gap={1}>
                  <PublicIcon color="info" />
                  <Typography
                    variant="body1"
                    component={"a"}
                    href={row.link}
                    target="_blank"
                  >
                    {row.link}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          margin: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={totalPage} onChange={handleChange} />
      </Box>
    </>
  );
}
