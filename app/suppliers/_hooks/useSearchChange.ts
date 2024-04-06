import { useCallback } from "react";

export const useSearchChange = (
  setFilterValue: (value: string) => void,
  setPage: (value: number) => void,
) => {
  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [setFilterValue, setPage],
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setFilterValue, setPage]);

  return { onSearchChange, onClear };
};
