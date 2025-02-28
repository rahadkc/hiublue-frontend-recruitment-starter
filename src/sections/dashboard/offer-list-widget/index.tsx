'use client';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PlanType, StatusType, useOffers } from '@/hooks/api/useOffers';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import OfferTable from './offer-table';
import SearchFilter from './search-filter';
import StatusFilter from './status-filter';

const OfferListWidget: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusType | ''>('');
  const [typeFilter, setTypeFilter] = useState<PlanType | 'all'>('all');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useOffers({
    page: page + 1,
    perPage: rowsPerPage,
    search: debouncedSearch,
    type: typeFilter,
    status: statusFilter,
  });

  return (
    <ErrorBoundary>
      {/* Status Filter */}
      <StatusFilter
        value={statusFilter}
        onChange={(newValue) => {
          setPage(0);
          setStatusFilter(newValue);
        }}
      />

      {/* Search & Type Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={(value) => {
          setPage(0);
          setTypeFilter(value);
        }}
      />

      {/* Data Table */}
      <OfferTable
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
    </ErrorBoundary>
  );
};

export default OfferListWidget;
