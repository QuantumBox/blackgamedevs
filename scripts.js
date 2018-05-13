var peopleListElement = document.getElementById('list-of-people'),
skillsListElement = document.getElementById('list-of-skills'),
locationsListElement = document.getElementById('list-of-locations'),
filterOnElement = document.getElementById('filter-on'),
filterDetailElement = document.getElementById('filter-current'),
personData = [],
filteredPersonData = [],
filterableSkills = [],
filterableLocations = [];

function loadJSON(callback) {

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

loadJSON(function(response) {
    // Parse JSON string into object
    personData = JSON.parse(response);

    // Remove the template object
    personData.splice(0, 1);

    // Filter and display data
    filterPersonData();

    // Add to list of skills and locations
    generateFilterableList ('skills', filterableSkills, skillsListElement);
    generateFilterableList ('location', filterableLocations, locationsListElement);
});

function createId (string) {
    var filterId = string.replace(/\s/g , "-");
    return filterId;
}

function generateFilterableList(keyToFilter, filterArray, element) {
    for (var i = 0; i < personData.length; i++) {
        if(keyToFilter === 'skills'){
            for (var j = 0; j < personData[i][keyToFilter].length; j++) {
                if (!filterArray.includes(personData[i][keyToFilter][j])) {
                    filterArray.push(personData[i][keyToFilter][j]);
                }
            }
        } else {if ((personData[i][keyToFilter] !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS") && (!filterArray.includes(personData[i][keyToFilter]))) {
            filterArray.push(personData[i][keyToFilter]);
            }
        }
    }

    for (var i = 0; i < filterArray.length; i++) {
        var filterAsString;
        filterAsString = titleCaseString(filterArray[i]);
        var filterId = createId(filterArray[i]);
        element.innerHTML += '<li><button class="filter-button" onclick="filterPersonData(\''+ keyToFilter +'\', \'' + filterArray[i] +'\');" id="filter-' + filterId + '">' + filterAsString + '</button></li>';
    }

    return filterArray;
}

function titleCaseString (str) {
    str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    return str;
}

function filterPersonData (keyToFilter, keyValue) {
    // Clear the filtered data
    filteredPersonData = [];

    // If there's a filter, filter the data or replicate the full list
    if (keyToFilter){
        for (var i = 0; i < personData.length; i++) {
            if (personData[i][keyToFilter].includes(keyValue)) {
                filteredPersonData.push(personData[i]);
            }
        }

        filterOnElement.classList.remove('display-none');
        filterDetailElement.innerHTML = keyToFilter + ': ' + titleCaseString(keyValue);
    } else {
        filteredPersonData = personData;
        filterOnElement.classList.add('display-none');
    }

    // Sort by name
    filteredPersonData.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
    });

    // Display after filtered
    displayPersonData();
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
        if ((typeof individualPerson.location !== 'undefined') && (individualPerson.location !== "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS")) {
            formattedLocation = '<p class="mt-0"><button class="filter-button" onclick="filterPersonData(\'location\', \'' + individualPerson.location + '\')"><img src="/icon-location.svg" class="icon icon-light mr-1">' + individualPerson.location + '</button></p>';
        }

        // Show skills
        if ((typeof individualPerson.skills !== 'undefined') && (individualPerson.skills.length > 0)) {
            if (individualPerson.skills.length === 1) {
                formattedSkills = '<h4>Skill</h4>'
            } else {
                formattedSkills = '<h4>Skills</h4>'
            }

            formattedSkills += '<ul class="skill-list">';
            for (var h = 0; h < individualPerson.skills.length; h++) {
                formattedSkills += '<li><button class="filter-button" onclick="filterPersonData(\'skills\', \'' + individualPerson.skills[h] + '\')">' + individualPerson.skills[h] + '</button></li>';
            }
            formattedSkills += '</ul>';
        }

        // Show image
        if ((typeof individualPerson.image !== 'undefined') && (individualPerson.image.length > 0) && (individualPerson.image !== "http://image-link-here.com/image.png")) {
            formattedImage = '<div class="list-item-image"><img src="' + individualPerson.image + '"></div>';
        } else {
            // If no image, show placeholder
            formattedImage = '<div class="list-item-image"><img src="no-user-image.png"></div>';
        }

        // Personal links
        if (typeof individualPerson.websites.personal !== 'undefined') {
            if (individualPerson.websites.personal.length === 1) {
                formattedPersonalLinks = '<h4>Personal site</h4>'
            } else {
                formattedPersonalLinks = '<h4>Personal sites</h4>'
            }

            formattedPersonalLinks += '<ul class="link-list">';
            for (var j = 0; j < individualPerson.websites.personal.length; j++) {
                var individualWebsite = individualPerson.websites.personal[j];
                if ((typeof individualWebsite !== 'undefined') && (individualWebsite.length > 0)) {
                    formattedPersonalLinks += '<li><a href="' + individualWebsite[1] + '" target="_blank">' + individualWebsite[0] + '</a></li>';
                }
            }
            formattedPersonalLinks += '</ul>';
        }

        // Business links
        if (typeof individualPerson.websites.business !== 'undefined') {
            if (individualPerson.websites.business.length === 1) {
                formattedPersonalLinks = '<h4>Business site</h4>'
            } else {
                formattedPersonalLinks = '<h4>Business sites</h4>'
            }

            formattedBusinessLinks += '<ul class="link-list">';
            for (var k = 0; k < individualPerson.websites.business.length; k++) {
                var individualWebsite = individualPerson.websites.business[k];
                if ((typeof individualWebsite !== 'undefined') && (individualWebsite.length > 0)) {
                    formattedBusinessLinks += '<li><a href="' + individualWebsite[1] + '" target="_blank">' + individualWebsite[0] + '</a></li>';
                }
            }
            formattedBusinessLinks += '</ul>';
        }

        // Game links
        if (typeof individualPerson.games !== 'undefined') {
            formattedGameLinks = '<h4>Playable games</h4><ul class="link-list">';
            for (var l = 0; l < individualPerson.games.length; l++) {
                var individualGame = individualPerson.games[l];
                if ((typeof individualGame !== 'undefined') && (individualGame.length > 0)) {
                    formattedGameLinks += '<li><a href="' + individualGame[1] + '" target="_blank">' + individualGame[0] + '</a></li>';
                }
            }
            formattedGameLinks += '</ul>';
        }

        listItemTemplate = '<li>' + formattedName + formattedLocation + formattedImage + formattedSkills + formattedGameLinks + formattedPersonalLinks + formattedBusinessLinks + '</li>';

        var peopleListElementHTML = peopleListElement.innerHTML;
        peopleListElement.innerHTML = peopleListElementHTML + listItemTemplate;
    }
}