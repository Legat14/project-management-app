import { IRequestError, IRequestParams, IToken, IUser } from './request-types';

export async function request(requestParams: IRequestParams): Promise<IToken | IUser[] | IUser | IRequestError> {
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

//   const putBodyExample = {
//     name: 'Batman',
//     login: 'BW',
//     password: '456',
//   };

//   const signInBodyExample = {
//     login: 'SM',
//     password: '123',
//   };

//   const signUpResponse = await signUp(signUpBodyExample);
//   if ((signUpResponse as IRequestError).statusCode) {
//     console.error(
//       `Error ${(signUpResponse as IRequestError).statusCode}: ${(signUpResponse as IRequestError).message}`
//     );
//   }
//   const tokenObj = await signIn(signInBodyExample);
//   if ((tokenObj as IToken).token) {
//     const token = 'Bearer ' + (tokenObj as IToken).token;
//     console.log('Token: ', token);
//     const users = (await getUsers(token)) as IUser[];
//     console.log('Users: ', users);
//     const id = users[0]._id;
//     const user0 = await getUsers(token, id);
//     console.log('User #0 ', user0);
//     const editedUser = await putUser(token, putBodyExample, id);
//     console.log('Edited user: ', editedUser);
//     const editedUsers = (await getUsers(token)) as IUser[];
//     console.log('Edited user #0: ', editedUsers[0]);
//     const deletedUser = await deleteUser(token, id);
//     console.log('Deleted user: ', deletedUser);
//     const reminingUsers = (await getUsers(token)) as IUser[];
//     console.log('Remaining Users: ', reminingUsers);
//   } else {
//     console.error(`Error ${(tokenObj as IRequestError).statusCode}: ${(tokenObj as IRequestError).message}`);
//   }
// }

// example();
