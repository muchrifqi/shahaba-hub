// Sample data for demonstration
const sampleEvents = {
    "2025-05-15": [
        {
            title: "Ujian Tengah Semester",
            time: "08:00 - 12:00",
            type: "ujian",
            level: "all",
            description: "Ujian tengah semester untuk semua kelas"
        },
        {
            title: "Rapat Guru",
            time: "13:00 - 15:00",
            type: "kegiatan",
            level: "all",
            description: "Rapat evaluasi pembelajaran"
        }
    ],
    "2025-05-20": [
        {
            title: "Field Trip SD",
            time: "09:00 - 14:00",
            type: "kegiatan",
            level: "sd",
            description: "Kunjungan ke museum untuk kelas 4-6 SD"
        }
    ],
    "2025-05-25": [
        {
            title: "Hari Libur Nasional",
            time: "00:00 - 23:59",
            type: "libur",
            level: "all",
            description: "Libur nasional memperingati Hari Raya"
        }
    ],
    "2025-05-10": [
        {
            title: "Pembagian Raport",
            time: "10:00 - 12:00",
            type: "umum",
            level: "smp",
            description: "Pembagian raport tengah semester untuk SMP"
        }
    ]
};

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Display current month
    updateCalendar(currentMonth, currentYear);

    // Navigation buttons
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });
});

function updateCalendar(month, year) {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                       "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Update month display
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get days from previous month to display
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    // Clear calendar
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Add days from previous month
    for (let i = firstDay > 0 ? firstDay - 1 : 6; i > 0; i--) {
        const dayElement = createDayElement(prevMonthDays - i + 1, true);
        calendarDays.appendChild(dayElement);
    }
    
    // Add days from current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = createDayElement(i, false);
        
        // Highlight today
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    // Calculate remaining cells to fill the grid (42 cells total)
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;
    
    // Add days from next month
    for (let i = 1; i <= remainingCells; i++) {
        const dayElement = createDayElement(i, true);
        calendarDays.appendChild(dayElement);
    }
}

function createDayElement(day, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    // Add event indicators if there are events for this day
    const currentMonth = document.getElementById('currentMonth').textContent;
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                       "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames.indexOf(currentMonth.split(' ')[0]);
    const year = parseInt(currentMonth.split(' ')[1]);
    
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (sampleEvents[dateKey]) {
        const eventIndicators = document.createElement('div');
        eventIndicators.className = 'event-indicators';
        
        // Get unique event types for this day
        const eventTypes = [...new Set(sampleEvents[dateKey].map(event => event.type))];
        
        eventTypes.forEach(type => {
            const dot = document.createElement('div');
            dot.className = `event-dot event-${type}`;
            eventIndicators.appendChild(dot);
        });
        
        dayElement.appendChild(eventIndicators);
    }
    
    // Add click event to show events for this day
    dayElement.addEventListener('click', function() {
        // Remove selected class from all days
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selected class to clicked day
        this.classList.add('selected');
        
        // Show events for this day
        showEventsForDay(day, month, year);
    });
    
    return dayElement;
}

function showEventsForDay(day, month, year) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const eventsContainer = document.getElementById('selectedEvents');
    const eventList = document.getElementById('eventList');
    
    // Update date title
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                       "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById('selectedDateTitle').innerHTML = `
        <i class="fas fa-calendar-day"></i> Agenda ${day} ${monthNames[month]} ${year}
    `;
    
    // Clear existing events
    eventList.innerHTML = '';
    
    // Show events if available
    if (sampleEvents[dateKey]) {
        sampleEvents[dateKey].forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = `event-item event-${event.level}`;
            
            eventItem.innerHTML = `
                <div class="event-title">${event.title}</div>
                <div class="event-time">
                    <i class="far fa-clock"></i> ${event.time}
                </div>
                <div class="event-description">${event.description}</div>
            `;
            
            eventList.appendChild(eventItem);
        });
        
        eventsContainer.style.display = 'block';
    } else {
        eventList.innerHTML = '<div style="color: rgba(255,255,255,0.6); text-align: center; padding: 20px;">Tidak ada agenda untuk hari ini</div>';
        eventsContainer.style.display = 'block';
    }
}