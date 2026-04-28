const STORAGE_KEY = 'bookedBusyEntries';
const SETTINGS_KEY = 'bookedBusySettings';
const THEMES_KEY = 'bookedBusyThemes';
const DEFAULT_MONTH = '2026-02';
const DEFAULT_WEEK_START = '2026-02-22';
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Theme Definitions
const THEMES = {
  default: {
    name: 'Soft Pink',
    appBackground: '#f4d7e5',
    cardBorder: '#e8b5c7',
    buttonSurface: '#ffffff',
    textColor: '#362c3a',
    accentColor: '#f8d1e0'
  },
  darkMode: {
    name: 'Dark Mode',
    appBackground: '#1a1520',
    cardBorder: '#3d2e42',
    buttonSurface: '#2d2335',
    textColor: '#e8d5e0',
    accentColor: '#7a5a6f'
  },
  sageGreen: {
    name: 'Sage Green',
    appBackground: '#c8dcc8',
    cardBorder: '#a8bda8',
    buttonSurface: '#e8f0e8',
    textColor: '#2d4a2d',
    accentColor: '#b8cdb8'
  },
  softAesthetic: {
    name: 'Soft Aesthetic',
    appBackground: '#e8d4e8',
    cardBorder: '#d4b8d4',
    buttonSurface: '#f5e5f5',
    textColor: '#4a3950',
    accentColor: '#ddc0dd'
  }
};

const defaultEntries = [
  { id: '1', type: 'event', title: 'Math homework', date: '2026-02-22', time: '5:00 PM', details: 'Complete algebra practice before study session.' },
  { id: '2', type: 'event', title: 'Meet with Noa', date: '2026-02-22', time: '7:00 PM', details: 'Sync on project progress and next steps.' },
  { id: '3', type: 'event', title: 'Physics exam', date: '2026-02-24', time: '9:00 AM', details: 'Review chapters 6–8 and formula sheet.' },
  { id: '4', type: 'task', title: 'English homework', date: '2026-02-25', time: '6:00 PM', details: 'Write reading responses and prepare notes.' },
  { id: '5', type: 'reminder', title: 'Meeting with Shay', date: '2026-02-27', time: '2:00 PM', details: 'Bring agenda and meeting notes.' },
  { id: '6', type: 'holiday', title: 'Valentine’s Day', date: '2026-02-14', time: 'All Day', details: 'Celebrate love and self-care.', isImportant: true },
  { id: '7', type: 'holiday', title: 'St. Patrick’s Day', date: '2026-03-17', time: 'All Day', details: 'Wear green and celebrate.', isImportant: false },
  { id: '8', type: 'holiday', title: 'Fourth of July', date: '2026-07-04', time: 'All Day', details: 'Independence Day celebration.', isImportant: true },
  { id: '9', type: 'holiday', title: 'Christmas Day', date: '2026-12-25', time: 'All Day', details: 'Holiday celebration.', isImportant: true }
];

const defaultSettings = {
  appBackground: '#efbfd2',
  cardBorder: '#e7b5ca',
  buttonSurface: '#ffffff',
  accentColor: '#f8d1e0',
  textColor: '#2e2430',
  calendarBg: '#ffffff',
  backgroundImage: ''
};

let entries = [];
let settings = {};

function parseQuery(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    entries = [...defaultEntries];
    saveEntries();
    return entries;
  }

  try {
    entries = JSON.parse(raw);
  } catch (error) {
    entries = [...defaultEntries];
    saveEntries();
  }

  return entries;
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    settings = { ...defaultSettings };
    saveSettings();
    return settings;
  }

  try {
    settings = { ...defaultSettings, ...JSON.parse(raw) };
  } catch (error) {
    settings = { ...defaultSettings };
  }

  return settings;
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function formatMonth(monthIndex) {
  return MONTH_NAMES[monthIndex - 1] || '';
}

function getEntriesForDate(dateString) {
  return entries.filter((entry) => entry.date === dateString);
}

function getEntriesForMonth(monthKey) {
  return entries.filter((entry) => entry.date.startsWith(monthKey));
}

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDayHeader(dateString) {
  const dateObject = parseLocalDate(dateString);
  if (Number.isNaN(dateObject.getTime())) {
    return 'Today';
  }
  return dateObject.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = Array.from(document.querySelectorAll('a.view-button, a.view-nav-link, .top-nav a'));
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      if (link.getAttribute('href') === 'p1year.html') {
        link.setAttribute('aria-current', 'page');
      }
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function applySettings() {
  document.documentElement.style.setProperty('--app-background', settings.appBackground);
  document.documentElement.style.setProperty('--card-border', settings.cardBorder);
  document.documentElement.style.setProperty('--button-surface', settings.buttonSurface);
  document.documentElement.style.setProperty('--text-main', settings.textColor);

  if (settings.backgroundImage) {
    document.body.style.background = `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url(${settings.backgroundImage}) center/cover fixed no-repeat`;
  } else {
    document.body.style.background = `radial-gradient(circle at top left, rgba(255, 255, 255, 0.78), transparent 28%), linear-gradient(160deg, #f7c9db 0%, ${settings.appBackground} 48%, #f4d7e5 100%)`;
  }

  const shell = document.getElementById('appShell');
  if (shell) {
    shell.style.background = 'transparent';
  }

  const cardBorderTargets = document.querySelectorAll('.calendar-card, .month-card, .detail-panel, .summary-card, .year-grid .month-card');
  cardBorderTargets.forEach((element) => {
    element.style.borderColor = settings.cardBorder;
  });

  const buttonTargets = document.querySelectorAll('.customize-button, .view-button, .icon-button, .footer-button, .back-link');
  buttonTargets.forEach((button) => {
    button.style.background = settings.buttonSurface;
  });
}

function syncCustomizationControls() {
  const backgroundInput = document.getElementById('backgroundColorPicker');
  const borderInput = document.getElementById('cardBorderPicker');
  const buttonInput = document.getElementById('buttonColorPicker');
  const imageInput = document.getElementById('backgroundImageUpload');
  const previewSwatch = document.getElementById('previewSwatch');

  if (backgroundInput) backgroundInput.value = settings.appBackground;
  if (borderInput) borderInput.value = settings.cardBorder;
  if (buttonInput) buttonInput.value = settings.buttonSurface;
  if (previewSwatch) {
    previewSwatch.style.background = settings.backgroundImage
      ? `url(${settings.backgroundImage}) center/cover no-repeat`
      : `linear-gradient(145deg, ${settings.appBackground}, #ffffff)`;
  }
  if (imageInput) imageInput.value = '';
}

function openMonth(monthKey) {
  const destination = `p2month.html?month=${monthKey}`;
  window.location.href = destination;
}

function openDay(dateString) {
  window.location.href = `p4day.html?date=${dateString}`;
}

function renderYearView() {
  const monthCards = document.querySelectorAll('.month-card[data-month]');
  if (!monthCards.length) return;

  monthCards.forEach((card) => {
    const monthIndex = Number(card.dataset.month);
    if (!monthIndex) return;
    const monthKey = `2026-${String(monthIndex).padStart(2, '0')}`;
    const entriesForMonth = getEntriesForMonth(monthKey);
    const monthName = card.dataset.monthName || formatMonth(monthIndex);

    card.innerHTML = `
      <div class="month-header">${monthName}</div>
      <div class="month-content">
        <span class="month-badge">${entriesForMonth.length} ${entriesForMonth.length === 1 ? 'item' : 'items'}</span>
      </div>
    `;

    card.onclick = () => openMonth(monthKey);
  });
}

function renderMonthView() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const monthParam = parseQuery('month') || DEFAULT_MONTH;
  const [year, monthString] = monthParam.split('-');
  const monthIndex = Number(monthString);
  const monthLabel = document.querySelector('.month-text');
  if (monthLabel) {
    monthLabel.textContent = `${formatMonth(monthIndex)} ${year}`;
  }

  const startDate = new Date(Number(year), monthIndex - 1, 1);
  const firstWeekDay = startDate.getDay();
  const daysInMonth = new Date(Number(year), monthIndex, 0).getDate();
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  grid.innerHTML = '';

  for (let i = 0; i < firstWeekDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-cell empty-cell';
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEntries = getEntriesForDate(dateString);
    const isToday = dateString === todayKey;
    const cell = document.createElement('button');
    cell.className = `calendar-cell day-button${isToday ? ' current-day' : ''}`;
    cell.type = 'button';
    cell.onclick = () => openDay(dateString);
    cell.innerHTML = `
      <span class="cell-number">${day}${isToday ? '<span class="today-heart">♥</span>' : ''}</span>
      <div class="day-badges">
        ${dayEntries.map((entry) => `<span class="badge ${entry.type}">${entry.type}</span>`).join('')}
      </div>
    `;

    grid.appendChild(cell);
  }

  const totalCells = firstWeekDay + daysInMonth;
  const trailingEmpty = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 0; i < trailingEmpty; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-cell empty-cell';
    grid.appendChild(emptyCell);
  }
}

function renderWeekView() {
  const weekGrid = document.getElementById('weekGrid');
  if (!weekGrid) return;

  const weekStartParam = parseQuery('week') || DEFAULT_WEEK_START;
  const startDate = parseLocalDate(weekStartParam);
  const weekDays = [...Array(7)].map((_, index) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + index);
    return day;
  });

  const weekLabel = document.querySelector('.month-text');
  if (weekLabel) {
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    const startMonth = firstDay.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = lastDay.toLocaleDateString('en-US', { month: 'long' });
    const weekSummary = `${startMonth === endMonth ? startMonth : `${startMonth} — ${endMonth}`} ${firstDay.getFullYear()}`;
    weekLabel.textContent = `Week of ${weekSummary}`;
  }

  weekGrid.innerHTML = '';

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  weekDays.forEach((day) => {
    const dateString = day.toISOString().slice(0, 10);
    const entriesForDay = getEntriesForDate(dateString);
    const dayLabel = day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const isToday = dateString === todayKey;

    const card = document.createElement('button');
    card.className = `week-card${isToday ? ' current-day' : ''}`;
    card.type = 'button';
    card.onclick = () => openDay(dateString);
    card.innerHTML = `
      <div class="week-card-header">
        <span>${dayLabel}${isToday ? ' ♥' : ''}</span>
      </div>
      <div class="week-card-body">
        ${entriesForDay.length
          ? entriesForDay.map((entry) => `<div class="week-event ${entry.type}">${entry.title}</div>`).join('')
          : '<div class="week-empty">No events yet</div>'}
      </div>
    `;

    weekGrid.appendChild(card);
  });
}

function updatePreviewSwatch() {
  const previewSwatch = document.getElementById('previewSwatch');
  if (!previewSwatch) return;

  previewSwatch.style.background = settings.backgroundImage
    ? `url(${settings.backgroundImage}) center/cover no-repeat`
    : `linear-gradient(145deg, ${settings.appBackground}, #ffffff)`;
}

function setupCustomization() {
  const customizeToggle = document.getElementById('customizeToggle');
  const customizePanel = document.getElementById('customizePanel');
  const backgroundInput = document.getElementById('backgroundColorPicker');
  const borderInput = document.getElementById('cardBorderPicker');
  const buttonInput = document.getElementById('buttonColorPicker');
  const imageInput = document.getElementById('backgroundImageUpload');
  const saveBtn = document.getElementById('saveBtn');
  const discardBtn = document.getElementById('discardBtn');
  const revertBtn = document.getElementById('revertBtn');

  if (customizeToggle && customizePanel) {
    customizeToggle.addEventListener('click', () => {
      customizePanel.classList.toggle('hidden');
    });
  }

  const updateSettings = () => {
    applySettings();
    updatePreviewSwatch();
  };

  if (backgroundInput) {
    backgroundInput.addEventListener('input', (event) => {
      settings.appBackground = event.target.value;
      updateSettings();
      saveSettings();
    });
  }

  if (borderInput) {
    borderInput.addEventListener('input', (event) => {
      settings.cardBorder = event.target.value;
      updateSettings();
      saveSettings();
    });
  }

  if (buttonInput) {
    buttonInput.addEventListener('input', (event) => {
      settings.buttonSurface = event.target.value;
      updateSettings();
      saveSettings();
    });
  }

  if (imageInput) {
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        settings.backgroundImage = reader.result;
        updateSettings();
        saveSettings();
      };
      reader.readAsDataURL(file);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveSettings();
      customizePanel.classList.add('hidden');
    });
  }

  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      settings = { ...loadSettings() };
      syncCustomizationControls();
      applySettings();
    });
  }

  if (revertBtn) {
    revertBtn.addEventListener('click', () => {
      settings = { ...defaultSettings };
      saveSettings();
      syncCustomizationControls();
      applySettings();
    });
  }
}

function openMonth(monthKey) {
  const destination = `p2month.html?month=${monthKey}`;
  window.location.href = destination;
}

function renderDayView() {
  const eventContainer = document.getElementById('dayEventList');
  if (!eventContainer) return;

  const rawDate = parseQuery('date') || `${DEFAULT_MONTH}-22`;
  const heading = document.getElementById('selectedDateHeading');
  const subtitle = document.getElementById('selectedDateSub');
  const titleLabel = document.getElementById('dayViewTitle');

  const dayEntries = getEntriesForDate(rawDate);
  const summaryText = dayEntries.length
    ? `${dayEntries.length} scheduled ${dayEntries.length === 1 ? 'item' : 'items'}`
    : 'No scheduled items for today';

  if (titleLabel) {
    titleLabel.textContent = formatDayHeader(rawDate);
  }
  if (heading) {
    heading.textContent = formatDayHeader(rawDate);
  }
  if (subtitle) {
    subtitle.textContent = summaryText;
  }

  if (!dayEntries.length) {
    eventContainer.innerHTML = '<div class="event-card"><h3>No events yet</h3><p>Click add task or add reminder to fill your day.</p></div>';
    return;
  }

  eventContainer.innerHTML = dayEntries
    .map((entry) => `
      <div class="event-card">
        <div class="event-card-top">
          <div>
            <h3>${entry.title}</h3>
            <span>${entry.type.toUpperCase()} • ${entry.time}</span>
          </div>
          <div class="event-card-actions">
            <button class="icon-button small" type="button" onclick="editEntry('${entry.id}')">Edit</button>
            <button class="icon-button small danger" type="button" onclick="deleteEntry('${entry.id}')">Delete</button>
          </div>
        </div>
        <p>${entry.details}</p>
      </div>
    `)
    .join('');
}

function openEntryModal(type, entry = null) {
  const modal = document.getElementById('addEntryModal');
  if (!modal) return;

  modal.classList.add('active');
  modal.dataset.entryType = type;
  const header = modal.querySelector('.add-modal-header h2');
  if (header) {
    header.textContent = entry ? 'Edit Entry' : type === 'task' ? 'Add Task' : type === 'reminder' ? 'Add Reminder' : 'Add Collaborator';
  }

  const typeInput = document.getElementById('entryType');
  const idInput = document.getElementById('entryId');
  const titleInput = document.getElementById('entryTitle');
  const dateInput = document.getElementById('entryDate');
  const timeInput = document.getElementById('entryTime');
  const detailsInput = document.getElementById('entryDetails');

  if (typeInput) typeInput.value = type;
  if (entry) {
    if (idInput) idInput.value = entry.id;
    if (titleInput) titleInput.value = entry.title;
    if (dateInput) dateInput.value = entry.date;
    if (timeInput) timeInput.value = entry.time;
    if (detailsInput) detailsInput.value = entry.details;
  } else {
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (dateInput) dateInput.value = '';
    if (timeInput) timeInput.value = '';
    if (detailsInput) detailsInput.value = '';
  }
}

function closeEntryModal() {
  const modal = document.getElementById('addEntryModal');
  if (!modal) return;
  modal.classList.remove('active');
}

function handleEntryForm(event) {
  event.preventDefault();
  const entryId = document.getElementById('entryId')?.value;
  const type = document.getElementById('entryType')?.value || 'task';
  const title = document.getElementById('entryTitle')?.value.trim();
  const date = document.getElementById('entryDate')?.value;
  const time = document.getElementById('entryTime')?.value;
  const details = document.getElementById('entryDetails')?.value.trim();

  if (!title || !date || !time) {
    return;
  }

  if (entryId) {
    const existingIndex = entries.findIndex((item) => item.id === entryId);
    if (existingIndex !== -1) {
      entries[existingIndex] = {
        ...entries[existingIndex],
        type,
        title,
        date,
        time,
        details: details || 'No details provided.'
      };
    }
  } else {
    const newEntry = {
      id: String(Date.now()),
      type: type,
      title,
      date,
      time,
      details: details || 'No details provided.'
    };
    entries.push(newEntry);
  }

  saveEntries();
  closeEntryModal();
  renderYearView();
  renderMonthView();
  renderDayView();
}

function editEntry(entryId) {
  const entry = entries.find((item) => item.id === entryId);
  if (!entry) return;
  openEntryModal(entry.type, entry);
}

function deleteEntry(entryId) {
  entries = entries.filter((item) => item.id !== entryId);
  saveEntries();
  renderYearView();
  renderMonthView();
  renderDayView();
}

function setupSearch() {
  const searchTrigger = document.getElementById('searchButton');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (!searchModal || !searchTrigger || !closeSearchBtn || !searchInput || !searchResults) return;

  searchTrigger.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
  });

  closeSearchBtn.addEventListener('click', () => {
    searchModal.classList.remove('active');
  });

  searchModal.addEventListener('click', (event) => {
    if (event.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const matches = entries.filter((entry) => entry.title.toLowerCase().includes(query) || entry.details.toLowerCase().includes(query));
    searchResults.innerHTML = query
      ? matches.length
        ? matches
            .map(
              (entry) => `
              <div class="event-card">
                <h3>${entry.title}</h3>
                <p>${entry.details}</p>
                <span>${entry.type} • ${entry.date} • ${entry.time}</span>
              </div>
            `
            )
            .join('')
        : '<p class="search-placeholder">No results found.</p>'
      : '<p class="search-placeholder">Enter a search term to find events</p>';
  });
}

function attachQuickMenu() {
  const quickMenuToggle = document.getElementById('addMenuToggle');
  const quickMenu = document.getElementById('quickMenu');
  const quickItems = document.querySelectorAll('[data-add-type]');

  if (quickMenuToggle && quickMenu) {
    quickMenuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      quickMenu.classList.toggle('hidden');
    });
  }

  quickItems.forEach((item) => {
    item.addEventListener('click', () => {
      const type = item.dataset.addType;
      openEntryModal(type);
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu-wrap') && quickMenu) {
      quickMenu.classList.add('hidden');
    }
  });
}

function setupEntryModal() {
  const modal = document.getElementById('addEntryModal');
  const closeButtons = modal ? modal.querySelectorAll('.add-modal-close') : [];
  const form = document.getElementById('entryForm');

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeEntryModal);
  });

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeEntryModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', handleEntryForm);
  }
}

function initializePage() {
  loadEntries();
  loadSettings();
  applySettings();
  syncCustomizationControls();
  setActiveNav();
  renderYearView();
  renderMonthView();
  renderWeekView();
  renderDayView();
  setupSearch();
  attachQuickMenu();
  setupEntryModal();
  setupCustomization();
}

window.openDay = openDay;
window.openMonth = openMonth;
window.openEntryModal = openEntryModal;
window.closeEntryModal = closeEntryModal;
window.editEntry = editEntry;
window.deleteEntry = deleteEntry;
window.addEventListener('DOMContentLoaded', initializePage);
