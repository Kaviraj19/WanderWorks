const initialState = {
    loading: false,
    workspaces: [],
    error: null,
  };
  
  export const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'WORKSPACE_LIST_REQUEST':
        return { ...state, loading: true };
      case 'WORKSPACE_LIST_SUCCESS':
        return { loading: false, workspaces: action.payload, error: null };
      case 'WORKSPACE_LIST_FAIL':
        return { loading: false, workspaces: [], error: action.payload };
        case 'CREATE_WORKSPACE_REQUEST':
            return { ...state, loading: true, error: null };
      
          case 'CREATE_WORKSPACE_SUCCESS':
            return { ...state, loading: false, workspaces: [...state.workspaces, action.payload] };
      
          case 'CREATE_WORKSPACE_FAILURE':
            return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  