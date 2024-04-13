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

export default function DenseTable({ events }: { events: Conferences[] }) {
  return (
    <TableContainer component={Paper}>
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
    </TableContainer>
  );
}
