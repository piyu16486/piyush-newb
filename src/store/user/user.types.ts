export interface UserState {
  userType: UserType;
  userInfo: {
    token: string;
  } | null;
}

export type UserType = 'client' | 'internal';
