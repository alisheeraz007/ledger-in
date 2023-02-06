export const UsersStatusCssClasses = ["danger", "success", "info", ""];
export const UsersStatusTitles = ["Blocked", "Active", ""];
export const UsersTypeCssClasses = ["success", "primary", ""];
export const UsersTypeTitles = ["user", "manager", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
  { text: "20", value: 20 },
];
export const initialFilter = {
  filter: {
    fullname: "",
    phoneNumber: "",
    email: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "db_id",
  pageNumber: 1,
  pageSize: 10,
};
