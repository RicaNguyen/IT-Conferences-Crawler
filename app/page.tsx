"use client";
import ResponsiveAppBar from "../components/appbar";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DenseTable from "@/components/resultsearch";

export default function Home() {
  return (
    <div>
      <ResponsiveAppBar />
      <Box
        style={{
          // backgroundImage: `url(images/Background.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // height: "100vh",
          padding: 6,
        }}
      >
        <Typography
          textAlign="center"
          variant="h1"
          sx={{ marginBottom: 2 }}
          color={"black"}
        >
          IT CONFERENCES
        </Typography>
        <Typography
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
                <TextField
                  placeholder="Search"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
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
        <DenseTable />
      </Container>
    </div>
  );
}
