

let directionsService;
let directionsRenderer;

function initMap() {
  const center = { lat: 40.7128, lng: -74.0060 }; // New York City

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: center,
  });

  // Directions setup
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function optimizeRoute() {
  const input = document.getElementById("routeInput").value;
  const output = document.getElementById("output");

  if (input.trim() === "") {
    output.textContent = "Please enter some destinations.";
    return;
  }

  const locations = input.split(",").map(loc => loc.trim());
  if (locations.length < 2) {
    output.textContent = "Please enter at least two destinations.";
    return;
  }

  const origin = locations[0];
  const destination = locations[locations.length - 1];
  const waypoints = locations.slice(1, -1).map(loc => ({ location: loc, stopover: true }));

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        output.textContent = "Route optimized!";
      } else {
        output.textContent = "Could not calculate route: " + status;
      }
    }
  );
}


const toggleBtn = document.getElementById("modeToggle");
const body = document.body;

function updateToggleButtonText() {
  if (body.classList.contains("light-mode")) {
    toggleBtn.innerHTML = "🌞 Switch to Dark Mode";
  } else {
    toggleBtn.innerHTML = "🌙 Switch to Light Mode";
  }
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  updateToggleButtonText();
});

updateToggleButtonText();

function updateTime() {
  const timeElement = document.getElementById("currentTime");
  if (!timeElement) return;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);
