// import {
//   Card,
//   Grid2 as Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import React from 'react';
// import TableSkeleton from './skeletons/table';

// export interface Column<T, K extends keyof T> {
//   id: K;
//   label: string;
//   align?: 'left' | 'right' | 'center';
//   format?: (value: T[K]) => string | React.ReactNode;
// }

// interface DataTableProps<T extends { id: number | string }> {
//   columns: Column<T, keyof T>[];
//   data: T[];
//   loading: boolean;
//   error: boolean;
//   page: number;
//   rowsPerPage: number;
//   total: number;
//   skeletonRows?: number;
//   skeletonCols?: number;
//   onPageChange: (newPage: number) => void;
//   onRowsPerPageChange: (newRowsPerPage: number) => void;
// }

// const DataTable = <T extends { id: number | string }>({
//   columns,
//   data,
//   loading,
//   error,
//   page,
//   rowsPerPage,
//   total,
//   skeletonRows = 4,
//   skeletonCols = 4,
//   onPageChange,
//   onRowsPerPageChange,
// }: DataTableProps<T>) => {
//   if (loading)
//     return (
//       <Card
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '100%',
//           borderRadius: 0,
//         }}
//       >
//         <TableSkeleton rows={skeletonRows} columns={skeletonCols} />
//       </Card>
//     );

//   if (error)
//     return (
//       <Card
//         sx={{
//           padding: 3,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography color="error">Error loading data.</Typography>
//       </Card>
//     );
//   return (
//     <>
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <Grid container spacing={2}>
//           <Grid size={12}>
//             <div style={{ overflowX: 'auto', width: '100%' }}>
//               <TableContainer sx={{ minWidth: 650, maxHeight: 440 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                   <TableHead>
//                     <TableRow>
//                       {columns.map((column) => (
//                         <TableCell key={column.id.toString()} align={column.align || 'left'}>
//                           {column.label}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {data.length > 0 ? (
//                       data.map((row) => (
//                         <TableRow key={row.id}>
//                           {columns.map((column) => {
//                             const value = row[column.id];
//                             return (
//                               <TableCell key={column.id.toString()} align={column.align || 'left'}>
//                                 {column.format ? column.format(value) : (value as React.ReactNode)}
//                               </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={columns.length}>
//                           <Typography textAlign={'center'}>No match found</Typography>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           </Grid>
//           <Grid size={12}>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={total}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={(_event, newPage) => onPageChange(newPage)}
//               onRowsPerPageChange={(event) =>
//                 onRowsPerPageChange(Number.parseInt(event.target.value, 10))
//               }
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//     </>
//   );
// };

// export default DataTable;

import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import TableSkeleton from './skeletons/table';

export interface Column<T, K extends keyof T> {
  id: K;
  label: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: T[K]) => React.ReactNode;
  renderActions?: (row: T) => React.ReactNode;
}

const DataTable = <T extends { id: number | string }>({
  columns,
  data,
  loading,
  error,
  page,
  rowsPerPage,
  total,
  skeletonRows,
  skeletonCols,
  onPageChange,
  onRowsPerPageChange,
}: {
  columns: Column<T, keyof T>[];
  data: T[];
  loading: boolean;
  error: boolean;
  page: number;
  skeletonRows?: number;
  skeletonCols?: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}) => {
  //   if (loading){
  //     return (
  //       <Card
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           width: '100%',
  //           borderRadius: 0,
  //         }}
  //       >
  //         <TableSkeleton rows={skeletonRows} columns={skeletonCols} />
  //       </Card>
  //     );
  // }

  if (error) {
    return (
      <Card
        sx={{
          padding: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">Error loading data.</Typography>
      </Card>
    );
  }

  return (
    <>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id.toString()} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {/* <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      borderRadius: 0,
                    }}
                  > */}
                  <TableSkeleton rows={skeletonRows} columns={skeletonCols} />
                  {/* </Card> */}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  if (column.renderActions) {
                    return (
                      <TableCell key={column.id.toString()} align="center">
                        {column.renderActions(row)}
                      </TableCell>
                    );
                  }

                  const value = row[column.id];
                  return (
                    <TableCell key={column.id.toString()} align={column.align || 'left'}>
                      {column.format ? column.format(value) : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(Number.parseInt(event.target.value, 10))
        }
      />
    </>
  );
};

export default DataTable;
