// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// WhatsApp Modal
function showWhatsAppModal() {
  const modal = document.getElementById('whatsapp-modal');
  modal.classList.add('show');
}

function hideWhatsAppModal() {
  const modal = document.getElementById('whatsapp-modal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Character Count for WhatsApp Message
document.getElementById('whatsapp-message').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('char-count').textContent = count;
    
    if (count > 500) {
        this.value = this.value.substring(0, 500);
        document.getElementById('char-count').textContent = 500;
    }
});

// Send WhatsApp Message
function sendWhatsAppMessage() {
    const message = document.getElementById('whatsapp-message').value;
    const recipient = document.getElementById('recipient').value;
    
    if (!message.trim()) {
        Swal.fire({
            title: 'Pesan Kosong',
            text: 'Mohon isi pesan terlebih dahulu',
            icon: 'warning',
            confirmButtonColor: '#25bfd3'
        });
        return;
    }
    
    const whatsappUrl = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    hideWhatsAppModal();
    
    Swal.fire({
        title: 'Berhasil!',
        text: 'Sedang membuka WhatsApp...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
    });
}

// Bank Account Info
function showBankAccountInfo() {
    Swal.fire({
        title: 'Informasi Rekening Shahaba',
        html: `
            <div class="bank-info">
                <div class="bank-card" onclick="copyToClipboard('1234567890', 'Muamalat')">
                   <img src="https://www.bankmuamalat.co.id/assets/frontend/images/logo.jpg" alt="Bank Muamalat" class="bank-logo">
                    <div class="bank-details">
                        <p class="account-number">1234567890</p>
                        <p class="account-name">CV Klinik Edukasi Shahaba</p>
                        <span class="copy-hint"><i class="fas fa-copy"></i> Klik untuk menyalin</span>
                    </div>
                </div>
                <div class="bank-card" onclick="copyToClipboard('9876543210', 'BSI')">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bank_Syariah_Indonesia.svg/2560px-Bank_Syariah_Indonesia.svg.png" alt="BSI" class="bank-logo">
                    <div class="bank-details">
                        <p class="account-number">9876543210</p>
                        <p class="account-name">CV Klinik Edukasi Shahaba</p>
                        <span class="copy-hint"><i class="fas fa-copy"></i> Klik untuk menyalin</span>
                    </div>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true
    });
}

// Copy to Clipboard
function copyToClipboard(text, context) {
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            title: 'Berhasil Disalin!',
            text: `${context} telah disalin ke clipboard`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    }).catch(() => {
        Swal.fire({
            title: 'Gagal Menyalin',
            text: 'Mohon salin secara manual',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
        });
    });
}

// Submit Attendance
function submitAttendance() {
    const studentName = document.getElementById('student-name').value;
    const studentClass = document.getElementById('student-class').value;
    const attendanceDate = document.getElementById('tanggal').value;
    const attendanceStatus = document.getElementById('attendance-status').value;
    
    if (!studentName || !studentClass || !attendanceDate) {
        Swal.fire({
            title: 'Form Tidak Lengkap',
            text: 'Harap isi semua field yang wajib diisi',
            icon: 'warning',
            confirmButtonColor: '#25bfd3'
        });
        return;
    }
    
    Swal.fire({
        title: 'Konfirmasi',
        html: `Apakah Anda yakin ingin mengirim absensi untuk:<br><b>${studentName}</b>?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Kirim',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#25bfd3'
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate API call
            setTimeout(() => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Absensi telah dikirim',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    showPage('dashboard-page');
                });
            }, 1000);
        }
    });
}

function loadAppGuide() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  const guideHTML = `
    <div class="accordion-group">
      <div class="accordion active">
        <div class="accordion-header">
          <i class="fas fa-info-circle"></i>
          <h3>Apa itu Shahaba PWA?</h3>
          <i class="fas fa-chevron-down accordion-icon"></i>
        </div>
        <div class="accordion-content">
          <p style="color: #ffffff; line-height: 1.6;">
            <strong>Shahaba - Progressive Web App</strong> Aplikasi berbasis web yang dirancang untuk memperkuat komunikasi dan kolaborasi antara sekolah dan orang tua. 
            Sebagai aplikasi PWA, Shahaba dapat diakses langsung melalui browser di ponsel tanpa perlu diunduh dari Play Store atau App Store. 
            Aplikasi ini ringan, cepat, dan dapat digunakan seperti aplikasi pada umumnya — bahkan bisa disimpan di layar utama ponsel untuk akses yang lebih mudah.
          </p>
          <p style="color: #ccc; font-size: 0.85rem;">Versi 1.0.0 – Dirilis 1 Mei 2025</p>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header">
          <i class="fas fa-lightbulb"></i>
          <h3>Tips Penggunaan</h3>
          <i class="fas fa-chevron-down accordion-icon"></i>
        </div>
        <div class="accordion-content">
          <ul style="list-style-type: disc; padding-left: 1.2rem; color:rgb(255, 255, 255); line-height: 1.6;">
            ${isIOS ? `
              <li>Untuk pengguna iOS, silakan tambahkan aplikasi ke layar utama melalui Safari → Bagikan → Tambah ke Layar Utama.</li>
            ` : ''}
            <li>Pastikan perangkat Bapak/Ibu terhubung dengan koneksi internet yang stabil untuk memastikan kelancaran akses.</li>
            <li>Silakan lakukan *refresh* atau mulai ulang aplikasi apabila data tidak tampil dengan sempurna.</li>
            <div style="margin-bottom: 1rem; margin-top: 1rem; text-align: center;">
              <button onclick="location.reload()" style="
                padding: 8px 16px;
                background-color: var(--accent-color);
                border: none;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: bold;
                font-family: inherit;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: background-color 0.3s ease;
                "onmouseover="this.style.backgroundColor='#e6c737'" onmouseout="this.style.backgroundColor='var(--accent-color, #f7db4f)'">
                <i class="fas fa-rotate-right"></i>
                Muat Ulang Aplikasi
              </button>
          </div>
            ${!isIOS ? `
              <li>Untuk pengalaman yang lebih cepat dan optimal, Bapak/Ibu dapat menginstal aplikasi Shahaba melalui tombol "Install" yang tersedia di bagian bawah layar.</li>
            ` : ''}
          </ul>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header">
          <i class="fab fa-whatsapp"></i>
          <h3>Bantuan & Kontak</h3>
          <i class="fas fa-chevron-down accordion-icon"></i>
        </div>
        <div class="accordion-content">
          <p style="color: #ffffff; line-height: 1.6;">
            Apabila Bapak/Ibu mengalami kendala teknis atau memiliki pertanyaan seputar penggunaan aplikasi Shahaba, silakan menghubungi admin melalui WhatsApp pada tautan berikut:
          </p>
          <a href="https://wa.me/6285695384530" target="_blank" style="color:rgb(247, 219, 79); text-decoration: underline;">
            Klik di sini untuk menghubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  const container = document.getElementById('guide-container');
  setTimeout(() => {
    container.classList.remove('shimmer');
    container.innerHTML = guideHTML;
    
    // Tambahkan event listener untuk accordion
    const accordionHeaders = container.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordion = header.parentElement;
        const isActive = accordion.classList.contains('active');
        
        // Tutup semua accordion terlebih dahulu
        document.querySelectorAll('.accordion').forEach(acc => {
          acc.classList.remove('active');
        });
        
        // Buka accordion yang diklik jika sebelumnya tidak aktif
        if (!isActive) {
          accordion.classList.add('active');
        }
      });
    });
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  loadAppGuide();
});

// Inisialisasi EmailJS
emailjs.init('XCyDgWPI6c1YEq8Hg'); // User ID EmailJS

// Fungsi Handle Submit
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const deskripsiField = document.getElementById('deskripsi');
    
    // 1. Validasi Form
    const checkedTopics = Array.from(form.elements['topik'])
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
    
    if(checkedTopics.length === 0) {
    Swal.fire({
        title: 'Peringatan!',
        text: 'Pilih minimal 1 topik konsultasi',
        icon: 'warning'
    });
    return;
    }
    
    // Validasi khusus jika memilih "Lainnya"
    const isLainnyaSelected = checkedTopics.includes('Lainnya');
    if(isLainnyaSelected && !deskripsiField.value.trim()) {
    Swal.fire({
        title: 'Peringatan!',
        text: 'Harap isi deskripsi untuk opsi "Lainnya"',
        icon: 'warning'
    });
    deskripsiField.focus();
    return;
    }

    // 2. Siapkan Data Email
    const templateParams = {
    orangtuaDari: document.getElementById('orangtuaDari').value,
    topik: "• " + checkedTopics.join('\n• '),
    deskripsi: isLainnyaSelected ? deskripsiField.value : '',
    tanggal: new Date(document.getElementById('tanggal').value).toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }),
    jam: document.getElementById('jam').value + ' WIB',
    current_year: new Date().getFullYear().toString()
};

    // 3. Kirim Email
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mengirim...`;

    emailjs.send('service_wnjhl7q', 'template_egp0vsz', templateParams)
    .then(() => {
        Swal.fire({
        title: 'Berhasil!',
        text: 'Penjadwalan Konsultasi telah dikirim ke Shahaba',
        icon: 'success'
        });
        form.reset();
        document.getElementById('charCount').textContent = 0;
    })
    .catch((error) => {
        Swal.fire({
        title: 'Gagal!',
        text: `Error: ${error.text || 'Gagal mengirim email'}`,
        icon: 'error'
        });
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Kirim`;
    });
}

// Fungsi untuk toggle required pada deskripsi
document.querySelectorAll('input[name="topik"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
    const deskripsiGroup = document.getElementById('deskripsi').closest('.form-group');
    const isLainnyaChecked = document.querySelector('input[name="topik"][value="Lainnya"]:checked');
    
    if(isLainnyaChecked) {
        deskripsiGroup.style.display = 'block';
        document.getElementById('deskripsi').setAttribute('required', '');
    } else {
        deskripsiGroup.style.display = 'none';
        document.getElementById('deskripsi').removeAttribute('required');
    }
    });
});

// Hitung karakter deskripsi
document.getElementById('deskripsi').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('charCount').textContent = count;
    if(count > 500) {
    this.value = this.value.substring(0, 500);
    document.getElementById('charCount').textContent = 500;
    }
});

// Sembunyikan deskripsi saat load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deskripsi').closest('.form-group').style.display = 'none';
});

// Slider Otomatis untuk Foto Besar. Sesuaikan current-activity di sini
let currentSlide = 0;
const slides = document.querySelectorAll('.featured-slide');
const activityTexts = [
    "Ekskul Informatika Kelas V dengan Canva Pro",
    "Outing Class ke Museum Fatahillah", 
    "Pohon harapan di awal tahun ajaran"
];

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.getElementById('current-activity').textContent = activityTexts[currentSlide];
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Mulai slider otomatis (berganti setiap 5 detik)
let slideInterval = setInterval(nextSlide, 5000);

// Hentikan slider saat hover
document.querySelector('.featured-slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Lanjutkan slider saat mouse leave
document.querySelector('.featured-slider').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 3000);
});

// Inisialisasi slider pertama
showSlide(0);

// Slider foto kecil
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.small-photos-slider');
    const photos = document.querySelectorAll('.small-photo');
    const container = document.querySelector('.small-photos-container');
    let idleTimer;
    const idleTimeout = 3000;
    let lastPosition = 0;
    let animation; // Variabel untuk menyimpan instance animasi GSAP

    // Clone elements dengan optimasi performa
    const fragment = document.createDocumentFragment();
    photos.forEach(photo => {
        const clone = photo.cloneNode(true);
        fragment.appendChild(clone);
    });
    slider.appendChild(fragment);

    // Fungsi auto-slide yang lebih presisi
    function startAutoSlide() {
        // Hentikan animasi sebelumnya jika ada
        if (animation) animation.kill();
        
        // Hitung total width untuk infinite loop
        const photoWidth = photos[0].offsetWidth + 12;
        const totalWidth = photoWidth * photos.length;
        
        animation = gsap.to(slider, {
            x: lastPosition - totalWidth,
            duration: 70, // Mengatur kecepatan slide foto kecil
            ease: "none",
            modifiers: {
                x: x => {
                    x = parseFloat(x);
                    // Handle infinite loop
                    if (x < -totalWidth) x += totalWidth;
                    if (x > 0) x -= totalWidth;
                    lastPosition = x;
                    return x + 'px';
                }
            },
            onComplete: () => {
                // Restart animasi untuk loop continuous
                startAutoSlide();
            }
        });
        
        slider.classList.add('playing');
        slider.classList.remove('paused');
    }

    // Fungsi pause sementara
    function pauseSlide() {
        slider.classList.add('paused');
        slider.classList.remove('playing');
        resetIdleTimer();
    }

    // Timer untuk kembali auto-play
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            if (!slider.classList.contains('grabbing')) {
                startAutoSlide();
            }
        }, idleTimeout);
    }

    // Inisialisasi Draggable
    const draggable = Draggable.create(slider, {
        type: "x",
        inertia: true,
        bounds: {
            minX: -(photos[0].offsetWidth * photos.length) + container.offsetWidth,
            maxX: 0
        },
        onPress: function() {
            if (animation) animation.pause();
            slider.classList.add('grabbing');
            clearTimeout(idleTimer);
        },
        onDrag: function() {
            lastPosition = this.x;
        },
        onThrowComplete: function() {
            resetIdleTimer();
        }
    })[0];

    // Event listeners untuk interaksi
    slider.addEventListener('mouseenter', pauseSlide);
    slider.addEventListener('touchstart', pauseSlide);
    
    slider.addEventListener('mouseleave', () => {
        if (!draggable.isDragging) {
            resetIdleTimer();
        }
    });

    // Klik di luar container untuk lanjutkan auto-play
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            startAutoSlide();
        }
    });

    // Mulai auto-slide pertama kali
    startAutoSlide();

    // Handle visibilitas halaman (tab tidak aktif)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startAutoSlide();
        } else {
            pauseSlide();
        }
    });
});

// Filter Album
document.querySelectorAll('.album-filter-btn').forEach(btn => {
btn.addEventListener('click', function() {
    // Hapus active state dari semua button
    document.querySelectorAll('.album-filter-btn').forEach(b => b.classList.remove('active'));
    // Tambahkan active state ke button yang diklik
    this.classList.add('active');
    
    const category = this.dataset.category;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
    });
});
});

document.addEventListener('DOMContentLoaded', function() {
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    
    img.onload = function() {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    // Sesuaikan grid span berdasarkan rasio aspek
    if (aspectRatio > 1.5) {
        item.style.gridColumn = 'span 2'; // Gambar landscape (lebar)
    } else if (aspectRatio < 0.8) {
        item.style.gridRow = 'span 2'; // Gambar portrait (tinggi)
    }
    };
});
});

// Float
const floatBtn = document.getElementById('guide-float-btn');

// Step 1: Initial attention grab
floatBtn.classList.add('animate');
setTimeout(() => {
  floatBtn.classList.remove('animate');
  
  // Step 2: Show text after animation
  setTimeout(() => {
    floatBtn.classList.add('show-text');
    
    // Step 3: Hide text after 3 seconds
    setTimeout(() => {
      floatBtn.classList.remove('show-text');
      floatBtn.classList.add('hide-text');
      
      // Reset for hover state
      setTimeout(() => {
        floatBtn.classList.remove('hide-text');
      }, 300);
    }, 3000);
  }, 500);
}, 1000);

// Scroll function
floatBtn.addEventListener('click', () => {
  document.getElementById('guide').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// Fungsi untuk mengecek dan menyembunyikan floating button
function updateButtonVisibility() {
    const floatBtn = document.getElementById('guide-float-btn');
    const currentPage = document.querySelector('.page.active').id;
    
    // Sembunyikan jika bukan di halaman dashboard
    if (currentPage !== 'dashboard-page') {
      floatBtn.classList.add('hidden');
    } else {
      floatBtn.classList.remove('hidden');
    }
  }
  
  // Panggil fungsi saat:
  // 1. Halaman pertama kali load
  document.addEventListener('DOMContentLoaded', updateButtonVisibility);
  
  // 2. Setiap kali berpindah halaman
  function showPage(pageId) {
    // Kode existing Anda untuk berpindah halaman...
    
    // Tambahkan ini di akhir fungsi
    updateButtonVisibility();
  }
  // Jaga posisi konstan
function setFixedPosition() {
    const btn = document.getElementById('guide-float-btn');
    const viewportHeight = window.innerHeight;
    btn.style.bottom = (viewportHeight * 0.85) + 'px'; // Selalu % dari viewport
  }
  
  window.addEventListener('load', setFixedPosition);
  window.addEventListener('resize', setFixedPosition);

  //lazy loading menu item
  document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    menuItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 100}ms`;
      observer.observe(item);
    });
  });
  
// Fungsi untuk mendeteksi iOS
function isIOSDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) && !window.MSStream;
}

// Fungsi untuk mengatur background khusus iOS
function setIOSBackground() {
  if (isIOSDevice()) {
    document.documentElement.classList.add('ios-device');
  }
}

// Fungsi khusus untuk iOS
function iOSSpecificFunction() {
  console.log('Perangkat iOS terdeteksi, menjalankan fungsi khusus...');
  
  // Contoh: Tampilkan instruksi instalasi
  const prompt = document.createElement('div');
  prompt.innerHTML = `
   <div id="ios-install-prompt" class="ios-prompt">
  <div class="prompt-container">
    <div class="prompt-header">
      <h2 class="prompt-title">Tambahkan ke Layar Utama</h2>
      <p class="prompt-subtitle">Untuk pengalaman seperti aplikasi native dengan akses instan</p>
    </div>
    
    <div class="icon-flow">
      <!-- Ikon Share Safari iOS 18-style -->
      <svg viewBox="0 0 24 24" class="ios-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <!-- Panah naik -->
      <path d="M12 12V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M8 8l4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      
      <!-- Kotak terbuka -->
      <path d="M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>
      <span class="ios-arrow">→</span>
      <!-- Ikon Add iOS 18 style -->
      <svg viewBox="0 0 24 24" class="ios-add-icon" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    
    <div class="steps-container">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-text">Tekan ikon <strong>Bagikan</strong> di bilah menu</div>
          <div class="step-note">Di bagian bawah layar Safari</div>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-text">Pilih <strong>"Tambahkan ke Layar Utama"</strong></div>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-text">Konfirmasi dengan menekan <strong>Tambah</strong></div>
        </div>
      </div>
    </div>
    
    <button id="understand-btn" class="understand-btn">
      <svg class="check-icon" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
      </svg>
      Mengerti
    </button>
  </div>
</div>

<style>
:root {
  --ios-blue: #0A84FF;
  --ios-dark-blue: #007AFF;
  --ios-gray: #8E8E93;
  --ios-light-gray: #E5E5EA;
  --ios-dark-bg: #1C1C1E;
  --ios-dark-text: #F2F2F7;
}

.ios-prompt {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  z-index: 10000;
  animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  max-width: 380px;
  width: calc(100% - 40px);
  margin-bottom: 20px;
  border: 1px solid var(--ios-light-gray);
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.prompt-header {
  text-align: center;
  margin-bottom: 20px;
}

.prompt-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0 0 4px 0;
  letter-spacing: -0.2px;
}

.prompt-subtitle {
  font-size: 14px;
  color: var(--ios-gray);
  margin: 0;
  line-height: 1.4;
}

.icon-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
  padding: 12px 0;
}

.ios-share-icon, .ios-add-icon {
  width: 44px;
  height: 44px;
  padding: 10px;
  background-color: var(--ios-light-gray);
  border-radius: 12px;
}

.ios-share-icon {
  color: var(--ios-blue);
}

.ios-add-icon {
  color: #34C759;
}

.ios-arrow {
  font-size: 24px;
  color: var(--ios-gray);
  margin: 0 8px;
}

.steps-container {
  margin-bottom: 20px;
}

.step {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-start;
}

.step-number {
  background-color: var(--ios-blue);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
}

.step-content {
  flex-grow: 1;
}

.step-text {
  font-size: 15px;
  color: #000;
  line-height: 1.4;
}

.step-note {
  font-size: 13px;
  color: var(--ios-gray);
  margin-top: 4px;
}

.understand-btn {
  width: 100%;
  background-color: var(--ios-blue);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.understand-btn:hover {
  background-color: var(--ios-dark-blue);
}

.check-icon {
  width: 20px;
  height: 20px;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .ios-prompt {
    background-color: var(--ios-dark-bg);
    border-color: #2C2C2E;
  }

  .prompt-title, .step-text {
    color: var(--ios-dark-text);
  }

  .prompt-subtitle, .step-note {
    color: #AEAEB2;
  }

  .icon-flow {
    background-color: transparent;
  }

  .ios-share-icon, .ios-add-icon {
    background-color: #2C2C2E;
  }

  .understand-btn {
    background-color: var(--ios-blue);
  }
}
</style>
  `;
  
  document.body.appendChild(prompt);
  
  document.getElementById('understand-btn').addEventListener('click', function () {
    // Simpan waktu terakhir prompt ditampilkan
    localStorage.setItem('lastIOSPromptShown', Date.now());
    document.getElementById('ios-install-prompt').remove();
  });
}

// Fungsi untuk mengecek apakah sudah waktunya menampilkan prompt
function shouldShowIOSPrompt() {
  const lastShown = localStorage.getItem('lastIOSPromptShown');
  
  // Jika belum pernah ditampilkan, tampilkan sekarang
  if (!lastShown) {
    return true;
  }
  
  // Hitung selisih waktu dalam milidetik
  const now = Date.now();
  const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 1 minggu dalam milidetik
  
  // Jika sudah lebih dari 1 minggu sejak terakhir ditampilkan, tampilkan lagi
  return (now - parseInt(lastShown)) > oneWeekInMs;
}

// Jalankan saat DOM sudah siap
window.addEventListener('DOMContentLoaded', () => {
  if (isIOSDevice()) {
    setIOSBackground(); // Jalankan selalu untuk iOS

    if (shouldShowIOSPrompt()) {
      setTimeout(() => {
        iOSSpecificFunction(); // Popup hanya seminggu sekali
        localStorage.setItem('lastIOSPromptShown', Date.now());
      }, 3000);
    }
  }
});

  
// Navbar
function navigateToPage(pageId, button = null, push = true) {
  // Tampilkan hanya halaman yang dipilih
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update tombol navbar aktif
  document.querySelectorAll('.navbar-button').forEach(btn => {
    btn.classList.remove('active');
  });
  if (button) {
    button.classList.add('active');
  } else {
    // Auto aktif berdasarkan data-target
    const targetButton = document.querySelector(`.navbar-button[data-target="${pageId}"]`);
    if (targetButton) {
      targetButton.classList.add('active');
    }
  }

  // Perbarui hash dan riwayat jika diizinkan
  if (push) {
    history.pushState({ pageId }, '', `#${pageId}`);
  }
}

// Saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', () => {
  // Replace awal supaya gesture back tetap ke dashboard
  history.replaceState({ pageId: 'dashboard-page' }, '', '#dashboard-page');
  navigateToPage('dashboard-page', null, false);
});

// Saat gesture back / tombol back ditekan
window.addEventListener('popstate', (event) => {
  const pageId = event.state?.pageId || 'dashboard-page';
  navigateToPage(pageId, null, false);
});

// Perbaiki height untuk mobile viewport
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Panggil saat load dan resize
window.addEventListener('load', setVH);
window.addEventListener('resize', setVH);