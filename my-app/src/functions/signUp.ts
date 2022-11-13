import { request } from './request';
import { Endpoints, ISignUpBody, IUser, Methods } from './request-types';

export async function signUp(body: ISignUpBody): Promise<IUser> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNUP,
    body,
  };
  return (await request(requestParams)) as IUser;
}
