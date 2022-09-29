import cookies from 'js-cookie';

type TokenType = 'accessToken' | 'refreshToken';

class TokenProvider {
  static get(tokenType: TokenType) {
    return cookies.get(tokenType);
  }

  static set(tokenType: TokenType, token: string, expires: number) {
    cookies.set(tokenType, token, { expires });
  }

  static has(tokenType: TokenType) {
    return cookies.get(tokenType) ? true : false;
  }

  static clear() {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
  }
}

export default TokenProvider;
