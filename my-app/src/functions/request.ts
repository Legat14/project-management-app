
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

export interface IRequestParams {
  method: Methods;
  endpoint: Endpoints;
  body?: ISignUpBody | ISignInBody;
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

export async function request(requestParams: IRequestParams) {
  const serverUrl = 'https://react-final-task-backend.onrender.com';
  const requestUrl = serverUrl + requestParams.endpoint;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const body = JSON.stringify(requestParams.body);

  const requestOptions: RequestInit = {
    method: requestParams.method,
    headers: myHeaders,
    body,
    redirect: 'follow',
  };

  console.log(requestUrl, requestOptions);
  const response = await fetch(requestUrl, requestOptions);
  const responseObj = await response.json();
  console.log('responseObj', responseObj);
}
