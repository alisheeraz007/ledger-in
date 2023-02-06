export default class SupplierProductActions {
  static GetAllProduct(data) {
    return {
      type: "Get_All_supProduct",
      payload: data,
    };
  }
  static AddProduct(data) {
    return {
      type: "Add_supProduct",
      payload: data,
    };
  }
}
