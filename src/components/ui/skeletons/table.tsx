import {
  Table as MuiTable,
  Paper,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { memo } from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  tableHead?: boolean;
}

export const TableSkeleton = memo(
  ({ rows = 7, columns = 7, tableHead = false }: TableSkeletonProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const responsiveCols = isMobile ? columns / 2 : columns;

    return (
      <TableContainer component={Paper}>
        <MuiTable>
          {tableHead ? (
            <TableHead>
              <TableRow
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? 'repeat(auto-fit, minmax(50%, 1fr))'
                    : 'repeat(auto-fit, minmax(25%, 1fr))',
                }}
              >
                {Array.from({ length: responsiveCols }).map((_, colIndex) => (
                  <TableCell
                    key={`header-${colIndex}`}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Skeleton variant="text" animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          ) : (
            <></>
          )}
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`,
                }}
              >
                {Array.from({ length: responsiveCols }).map((_, colIndex) => (
                  <TableCell
                    key={`cell-${rowIndex}-${colIndex}`}
                    sx={{
                      width: '100%',
                      borderRadius: 0,
                    }}
                  >
                    <Skeleton variant="text" animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  },
);

export default TableSkeleton;
