<div align="center">

  <h1>💰 Currency Counter Pro — INR Cash & Denomination Tallying Tool</h1>

  <p align="center">
    <strong>An intuitive Indian Rupee (INR ₹) currency counter and cash denomination breakdown application engineered for fast cash management and tallying.</strong>
  </p>

  <p align="center">
    <a href="https://singh0883.github.io/Count-Currency/">
      <img src="https://img.shields.io/badge/Live_Demo-🚀-38bdf8?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo">
    </a>
    <a href="https://github.com/SINGH0883/Count-Currency">
      <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    </a>
    <a href="https://github.com/SINGH0883/Count-Currency">
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    </a>
    <a href="https://github.com/SINGH0883/Count-Currency">
      <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    </a>
    <a href="https://github.com/SINGH0883/Count-Currency/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
    </a>
  </p>

</div>

<hr />

## 🌟 Overview

**Currency Counter Pro** is a lightweight, responsive web tool designed to simplify physical cash counting and denomination breakdowns for Indian Rupee (INR ₹) currency. Ideal for retail store owners, bank cashiers, accountants, and personal financial tracking, it provides real-time cash summation and optimal note distribution algorithms.

---

## ⚡ Core Features

* **💵 Real-Time Cash Summation (`calculateTotal`):** 
  * Live total calculation as note counts are typed for **₹1000**, **₹500**, **₹200**, **₹100**, **₹50**, **₹20**, and **₹10** denominations.
  * Auto-formats currency totals with Indian numbering standards (e.g., `💰 ₹1,50,000`).
* **🧮 Optimal Denomination Breakdown (`countNotes`):** 
  * Greedy breakdown algorithm that calculates the minimal number of physical bank notes required to pay out any target amount.
  * Handles remaining change warnings and validation safeguards.
* **📱 Floating Labels & Responsive Card Layout:** 
  * Card-based input grid designed for high-speed keypad entry on desktop and mobile viewports.
* **🚀 Zero-Dependency Static Deployment:** 
  * Built with pure HTML5, CSS3, and Vanilla JavaScript for instant loading without external frameworks.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Layout** | HTML5 Semantic Template |
| **Styling & CSS** | Custom CSS3, Flexbox Layouts, Floating Label Transitions |
| **Calculation Engine**| Vanilla JavaScript (ES6+ Array Iteration & String Formatting) |
| **Hosting** | GitHub Pages Static Web Hosting |

---

## 📂 Project Architecture

```
Count-Currency/
├── index.html          # Main HTML structure & denomination input form
├── style.css           # Modern card layout, input boxes, & button styling
├── Script.js           # Live tallying & greedy denomination algorithm
└── README.md           # Project documentation & live links
```

---

## 🚀 Getting Started

### Option 1: Live Web App
Access the live application directly in your browser:  
🔗 **[https://singh0883.github.io/Count-Currency/](https://singh0883.github.io/Count-Currency/)**

### Option 2: Local Setup
To run the application locally on your computer:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SINGH0883/Count-Currency.git
   cd Count-Currency
   ```

2. **Open in browser:**
   Double-click `index.html` or open it with Live Server in VS Code.

---

## 💡 How to Use

1. **Calculate Total Cash from Physical Notes:**
   * Enter the quantity of physical notes you hold next to each denomination card (₹500, ₹200, ₹100, etc.).
   * The total cash value updates automatically at the bottom (`💰 ₹X,XXX`).

2. **Get Recommended Note Breakdown for an Amount:**
   * Enter a target amount in the **"Enter Amount"** input field.
   * Click **"Breakdown"** to view the exact count of each note denomination required.

---

## 📬 Author & Community

**Yuvraj Singh** — *AI & Data Science Engineer \| Full-Stack Developer*

* 🌐 **GitHub:** [@SINGH0883](https://github.com/SINGH0883)
* 💼 **LinkedIn:** [Yuvraj Singh](https://www.linkedin.com/in/yuvraj-singh-85abc)
* 📧 **Email:** [yuvraj001@zohomail.in](mailto:yuvraj001@zohomail.in)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
