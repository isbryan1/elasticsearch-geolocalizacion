var mapcenter=[-12.04318, -77.02824];
var mapzoom=13;

/* Mapa */
document.addEventListener("DOMContentLoaded", function(event) { 
	var mymap = L.map('mapid').setView(mapcenter, mapzoom);
	const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

	L.tileLayer(tilesProvider, {
	    maxZoom: 18,
	}).addTo(mymap);

	mymap.on('click', onMapClick);
	});

function onMapClick(e) {
	getInfo( e.latlng.lat, e.latlng.lng);
	//console.log(e.latlng)
	}


/* Datos */
function getInfo(lat,lng) {
	var data=getData(lat,lng);
	//alert("Latitud: " + lat + "  Longitud: " + lng);

	fetch("http://127.0.0.1:9200/ciudades/_doc/_search?pretty", {
	    body: data,
	    headers: {
		'Content-Type': 'application/json'
		},
		mode: 'cors',
	    method: 'POST', 
	  }).then(function( response ) { 
		response.json().then(function(json) {
			results(json);
			});
		});
	}

function results(json) {
	var s="";
	var countries={};

	for ( var i=0; i<json.hits.hits.length; i++ ) {
		s+="<div>";
		s+=json.hits.hits[i]._source.city+" ("+json.hits.hits[i]._source.country+")";
		s+="</div>";

		if ( countries[ json.hits.hits[i]._source.country ] == undefined )
			countries[ json.hits.hits[i]._source.country ]=1;
			else
			countries[ json.hits.hits[i]._source.country ]++;
		}

	document.getElementById("total").innerHTML=json.hits.hits.length;
	document.getElementById("cities").innerHTML=s;
	document.getElementById("countries").innerHTML=JSON.stringify(countries);
	}

function getData(lat,lng) {
	return '{'+
		'    "size" : 100,'+
		'    "query": {'+
		'        "bool" : {'+
		'            "filter" : {'+
		'                "geo_distance" : {'+
		'                    "distance" : "10km",'+
		'                    "location" : "'+lat+','+lng+'"'+
		'                }'+
		'            }'+
		'        }'+
		'    }'+
		'}';
	}
