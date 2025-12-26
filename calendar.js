
const calendarState = {
    currentMonth: 0, // 0 = Jan
    currentYear: 2026,
    minDate: new Date(2026, 0, 1),
    maxDate: new Date(2027, 11, 31)
};

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month-display');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (!grid || !monthDisplay) return;

    // Update Header
    monthDisplay.textContent = `${months[calendarState.currentMonth]} ${calendarState.currentYear}`;

    // Clear Grid
    grid.innerHTML = '';

    // First day of the month
    const firstDay = new Date(calendarState.currentYear, calendarState.currentMonth, 1).getDay();
    // Days in Month
    const daysInMonth = new Date(calendarState.currentYear, calendarState.currentMonth + 1, 0).getDate();
    // Days in Previous Month
    const daysInPrevMonth = new Date(calendarState.currentYear, calendarState.currentMonth, 0).getDate();

    // Adjust for Monday start (0 = Mon, 6 = Sun) if desired? 
    // Standard JS getDay() is 0=Sun. The HTML grid has Mon as first col.
    // So we need to shift: Sun(0) -> 6, Mon(1) -> 0.
    let startingDay = firstDay - 1;
    if (startingDay < 0) startingDay = 6;

    // Previous Month Padding
    for (let i = 0; i < startingDay; i++) {
        const day = daysInPrevMonth - startingDay + i + 1;
        const cell = document.createElement('span');
        cell.className = "p-2 text-sm text-[#d1d5db] dark:text-[#4b5563]";
        cell.textContent = day;
        grid.appendChild(cell);
    }

    // Current Month Days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('span');
        cell.className = "p-2 text-sm font-medium text-[#111418] dark:text-white rounded-lg hover:bg-[#f3f4f6] dark:hover:bg-[#283039] cursor-pointer transition-colors";
        cell.textContent = i;

        // Highlight logic (Example: Jan 9 2026)
        if (i === 9 && calendarState.currentMonth === 0 && calendarState.currentYear === 2026) {
            cell.classList.remove('text-[#111418]', 'dark:text-white', 'hover:bg-[#f3f4f6]', 'dark:hover:bg-[#283039]');
            cell.classList.add('text-white', 'bg-primary', 'shadow-lg', 'shadow-primary/30', 'font-bold');
        }

        // Add click event for navigation
        cell.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        grid.appendChild(cell);
    }

    // Navigation State
    const current = new Date(calendarState.currentYear, calendarState.currentMonth);
    // Check if Prev is OOB
    const prevDate = new Date(calendarState.currentYear, calendarState.currentMonth - 1);
    const nextDate = new Date(calendarState.currentYear, calendarState.currentMonth + 1);

    if (prevDate < calendarState.minDate) {
        prevBtn.classList.add('opacity-30', 'pointer-events-none');
    } else {
        prevBtn.classList.remove('opacity-30', 'pointer-events-none');
    }

    if (nextDate > calendarState.maxDate) {
        nextBtn.classList.add('opacity-30', 'pointer-events-none');
    } else {
        nextBtn.classList.remove('opacity-30', 'pointer-events-none');
    }
}

function changeMonth(delta) {
    let newMonth = calendarState.currentMonth + delta;
    let newYear = calendarState.currentYear;

    if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    }

    // Validate bounds
    const newDate = new Date(newYear, newMonth, 1);
    // We compare months, so set days to 1 to avoid mismatch
    if (newDate >= calendarState.minDate && newDate <= calendarState.maxDate) {
        calendarState.currentMonth = newMonth;
        calendarState.currentYear = newYear;
        renderCalendar();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();

    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
});
