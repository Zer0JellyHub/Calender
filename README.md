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
| `custom.css` | Stylesheet: Glassmorphism effects, Ultrachromic imports, and icon styling. |
| `README.md` | This documentation. |

---

## ⚠️ Logic & Known Issues

* **Empty Days:** If a specific day (e.g., Thursday) has no scheduled releases in your library, the heading for that day will be hidden.
* **Missing Data:** If the Jellyfin API returns no upcoming items for the entire 7-day window, the calendar will appear empty.
* **API Filtering:** Since some Jellyfin versions handle date parameters inconsistently, the script fetches up to 500 upcoming items and performs client-side filtering for accuracy.
* **Scope:** The tab is designed to appear only on the **Home Screen**. It is intentionally not visible on library sub-pages (Movies/Series).

---

## 📄 License

**MIT** — Feel free to use, modify, and share!
