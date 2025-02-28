'use client';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

type FilterType = 'this-week' | 'prev-week';

const DashboardHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentFilter = (searchParams.get('filter') as FilterType) || 'this-week';

  const onFilterChange = (event: SelectChangeEvent<FilterType>) => {
    const filter = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', filter);
    router.push(`?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <Select
        value={currentFilter}
        onChange={onFilterChange}
        size="small"
        defaultValue="this-week"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="this-week">This Week</MenuItem>
        <MenuItem value="prev-week">Previous Week</MenuItem>
      </Select>
    </Box>
  );
};

export default DashboardHeader;
