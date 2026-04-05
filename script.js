// 1. State Management & Mock Data
// Check for saved user preference on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    toggleSwitch.checked = true;
    document.body.classList.add('light-mode');
    modeText.textContent = "Light Mode";
}

const hotelData = [
    {
     id: 1,
     name: "Amboy Hometel",
     location: "Basco",
     pricePerNight: 2500,
     imageIcon: "🏨"
    },
    { 
     id: 2,
     name: "DDD Habitat Lodging",
     location: "Mahatao",
     pricePerNight: 1800,
     imageIcon: "🏠" 
        },
    { 
     id: 3,
     name: "Fundacion Pacita",
     location: "Basco", 
     pricePerNight: 8500, 
     imageIcon: "🏰" 
    },
    { 
    id: 4, 
    name: "Batanes Resort", 
    location: "Basco", 
    pricePerNight: 4500, 
    imageIcon: "🏖️" 
},
    { 
    id: 5,
    name: "Vatan Inn", 
    location: "Mahatao", 
    pricePerNight: 1600, 
    imageIcon: "🏡" 
}
];

let state = {
    selectedLocation: "All",
    checkInDate: null,
    checkOutDate: null
};

// 2. DOM Elements
const hotelGrid = document.getElementById('hotel-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const checkInInput = document.getElementById('checkin');
const checkOutInput = document.getElementById('checkout');
const summaryText = document.getElementById('total-nights-summary');
const errorText = document.getElementById('date-error');

// 3. Core Application Logic
function init() {
    setupEventListeners();
    filterAndRenderHotels();
}

function setupEventListeners() {
    // Filter logic
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            state.selectedLocation = event.target.dataset.location;
            filterAndRenderHotels();
        });
    });

    // Date changes
    checkInInput.addEventListener('change', (e) => {
        state.checkInDate = e.target.value;
        calculateStayDuration();
    });

    checkOutInput.addEventListener('change', (e) => {
        state.checkOutDate = e.target.value;
        calculateStayDuration();
    });
}

function filterAndRenderHotels() {
    const filteredHotels = state.selectedLocation === "All" 
        ? hotelData 
        : hotelData.filter(h => h.location === state.selectedLocation);
    
    renderHotels(filteredHotels);
}

function renderHotels(hotels) {
    hotelGrid.innerHTML = "";
    if (hotels.length === 0) {
        hotelGrid.innerHTML = "<p>No hotels found for this location.</p>";
        return;
    }

    hotels.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        card.innerHTML = `
            <div class="hotel-image" style="font-size: 5rem; text-align: center; padding: 20px;">
                ${hotel.imageIcon}
            </div>
            <div class="hotel-info" style="padding: 1.5rem;">
                <h3>${hotel.name}</h3>
                <p>Location: ${hotel.location}, Batanes</p>
                <p><strong>₱${hotel.pricePerNight.toLocaleString()}</strong> / night</p>
            </div>
        `;
        hotelGrid.appendChild(card);
    });
}

function calculateStayDuration() {
    if (!state.checkInDate || !state.checkOutDate) return;

    const start = new Date(state.checkInDate);
    const end = new Date(state.checkOutDate);

    errorText.classList.add('hidden');

    if (end <= start) {
        errorText.classList.remove('hidden');
        summaryText.textContent = "Select dates to calculate your stay.";
        return;
    }

    const diffInMs = end - start;
    const totalNights = diffInMs / (1000 * 60 * 60 * 24);
    summaryText.textContent = `Total Stay: ${totalNights} Night(s)`;
}

document.addEventListener('DOMContentLoaded', init);

        
