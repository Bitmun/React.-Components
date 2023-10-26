export interface FetchData {
  count: number;
  next: string;
  previous: string;
  results: Data[];
}

export interface Data {
  name: string;
  url: string;
}
