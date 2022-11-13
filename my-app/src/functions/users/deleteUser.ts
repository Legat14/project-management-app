import { request } from '../request';
import { Endpoints, IRequestError, IUser, Methods } from '../request-types';

export async function deleteUser(token: string, id: string): Promise<IUser | IRequestError> {
  const requestParams = {
    method: Methods.DELETE,
    endpoint: Endpoints.USERS,
    token,
    id,
  };
  return (await request(requestParams)) as IUser | IRequestError;
}
