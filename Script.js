function countNotes() {
    let amount = +document.getElementById("amount").value;

    if (!amount) {
        document.getElementById("result").innerHTML = "⚠ Enter amount!";
        return;
    }

    let notes = [
        { v:1000, c:+document.getElementById("n1000").value || 0 },
        { v:500,  c:+document.getElementById("n500").value || 0 },
        { v:200,  c:+document.getElementById("n200").value || 0 },
        { v:100,  c:+document.getElementById("n100").value || 0 },
        { v:50,   c:+document.getElementById("n50").value || 0 },
        { v:20,   c:+document.getElementById("n20").value || 0 },
        { v:10,   c:+document.getElementById("n10").value || 0 }
    ];

    let output = "<b>Breakdown:</b><br>";

    notes.forEach(n => {
        let use = Math.min(Math.floor(amount / n.v), n.c);
        amount -= use * n.v;

        if (use > 0) {
            output += `₹${n.v} → ${use}<br>`;
        }
    });

    output += amount > 0
        ? `<br>❌ Remaining ₹${amount}`
        : `<br>✅ Done`;

    document.getElementById("result").innerHTML = output;
}
