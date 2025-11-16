import * as Keychain from 'react-native-keychain';

export async function saveToken(tokenObj) {
  // tokenObj: { token: 'jwt', refresh: '...', expiresAt: 12345 }
  await Keychain.setGenericPassword('session', JSON.stringify(tokenObj), {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  });
}
