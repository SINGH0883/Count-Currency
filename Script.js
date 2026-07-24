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

// Render Note Input Cards based on active currency
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

// Calculate Total Cash Value & Display English Words
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

// Convert Number to English Words
function numberToWords(num, currencyName = "Rupees") {
    if (num === 0) return `Zero ${currencyName} Only`;

    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (currentCurrencyKey === 'INR') {
        // Indian Numbering System (Lakhs, Crores)
        function inWordsINR(n) {
            if ((n = n.toString()).length > 9) return 'Overflow';
            let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n_array) return '';
            let str = '';
            str += (n_array[1] != 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
            str += (n_array[2] != 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
            str += (n_array[3] != 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
            str += (n_array[4] != 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
            str += (n_array[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) : '';
            return str.trim();
        }
        return inWordsINR(num) + ` ${currencyName} Only`;
    } else {
        // Western Numbering System (Millions, Thousands)
        function inWordsWestern(n) {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : ' ');
            if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? inWordsWestern(n % 100) : '');
            if (n < 1000000) return inWordsWestern(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? inWordsWestern(n % 1000) : '');
            if (n < 1000000000) return inWordsWestern(Math.floor(n / 1000000)) + 'Million ' + (n % 1000000 !== 0 ? inWordsWestern(n % 1000000) : '');
            return 'Overflow';
        }
        return inWordsWestern(num).trim() + ` ${currencyName} Only`;
    }
}

// Greedy Denomination Breakdown Algorithm for Target Amount
function countNotes() {
    const amountInput = document.getElementById("amount");
    let amount = amountInput ? parseInt(amountInput.value) : 0;
    const resultElement = document.getElementById("result");

    if (!amount || amount <= 0) {
        if (resultElement) resultElement.innerHTML = "⚠ Enter a valid amount to breakdown!";
        return;
    }

    const curr = currencies[currentCurrencyKey];
    let remaining = amount;
    let output = `<b>Recommended ${curr.name} Breakdown:</b><br>`;

    curr.notes.forEach(note => {
        const count = Math.floor(remaining / note);
        remaining %= note;

        if (count > 0) {
            output += `${curr.symbol}${note} → <b>${count}</b> notes<br>`;
        }
    });

    if (remaining > 0) {
        output += `<br>⚠ Remaining balance: ${curr.symbol}${remaining}`;
    } else {
        output += `<br>✅ Complete Breakdown`;
    }

    if (resultElement) resultElement.innerHTML = output;

    // Set Words for Target Amount
    const wordsElement = document.getElementById("wordsResult");
    if (wordsElement) {
        wordsElement.textContent = numberToWords(amount, curr.name);
    }
}

// Reset All Inputs & Results
function resetAll() {
    const amountInput = document.getElementById("amount");
    if (amountInput) amountInput.value = "";

    const resultElement = document.getElementById("result");
    if (resultElement) resultElement.innerHTML = "";

    const curr = currencies[currentCurrencyKey];
    curr.notes.forEach(note => {
        const input = document.getElementById(`n${note}`);
        if (input) input.value = "";
    });

    calculateTotal();
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    renderNoteGrid();
});
