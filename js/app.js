const STORAGE_KEY = 'bookedBusyEntries';
const SETTINGS_KEY = 'bookedBusySettings';
const THEMES_KEY = 'bookedBusyThemes';
const CURRENT_USER_KEY = 'bookedBusyCurrentUser';
const CALENDARS_KEY = 'bookedBusyCalendars';
const COLLABORATORS_KEY = 'bookedBusyCollaborators';
const DEFAULT_MONTH = '2026-04';
const DEFAULT_WEEK_START = '2026-04-27';
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
    buttonSurface: '#2d1f35',
    textColor: '#b8a0b8',
    accentColor: '#5a4565'
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
  // U.S. Holidays - 2026
  { id: 'h1', type: 'holiday', title: 'New Year\'s Day', date: '2026-01-01', time: 'All Day', priority: 'low', details: 'Federal holiday celebrating the new year.', isImportant: true },
  { id: 'h2', type: 'holiday', title: 'Martin Luther King Jr. Day', date: '2026-01-19', time: 'All Day', priority: 'low', details: 'Federal holiday honoring Dr. MLK Jr.', isImportant: true },
  { id: 'h3', type: 'holiday', title: 'Valentine\'s Day', date: '2026-02-14', time: 'All Day', priority: 'low', details: 'Day to celebrate love and friendship.', isImportant: false },
  { id: 'h4', type: 'holiday', title: 'Presidents\' Day', date: '2026-02-16', time: 'All Day', priority: 'low', details: 'Federal holiday honoring US Presidents.', isImportant: true },
  { id: 'h5', type: 'holiday', title: 'Memorial Day', date: '2026-05-25', time: 'All Day', priority: 'low', details: 'Federal holiday honoring fallen soldiers.', isImportant: true },
  { id: 'h6', type: 'holiday', title: 'Independence Day', date: '2026-07-04', time: 'All Day', priority: 'low', details: 'Federal holiday celebrating American independence.', isImportant: true },
  { id: 'h7', type: 'holiday', title: 'Labor Day', date: '2026-09-07', time: 'All Day', priority: 'low', details: 'Federal holiday celebrating workers.', isImportant: true },
  { id: 'h8', type: 'holiday', title: 'Halloween', date: '2026-10-31', time: 'All Day', priority: 'low', details: 'Day of costumes and celebrations.', isImportant: false },
  { id: 'h9', type: 'holiday', title: 'Veterans Day', date: '2026-11-11', time: 'All Day', priority: 'low', details: 'Federal holiday honoring military veterans.', isImportant: true },
  { id: 'h10', type: 'holiday', title: 'Thanksgiving Day', date: '2026-11-26', time: 'All Day', priority: 'low', details: 'Federal holiday for giving thanks.', isImportant: true },
  { id: 'h11', type: 'holiday', title: 'Christmas Day', date: '2026-12-25', time: 'All Day', priority: 'low', details: 'Federal holiday celebrating Christmas.', isImportant: true }
];

const defaultSettings = {
  appBackground: '#efbfd2',
  appBackground2: '#f4d7e5',
  cardBorder: '#e7b5ca',
  cardBorder2: '#e8c5d4',
  buttonSurface: '#ffffff',
  accentColor: '#f8d1e0',
  textColor: '#2e2430',
  calendarBg: '#ffffff',
  backgroundImage: '',
  theme: 'default',
  selectedCalendar: null,
  holidaySettings: {
    federal: true,
    observances: true,
    international: false,
    religious: false,
    academic: false,
    business: false
  }
};

// Comprehensive Holiday Framework
const HOLIDAY_DEFINITIONS = {
  federal: {
    label: '🇺🇸 U.S. Federal Holidays',
    color: '#ff6b6b',
    holidays: [
      { name: 'New Year\'s Day', month: 1, date: 1 },
      { name: 'Martin Luther King Jr. Day', month: 1, date: 19 },
      { name: 'Presidents\' Day', month: 2, date: 16 },
      { name: 'Memorial Day', month: 5, date: 25 },
      { name: 'Juneteenth', month: 6, date: 19 },
      { name: 'Independence Day', month: 7, date: 4 },
      { name: 'Labor Day', month: 9, date: 7 },
      { name: 'Columbus Day', month: 10, date: 12 },
      { name: 'Veterans Day', month: 11, date: 11 },
      { name: 'Thanksgiving Day', month: 11, date: 26 },
      { name: 'Christmas Day', month: 12, date: 25 }
    ]
  },
  observances: {
    label: '📅 Major U.S. Observances',
    color: '#ffd93d',
    holidays: [
      { name: 'Valentine\'s Day', month: 2, date: 14 },
      { name: 'Mother\'s Day', month: 5, date: 9 },
      { name: 'Father\'s Day', month: 6, date: 20 },
      { name: 'Halloween', month: 10, date: 31 },
      { name: 'Black Friday', month: 11, date: 27 }
    ]
  },
  international: {
    label: '🌍 International Holidays',
    color: '#74c0fc',
    holidays: [
      { name: 'International Women\'s Day', month: 3, date: 8 },
      { name: 'Earth Day', month: 4, date: 22 },
      { name: 'World Health Day', month: 4, date: 7 },
      { name: 'International Day of Peace', month: 9, date: 21 },
      { name: 'World Teachers\' Day', month: 10, date: 5 }
    ]
  },
  religious: {
    label: '✝️ Religious Holidays',
    color: '#cc5de8',
    holidays: [
      { name: 'Easter', month: 4, date: 5, note: 'varies by year' },
      { name: 'Ramadan', month: 3, date: 1, note: 'dates vary' },
      { name: 'Eid al-Fitr', month: 4, date: 10, note: 'dates vary' },
      { name: 'Eid al-Adha', month: 6, date: 16, note: 'dates vary' },
      { name: 'Hanukkah', month: 12, date: 25, note: 'dates vary' },
      { name: 'Diwali', month: 11, date: 1, note: 'dates vary' },
      { name: 'Lunar New Year', month: 2, date: 17, note: 'dates vary' }
    ]
  },
  academic: {
    label: '🎓 Academic Calendar',
    color: '#51cf66',
    holidays: [
      { name: 'Spring Semester Start', month: 1, date: 15 },
      { name: 'Spring Break', month: 3, date: 15 },
      { name: 'Spring Break End', month: 3, date: 22 },
      { name: 'Final Exams Begin', month: 5, date: 1 },
      { name: 'Final Exams End', month: 5, date: 15 },
      { name: 'Graduation Day', month: 5, date: 23 },
      { name: 'Fall Semester Start', month: 8, date: 25 },
      { name: 'Fall Break', month: 10, date: 12 }
    ]
  },
  business: {
    label: '💼 Work/Business Dates',
    color: '#a78bfa',
    holidays: [
      { name: 'Q1 Financial Deadline', month: 3, date: 31 },
      { name: 'Tax Day', month: 4, date: 15 },
      { name: 'Q2 Financial Deadline', month: 6, date: 30 },
      { name: 'Mid-Year Review', month: 6, date: 30 },
      { name: 'Q3 Financial Deadline', month: 9, date: 30 },
      { name: 'Q4 Financial Deadline', month: 12, date: 31 },
      { name: 'Annual Planning Meeting', month: 12, date: 1 }
    ]
  }
};

// Calendar colors for multi-calendar support
const CALENDAR_COLORS = [
  '#ff6b6b', '#ff8787', '#ffa8a8', '#ffc0cb',
  '#ffd93d', '#ffe066', '#ffeb3b', '#fff176',
  '#6bcf7f', '#8ce99a', '#a9e34b', '#c0eb75',
  '#74c0fc', '#91d5ff', '#a5d8ff', '#b3e5fc',
  '#b197fc', '#d0bfff', '#da77f2', '#f06595',
  '#f783ac', '#f8b195', '#ffb3ba', '#ffdfba'
];

let entries = [];
let settings = {};
let calendars = [];
let currentTheme = 'default';
let priorityFilter = null;
let currentCalendarId = null;
let navigationHistory = []; // Track navigation for month->week->day toggle

function parseQuery(name) {
  const param = new URLSearchParams(window.location.search).get(name);
  // Handle missing date parameter for day view
  if (name === 'date' && !param) {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }
  return param;
}

// ===== MULTI-CALENDAR SYSTEM =====
function loadCalendars() {
  const raw = localStorage.getItem(CALENDARS_KEY);
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  
  if (!raw) {
    // Create default calendars for new user
    calendars = [
      {
        id: 'cal_personal_' + Date.now(),
        name: 'Personal',
        owner: currentUser,
        color: CALENDAR_COLORS[0],
        isShared: false,
        collaborators: [],
        permissions: 'owner',
        isVisible: true
      },
      {
        id: 'cal_work_' + Date.now(),
        name: 'Work',
        owner: currentUser,
        color: CALENDAR_COLORS[5],
        isShared: false,
        collaborators: [],
        permissions: 'owner',
        isVisible: true
      }
    ];
    saveCalendars();
    currentCalendarId = calendars[0].id;
    return calendars;
  }

  try {
    calendars = JSON.parse(raw);
    if (calendars.length === 0) {
      calendars = [
        {
          id: 'cal_personal_' + Date.now(),
          name: 'Personal',
          owner: currentUser,
          color: CALENDAR_COLORS[0],
          isShared: false,
          collaborators: [],
          permissions: 'owner',
          isVisible: true
        }
      ];
      saveCalendars();
    }
    if (!currentCalendarId && calendars.length > 0) {
      currentCalendarId = calendars[0].id;
    }
  } catch (error) {
    calendars = [];
    saveCalendars();
  }

  return calendars;
}

function saveCalendars() {
  localStorage.setItem(CALENDARS_KEY, JSON.stringify(calendars));
}

function createCalendar(name, color = null) {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  const newCalendar = {
    id: 'cal_' + Date.now(),
    name: name,
    owner: currentUser,
    color: color || CALENDAR_COLORS[Math.floor(Math.random() * CALENDAR_COLORS.length)],
    isShared: false,
    collaborators: [],
    permissions: 'owner',
    isVisible: true
  };
  calendars.push(newCalendar);
  saveCalendars();
  return newCalendar;
}

function renameCalendar(calendarId, newName) {
  const calendar = calendars.find(cal => cal.id === calendarId);
  if (calendar) {
    calendar.name = newName;
    saveCalendars();
    return true;
  }
  return false;
}

function deleteCalendar(calendarId) {
  const index = calendars.findIndex(cal => cal.id === calendarId);
  if (index !== -1) {
    calendars.splice(index, 1);
    // Remove entries belonging to this calendar
    entries = entries.filter(entry => entry.calendarId !== calendarId);
    saveEntries();
    saveCalendars();
    // Switch to first available calendar
    if (currentCalendarId === calendarId && calendars.length > 0) {
      currentCalendarId = calendars[0].id;
    }
    return true;
  }
  return false;
}

function getCalendarById(calendarId) {
  return calendars.find(cal => cal.id === calendarId);
}

function toggleCalendarVisibility(calendarId) {
  const calendar = getCalendarById(calendarId);
  if (calendar) {
    calendar.isVisible = !calendar.isVisible;
    saveCalendars();
    return calendar.isVisible;
  }
  return false;
}

function updateCalendarColor(calendarId, color) {
  const calendar = getCalendarById(calendarId);
  if (calendar) {
    calendar.color = color;
    saveCalendars();
    return true;
  }
  return false;
}

// ===== COLLABORATOR & INVITATION SYSTEM =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sendCollaboratorInvitation(calendarId, inviteeEmail, senderName = 'A colleague') {
  if (!validateEmail(inviteeEmail)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const calendar = getCalendarById(calendarId);
  if (!calendar) {
    return { success: false, message: 'Calendar not found.' };
  }

  // Check if already a collaborator
  if (calendar.collaborators.some(c => c.email === inviteeEmail)) {
    return { success: false, message: 'This person is already a collaborator.' };
  }

  // Create invitation record
  const invitation = {
    id: 'inv_' + Date.now(),
    calendarId: calendarId,
    calendarName: calendar.name,
    inviteeEmail: inviteeEmail,
    senderEmail: localStorage.getItem(CURRENT_USER_KEY),
    senderName: senderName,
    sentAt: new Date().toISOString(),
    status: 'pending'
  };

  // Add to calendar collaborators
  calendar.collaborators.push({
    email: inviteeEmail,
    role: 'viewer',
    invitedAt: new Date().toISOString(),
    status: 'pending'
  });
  
  saveCalendars();

  // Simulate email sending with console log and user notification
  const emailMessage = generateInvitationEmail(invitation);
  console.log('📧 INVITATION EMAIL SENT:', {
    to: inviteeEmail,
    subject: `You've been invited to join "${calendar.name}" on Booked & Busy`,
    message: emailMessage
  });

  return {
    success: true,
    message: `Invite sent to ${inviteeEmail}`,
    invitation: invitation
  };
}

function generateInvitationEmail(invitation) {
  const { calendarName, inviteeEmail, senderName, senderEmail } = invitation;
  
  return `
    Subject: You've been invited to join "${calendarName}" on Booked & Busy
    
    Dear Friend,
    
    ${senderName} (${senderEmail}) has invited you to collaborate on the "${calendarName}" shared calendar on Booked & Busy.
    
    This is a shared calendar where you and others can view and collaborate on events, tasks, and reminders together.
    
    To accept this invitation and start collaborating, please open Booked & Busy and look for the pending invitation.
    
    Calendar: ${calendarName}
    Invited by: ${senderName}
    
    Happy planning!
    
    — The Booked & Busy Team
  `;
}

function getCollaboratorsForCalendar(calendarId) {
  const calendar = getCalendarById(calendarId);
  return calendar ? calendar.collaborators : [];
}

function removeCollaborator(calendarId, email) {
  const calendar = getCalendarById(calendarId);
  if (calendar) {
    calendar.collaborators = calendar.collaborators.filter(c => c.email !== email);
    saveCalendars();
    return true;
  }
  return false;
}

// ===== HOLIDAY MANAGEMENT =====
function generateHolidaysForYear(year = 2026) {
  const holidays = [];
  const enabledCategories = settings.holidaySettings || defaultSettings.holidaySettings;
  
  const categoryKeys = Object.keys(HOLIDAY_DEFINITIONS);
  
  for (const category of categoryKeys) {
    // Skip if category is disabled
    if (!enabledCategories[category]) continue;
    
    const categoryDef = HOLIDAY_DEFINITIONS[category];
    const categoryColor = categoryDef.color;
    
    categoryDef.holidays.forEach(holiday => {
      const dateStr = `${year}-${String(holiday.month).padStart(2, '0')}-${String(holiday.date).padStart(2, '0')}`;
      
      const holidayEntry = {
        id: `hol_${category}_${holiday.name.replace(/\s+/g, '_')}_${year}`,
        type: 'holiday',
        title: holiday.name,
        date: dateStr,
        time: 'All Day',
        priority: 'low',
        details: holiday.note ? `Holiday (${holiday.note})` : 'Holiday',
        category: category,
        categoryLabel: categoryDef.label,
        categoryColor: categoryColor,
        isHoliday: true,
        calendarId: '__system__holidays__'
      };
      
      holidays.push(holidayEntry);
    });
  }
  
  return holidays;
}

function loadHolidaysForYear(year = 2026) {
  // Check if holidays already exist for this year
  const existingHolidays = entries.filter(e => e.type === 'holiday' && e.date.startsWith(String(year)));
  
  if (existingHolidays.length === 0) {
    const newHolidays = generateHolidaysForYear(year);
    entries.push(...newHolidays);
    saveEntries();
  }
}

function toggleHolidayCategory(category) {
  if (!settings.holidaySettings) {
    settings.holidaySettings = { ...defaultSettings.holidaySettings };
  }
  
  settings.holidaySettings[category] = !settings.holidaySettings[category];
  saveSettings();
  
  // Regenerate holidays and refresh view
  loadHolidaysForYear(2026);
  renderYearView();
  renderMonthView();
  renderWeekView();
  renderDayView();
  
  return settings.holidaySettings[category];
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

function applyTheme(themeName) {
  currentTheme = themeName;
  const theme = THEMES[themeName] || THEMES.default;
  
  settings.appBackground = theme.appBackground;
  settings.cardBorder = theme.cardBorder;
  settings.buttonSurface = theme.buttonSurface;
  settings.textColor = theme.textColor;
  settings.theme = themeName;
  
  applySettings();
  saveSettings();
}

function formatMonth(monthIndex) {
  return MONTH_NAMES[monthIndex - 1] || '';
}

function getEntriesForDate(dateString) {
  let filtered = entries.filter((entry) => {
    // Always show holidays
    if (entry.type === 'holiday') return true;
    
    // Filter by visible calendars
    const entryCalendarId = entry.calendarId;
    if (!entryCalendarId) return true; // Legacy entries without calendarId
    
    const calendar = getCalendarById(entryCalendarId);
    return calendar && calendar.isVisible;
  });
  
  filtered = filtered.filter(e => e.date === dateString);
  
  if (priorityFilter) {
    filtered = filtered.filter(entry => entry.priority === priorityFilter);
  }
  return filtered;
}

function getEntriesForMonth(monthKey) {
  let filtered = entries.filter((entry) => {
    // Always show holidays
    if (entry.type === 'holiday') return true;
    
    // Filter by visible calendars
    const entryCalendarId = entry.calendarId;
    if (!entryCalendarId) return true; // Legacy entries without calendarId
    
    const calendar = getCalendarById(entryCalendarId);
    return calendar && calendar.isVisible;
  });
  
  filtered = filtered.filter(e => e.date.startsWith(monthKey));
  
  if (priorityFilter) {
    filtered = filtered.filter(entry => entry.priority === priorityFilter);
  }
  return filtered;
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

function getPriorityColor(priority) {
  switch(priority) {
    case 'high': return '#ff6b6b';
    case 'medium': return '#ffd93d';
    case 'low': return '#6bcf7f';
    default: return '#a95c8f';
  }
}

function applySettings() {
  document.documentElement.style.setProperty('--app-background', settings.appBackground);
  document.documentElement.style.setProperty('--card-border', settings.cardBorder);
  document.documentElement.style.setProperty('--button-surface', settings.buttonSurface);
  document.documentElement.style.setProperty('--text-main', settings.textColor);

  if (settings.backgroundImage) {
    document.body.style.background = `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url(${settings.backgroundImage}) center/cover fixed no-repeat`;
  } else {
    document.body.style.background = `radial-gradient(circle at top left, rgba(255, 255, 255, 0.78), transparent 28%), linear-gradient(160deg, ${settings.appBackground} 0%, ${settings.appBackground} 48%, ${settings.appBackground2 || settings.appBackground} 100%)`;
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
    button.style.color = settings.textColor;
  });
}

function syncCustomizationControls() {
  const backgroundInput = document.getElementById('backgroundColorPicker');
  const borderInput = document.getElementById('cardBorderPicker');
  const buttonInput = document.getElementById('buttonColorPicker');
  const imageInput = document.getElementById('backgroundImageUpload');
  const previewSwatch = document.getElementById('previewSwatch');
  const themeButtons = document.querySelectorAll('[data-theme]');

  if (backgroundInput) backgroundInput.value = settings.appBackground;
  if (borderInput) borderInput.value = settings.cardBorder;
  if (buttonInput) buttonInput.value = settings.buttonSurface;
  if (previewSwatch) {
    previewSwatch.style.background = settings.backgroundImage
      ? `url(${settings.backgroundImage}) center/cover no-repeat`
      : `linear-gradient(145deg, ${settings.appBackground}, ${settings.appBackground2 || '#ffffff'})`;
  }
  if (imageInput) imageInput.value = '';
  
  // Update theme buttons
  themeButtons.forEach(btn => {
    const themeName = btn.dataset.theme;
    if (themeName === currentTheme) {
      btn.classList.add('active-theme');
    } else {
      btn.classList.remove('active-theme');
    }
  });
}

function openMonth(monthKey) {
  navigationHistory = ['month']; // Reset history when opening monthly view
  const destination = `p2month.html?month=${monthKey}`;
  window.location.href = destination;
}

function openDay(dateString, fromMonth = false) {
  // Toggle between month -> week -> day on repeated clicks
  const currentPage = document.querySelector('[data-page]')?.dataset.page;
  
  if (fromMonth) {
    // First click from month view: go directly to day view to show events
    navigationHistory = ['month', 'day'];
    window.location.href = `p4day.html?date=${dateString}`;
  } else if (currentPage === 'month' && navigationHistory[navigationHistory.length - 1] === 'month') {
    // Already on month, first click: go to week
    navigationHistory.push('week');
    window.location.href = `p3week.html?week=${dateString}`;
  } else if (currentPage === 'week') {
    // On week view: toggle to day
    navigationHistory.push('day');
    window.location.href = `p4day.html?date=${dateString}`;
  } else {
    // Otherwise just go to day
    window.location.href = `p4day.html?date=${dateString}`;
  }
}

function toggleCalendarMenu() {
  const btn = document.getElementById('calendarSwitcherToggle');
  const panel = document.getElementById('calendarSwitcherPanel');
  if (btn && panel) {
    panel.classList.toggle('hidden');
    btn.classList.toggle('active');
  }
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
    
    // Separate holidays from other entries
    const holidays = dayEntries.filter(e => e.type === 'holiday');
    const otherEntries = dayEntries.filter(e => e.type !== 'holiday');
    
    const cell = document.createElement('button');
    cell.className = `calendar-cell day-button${isToday ? ' current-day' : ''}`;
    cell.type = 'button';
    cell.onclick = () => openDay(dateString, true); // Pass true to indicate from month view
    
    let badgesHTML = '';
    
    // Show holidays first with their category colors
    holidays.forEach(holiday => {
      const color = holiday.categoryColor || '#a95c8f';
      badgesHTML += `<span class="badge holiday" style="border-left: 3px solid ${color}; background: ${color}20;" title="${holiday.categoryLabel}">${holiday.title}</span>`;
    });
    
    // Show other entries
    otherEntries.forEach(entry => {
      const priorityColor = getPriorityColor(entry.priority);
      badgesHTML += `<span class="badge ${entry.type}" style="border-left: 3px solid ${priorityColor};">${entry.type}</span>`;
    });
    
    cell.innerHTML = `
      <span class="cell-number">${day}${isToday ? '<span class="today-heart">♥</span>' : ''}</span>
      <div class="day-badges">
        ${badgesHTML}
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
          ? entriesForDay.map((entry) => {
              const priorityColor = getPriorityColor(entry.priority);
              return `<div class="week-event ${entry.type}" style="border-left: 4px solid ${priorityColor};">${entry.title}</div>`;
            }).join('')
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
    : `linear-gradient(145deg, ${settings.appBackground}, ${settings.appBackground2 || '#ffffff'})`;
}

function setupThemeButtons() {
  const themeButtons = document.querySelectorAll('[data-theme]');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeName = btn.dataset.theme;
      applyTheme(themeName);
      syncCustomizationControls();
    });
  });
}

function setupPriorityFilter() {
  const filterButtons = document.querySelectorAll('[data-priority-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const priority = btn.dataset.priorityFilter;
      priorityFilter = priorityFilter === priority ? null : priority;
      
      // Update button states
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      if (priorityFilter) {
        document.querySelector(`[data-priority-filter="${priorityFilter}"]`)?.classList.add('active-filter');
      }
      
      // Re-render views
      renderMonthView();
      renderWeekView();
      renderDayView();
    });
  });
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
  
  setupThemeButtons();
}

function renderDayView() {
  const eventContainer = document.getElementById('dayEventList');
  if (!eventContainer) return;

  const rawDate = parseQuery('date') || `${DEFAULT_MONTH}-27`;
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
    .map((entry) => {
      const priorityColor = getPriorityColor(entry.priority);
      return `
        <div class="event-card" style="border-left: 4px solid ${priorityColor};">
          <div class="event-card-top">
            <div>
              <h3>${entry.title}</h3>
              <span>${entry.type.toUpperCase()} • ${entry.time} • <span class="priority-badge" style="color: ${priorityColor};">${entry.priority.toUpperCase()}</span></span>
            </div>
            <div class="event-card-actions">
              <button class="icon-button small" type="button" onclick="editEntry('${entry.id}')">Edit</button>
              <button class="icon-button small danger" type="button" onclick="deleteEntry('${entry.id}')">Delete</button>
            </div>
          </div>
          <p>${entry.details}</p>
        </div>
      `;
    })
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
  const titleLabel = document.querySelector('label[for="entryTitle"]');
  const dateInput = document.getElementById('entryDate');
  const timeInput = document.getElementById('entryTime');
  const detailsInput = document.getElementById('entryDetails');
  const priorityInput = document.getElementById('entryPriority');
  const emailInput = document.getElementById('entryEmail');
  const emailLabel = document.querySelector('label[for="entryEmail"]');
  const allDayCheckbox = document.getElementById('allDayCheckbox');
  const calendarSelect = document.getElementById('entryCalendar');
  
  // Show/hide fields based on type
  const dateTimeGroup = document.getElementById('dateTimeGroup');
  const emailGroup = document.getElementById('emailGroup');
  const priorityGroup = document.getElementById('priorityGroup');
  const calendarSelectGroup = document.getElementById('calendarSelectGroup');
  const detailsGroup = document.querySelector('.form-group:has(textarea#entryDetails)');
  
  // Populate calendar selector
  if (calendarSelect) {
    calendarSelect.innerHTML = '<option value="">Select a calendar...</option>';
    calendars.forEach(cal => {
      const option = document.createElement('option');
      option.value = cal.id;
      option.textContent = cal.name;
      if (cal.id === currentCalendarId) {
        option.selected = true;
      }
      calendarSelect.appendChild(option);
    });
  }

  if (type === 'collaborator') {
    if (titleLabel) titleLabel.textContent = 'Calendar Name (optional)';
    if (emailLabel) emailLabel.textContent = 'Collaborator Email';
    if (dateTimeGroup) dateTimeGroup.style.display = 'none';
    if (emailGroup) emailGroup.style.display = 'block';
    if (priorityGroup) priorityGroup.style.display = 'none';
    if (detailsGroup) detailsGroup.style.display = 'none';
    if (calendarSelectGroup) calendarSelectGroup.style.display = 'none';
  } else {
    if (titleLabel) titleLabel.textContent = 'Title';
    if (emailLabel) emailLabel.textContent = 'Email Address';
    if (dateTimeGroup) dateTimeGroup.style.display = 'block';
    if (emailGroup) emailGroup.style.display = 'none';
    if (priorityGroup) priorityGroup.style.display = 'block';
    if (detailsGroup) detailsGroup.style.display = 'block';
    if (calendarSelectGroup) calendarSelectGroup.style.display = 'block';
  }

  if (typeInput) typeInput.value = type;
  if (entry) {
    if (idInput) idInput.value = entry.id;
    if (titleInput) titleInput.value = entry.title;
    if (dateInput && entry.date) dateInput.value = entry.date;
    if (timeInput && entry.time) timeInput.value = entry.time;
    if (detailsInput) detailsInput.value = entry.details;
    if (priorityInput && entry.priority) priorityInput.value = entry.priority;
    if (calendarSelect && entry.calendarId) calendarSelect.value = entry.calendarId;
    if (allDayCheckbox) allDayCheckbox.checked = entry.time === 'All Day';
  } else {
    // Set default date to today
    if (dateInput) {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      dateInput.value = dateString;
    }
    // Set default time to 10:00
    if (timeInput) {
      timeInput.value = '10:00';
    }
    if (idInput) idInput.value = '';
    if (titleInput) {
      if (type === 'collaborator' && currentCalendarId) {
        const cal = getCalendarById(currentCalendarId);
        titleInput.value = cal ? cal.name : '';
      } else {
        titleInput.value = '';
      }
    }
    // Check if opening for a specific date from query parameter
    const queryDate = parseQuery('date');
    if (queryDate && dateInput) {
      dateInput.value = queryDate;
    }
    if (detailsInput) detailsInput.value = '';
    if (priorityInput) priorityInput.value = 'medium';
    if (emailInput) emailInput.value = '';
    if (allDayCheckbox) allDayCheckbox.checked = false;
  }

  // Add all-day checkbox toggle handler
  if (allDayCheckbox && timeInput) {
    allDayCheckbox.addEventListener('change', function() {
      timeInput.disabled = this.checked;
      if (this.checked) {
        timeInput.value = '';
      }
    }, { once: true });
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
  const dateInput = document.getElementById('entryDate');
  const timeInput = document.getElementById('entryTime');
  const date = dateInput?.value;
  let time = timeInput?.value;
  const details = document.getElementById('entryDetails')?.value.trim();
  const priority = document.getElementById('entryPriority')?.value || 'medium';
  const allDayCheckbox = document.getElementById('allDayCheckbox');
  const calendarSelect = document.getElementById('entryCalendar');

  if (type === 'collaborator') {
    const email = document.getElementById('entryEmail')?.value.trim();
    
    // Validation
    if (!email) {
      showNotification('Please enter an email address', 'error');
      return;
    }
    
    // Get calendar name from title field or use current calendar
    const calendarName = title || (currentCalendarId ? getCalendarById(currentCalendarId)?.name : 'Shared Calendar');
    const invitingCalendar = currentCalendarId || calendars[0]?.id;
    
    // Send invitation
    const result = sendCollaboratorInvitation(invitingCalendar, email, localStorage.getItem(CURRENT_USER_KEY));
    
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
      return;
    }
  } else {
    // Handle all-day checkbox
    if (allDayCheckbox && allDayCheckbox.checked) {
      time = 'All Day';
    }
    
    if (!title || !date || (!time && !(allDayCheckbox?.checked))) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Get calendar ID from selector or use current
    let calendarId = calendarSelect?.value || currentCalendarId || calendars[0]?.id || 'personal';

    if (entryId) {
      const existingIndex = entries.findIndex((item) => item.id === entryId);
      if (existingIndex !== -1) {
        entries[existingIndex] = {
          ...entries[existingIndex],
          type,
          title,
          date,
          time,
          priority,
          details: details || 'No details provided.',
          calendarId: calendarId
        };
      }
    } else {
      const newEntry = {
        id: String(Date.now()),
        type: type,
        title,
        date,
        time,
        priority,
        details: details || 'No details provided.',
        calendarId: calendarId
      };
      entries.push(newEntry);
    }

    saveEntries();
    showNotification(`${type} saved successfully!`, 'success');
  }

  closeEntryModal();
  renderYearView();
  renderMonthView();
  renderWeekView();
  renderDayView();
}

function showNotification(message, type = 'info') {
  // Create a temporary notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10000;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
    ${type === 'success' ? 'background: #51cf66; color: #fff;' : ''}
    ${type === 'error' ? 'background: #ff6b6b; color: #fff;' : ''}
    ${type === 'info' ? 'background: #339af0; color: #fff;' : ''}
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
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
  renderWeekView();
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
              (entry) => {
                const priorityColor = getPriorityColor(entry.priority);
                return `
                <div class="event-card search-result" data-entry-id="${entry.id}" data-entry-date="${entry.date}" style="border-left: 4px solid ${priorityColor}; cursor: pointer;">
                  <h3>${entry.title}</h3>
                  <p>${entry.details}</p>
                  <span>${entry.type} • ${entry.date} • ${entry.time}</span>
                </div>
              `;
              }
            )
            .join('')
        : '<p class="search-placeholder">No results found.</p>'
      : '<p class="search-placeholder">Enter a search term to find events</p>';
    
    // Re-attach event listeners to search results
    attachSearchResultHandlers();
  });
}

function attachSearchResultHandlers() {
  const searchResults = document.querySelectorAll('.event-card.search-result');
  searchResults.forEach((card) => {
    card.addEventListener('click', () => {
      const entryDate = card.dataset.entryDate;
      if (entryDate) {
        // Close search modal
        const searchModal = document.getElementById('searchModal');
        if (searchModal) searchModal.classList.remove('active');
        
        // Navigate to day view with the entry date
        const dayPage = new URL(window.location).pathname.endsWith('p1year.html') ? 'p4day.html' : 
                        new URL(window.location).pathname.endsWith('p2month.html') ? 'p4day.html' :
                        new URL(window.location).pathname.endsWith('p3week.html') ? 'p4day.html' : 'p4day.html';
        window.location.href = `${dayPage}?date=${entryDate}`;
      }
    });
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
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

function checkAuth() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUser) {
    window.location.href = 'index.html';
  }
}

function setupMonthDropdown() {
  const monthSelector = document.getElementById('monthSelector');
  const monthDropdown = document.getElementById('monthDropdown');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  if (!monthSelector || !monthDropdown) return;
  
  monthSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    monthDropdown.classList.toggle('hidden');
  });
  
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const monthKey = item.dataset.month;
      window.location.href = `p2month.html?month=${monthKey}`;
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.month-display') && monthDropdown) {
      monthDropdown.classList.add('hidden');
    }
  });
}

function setupHolidayToggles() {
  const holidayToggles = document.querySelectorAll('.holiday-toggle');
  
  // Set initial state from settings - ensure federal and observances are checked by default
  if (settings.holidaySettings) {
    holidayToggles.forEach(toggle => {
      const category = toggle.dataset.category;
      if (settings.holidaySettings.hasOwnProperty(category)) {
        toggle.checked = settings.holidaySettings[category];
      }
    });
  } else {
    // Ensure defaults are applied
    settings.holidaySettings = { ...defaultSettings.holidaySettings };
    holidayToggles.forEach(toggle => {
      const category = toggle.dataset.category;
      toggle.checked = settings.holidaySettings[category];
    });
  }
  
  holidayToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      const category = toggle.dataset.category;
      settings.holidaySettings = settings.holidaySettings || { ...defaultSettings.holidaySettings };
      settings.holidaySettings[category] = toggle.checked;
      saveSettings();
      
      // Regenerate holidays based on new settings
      entries = entries.filter(e => e.type !== 'holiday');
      loadHolidaysForYear(2026);
      
      // Re-render all views
      renderYearView();
      renderMonthView();
      renderWeekView();
      renderDayView();
    });
  });
}

function setupCalendarSwitcher() {
  const switcherBtn = document.getElementById('calendarSwitcherToggle');
  const switcherPanel = document.getElementById('calendarSwitcherPanel');
  const addCalendarBtn = document.getElementById('addCalendarBtn');
  
  if (switcherBtn) {
    switcherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switcherPanel?.classList.toggle('hidden');
    });
  }
  
  if (switcherPanel) {
    switcherPanel.addEventListener('click', (e) => e.stopPropagation());
  }
  
  if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
      const input = document.getElementById('newCalendarName');
      const btn = document.getElementById('confirmCalendarBtn');
      if (input) input.classList.remove('hidden');
      if (btn) {
        btn.classList.remove('hidden');
        btn.onclick = () => {
          const name = input?.value.trim();
          if (name) {
            createCalendar(name);
            if (input) input.value = '';
            if (input) input.classList.add('hidden');
            if (btn) btn.classList.add('hidden');
            updateCalendarList();
          }
        };
      }
    });
  }
  
  document.addEventListener('click', (e) => {
    if (switcherPanel && !e.target.closest('#calendarSwitcherToggle') && !e.target.closest('#calendarSwitcherPanel')) {
      switcherPanel.classList.add('hidden');
    }
  });
  
  updateCalendarList();
}

function updateCalendarList() {
  const calendarList = document.getElementById('calendarList');
  if (!calendarList) return;
  
  calendarList.innerHTML = calendars.map(cal => `
    <div class="calendar-item" style="border-left: 4px solid ${cal.color};">
      <div class="calendar-item-content">
        <input type="checkbox" class="calendar-checkbox" ${cal.isVisible ? 'checked' : ''} onchange="toggleCalendarVisibility('${cal.id}'); updateCalendarList();">
        <span class="calendar-name">${cal.name}</span>
        ${cal.permissions === 'owner' ? '<span class="calendar-owner-badge">Owner</span>' : '<span class="calendar-viewer-badge">Viewer</span>'}
      </div>
      <div class="calendar-item-actions">
        ${cal.permissions === 'owner' ? `<button class="calendar-item-btn danger" type="button" onclick="deleteCalendar('${cal.id}'); updateCalendarList();" title="Delete">✕</button>` : ''}
      </div>
    </div>
  `).join('');
}

function initializePage() {
  checkAuth();
  loadCalendars();
  loadEntries();
  loadSettings();
  loadHolidaysForYear(2026);
  currentTheme = settings.theme || 'default';
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
  setupPriorityFilter();
  setupMonthDropdown();
  setupHolidayToggles();
  setupCalendarSwitcher();
}

window.openDay = openDay;
window.openMonth = openMonth;
window.openEntryModal = openEntryModal;
window.closeEntryModal = closeEntryModal;
window.editEntry = editEntry;
window.deleteEntry = deleteEntry;
window.toggleCalendarMenu = toggleCalendarMenu;
window.updateCalendarList = updateCalendarList;
window.toggleCalendarVisibility = toggleCalendarVisibility;
window.deleteCalendar = deleteCalendar;
window.addEventListener('DOMContentLoaded', initializePage);
