const getCountries = document.querySelector(".countries");
const exit = document.querySelector(".filter-down");
const dropdown = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("region-name");
const countryName = document.getElementsByClassName("countryName");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const night = document.querySelector(".night");
const countryModal = document.querySelector(".countryModal");

//get country information 

const getCountry = async () => {
    const country = await fetch("https://restcountries.com/v2/all");
    const details = await country.json();
    console.log(details);
    details.forEach(element => {
        updateUI(element);
    });
};

getCountry();

// update details template

const updateUI = (data) => {

    // destructure properties
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = `<div class="flag">
        <img src="${data.flag}" alt="">
    </div>

    <div class="info">
        <h3 class="countryName">${data.name}</h3>
        <p><strong>Population:</strong> <span>${data.population}</span></p>
        <p class="region-name"><strong>Region:</strong> <span>${data.region}</span></p>
        <p><strong>Capital:</strong> <span>${data.capital}</span></p>

    </div>`;
    getCountries.appendChild(country);

    // to display details page

    country.addEventListener("click", () => {
        showCountryDetail(data)
    })
}

// to toggle dropdown

exit.addEventListener("click", () => {
    dropdown.classList.toggle("displayDropdown");

});

// to filter the regions

region.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element);

        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText)
            if (elem.innerText.includes(element.innerText)) {
                elem.parentElement.parentElement.style.display = "grid"
            } else {
                elem.parentElement.parentElement.style.display = "none"
            }
        })
    });
});


// to search and output the result in the UI

search.addEventListener("input", () => {
    Array.from(countryName).forEach(elem => {
        console.log(search.value.toLowerCase())
        if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display = "grid"
        } else {
            elem.parentElement.parentElement.style.display = "none"
        };
    });
});

// to toggle between light and dark theme

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    night.classList.toggle("fas")
});

const showCountryDetail = (data) => {
    countryModal.classList.toggle("display");
    countryModal.innerHTML = `
    <button class="back">Back</button>
    <div class="modal">
        <img src="${data.flag}" alt="">

        <div class="rightModal">
            <h1>${data.name}</h1>
            <div class="modal-info">
                <div class="innerLeft">
                    <p><strong>Native Name:</strong> <span>${data.nativeName}</span></p>
                    <p><strong>Population:</strong> <span>${data.population}</span></p>
                    <p><strong>Region:</strong> <span>${data.region}</span></p>
                    <p><strong>Sub Region:</strong> <span>${data.subregion}</span></p>
                    <p><strong>Capital:</strong> <span>${data.capital}</span></p>
                </div>

                <div class="innerRight">
                    <p><strong>Top Level Domain:</strong> <span>${data.topLevelDomain}</span></p>
                    <p><strong>Currencies:</strong> <span>${data.currencies.map(elem=>elem.name)}</span></p>
                    <p><strong>Language:</strong> <span>${data.languages.map(elem=>elem.name)}</span></p>
                </div>
            </div>

            <div class="borders">
                <h3>Border Countries:</h3>
                <button class="border">${data.borders}</button>
            </div>
        </div>
    </div>

    `

    const back = countryModal.querySelector(".back");
    
    // to toggle details page 
    back.addEventListener("click", () => {
        countryModal.classList.toggle("display")
    });
}

