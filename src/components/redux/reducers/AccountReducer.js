const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  All_entries: [],
  Account_entries: [],
  ProductForEdit: undefined,
  lastError: null,
};
export default function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case "Get_All_Account":
      return {
        ...state,
        entities: action.payload,
        totalCount: action.payload.length,
      };
    case "Add_Account_Head":
      state.entities.push(action.payload);
      state.totalCount = state.entities.length;
      return state;
    case "Get_AllEntires":
      return {
        ...state,
        All_entries: action.payload,
        Account_entries: action.AccEntry,
      };
    default:
      return state;
  }
}
