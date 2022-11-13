import { request } from './request';
import { Endpoints, IUser, Methods } from './request-types';

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
