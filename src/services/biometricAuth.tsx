import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";

const rnBiometrics = new ReactNativeBiometrics();

export async function verifyBiometricAndGetToken(): Promise<string> {
  const { available } = await rnBiometrics.isSensorAvailable();

  if (!available) {
    throw new Error("Biometric authentication not available");
  }

  const { success } = await rnBiometrics.simplePrompt({
    promptMessage: "Authorize transaction",
  });

  if (!success) {
    throw new Error("Authentication failed");
  }

  const creds = await Keychain.getGenericPassword();
  if (!creds) {
    throw new Error("No session found");
  }

  const saved = JSON.parse(creds.password);
  return saved.token;
}
