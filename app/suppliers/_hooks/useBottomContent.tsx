import { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import { Button, Pagination } from "@nextui-org/react";

export const useBottomContent = ({
  page,
  setPage,
  pages,
  onNextPage,
  onPreviousPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) => {
  return useMemo(() => {
    return (
      <div className="py-5 px-5 flex justify-between items-center bg-slate-300 rounded-md">
        <div className="hidden sm:flex w-[30%] justify-start gap-2">
          <Button
            className="bg-white px-7"
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-white px-7"
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);
};
