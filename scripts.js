mapboxgl.accessToken = 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A'
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9', 
        center: [-103.3, 29.3],
        zoom: 9.3,
        pitch: 80,
        bearing: 90, 
        projection: 'globe',
});

map.on('load', () => {
    
    map.addSource('trails', {
        type: 'geojson',
        data: 'Big_Bend_Trails.geojson'
    });

    map.addLayer({
      'id': 'trails-layer',
      'type': 'line',
      'source': 'trails',
      'paint': {
          'line-width': 3,
          'line-color': ['match', ['get', 'TRLCLASS'],
          'Class 1: Minimally Developed', 'red',
          'Class 2: Moderately Developed', 'orange',
          'Class 3: Developed', 'yellow','blue'
      ]
      }
    });

    map.addSource('bounds', {
        type: 'geojson',
        data: 'BigBendBounds.geojson'
    });

    map.addLayer({
      'id': 'boundary-layer',
      'type': 'line',
      'source': 'bounds',
      'paint': {
          'line-width': 4,
          'line-color': 'black',
          'line-opacity': .6
      }
    });

    map.on('click', 'trails-layer', (e) => {

        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML( '<center><strong>Trail name: </strong>' + e.features[0].properties.TRLNAME + '<br><strong>Trail class: </strong>' + e.features[0].properties.TRLCLASS + '<br><strong>Trail miles: </strong>' + e.features[0].properties.Miles + ' miles </center>')
        .addTo(map);
        });
         
        map.on('mouseenter', 'trails-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'trails-layer', () => {
        map.getCanvas().style.cursor = '';
        });

});

map.on('load', function () {
    map.addSource('mapbox-dem', {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        'tileSize': 512,
        'maxzoom': 14
    });
     map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.3});
     
     map.setFog({
        'range': [-1, 2],
        'horizon-blend': 0.3,
        'color': 'white',
        'high-color': '#add8e6',
        'space-color': '#d8f2ff',
        'star-intensity': 0.0
    });

});

const navControl = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(navControl, 'top-right');

const navExpand = new mapboxgl.FullscreenControl({
    container: document.querySelector('map')
});
map.addControl(navExpand, 'top-right');
