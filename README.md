# 📅 Jellyfin Calendar Tab

A custom tab for Jellyfin that opens a **"Coming Up"** popup directly on the home screen — styled with a sleek glassmorphism effect to perfectly match the **Ultrachromic** theme.

---

## ✨ Features

* **Integrated UI:** Adds a dedicated "Calendar" icon tab right next to Bookmarks, Watchlist, and other home screen tabs.
* **Glassmorphism Popup:** Opens a stylish, semi-transparent overlay directly over the home screen — no disruptive page navigation required.
* **Smart Date Range:** Automatically calculates and displays releases for the next **7 days** starting from today.
* **Series Focus:** Always prioritizes high-quality series posters instead of episode thumbnails for a cleaner, more aesthetic look.
* **Direct Navigation:** One click on a card takes you instantly to the series detail page.
* **Easy Exit:** Quickly close the view via the **✕** button or by hitting the **ESC** key.
* **Themed:** Custom-tailored to align with the visual style of **Ultrachromic / Kaleidochromic**.

---

## 📸 Screenshots

### Home Screen Integration
<img width="1440" height="900" alt="Home Screen Tab Integration" src="https://github.com/user-attachments/assets/ef18ed8b-43d4-494b-8cb5-b412060245a5" />

### Calendar Popup View
<img width="1440" height="900" alt="Bildschirmfoto 2026-03-31 um 19 09 47" src="https://github.com/user-attachments/assets/07e7084d-759a-4b79-9842-e1446168f14b" />

---

## 📋 Requirements

* **Jellyfin Server 10.8+**
* **Plugin:** [Custom Tabs](https://github.com/c9970/jellyfin-plugin-customtabs) — **Required** to inject the tab button into the UI.

---

## 🚀 Installation

### Step 1 — Create the Custom Tab ⚠️
The *Custom Tabs* plugin acts as the anchor. Without this step, the script won't find a button to hook into.

1.  Open your **Jellyfin Dashboard**.
2.  Navigate to **Plugins** → **Custom Tabs**.
3.  Click **Add Tab** and enter the following:
    * **Display Text:** `Calender` 
    * **HTML Content:** *Leave this completely empty.*
4.  **Save.**

> [!IMPORTANT]  
> The tab name must be spelled exactly **Calender**. The script specifically searches for the string "calendar" to attach the popup logic. If renamed, the trigger will fail.

### Step 2 — Add the JavaScript & CSS
1.  Go to **Jellyfin Dashboard**
2.  Locate the **Custom JavaScript code** field.
3.  Paste the full contents of [`calendar.js`](./calendar.js) into the field.
4.  **Save** and refresh your browser.

---

## 📁 Files

| File | Description |
| :--- | :--- |
| `calendar.js` | Main logic: Tab patching, popup rendering, and API data fetching. |
| `README.md` | This documentation. |

---

## ⚠️ Logic & Known Issues

- **Empty Days:** If a specific day (e.g., Thursday) has no scheduled releases in your library, the calendar will still show that day's heading with the message *"No episodes scheduled for this day / No information available."*

- **Missing Data:** If the Jellyfin API returns no upcoming items for the entire 7-day window, the calendar will appear empty. This is expected if your library has no episodes with future premiere dates set.

- **API Filtering:** Since some Jellyfin versions handle date parameters inconsistently, the script fetches up to 500 upcoming items and performs client-side filtering for accuracy.

- **Scope:** The tab is designed to appear only on the Home Screen. It is intentionally not visible on library sub-pages (Movies / Series).

- **Slow initial load:** When opening the popup for the first time, there may be a short delay of 1–3 seconds. This is caused by the Jellyfin API fetching up to 500 items including metadata and image tags in a single request. The load time depends on your server hardware, library size, and network speed. Subsequent opens within the same session are faster since the data is already in memory.

- **Future episodes not in library:** The calendar only shows episodes that already exist in your Jellyfin library with a future premiere date. Episodes that are not yet downloaded or added to your library will not appear, even if they are scheduled to release soon.
  
---

## ❓ Troubleshooting

| Problem | Solution |
|---|---|
| Tab button not showing | Make sure the Custom Tabs plugin is installed and the tab is named exactly `Calender` |
| Popup opens but shows nothing | Check the browser console for errors — ApiClient may not be ready |
| Wrong date range shown | The `Shows/Upcoming` API ignores date parameters — filtering happens client-side |
| Posters not loading | The script uses `SeriesPrimaryImageTag` — make sure your series have poster images in Jellyfin |
| Loading is slow | Normal for large libraries — the script fetches up to 500 items on every open |
| GER / ENG badge missing | Episode has no audio stream metadata yet — will appear once the file is downloaded and scanned |
| Calendar shows old data | Close and reopen the popup — data is fetched fresh on every open |
| Tab appears in wrong position | Make sure the Custom Tab is the last entry in the Custom Tabs plugin list |
| Popup does not close with ESC | Click anywhere on the ✕ button instead — ESC may be captured by Jellyfin in some versions |

---

## 📄 License

**MIT** — Feel free to use, modify, and share!
