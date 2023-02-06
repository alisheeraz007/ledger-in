export default class AccountActions {
  static GetAllAccount(data) {
    return {
      type: "Get_All_Account",
      payload: data,
    };
  }
  static AddAccountHead(data) {
    return {
      type: "Add_Account_Head",
      payload: data,
    };
  }
  static Get_AllEntries(data, AccEntry) {
    return {
      type: "Get_AllEntires",
      payload: data,
      AccEntry,
    };
  }
}
