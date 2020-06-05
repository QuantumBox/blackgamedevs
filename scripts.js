var peopleListElement = document.getElementById('list-of-people'),
companiesListElement = document.getElementById('list-of-companies'),
skillsListElement = document.getElementById('list-of-skills'),
locationsListElement = document.getElementById('list-of-locations'),
namesListElement = document.getElementById('list-of-letters'),
filterOnElement = document.getElementById('filter-on'),
filterDetailElement = document.getElementById('filter-current'),
filterLoadingElement = document.getElementById('filter-loading-icon'),
filterSection = document.getElementById('section-filters'),
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

    // Hide loading
    filterLoadingElement.classList.add('display-none');
    filterSection.classList.remove('display-none');

    // Add to list of skills and locations
    generateFilterableList ('location', companyData, filterableLocations, locationsListElement);
    generateFilterableList ('name', companyData, filterableNames, namesListElement);
});

function createId (string) {
    var filterId = string.replace(/[\. ,:-]+/g, '-').toLowerCase();
    return filterId;
}

function generateFilterableList(keyToFilter, dataArray, filterArray, element) {
    var filterListString = '';

    for (var i = 0; i < dataArray.length; i++) {
        var filterListItemString = '';

        if (dataArray[i][keyToFilter]) {
            if (keyToFilter === 'skills'){
                for (var j = 0; j < dataArray[i][keyToFilter].length; j++) {
                    if (!filterArray.includes(dataArray[i][keyToFilter][j])) {
                        filterArray.push(dataArray[i][keyToFilter][j]);
                        filterListString += populateFilterElement(keyToFilter, dataArray[i][keyToFilter][j], element, filterListItemString)
                    }
                }
            } else if (keyToFilter === 'name') {
                var firstLetter = dataArray[i][keyToFilter].charAt(0).toUpperCase();

                if (!filterArray.includes(firstLetter)) {
                    filterArray.push(firstLetter);
                    filterListString += populateFilterElement(keyToFilter, firstLetter, element, filterListItemString);
                }
            } else {
                if ((dataArray[i][keyToFilter] !== '') && (dataArray[i][keyToFilter] !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS") && (!filterArray.includes(dataArray[i][keyToFilter]))) {
                    filterArray.push(dataArray[i][keyToFilter]);
                    filterListString += populateFilterElement(keyToFilter, dataArray[i][keyToFilter], element, filterListItemString);
                }
            }
        }
    }

    element.innerHTML += filterListString;

    return filterArray;
}

function populateFilterElement(keyToFilter, filterValue, element, filterListItemString) {

    if (typeof filterValue !== 'undefined') {
        var filterAsString;
        filterAsString = titleCaseString(filterValue);

        var filterId = createId(filterValue);
        filterListItemString += '<li><button class="filter-button" onclick="filterData(\''+ keyToFilter +'\', \'' + filterValue +'\');" id="filter-' + filterId + '">' + filterAsString + '</button></li>';
        return filterListItemString;
    }
}

function titleCaseString (str) {
    str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    return str;
}

var filterSettings = {
  'skills': {},
  'location': {},
  'name': {},
};

function filterData (keyToFilter, keyValue) {
    if (keyToFilter === undefined) {
        // Clear all filter data.
        filterSettings = Object.fromEntries(Object.keys(filterSettings).map(function(key) { return [key, {}]; }));
    }
    else {
        // Toggle the filter setting by adding or removing it from the object
        let existingFilterSetting = filterSettings[keyToFilter][keyValue];
        if (existingFilterSetting === undefined) {
            filterSettings[keyToFilter][keyValue] = true;
        }
        else {
            delete filterSettings[keyToFilter][keyValue];
        }
    }

    updateFilters();
}

function updateFilters () {
    // Clear the filtered data
    filteredPersonData = [];
    filteredCompanyData = [];

    let filterFunctions = Object.fromEntries(Object.entries(filterSettings).map(function(entry) {
        let key = entry[0];
        let filters = entry[1];
        if (Object.keys(filters).length == 0) {
            // All items pass if there are no filter entries
            return [key, function(item) { return true; }];
        }
        else if (key == 'name') {
            // Specialize the 'name' filter to only consider the first letter
            return [key, function(item) { return item.hasOwnProperty(key) && item[key].charAt(0) in filters; }];
        }
        else {
            let processValue = function(value) { return value; };  // Default makes no change to the value being tested

            if (key == 'name') {
                // Specialize the 'name' filter to only consider the first letter
                processValue = function(value) { return value.charAt(0); };
            }

            // Box raw values into arrays to treat them the same
            let toArray = function(x) { return Array.isArray(x) ? x : [x]; };

            // Items pass if any of the items in their array of properties meet at least one of the filter's requirements
            return [key, function(item) { return item.hasOwnProperty(key) && toArray(item[key]).some(function(value) { return processValue(value) in filters; }); }];
        }
    }));

    let personFilters = ['skills', 'location', 'name'];
    let companyFilters = ['location', 'name'];

    // Filter the data
    filteredPersonData = personData.filter(function(person) {
        // Entries pass only if they pass every filter
        return personFilters.every(function(filterKey) { return filterFunctions[filterKey](person); });
    });

    filteredCompanyData = companyData.filter(function(company) {
        // Entries pass only if they pass every filter
        return companyFilters.every(function(filterKey) { return filterFunctions[filterKey](company); });
    });

    // Update the UI
    let filterStrings = Object.entries(filterSettings).map(function(entry) {
        let key = entry[0];
        let filterValues = Object.keys(entry[1]).map(function(filterValue) { return titleCaseString(filterValue); });

        if (filterValues.length) {
            let filterValuesString = (filterValues.length > 1) ? ("(" + filterValues.join(" OR ") + ")") : filterValues[0];
            return key + ": " + filterValuesString;
        }

        return "";
    });

    let mainFilterString = filterStrings.filter(function (filterString) { return filterString.length > 0; }).join(" AND ");

    if (mainFilterString.length) {
        filterOnElement.classList.remove('display-none');
        filterDetailElement.innerText = mainFilterString;
    }
    else {
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
    if ((typeof location !== 'undefined') && (location !== '') && (location !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS")) {
        locationElement = '<p class="list-item-location mt-0"><button class="filter-button mb-0" onclick="filterData(\'location\', \'' + location + '\')"><img src="/icon-location.svg" class="icon icon-light mr-1">' + location + '</button></p>';
    }

    return locationElement;
}

function generateImageElement (imageElement, image, type) {
    imageElement = '<div class="list-item-image mb-2"><div class="list-item-image-crop">';
    if ((typeof image !== 'undefined') && (image.length > 0) && (image !== "http://image-link-here.com/image.png")) {
        imageElement += '<img src="' + image + '">';
    } else {
        // If no image, show placeholder
        switch (type) {
            case "person":
            imageElement += '<img src="no-user-image.png">';
            break;
            default:
            imageElement += '<img src="no-company-image.png">';
            break;
        }
    }

    imageElement += '</div></div>';

    return imageElement;
}

function generateLinksElement (linksElement, links, iconName) {
    if (typeof links !== 'undefined') {

        linksElement += '<div class="list-item-links mb-1"><ul class="link-list"><li><img src="/' + iconName + '.svg" class="icon icon-light icon-large vertical-align-middle"></li>';

        for (var i = 0; i < links.length; i++) {
            var individualLink = links[i];
            if ((typeof individualLink !== 'undefined') && (individualLink.length > 0)) {
                linksElement += '<li><a href="' + individualLink[1] + '" target="_blank">' + individualLink[0] + '</a></li>';
            }
        }
        linksElement += '</ul></div>';
    }

    return linksElement;
}

function displayPersonData () {
    var peopleListHtml = '';

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
        formattedName = '<h3 class="list-item-name">' + individualPerson.name + '</h3>';

        // Show location
        formattedLocation = generateLocationElement(formattedLocation, individualPerson.location);

        // Show skills
        if ((typeof individualPerson.skills !== 'undefined') && (individualPerson.skills.length > 0)) {
            formattedSkills += '<ul class="skill-list">';
            for (var h = 0; h < individualPerson.skills.length; h++) {
                formattedSkills += '<li><button class="filter-button" onclick="filterData(\'skills\', \'' + individualPerson.skills[h] + '\')">' + individualPerson.skills[h] + '</button></li>';
            }
            formattedSkills += '</ul>';
        }

        // Show image
        formattedImage = generateImageElement(formattedImage, individualPerson.image, 'person');

        if (individualPerson.websites) {
            // Personal links
            formattedPersonalLinks = generateLinksElement(formattedPersonalLinks, individualPerson.websites.personal, 'icon-user');

            // Business links
            formattedBusinessLinks = generateLinksElement(formattedBusinessLinks, individualPerson.websites.business, 'icon-business');

        }

        // Game links
        formattedGameLinks = generateLinksElement(formattedGameLinks, individualPerson.games, 'icon-game');

        listItemTemplate = '<li class="grid-list-item" id="' + createId(individualPerson.name) +'">' + formattedName + formattedLocation + formattedImage + formattedSkills + formattedPersonalLinks + formattedBusinessLinks + formattedGameLinks + '</li>';

        peopleListHtml += listItemTemplate;
    }

    peopleListElement.innerHTML = peopleListHtml;
}

function displayCompanyData() {
    var companiesHtml = '';

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
        listItemTemplate = '<li class="grid-list-item" id="' + createId(individualCompany.name) +'">' + formattedName + formattedLocation + formattedImage + formattedWebsiteLinks + formattedGameLinks + '</li>';

            companiesHtml += listItemTemplate;
    }

    companiesListElement.innerHTML = companiesHtml;
}
