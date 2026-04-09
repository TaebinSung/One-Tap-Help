import { Platform } from "react-native";
import Constants from "expo-constants";

type NotificationsModule = typeof import("expo-notifications");
type DeviceModule = typeof import("expo-device");

function isExpoGoAndroid() {
  return Platform.OS === "android" && Constants.appOwnership === "expo";
}

function loadNotificationsModule(): NotificationsModule | null {
  try {
    // Lazily require to avoid Expo Go Android import-time failures.
    return require("expo-notifications");
  } catch {
    return null;
  }
}

function loadDeviceModule(): DeviceModule | null {
  try {
    return require("expo-device");
  } catch {
    return null;
  }
}

function configureNotificationHandler() {
  if (isExpoGoAndroid()) {
    return;
  }

  const Notifications = loadNotificationsModule();
  if (!Notifications) {
    return;
  }

  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch {
    console.log("Push notifications not available in this environment");
  }
}

configureNotificationHandler();

export async function registerForPushNotifications(): Promise<string | null> {
  try {
    if (isExpoGoAndroid()) {
      console.log(
        "Expo Go on Android does not support remote notifications. Skipping token registration."
      );
      return null;
    }

    const Device = loadDeviceModule();
    const Notifications = loadNotificationsModule();

    if (!Device || !Notifications) {
      console.log("Notifications modules not available in this environment");
      return null;
    }

    if (!Device.isDevice) {
      console.log("Not on physical device, skipping push notifications");
      return null;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push notification permissions");
      return null;
    }

    // Get the token
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch (error) {
    console.log(
      "Push notifications not available. This is expected on Expo Go (Android). Use a development build for push notifications."
    );
    return null;
  }
}

export async function sendNotification(
  expoPushToken: string,
  title: string,
  body: string
) {
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: "default",
        title,
        body,
        data: { someData: "goes here" },
      }),
    });
  } catch (error) {
    console.log("Could not send notification (expected if using Expo Go)");
  }
}
