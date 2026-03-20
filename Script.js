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

function countNotes() {
    let amount = +document.getElementById("amount").value;

    if (!amount) {
        document.getElementById("result").innerHTML = "⚠ Enter amount!";
        return;
    }

    let notes = [
        {v:1000,c:+n1000.value||0},
        {v:500,c:+n500.value||0},
        {v:200,c:+n200.value||0},
        {v:100,c:+n100.value||0},
        {v:50,c:+n50.value||0},
        {v:20,c:+n20.value||0},
        {v:10,c:+n10.value||0},
    ];

    let out = "<b>Breakdown:</b><br>";

    notes.forEach(n=>{
        let use = Math.min(Math.floor(amount/n.v), n.c);
        amount -= use*n.v;
        if(use>0) out += `₹${n.v} → ${use}<br>`;
    });

    out += amount>0 ? `<br>❌ Remaining ₹${amount}` : `<br>✅ Done`;

    document.getElementById("result").innerHTML = out;
}