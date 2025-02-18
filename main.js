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
let logout = document.querySelector(".logout")

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
    if (user && (user.Email === inputEmailLogin.value && user.Password === inputPasswordLogin.value)) {
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
    messageWelcome.style.opacity = "1";
    messageWelcome.style.transform = "translateY(100px)";
   }
}

//** Logout */
if(logout){
    logout.addEventListener("click",()=>{
        localStorage.removeItem("Credentials");
        window.location.href="login.html"
    })
}

/**CheckAuth */

const checkAuth = ()=>{
    if(!localStorage.getItem("Credentials")){
        window.location.replace("login.html")
    }else{
    document.body.style.display="block"
}
}
//Active Link   

document.addEventListener("DOMContentLoaded",()=>{
    let currentPage = window.location.pathname.split("/").pop();
    let navLinks = document.querySelectorAll(".nav-link");
    console.log();

    navLinks.forEach(link => {
        let linkPage = link.getAttribute("href");

        if(linkPage === currentPage){
            link.classList.add("active")
        }
    });

    if(currentPage === "index.html" || window.location.pathname === "/"  || currentPage === "profile.html" || currentPage === "profile"){
        document.querySelector(".auth").style.display = "none";
        document.querySelector(".divLogout").style.display = "flex";
    }else{
        document.querySelector(".auth").style.display = "flex";
        document.querySelector(".divLogout").style.display = "none";
    }

    if(currentPage === "index.html" || window.location.pathname === "/"  || currentPage === "profile.html" || currentPage === "profile"){
        checkAuth()
    }
})
/** Profile Page */
if(document.querySelector(".loggedInUserData")){
    document.querySelector(".username").innerHTML = `Name: <strong> ${JSON.parse(localStorage.getItem("Credentials")).Name}</strong>`;
    document.querySelector(".emaill").innerHTML = `Email: <strong>${JSON.parse(localStorage.getItem("Credentials")).Email}</strong>`;
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