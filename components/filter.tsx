"use client";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Grid } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  country: string,
  filterByCountry: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      filterByCountry.indexOf(country) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FilterConferencesEvent({
  countries,
}: {
  countries: string[];
}) {
  //react hook
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const theme = useTheme();
  const params = new URLSearchParams(searchParams);

  let filterByCountry: string[] = [];
  if (params.get("countryItem")) {
    filterByCountry = params.get("countryItem")?.split(",") || [];
  }

  const handleChangeCountry = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    if (value) {
      if (typeof value === "string") {
        params.set("countryItem", value);
      } else {
        params.set("countryItem", value.join(",")); // value.join(noi mang boi dau ",")
      }
    } else {
      params.delete("countryItem");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // timesort
  let typeSortItem: string = "";
  if (params.get("typeSortItem")) {
    typeSortItem = params.get("typeSortItem") || "";
  }

  const handleChangeSort = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    if (value) {
      params.set("typeSortItem", value); // value.join(noi mang boi dau ",")
    } else {
      params.delete("typeSortItem");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Grid container spacing={4} marginBottom={2}>
      <Grid item xs={6}>
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-multiple-chip-label">Country</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={filterByCountry}
            onChange={handleChangeCountry}
            input={<OutlinedInput id="select-multiple-chip" label="Country" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {countries.map((country) => (
              <MenuItem
                key={country}
                value={country}
                style={getStyles(country, filterByCountry, theme)}
              >
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select value={typeSortItem} onChange={handleChangeSort} label="Time">
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Latest"}>Latest</MenuItem>
            <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
