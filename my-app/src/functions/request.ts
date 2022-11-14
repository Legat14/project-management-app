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

// async function requestExample() {
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
//     const userId = users[0]._id;
//     const user0 = await getUsers(token, userId);
//     console.log('User #0 ', user0);
//     const editedUser = await updateUser(token, putBodyExample, userId);
//     console.log('Edited user: ', editedUser);
//     const editedUsers = (await getUsers(token)) as IUser[];
//     console.log('Edited user #0: ', editedUsers[0]);

//     const boardBodyExample = {
//       title: 'The Board',
//       owner: userId,
//       users: [userId],
//     };

//     const editedBoardBodyExample = {
//       title: 'The Edited Board',
//       owner: userId,
//       users: [userId],
//     };

//     const newBoard = await createBoard(token, boardBodyExample);
//     console.log('New board: ', newBoard);
//     const boardId = (newBoard as IBoard)._id;
//     const boards = await getBoards(token);
//     console.log('All boards: ', boards);
//     const board = await getBoards(token, boardId);
//     console.log('Board: ', board);
//     const editedBoard = await updateBoard(token, editedBoardBodyExample, boardId);
//     console.log('Edited Board: ', editedBoard);
//     const boardsList = await getBordsByUser(token, userId);
//     console.log('Boards list: ', boardsList);

//     const columnBodyExample = {
//       title: '1st column',
//       order: 0,
//     };

//     const editedColumnBodyExample = {
//       title: '2nd column',
//       order: 1,
//     };

//     const newColumn = await createColumn(token, columnBodyExample, boardId);
//     console.log('New column: ', newColumn);
//     const columnId = (newColumn as IColumn)._id;
//     const column = await getColumns(token, boardId, columnId);
//     console.log('Column: ', column);
//     const editedColumn = await updateColumn(token, editedColumnBodyExample, boardId, columnId);
//     console.log('Edited column: ', editedColumn);
//     const columnsList = await getColumns(token, boardId);
//     console.log('All columns of the board: ', columnsList);
//     const deletedColumn = await deleteColumn(token, boardId, columnId);
//     console.log('Deleted column: ', deletedColumn);
//     const columnsListAfterDeletion = await getColumns(token, boardId);
//     console.log('All columns of the board after deletion: ', columnsListAfterDeletion);

//     const deletedBoard = await deleteBoard(token, boardId);
//     console.log('Deleted board: ', deletedBoard);

//     const deletedUser = await deleteUser(token, userId);
//     console.log('Deleted user: ', deletedUser);
//     const reminingUsers = (await getUsers(token)) as IUser[];
//     console.log('Remaining Users: ', reminingUsers);
//     console.log('Done');
//   } else {
//     console.error(`Error ${(tokenObj as IRequestError).statusCode}: ${(tokenObj as IRequestError).message}`);
//   }
// }

// requestExample();
