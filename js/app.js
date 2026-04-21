// Calendar Application JavaScript
// Authors: Jashea Alexis, Miliani A. Reza, Noa Shellim

// Initialize the calendar on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupEventListeners();
});

/**
 * Initialize the calendar with all months
 */
function initializeCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    monthNames.forEach((month, index) => {
        const monthCard = document.querySelector(`[data-month="${month.toLowerCase()}"]`);
        if (monthCard) {
            populateMonthCard(monthCard, index + 1, 2026);
        }
    });
}

/**
 * Populate a month card with calendar days
 * @param {HTMLElement} card - The month card element
 * @param {number} month - Month number (1-12)
 * @param {number} year - Year
 */
function populateMonthCard(card, month, year) {
    const content = card.querySelector('.month-content');
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Create a mini calendar grid
    const miniCalendar = document.createElement('div');
    miniCalendar.className = 'mini-calendar';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerContainer = document.createElement('div');
    headerContainer.className = 'day-headers';
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        headerContainer.appendChild(header);
    });
    miniCalendar.appendChild(headerContainer);
    
    // Add empty cells for days before the first day of the month
    const daysContainer = document.createElement('div');
    daysContainer.className = 'days-grid';
    
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysContainer.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        dayElement.addEventListener('click', function() {
            handleDayClick(day, month, year);
        });
        daysContainer.appendChild(dayElement);
    }
    
    miniCalendar.appendChild(daysContainer);
    content.appendChild(miniCalendar);
}

/**
 * Handle day click event
 * @param {number} day - Day clicked
 * @param {number} month - Month number
 * @param {number} year - Year
 */
function handleDayClick(day, month, year) {
    console.log(`Clicked: ${year}-${month}-${day}`);
    // This can be extended to navigate to a day view or show event details
}

/**
 * Navigate to a specific month
 * @param {string} monthName - Name of the month
 */
function navigateToMonth(monthName) {
    // This function can be extended to navigate to the month view page
    console.log(`Navigating to ${monthName}`);
    // Example: window.location.href = 'p2month.html?month=' + monthName;
}

/**
 * Setup event listeners for buttons
 */
function setupEventListeners() {
    // Customize button
    const customizeBtn = document.querySelector('.customize-btn');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', function() {
            handleCustomize();
        });
    }
    
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            handleSearch();
        });
    }
    
    // Search modal close button
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', function() {
            closeSearchModal();
        });
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // Close search modal when clicking outside
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Close add modals when clicking outside
    const addTasksModal = document.getElementById('addTasksModal');
    if (addTasksModal) {
        addTasksModal.addEventListener('click', function(e) {
            if (e.target === addTasksModal) {
                closeAddTasksModal();
            }
        });
    }
    
    const addRemindersModal = document.getElementById('addRemindersModal');
    if (addRemindersModal) {
        addRemindersModal.addEventListener('click', function(e) {
            if (e.target === addRemindersModal) {
                closeAddRemindersModal();
            }
        });
    }
    
    const addCollaboratorsModal = document.getElementById('addCollaboratorsModal');
    if (addCollaboratorsModal) {
        addCollaboratorsModal.addEventListener('click', function(e) {
            if (e.target === addCollaboratorsModal) {
                closeAddCollaboratorsModal();
            }
        });
    }
    
    // Add button
    const addBtn = document.getElementById('addBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            handleAdd();
        });
    }
    
    // View selector
    const viewSelector = document.getElementById('viewSelector');
    if (viewSelector) {
        viewSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleViewMenu();
        });
    }
    
    // Close view menu when clicking outside
    document.addEventListener('click', function(e) {
        const viewMenu = document.getElementById('viewMenu');
        const viewSelector = document.getElementById('viewSelector');
        if (viewMenu && viewSelector) {
            if (!viewMenu.contains(e.target) && !viewSelector.contains(e.target)) {
                viewMenu.classList.remove('show');
            }
        }
    });
}

/**
 * Handle customize button click
 */
function handleCustomize() {
    alert('Customize feature - Coming soon!');
    // This can be extended to show a customization modal
}

/**
 * Handle search button click - opens search modal
 */
function handleSearch() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.add('show');
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();
}

/**
 * Close the search modal
 */
function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.remove('show');
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<p class="search-placeholder">Enter a search term to find events</p>';
}

/**
 * Perform search for events
 */
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query.trim()) {
        searchResults.innerHTML = '<p class="search-placeholder">Enter a search term to find events</p>';
        return;
    }
    
    // Example search results (in a real app, this would search stored events)
    const mockEvents = [
        { title: 'Team Meeting', date: 'April 15, 2026' },
        { title: 'Project Deadline', date: 'April 20, 2026' },
        { title: 'Conference Call', date: 'April 22, 2026' },
        { title: 'Lunch with Client', date: 'April 25, 2026' },
        { title: 'Team Building Event', date: 'May 5, 2026' }
    ];
    
    const queryLower = query.toLowerCase();
    const results = mockEvents.filter(event => 
        event.title.toLowerCase().includes(queryLower) || 
        event.date.toLowerCase().includes(queryLower)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-placeholder">No events found matching "' + query + '"</p>';
        return;
    }
    
    searchResults.innerHTML = results.map(event => `
        <div class="search-result-item" onclick="handleSelectEvent('${event.title}', '${event.date}')">
            <div class="search-result-title">${event.title}</div>
            <div class="search-result-date">${event.date}</div>
        </div>
    `).join('');
}

/**
 * Handle selecting an event from search results
 */
function handleSelectEvent(title, date) {
    console.log('Selected event:', title, 'on', date);
    alert('Event Selected: ' + title + ' on ' + date + '\n\nFull details coming soon!');
    closeSearchModal();
}

/**
 * Handle add button click - toggles dropdown menu
 */
function handleAdd() {
    const addMenu = document.getElementById('addMenu');
    addMenu.classList.toggle('show');
    
    // Close menu when clicking outside
    if (addMenu.classList.contains('show')) {
        document.addEventListener('click', closeAddMenu);
    }
}

/**
 * Close the add menu when clicking outside
 */
function closeAddMenu(e) {
    const addMenu = document.getElementById('addMenu');
    const addBtn = document.getElementById('addBtn');
    const container = document.querySelector('.add-menu-container');
    
    if (!container.contains(e.target)) {
        addMenu.classList.remove('show');
        document.removeEventListener('click', closeAddMenu);
    }
}

/**
 * Handle add tasks option
 */
function handleAddTasks() {
    const addTasksModal = document.getElementById('addTasksModal');
    addTasksModal.classList.add('show');
    document.getElementById('taskForm').reset();
    document.getElementById('taskTitle').focus();
    document.getElementById('addMenu').classList.remove('show');
}

/**
 * Close the add tasks modal
 */
function closeAddTasksModal() {
    const addTasksModal = document.getElementById('addTasksModal');
    addTasksModal.classList.remove('show');
}

/**
 * Submit task form
 */
function submitTask(event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const date = document.getElementById('taskDate').value;
    const description = document.getElementById('taskDescription').value;
    
    alert(`Task Added!\nTitle: ${title}\nDate: ${date}\nDescription: ${description}`);
    closeAddTasksModal();
}

/**
 * Handle add reminders option
 */
function handleAddReminders() {
    const addRemindersModal = document.getElementById('addRemindersModal');
    addRemindersModal.classList.add('show');
    document.getElementById('reminderForm').reset();
    document.getElementById('reminderTitle').focus();
    document.getElementById('addMenu').classList.remove('show');
}

/**
 * Close the add reminders modal
 */
function closeAddRemindersModal() {
    const addRemindersModal = document.getElementById('addRemindersModal');
    addRemindersModal.classList.remove('show');
}

/**
 * Submit reminder form
 */
function submitReminder(event) {
    event.preventDefault();
    const title = document.getElementById('reminderTitle').value;
    const dateTime = document.getElementById('reminderDateTime').value;
    const type = document.getElementById('reminderType').value;
    
    alert(`Reminder Added!\nTitle: ${title}\nDate & Time: ${dateTime}\nType: ${type}`);
    closeAddRemindersModal();
}

/**
 * Handle add collaborators option
 */
function handleAddCollaborators() {
    const addCollaboratorsModal = document.getElementById('addCollaboratorsModal');
    addCollaboratorsModal.classList.add('show');
    document.getElementById('collaboratorForm').reset();
    document.getElementById('collaboratorEmail').focus();
    document.getElementById('addMenu').classList.remove('show');
}

/**
 * Close the add collaborators modal
 */
function closeAddCollaboratorsModal() {
    const addCollaboratorsModal = document.getElementById('addCollaboratorsModal');
    addCollaboratorsModal.classList.remove('show');
}

/**
 * Submit collaborator form
 */
function submitCollaborator(event) {
    event.preventDefault();
    const email = document.getElementById('collaboratorEmail').value;
    const name = document.getElementById('collaboratorName').value;
    const role = document.getElementById('collaboratorRole').value;
    
    alert(`Collaborator Added!\nEmail: ${email}\nName: ${name}\nRole: ${role}`);
    closeAddCollaboratorsModal();
}

/**
 * Toggle the view menu visibility
 */
function toggleViewMenu() {
    const viewMenu = document.getElementById('viewMenu');
    if (viewMenu) {
        viewMenu.classList.toggle('show');
    }
}

/**
 * Utility function to get current date
 */
function getCurrentDate() {
    return new Date();
}

/**
 * Utility function to format date
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
