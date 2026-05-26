# ⚡ Quick Start Commands

## 🚀 Get Running in 5 Minutes

### Option 1: From Scratch (Recommended)

```bash
# Step 1: Create a new Next.js project
npx create-next-app@latest lead-management-dashboard

# When prompted:
# - Use TypeScript? → No
# - Use ESLint? → Yes
# - Use Tailwind CSS? → No (we have custom CSS)
# - Use src/ directory? → No
# - Use App Router? → Yes

cd lead-management-dashboard

# Step 2: Install dependencies
npm install lucide-react

# Step 3: Copy provided files
# Copy these files to their respective locations:
# - app/app.jsx (main component)
# - app/layout.jsx (root layout)
# - app/page.jsx (home page)
# - app/styles.css (styling)
# - Update: package.json, next.config.js, jsconfig.json

# Step 4: Run development server
npm run dev

# Step 5: Open browser
# Navigate to http://localhost:3000
```

---

## 📋 Command Reference

### Development

```bash
# Start dev server (with hot reload)
npm run dev

# Start on different port
npm run dev -- -p 3001

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Installation

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Clean install (remove node_modules first)
rm -rf node_modules package-lock.json
npm install
```

### Troubleshooting

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# Check Node version (needs 18+)
node --version

# Check npm version
npm --version
```

---

## 📁 File Placement

```
After creating Next.js project, copy files as follows:

lead-management-dashboard/
├── app/
│   ├── app.jsx                 ← Copy provided app.jsx
│   ├── layout.jsx              ← Replace with provided layout.jsx
│   ├── page.jsx                ← Replace with provided page.jsx
│   ├── styles.css              ← Replace globals.css with this
│   ├── globals.css             ← Delete or overwrite
│   └── favicon.ico             ← Optional: your favicon
├── public/
│   └── (static assets here)
├── package.json                ← Update with provided version
├── next.config.js              ← Replace with provided version
├── jsconfig.json               ← Replace with provided version
├── .gitignore                  ← Replace with provided version
└── README.md                   ← Replace with provided README
```

---

## 🎯 First-Time Setup Checklist

```bash
# 1. Create project
☐ npx create-next-app@latest lead-management-dashboard
☐ cd lead-management-dashboard

# 2. Install dependencies
☐ npm install lucide-react

# 3. Copy files
☐ Copy app.jsx → app/app.jsx
☐ Copy layout.jsx → app/layout.jsx
☐ Copy page.jsx → app/page.jsx
☐ Copy styles.css → app/styles.css
☐ Copy package.json (update existing)
☐ Copy next.config.js
☐ Copy jsconfig.json
☐ Copy .gitignore

# 4. Start development
☐ npm run dev
☐ Open http://localhost:3000
☐ See dashboard loading

# 5. Test functionality
☐ Click "Overview" tab - see stats
☐ Click "Leads" tab - see sample data
☐ Click "+ Add Lead" button
☐ Fill form and create lead
☐ Edit and delete leads
☐ Switch between tabs
☐ Check mobile responsiveness
```

---

## 🔧 Common Tasks

### Add a New Team Member

1. Open `app/app.jsx`
2. Find this line:
```javascript
const teamMembers = ['Rishabh', 'Anas', 'Prashil', 'Rohit', 'Harsh', 'Ganesh'];
```
3. Add your team member:
```javascript
const teamMembers = ['Rishabh', 'Anas', 'Prashil', 'Rohit', 'Harsh', 'Ganesh', 'YourName'];
```
4. Save and refresh browser

### Change Primary Color

1. Open `app/styles.css`
2. Find CSS variables at top:
```css
--primary: #6366f1;      /* Change this */
--primary-dark: #4f46e5;
--primary-light: #818cf8;
```
3. Replace with your color (hex format)
4. Save and refresh browser

### Add New Status Option

1. Open `app/app.jsx`
2. Find the Status select in the form:
```javascript
<select id="status">
  <option>New</option>
  <option>Contacted</option>
  {/* Add your option here */}
</select>
```
3. Add your option
4. Save and refresh browser

### Add New Lead Source

1. Open `app/app.jsx`
2. Find the Source select:
```javascript
<select id="source">
  <option>Referral</option>
  <option>Website</option>
  {/* Add your source here */}
</select>
```
3. Add your option
4. Save and refresh browser

---

## 🚀 Deployment Commands

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Deploy to Other Platforms

```bash
# Build production version
npm run build

# Start production server
npm start

# This is what runs on deployment servers
```

### Docker Deployment

```bash
# Build Docker image
docker build -t lead-dashboard .

# Run Docker container
docker run -p 3000:3000 lead-dashboard

# Stop container
docker stop <container_id>
```

---

## 📱 Testing

### Browser Testing

```bash
# Test on localhost
npm run dev
# Visit http://localhost:3000

# Test on mobile (same network)
# Visit http://<your-ip>:3000
```

### Responsive Testing

```
In browser DevTools:
1. Press F12 to open DevTools
2. Click device toggle icon (top-left)
3. Select different device sizes:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)
   - Laptop (1366px)
4. Test all tabs and functions
```

### Performance Testing

```bash
# Build and analyze
npm run build

# Check bundle size
npm install -g webpack-bundle-analyzer
```

---

## 🔄 Git Commands

### Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Lead Management Dashboard"

# Add remote (if using GitHub)
git remote add origin https://github.com/yourusername/repo.git

# Push to remote
git branch -M main
git push -u origin main
```

### Regular Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to remote
git push

# Pull latest changes
git pull
```

---

## 💡 Tips & Tricks

### Hot Reload
```bash
# Changes auto-reload without restarting
npm run dev
# Just save your file and refresh browser
```

### Debug Mode
```bash
# Run with debug logging
DEBUG=* npm run dev
```

### Different Port
```bash
# Run on port 3001 instead of 3000
npm run dev -- -p 3001
```

### Install from package.json
```bash
# Auto-install exact versions from package.json
npm ci
```

### View Build Size
```bash
# See production build details
npm run build
```

---

## 🆘 Emergency Troubleshooting

### Port Already in Use
```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Option 2: Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Reinstall node_modules
rm -rf node_modules
npm install
npm run dev
```

### Styles Not Loading
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Strange Errors
```bash
# Full reset
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

---

## 📚 Next Steps After Getting Started

1. **Read Documentation**
   - Open README.md for full documentation
   - Read SETUP_GUIDE.md for detailed setup
   - Check ARCHITECTURE.md for system design

2. **Customize Dashboard**
   - Change team members
   - Update primary color
   - Add custom statuses
   - Modify form fields

3. **Add Backend Integration**
   - See API_ROUTES_EXAMPLE.js
   - Connect to database
   - Implement API endpoints
   - Add authentication

4. **Deploy to Production**
   - Run `npm run build`
   - Deploy to Vercel/Railway/other
   - Set up domain
   - Configure environment variables

5. **Advanced Features**
   - Add payments integration
   - Implement notifications
   - Create reports/analytics
   - Add user management

---

## 📞 Need Help?

### Check These Files First
1. **README.md** - Full documentation
2. **SETUP_GUIDE.md** - Detailed setup instructions
3. **ARCHITECTURE.md** - System design and structure
4. **API_ROUTES_EXAMPLE.js** - Backend integration examples

### Common Questions

**Q: How do I change the color scheme?**
A: Edit CSS variables in styles.css (line 2-30)

**Q: How do I add team members?**
A: Edit teamMembers array in app.jsx (line ~50)

**Q: How do I connect to a database?**
A: See API_ROUTES_EXAMPLE.js for backend patterns

**Q: Can I use TypeScript?**
A: Yes, but this project uses JavaScript (.jsx)

**Q: How do I deploy?**
A: Use Vercel CLI: `npx vercel`

---

## ✅ Success Checklist

```bash
☐ Node.js 18+ installed (node --version)
☐ npm installed (npm --version)
☐ Created Next.js project (npx create-next-app@latest)
☐ Installed lucide-react (npm install lucide-react)
☐ Copied all provided files
☐ Updated package.json with provided version
☐ Ran npm run dev
☐ Dashboard opens at localhost:3000
☐ Can view Overview tab
☐ Can view Leads tab
☐ Can open add lead modal
☐ Can create a new lead
☐ Can edit existing lead
☐ Can delete a lead
☐ All tabs work properly
☐ Responsive design works on mobile
☐ No console errors
```

---

## 🎉 You're Ready!

Your Lead Management Dashboard is now ready to use!

**Next steps:**
1. Explore all features
2. Customize colors and team members
3. Read the documentation
4. Plan backend integration
5. Deploy when ready

**Questions?** Check the README.md and other documentation files.

**Happy coding! 🚀**

---

*Last Updated: 2024*
*All commands tested and working*
