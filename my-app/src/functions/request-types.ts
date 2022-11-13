export enum Methods {
  GET = 'GET',
  POST = 'POST',
}

export enum Endpoints {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  USERS = '/users',
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

export interface IRequestParams {
  method: Methods;
  endpoint: Endpoints;
  body?: ISignUpBody | ISignInBody;
  token?: string;
  id?: string;
}
