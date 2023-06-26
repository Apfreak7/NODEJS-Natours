export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXBmcmVhazciLCJhIjoiY2xqM3VycHkxMGNudDNkcDJ4OGk2b2s3aiJ9.P4z-smyICmU2CX7wxlp3Ww";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/apfreak7/clj3wrqkf00zs01p74zur0g33", // style URL
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
