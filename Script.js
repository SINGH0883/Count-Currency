// 🔹 TOTAL (uses available notes)
function calculateTotal() {
    let n1000 = +document.getElementById("n1000").value || 0;
    let n500  = +document.getElementById("n500").value || 0;
    let n200  = +document.getElementById("n200").value || 0;
    let n100  = +document.getElementById("n100").value || 0;
    let n50   = +document.getElementById("n50").value || 0;
    let n20   = +document.getElementById("n20").value || 0;
    let n10   = +document.getElementById("n10").value || 0;

    let total =
        n1000*1000 + n500*500 + n200*200 +
        n100*100 + n50*50 + n20*20 + n10*10;

    document.getElementById("total").innerHTML =
        "💰 ₹" + total.toLocaleString();
}


// 🔹 BREAKDOWN (UNLIMITED notes ✅)
function countNotes() {
    let amount = +document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        document.getElementById("result").innerHTML = "⚠ Enter valid amount!";
        return;
    }

    let notes = [1000, 500, 200, 100, 50, 20, 10];

    let output = "<b>Breakdown (Unlimited Notes):</b><br>";

    for (let i = 0; i < notes.length; i++) {
        let count = Math.floor(amount / notes[i]);
        amount %= notes[i];

        if (count > 0) {
            output += `₹${notes[i]} → ${count} notes<br>`;
        }
    }

    if (amount > 0) {
        output += `<br>⚠ Remaining: ₹${amount}`;
    } else {
        output += `<br>✅ Done`;
    }

    document.getElementById("result").innerHTML = output;
}
