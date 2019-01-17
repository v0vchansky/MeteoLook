import { serverData } from './models/serverData.model';
import { User } from './models/user.model';

export interface AppState {
  data: {
    data: serverData[],
    isLoading: boolean,
    user: User
    time: number;
  }
}
