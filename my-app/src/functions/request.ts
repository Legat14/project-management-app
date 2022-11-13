// *** Примеры запросов

// request({
//   method: Methods.POST,
//   endpoint: Endpoints.SIGNUP,
//   body: signUpBodyExample,
// });

// request({
//   method: Methods.POST,
//   endpoint: Endpoints.SIGNIN,
//   body: signInBodyExample,
// });

export enum Methods {
  GET = 'GET',
  POST = 'POST',
}

export enum Endpoints {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  USERS = '/users',
}

interface ISignUpBody {
  name: string;
  login: string;
  password: string;
}

interface ISignInBody {
  login: string;
  password: string;
}

interface IToken {
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

export const signUpBodyExample = {
  name: 'SuperMan',
  login: 'SM',
  password: '123',
};

export const signInBodyExample = {
  login: 'SM',
  password: '123',
};

export async function request(requestParams: IRequestParams): Promise<IToken | IUser[] | IUser> {
  const serverUrl = 'https://react-final-task-backend.onrender.com';
  let requestUrl = serverUrl + requestParams.endpoint;

  if (requestParams.id) {
    requestUrl += '/' + requestParams.id;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  if (requestParams.token) {
    myHeaders.append('Authorization', requestParams.token);
  }

  let requestOptions: RequestInit = {
    method: requestParams.method,
    headers: myHeaders,
    redirect: 'follow',
  };

  if (requestParams.body) {
    const body = JSON.stringify(requestParams.body);
    requestOptions = { ...requestOptions, body };
  }

  console.log(requestUrl, requestOptions);
  const response = await fetch(requestUrl, requestOptions);
  const responseObj = await response.json();
  console.log('responseObj', responseObj);

  return responseObj;
}

export async function signUp(body: ISignUpBody): Promise<IUser> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNUP,
    body,
  };
  return (await request(requestParams)) as IUser;
}

export async function signIn(body: ISignInBody): Promise<IToken> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNIN,
    body,
  };
  return (await request(requestParams)) as IToken;
}

// getUsers может получить всех или одного пользователя в зависимости от того, был ли передан id
export async function getUsers(token: string, id?: string): Promise<IUser[] | IUser> {
  const requestParams = {
    method: Methods.GET,
    endpoint: Endpoints.USERS,
    token,
    id,
  };
  return (await request(requestParams)) as IUser[] | IUser;
}

// Для проверки работоспособности можно вставить код ниже в index.tsx и добавить необходимые импорты
// Можно использовать как образец

// async function example() {
//   await signUp(signUpBodyExample);
//   const tokenObj = await signIn(signInBodyExample);
//   const token = 'Bearer ' + tokenObj.token;
//   console.log('Token: ', token);
//   const users = (await getUsers(token)) as IUser[];
//   console.log('Users: ', users);
//   const id = users[0]._id;
//   const user0 = await getUsers(token, id);
//   console.log('User #0 ', user0);
// }

// example();
