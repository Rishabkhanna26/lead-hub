# Lead Management Dashboard - Setup Guide

A comprehensive, professional lead management dashboard built with **Next.js 14** and **React 18**.

## 📁 Project Structure

```
lead-management-dashboard/
├── app/
│   ├── app.jsx                 # Main dashboard component
│   ├── layout.jsx              # Root layout with metadata
│   ├── page.jsx                # Home page entry point
│   ├── styles.css              # Complete styling
│   ├── globals.css             # Global styles (optional)
│   └── favicon.ico             # Favicon
├── public/
│   └── (static assets)
├── package.json                # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── jsconfig.json               # JavaScript configuration
└── .gitignore                  # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Create a new Next.js project:**
```bash
npx create-next-app@latest lead-management-dashboard --typescript=false
```

2. **Navigate to project directory:**
```bash
cd lead-management-dashboard
```

3. **Install dependencies:**
```bash
npm install lucide-react
```

4. **Replace files with the provided ones:**
   - Replace `app/layout.jsx` with the provided layout.jsx
   - Replace `app/page.jsx` with the provided page.jsx
   - Add `app/app.jsx` (the main component)
   - Replace `app/globals.css` with the provided styles.css

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📋 Features

### Overview Dashboard
- **Key Metrics**: Total leads, new leads this week, won/lost deals, collected/pending revenue
- **Leads by Status**: Visual bar chart showing distribution across all statuses
- **Recent Leads**: Quick view of latest 3 leads
- **Recent Payments**: Track recent payments (with data integration capability)

### Leads Management
- **Full Table View**: Complete list of all leads with sorting and filtering
- **Columns**: Name, Company, Contact, Requirement, Status, Priority, Value, Assigned To, Owner
- **Actions**: Edit and delete leads directly from the table
- **Status Tracking**: New, Contacted, Qualified, Proposal Sent, Won, Lost

### Lead Form Modal
Fill-in form with the following fields:
- **Name** * (Required)
- **Company**
- **Phone**
- **Email**
- **Source**: Referral, Website, Ad, Cold call, Social, Other
- **Status**: New, Contacted, Qualified, Proposal sent, Won, Lost
- **Priority**: Low, Medium, High
- **Estimated Value**: In Indian Rupees (₹)
- **Assigned To (Worked By)**: Team members list
- **Locked By (Owner)**: Team members list
- **Requirement/Notes**: Long-form requirement details

### Payments Tracking
- Complete payment records table
- Columns: Client, Amount, Date, Method, Worked By, Owner, Status, Reference
- Empty state for when no payments exist
- Ready for integration with payment systems

### Meetings Management
- Meeting scheduling interface
- Columns: Meeting Name, Date & Time, Contact Number, Participants, Status
- Ready for calendar integration

### Navigation
- Sidebar navigation with active state
- Quick switching between Overview, Leads, Payments, and Meetings
- Responsive mobile navigation

## 🎨 Design Features

### Modern & Professional Aesthetic
- **Color Scheme**: Indigo primary color (#6366f1) with complementary grays
- **Typography**: System fonts with excellent hierarchy
- **Shadows & Depth**: Subtle shadows with hover effects
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Fully mobile-responsive from desktop to mobile

### UI Components
- Stat cards with gradient borders
- Status and priority badges with color coding
- Smooth modal animations
- Interactive tables with hover states
- Professional form validation styling
- Loading and empty states

### Color Coding
- **Status Badges**: Blue (New), Indigo (Contacted), Green (Qualified), Orange (Proposal), Success (Won), Red (Lost)
- **Priority**: Gray (Low), Orange (Medium), Red (High)
- **Icons**: Lucide React icons throughout for consistency

## 💾 Data Management

### Current State Management
The dashboard uses React `useState` for managing:
- Leads list
- Payments list
- Meetings list
- Modal visibility
- Form data
- Active tab

### Sample Data
Pre-populated with 2 sample leads:
1. "aaaa" - Company A - High Priority
2. "dsfgdgdg" - Company B - Medium Priority

### Adding Backend Integration
To connect to a backend API, modify the data management:

```javascript
// Example: Fetch leads from API
useEffect(() => {
  const fetchLeads = async () => {
    const response = await fetch('/api/leads');
    const data = await response.json();
    setLeads(data);
  };
  fetchLeads();
}, []);
```

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary: #6366f1;        /* Main color */
  --success: #10b981;        /* Win color */
  --danger: #ef4444;         /* Lost color */
  --warning: #f59e0b;        /* Pending color */
  /* ... more colors */
}
```

### Add Team Members
Modify the `teamMembers` array in `app.jsx`:
```javascript
const teamMembers = ['Rishabh', 'Anas', 'Prashil', 'Rohit', 'Harsh', 'Ganesh'];
```

### Modify Form Fields
Add new fields to `formData` state and the form grid in the modal.

### Change Source Options
Update the source select options in the form:
```javascript
<select>
  <option>Referral</option>
  <option>Website</option>
  <option>Your Custom Option</option>
</select>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ - Full sidebar navigation
- **Tablet**: 768px - 1023px - Condensed sidebar
- **Mobile**: Below 768px - Horizontal tab navigation
- **Small Mobile**: Below 480px - Stacked layout

## 🎯 Key Functions

### Add Lead
1. Click "Add Lead" button in header
2. Fill in the form
3. Click "Create Lead"

### Edit Lead
1. Click the edit icon (pencil) in the leads table
2. Modify the form
3. Click "Update Lead"

### Delete Lead
1. Click the delete icon (trash) in the leads table
2. Lead is immediately removed

### Switch Tabs
1. Click on any nav item (Overview, Leads, Payments, Meetings)
2. Active tab is highlighted

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
The project works with any Node.js hosting:
- Netlify
- AWS Amplify
- Railway
- Render
- etc.

## 📦 Dependencies

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **Lucide React**: Beautiful icon library

## 🔐 Security Notes

- Form validation is client-side only
- Add server-side validation when integrating with backend
- Implement authentication before deploying
- Sanitize user inputs on the backend
- Use HTTPS in production
- Implement role-based access control

## 📊 Future Enhancements

- [ ] Backend API integration
- [ ] Database connectivity (MongoDB, PostgreSQL)
- [ ] User authentication & authorization
- [ ] Payment integration (Razorpay, Stripe)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] CSV/Excel export
- [ ] Advanced filtering & search
- [ ] Lead scoring
- [ ] Sales pipeline analytics
- [ ] Performance metrics & reports
- [ ] Dark mode theme
- [ ] Multi-language support

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
- Ensure `styles.css` is imported in `layout.jsx`
- Check file paths are correct
- Clear browser cache and rebuild

## 📞 Support & Contact

For issues or questions:
1. Check the Next.js documentation: https://nextjs.org/docs
2. Lucide React icons: https://lucide.dev
3. React documentation: https://react.dev

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using Next.js 14 and React 18**
