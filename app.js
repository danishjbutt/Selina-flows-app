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
        document.getElementById("info").innerHTML = `
            <p>Last Period: ${new Date(last).toDateString()}</p>
            <p>Next Expected Period: ${new Date(next).toDateString()}</p>
        `;
    }
}

window.onload = displayInfo;
