import SearchField from '@/components/ui/custom-search';
import { PlanType } from '@/hooks/api/useOffers';
import { FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: PlanType) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}) => {
  return (
    <Grid container spacing={2} sx={{ paddingX: 3, paddingY: 2.5, alignItems: 'center' }}>
      {/* Search Field */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <SearchField value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
      </Grid>

      {/* Type Filter Dropdown */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as PlanType & 'all')}
            label="Filter by Plan Type"
            // displayEmpty
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="pay_as_you_go">Pay as you go</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchFilter;
