var peopleListElement = document.getElementById('list-of-people'),
companiesListElement = document.getElementById('list-of-companies'),
skillsListElement = document.getElementById('list-of-skills'),
locationsListElement = document.getElementById('list-of-locations'),
namesListElement = document.getElementById('list-of-letters'),
filterOnElement = document.getElementById('filter-on'),
filterDetailElement = document.getElementById('filter-current'),
personData = [],
companyData = [],
filteredPersonData = [],
filteredCompanyData = [],
filterableSkills = [],
filterableLocations = [],
filterableNames = [];

function loadPeopleJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'people.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == '200') {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadPeopleJSON(function(response) {
    // Parse JSON string into object
    personData = JSON.parse(response);

    // Remove the template object
    personData.splice(0, 1);

    // Filter and display data
    filterData();

    // Add to list of skills and locations
    generateFilterableList ('skills', personData, filterableSkills, skillsListElement);
    generateFilterableList ('location', personData, filterableLocations, locationsListElement);
    generateFilterableList ('name', personData, filterableNames, namesListElement);
});

function loadCompaniesJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'companies.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == '200') {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadCompaniesJSON(function(response) {
    // Parse JSON string into object
    companyData = JSON.parse(response);

    // Remove the template object
    companyData.splice(0, 1);

    // Filter and display data
    filterData();

    // Add to list of skills and locations
    generateFilterableList ('location', companyData, filterableLocations, locationsListElement);
    generateFilterableList ('name', companyData, filterableNames, namesListElement);
});

function createId (string) {
    var filterId = string.replace(/[\. ,:-]+/g, '-').toLowerCase();
    return filterId;
}

function generateFilterableList(keyToFilter, dataArray, filterArray, element) {
    for (var i = 0; i < dataArray.length; i++) {
        if (keyToFilter === 'skills'){
            for (var j = 0; j < dataArray[i][keyToFilter].length; j++) {
                if (!filterArray.includes(dataArray[i][keyToFilter][j])) {
                    filterArray.push(dataArray[i][keyToFilter][j]);
                    populateFilterElement(keyToFilter, dataArray[i][keyToFilter][j], element);
                }
            }
        } else if (keyToFilter === 'name') {
            var firstLetter = dataArray[i][keyToFilter].charAt(0).toUpperCase();

            if (!filterArray.includes(firstLetter)) {
                filterArray.push(firstLetter);
                populateFilterElement(keyToFilter, firstLetter, element);
            }
        } else {
            if ((dataArray[i][keyToFilter] !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS") && (!filterArray.includes(dataArray[i][keyToFilter]))) {
                filterArray.push(dataArray[i][keyToFilter]);
                populateFilterElement(keyToFilter, dataArray[i][keyToFilter], element);
            }
        }
    }

    return filterArray;
}

function populateFilterElement(keyToFilter, filterValue, element) {
    if (typeof filterValue !== 'undefined') {
        var filterAsString;
        filterAsString = titleCaseString(filterValue);

        var filterId = createId(filterValue);
        element.innerHTML += '<li><button class="filter-button" onclick="filterData(\''+ keyToFilter +'\', \'' + filterValue +'\');" id="filter-' + filterId + '">' + filterAsString + '</button></li>';
    }
}

function titleCaseString (str) {
    str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    return str;
}

function filterData (keyToFilter, keyValue) {
    // Clear the filtered data
    filteredPersonData = [];
    filteredCompanyData = [];

    // If there's a filter, filter the data or replicate the full list
    if (keyToFilter){
        for (var i = 0; i < personData.length; i++) {
            if (keyToFilter === 'name') {
                if (personData[i][keyToFilter].charAt(0) === keyValue) {
                    filteredPersonData.push(personData[i]);
                }
            } else {
                if (personData[i][keyToFilter].includes(keyValue)) {
                    filteredPersonData.push(personData[i]);
                }
            }
        }

        // Company data
        for (var j = 0; j < companyData.length; j++) {
            if (keyToFilter === 'name') {
                if (companyData[j][keyToFilter].charAt(0) === keyValue) {
                    filteredCompanyData.push(companyData[j]);
                }
            } else if (keyToFilter === 'location') {
                if (companyData[j][keyToFilter].includes(keyValue)) {
                    filteredCompanyData.push(companyData[j]);
                }
            } else {
                filteredCompanyData = companyData;
            }
        }

        filterOnElement.classList.remove('display-none');
        filterDetailElement.innerHTML = keyToFilter + ': ' + titleCaseString(keyValue);
    } else {
        filteredPersonData = personData;
        filteredCompanyData = companyData;
        filterOnElement.classList.add('display-none');
    }

    // Sort by name
    filteredPersonData.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
    });

    filteredCompanyData.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
    });

    // Display after filtered
    displayPersonData();
    displayCompanyData();
}

function generateLocationElement (locationElement, location) {
    if ((typeof location !== 'undefined') && (location !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS")) {
        locationElement = '<p class="mt-0"><button class="filter-button mb-0" onclick="filterData(\'location\', \'' + location + '\')"><img src="/icon-location.svg" class="icon icon-light mr-1">' + location + '</button></p>';
    }

    return locationElement;
}

function generateImageElement (imageElement, image, type) {
    if ((typeof image !== 'undefined') && (image.length > 0) && (image !== "http://image-link-here.com/image.png")) {
        imageElement = '<div class="list-item-image"><img src="' + image + '"></div>';
    } else {
        // If no image, show placeholder
        switch (type) {
            case "person":
            imageElement = '<div class="list-item-image"><img src="no-user-image.png"></div>';
            break;
            default:
            imageElement = '<div class="list-item-image"><img src="no-company-image.png"></div>';
            break;
        }
    }

    return imageElement;
}

function generateLinksElement (linksElement, links, iconName) {
    if (typeof links !== 'undefined') {

        linksElement += '<div class="mb-1"><ul class="link-list"><li><img src="/' + iconName + '.svg" class="icon icon-light icon-large vertical-align-middle"></li>';

        for (var i = 0; i < links.length; i++) {
            var individualLink = links[i];
            console.log(links[i]);
            if ((typeof individualLink !== 'undefined') && (individualLink.length > 0)) {
                linksElement += '<li><a href="' + individualLink[1] + '" target="_blank">' + individualLink[0] + '</a></li>';
            }
        }
        linksElement += '</ul></div>';
    }

    return linksElement;
}

function displayPersonData () {
    // Empty HTML list
    peopleListElement.innerHTML = '';

    // Go through list and add filtered data
    for (var i = 0; i < filteredPersonData.length; i++) {
        var listItemTemplate = '',
        formattedImage = '',
        formattedLocation = '',
        formattedSkills = '',
        formattedPersonalLinks = '',
        formattedBusinessLinks = '',
        formattedGameLinks = '',
        individualPerson = filteredPersonData[i],
        formattedName = '<h3>' + individualPerson.name + '</h3>';

        // Show location
        formattedLocation = generateLocationElement(formattedLocation, individualPerson.location);

        // Show skills
        if ((typeof individualPerson.skills !== 'undefined') && (individualPerson.skills.length > 0)) {
            formattedSkills += '<ul class="skill-list mt-2">';
            for (var h = 0; h < individualPerson.skills.length; h++) {
                formattedSkills += '<li><button class="filter-button" onclick="filterData(\'skills\', \'' + individualPerson.skills[h] + '\')">' + individualPerson.skills[h] + '</button></li>';
            }
            formattedSkills += '</ul>';
        }

        // Show image
        formattedImage = generateImageElement(formattedImage, individualPerson.image, 'person');

        // Personal links
        formattedPersonalLinks = generateLinksElement(formattedPersonalLinks, individualPerson.websites.personal, 'icon-user');

        // Business links
        formattedBusinessLinks = generateLinksElement(formattedBusinessLinks, individualPerson.websites.business, 'icon-business');

        // Game links
        formattedGameLinks = generateLinksElement(formattedGameLinks, individualPerson.games, 'icon-game');

        listItemTemplate = '<li id="' + createId(individualPerson.name) +'">' + formattedName + formattedLocation + formattedImage + formattedSkills + formattedGameLinks + formattedPersonalLinks + formattedBusinessLinks + '</li>';

        var peopleListElementHTML = peopleListElement.innerHTML;
        peopleListElement.innerHTML = peopleListElementHTML + listItemTemplate;
    }
}

function displayCompanyData() {
    // Empty HTML list
    companiesListElement.innerHTML = '';

    // Go through list and add filtered data
    for (var i = 0; i < filteredCompanyData.length; i++) {
        var listItemTemplate = '',
        formattedImage = '',
        formattedLocation = '',
        formattedWebsiteLinks = '',
        formattedGameLinks = '',
        individualCompany = filteredCompanyData[i],
        formattedName = '<h3>' + individualCompany.name + '</h3>';

        // Show location
        formattedLocation = generateLocationElement(formattedLocation, individualCompany.location);

        // Show image
        formattedImage = generateImageElement(formattedImage, individualCompany.image, "company");

        // Website links
        formattedWebsiteLinks = generateLinksElement(formattedWebsiteLinks, individualCompany.websites, 'icon-world');

        // Game links
        formattedGameLinks = generateLinksElement(formattedGameLinks, individualCompany.games, 'icon-game');

        // Draw item
        listItemTemplate = '<li id="' + createId(individualCompany.name) +'">' + formattedName + formattedLocation + formattedImage + formattedGameLinks + formattedWebsiteLinks + '</li>';

        var companiesListElementHTML = companiesListElement.innerHTML;
        companiesListElement.innerHTML = companiesListElementHTML + listItemTemplate;
    }
}