export default class UsersActions {
  static GetAllUsers(data) {
    return {
      type: "Get_All_Users",
      payload: data,
    };
  }
  static AddUsers(data) {
    return {
      type: "Add_Users",
      payload: data,
    };
  }
}
