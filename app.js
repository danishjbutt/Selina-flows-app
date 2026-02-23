function startPeriod() {
    const today = new Date();
    localStorage.setItem("lastPeriodStart", today.toISOString());
    calculateNextPeriod(today);
}

function calculateNextPeriod(lastStartDate) {
    const cycleLength = 28; // default cycle
    const nextPeriod = new Date(lastStartDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    localStorage.setItem("nextPeriod", nextPeriod.toISOString());
    displayInfo();
}

function displayInfo() {
    const last = localStorage.getItem("lastPeriodStart");
    const next = localStorage.getItem("nextPeriod");

    if (last && next) {
        const nextDate = new Date(next);
        const today = new Date();

        const diffTime = nextDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById("info").innerHTML = `
            <div class="card">
                <p><strong>Last Period:</strong><br>${new Date(last).toDateString()}</p>
                <p><strong>Next Expected Period:</strong><br>${nextDate.toDateString()}</p>
                <p class="countdown">${diffDays} days remaining</p>
            </div>
        `;
    }
}

window.onload = displayInfo;
