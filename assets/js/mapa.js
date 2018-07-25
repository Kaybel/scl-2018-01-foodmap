// Instantiate the Platform class with authentication and
// authorization credentials:
let platform = new H.service.Platform({
  useCIT: true,
  app_id: '{pbx0QAZU3ePJRF70Wh4S} ',
  app_code: '{iWBnPcO9Q3xiiNWlEK4Esg} '
});

// Instantiate a map inside the DOM element with id map. The
// map center is in Santiago, Chile, the zoom level is 10:
let map = new H.Map(document.getElementById('map'),
  platform.createDefaultLayers().normal.map, {
    center: { lat: -33.447487, lng: -70.673676 },
    zoom: 10
  });

// Create a group object to hold map markers:
let group = new H.map.Group();

// Create the default UI components:
let ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());

// Add the group object to the map:
map.addObject(group);

// Obtain a Search object through which to submit search
// requests:
let search = new H.places.Search(platform.getPlacesService()),
  searchResult, error;

// Define search parameters:
let params = {
  // Plain text search for places with the word "hotel"
  // associated with them:
  'q': 'hotel',
  'at': '-33.447487,-70.673676'
};

// Define a callback function to handle data on success:
const onResult = ((data) => {
  addPlacesToMap(data.results);
});

// Define a callback function to handle errors:
const onError = ((data) => {
  error = data;
});

// This function adds markers to the map, indicating each of
// the located places:
const addPlacesToMap = ((result) => {
  group.addObjects(result.items.map(function (place) {
    var marker = new H.map.Marker({
      lat: place.position[0],
      lng: place.position[1]
    })
    return marker;
  }));
});

// Run a search request with parameters, headers (empty), and
// callback functions:
search.request(params, {}, onResult, onError);