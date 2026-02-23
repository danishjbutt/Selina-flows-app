function startPeriod() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem("lastPeriodStart", today);
    alert("Period logged for " + today);
}