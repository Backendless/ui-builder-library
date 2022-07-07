export const Maps = {
  carto          : {
    mapUrl : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    options: {
      maxZoom: 20,
    },
    label  : 'Carto'
  },
  openStreet     : {
    mapUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 19,
    },
    label  : 'Open Street'
  },
  cartoDark      : {
    mapUrl : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    options: {
      maxZoom: 20,
    },
    label  : 'Carto Dark'
  },
  cyclosm        : {
    mapUrl : 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
    },
    label  : 'Cyclosm'
  },
  esriWorldStreet: {
    mapUrl : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 19,
    },
    label  : 'Esri World Street'
  }
};
