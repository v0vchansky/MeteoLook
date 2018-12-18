export class serverData {
  date: string;
  humidity: number;
  icon: string;
  image: string;
  temp: void;
}

export interface ServerDatas {
  data: serverData[]
}
