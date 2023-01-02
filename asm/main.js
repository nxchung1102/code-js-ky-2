const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const samll = formControl.querySelector("small");
    samll.innerText = message;
};
const showSucess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}


const checkRequired = (inputArr) => {
    let isRequired = false;
    //gọi vòng lặp để gán cho mảng 
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getFildName(input)} is required`);
            isRequired = true;
        } else {
            showSucess(input);
        }
    })
    return isRequired
}
function getFildName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFildName(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${getFildName(input)} must be less than ${max} characters`);
    }
    else {
        showSucess(input);
    }
}
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSucess(input);
    }
    else {
        showError(input, "Email is not valid")
    }
}

const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, "passwords do not match")
    }
}
//truyền e vào + preventDefault để dừng sự kiện
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!checkRequired([username, password, password2, email])) {
        checkLength(username, 3, 250);
        checkLength(password, 6, 250);
        checkEmail(email);
        checkPasswordsMatch(password, password2);
    }
})