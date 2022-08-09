const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');

function login(e){
    e.preventDefault();

    let username = document.getElementById('log-username');
    let password = document.getElementById('log-password');

    let loggingIn = {
        username: username.value,
        password: password.value
    }

    axios.post('/api/login', loggingIn).then(res => {
        // Insert local storage code below
        console.log(res.data)
       localStorage.setItem('user', JSON.stringify(res.data))
        
        location.href = '/home'
    }).catch((err) =>{
        let message = document.querySelector('#register-h4');
        message.textContent = err.response.data;
    })
}

function register(e){
    e.preventDefault()

    let username = document.getElementById('reg-username');
    let email = document.getElementById('reg-email');
    let password = document.getElementById('reg-password');

    let newUser = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    axios.post('/api/register', newUser).then(res => {
        let message = document.querySelector('#register-h4');
        message.textContent = res.data;

        username.value = '';
        email.value = '';
        password.value = '';
    })
}

registrationForm.addEventListener('submit',register);
loginForm.addEventListener('submit',login);

