// Kirim Form Handler Contact
function kirimForm(event) {
  event.preventDefault();
  alert('Form berhasil dikirim!');
}

// PWA Install Prompt Handling
let deferredPrompt;
const installButton = document.getElementById('installButton');

// Menangani event 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
  // Mencegah browser menampilkan prompt otomatis
  e.preventDefault();
  deferredPrompt = e;
  console.log('beforeinstallprompt event captured');

  // Menampilkan tombol install
  installButton.hidden = false;
});

// Jika tombol diklik, munculkan prompt install manual
installButton.addEventListener('click', async () => {
  installButton.hidden = true;
  deferredPrompt.prompt();

  // Menunggu respon user
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt ✅');
  } else {
    console.log('User dismissed the install prompt ❌');
  }

  deferredPrompt = null;
});

function hamburg() {
  document.querySelector('.dropdown').classList.add('active');
}

function cancel() {
  document.querySelector('.dropdown').classList.remove('active');
}
