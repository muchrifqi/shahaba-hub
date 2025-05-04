const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationToToken = functions.https.onCall(async (data, context) => {
  const token = data.token;
  const payload = {
    notification: {
      title: data.title || "Judul Default",
      body: data.body || "Isi pesan default",
    },
  };

  try {
    const res = await admin.messaging().sendToDevice(token, payload);
    return { success: true, response: res };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
