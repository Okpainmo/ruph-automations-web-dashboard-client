'use client';

export function accessTokenRefresher(accessToken: string) {
  if (typeof window !== 'undefined') {
    const currentTimeInMilliseconds = Date.now();

    // Safely access localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenSetTime', `${currentTimeInMilliseconds}`);
  } else {
    console.warn(
      'localStorage is not available. AccessToken was not refreshed.'
    );
  }
}
