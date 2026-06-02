// Navegación compartida
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    window.location.href = 'register.html';
  });
}

// Welcome
const gameImage = document.getElementById('gameImage');
const gameTitle = document.getElementById('gameTitle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.getElementById('dots');

if (gameImage && gameTitle && prevBtn && nextBtn && dots) {
  const games = [
    {
      title: 'GTA San Andreas',
      image: 'img/gtaSanAndreas.jpg'
    },
    {
      title: 'GTA Vice City',
      image: 'img/GTAViceCity.webp'
    },
    {
      title: 'GTA IV',
      image: 'img/GTA_IV_portada.webp'
    },
    {
      title: 'GTA V',
      image: 'img/GTA_V.webp'
    },
    {
      title: 'GTA 2',
      image: 'img/GTA_2.webp'
    },
    {
      title: 'GTA 1997',
      image: 'img/GTA1997.jpg'
    }
  ];

  let currentIndex = 0;
  let isChanging = false;

  function updateDots() {
    const dotItems = dots.querySelectorAll('span');

    dotItems.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateGameContent() {
    const game = games[currentIndex];

    gameImage.src = game.image;
    gameImage.alt = game.title;
    gameTitle.textContent = game.title;
    updateDots();
  }

  function renderGame(animate = false) {
    if (!animate) {
      updateGameContent();
      return;
    }

    isChanging = true;
    gameImage.classList.add('is-changing');
    gameTitle.classList.add('is-changing');

    setTimeout(() => {
      updateGameContent();
      gameImage.classList.remove('is-changing');
      gameTitle.classList.remove('is-changing');
      isChanging = false;
    }, 180);
  }

  function createDots() {
    dots.innerHTML = '';

    games.forEach((game, index) => {
      const dot = document.createElement('span');
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Ver ${game.title}`);

      dot.addEventListener('click', () => {
        if (index === currentIndex || isChanging) return;
        currentIndex = index;
        renderGame(true);
      });

      dots.appendChild(dot);
    });
  }

  nextBtn.addEventListener('click', () => {
    if (isChanging) return;
    currentIndex = (currentIndex + 1) % games.length;
    renderGame(true);
  });

  prevBtn.addEventListener('click', () => {
    if (isChanging) return;
    currentIndex = (currentIndex - 1 + games.length) % games.length;
    renderGame(true);
  });

  createDots();
  renderGame();
}

// Login
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

if (loginForm && passwordInput && togglePassword) {
  const eyeIcon = togglePassword.querySelector('i');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'dashboard.html';
  });

  togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';

    passwordInput.type = isHidden ? 'text' : 'password';
    eyeIcon.className = isHidden ? 'ph ph-eye-slash' : 'ph ph-eye';
    togglePassword.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });
}

// Register
const registerForm = document.getElementById('registerForm');
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

if (registerForm && daySelect && monthSelect && yearSelect) {
  for (let day = 1; day <= 31; day++) {
    daySelect.innerHTML += `<option value="${day}">${day}</option>`;
  }

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  months.forEach((month, index) => {
    monthSelect.innerHTML += `<option value="${index + 1}">${month}</option>`;
  });

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1950; year--) {
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  }

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

