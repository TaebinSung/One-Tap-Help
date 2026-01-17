import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Configure notification behavior (gracefully skip if not supported)
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
} catch (error) {
  console.log("Push notifications not available in this environment");
}

export async function registerForPushNotifications(): Promise<string | null> {
  try {
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
