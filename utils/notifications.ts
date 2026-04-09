import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

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
} catch {}

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) return null;
  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    const { status } =
      existing !== "granted"
        ? await Notifications.requestPermissionsAsync()
        : { status: existing };
    if (status !== "granted") return null;
    return (await Notifications.getExpoPushTokenAsync()).data;
  } catch {
    return null;
  }
}

export async function sendNotification(expoPushToken: string, title: string, body: string) {
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: expoPushToken, sound: "default", title, body }),
    });
  } catch {}
}
