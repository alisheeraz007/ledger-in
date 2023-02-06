const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  ProductForEdit: undefined,
  lastError: null,
};
export default function SupplyProductReducer(state = initialState, action) {
  switch (action.type) {
    case "Get_All_supProduct":
      return {
        ...state,
        entities: action.payload,
        totalCount: action.payload.length,
      };
    case "Add_supProduct":
      // state.entities.push(action.payload);
      // state.totalCount = state.entities.length;
      return state;
    default:
      return state;
  }
}
