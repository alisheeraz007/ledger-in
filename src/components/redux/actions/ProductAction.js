export default class ProductActions {
  static GetAllProduct(data) {
    return {
      type: "Get_All_Product",
      payload: data,
    };
  }
  static AddProduct(data) {
    return {
      type: "Add_Product",
      payload: data,
    };
  }
}
