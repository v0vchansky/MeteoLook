import {serverData} from './models/serverData.model';

export interface AppState {
  data: {
    data: serverData[],
    isLoading: boolean,
    lat: number,
    lon: number,
    geoName: string,
  }
}
