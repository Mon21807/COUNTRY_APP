
document.addEventListener("DOMContentLoaded", () => {
    const countryContainer = document.getElementById("countryContainer");

    fetchCountryData()
        .then(displayCountries)
        .catch(error => console.error("Error fetching country data:", error));

    async function fetchCountryData() {
        try {
            const response = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching country data: ${error.message}`);
        }
    }

    function displayCountries(countries) {
        countries.sort((a, b) => b.population - a.population); // Sort countries by population (descending)
        countryContainer.innerHTML = ""; // Clear previous content

        countries.forEach(country => {
            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
                <h2>${country.name}</h2>
                <p>Population: ${country.population}</p>
                <p>Capital: ${country.capital}</p>
                <p>Region: ${country.region}</p>
                <!-- Add more details here as needed -->
            `;
            countryContainer.appendChild(countryCard);
        });
    }
});
