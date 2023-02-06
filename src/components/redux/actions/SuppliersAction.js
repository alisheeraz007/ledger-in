export default class CustomerActions {
    static GetAllSupplier(data) {
      return {
        type: "Get_All_Supplier",
        payload: data,
      };
    }
    static AddSupplier(data) {
      return {
        type: "Add_Supplier",
        payload: data,
      };
    }
  }
  