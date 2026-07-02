// Mapeo de imágenes locales para juegos y personajes
// Si el nombre de imagen del backend coincide con una clave, se usa la imagen local
// Si no coincide, se muestra el placeholder con color

const gameImages = {
  GTA1997:        require("./GTA1997.jpg"),
  GTA_2:          require("./GTA_2.webp"),
  gtaIII:         require("./GTAIII_portada.webp"),  // ← corregido
  GTAViceCity:    require("./GTAViceCity.webp"),
  gtaSanAndreas:  require("./gtaSanAndreas.jpg"),
  GTA_IV_portada: require("./GTA_IV_portada.webp"),
  GtaChinaTown:   require("./GtaChinaTown.png"),
  GTA_V:          require("./GTA_V.webp"),
  GtaOnline:      require("./GtaOnline.png"),
  GTA_VI_portada: require("./GTA_VI_portada.webp"),
};

const characterImages = {
  CJNew:          require("./CJNew.png"),
  TommyVercetti:  require("./TommyVercetti.png"),
  NikoBellic:     require("./NikoBellic.png"),
  TrevorPhillips: require("./TrevorPhillips.png"),
  ClaudeSpeed:     require("./ClaudeSpeed.png"),
};

const generationImages = {
  Era2D:          require("./Era2D.png"),
  Era3D:          require("./Era3D.png"),
  EraHD:          require("./EraHD.png"),
  EraModerna:     require("./EraModerna.png"),
};

export { gameImages, characterImages, generationImages };