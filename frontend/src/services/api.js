const API_URL = "http://127.0.0.1:8000";

async function getActivities() {

    const response = await fetch(`${API_URL}/activities`);

    return await response.json();

}

async function createActivity(activity) {

    await fetch(`${API_URL}/activities`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(activity)

    });

}

async function createSession(session) {

    await fetch(`${API_URL}/sessions`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(session)

    });

}

async function getSessions() {

    const response = await fetch(`${API_URL}/sessions`);

    return await response.json();

}


export {
    getActivities,
    createActivity,
    createSession,
    getSessions
};
