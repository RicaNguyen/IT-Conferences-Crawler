import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { dymmyData } from "@/const/dummydata";

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Name Conferences</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Location
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Time
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Topic
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Speaker
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dymmyData.map((row) => (
            <TableRow
              key={row.NameConferences}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.NameConferences}</TableCell>
              <TableCell component="th" scope="row">
                {row.Location}
              </TableCell>
              <TableCell align="right">{row.Time}</TableCell>
              <TableCell align="right">{row.Topic}</TableCell>
              <TableCell align="right">{row.Speaker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
