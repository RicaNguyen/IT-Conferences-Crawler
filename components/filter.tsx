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
import { Conferences } from "@/app/api/route";
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
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
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const params = new URLSearchParams(searchParams);
    if (value) {
      if (typeof value === "string") {
        params.set("countryItem", value);
      } else {
        params.set("countryItem", value.join(",")); // value.join(noi mang boi dau ",")
      }
    } else {
      params.delete("country");
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
            value={personName}
            onChange={handleChange}
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
            {countries.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-multiple-chip-label">Calendar</InputLabel>
        </FormControl>
      </Grid>
    </Grid>
  );
}
