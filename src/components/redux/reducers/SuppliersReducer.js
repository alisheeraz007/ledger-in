const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    customerForEdit: undefined,
    lastError: null,
  };
  export default function SupplierReducer(state = initialState, action) {
    switch (action.type) {
      case "Get_All_Supplier":
        // state.entities = action.payload;
        // state.totalCount = action.payload.length;
        return {
          ...state,
          entities: action.payload,
          totalCount: action.payload.length,
        };
      case "Add_Supplier":
        return state;
      default:
        return state;
    }
  }
  