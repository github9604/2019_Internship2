import * as types from '../actions/ActionTypes';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  },
  remove: {
    status: 'INIT',
    error: -1
  }
};

export default function dirList(state = initialState, action) {
  switch (action.type) {
    case types.DIR_POST:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'WAITING',
          error: -1
        }
      };
    case types.DIR_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'SUCCESS'
        }
      };
    case types.DIR_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'FAILURE',
          error: action.error
        }
      };
    case types.DIR_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      };
      case types.DIR_LIST_SUCCESS:
        if(action.isInitial){
          return{
            ...state,
            list: {
              ...state.list,
              status: 'SUCCESS',
              data: action.data
            }
          }
        } else{
          return{
            ...state,
            list: {
              ...state.list,
              status:'SUCCESS',
              data: [...action.data]
            }
          }
        }
    default:
      return state;
  }
}