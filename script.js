

let count = 0;

//Allowing country name to be accessed upon event
//Also highlights the country
let allSvgs = document.getElementsByTagName('path');
for (let country of allSvgs) {
    
    country.addEventListener('click',function(){
        let allActives = document.querySelectorAll(".Selected");
        //remove the active class upon each click so
        //only one country is highlighted
        allActives.forEach(function(element){
            element.classList.remove("Selected");
        });
        //some paths do not have a name attr and only class
        //thus not all have country codes
        //to-do: manually input country codes in paths that
        //are missing it
        //then if-else statement will be optional to use
        let itsName = "";        
        if (country.getAttribute("name") === null) {
            itsName = country.getAttribute("class")
        }    
        else {
            itsName = country.getAttribute("name");
        }
        //display contents in div below as test        
        country.classList.add('Selected');
        //clear prev data
        document.getElementById("countryName").innerText = "";
        document.getElementById("countryCapital").innerText = "";
        document.getElementById("region").innerText = "";
        document.getElementById("income").innerText = "";
        document.getElementById("latitude").innerText = "";
        document.getElementById("longitude").innerText = "";
        //fetch json
        let myUrl = "http:api.worldbank.org/v2/country/" + country.getAttribute("id") + "?format=json";
        console.log(myUrl);
        fetch(myUrl)
        .then(function(response) {
            return response.json();
        })
        //access the array element with the countries data
        //worldbank has an array with elements that have 
        //diff types of data
        //countries data is on element with index 1
        .then(function(myJsonArray){             
            let countryText = document.getElementById("countryName");
            countryText.innerText += myJsonArray[1][0].name;
            let countryCap = document.getElementById("countryCapital");
            countryCap.innerText += myJsonArray[1][0].capitalCity;
            let countryRegion = document.getElementById("region");
            countryRegion.innerText += myJsonArray[1][0].region.value;
            let countryIncome = document.getElementById("income");
            countryIncome.innerText += myJsonArray[1][0].incomeLevel.value;
            let countryLat = document.getElementById("latitude");
            countryLat.innerText += myJsonArray[1][0].latitude;
            let countryLong = document.getElementById("longitude");
            countryLong.innerText += myJsonArray[1][0].longitude;
        })
            
        .catch(function(error) {
            console.log(error)
        })
        
    })
    
    country.addEventListener("mouseover", function(event) {
               
        document.getElementById("tooltip");
        let itsName = "";        
        if (country.getAttribute("name") === null) {
            itsName = country.getAttribute("class")
        }    
        else {
            itsName = country.getAttribute("name")
            if (country.classList.contains("Selected")) {
                itsName += " Selected";
            };
        };
        let tooltipWidth = tooltip.getBoundingClientRect().width;
        tooltip.innerText = itsName;
        tooltip.style.display = "block";
        tooltip.style.top = `${event.clientY}px`;
        tooltip.style.left = `${event.clientX}px`;
        
        country.addEventListener("mouseout", function() {
            let tooltip = document.getElementById("tooltip");
            tooltip.style.display = "none";
        })

    });
    

}



//add country codes to all the countries
//allow for the display of only one country
// link to angular with services and routing

console.log(allSvgs.length)