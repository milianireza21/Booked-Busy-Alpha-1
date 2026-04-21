# Booked & Busy - Calendar Application

A clean, customizable calendar application with HTML5, CSS3, and vanilla JavaScript. Provides users with simplified calendar views (year, month, week, day) without the complexity of traditional calendar apps.

## Project Overview

**App Name:** Booked & Busy

**Concept:** Many calendar applications are too complex or rigid when it comes to customization. Users struggle to navigate overly complicated interfaces. Booked & Busy solves this by providing a simplified, easy-to-use calendar that is still highly customizable.

**Authors:**
- Miliani A. Reza (Year View)
- Jashea Alexis (Month View)
- Noa Shellim (Week View)

## Project Structure

```
Booked-Busy-Alpha-1-Main/
├── index.html              # Landing page / navigation hub
├── p1year.html            # Year view - Complete 2026 calendar with all months
├── p2month.html           # Month view - Detailed single month view
├── p3week.html            # Week view - Weekly schedule with tasks
├── p4day.html             # Day view - Daily task and event management
├── css/
│   └── styles.css         # All styles - responsive design
├── js/
│   └── app.js             # Calendar logic and interactivity
├── images/                # Image assets directory
└── README.md              # Documentation
```

## Features

### 1. **Switchable Views**
Users can easily switch between four calendar views:
- **Year View** (p1year.html) - Overview of all 12 months with mini-calendars
- **Month View** (p2month.html) - Detailed monthly view with event management
- **Week View** (p3week.html) - Weekly schedule with personal and collaborative tasks
- **Day View** (p4day.html) - Focus on a single day with time-slot based events

### 2. **Add & Edit Events**
- Click the **+** button to create new events
- Click any date to add events to that specific date
- (Future) Edit and delete existing events

### 3. **Customizable Interface**
- **Customize Button** - Adjust calendar appearance and settings
- Theme and background customization options
- Personal preference settings

### 4. **Simple Navigation**
- Clean header navigation for switching views
- Intuitive layout that's easy to learn
- Responsive design for all devices

### 5. **Collaboration Features**
- **Collaborators Section** - View team members working on shared calendar
- Current team: milreza@ttu.edu, jalexis@ttu.edu, nshellim@ttu.edu, mokeudo@ttu.edu
- (Future) Share calendars with team members

## Technical Implementation

### HTML5 Structure
- Semantic HTML markup
- Accessibility features (aria-labels)
- SVG inline icons for scalability

### CSS3 Styling
- **Flexbox** for header and sidebar layout
- **CSS Grid** for calendar month grid (4×3 responsive layout)
- **Responsive Design** with mobile-first approach
- Modern, clean aesthetic matching Figma design

### Vanilla JavaScript
- No external dependencies
- Lightweight and fast
- Calendar day generation for accurate month layouts
- Event listener management for user interactions

## Current Implementation - Year View (p1year.html)

### Components

**Header**
- Calendar title: "2026 Calendar"
- View selector dropdown
- Customize, Search, and Add buttons
- SVG icons for visual clarity

**Main Calendar Grid**
- 4×3 grid showing all 12 months
- Each month has:
  - Gray header with month name
  - Mini calendar grid with all days
  - Clickable day elements for navigation
  - Hover effects for better UX

**Sidebar**
- Collaborators section
- Team member contact list
- Professional styling for team visibility

### Responsive Breakpoints
- **Desktop** (1440px) - 4-column grid
- **Tablet** (1200px down) - 3-column grid
- **Mobile** (768px down) - 2-column grid, sidebar full-width
- **Small Mobile** (480px down) - 1-column grid

## CSS Classes Reference

### Header
```
.header          - Main header container
.calendar-title  - Page title styling
.view-selector   - View switcher dropdown
.customize-btn   - Customize button
.search-btn      - Search button
.add-btn         - Add event button
```

### Calendar
```
.calendar-grid    - 4×3 grid container
.month-card       - Individual month cards
.month-header     - Month name header (gray background)
.month-content    - Month day grid
.mini-calendar    - Mini calendar layout
.days-grid        - Day elements grid
.day              - Individual day element
```

### Sidebar
```
.sidebar                     - Right sidebar container
.collaborators-section       - Collaborators wrapper
.collaborators-title         - Section title
.collaborators-list          - List of collaborators
```

## JavaScript Functions

### Initialization
- `initializeCalendar()` - Generates all months for the year
- `populateMonthCard(card, month, year)` - Fills card with calendar days

### User Actions
- `navigateToMonth(monthName)` - Switch to month view
- `handleDayClick(day, month, year)` - Day selection
- `handleCustomize()` - Customize button action
- `handleSearch()` - Search functionality
- `handleAdd()` - Add event action
- `showViewMenu()` - Display view selector

### Utilities
- `getCurrentDate()` - Get today's date
- `formatDate(date)` - Format dates for display

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | Latest  | ✓ Full  |
| Firefox | Latest  | ✓ Full  |
| Safari  | Latest  | ✓ Full  |
| Edge    | Latest  | ✓ Full  |
| Mobile Browsers | Latest | ✓ Full |

## Getting Started

### Prerequisites
- No setup required!
- Any modern web browser
- No dependencies to install

### Installation
1. Clone or extract the repository
2. Open `index.html` or `p1year.html` in a web browser
3. Click on months or buttons to explore functionality

### Development
1. HTML files in root directory
2. CSS files in `/css/`
3. JavaScript files in `/js/`
4. Edit files directly and refresh browser to see changes

## Technologies

- **HTML5** - Modern semantic markup
- **CSS3** - Flexbox, Grid, Responsive Design
- **JavaScript ES6** - Vanilla, no frameworks
- **SVG** - Scalable graphics for icons
- **Figma** - Design reference

## Future Enhancements

### Phase 2
- [ ] Month view with detailed event management
- [ ] Week view with time slots
- [ ] Day view with hourly schedule
- [ ] Event creation modal

### Phase 3
- [ ] Local storage persistence
- [ ] Backend API integration
- [ ] User authentication
- [ ] Database for events

### Phase 4
- [ ] Calendar sharing with collaborators
- [ ] Real-time synchronization
- [ ] Mobile app (React Native/Flutter)
- [ ] Advanced customization themes
- [ ] Notifications and reminders
- [ ] Import/export calendar (CSV, ICS format)

## File Sizes

- `index.html` - ~2 KB
- `p1year.html` - ~5 KB
- `styles.css` - ~8 KB
- `app.js` - ~6 KB
- **Total base** - ~21 KB (uncompressed)

## Performance

- ⚡ Fast loading (no external dependencies)
- 📦 Small file size
- 🎯 Optimized CSS Grid layout
- 🔄 Efficient event listeners
- 📱 Mobile-friendly design

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliant
- Responsive text sizing

## Testing

To test the application:

1. **Year View**: Open p1year.html and verify all 12 months display correctly
2. **Responsive Design**: Resize browser window to test breakpoints
3. **Interactivity**: Click buttons and month cards to verify functionality
4. **Browser Compatibility**: Test on different browsers

## Known Limitations

- Month, Week, and Day views not yet implemented
- Event persistence requires backend implementation
- Collaboration features require server setup
- Customization options are placeholder-only

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make changes to appropriate files
3. Test thoroughly
4. Submit for review

## License

This project is developed for educational purposes by TTU students.

## Contact & Support

**Development Team:**
- Miliani A. Reza - milreza@ttu.edu
- Jashea Alexis - jalexis@ttu.edu
- Noa Shellim - nshellim@ttu.edu
- Name - mokeudo@ttu.edu

**For issues or suggestions:** Contact the development team

---

Last Updated: April 2026
Version: 1.0 (Alpha)


