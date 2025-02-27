'use client';

import Iconify from '@/components/iconify';
import SearchField from '@/components/ui/custom-search';
import DataTable, { Column } from '@/components/ui/datatable';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PlanType, StatusType, useOffers } from '@/hooks/api/useOffers';
import useDebounce from '@/hooks/useDebounce';
import {
  Box,
  FormControl,
  Grid2 as Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState, useTransition } from 'react';

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

const OfferList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusType | ''>('');
  const [typeFilter, setTypeFilter] = useState<PlanType | ''>('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const [, startTransition] = useTransition();

  const { data, isLoading, error } = useOffers(
    page + 1,
    rowsPerPage,
    debouncedSearch,
    typeFilter,
    statusFilter,
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: StatusType) => {
    setStatusFilter(newValue);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = (row: Offer) => {
    console.log('Editing row:', row);
  };

  return (
    <ErrorBoundary>
      {/* Status Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs
          value={statusFilter}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Filter by Status"
        >
          <Tab label="All" value="" />
          <Tab label="Accepted" value="accepted" />
          <Tab label="Rejected" value="rejected" />
          <Tab label="Pending" value="pending" />
        </Tabs>
      </Box>

      {/* Search & Filters */}
      <Grid container spacing={2} sx={{ paddingX: 3, paddingY: 2.5, alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SearchField
            value={searchTerm}
            onChange={(e) => startTransition(() => setSearchTerm(e.target.value))}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as PlanType)}
              label="Filter by Plan Type"
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
              <MenuItem value="pay_as_you_go">Pay as you go</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* DataTable */}
      <Grid container>
        <DataTable<Offer>
          columns={[
            {
              id: 'user_name',
              label: 'Name',
              renderActions: (row) => (
                <Grid textAlign={'left'}>
                  <Typography>{row.user_name}</Typography>
                  <Typography variant="caption" color={theme.palette.text.disabled}>
                    {row.email}
                  </Typography>
                </Grid>
              ),
            },
            { id: 'phone', label: 'Phone' },
            { id: 'company', label: 'Company' },
            { id: 'jobTitle', label: 'Job Title' },
            { id: 'type', label: 'Type' },
            {
              id: 'status',
              label: 'Status',

              format: (value) => {
                const statusStyles = {
                  accepted: {
                    backgroundColor: theme.palette.success.lighter,
                    color: theme.palette.success.dark,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  },
                  rejected: {
                    backgroundColor: theme.palette.error.lighter,
                    color: theme.palette.error.dark,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  },
                  pending: {
                    backgroundColor: theme.palette.warning.lighter,
                    color: theme.palette.warning.dark,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  },
                } as const;

                return (
                  <Box
                    sx={{
                      ...statusStyles[value as StatusType],
                      display: 'inline-block',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}{' '}
                    {/* Capitalize first letter */}
                  </Box>
                );
              },
            },

            // {
            //   id: 'price',
            //   label: 'Price',
            //   align: 'right',
            //   format: (value) => `$${(value as number).toLocaleString()}`,
            // },
            {
              id: 'actions' as keyof Offer,
              label: 'Actions',
              align: 'center',
              renderActions: (row) => (
                <>
                  {/* Edit Button */}
                  <IconButton onClick={() => handleEdit(row)} size="small">
                    <Iconify icon="ic:baseline-edit" width={18} height={18} />
                  </IconButton>

                  {/* Menu with Three Dots */}
                  <IconButton onClick={(event) => handleMenuOpen(event, row.id)} size="small">
                    <Iconify icon="nrk:more" width={24} height={24} />
                  </IconButton>

                  {/* Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRowId === row.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem>View Details</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </Menu>
                </>
              ),
            },
          ]}
          data={data?.data || []}
          loading={isLoading}
          error={!!error}
          page={page}
          rowsPerPage={rowsPerPage}
          total={data?.meta.total || 0}
          onPageChange={setPage}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage);
            setPage(0);
          }}
        />
      </Grid>
    </ErrorBoundary>
  );
};

export default OfferList;
