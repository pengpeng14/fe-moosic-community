export enum SearchType {
  posts = 0,
  moods = 1,
  users = 2
}


export interface ISearchURL {
  type: SearchType;
  keyword: string;
}