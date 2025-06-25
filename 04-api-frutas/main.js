class AkumaNoMiAPI {
  constructor() {
    this.frutas = [];
    this.baseURL = '/api/v1';
    this.init();
  }

  async init() {
    await this.cargarFrutas();
    this.renderDocumentacion(); // ✅ MOVER ANTES
    this.setupEventListeners(); // ✅ DESPUÉS
    this.renderFrutas();
    this.actualizarEstadisticas();
  }

  async cargarFrutas() {
    try {
      const response = await fetch('./frutas.json');
      this.frutas = await response.json();
      console.log('✅ Base de datos cargada:', this.frutas.length, 'frutas del diablo');
    } catch (error) {
      console.error('❌ Error cargando base de datos:', error);
    }
  }

  // 🔸 ENDPOINTS DE LA API
  getAllFrutas(filters = {}) {
    let resultado = [...this.frutas];

    if (filters.tipo) {
      resultado = resultado.filter(f =>
        f.tipo.toLowerCase() === filters.tipo.toLowerCase()
      );
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      resultado = resultado.filter(f =>
        f.nombre.toLowerCase().includes(search) ||
        f.usuario_actual.toLowerCase().includes(search) ||
        f.descripcion.toLowerCase().includes(search)
      );
    }

    return {
      status: 'success',
      data: resultado,
      total: resultado.length,
      endpoint: `${this.baseURL}/frutas`,
      timestamp: new Date().toISOString()
    };
  }

  getFrutaById(id) {
    const fruta = this.frutas.find(f => f.id === parseInt(id));

    if (!fruta) {
      return {
        status: 'error',
        message: 'Fruta del diablo no encontrada',
        error_code: 404,
        endpoint: `${this.baseURL}/frutas/${id}`
      };
    }

    return {
      status: 'success',
      data: fruta,
      endpoint: `${this.baseURL}/frutas/${id}`,
      timestamp: new Date().toISOString()
    };
  }

  getFrutasByTipo(tipo) {
    const frutasFiltradas = this.frutas.filter(f =>
      f.tipo.toLowerCase() === tipo.toLowerCase()
    );

    return {
      status: 'success',
      data: frutasFiltradas,
      total: frutasFiltradas.length,
      tipo: tipo,
      endpoint: `${this.baseURL}/frutas/tipo/${tipo}`,
      timestamp: new Date().toISOString()
    };
  }

  getRandomFruta() {
    const randomIndex = Math.floor(Math.random() * this.frutas.length);
    const fruta = this.frutas[randomIndex];

    return {
      status: 'success',
      data: fruta,
      endpoint: `${this.baseURL}/frutas/random`,
      timestamp: new Date().toISOString()
    };
  }

  getEstadisticas() {
    const total = this.frutas.length;
    const porTipo = {
      'Paramecia': this.frutas.filter(f => f.tipo === 'Paramecia').length,
      'Logia': this.frutas.filter(f => f.tipo === 'Logia').length,
      'Zoan': this.frutas.filter(f => f.tipo === 'Zoan').length,
      'Zoan Mitologica': this.frutas.filter(f => f.tipo === 'Zoan Mitologica').length
    };

    return {
      status: 'success',
      data: {
        total_frutas: total,
        por_tipo: porTipo,
        fruta_mas_reciente: this.frutas[this.frutas.length - 1]?.nombre,
        ultima_actualizacion: new Date().toISOString()
      },
      endpoint: `${this.baseURL}/estadisticas`,
      timestamp: new Date().toISOString()
    };
  }

  // 🔸 INTERFAZ WEB
  setupEventListeners() {
    document.getElementById('buscador')?.addEventListener('input', () => this.aplicarFiltros());
    document.getElementById('filtroTipo')?.addEventListener('change', () => this.aplicarFiltros());

    document.getElementById('btn-todas')?.addEventListener('click', () => this.mostrarTodas());
    document.getElementById('btn-random')?.addEventListener('click', () => this.mostrarRandom());
    document.getElementById('btn-estadisticas')?.addEventListener('click', () => this.mostrarEstadisticas());

    // ✅ CAMBIO: Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      document.querySelectorAll('.endpoint-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const endpoint = e.target.dataset.endpoint;
          this.ejecutarEndpoint(endpoint);
        });
      });
    }, 100);
  }

  aplicarFiltros() {
    const search = document.getElementById('buscador')?.value || '';
    const tipo = document.getElementById('filtroTipo')?.value || '';

    const resultado = this.getAllFrutas({ search, tipo });
    this.renderFrutas(resultado.data);
    this.mostrarResultadoAPI(resultado);
  }

  mostrarTodas() {
    const resultado = this.getAllFrutas();
    this.renderFrutas(resultado.data);
    this.mostrarResultadoAPI(resultado);
  }

  mostrarRandom() {
    const resultado = this.getRandomFruta();
    this.renderFrutas([resultado.data]);
    this.mostrarResultadoAPI(resultado);
  }

  mostrarEstadisticas() {
    const resultado = this.getEstadisticas();
    this.mostrarResultadoAPI(resultado);
  }

  ejecutarEndpoint(endpoint) {
    let resultado;

    switch (endpoint) {
      case 'todas':
        resultado = this.getAllFrutas();
        this.renderFrutas(resultado.data);
        break;
      case 'random':
        resultado = this.getRandomFruta();
        this.renderFrutas([resultado.data]);
        break;
      case 'estadisticas':
        resultado = this.getEstadisticas();
        // No renderizar frutas para estadísticas
        break;
      case 'paramecia':
        resultado = this.getFrutasByTipo('Paramecia');
        this.renderFrutas(resultado.data);
        break;
      case 'logia':
        resultado = this.getFrutasByTipo('Logia');
        this.renderFrutas(resultado.data);
        break;
      case 'zoan':
        resultado = this.getFrutasByTipo('Zoan');
        this.renderFrutas(resultado.data);
        break;
      case 'mitologica':
        resultado = this.getFrutasByTipo('Zoan Mitologica');
        this.renderFrutas(resultado.data);
        break;
      default:
        resultado = this.getAllFrutas();
        this.renderFrutas(resultado.data);
    }

    this.mostrarResultadoAPI(resultado);
  }

  mostrarResultadoAPI(resultado) {
    const apiResponse = document.getElementById('api-response');
    if (apiResponse) {
      // Mostrar solicitud primero
      apiResponse.innerHTML = `
        <div class="api-request">
          <h3>📡 Solicitud API</h3>
          <div class="request-info">
            <span class="method get">GET</span>
            <span class="endpoint">http://localhost:3000${resultado.endpoint}</span>
          </div>
          <div class="loading">⏳ Cargando...</div>
        </div>
      `;

      apiResponse.scrollIntoView({ behavior: 'smooth' });

      // Mostrar respuesta después de un delay
      setTimeout(() => {
        apiResponse.innerHTML = `
          <div class="api-request">
            <h3>📡 Respuesta API</h3>
            <div class="response-status status-200">
              Status: 200 - ${resultado.status === 'success' ? 'Exitoso' : 'Error'}
            </div>
            <div class="response-body">
              <pre><code>${JSON.stringify(resultado, null, 2)}</code></pre>
            </div>
          </div>
        `;
      }, 800);
    }
  }

  renderFrutas(frutas = this.frutas) {
    const container = document.getElementById('frutas-container');
    if (!container) return;

    if (frutas.length === 0) {
      container.innerHTML = '<div class="no-results">No se encontraron frutas del diablo 😢</div>';
      return;
    }

    container.innerHTML = frutas.map((fruta, index) => {
      const tipoClase = this.getTipoClase(fruta.tipo);

      return `
        <div class="flip-card" onclick="this.classList.toggle('flipped')" data-id="${index}">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="${fruta.imagen || 'https://via.placeholder.com/200x160/ff6b6b/ffffff?text=🍎'}" 
                   alt="${fruta.nombre}" 
                   class="fruta-img"
                   onerror="this.src='https://via.placeholder.com/200x160/ff6b6b/ffffff?text=🍎'">
              <span class="tipo ${tipoClase}">${fruta.tipo}</span>
              <h3>${fruta.nombre}</h3>
              
              <button onclick="event.stopPropagation(); api.mostrarFrutaDetalle('${fruta.nombre}')" class="btn-api">
                🔍 Ver en API
              </button>
            </div>
            <div class="flip-card-back">
              <h3>${fruta.nombre}</h3>
              <p><strong>Descripción:</strong><br>${fruta.descripcion || 'No disponible'}</p>
              <p><strong>Usuario:</strong><br>${fruta.usuario_actual || 'Desconocido'}</p>
              <p><strong>Aparición:</strong><br>${fruta.primera_aparicion || 'N/A'}</p>
              <div class="back-buttons">
                <button onclick="event.stopPropagation(); api.copiarJSON('${fruta.nombre}')" class="btn-api">
                  📋 Copiar JSON
                </button>
                <button onclick="event.stopPropagation(); this.closest('.flip-card').classList.remove('flipped')" class="btn-back">
                  🔄 Voltear
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  getTipoClase(tipo) {
    if (tipo === 'Paramecia') return 'Paramecia';
    if (tipo === 'Logia') return 'Logia';
    if (tipo === 'Zoan') return 'Zoan';
    if (tipo === 'Zoan Mitologica') return 'ZoanMitologica';
    return tipo.replace(/\s+/g, '');
  }

  mostrarFrutaDetalle(nombre) {
    const fruta = this.frutas.find(f => f.nombre === nombre);
    if (fruta) {
      const resultado = {
        status: 'success',
        data: fruta,
        endpoint: `${this.baseURL}/frutas/nombre/${nombre}`,
        timestamp: new Date().toISOString()
      };
      this.mostrarResultadoAPI(resultado);
    }
  }

  copiarJSON(nombre) {
    const fruta = this.frutas.find(f => f.nombre === nombre);
    if (fruta) {
      navigator.clipboard.writeText(JSON.stringify(fruta, null, 2));
      alert('🎉 JSON copiado al portapapeles!');
    }
  }

  actualizarEstadisticas() {
    const stats = this.getEstadisticas().data;

    document.getElementById('total-frutas').textContent = stats.total_frutas;
    document.getElementById('total-paramecia').textContent = stats.por_tipo.Paramecia;
    document.getElementById('total-logia').textContent = stats.por_tipo.Logia;
    document.getElementById('total-zoan').textContent = stats.por_tipo.Zoan + stats.por_tipo['Zoan Mitologica'];
  }

  renderDocumentacion() {
    const docsContainer = document.getElementById('api-docs');
    if (!docsContainer) return;

    docsContainer.innerHTML = `
      <div class="docs-section">
        <h2>📖 Documentación de la API</h2>
        <p>Akuma no Mi API v1.0 - Base de datos de frutas del diablo de One Piece</p>
        
        <div class="endpoint-grid">
          <div class="endpoint-card">
            <h3>GET /api/v1/frutas</h3>
            <p>Obtiene todas las frutas del diablo</p>
            <button class="endpoint-btn" data-endpoint="todas">🧪 Probar</button>
          </div>
          
          <div class="endpoint-card">
            <h3>GET /api/v1/frutas/random</h3>
            <p>Obtiene una fruta aleatoria</p>
            <button class="endpoint-btn" data-endpoint="random">🧪 Probar</button>
          </div>
          
          <div class="endpoint-card">
            <h3>GET /api/v1/frutas/tipo/paramecia</h3>
            <p>Filtra frutas tipo Paramecia</p>
            <button class="endpoint-btn" data-endpoint="paramecia">🧪 Probar</button>
          </div>
          
          <div class="endpoint-card">
            <h3>GET /api/v1/frutas/tipo/logia</h3>
            <p>Filtra frutas tipo Logia</p>
            <button class="endpoint-btn" data-endpoint="logia">🧪 Probar</button>
          </div>
          
          <div class="endpoint-card">
            <h3>GET /api/v1/estadisticas</h3>
            <p>Obtiene estadísticas generales</p>
            <button class="endpoint-btn" data-endpoint="estadisticas">🧪 Probar</button>
          </div>
        </div>
      </div>
    `;
  }
}

// Inicializar la API
const api = new AkumaNoMiAPI();

// Consola de desarrollador
console.log(`
🏴‍☠️ ===== AKUMA NO MI API v1.0 =====
📡 Base URL: /api/v1
📚 Endpoints disponibles:
   • GET /api/v1/frutas
   • GET /api/v1/frutas/:id
   • GET /api/v1/frutas/tipo/:tipo
   • GET /api/v1/frutas/random
   • GET /api/v1/estadisticas

🧪 Ejemplos de uso:
   api.getAllFrutas()
   api.getFrutasByTipo('Logia')
   api.getRandomFruta()
   api.getEstadisticas()
=====================================
`);