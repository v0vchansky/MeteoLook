// Angular
import { Action } from '@ngrx/store';
// Models
import { Location } from '../models/location.model';

export namespace DATA_ACTION {
  export const GET_DATA = 'GET_DATA';
  export const SET_DATA = 'SET_DATA';
  export const SET_LOCATION = 'SET_LOCATION';
}

export class GetData implements Action {
  readonly type = DATA_ACTION.GET_DATA;

  constructor(
    public payload: any
  ) {}
}

export class SetData implements Action {
  readonly type = DATA_ACTION.SET_DATA;

  constructor (
    public payload: boolean
  ) {}
}

export class SetLocation implements Action {
  readonly type = DATA_ACTION.SET_LOCATION;

  constructor (
    public payload: Location
  ) {}
}

export type DataAction = GetData
                       | SetData
                       | SetLocation
