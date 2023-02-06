const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  customerForEdit: undefined,
  lastError: null,
};
export default function CustomerReducer(state = initialState, action) {
  switch (action.type) {
    case "Get_All_Customer":
      // state.entities = action.payload;
      // state.totalCount = action.payload.length;
      return {
        ...state,
        entities: action.payload,
        totalCount: action.payload.length,
      };
    case "Add_Customer":
      return state;
    default:
      return state;
  }
}
