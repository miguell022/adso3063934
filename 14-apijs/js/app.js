// All Views (main)
const views = document.querySelectorAll('main');
let currentView = 0 //[0-4]

// Login form (Post)
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log('DATA:', data, 'STATUS:', response.status);

        if (response.ok) {
            Swal.fire({
                title: "Congratulations",
                text: data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 2500
            });
            currentView = 1
            showView()
        } else {
            Swal.fire({
                title: "Watch out",
                text: data.message || 'Error desconocido',
                icon: "error"
            });
        }

    } catch (error) {
        console.error('LOGIN ERROR:', error);
        Swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado. Intenta de nuevo o contacta soporte.",
            icon: "error"
        });
    }

})

//Buttons & anchors
const btnLogin = document.querySelector('.btnLogin');
const btnLogout = document.querySelector('.btnLogout');
const btnAdd = document.querySelector('.btnAdd');
const btnCancels = document.querySelectorAll('.btnCancels');
const btnBack = document.querySelectorAll('.btnBack');
const btnShow = document.querySelectorAll('.btnShow');
const btnEdit = document.querySelectorAll('.btnEdit');
const btnDelete = document.querySelectorAll('.btnDelete');





btnLogin.addEventListener('click', () => {
    currentView = 1
    showView()
})

btnLogout.addEventListener('click', () => {
    currentView = 0
    showView()
})

btnAdd.addEventListener('click', () => {
    currentView = 2
    showView()
})

btnBack.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView()
    })
})

btnShow.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 3
        showView()
    })
})

btnEdit.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 4
        showView()
    })
})

btnCancels.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView()
    })
})



function showView() {
    views.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = 'none';
    })
    views[currentView].classList.add('animateView')
    views[currentView].style.display = 'block';
}

showView();