export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Endpoints {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  USERS = '/users',
  BOARDS = '/boards',
  BOARDS_SET = '/boardsSet',
  COLUMNS = '/columns',
}

export interface ISignUpBody {
  name: string;
  login: string;
  password: string;
}

export interface ISignInBody {
  login: string;
  password: string;
}

export interface IToken {
  token: 'string';
}

export interface IUser {
  _id: 'string';
  name: 'string';
  login: 'string';
}

export interface IBoardBody {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard {
  _id: string; // id доски
  title: string;
  owner: string; // id пользователя
  users: string[]; // список приглашенных пользователей
}

export interface IColumnBody {
  title: string;
  order: number;
}

export interface IColumn {
  _id: string; // id колонки
  title: string;
  order: number;
  boardId: string[];
}

export interface IRequestParams {
  method: Methods;
  endpoint: Endpoints | string;
  body?: ISignUpBody | ISignInBody | IBoardBody | IColumnBody;
  token?: string;
  id?: string;
}

export interface IRequestError {
  statusCode: string;
  message: string;
}
