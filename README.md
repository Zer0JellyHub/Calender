# 📅 Jellyfin Calendar Tab

A custom tab for Jellyfin that opens a **"Coming Up" popup** directly on the home screen — styled with a glassmorphism effect to match the [Ultrachromic](https://github.com/CTalvio/Ultrachromic) theme.

![Jellyfin](https://img.shields.io/badge/Jellyfin-10.x-blue?logo=jellyfin)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- Calendar icon tab placed next to Bookmarks, Watchlist etc.
- Click opens a **glassmorphism popup** over the home screen — no page navigation
- Automatically shows only the **next 7 days** from today
- Content is **grouped by date** with full weekday names
- Always loads **series posters** (not episode images)
- Click on a card opens the series detail page
- Close via **✕ button** or **ESC key**
- Designed to match the Ultrachromic / Kaleidochromic theme

---

## 📋 Requirements

- Jellyfin Server **10.8+**
- Plugin: **[Custom CSS/JS](https://github.com/nicholasgundersondesign/jellyfin-plugin-custom-css)** — or use the built-in Branding fields
- Plugin: **[Custom Tabs](https://github.com/nicholasgundersondesign/jellyfin-plugin-custom-tabs)** — **required** for the tab button to appear
- Recommended: [Ultrachromic Theme](https://github.com/CTalvio/Ultrachromic)

---

## 🚀 Installation

### Step 1 — Create the Custom Tab ⚠️ Required

> **The Custom Tab plugin is required.** Without it, the tab button will not appear on the home screen.

1. Open the Jellyfin Dashboard
2. Go to **Plugins → Custom Tabs**
3. Click **Add Tab** and fill in:
   - **Display Text:** `Calender` ← **must be spelled exactly like this**
   - **HTML Content:** leave completely empty
4. Save

> ⚠️ The tab name **must** be `Calender` (with this exact spelling).
> The JavaScript searches for a tab button whose text contains `calend` — if you rename it, the script will not find it and nothing will work.

---

### Step 2 — Add the JavaScript

1. Go to Jellyfin Dashboard → **General → Branding**
2. Paste the full contents of [`calendar.js`](./calendar.js) into the **Custom JavaScript** field
3. Save and reload the page

---

### Step 3 — Add the CSS (optional but recommended)

1. In the same Branding page, paste the contents of [`custom.css`](./custom.css) into the **Custom CSS** field
2. This includes the Ultrachromic theme imports and the tab icon styles

---

## 📁 Files

| File | Description |
|---|---|
| `calendar.js` | Main script — tab patching, popup logic, API calls |
| `custom.css` | Full CSS including Ultrachromic imports and tab icon styles |
| `README.md` | This file |

---

## ⚙️ Configuration

Inside `calendar.js` you can adjust the following:

```javascript
// Number of days to show (default: 7)
cutoff.setDate(today.getDate() + 7);

// Date display language (default: German)
toLocaleDateString('de-DE', ...)

// Tab name to search for — must match your Custom Tab Display Text
.includes('calend')
```

---

## 🎨 Design

The popup uses:
- `backdrop-filter: blur(24px)` — glass blur effect
- Semi-transparent backgrounds matching the Ultrachromic theme
- Light font weights (`font-weight: 300`) consistent with the theme
- Responsive cards (Desktop: 150px wide, Mobile: 3 per row)

---

## 🔧 How it works

```
Jellyfin loads
    │
    ▼
setInterval checks every 400ms if ApiClient is available
    │
    ▼
Finds the Custom Tab button named "Calender"
    │
    ├── Injects the calendar SVG icon
    └── Intercepts the click event (capture phase, before Jellyfin)
            │
            ▼
        Popup opens over the home screen
            │
            ▼
        API call: /Shows/Upcoming (Limit 500)
            │
            ▼
        Client-side filter: next 7 days only
            │
            ▼
        Group items by date
            │
            ▼
        Render series posters with title + episode info
```

---

## ❓ Troubleshooting

| Problem | Solution |
|---|---|
| Tab button not showing | Make sure the Custom Tabs plugin is installed and the tab is named exactly `Calender` |
| Popup opens but shows nothing | Check the browser console for errors — ApiClient may not be ready |
| Wrong date range shown | The `Shows/Upcoming` API ignores date parameters — filtering happens client-side |
| Posters not loading | The script uses `SeriesPrimaryImageTag` — make sure your series have poster images in Jellyfin |

---

## ⚠️ Known Limitations

- The `Shows/Upcoming` API ignores `MinPremiereDate` / `MaxPremiereDate` parameters, so the script loads up to 500 items and filters client-side to 7 days
- The tab only appears on the **home screen**, not on library subpages (Series, Movies etc.)

---

## 📄 License

MIT — free to use and modify.
