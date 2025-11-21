# Lifted - Anonymous Prayer & Confession Board

A beautiful, completely static anonymous community board where people can share prayers, confessions, and lift each other up with support. **No backend. No database. No tracking.**

## 🌟 Features

### Core Features
- 🙏 **Anonymous Prayer Requests** - Share prayer needs without judgment
- 💬 **Confessions Tab** - Anonymously share what weighs on your heart
- ❤️ **Community Support** - Tap "Prayed for you" to show encouragement
- 🚩 **Community Moderation** - Report inappropriate content (5 reports = auto-hide)
- 📱 **Mobile-First Design** - Beautiful, responsive interface
- 🔒 **True Privacy** - 100% anonymous, no personal data collection
- 💾 **Completely Local** - All data stored in your browser only
- 💰 **Ad Ready** - 5 non-intrusive ad placement zones
- 🏋️ **FitIQ Hub Cross-Promo** - Non-intrusive health & fitness CTA

### Pages
- Landing page with hero section
- About Us
- Contact Form
- Terms of Service
- Privacy Policy
- Cookie Policy

## 📋 How It Works

1. **User visits site** → Sees onboarding with community guidelines
2. **Selects Prayer or Confession tab** → Types their post
3. **Clicks "Post Anonymously"** → Gets random supportive response
4. **Sees their post + response in feed** → Can support others
5. **Page refresh clears everything** → Fresh start each visit

## 🎯 Key Design Decisions

### No Backend = No Servers to Maintain
- Everything runs in the browser
- Zero server costs
- Zero database costs
- Instant deployment (just static files)
- Posts are temporary (cleared on page refresh)

### True Anonymity
- No IP tracking
- No analytics
- No personal data collection
- Only localStorage flag for onboarding state
- Posts don't persist across sessions

### Random Responses
- 40 pre-written prayer responses
- 40 pre-written confession responses
- Every post gets instant supportive feedback
- No spam/toxic user responses
- Consistent, positive tone

## 📁 File Structure

```
lifted/
├── index.html              Main landing page + board
├── about.html              About Us
├── contact.html            Contact Form
├── terms.html              Terms of Service
├── privacy.html            Privacy Policy
├── cookies.html            Cookie Policy
├── src/
│   ├── app.js              Main application logic
│   ├── responses.js        40 + 40 pre-written responses
│   └── styles.css          All styling
└── public/
    └── favicon.ico         (optional)
```

## 🚀 Getting Started

### Zero Setup Required!
This is a completely static website. Just open `index.html` in a browser.

### To Deploy Online (Simple Option)
1. Upload all files to any static hosting:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Any web host

### Development
```bash
# No build process needed!
# Just serve files locally:

# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

## 🎨 Customization

### Change Brand Colors
Edit `src/styles.css`:
- Primary blue: `#2d5f8d`
- Dark blue: `#1f4562`
- Orange accent: `#f0a202`

### Update Random Responses
Edit `src/responses.js`:
```javascript
const prayerResponses = [
  "Your custom response 1",
  "Your custom response 2",
  // ... 40 total
];
```

### Change Site Title
Edit all `.html` files:
- `<title>` tag
- Logo text "Lifted"
- Navigation branding

### Add Real Ads
Replace ad placeholders with real ad code:
```html
<!-- Replace this -->
<div class="ad-placement ad-placement--1">
  <p class="ad-placeholder">Advertisement</p>
</div>

<!-- With your ad code -->
<div class="ad-placement ad-placement--1">
  <!-- Google AdSense code, etc -->
</div>
```

### Update FitIQ Hub Link
Find `fitiqhub.com` in `index.html` and replace with your actual URL.

## 📱 Mobile Responsive
- Works on all screen sizes
- Mobile-first design
- Touch-friendly buttons
- Readable on small screens

## 🔒 Privacy & Security

### What We Don't Do
- ❌ No server storage
- ❌ No database
- ❌ No IP logging
- ❌ No user tracking
- ❌ No analytics
- ❌ No personal data collection

### What We Do
- ✅ Store one flag in localStorage (onboarding)
- ✅ Keep posts in browser memory only
- ✅ Clear everything on page refresh
- ✅ Use HTTPS if deployed

## 💰 Monetization

### 5 Ad Placements Included
1. **Leaderboard Top** (970x90) - After hero
2. **Sidebar Right** (300x250) - Desktop only
3. **Feed Ad** (728x90) - Between posts
4. **Leaderboard Bottom** (970x90) - After feed
5. **Pre-Footer** (728x90) - Before footer

### Recommended Ad Networks
- Google AdSense
- Mediavine
- Conversant
- Direct ad sales

### FitIQ Hub Cross-Promotion
Non-intrusive section between ads and footer with custom CTA.

## 🌍 Deployment Options

### GitHub Pages (Recommended for Free Hosting)
```bash
# 1. Create GitHub repo
# 2. Upload all files
# 3. Go to Settings → Pages
# 4. Select "Deploy from branch"
# 5. Choose "main" branch and "/" folder
# 6. Your site goes live at: username.github.io/lifted
```

### Netlify (Drag & Drop)
```bash
# 1. Go to netlify.com
# 2. Drag & drop the project folder
# 3. Site live in 30 seconds
```

### Traditional Web Host
Just upload all files via FTP to your web server.

## 📊 How Data Works

### When User Posts
```javascript
1. Create post object with:
   - ID (unique)
   - Type (prayer/confession)
   - Text
   - Timestamp
   - Prayed count
   - Report count
   
2. Generate random response from responses.js

3. Store both in browser memory (allPosts array)

4. Render in feed

5. On page refresh: ALL DATA CLEARED ✓
```

### Perfect For
- Testing/prototyping
- Community building (fresh start each visit)
- No privacy concerns
- No GDPR/CCPA compliance needed
- No user data to manage

### Not Ideal For
- Need persistent posts across sessions
- Want to track individual users
- Need analytics
- Want user accounts/authentication

## 🎯 Future Enhancements (Optional)

1. **Backend Version** - Add Firebase/database for persistence
2. **Comments** - Allow anonymous replies to posts
3. **Tags** - Filter by topic (health, family, finances, etc.)
4. **Voting** - Upvote helpful responses
5. **Search** - Find posts by keyword
6. **Dark Mode** - Light/dark theme toggle
7. **Mobile App** - Wrap as PWA or native app
8. **Email Notifications** - Notify when someone prays for you

## ❓ FAQ

**Q: Where are posts stored?**
A: Only in your browser's memory. They disappear on page refresh.

**Q: Can I save posts permanently?**
A: Not with this version. You'd need to add a backend database (Firebase, etc.).

**Q: How do you monetize?**
A: With ad placements. No user data = no tracking needed.

**Q: Is this GDPR compliant?**
A: Yes! No personal data collection, no tracking, no cookies beyond onboarding flag.

**Q: Can I add a real backend?**
A: Yes, but you'd lose the "no backend" simplicity. See Future Enhancements.

**Q: How many people can use it?**
A: Unlimited. Static site can handle heavy traffic.

**Q: Do I need to maintain servers?**
A: Nope! Deploy to GitHub Pages or Netlify and forget it.

**Q: Can I change the random responses?**
A: Yes! Edit `src/responses.js` with your own responses.

## 📄 License

MIT License - See LICENSE file for details

---

## 🚀 Quick Checklist Before Launch

- [ ] Customized random responses (optional)
- [ ] Updated contact email
- [ ] Reviewed all legal pages
- [ ] Updated FitIQ Hub link
- [ ] Customized colors if desired
- [ ] Tested on mobile
- [ ] Added ad code (if monetizing)
- [ ] Deployed to hosting platform

## 🎉 Ready to Launch?

1. Customize as needed
2. Deploy to GitHub Pages/Netlify
3. Share the link!
4. Enjoy a zero-maintenance prayer board

**That's it. You're done.** 🙏

---

Questions? Create an issue or email hello@lifted.community

Made with ❤️ for anonymous community support.