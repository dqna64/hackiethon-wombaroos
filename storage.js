// LOCAL STORAGE
function getItem(key, defaultValue) {
    let item = localStorage.getItem(key);
    if (item) {
        item = JSON.parse(item);
        return item;
    }
    return defaultValue;
}

function setItem(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

function removeItem(key) {
    localStorage.removeItem(key);
}

// SESSION STORAGE
function getSessionItem(key, defaultValue) {
    let item = sessionStorage.getItem(key);
    if (item) {
        item = JSON.parse(item);
        return item;
    }
    return defaultValue;
}

function setSessionItem(key, value) {
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
}

function removeSessionItem(key) {
    sessionStorage.removeItem(key);
}
