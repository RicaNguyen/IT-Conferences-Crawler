"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { dymmyData } from "@/const/dummydata";
import { Conferences } from "@/app/api/route";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Stack, Typography } from "@mui/material";
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
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name Conferences</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Location
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Start Time
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                End Time
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Link
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell component="th" scope="row">
                  {row.location}
                </TableCell>
                <TableCell align="left">{row.startDate}</TableCell>
                <TableCell align="left">{row.endDate}</TableCell>
                <TableCell align="left">{row.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Stack
        spacing={2}
        marginTop={2}
        justifyItems={"center"}
        direction={"row"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
      <Grid container spacing={2}>
        {events.map((row, index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ minHeight: "175px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  {row.name}
                </Typography>

                <Stack alignItems="center" direction="row" gap={1}>
                  <EventIcon />
                  <Typography variant="body1">
                    {row.startDate} to {row.endDate}{" "}
                  </Typography>
                </Stack>

                <Stack alignItems="center" direction="row" gap={1}>
                  <LocationOnIcon />
                  <Typography variant="body1">{row.location}</Typography>
                </Stack>

                <Stack alignItems="center" direction="row" gap={1}>
                  <PublicIcon />
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
    </>
  );
}
