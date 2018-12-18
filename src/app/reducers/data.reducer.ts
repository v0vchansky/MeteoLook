// Actions
import { DATA_ACTION, DataAction } from '../actions/data.action';

const initialState = {
  data: [],
  isLoading: true,
  geoName: '',
};

export function dataReducer(state = initialState , action: DataAction) {
  switch (action.type) {
    case DATA_ACTION.SET_DATA:
      return {
        ...state,
        data: JSON.parse(localStorage.getItem('data')),
        isLoading: action.payload,
        lat: Number(JSON.parse(localStorage.getItem('lat'))),
        lon: Number(JSON.parse(localStorage.getItem('lon'))),
        geoName: localStorage.getItem('geoName'),
      };
    case DATA_ACTION.GET_DATA:
      localStorage.setItem('data', action.payload);
      return {
        ...state,
        data: JSON.parse(action.payload),
        isLoading: false
      };
    case  DATA_ACTION.SET_LOCATION:
      localStorage.setItem('lat', String(action.payload.lat));
      localStorage.setItem('lon', String(action.payload.lon));
      localStorage.setItem('geoName', String(action.payload.geoName));
      return {
        ...state,
        lat: action.payload.lat,
        lon: action.payload.lon,
        geoName: action.payload.geoName
      };
    default:
      return state
  }
}
