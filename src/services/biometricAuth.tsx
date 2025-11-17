import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

export async function verifyBiometric(): Promise<boolean> {
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

  return true;
}
