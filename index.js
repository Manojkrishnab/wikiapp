let inputEl = document.getElementById("userInput");
let spinnerEl = document.getElementById("spinner");
let resultsEl = document.getElementById("searchResults");

function createAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let titleBreak = document.createElement("br");
    resultItem.appendChild(titleBreak);
        
    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    linkEl.classList.add("result-link");
    resultItem.appendChild(linkEl);

    let linkBreak = document.createElement("br");
    resultItem.appendChild(linkBreak);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("result-info");
    resultItem.appendChild(descriptionEl);

    resultsEl.appendChild(resultItem);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function searchData(event) {

    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        resultsEl.textContent = "";
        let userInputValue = inputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + userInputValue
        
        let options = {
            method : "GET"
        }

        fetch(url, options)
          .then(function(response) {
            return response.json()
          })

          .then(function(jsonData){
            let { search_results } = jsonData
            displayResults(search_results);
            // console.log(search_results)
          })
    }
}

inputEl.addEventListener("keydown",searchData)


