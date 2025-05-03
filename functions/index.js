const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
    // 1. Ambil data dari aplikasi web
    const token = req.body.token; // Token FCM pengguna
    const title = req.body.title; // Judul notifikasi
    const body = req.body.body; // Isi notifikasi

    // 2. Pastikan token ada
    if (!token) {
        return res.status(400).send({ error: 'Token FCM diperlukan.' });
    }

    // 3. Buat pesan notifikasi
    const message = {
        notification: {
            title: title || 'Notifikasi Baru', // Judul default jika tidak ada
            body: body || 'Anda menerima pemberitahuan!', // Isi default jika tidak ada
        },
        token: token,
    };

    // 4. Kirim notifikasi menggunakan Firebase Admin SDK
    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return res.status(200).send({ result: 'Notifikasi berhasil dikirim!' });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).send({ error: 'Gagal mengirim notifikasi.', details: error });
    }
});