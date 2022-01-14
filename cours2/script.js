// Récupération des coordonnées
var latitude = 0;
var longitude = 0;

var map = L.map('leaflet', {
  'center': [latitude, longitude],
  'zoom': 12,
  'layers': [
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    // Il est toujours bien de laisser le lien vers la source des données
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 20
                })
  ]
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            map.setView([latitude, longitude]);
        });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();

function reqListener () {
  L.geoJson(JSON.parse(this.response)).addTo(map);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://geo.api.gouv.fr/departements/06/communes?fields=nom&format=geojson&geometry=centre");
oReq.send();


let xhr = new XMLHttpRequest(); 
xhr.open("GET", "https://opendata.nicecotedazur.org/data/storage/f/2021-06-24T07%3A47%3A53.464Z/bornes-rm-a8.geojson"); 
xhr.setRequestHeader("Content-Type", "application/json");
xhr.responseType = "json";
xhr.onload = function() { if (xhr.status !== 200) return L.geoJSON(xhr.response).addTo(map); };
 xhr.send(); 
