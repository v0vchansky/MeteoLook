// Actions
import { DATA_ACTION, DataAction } from '../actions/data.action';

const initialState = {
  data: [],
  isLoading: true,
};

export function dataReducer(state = initialState , action: DataAction) {
  switch (action.type) {
    case DATA_ACTION.SET_DATA:
      return {
        ...state,
        data: JSON.parse(localStorage.getItem('data')),
        isLoading: action.payload,
        user: JSON.parse(localStorage.getItem('user')),
        time: +localStorage.getItem('time'),
      };
    case DATA_ACTION.GET_DATA:
      localStorage.setItem('data', action.payload);
      localStorage.setItem('time', String(Math.round((new Date()).getTime() / 1000) + 10800));
      return {
        ...state,
        data: JSON.parse(action.payload),
        time: String(Math.round((new Date()).getTime() / 1000) + 10800),
        isLoading: false,
      };
    case DATA_ACTION.SET_USER_INFO:
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('time', String(Math.round((new Date()).getTime() / 1000) + 10800));
      return {
        ...state,
        user: action.payload,
      };
    case DATA_ACTION.SET_SETTINGS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('data', JSON.stringify(action.payload.data));
      return {
        ...state,
        data: action.payload.data,
        user: action.payload.user
      };
    default:
      return state
  }
}
