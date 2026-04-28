const calendarGrid = document.getElementById('calendarGrid');
const addMenuToggle = document.getElementById('addMenuToggle');
const quickMenu = document.getElementById('quickMenu');
const customizeToggle = document.getElementById('customizeToggle');
const customizePanel = document.getElementById('customizePanel');
const calendarFooter = document.getElementById('calendarFooter');
const discardBtn = document.getElementById('discardBtn');
const saveBtn = document.getElementById('saveBtn');
const appShell = document.getElementById('appShell');
const calendarCard = document.getElementById('calendarCard');
const previewSwatch = document.getElementById('previewSwatch');

const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const cardBorderPicker = document.getElementById('cardBorderPicker');
const buttonColorPicker = document.getElementById('buttonColorPicker');
const backgroundImageUpload = document.getElementById('backgroundImageUpload');
const revertBtn = document.getElementById('revertBtn');

const backgroundColorValue = document.getElementById('backgroundColorValue');
const cardBorderValue = document.getElementById('cardBorderValue');
const buttonColorValue = document.getElementById('buttonColorValue');

const monthData = [
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5, deco: '♡' }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
  { day: 15 }, { day: 16 }, { day: 17 }, { day: 18, deco: '♡' }, { day: 19 }, { day: 20 }, { day: 21 },
  { day: 22, deco: '♡' }, { day: 23 }, { day: 24, deco: '❥', small: true }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }
];

const defaultSettings = {
  appBackground: '#efbfd2',
  cardBorder: '#e7b5ca',
  buttonSurface: '#ffffff',
  backgroundImage: ''
};

let currentSettings = { ...defaultSettings };
let pendingSettings = { ...defaultSettings };
let hasUnsavedChanges = false;

function loadSavedSettings() {
  try {
    const saved = localStorage.getItem('monthCustomizationSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      currentSettings = { ...defaultSettings, ...parsed };
      pendingSettings = { ...currentSettings };
    }
  } catch (error) {
    console.warn('Failed to load saved customization:', error);
  }
}

function saveSettingsToStorage(settings) {
  try {
    localStorage.setItem('monthCustomizationSettings', JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to persist customization:', error);
  }
}

function clearSavedSettings() {
  try {
    localStorage.removeItem('monthCustomizationSettings');
  } catch (error) {
    console.warn('Failed to clear saved customization:', error);
  }
}

function buildCalendar() {
  if (!calendarGrid) return;

  monthData.forEach((item) => {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';

    const number = document.createElement('span');
    number.className = 'cell-number';
    number.textContent = item.day;
    cell.appendChild(number);

    if (item.deco) {
      const decoration = document.createElement('span');
      decoration.className = item.small ? 'cell-decoration small' : 'cell-decoration';
      decoration.textContent = item.deco;
      cell.appendChild(decoration);
    }

    calendarGrid.appendChild(cell);
  });
}

function setPreviewValues() {
  backgroundColorValue.textContent = pendingSettings.appBackground;
  cardBorderValue.textContent = pendingSettings.cardBorder;
  buttonColorValue.textContent = pendingSettings.buttonSurface;
}

function applySettings(settings) {
  document.documentElement.style.setProperty('--app-background', settings.appBackground);
  document.documentElement.style.setProperty('--card-border', settings.cardBorder);
  document.documentElement.style.setProperty('--button-surface', settings.buttonSurface);

  if (settings.backgroundImage) {
    appShell.style.background = `linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.06)), url(${settings.backgroundImage}) center/cover no-repeat`;
  } else {
    appShell.style.background = '';
  }

  previewSwatch.style.background = settings.backgroundImage
    ? `url(${settings.backgroundImage}) center/cover no-repeat`
    : `linear-gradient(145deg, ${settings.appBackground}, #ffffff)`;
}

function syncControls() {
  backgroundColorPicker.value = pendingSettings.appBackground;
  cardBorderPicker.value = pendingSettings.cardBorder;
  buttonColorPicker.value = pendingSettings.buttonSurface;
  setPreviewValues();
}

function markUnsaved() {
  hasUnsavedChanges = true;
  calendarFooter.classList.remove('hidden');
}

function toggleQuickMenu() {
  quickMenu.classList.toggle('hidden');
  addMenuToggle.setAttribute('aria-expanded', String(!quickMenu.classList.contains('hidden')));
}

function toggleCustomizePanel() {
  customizePanel.classList.toggle('hidden');
}

function saveCustomization() {
  currentSettings = { ...pendingSettings };
  saveSettingsToStorage(currentSettings);
  applySettings(currentSettings);
  hasUnsavedChanges = false;
  calendarFooter.classList.add('hidden');
}

function discardCustomization() {
  pendingSettings = { ...currentSettings };
  syncControls();
  applySettings(currentSettings);
  hasUnsavedChanges = false;
  calendarFooter.classList.add('hidden');
}

function revertCustomization() {
  currentSettings = { ...defaultSettings };
  pendingSettings = { ...defaultSettings };
  clearSavedSettings();
  syncControls();
  applySettings(currentSettings);
  hasUnsavedChanges = false;
  calendarFooter.classList.add('hidden');
}

addMenuToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleQuickMenu();
});

customizeToggle?.addEventListener('click', () => {
  toggleCustomizePanel();
});

saveBtn?.addEventListener('click', saveCustomization);
discardBtn?.addEventListener('click', discardCustomization);
revertBtn?.addEventListener('click', revertCustomization);

backgroundColorPicker?.addEventListener('input', (event) => {
  pendingSettings.appBackground = event.target.value;
  applySettings(pendingSettings);
  setPreviewValues();
  markUnsaved();
});

cardBorderPicker?.addEventListener('input', (event) => {
  pendingSettings.cardBorder = event.target.value;
  applySettings(pendingSettings);
  setPreviewValues();
  markUnsaved();
});

buttonColorPicker?.addEventListener('input', (event) => {
  pendingSettings.buttonSurface = event.target.value;
  applySettings(pendingSettings);
  setPreviewValues();
  markUnsaved();
});

backgroundImageUpload?.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    pendingSettings.backgroundImage = loadEvent.target?.result || '';
    applySettings(pendingSettings);
    markUnsaved();
  };
  reader.readAsDataURL(file);
});

document.addEventListener('click', (event) => {
  if (!quickMenu.contains(event.target) && !addMenuToggle.contains(event.target)) {
    quickMenu.classList.add('hidden');
    addMenuToggle.setAttribute('aria-expanded', 'false');
  }
});

loadSavedSettings();
buildCalendar();
applySettings(currentSettings);
syncControls();
