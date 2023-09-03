/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2hpbm9iaXgxMjM0NTYiLCJhIjoiY2xrczlkcXppMDFocTNxcG5wZDhmeDFqbSJ9.Xrr92F68KrlUcfhoNGx7pQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/shinobix123456/clks9x7xs00rc01qy5017aodv',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 9,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  });
};
