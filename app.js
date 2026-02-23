function setMode(mode) {
    localStorage.setItem("appMode", mode);
    document.getElementById("onboarding").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    displayInfo();
}

function checkFirstVisit() {
    const mode = localStorage.getItem("appMode");

    if (!mode) {
        document.getElementById("onboarding").style.display = "block";
        document.getElementById("mainApp").style.display = "none";
    } else {
        document.getElementById("onboarding").style.display = "none";
        document.getElementById("mainApp").style.display = "block";
        displayInfo();
    }
}

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

    const pmsStart = new Date(nextPeriod);
    pmsStart.setDate(pmsStart.getDate() - 5);

    const ovulation = new Date(nextPeriod);
    ovulation.setDate(ovulation.getDate() - 14);

    localStorage.setItem("nextPeriod", nextPeriod.toISOString());
    localStorage.setItem("pmsStart", pmsStart.toISOString());
    localStorage.setItem("ovulation", ovulation.toISOString());

    displayInfo();
}

function displayInfo() {
    const mode = localStorage.getItem("appMode");
    const last = localStorage.getItem("lastPeriodStart");
    const next = localStorage.getItem("nextPeriod");
    const pmsStart = localStorage.getItem("pmsStart");
    const ovulation = localStorage.getItem("ovulation");

    if (last && next && pmsStart) {
        const today = new Date();
        const nextDate = new Date(next);
        const pmsDate = new Date(pmsStart);

        const diffTime = nextDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let phaseMessage = "";

        if (today >= pmsDate && today < nextDate) {
            phaseMessage = "You may start feeling PMS symptoms. Be kind to yourself 💕";
        } else if (diffDays <= 2) {
            phaseMessage = "Your period is almost here. Prepare your essentials 🌸";
        } else {
            phaseMessage = "You're in your regular cycle phase ✨";
        }

        let advancedSection = "";

        if (mode === "advanced" && ovulation) {
            advancedSection = `
                <hr>
                <p><strong>Ovulation Day:</strong><br>${new Date(ovulation).toDateString()}</p>
            `;
        }

        document.getElementById("info").innerHTML = `
            <div class="card">
                <p><strong>Last Period:</strong><br>${new Date(last).toDateString()}</p>
                <p><strong>Next Period:</strong><br>${nextDate.toDateString()}</p>
                <p class="countdown">${diffDays} days remaining</p>
                <hr>
                <p>${phaseMessage}</p>
                ${advancedSection}
            </div>
        `;
    }
}

window.onload = checkFirstVisit;
