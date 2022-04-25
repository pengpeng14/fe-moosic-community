import { BasedApiResponse } from "./../BasedApiResponse";
export interface UserProfile extends BasedApiResponse {
  data: {
    id: string;
    displayName: string;
    uid: string;
    username: string;
    email: string;
    bio: string;
    photoUrl: string;
    active: boolean;
    genres: string[];
  };
}

export interface SearchUserData extends BasedApiResponse {
  data: {
    page: number;
    totalPage: number;
    count: number;
    contents: User[];
  };
}

export interface User {
  id: string;
  displayName: string;
  username: string;
  email: string;
  bio: string;
  photoUrl: string;
  genres: string[];
  active: boolean;
}

export interface UpdateUser {
  username: string;
  bio: string;
  genres: string[];
}

export interface UpdateUserRes extends BasedApiResponse {
  data: User;
}

export interface Genre extends BasedApiResponse {
  data: {
    genres: string[];
  };
}
