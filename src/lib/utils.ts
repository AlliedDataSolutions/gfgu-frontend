import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(value: string) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
};


export const onExport = (columnMapping: { [key: string]: string; }, rowData: any[], file_name: string): void => {

  const data = rowData?.map((item) => {
    var obj: { [key: string]: string | undefined | {} } = {};
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === "object") {
        obj = { ...obj, ...value };
      } else {
        if (columnMapping[key]) {
          obj[columnMapping[key]] =
            columnMapping[key].toLocaleLowerCase().includes("date") &&
              value &&
              (typeof value === "string" || typeof value === "number") &&
              !isNaN(new Date(value).getTime())
              ? `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`
              : value;
        }
      }
    });
    return obj;
  });
  ExcelExport(data, file_name);
};

const ExcelExport = (data: any[], file_name: string) => {

  const today = new Date();
  const month = today.toLocaleString('default', { month: 'short' }); 
  const day = String(today.getDate()).padStart(2, '0'); 
  const year = today.getFullYear(); 

  let hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 
  const formattedHours = String(hours).padStart(2, '0');

  const timestamp = `${month}-${day}-${year} ${formattedHours}-${minutes} ${ampm}`;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${file_name} ${timestamp}.xlsx`);
};