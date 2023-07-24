import { Model } from 'mongoose';

export type IUser = {
  userName: string,
  email: string,
  password: string
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
};
