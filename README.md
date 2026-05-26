# 📊 Lead Management Dashboard

A modern, professional lead management system built with **Next.js 14** and **React 18**. Perfect for sales teams, agencies, and businesses that need to track leads, manage communications, and monitor revenue.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-black.svg)
![React](https://img.shields.io/badge/React-18.2+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 📈 Overview Dashboard
- **Key Metrics**: Real-time stats on total leads, new leads, won/lost deals
- **Revenue Tracking**: Collected vs. Pending revenue in Indian Rupees
- **Status Distribution**: Visual bar chart of leads by status
- **Recent Activity**: Latest leads and payments at a glance

### 👥 Leads Management
- **Full-Featured Table**: Comprehensive list of all leads
- **Quick Actions**: Edit and delete leads directly from table
- **Lead Details**: Name, company, contact info, requirements, value
- **Team Assignment**: Assign leads to team members
- **Priority Levels**: Low, Medium, High priority tracking
- **Status Pipeline**: New → Contacted → Qualified → Proposal → Won/Lost

### 💰 Payments Tracking
- **Payment Records**: Complete payment history and tracking
- **Revenue Insights**: Monitor collected and pending amounts
- **Payment Methods**: Track payment method and references
- **Status Monitoring**: Pending, Completed payment states

### 📅 Meetings Management
- **Schedule Meetings**: Track all client meetings
- **Meeting Details**: Date, time, participants, contact info
- **Status Updates**: Monitor meeting progress

### 🎯 Lead Creation Form
Professional form with:
- **Basic Info**: Name*, Company, Phone, Email
- **Lead Source**: Referral, Website, Ad, Cold Call, Social, Other
- **Status Tracking**: 6-step sales pipeline
- **Priority**: Easy-to-set priority levels
- **Value Estimation**: Estimated contract value in ₹
- **Team Assignment**: Assign to team members
- **Requirements**: Detailed notes on what client needs

### 🎨 Professional UI/UX
- **Modern Design**: Clean, professional interface
- **Color Coding**: Intuitive status and priority colors
- **Responsive Layout**: Works perfectly on desktop, tablet, mobile
- **Smooth Animations**: Polished micro-interactions
- **Dark-Ready**: Base for easy dark mode implementation
- **Accessibility**: Semantic HTML and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn 3+

### Installation

1. **Create Next.js Project**
```bash
npx create-next-app@latest lead-management-dashboard
cd lead-management-dashboard
```

2. **Install Dependencies**
```bash
npm install lucide-react
```

3. **Copy Project Files**
Copy these files from the output folder:
- `app/app.jsx` → `app/app.jsx`
- `app/layout.jsx` → `app/layout.jsx`
- `app/page.jsx` → `app/page.jsx`
- `styles.css` → `app/styles.css`
- `package.json` → Update your package.json
- `next.config.js` → Replace existing file
- `jsconfig.json` → Replace existing file

4. **Run Development Server**
```bash
npm run dev
```

5. **Open Browser**
Navigate to `http://localhost:3000`

## 📖 Usage

### Adding a New Lead
1. Click the **"+ Add Lead"** button in the top right
2. Fill in the lead information (Name is required)
3. Select Source, Status, and Priority
4. Assign to team member if needed
5. Add requirements/notes
6. Click **"Create Lead"**

### Editing a Lead
1. Go to the **Leads** tab
2. Click the **edit icon** (pencil) on any lead row
3. Modify the information
4. Click **"Update Lead"**

### Deleting a Lead
1. Go to the **Leads** tab
2. Click the **delete icon** (trash) on any lead row
3. Lead is removed immediately

### Viewing Overview
Click **Overview** in the sidebar to see:
- Key metrics and stats
- Leads by status chart
- Recent leads
- Recent payments

### Managing Payments
- Go to **Payments** tab to view all payments
- Track collected vs pending revenue
- Monitor payment status and methods

## 🔌 API Integration Examples

### Connecting to Backend - Fetch Leads

```javascript
// Add this useEffect to app.jsx after state declarations
useEffect(() => {
  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
  
  fetchLeads();
}, []);
```

### Create Lead on Backend

```javascript
const handleSubmitLead = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        value: parseInt(formData.value) || 0,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create lead');
    const newLead = await response.json();
    setLeads([newLead, ...leads]);
    setShowLeadModal(false);
  } catch (error) {
    console.error('Error creating lead:', error);
    alert('Failed to create lead');
  }
};
```

### Update Lead

```javascript
const handleSubmitLead = async (e) => {
  e.preventDefault();
  
  if (editingLead) {
    try {
      const response = await fetch(`/api/leads/${editingLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to update');
      const updated = await response.json();
      setLeads(leads.map(l => l.id === editingLead.id ? updated : l));
      setShowLeadModal(false);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  }
};
```

### Delete Lead

```javascript
const handleDeleteLead = async (id) => {
  if (!confirm('Are you sure you want to delete this lead?')) return;
  
  try {
    const response = await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete');
    setLeads(leads.filter(l => l.id !== id));
  } catch (error) {
    console.error('Error deleting lead:', error);
  }
};
```

## 🎨 Customization

### Change Primary Color
Edit `styles.css`:
```css
:root {
  --primary: #6366f1;      /* Change this to your color */
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
}
```

### Add/Remove Team Members
In `app.jsx`, find and modify:
```javascript
const teamMembers = [
  'Rishabh', 
  'Anas', 
  'Prashil', 
  'Rohit', 
  'Harsh', 
  'Ganesh',
  // Add your team members here
];
```

### Modify Status Options
In the form section of `app.jsx`:
```javascript
<select id="status">
  <option>New</option>
  <option>Contacted</option>
  <option>Qualified</option>
  <option>Proposal sent</option>
  <option>Won</option>
  <option>Lost</option>
  {/* Add custom statuses here */}
</select>
```

## 📱 Responsive Design

The dashboard is fully responsive across all devices:
- **Desktop**: Full sidebar, complete data tables
- **Tablet**: Optimized layout, touch-friendly buttons
- **Mobile**: Horizontal tab navigation, stacked forms
- **Small Mobile**: Maximum usability on small screens

## 🗄️ Data Structure

### Lead Object
```javascript
{
  id: number,
  name: string,           // Required
  company: string,
  phone: string,
  email: string,
  source: string,        // Referral, Website, Ad, etc.
  status: string,        // New, Contacted, Qualified, etc.
  priority: string,      // Low, Medium, High
  value: number,         // In Indian Rupees
  workedBy: string,      // Team member name
  lockedBy: string,      // Owner
  requirement: string,   // Notes/requirements
  createdAt: ISO8601,    // Timestamp
}
```

### Payment Object (Optional)
```javascript
{
  id: number,
  client: string,
  amount: number,
  date: ISO8601,
  method: string,
  workedBy: string,
  lockedBy: string,
  status: string,
  reference: string,
}
```

## 🔐 Security Checklist

- [ ] Implement user authentication
- [ ] Add role-based access control (RBAC)
- [ ] Validate inputs on both client and server
- [ ] Implement CSRF protection
- [ ] Use HTTPS in production
- [ ] Add rate limiting to API endpoints
- [ ] Sanitize user inputs to prevent XSS
- [ ] Implement SQL injection prevention
- [ ] Add audit logging for critical actions
- [ ] Secure sensitive data (emails, phone numbers)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Railway/Render/Others
See platform-specific documentation. Build command:
```bash
npm run build
```

Start command:
```bash
npm start
```

## 📊 Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] User authentication with NextAuth.js
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Email notifications (Nodemailer, SendGrid)
- [ ] SMS alerts (Twilio)
- [ ] CSV/Excel export functionality
- [ ] Advanced search and filtering
- [ ] Lead scoring algorithm
- [ ] Sales forecasting
- [ ] Team performance analytics
- [ ] Customer relationship tracking
- [ ] Document management
- [ ] Email template system
- [ ] Scheduled task automation
- [ ] Dark mode theme
- [ ] Multi-language support (i18n)
- [ ] API documentation (Swagger)
- [ ] Real-time notifications (WebSocket)

## 🐛 Troubleshooting

### Issue: Styles not loading
**Solution**: Ensure `styles.css` is imported in `layout.jsx` at the top

### Issue: Icons not showing
**Solution**: Run `npm install lucide-react` and restart dev server

### Issue: Module not found
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Issue: Port 3000 already in use
**Solution**: Use different port: `npm run dev -- -p 3001`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Lucide React Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com) (if you want to add)

## 📄 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💬 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the SETUP_GUIDE.md
3. Check Next.js documentation
4. Open an issue on GitHub

---

**Built with ❤️ using Next.js 14, React 18, and Lucide Icons**

*Last Updated: 2024*
