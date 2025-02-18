let formRegister = document.querySelector(".register-form")
let inputNameRegister = document.querySelector(".register-form .name")
let inputEmailRegister = document.querySelector(".register-form .email")
let inputPasswordRegister = document.querySelector(".register-form .password")
let nameError = document.querySelector(".nameError")
let emailError = document.querySelector(".emailError")
let passwordError = document.querySelector(".passwordError")

let formLogin = document.querySelector(".login-form")
let inputEmailLogin = document.querySelector(".login-form .email")
let inputPasswordLogin = document.querySelector(".login-form .password")
let messageWelcome = document.querySelector(".message-welcome")
let Email = document.querySelector(".Email")

const errorMessages = {
    name: "",
    email: "",
    password: ""
}

const onSubmitRegister = (e) => {
    e.preventDefault()
    //* Validation Inputs Register */
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmailRegister.value)
    if (!inputNameRegister.value.trim() || inputNameRegister.value.length < 3 || inputNameRegister.value.length > 12) {
        errorMessages.name = "Name must be between 3 and 12 characters."
    } else {
        errorMessages.name = ""
    }
    if (!inputEmailRegister.value.trim() || !validEmail) {
        errorMessages.email = "Not a valid Email"
    } else {
        errorMessages.email = ""
    }
    if (!inputPasswordRegister.value.trim() || inputPasswordRegister.value.length < 6 || inputPasswordRegister.value.length > 12) {
        errorMessages.password = "Password must be between 6 and 12 characters."
    } else {
        errorMessages.password = ""
    }
    //* Validation Inputs Register */

    // Error Message
    nameError.innerHTML = errorMessages.name
    emailError.innerHTML = errorMessages.email
    passwordError.innerHTML = errorMessages.password
     // Error Message

    // Save Credentials to Local Storage
    if (!errorMessages.name && !errorMessages.email && !errorMessages.password) {
        const credentialsUser = {
            Name: inputNameRegister.value.trim(),
            Email: inputEmailRegister.value.trim(),
            Password: inputPasswordRegister.value.trim()
        }

        let users = JSON.parse(localStorage.getItem("Credentials")) || []
        console.log("User", users);

        if (users.Email === inputEmailRegister.value) {
            showToastFailed()
        } else {

            localStorage.setItem("Credentials", JSON.stringify(credentialsUser))

            showToastSuccess()
            formRegister.reset()
            setTimeout(() => {
                window.location.href = "login.html"
            }, 1500)
        }

    }
    // Save Credentials to Local Storage and Navigate to Login Page   

}


const onSubmitLogin = (e) => {
    let emailError = document.querySelector(".login-form .emailError")
    let passwordError = document.querySelector(".login-form .passwordError")
    e.preventDefault()
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmailLogin.value)

    if (!inputEmailLogin.value.trim() || !validEmail) {
        errorMessages.email = "Not a Valid Email"
    } else {
        errorMessages.email = ""
    }
    if (!inputPasswordLogin.value.trim() || inputPasswordLogin.value.length < 6 || inputPasswordLogin.value.length > 12) {
        errorMessages.password = "Password must be between 6 and 12 characters."
    } else {
        errorMessages.password = ""
    }
    emailError.innerHTML = errorMessages.email;
    passwordError.innerHTML = errorMessages.password;
    if (errorMessages.email || errorMessages.password) return;

    const user = JSON.parse(localStorage.getItem("Credentials"))
    console.log(user);
    if ((user.Email === inputEmailLogin.value && user.Password === inputPasswordLogin.value)) {
        formLogin.reset()
        showToastSuccessLogin()
        window.location.href = "index.html"
    } else {
        showToastFailedLogin()
    }
}


if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
        onSubmitRegister(e)
    })
}

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        onSubmitLogin(e)
    })
}


if(messageWelcome){
    let userData = JSON.parse(localStorage.getItem("Credentials"));
   if(userData){
    messageWelcome.innerHTML = `Welcome back, <strong>${userData.Name}</strong>!🎉`;
    Email.innerHTML = `Email: <strong>${userData.Email}</strong>`;
    messageWelcome.style.opacity = "1";
    messageWelcome.style.transform = "translateY(20px)";
    Email.style.opacity = "1";
    Email.style.transform = "translateY(20px)";
   }
}

function showToastSuccess() {
    Toastify({
        text: "Account created successfully! Redirecting...",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            backgroundColor: "rgba(0, 0, 177, 0.56)",
            color: "#fff"
        }
    }).showToast();
}

function showToastFailed() {
    Toastify({
        text: "Email already exists. Please use another email.",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "rgba(177, 0, 0, 0.22)",
            color: "red",
        }
    }).showToast();
}



function showToastSuccessLogin() {
    Toastify({
        text: "Login successful! Redirecting...",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            backgroundColor: "rgba(0, 0, 177, 0.56)",
            color: "#fff"
        }
    }).showToast();
}
function showToastFailedLogin() {
    Toastify({
        text: "Invalid email or password!",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "rgba(177, 0, 0, 0.22)",
            color: "red"
        }
    }).showToast();
}