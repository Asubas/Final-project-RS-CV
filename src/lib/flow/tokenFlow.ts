import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
export class LocalStorageTokenCache implements TokenCache {
  get() {
    const cachedToken = localStorage.getItem('accessToken');
    if (cachedToken) {
      return {
        token: cachedToken,
        expirationTime: Date.now() + 3600000, // 1 час
        refreshToken: localStorage.getItem('refreshToken') || undefined,
      };
    }
    return {
      token: '',
      expirationTime: 0,
      refreshToken: undefined,
    };
  }

  set(cache: TokenStore): void {
    localStorage.setItem('accessToken', cache.token);
    if (cache.refreshToken) {
      localStorage.setItem('refreshToken', cache.refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }
}
