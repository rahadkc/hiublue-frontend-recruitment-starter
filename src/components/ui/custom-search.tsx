import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import Iconify from '../iconify';

const SearchField = ({
  value,
  onChange,
  placeholderText = 'Search by name',
}: {
  value: string;
  placeholderText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="iconoir:search" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
