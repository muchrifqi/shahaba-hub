/**
 * KALENDER KEGIATAN SEKOLAH
 * File: assets/js/kal-kegiatan.js
 */

// ==================== DATA & KONFIGURASI ====================
const kegiatanKalender = [
    { 
        tanggal: "2025-04-15", 
        judul: "Rapat Orang Tua Siswa - SD", 
        jenjang: "SD",
        deskripsi: "Rapat rutin orang tua siswa SD membahas program semester"
    },
    { 
        tanggal: "2025-04-20", 
        judul: "Field Trip ke Taman Mini - Prasekolah", 
        jenjang: "Prasekolah",
        deskripsi: "Kunjungan edukatif ke Taman Mini Indonesia Indah"
    },
    { 
      tanggal: "2025-04-15", 
      judul: "Rapat Orang Tua Siswa - SD", 
      jenjang: "SD",
      deskripsi: "Rapat rutin orang tua siswa SD membahas program semester"
  },
  { 
      tanggal: "2025-04-20", 
      judul: "Field Trip ke Taman Mini - Prasekolah", 
      jenjang: "Prasekolah",
      deskripsi: "Kunjungan edukatif ke Taman Mini Indonesia Indah"
  },    { 
    tanggal: "2025-04-15", 
    judul: "Rapat Orang Tua Siswa - SD", 
    jenjang: "SD",
    deskripsi: "Rapat rutin orang tua siswa SD membahas program semester"
},
{ 
    tanggal: "2025-04-20", 
    judul: "Field Trip ke Taman Mini - Prasekolah", 
    jenjang: "Prasekolah",
    deskripsi: "Kunjungan edukatif ke Taman Mini Indonesia Indah"
},    { 
  tanggal: "2025-04-15", 
  judul: "Rapat Orang Tua Siswa - SD", 
  jenjang: "SD",
  deskripsi: "Rapat rutin orang tua siswa SD membahas program semester"
},
{ 
  tanggal: "2025-04-20", 
  judul: "Field Trip ke Taman Mini - Prasekolah", 
  jenjang: "Prasekolah",
  deskripsi: "Kunjungan edukatif ke Taman Mini Indonesia Indah"
},    { 
  tanggal: "2025-04-15", 
  judul: "Rapat Orang Tua Siswa - SD", 
  jenjang: "SMP",
  deskripsi: "Rapat rutin orang tua siswa SD membahas program semester"
},
{ 
  tanggal: "2025-04-20", 
  judul: "Field Trip ke Taman Mini - Prasekolah", 
  jenjang: "Prasekolah",
  deskripsi: "Kunjungan edukatif ke Taman Mini Indonesia Indah"
},
    // Data lainnya...
];

const configKalender = {
    initialView: 'dayGridMonth',
    locale: 'id',
    headerToolbar: {
        left: 'prev',
        center: 'title',
        right: 'next'
    },
    eventDisplay: 'block',
    dayMaxEventRows: 2,
    height: 'auto'
};

// ================ KONFIGURASI TEMA ================
const calendarTheme = {
    base: {
      header: {
        textColor: '#ffffff',
        background: 'rgba(255,255,255,0.1)'
      },
      dayGrid: {
        dayHeader: {
          textColor: '#e2e8f0'
        }
      }
    },
    levels: {
      SD: { color: '#3b82f6', light: 'rgba(59, 130, 246, 0.2)' },
      SMP: { color: '#10b981', light: 'rgba(16, 185, 129, 0.2)' },
      Prasekolah: { color: '#8b5cf6', light: 'rgba(139, 92, 246, 0.2)' }
    }
  };
  
  // ================ ELEMEN UI ================
  function createCalendarHeader() {
    return `
      <div class="calendar-header">
        <div class="flex items-center gap-2">
          <i class="fas fa-calendar-check text-xl text-blue-400"></i>
          <h2 class="text-xl font-bold">Kalender Akademik</h2>
        </div>
        <div id="current-month-year" class="month-display text-gray-300"></div>
      </div>
    `;
  }
  
  function createEventItem(event) {
    return `
      <li class="event-item event-${event.jenjang.toLowerCase()}">
        <div class="event-content" onclick="showEventDetail(
          '${event.tanggal}',
          '${escapeHtml(event.judul)}',
          '${escapeHtml(event.jenjang)}',
          '${escapeHtml(event.deskripsi || '')}'
        )">
          <div class="event-header">
            <span class="event-badge ${getColorClass(event.jenjang)}">${event.jenjang}</span>
            <span class="event-time">${formatTime(event.tanggal)}</span>
          </div>
          <h3 class="event-title">${event.judul.replace(` - ${event.jenjang}`, '')}</h3>
          <p class="event-date">${formatTanggal(event.tanggal)}</p>
        </div>
      </li>
    `;
  }
  
  // ================ STYLE DINAMIS ================
  function applyCalendarStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Kalender Container */
      .calendar-container {
        border-radius: 12px;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      
      /* Header */
      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
        background: rgba(255,255,255,0.05);
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      /* Item Kegiatan */
      .event-item {
        background: rgba(255,255,255,0.03);
        border-radius: 10px;
        transition: all 0.3s ease;
        margin-bottom: 0.75rem;
      }
      
      .event-item:hover {
        transform: translateY(-2px);
        background: rgba(255,255,255,0.08);
      }
      
      .event-content {
        padding: 1rem;
        cursor: pointer;
      }
      
      .event-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      
      .event-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
      }
      
      .event-time {
        font-size: 0.75rem;
        color: rgba(255,255,255,0.7);
      }
      
      .event-title {
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0.25rem 0;
        line-height: 1.4;
      }
      
      .event-date {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.7);
        margin-top: 0.25rem;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .calendar-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
        
        .event-content {
          padding: 0.75rem;
        }
      }
 /* PERBAIKAN FC-POPOVER - COVER ALL CASES */
      .fc-theme-standard .fc-popover,
      .fc-popover {
        background: #1e293b !important;
        border: 1px solid #334155 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
        border-radius: 8px !important;
      }
      
      .fc-theme-standard .fc-popover-header,
      .fc-popover-header {
        background: #0f172a !important;
        color: #e2e8f0 !important;
        border-bottom: 1px solid #334155 !important;
        padding: 10px 12px !important;
        font-weight: 600 !important;
        border-radius: 8px 8px 0 0 !important;
      }
      
      .fc-theme-standard .fc-popover-body,
      .fc-popover-body {
        color: #cbd5e1 !important;
        padding: 12px !important;
      }
      
      .fc-theme-standard .fc-popover-close,
      .fc-popover-close {
        color: #94a3b8 !important;
        opacity: 1 !important;
        font-size: 1.1em !important;
      }
      
      .fc-theme-standard .fc-popover-close:hover,
      .fc-popover-close:hover {
        color: #e2e8f0 !important;
      }
    `;
    document.head.appendChild(style);
  }


// ==================== FUNGSI UTILITAS ====================
function formatTanggal(tgl) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(tgl).toLocaleDateString('id-ID', options);
}

function formatTime(tgl) {
  return new Date(tgl).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
  });
}

function getColorClass(jenjang) {
  const colors = {
      'SD': 'bg-blue-600',
      'SMP': 'bg-green-500',
      'Prasekolah': 'bg-purple-500'
  };
  return colors[jenjang] || 'bg-yellow-500';
}

// Fungsi untuk update warna badge di modal
function updateLevelBadgeColor(level) {
  const badge = document.getElementById('modal-level-badge');
  const colors = {
      'SD': 'bg-blue-500',
      'SMP': 'bg-green-500',
      'Prasekolah': 'bg-purple-500'
  };
  badge.className = `w-3 h-3 rounded-full ${colors[level] || 'bg-gray-500'}`;
}

// ==================== MANAJEMEN TAMPILAN ====================
function updateCurrentMonthYear(date = new Date()) {
  const options = { year: 'numeric', month: 'long' };
  const elem = document.getElementById('current-month-year');
  if (elem) {
      elem.textContent = new Date(date).toLocaleDateString('id-ID', options);
  }
}

function tampilkanKalender(events) {
    const container = document.getElementById("calendar-list");
    if (!container) return;

    container.innerHTML = events.map(event => `
        <li class="event-${event.jenjang.toLowerCase()}">
            <div onclick="showEventDetail(
                '${event.tanggal}', 
                '${escapeHtml(event.judul)}', 
                '${escapeHtml(event.jenjang)}',
                '${escapeHtml(event.deskripsi || '')}'
            )" class="cursor-pointer p-4 hover:bg-white/5 transition">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-xs px-3 py-1 rounded-full ${getColorClass(event.jenjang)} text-white">
                        ${event.jenjang}
                    </span>
                    <span class="text-xs text-gray-300">${formatTime(event.tanggal)}</span>
                </div>
                <h4 class="font-medium text-white">${event.judul.replace(` - ${event.jenjang}`, '')}</h4>
                <p class="text-sm text-gray-300">${formatTanggal(event.tanggal)}</p>
            </div>
        </li>
    `).join('');

    document.getElementById('events-count').textContent = `${events.length} Kegiatan`;
}

function filterEventsByDateRange(startDate, endDate) {
    const filtered = kegiatanKalender.filter(event => {
        const eventDate = new Date(event.tanggal);
        return eventDate >= startDate && eventDate <= endDate;
    });
    tampilkanKalender(filtered);
}

// ==================== MANAJEMEN MODAL ====================
function showEventDetail(tanggal, judul, jenjang, deskripsi) {
  const modal = document.getElementById('event-modal');
  if (!modal) return;

  // Update badge color first
  updateLevelBadgeColor(jenjang);
  
  document.getElementById('modal-title').textContent = judul.replace(` - ${jenjang}`, '');
  document.getElementById('modal-date').textContent = formatTanggal(tanggal);
  document.getElementById('modal-level').textContent = jenjang;
  document.getElementById('modal-description').textContent = 
      deskripsi || `Detail kegiatan akan diinformasikan lebih lanjut oleh pihak sekolah.`;

  modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('event-modal');
    if (modal) modal.classList.add('hidden');
}

// ==================== INISIALISASI KALENDER ====================
function initFullCalendar() {
  try {
      const calendarEl = document.getElementById('calendar');
      if (!calendarEl) throw new Error('Element kalender tidak ditemukan');

      // 1. TAMBAHKAN LOADING STATE
      calendarEl.innerHTML = '<div class="calendar-loading">Memuat kalender...</div>';
      
      // 2. PASTIKAN ELEMENT SUDAH TERLIHAT SEBELUM RENDER
      const ensureVisible = () => {
          return new Promise((resolve) => {
              const checkVisibility = () => {
                  if (calendarEl.offsetParent !== null) {
                      resolve();
                  } else {
                      setTimeout(checkVisibility, 50);
                  }
              };
              checkVisibility();
          });
      };

      // 3. INISIALISASI SETELAH ELEMENT VISIBLE
      const initialize = async () => {
          await ensureVisible();
          
          const calendarEvents = kegiatanKalender.map(event => ({
              title: event.judul.replace(` - ${event.jenjang}`, ''),
              start: event.tanggal,
              color: calendarTheme.levels[event.jenjang]?.color || '#3b82f6',
              extendedProps: {
                  jenjang: event.jenjang,
                  fullTitle: event.judul,
                  deskripsi: event.deskripsi
              }
          }));

          const calendar = new FullCalendar.Calendar(calendarEl, {
              ...configKalender,
              events: calendarEvents,
              eventClick: (info) => {
                  showEventDetail(
                      info.event.start,
                      info.event.extendedProps.fullTitle,
                      info.event.extendedProps.jenjang,
                      info.event.extendedProps.deskripsi
                  );
              },
              datesSet: (info) => {
                  updateCurrentMonthYear(info.view.currentStart);
                  filterEventsByDateRange(info.view.activeStart, info.view.activeEnd);
              },
              // 4. FORCE RENDER AWAL
              initialDate: new Date() // Pastikan render tanggal saat ini
          });

          calendar.render();
          
          // 5. TRIGGER RESIZE UNTUK MEMASTIKAN RENDER
          setTimeout(() => {
              calendar.updateSize();
              updateCurrentMonthYear();
              tampilkanKalender(kegiatanKalender);
          }, 100);
      };

      initialize();
  } catch (error) {
      console.error('Gagal inisialisasi kalender:', error);
      tampilkanErrorKalender();
  }
}

// ================ PERBAIKAN SHOW PAGE ================
let calendarInstance = null;

function handlePageShow() {
    if (calendarInstance) {
        setTimeout(() => {
            calendarInstance.updateSize();
        }, 50);
    }
}

// Tambahkan event listener untuk page show
document.addEventListener('DOMContentLoaded', () => {
    // Panggil saat page calendar ditampilkan
    document.getElementById('calendar-page')?.addEventListener('show', handlePageShow);
});

function tampilkanErrorKalender() {
    const container = document.getElementById('calendar-container');
    if (container) {
        container.innerHTML = `
            <div class="bg-red-500/10 p-4 rounded-lg border border-red-500">
                <p class="text-red-300">Gagal memuat kalender. Silakan refresh halaman atau coba lagi nanti.</p>
                <button onclick="window.location.reload()" class="mt-2 px-3 py-1 bg-red-500/20 text-white rounded">
                    <i class="fas fa-sync-alt mr-1"></i> Muat Ulang
                </button>
            </div>
        `;
    }
}

// ==================== FUNGSI BANTU ====================
function escapeHtml(unsafe) {
    return unsafe?.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;") || '';
}

// ==================== LOAD & INIT ====================
function checkAndInitCalendar() {
    if (typeof FullCalendar === 'undefined') {
        console.warn('FullCalendar belum terload, mencoba lagi dalam 100ms...');
        setTimeout(checkAndInitCalendar, 100);
        return;
    }
    initFullCalendar();
}

// Export fungsi ke global scope
window.showEventDetail = showEventDetail;
window.closeModal = closeModal;

// Mulai inisialisasi saat DOM ready
document.addEventListener('DOMContentLoaded', checkAndInitCalendar);