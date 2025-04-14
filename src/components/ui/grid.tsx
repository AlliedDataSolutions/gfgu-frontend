import { FC } from "react";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Pagination } from "./pagination";

interface IGrid extends AgGridReactProps {
  page: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const AgGrid: FC<IGrid> = ({
  onPageChange,
  onLimitChange,
  page,
  pageSize,
  totalRecords,
  ...rest
}) => {
  return (
    <>
      <AgGridReact
        gridOptions={{
          autoSizeStrategy: {
            type: "fitGridWidth",
          },
        }}
        pagination={false}
        {...rest}
      />
      <Pagination
        pageCount={Math.ceil(totalRecords / pageSize)} // Use totalRecords/pageSize
        handlePageClick={(data) => {
          // data.selected is zero-based
          onPageChange(data.selected);
        }}
       />
      </>
  );
};

export default AgGrid;
