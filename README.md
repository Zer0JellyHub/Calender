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
- Plugin: **[Custom Tabs](https://github.com/nicholasgundersondesign/jellyfin-plugin-custom-tabs)** — **required** for the tab button to appear

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

1. Go to Jellyfin Dashboard → **General → JS Injector**
2. Paste the full contents of [`calendar.js`](./calendar.js) into the **Custom JavaScript** field
3. Save and reload the page

---

## 📁 Files

| File | Description |
|---|---|
| `calendar.js` | Main script — tab patching, popup logic, API calls |
| `custom.css` | Full CSS including Ultrachromic imports and tab icon styles |
| `README.md` | This file |

---

## ⚠️ Known Limitations

- The `Shows/Upcoming` API ignores `MinPremiereDate` / `MaxPremiereDate` parameters, so the script loads up to 500 items and filters client-side to 7 days
- The tab only appears on the **home screen**, not on library subpages (Series, Movies etc.)

---

## 📄 License

MIT — free to use and modify.
