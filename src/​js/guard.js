// guard.js
function checkUserJourney(requiredRole) {
    const role = sessionStorage.getItem('user_role');
    const steps = JSON.parse(sessionStorage.getItem('steps_taken') || '[]');
    const currentPage = window.location.pathname.split('/').pop();

    // 1. Санҷиши Нақш
    if (role !== requiredRole) {
        console.error("Амният: Нақши нодуруст!");
        window.location.href = '/index.html';
        return;
    }

    // 2. Санҷиши пайдарпаӣ (Масалан, касе наметавонад мустақим ба login.html дарояд)
    if (steps.length === 0) {
        window.location.href = '/index.html';
        return;
    }

    // 3. Илова кардани саҳифаи ҷорӣ ба таърих
    if (!steps.includes(currentPage)) {
        steps.push(currentPage);
        sessionStorage.setItem('steps_taken', JSON.stringify(steps));
    }

    console.log(`Корбар ҳамчун ${role} аз саҳифаҳои зерин гузашт:`, steps);
}

