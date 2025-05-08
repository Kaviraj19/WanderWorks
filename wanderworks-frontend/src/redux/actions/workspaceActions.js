import { getAllWorkspaces } from '../../services/workspaceService';
import { createWorkspace } from '../../services/workspaceService';
export const fetchWorkspaces = () => async (dispatch) => {
  dispatch({ type: 'WORKSPACE_LIST_REQUEST' });
  try {
    const data = await getAllWorkspaces();
    dispatch({ type: 'WORKSPACE_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'WORKSPACE_LIST_FAIL', payload: error.message });
  }
};
export const createWorkspaceAction = (workspaceData) => async (dispatch) => {
    dispatch({ type: 'CREATE_WORKSPACE_REQUEST' });
    try {
      const data = await createWorkspace(workspaceData); // Call the API to create workspace
      dispatch({ type: 'CREATE_WORKSPACE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'CREATE_WORKSPACE_FAILURE', payload: error.message });
    }
  };