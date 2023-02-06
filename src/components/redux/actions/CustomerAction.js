export default class CustomerActions {
  static GetAllCustomer(data) {
    return {
      type: "Get_All_Customer",
      payload: data,
    };
  }
  static AddCustoemr(data) {
    return {
      type: "Add_Customer",
      payload: data,
    };
  }
}
