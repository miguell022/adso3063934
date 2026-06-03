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


// Dashboard navigation
const navItems = document.querySelectorAll('[data-page]');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;

    if (page) {
      window.location.href = page;
    }
  });
});

// Generations interactions
const generationCards = document.querySelectorAll('.generation-card[data-generation]');
const generationMenus = document.querySelectorAll('.generation-menu');
const generationOptionButtons = document.querySelectorAll('.generation-options button');
const addGenerationBtn = document.querySelector('.add-generation');

generationCards.forEach((card) => {
  card.addEventListener('click', () => {
    const generation = card.dataset.generation;
    window.location.href = `generation-games.html?generation=${generation}`;
  });
});

generationMenus.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const card = button.closest('.generation-card');

    generationCards.forEach((item) => {
      if (item !== card) item.classList.remove('show-options');
    });

    card.classList.toggle('show-options');
  });
});

generationOptionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const action = button.dataset.action;
    const card = button.closest('.generation-card');
    const generation = card.dataset.generation;

    if (action === 'edit') {
      window.location.href = `edit-generation.html?generation=${generation}`;
    }

    if (action === 'delete') {
      card.remove();
    }
  });
});

if (addGenerationBtn) {
  addGenerationBtn.addEventListener('click', () => {
    window.location.href = 'new-generation.html';
  });
}

// Generation games view
const generationGamesList = document.getElementById('generationGamesList');
const generationGamesTitle = document.getElementById('generationGamesTitle');
const generationGamesSubtitle = document.getElementById('generationGamesSubtitle');

if (generationGamesList && generationGamesTitle && generationGamesSubtitle) {
  const params = new URLSearchParams(window.location.search);
  const selectedGeneration = params.get('generation') || '2d';

  const generationLabels = {
    '2d': 'Juegos de la generación 2D',
    '3d': 'Juegos de la generación 3D',
    hd: 'Juegos de la generación HD'
  };

  const generationDescriptions = {
    '2d': 'Conoce los juegos que iniciaron la historia de Grand Theft Auto.',
    '3d': 'Explora los juegos que llevaron GTA a mundos abiertos tridimensionales.',
    hd: 'Recorre la etapa moderna de GTA con ciudades más detalladas e historias cinematográficas.'
  };

  const generationGames = [
    {
      generation: '2d',
      title: 'Grand Theft Auto',
      year: 1997,
      image: 'img/GTA1997.jpg',
      description: 'Videojuego de acción y aventura de mundo abierto desarrollado por DMA Design. Dio origen a una de las franquicias más conocidas de la industria.'
    },
    {
      generation: '2d',
      title: 'Grand Theft Auto 2',
      year: 1999,
      image: 'img/GTA_2.webp',
      description: 'Secuela directa del primer GTA. Conserva la perspectiva aérea clásica y expande la fórmula criminal de la saga.'
    },
    {
      generation: '3d',
      title: 'Grand Theft Auto III',
      year: 2001,
      image: 'img/gtaIII.png',
      description: 'Marcó el salto de GTA a las tres dimensiones con Liberty City como escenario principal y una libertad de exploración mucho mayor.'
    },
    {
      generation: '3d',
      title: 'Grand Theft Auto Vice City',
      year: 2002,
      image: 'img/GTAViceCity.webp',
      description: 'Ambientado en una ciudad inspirada en Miami, sigue el ascenso criminal de Tommy Vercetti en una era de neón y crimen organizado.'
    },
    {
      generation: '3d',
      title: 'Grand Theft Auto San Andreas',
      year: 2004,
      image: 'img/gtaSanAndreas.jpg',
      description: 'Sigue la historia de Carl Johnson en San Andreas, con un mapa amplio, pandillas, personalización y una fuerte identidad urbana.'
    },
    {
      generation: 'hd',
      title: 'Grand Theft Auto IV',
      year: 2008,
      image: 'img/GTA_IV_portada.webp',
      description: 'Presenta una Liberty City más realista y una historia centrada en Niko Bellic, su pasado y su búsqueda de una nueva vida.'
    },
    {
      generation: 'hd',
      title: 'Grand Theft Auto V',
      year: 2013,
      image: 'img/GTA_V.webp',
      description: 'Ambientado en Los Santos, cuenta con tres protagonistas y una de las experiencias de mundo abierto más amplias de la saga.'
    },
    {
      generation: 'hd',
      title: 'Grand Theft Auto Online',
      year: 2013,
      image: 'img/GtaOnline.png',
      description: 'Expande el universo de GTA V con una experiencia multijugador persistente centrada en actividades, golpes y progresión.'
    }
  ];

  const gamesToRender = generationGames.filter((game) => game.generation === selectedGeneration);

  generationGamesTitle.textContent = generationLabels[selectedGeneration] || generationLabels['2d'];
  generationGamesSubtitle.textContent = generationDescriptions[selectedGeneration] || generationDescriptions['2d'];

  generationGamesList.innerHTML = gamesToRender.map((game) => `
    <article class="generation-game-card">
      <h2>[${game.title}]</h2>
      <img src="${game.image}" alt="${game.title}">
      <strong>(${game.year})</strong>
      <p>${game.description}</p>
    </article>
  `).join('');
}
