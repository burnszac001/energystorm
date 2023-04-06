let authState = false;

function changeState() {
    const formTitle = document.querySelector("#formTitle");
    const changeBtn = document.querySelector("#changeBtn");
    if (!authState) { 
        formTitle.innerHTML = "Login";
        changeBtn.innerHTML = "Sign up!";
        authState = true;
    } else {
        formTitle.innerHTML = "Register";
        changeBtn.innerHTML = "Already have an account?";
        authState = false;
    }
}


function submitForm() {
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const requestBody = {email: inputEmail.value, password: inputPassword.value};
    if (emailValidated(inputEmail.value)) {
        if (authState) {
            authenticateUser(requestBody, '/auth/login');
        } else {
            authenticateUser(requestBody, '/auth/register');
        }
    } else {
        displayError('Email is invalid.')
    }
    return false;
}

function emailValidated(email) {
    return String(email).toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


async function authenticateUser(requestBody, endpoint) {
    const response = await fetch(endpoint, {
        method: 'POST', 
        body: JSON.stringify(requestBody),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const body = await response.json();
    if (response?.status === 200) {
        window.location.href = '/tracker';
    } else {
        displayError(body.msg)
    }
}

function displayError(message) {
    const errorMsg = document.querySelector("#errorMsg");
    errorMsg.innerHTML = message;
    errorMsg.style.display = "block";
    setTimeout(() => {
        errorMsg.style.display = "none";
    }, 15000);
}
