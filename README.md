This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 0: Npm Install

Before you start the program, you will need to run `npm install` to install the library modules.

```sh
npm install
```

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npx
npx react-native start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npx
npx react-native run-android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npx
npx react-native run-ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# Design Decisions:

- React Query was chosen for API data fetching and caching because it simplifies handling loading states, errors, and pagination. This helped in efficiently displaying the transaction list with minimal boilerplate.

- Zustand was used for global state management to store the access token securely, allowing easy access across different screens without prop drilling.

- React Hook Form was used for form handling on the transfer page, as it provides built-in validation and integrates well with custom components like dropdowns.

- Biometric authentication with react-native-biometrics was implemented to verify the device owner for sensitive actions like transfers.

- Mock APIs were set up using Axios Mock Adapter to simulate backend responses during development and testing without a real backend.

# Challenges Faced:

- Transaction pagination: Implementing “load more” for the transaction list required careful handling of state and API parameters to avoid duplicating or losing items.

- Dropdown with objects: Initially, the select input only accepted strings. Adjusting it to store objects while displaying combined labels (e.g., Account Name - Balance) required extra mapping logic.

- Biometric integration: Ensuring the app could verify the device owner

- API mocking: Setting up mock endpoints that behave like real APIs for pagination, account list, and transfer actions required structuring mock data carefully to resemble expected backend responses.

- UI improvements: Balancing functionality with design to avoid a “bare” or empty-looking interface, such as adding spacing, and sections for better UX.

# Demo Video

The demo video is attached in the path `\liteBankApp\assets\video\Screenrecorder-2025-11-17-17-53-42-0.mp4` in this project