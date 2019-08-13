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
  edit: {
    status: 'INIT',
    error: -1,
  },
  remove: {
    status: 'INIT',
    error: -1
  },
  star: {
    status: 'INIT',
    error: -1
  }
};

export default function feedList(state = initialState, action) {
  switch (action.type) {
    case types.FEED_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      };
    case types.FEED_LIST_SUCCESS:
      if (action.isInitial) {
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data,
            isLast: action.data.length < 6
          }
        }
      } else {
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: [...action.data]
          }
        }
      }
      return state;
    case types.FEED_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILURE'
        }
      };
    default:
      return state;
  }
}