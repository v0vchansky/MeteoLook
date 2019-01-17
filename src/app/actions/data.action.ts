// Angular
import { Action } from '@ngrx/store';
// Models
import { Location } from '../models/location.model';
import { User } from '../models/user.model';
import { serverData } from '../models/serverData.model';

export namespace DATA_ACTION {
  export const GET_DATA = 'GET_DATA';
  export const SET_DATA = 'SET_DATA';
  export const SET_LOCATION = 'SET_LOCATION';
  export const SET_USER_INFO = 'SET_USER_INFO';
  export const SET_SETTINGS = 'SET_SETTINGS';
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
    public payload:Location
  ) {}
}

export class SetUserInfo implements Action {
  readonly type = DATA_ACTION.SET_USER_INFO;

  constructor (
    public payload: User
  ) {}
}

export class SetSettings implements Action {
  readonly type = DATA_ACTION.SET_SETTINGS;

  constructor (
    public payload: {user: User, data: serverData}
  ) {}
}

export type DataAction = GetData
                       | SetData
                       | SetUserInfo
                       | SetSettings
