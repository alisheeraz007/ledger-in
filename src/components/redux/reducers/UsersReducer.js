const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  UsersForEdit: undefined,
  lastError: null,
};
export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case "Get_All_Users":
      return {
        ...state,
        entities: action.payload,
        totalCount: action.payload.length,
      };
    case "Add_Users":
      state.entities.push(action.payload);
      state.totalCount = state.entities.length;
      return state;
    default:
      return state;
  }
}
