"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [searchItem, setSearchItem] = useState(params.get("searchItem"));

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const handleOnClickSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchItem) {
      params.set("searchItem", searchItem);
    } else {
      params.delete("searchItem");
    }
    console.log(searchItem);
    replace(`${pathname}?${params.toString()}`);
    console.log(searchItem);
  };

  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  return (
    <TextField
      placeholder="Type to search"
      id="searchText"
      value={searchItem}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleOnClickSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
