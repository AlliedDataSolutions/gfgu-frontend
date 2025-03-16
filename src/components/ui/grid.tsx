import { FC } from "react";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Pagination } from "./pagination";

interface IGrid extends AgGridReactProps, IPagination {}

interface IPagination {
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
        // onPaginationChanged={onPaginationChanged}
        {...rest}
      />
          <Pagination pageCount={pageSize} handlePageClick={(data: {
              selected: number;
          }) => { 
                onPageChange(data.selected + 1);
          }} />
      </>
  );
};



export default AgGrid;
