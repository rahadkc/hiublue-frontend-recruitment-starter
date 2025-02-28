import { StatusType } from '@/hooks/api/useOffers';
import { Tab, Tabs } from '@mui/material';
import React from 'react';

interface StatusFilterProps {
  value: string;
  onChange: (newValue: StatusType) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  const handleTabChange = (_event: React.SyntheticEvent, newValue: StatusType) => {
    onChange(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="Filter by Status"
      sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}
    >
      <Tab label="All" value="" />
      <Tab label="Accepted" value="accepted" />
      <Tab label="Rejected" value="rejected" />
      <Tab label="Pending" value="pending" />
    </Tabs>
  );
};

export default StatusFilter;
