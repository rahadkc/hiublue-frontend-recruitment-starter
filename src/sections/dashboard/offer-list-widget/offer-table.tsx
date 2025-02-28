import Iconify from '@/components/iconify';
import DataTable, { Column } from '@/components/ui/datatable';
import { OfferType, StatusType } from '@/hooks/api/useOffers';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

interface OfferTableProps {
  data: OfferType[];
  loading: boolean;
  error: boolean;
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const OfferTable: React.FC<OfferTableProps> = ({
  data,
  loading,
  error,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const columns: Column<OfferType, keyof OfferType>[] = [
    {
      id: 'user_name',
      label: 'Name',
      renderActions: (row) => (
        <Box textAlign="left">
          <Typography>{row.user_name}</Typography>
          <Typography variant="caption" color={theme.palette.text.disabled}>
            {row.email}
          </Typography>
        </Box>
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
              fontWeight: 700,
            }}
          >
            {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
          </Box>
        );
      },
    },
    {
      id: 'actions' as keyof OfferType,
      label: 'Actions',
      align: 'center',
      renderActions: (row) => (
        <>
          <IconButton onClick={() => console.log('Editing row:', row)} size="small">
            <Iconify icon="ic:baseline-edit" width={18} height={18} />
          </IconButton>
          <IconButton onClick={(event) => handleMenuOpen(event, row.id)} size="small">
            <Iconify icon="nrk:more" width={24} height={24} />
          </IconButton>
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
            <MenuItem onClick={() => console.log('View Details:', row)}>View Details</MenuItem>
            <MenuItem onClick={() => console.log('Deleting row:', row)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <DataTable<OfferType>
      columns={columns}
      data={data}
      loading={loading}
      error={error}
      page={page}
      rowsPerPage={rowsPerPage}
      total={total}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default OfferTable;
