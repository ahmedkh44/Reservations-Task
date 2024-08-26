import { Select, Option } from "@mui/joy";
import React from "react";

interface FilterState {
    status?: string;
    date?: string;
    shift?: string;
    area?: string;
    sortBy?: "name" | "quantity" | "all";
  }
  

interface FilterSelectProps {
    placeholder: string;
    options: {value: string; label : string}[];
    filterName: keyof FilterState;
    handleChange: (filterName: keyof FilterState) => (event: any, newValue: any) => void
    width?: number | string
}

const FilterSelect: React.FC<FilterSelectProps> = ({
    placeholder,
    options,
    filterName,
    handleChange,
    width = "100%",
  }) => (
    <Select placeholder={placeholder} onChange={handleChange(filterName)} sx={{ width }}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
  
  export default FilterSelect;