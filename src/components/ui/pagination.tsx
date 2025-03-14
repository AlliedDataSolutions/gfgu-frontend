import { FC } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  handlePageClick: (data: { selected: number }) => void;
}

export const Pagination: FC<PaginationProps> = ({ pageCount, handlePageClick }) => {
  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        className="flex items-center gap-2  shadow-lg rounded-md px-4 py-2 text-gray-700"
        pageClassName="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
        activeClassName="border-gray-700"
        breakLabel="..."
        nextLabel="Next »"
        previousLabel="« Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousClassName="px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
        nextClassName="px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
