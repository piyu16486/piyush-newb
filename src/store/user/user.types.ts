export interface UserState {
  userType: UserType;
}

export type UserType = 'client' | 'internal';
