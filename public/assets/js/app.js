let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('PWA bisa diinstall!');
  // Tampilkan tombol install manual (opsional)
  document.getElementById('installBtn').style.display = 'block';
});

// Tombol install manual (opsional)
document.getElementById('installBtn').addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('User menerima install');
    }
    deferredPrompt = null;
  });
});