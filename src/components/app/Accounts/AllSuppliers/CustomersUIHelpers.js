export const CustomerStatusCssClasses = ["danger", "success", "info", ""];
export const CustomerStatusTitles = ["Suspended", "Active", "Pending", ""];
export const CustomerTypeCssClasses = ["success", "primary", ""];
export const CustomerTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
  { text: "20", value: 20 },
];
export const initialFilter = {
  filter: {
    CustomerName: "",
    email: "",
    phoneNumber: "",
    Address: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "db_id",
  pageNumber: 1,
  pageSize: 10,
};
