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
    hd: 'Juegos de la generación HD',
    modern: 'Juegos de la era moderna'
  };

  const generationDescriptions = {
    '2d': 'Conoce los juegos que iniciaron la historia de Grand Theft Auto.',
    '3d': 'Explora los juegos que llevaron GTA a mundos abiertos tridimensionales.',
    hd: 'Recorre la etapa HD de GTA con ciudades más detalladas e historias cinematográficas.',
    modern: 'Explora la nueva etapa de Grand Theft Auto y sus próximas entregas.'
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
    },
    {
      generation: 'modern',
      title: 'Grand Theft Auto VI',
      year: 2026,
      image: 'img/GTA_VI_portada.webp',
      description: 'La próxima entrega de la saga Grand Theft Auto, prometiendo una experiencia de mundo abierto aún más avanzada.'
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



// Generation create/edit forms
const generationFormData = {
  '2d': {
    name: 'Generación 2D',
    years: '1997 - 1999',
    consoles: 'PC, PlayStation, Game Boy Color',
    description: 'Los primeros pasos de una leyenda, vista cenital y acción arcade sin límites.',
    image: 'img/Era2D.png'
  },
  '3d': {
    name: 'Generación 3D',
    years: '2001 - 2012',
    consoles: 'PS2, Xbox, PC, PSP',
    description: 'El salto a las tres dimensiones, mundos abiertos más grandes, historias profundas y libertad total.',
    image: 'img/Era3D.png'
  },
  hd: {
    name: 'Generación HD',
    years: '2013 - 2020',
    consoles: 'PS3, PS4, Xbox 360, Xbox One, PC',
    description: 'El salto a la definición HD marcó ciudades más vivas, físicas cinematográficas y un nivel de detalle superior.',
    image: 'img/EraHD.png'
  },
  modern: {
    name: 'Era Moderna',
    years: '2025 - Futuro',
    consoles: 'PS5, Xbox Series X/S',
    description: 'El futuro de la franquicia, nuevas ciudades, más detalle visual y una experiencia de mundo abierto más ambiciosa.',
    image: 'img/EraModerna.png'
  }
};

function connectGenerationPreview(fileInputId, previewTargetId) {
  const fileInput = document.getElementById(fileInputId);
  const previewTarget = document.getElementById(previewTargetId);

  if (!fileInput || !previewTarget) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    previewTarget.src = URL.createObjectURL(file);
  });
}

const newGenerationForm = document.getElementById('newGenerationForm');

if (newGenerationForm) {
  newGenerationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'generations.html';
  });
}

const editGenerationForm = document.getElementById('editGenerationForm');
const editGenerationTitle = document.getElementById('editGenerationTitle');
const generationPreview = document.getElementById('generationPreview');
const editGenerationName = document.getElementById('editGenerationName');
const editGenerationYears = document.getElementById('editGenerationYears');
const editGenerationConsoles = document.getElementById('editGenerationConsoles');
const editGenerationDescription = document.getElementById('editGenerationDescription');

if (editGenerationForm) {
  const params = new URLSearchParams(window.location.search);
  const selectedGeneration = params.get('generation') || '2d';
  const generationData = generationFormData[selectedGeneration] || generationFormData['2d'];

  editGenerationTitle.textContent = 'Editar generación';
  generationPreview.src = generationData.image;
  generationPreview.alt = generationData.name;
  editGenerationName.value = generationData.name;
  editGenerationYears.value = generationData.years;
  editGenerationConsoles.value = generationData.consoles;
  editGenerationDescription.value = generationData.description;

  editGenerationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'generations.html';
  });
}

connectGenerationPreview('editGenerationImage', 'generationPreview');

// Profile section
const logoutBtn = document.getElementById('logoutBtn');
const editProfileForm = document.getElementById('editProfileForm');
const profileImage = document.getElementById('profileImage');
const profilePreview = document.getElementById('profilePreview');
const changePasswordForm = document.getElementById('changePasswordForm');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

if (profileImage && profilePreview) {
  profileImage.addEventListener('change', () => {
    const file = profileImage.files[0];
    if (!file) return;

    profilePreview.src = URL.createObjectURL(file);
  });
}

if (editProfileForm) {
  editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'profile.html';
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'profile.html';
  });
}

// Games section
const gtaGamesData = [
  {
    id: 'gta-1997',
    title: 'Grand Theft Auto',
    year: '1997',
    generation: '2d',
    generationLabel: 'Era 2D',
    image: 'img/GTA1997.jpg',
    hero: 'img/gta_imagen_ancha.webp',
    description: 'El jugador asume el rol de un criminal que escala en el hampa completando misiones para jefes de la mafia, robando vehículos y causando caos absoluto en tres ciudades: Liberty City, Vice City y San Andreas.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps1'],
    platformsText: 'PS1',
    city: 'Vice City',
    characters: 'Son demasiados',
    release: 'En el 97'
  },
  {
    id: 'gta-london',
    title: 'Grand Theft Auto London 1969',
    year: '1999',
    generation: '2d',
    generationLabel: 'Era 2D',
    image: 'img/Gta_London.jpg',
    hero: 'img/Gta_London.jpg',
    description: 'Primera expansión oficial del Grand Theft Auto original, ambientada en el Londres de finales de los 60.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps1'],
    platformsText: 'PC / PS1',
    city: 'London',
    characters: 'Varios',
    release: '1999'
  },
  {
    id: 'gta-2',
    title: 'Grand Theft Auto II',
    year: '1999',
    generation: '2d',
    generationLabel: 'Era 2D',
    image: 'img/GTA_2.webp',
    hero: 'img/GTA_2.webp',
    description: 'Ambientado en la metrópolis retrofuturista de Anywhere City, controla al criminal Claude Speed en misiones para bandas mafiosas mientras siembra el caos.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps1'],
    platformsText: 'PC / PS1',
    city: 'Anywhere City',
    characters: 'Claude Speed',
    release: '1999'
  },
  {
    id: 'gta-iii',
    title: 'Grand Theft Auto III',
    year: '2001',
    generation: '3d',
    generationLabel: 'Era 3D',
    image: 'img/gtaIII.png',
    hero: 'img/gtaIII.png',
    description: 'Claude llega a Liberty City en una entrega que marcó el salto de la saga a mundos abiertos tridimensionales.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps2', 'xbox'],
    platformsText: 'PS2 / Xbox / PC',
    city: 'Liberty City',
    characters: 'Claude',
    release: '2001'
  },
  {
    id: 'gta-vc',
    title: 'Grand Theft Auto Vice City',
    year: '2002',
    generation: '3d',
    generationLabel: 'Era 3D',
    image: 'img/GTAViceCity.webp',
    hero: 'img/gtaViceCity.png',
    description: 'Tommy Vercetti llega a Vice City para construir un imperio criminal entre neón, traiciones y negocios peligrosos.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps2', 'xbox'],
    platformsText: 'PS2 / Xbox / PC',
    city: 'Vice City',
    characters: 'Tommy Vercetti',
    release: '2002'
  },
  {
    id: 'gta-sa',
    title: 'Grand Theft Auto San Andreas',
    year: '2004',
    generation: '3d',
    generationLabel: 'Era 3D',
    image: 'img/gtaSanAndreas.jpg',
    hero: 'img/gtaSanAndreas.jpg',
    description: 'Carl Johnson vuelve a Los Santos y queda atrapado entre pandillas, corrupción y una historia familiar marcada por la calle.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps2', 'xbox'],
    platformsText: 'PS2 / Xbox / PC',
    city: 'Los Santos',
    characters: 'CJ',
    release: '2004'
  },
  {
    id: 'gta-lcs',
    title: 'Grand Theft Auto Liberty City Stories',
    year: '2005',
    generation: '3d',
    generationLabel: 'Era 3D',
    image: 'img/GtaLibertyCity.png',
    hero: 'img/GtaLibertyCity.png',
    description: 'Toni Cipriani regresa a Liberty City en una historia conectada con el universo 3D de la saga.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['ps2'],
    platformsText: 'PSP / PS2',
    city: 'Liberty City',
    characters: 'Toni Cipriani',
    release: '2005'
  },
  {
    id: 'gta-vcs',
    title: 'Grand Theft Auto Vice City Stories',
    year: '2006',
    generation: '3d',
    generationLabel: 'Era 3D',
    image: 'img/GtaViceCityStories.png',
    hero: 'img/GtaViceCityStories.png',
    description: 'Victor Vance protagoniza una historia previa a Vice City, con negocios criminales y conflictos familiares.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['ps2'],
    platformsText: 'PSP / PS2',
    city: 'Vice City',
    characters: 'Victor Vance',
    release: '2006'
  },
  {
    id: 'gta-iv',
    title: 'Grand Theft Auto IV',
    year: '2008',
    generation: 'hd',
    generationLabel: 'Era HD',
    image: 'img/GTA_IV_portada.webp',
    hero: 'img/gtaIV.png',
    description: 'Niko Bellic llega a Liberty City buscando una nueva vida, pero encuentra deudas, crimen y decisiones difíciles.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps3', 'xbox360'],
    platformsText: 'PS3 / Xbox 360 / PC',
    city: 'Liberty City',
    characters: 'Niko Bellic',
    release: '2008'
  },
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V',
    year: '2013',
    generation: 'hd',
    generationLabel: 'Era HD',
    image: 'img/GTA_V.webp',
    hero: 'img/gtaV.png',
    description: 'Tres protagonistas cruzan sus vidas en Los Santos con golpes, persecuciones y un mundo abierto enorme.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['pc', 'ps3', 'xbox360'],
    platformsText: 'PS3 / Xbox 360 / PC',
    city: 'Los Santos',
    characters: 'Michael, Franklin y Trevor',
    release: '2013'
  },
  {
    id: 'gta-online',
    title: 'Grand Theft Auto Online',
    year: '2013',
    generation: 'hd',
    generationLabel: 'Era HD',
    image: 'img/GtaOnline.png',
    hero: 'img/GtaOnline.png',
    description: 'Experiencia multijugador persistente basada en Los Santos, con golpes, actividades, negocios y progresión online.',
    genre: 'Acción/Aventura Online',
    developer: 'Rockstar',
    platforms: ['pc', 'ps3', 'xbox360'],
    platformsText: 'PS3 / Xbox 360 / PC',
    city: 'Los Santos',
    characters: 'Jugador Online',
    release: '2013'
  },
  {
    id: 'gta-vi',
    title: 'Grand Theft Auto VI',
    year: '2026',
    generation: 'modern',
    generationLabel: 'Moderna',
    image: 'img/GTA_VI_portada.webp',
    hero: 'img/GtaVI.png',
    description: 'La próxima entrega principal de Grand Theft Auto, ambientada en Leonida y Vice City para abrir una nueva etapa de la saga.',
    genre: 'Acción/Aventura',
    developer: 'Rockstar',
    platforms: ['ps5'],
    platformsText: 'PS5 / Xbox Series X/S',
    city: 'Vice City',
    characters: 'Lucia y Jason',
    release: '2026'
  }
];

function getSelectedGame() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('game') || 'gta-1997';
  return gtaGamesData.find((game) => game.id === gameId) || gtaGamesData[0];
}

function getGameInfoRows(game, editable = false) {
  const rows = [
    ['ph-globe', 'Género', game.genre],
    ['ph-dev-to-logo', 'Desarrollador', game.developer],
    ['ph-monitor', 'Plataformas', game.platformsText],
    ['ph-crosshair', 'Ciudad principal', game.city],
    ['ph-person-simple-run', 'Personajes', game.characters],
    ['ph-calendar', 'Lanzamiento', game.release]
  ];

  return rows.map(([icon, label, value]) => `
    <div class="game-info-row">
      <i class="ph ${icon}"></i>
      <strong>${label}</strong>
      ${editable ? `<input type="text" value="${value}"> <i class="ph ph-pencil-simple"></i>` : `<span>${value}</span>`}
    </div>
  `).join('');
}

const gamesList = document.getElementById('gamesList');
const gameSearch = document.getElementById('gameSearch');
const gameChips = document.querySelectorAll('.game-chip');
const openGameFilters = document.getElementById('openGameFilters');
const closeGameFilters = document.getElementById('closeGameFilters');
const gameFiltersPanel = document.getElementById('gameFiltersPanel');
const applyGameFilters = document.getElementById('applyGameFilters');
const clearGameFilters = document.getElementById('clearGameFilters');
let activeGameGeneration = 'all';

function renderGames() {
  if (!gamesList) return;

  const searchTerm = (gameSearch?.value || '').toLowerCase();
  const selectedPlatforms = [...document.querySelectorAll('input[name="filterPlatform"]:checked')].map((input) => input.value);

  const filteredGames = gtaGamesData.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm);
    const matchesGeneration = activeGameGeneration === 'all' || game.generation === activeGameGeneration;
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.some((platform) => game.platforms.includes(platform));

    return matchesSearch && matchesGeneration && matchesPlatform;
  });

  gamesList.innerHTML = filteredGames.map((game) => `
    <article class="game-card game-card-${game.generation}" data-game="${game.id}">
      <img src="${game.image}" alt="${game.title}">
      <div>
        <h2>${game.title}</h2>
        <span class="game-card-year">${game.year}</span>
        <p>${game.description}</p>
      </div>
      <span class="game-card-arrow"><i class="ph ph-caret-right"></i></span>
    </article>
  `).join('');

  document.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = `game-detail.html?game=${card.dataset.game}`;
    });
  });
}

if (gamesList) {
  renderGames();

  gameSearch?.addEventListener('input', renderGames);

  gameChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeGameGeneration = chip.dataset.generation;
      gameChips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      renderGames();
    });
  });

  openGameFilters?.addEventListener('click', () => gameFiltersPanel.classList.add('is-open'));
  closeGameFilters?.addEventListener('click', () => gameFiltersPanel.classList.remove('is-open'));

  applyGameFilters?.addEventListener('click', () => {
    const generationInput = document.querySelector('input[name="filterGeneration"]:checked');
    activeGameGeneration = generationInput?.value || 'all';
    gameChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.generation === activeGameGeneration));
    renderGames();
    gameFiltersPanel.classList.remove('is-open');
  });

  clearGameFilters?.addEventListener('click', () => {
    activeGameGeneration = 'all';
    document.querySelector('input[name="filterGeneration"][value="all"]').checked = true;
    document.querySelectorAll('input[name="filterPlatform"]').forEach((input) => input.checked = false);
    gameChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.generation === 'all'));
    renderGames();
  });
}

const gameDetailContent = document.getElementById('gameDetailContent');
const gameDetailMenuBtn = document.getElementById('gameDetailMenuBtn');
const gameDetailOptions = document.getElementById('gameDetailOptions');

if (gameDetailContent) {
  const game = getSelectedGame();

  gameDetailContent.innerHTML = `
    <div class="game-hero-image"><img src="${game.hero}" alt="${game.title}"></div>
    <div class="game-detail-topline">
      <h1 class="game-detail-name">${game.title}</h1>
      <span class="game-generation-badge chip-${game.generation}">${game.generationLabel}</span>
    </div>
    <span class="game-detail-year">${game.year}</span>
    <section class="game-description-box">
      <h2 class="font-pricedown">Descripción</h2>
      <p>${game.description}</p>
    </section>
    <section class="game-info-table">${getGameInfoRows(game)}</section>
  `;

  gameDetailMenuBtn?.addEventListener('click', () => gameDetailOptions.classList.toggle('is-open'));

  gameDetailOptions?.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.gameAction === 'edit') {
        window.location.href = `edit-game.html?game=${game.id}`;
      }
      if (button.dataset.gameAction === 'delete') {
        window.location.href = 'games.html';
      }
    });
  });
}

const editGameForm = document.getElementById('editGameForm');
const editGamePreview = document.getElementById('editGamePreview');
const editGameImage = document.getElementById('editGameImage');
const editGameTitle = document.getElementById('editGameTitle');
const editGameYear = document.getElementById('editGameYear');
const editGameGeneration = document.getElementById('editGameGeneration');
const editGameDescription = document.getElementById('editGameDescription');
const editGameTable = document.querySelector('.edit-game-table');

if (editGameForm) {
  const game = getSelectedGame();

  editGamePreview.src = game.hero;
  editGameTitle.value = game.title;
  editGameYear.value = game.year;
  editGameGeneration.textContent = game.generationLabel;
  editGameGeneration.className = `game-generation-badge chip-${game.generation}`;
  editGameDescription.value = game.description;
  editGameTable.innerHTML = getGameInfoRows(game, true);

  editGameImage?.addEventListener('change', () => {
    const file = editGameImage.files[0];
    if (!file) return;
    editGamePreview.src = URL.createObjectURL(file);
  });

  editGameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = `game-detail.html?game=${game.id}`;
  });
}



// Characters section
const gtaCharactersData = [
  {
    id: 'cj',
    name: 'Carl Johnson (CJ)',
    game: 'GTA: San Andreas',
    generation: '3d',
    generationLabel: 'Era 3D',
    year: 2004,
    image: 'img/CJNew.png',
    hero: 'img/cjHD.jpg',
    platforms: ['pc', 'ps2', 'xbox'],
    description: 'Carl Johnson, conocido como CJ, es el protagonista de Grand Theft Auto: San Andreas. Tras vivir varios años en Liberty City, vuelve a Los Santos en 1992 después del asesinato de su madre, Beverly Johnson. Su historia gira alrededor de reconstruir Grove Street Families, recuperar el respeto de su barrio, proteger a su familia y enfrentarse a la corrupción policial de C.R.A.S.H.',
    nationality: 'Estadounidense',
    occupation: 'Pandillero',
    city: 'Los Santos',
    voice: 'Young Maylay',
    crimeDate: '1992'
  },
  {
    id: 'tommy',
    name: 'Tommy Vercetti',
    game: 'GTA: Vice City',
    generation: '3d',
    generationLabel: 'Era 3D',
    year: 2002,
    image: 'img/TommyVercetti.png',
    hero: 'img/TommyVercetti.png',
    platforms: ['pc', 'ps2', 'xbox'],
    description: 'Tommy Vercetti es el protagonista de Grand Theft Auto: Vice City. Después de salir de prisión, es enviado a Vice City por la familia Forelli, pero una emboscada lo obliga a construir su propio imperio criminal en la ciudad.',
    nationality: 'Estadounidense',
    occupation: 'Jefe criminal',
    city: 'Vice City',
    voice: 'Ray Liotta',
    crimeDate: '1986'
  },
  {
    id: 'claude',
    name: 'Claude Speed',
    game: 'GTA III',
    generation: '3d',
    generationLabel: 'Era 3D',
    year: 2001,
    image: 'img/gtaIII.png',
    hero: 'img/gtaIII.png',
    platforms: ['pc', 'ps2', 'xbox'],
    description: 'Claude es el protagonista silencioso de Grand Theft Auto III. Tras ser traicionado por Catalina durante un robo, escapa en Liberty City y empieza a trabajar para distintas organizaciones criminales mientras busca venganza.',
    nationality: 'Desconocida',
    occupation: 'Criminal',
    city: 'Liberty City',
    voice: 'Sin voz',
    crimeDate: '2001'
  },
  {
    id: 'toni',
    name: 'Toni Cipriani',
    game: 'GTA: Liberty City Stories',
    generation: '3d',
    generationLabel: 'Era 3D',
    year: 2005,
    image: 'img/GtaLibertyCity.png',
    hero: 'img/GtaLibertyCity.png',
    platforms: ['ps2'],
    description: 'Toni Cipriani es el protagonista de Grand Theft Auto: Liberty City Stories. Regresa a Liberty City después de permanecer escondido y vuelve a trabajar para la familia Leone, ganando poder dentro de la mafia.',
    nationality: 'Estadounidense',
    occupation: 'Mafioso',
    city: 'Liberty City',
    voice: 'Danny Mastrogiorgio',
    crimeDate: '1998'
  },
  {
    id: 'victor',
    name: 'Victor Vance',
    game: 'GTA: Vice City Stories',
    generation: '3d',
    generationLabel: 'Era 3D',
    year: 2006,
    image: 'img/GtaViceCityStories.png',
    hero: 'img/GtaViceCityStories.png',
    platforms: ['ps2'],
    description: 'Victor Vance es el protagonista de Grand Theft Auto: Vice City Stories. Es un exsoldado que termina involucrado en el crimen de Vice City mientras intenta proteger a su familia y sobrevivir entre bandas rivales.',
    nationality: 'Estadounidense',
    occupation: 'Exsoldado',
    city: 'Vice City',
    voice: 'Dorian Missick',
    crimeDate: '1984'
  },
  {
    id: 'niko',
    name: 'Niko Bellic',
    game: 'GTA IV',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2008,
    image: 'img/NikoBellic.png',
    hero: 'img/NikoBellic.png',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Niko Bellic es el protagonista de Grand Theft Auto IV. Llega a Liberty City desde Europa del Este buscando una nueva vida, pero su pasado militar, las deudas de su primo Roman y el crimen organizado lo arrastran otra vez a la violencia.',
    nationality: 'Serbio',
    occupation: 'Exsoldado',
    city: 'Liberty City',
    voice: 'Michael Hollick',
    crimeDate: '2008'
  },
  {
    id: 'johnny',
    name: 'Johnny Klebitz',
    game: 'GTA IV: The Lost and Damned',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2009,
    image: 'img/gtaIV.png',
    hero: 'img/gtaIV.png',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Johnny Klebitz es el protagonista de The Lost and Damned. Es vicepresidente del club de motociclistas The Lost MC y queda atrapado entre la lealtad al club, conflictos internos y guerras criminales en Liberty City.',
    nationality: 'Estadounidense',
    occupation: 'Motociclista criminal',
    city: 'Liberty City',
    voice: 'Scott Hill',
    crimeDate: '2008'
  },
  {
    id: 'luis',
    name: 'Luis Fernando Lopez',
    game: 'GTA IV: The Ballad of Gay Tony',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2009,
    image: 'img/GTA_IV_portada.webp',
    hero: 'img/GTA_IV_portada.webp',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Luis Fernando Lopez es el protagonista de The Ballad of Gay Tony. Trabaja como guardaespaldas y socio de Tony Prince, moviéndose entre clubes nocturnos, deudas, lujos y criminales de Liberty City.',
    nationality: 'Dominicano-estadounidense',
    occupation: 'Guardaespaldas',
    city: 'Liberty City',
    voice: 'Mario D Leon',
    crimeDate: '2008'
  },
  {
    id: 'michael',
    name: 'Michael De Santa',
    game: 'GTA V',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2013,
    image: 'img/GTA_V.webp',
    hero: 'img/gtaV.png',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Michael De Santa es uno de los protagonistas de Grand Theft Auto V. Es un antiguo ladrón de bancos que vive bajo protección de testigos en Los Santos, hasta que vuelve al crimen por problemas familiares y económicos.',
    nationality: 'Estadounidense',
    occupation: 'Exladrón de bancos',
    city: 'Los Santos',
    voice: 'Ned Luke',
    crimeDate: '2013'
  },
  {
    id: 'franklin ',
    name: 'Franklin Clinton',
    game: 'GTA V',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2013,
    image: 'img/GTA_V.webp',
    hero: 'img/gtaV.png',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Franklin Clinton es uno de los protagonistas de Grand Theft Auto V. Empieza trabajando como recuperador de autos en Los Santos y busca salir de la vida de pandillas para entrar a golpes criminales de mayor nivel.',
    nationality: 'Estadounidense',
    occupation: 'Ladrón / conductor',
    city: 'Los Santos',
    voice: 'Shawn Fonteno',
    crimeDate: '2013'
  },
  {
    id: 'trevor',
    name: 'Trevor Phillips',
    game: 'GTA V',
    generation: 'hd',
    generationLabel: 'Era HD',
    year: 2013,
    image: 'img/TrevorPhillips.png',
    hero: 'img/TrevorPhillips.png',
    platforms: ['pc', 'ps3', 'xbox360'],
    description: 'Trevor Phillips es uno de los protagonistas de Grand Theft Auto V. Es un criminal impredecible, antiguo socio de Michael y líder de Trevor Philips Enterprises en el condado de Blaine.',
    nationality: 'Canadiense',
    occupation: 'Criminal',
    city: 'Blaine County',
    voice: 'Steven Ogg',
    crimeDate: '2013'
  },
  {
    id: 'lucia',
    name: 'Lucia',
    game: 'GTA VI',
    generation: 'modern',
    generationLabel: 'Moderna',
    year: 2026,
    image: 'img/GTA_VI_portada.webp',
    hero: 'img/GtaVI.png',
    platforms: ['ps5'],
    description: 'Lucia es una de las protagonistas de Grand Theft Auto VI. La historia la presenta en Leonida y Vice City, formando parte de una nueva etapa de la saga con una narrativa criminal compartida.',
    nationality: 'Por confirmar',
    occupation: 'Criminal',
    city: 'Vice City',
    voice: 'Por confirmar',
    crimeDate: '2026'
  },
  {
    id: 'jason',
    name: 'Jason',
    game: 'GTA VI',
    generation: 'modern',
    generationLabel: 'Moderna',
    year: 2026,
    image: 'img/GTA_VI_portada.webp',
    hero: 'img/GtaVI.png',
    platforms: ['ps5'],
    description: 'Jason es uno de los protagonistas de Grand Theft Auto VI junto a Lucia. La historia lo ubica en Leonida y Vice City dentro de una narrativa criminal de la nueva generación de la saga.',
    nationality: 'Por confirmar',
    occupation: 'Criminal',
    city: 'Vice City',
    voice: 'Por confirmar',
    crimeDate: '2026'
  }
];
function getSelectedCharacter() {
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get('character') || 'cj';
  return gtaCharactersData.find((character) => character.id === characterId) || gtaCharactersData[0];
}

function getCharacterInfoRows(character, editable = false) {
  const rows = [
    ['ph-globe', 'Nacionalidad', character.nationality],
    ['ph-briefcase', 'Ocupación', character.occupation],
    ['ph-buildings', 'Ciudad', character.city],
    ['ph-waveform', 'Actor de voz', character.voice],
    ['ph-calendar', 'Fecha de delincuencia', character.crimeDate]
  ];

  return rows.map(([icon, label, value]) => `
    <div class="character-info-row">
      <i class="ph ${icon}"></i>
      <strong>${label}</strong>
      ${editable ? `<input type="text" value="${value}"> <i class="ph ph-pencil-simple"></i>` : `<span>${value}</span>`}
    </div>
  `).join('');
}

const charactersList = document.getElementById('charactersList');
const characterSearch = document.getElementById('characterSearch');
const characterChips = document.querySelectorAll('.character-chip');
const openCharacterFilters = document.getElementById('openCharacterFilters');
const closeCharacterFilters = document.getElementById('closeCharacterFilters');
const characterFiltersPanel = document.getElementById('characterFiltersPanel');
const applyCharacterFilters = document.getElementById('applyCharacterFilters');
const clearCharacterFilters = document.getElementById('clearCharacterFilters');
const characterPlatformFilter = document.getElementById('characterPlatformFilter');
let activeCharacterGeneration = 'all';
let activeCharacterSort = 'az';

function renderCharacters() {
  if (!charactersList) return;

  const searchTerm = (characterSearch?.value || '').toLowerCase();
  const selectedPlatform = characterPlatformFilter?.value || 'all';

  let filteredCharacters = gtaCharactersData.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm) || character.game.toLowerCase().includes(searchTerm);
    const matchesGeneration = activeCharacterGeneration === 'all' || character.generation === activeCharacterGeneration;
    const matchesPlatform = selectedPlatform === 'all' || character.platforms.includes(selectedPlatform);

    return matchesSearch && matchesGeneration && matchesPlatform;
  });

  filteredCharacters = [...filteredCharacters].sort((a, b) => {
    if (activeCharacterSort === 'za') return b.name.localeCompare(a.name);
    if (activeCharacterSort === 'old') return a.year - b.year;
    if (activeCharacterSort === 'new') return b.year - a.year;
    return a.name.localeCompare(b.name);
  });

  charactersList.innerHTML = filteredCharacters.map((character) => `
    <article class="character-card character-card-${character.generation}" data-character="${character.id}">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <span class="character-card-game">${character.game}</span>
      <span class="character-card-badge">${character.generationLabel}</span>
    </article>
  `).join('');

  document.querySelectorAll('.character-card').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = `character-detail.html?character=${card.dataset.character}`;
    });
  });
}

if (charactersList) {
  renderCharacters();

  characterSearch?.addEventListener('input', renderCharacters);

  characterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeCharacterGeneration = chip.dataset.generation;
      characterChips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      renderCharacters();
    });
  });

  openCharacterFilters?.addEventListener('click', () => characterFiltersPanel.classList.add('is-open'));
  closeCharacterFilters?.addEventListener('click', () => characterFiltersPanel.classList.remove('is-open'));

  applyCharacterFilters?.addEventListener('click', () => {
    const generationInput = document.querySelector('input[name="characterFilterGeneration"]:checked');
    const sortInput = document.querySelector('input[name="characterSort"]:checked');
    activeCharacterGeneration = generationInput?.value || 'all';
    activeCharacterSort = sortInput?.value || 'az';
    characterChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.generation === activeCharacterGeneration));
    renderCharacters();
    characterFiltersPanel.classList.remove('is-open');
  });

  clearCharacterFilters?.addEventListener('click', () => {
    activeCharacterGeneration = 'all';
    activeCharacterSort = 'az';
    document.querySelector('input[name="characterFilterGeneration"][value="all"]').checked = true;
    document.querySelector('input[name="characterSort"][value="az"]').checked = true;
    if (characterPlatformFilter) characterPlatformFilter.value = 'all';
    characterChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.generation === 'all'));
    renderCharacters();
  });
}

const characterDetailContent = document.getElementById('characterDetailContent');
const characterDetailMenuBtn = document.getElementById('characterDetailMenuBtn');
const characterDetailOptions = document.getElementById('characterDetailOptions');

if (characterDetailContent) {
  const character = getSelectedCharacter();

  characterDetailContent.innerHTML = `
    <div class="character-hero-image"><img src="${character.hero}" alt="${character.name}"></div>
    <h1 class="character-detail-name">${character.name}</h1>
    <div class="character-detail-subline">
      <span class="character-game-name">${character.game}</span>
      <span class="character-generation-badge chip-${character.generation}">${character.generationLabel}</span>
    </div>
    <section class="character-description-box">
      <h2 class="font-pricedown">Descripción</h2>
      <p>${character.description}</p>
    </section>
    <section class="character-info-table">${getCharacterInfoRows(character)}</section>
  `;

  characterDetailMenuBtn?.addEventListener('click', () => characterDetailOptions.classList.toggle('is-open'));

  characterDetailOptions?.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.characterAction === 'edit') {
        window.location.href = `edit-character.html?character=${character.id}`;
      }
      if (button.dataset.characterAction === 'delete') {
        window.location.href = 'characters.html';
      }
    });
  });
}

const editCharacterForm = document.getElementById('editCharacterForm');
const editCharacterPreview = document.getElementById('editCharacterPreview');
const editCharacterImage = document.getElementById('editCharacterImage');
const editCharacterName = document.getElementById('editCharacterName');
const editCharacterGame = document.getElementById('editCharacterGame');
const editCharacterGeneration = document.getElementById('editCharacterGeneration');
const editCharacterDescription = document.getElementById('editCharacterDescription');
const editCharacterTable = document.querySelector('.edit-character-table');

if (editCharacterForm) {
  const character = getSelectedCharacter();

  editCharacterPreview.src = character.hero;
  editCharacterName.value = character.name;
  editCharacterGame.value = character.game;
  editCharacterGeneration.textContent = character.generationLabel;
  editCharacterGeneration.className = `character-generation-badge chip-${character.generation}`;
  editCharacterDescription.value = character.description;
  editCharacterTable.innerHTML = getCharacterInfoRows(character, true);

  editCharacterImage?.addEventListener('change', () => {
    const file = editCharacterImage.files[0];
    if (!file) return;
    editCharacterPreview.src = URL.createObjectURL(file);
  });

  editCharacterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = `character-detail.html?character=${character.id}`;
  });
}


