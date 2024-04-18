import { useCallback } from "react";

const usePage = (
  page: number,
  setPage: (value: number) => void,
  pages: number,
) => {
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);
  /////////////////////////////////////////////////////
  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  return { onNextPage, onPreviousPage };
};

export default usePage;

import React from "react";

export const useRowsPerPage = (
  setRowsPerPage: (value: number) => void,
  setPage: (value: number) => void,
) => {
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );
  return { onRowsPerPageChange };
};
