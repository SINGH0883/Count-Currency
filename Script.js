// Currency Configuration & Denomination Sets
const currencies = {
    INR: {
        symbol: '₹',
        name: 'Rupees',
        notes: [2000, 500, 200, 100, 50, 20, 10]
    },
    USD: {
        symbol: '$',
        name: 'Dollars',
        notes: [100, 50, 20, 10, 5, 2, 1]
    },
    EUR: {
        symbol: '€',
        name: 'Euros',
        notes: [500, 200, 100, 50, 20, 10, 5]
    }
};

let currentCurrencyKey = 'INR';

// Change Color Theme
function changeTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('count_currency_theme', themeName);
}

// Load Saved Theme Preference
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('count_currency_theme') || 'cyberpunk';
    document.body.setAttribute('data-theme', savedTheme);

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = savedTheme;
}

// Render Note Input Cards based on active currency (Type 1 Panel)
function renderNoteGrid() {
    const grid = document.getElementById('notesGrid');
    if (!grid) return;

    const curr = currencies[currentCurrencyKey];
    grid.innerHTML = '';

    curr.notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <span>${curr.symbol}${note}</span>
            <input type="number" id="n${note}" min="0" placeholder="0" oninput="calculateTotal()">
        `;
        grid.appendChild(card);
    });

    calculateTotal();
    countNotes();
}

// Set Active Currency Mode
function setCurrency(key) {
    if (!currencies[key]) return;
    currentCurrencyKey = key;

    document.querySelectorAll('.curr-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`curr${key}`);
    if (activeBtn) activeBtn.classList.add('active');

    renderNoteGrid();
}

// Type 1: Calculate Physical Cash Total & English Words
function calculateTotal() {
    const curr = currencies[currentCurrencyKey];
    let total = 0;

    curr.notes.forEach(note => {
        const input = document.getElementById(`n${note}`);
        const count = input ? parseInt(input.value) || 0 : 0;
        total += count * note;
    });

    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.innerHTML = `💰 ${curr.symbol}${total.toLocaleString()}`;
    }

    const wordsElement = document.getElementById("wordsResult");
    if (wordsElement) {
        wordsElement.textContent = numberToWords(total, curr.name);
    }
}

// Convert Number to English Words (Unrestricted Precision - No Overflow)
function numberToWords(num, currencyName = "Rupees") {
    if (!num || num === 0) return `Zero ${currencyName} Only`;

    // Handle large numbers cleanly using BigInt if passed as string/big number
    try {
        if (typeof num === 'string') {
            num = parseFloat(num) || 0;
        }
    } catch(e) {}

    if (num <= 0) return `Zero ${currencyName} Only`;

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertBelowThousand(n) {
        n = Math.floor(n);
        let str = '';
        if (n >= 100) {
            str += ones[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 20) {
            str += tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '') + ' ';
        } else if (n > 0) {
            str += ones[n] + ' ';
        }
        return str;
    }

    if (currentCurrencyKey === 'INR') {
        // Recursive Indian Numbering System (Crore, Lakh, Thousand, Hundred)
        function inWordsINR(n) {
            if (n <= 0) return '';
            let str = '';

            if (n >= 10000000) { // 1 Crore = 10,000,000
                str += inWordsINR(Math.floor(n / 10000000)) + 'Crore ';
                n %= 10000000;
            }
            if (n >= 100000) { // 1 Lakh = 100,000
                str += convertBelowThousand(Math.floor(n / 100000)) + 'Lakh ';
                n %= 100000;
            }
            if (n >= 1000) { // 1 Thousand
                str += convertBelowThousand(Math.floor(n / 1000)) + 'Thousand ';
                n %= 1000;
            }
            if (n > 0) {
                str += convertBelowThousand(n);
            }
            return str;
        }
        return (inWordsINR(num).trim() || 'Zero') + ` ${currencyName} Only`;
    } else {
        // Recursive Western Numbering System (Trillion, Billion, Million, Thousand)
        function inWordsWestern(n) {
            if (n <= 0) return '';
            let str = '';

            if (n >= 1000000000000) {
                str += inWordsWestern(Math.floor(n / 1000000000000)) + 'Trillion ';
                n %= 1000000000000;
            }
            if (n >= 1000000000) {
                str += inWordsWestern(Math.floor(n / 1000000000)) + 'Billion ';
                n %= 1000000000;
            }
            if (n >= 1000000) {
                str += inWordsWestern(Math.floor(n / 1000000)) + 'Million ';
                n %= 1000000;
            }
            if (n >= 1000) {
                str += convertBelowThousand(Math.floor(n / 1000)) + 'Thousand ';
                n %= 1000;
            }
            if (n > 0) {
                str += convertBelowThousand(n);
            }
            return str;
        }
        return (inWordsWestern(num).trim() || 'Zero') + ` ${currencyName} Only`;
    }
}

// Type 2: Target Amount Breakdown Algorithm & Words Display
function countNotes() {
    const amountInput = document.getElementById("amount");
    const rawVal = amountInput ? amountInput.value.trim() : "";
    let amount = rawVal ? parseFloat(rawVal) || 0 : 0;
    
    const resultElement = document.getElementById("result");
    const curr = currencies[currentCurrencyKey];

    const breakdownTotalElement = document.getElementById("breakdownTotal");
    if (breakdownTotalElement) {
        breakdownTotalElement.innerHTML = `🎯 ${curr.symbol}${amount > 0 ? amount.toLocaleString() : 0}`;
    }

    const breakdownWordsElement = document.getElementById("breakdownWords");
    if (breakdownWordsElement) {
        breakdownWordsElement.textContent = numberToWords(amount, curr.name);
    }

    if (!amount || amount <= 0) {
        if (resultElement) resultElement.innerHTML = "<span class='muted-hint'>Enter a target amount above to generate optimal note breakdown.</span>";
        return;
    }

    let remaining = amount;
    let output = `<b>Recommended ${curr.name} Breakdown:</b><br>`;

    curr.notes.forEach(note => {
        const count = Math.floor(remaining / note);
        remaining %= note;

        if (count > 0) {
            output += `${curr.symbol}${note} → <b>${count.toLocaleString()}</b> notes<br>`;
        }
    });

    if (remaining > 0) {
        output += `<br>⚠ Remaining balance: ${curr.symbol}${remaining.toLocaleString()}`;
    } else {
        output += `<br>✅ Complete Breakdown`;
    }

    if (resultElement) resultElement.innerHTML = output;
}

// Reset Type 1 Physical Notes
function resetPhysicalNotes() {
    const curr = currencies[currentCurrencyKey];
    curr.notes.forEach(note => {
        const input = document.getElementById(`n${note}`);
        if (input) input.value = "";
    });
    calculateTotal();
}

// Reset Type 2 Target Breakdown
function resetBreakdown() {
    const amountInput = document.getElementById("amount");
    if (amountInput) amountInput.value = "";
    countNotes();
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    loadSavedTheme();
    renderNoteGrid();
});
