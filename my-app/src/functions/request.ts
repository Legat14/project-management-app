import { IRequestParams, IToken, IUser } from './request-types';

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

// Для проверки работоспособности можно вставить код ниже в index.tsx и добавить необходимые импорты
// Можно использовать как образец

// async function example() {
//   const signUpBodyExample = {
//     name: 'SuperMan',
//     login: 'SM',
//     password: '123',
//   };

//   const signInBodyExample = {
//     login: 'SM',
//     password: '123',
//   };

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
