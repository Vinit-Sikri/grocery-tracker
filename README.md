# 🛒 Grocery Tracker Board

A **React + TypeScript Kanban-style board** to track grocery items — search, add, drag, and manage groceries across stages.

---

## ✨ Features

- 🔍 **Search Food Items** — Fetch food suggestions using the FrontendEval API
- 🧾 **Add Items to Board** — Selected items are added to the **Wishlist** column
- 📋 **Kanban Board Layout** — Three columns: `Wishlist` → `Bought` → `Used`
- 🔀 **Drag and Drop** — Move items across columns using HTML5 Drag and Drop API
- ⬅️ ➡️ **Move via Buttons** — Arrow buttons to move items forward and backward
- 🗑️ **Delete Items** — Remove items from the board instantly
- 💾 **LocalStorage Persistence** — Board state survives page refresh

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | UI and type safety |
| Vite | Build tool and dev server |
| HTML5 Drag and Drop API | Card dragging between columns |
| LocalStorage | State persistence |

---

## 📁 Project Structure

```
src/
├── App.tsx          # Root component and board logic
├── main.tsx         # Entry point
├── index.css        # Global styles
└── assets/          # Static assets
```

---

## 🚀 Installation & Setup

**1. Clone the repository:**

```bash
git clone https://github.com/VInitSikri/grocery-tracker-board.git
cd grocery-tracker-board
```

**2. Install dependencies:**

```bash
npm install
```

**3. Run the development server:**

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔄 How It Works

1. **Search** for a food item using the search bar
2. **Click a suggestion** to add it to the **Wishlist** column
3. **Move items** using:
   - Drag and drop across columns
   - Arrow buttons (← →) to step forward or backward
4. **Delete** any item using the trash icon
5. **Refresh the page** — your board state is preserved via localStorage

---

## 🗺️ Board Flow

```
Wishlist  →  Bought  →  Used
```

---

## 🔮 Future Improvements

- Card reordering within the same column
- Debounced search API calls
- Improved drag-and-drop animations
- Refactored `Column` and `Card` as separate components
- Dark mode support

---

## 👤 Author

**Vinit Sikri**

---

> 💡 **Note:** This project uses the FrontendEval API for food search suggestions. No API key is required.
