function saveCycleLength() {
    const cycle = document.getElementById("cycleLength").value;
    if (cycle) {
        localStorage.setItem("cycleLength", cycle);
        alert("Cycle length saved!");
    }
}

function startPeriod() {
    const today = new Date();
    localStorage.setItem("lastPeriodStart", today.toISOString());
    calculateDates(today);
}

function calculateDates(lastStartDate) {
    let cycleLength = localStorage.getItem("cycleLength") || 28;
    cycleLength = parseInt(cycleLength);

    const nextPeriod = new Date(lastStartDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // Ovulation approx 14 days before next period
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(ovulation.getDate() - 14);

    // Fertile window (5 days before ovulation)
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    localStorage.setItem("nextPeriod", nextPeriod.toISOString());
    localStorage.setItem("ovulation", ovulation.toISOString());
    localStorage.setItem("fertileStart", fertileStart.toISOString());

    displayInfo();
}

function displayInfo() {
    const last = localStorage.getItem("lastPeriodStart");
    const next = localStorage.getItem("nextPeriod");
    const ovulation = localStorage.getItem("ovulation");
    const fertileStart = localStorage.getItem("fertileStart");

    if (last && next && ovulation && fertileStart) {
        const today = new Date();
        const nextDate = new Date(next);
        const ovDate = new Date(ovulation);
        const fertileDate = new Date(fertileStart);

        const diffTime = nextDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById("info").innerHTML = `
            <div class="card">
                <p><strong>Last Period:</strong><br>${new Date(last).toDateString()}</p>
                <p><strong>Next Period:</strong><br>${nextDate.toDateString()}</p>
                <p class="countdown">${diffDays} days remaining</p>
                <hr>
                <p><strong>Ovulation Day:</strong><br>${ovDate.toDateString()}</p>
                <p><strong>Fertile Window Starts:</strong><br>${fertileDate.toDateString()}</p>
            </div>
        `;
    }
}

window.onload = displayInfo;
