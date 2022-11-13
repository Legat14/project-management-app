import { request } from './request';
import { Endpoints, ISignInBody, IToken, Methods } from './request-types';

export async function signIn(body: ISignInBody): Promise<IToken> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNIN,
    body,
  };
  return (await request(requestParams)) as IToken;
}
