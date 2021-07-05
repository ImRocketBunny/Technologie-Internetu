function validateForm() {
    const gameSelect = document.getElementById('gra');
    const platformSelect = document.getElementById('platforma');
    const dateInput = document.getElementById('releaseDate');
    const priceInput = document.getElementById('price');
    const versionInput = document.getElementById('version');

    const errorGame = document.getElementById('errorGra');
    const errorPlatform = document.getElementById('errorPlatforma');
    const errorDate = document.getElementById('errorDate');
    const errorPrice = document.getElementById('errorPrice');
    const errorVersion = document.getElementById('errorVersion');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([gameSelect,platformSelect,dateInput,priceInput,versionInput],[errorGame,errorPlatform,errorDate,errorPrice,errorVersion],errorsSummary);

    let valid = true;

    if (!checkRequired(gameSelect.value)) {
        valid = false;
        gameSelect.classList.add("error-input");
        errorGame.innerText = "Pole jest wymagane";
    } 

    if (!checkRequired(platformSelect.value)) {
        valid = false;
        platformSelect.classList.add("error-input");
        errorPlatform.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if (!checkNumberRange(priceInput.value, 0, 1_000_000_000_000)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą większą od 0";
    }

    if (!checkRequired(versionInput.value)) {
        valid = false;
        versionInput.classList.add("error-input");
        errorVersion.innerText = "Pole jest wymagane";
    } else if (!checkNumberRange(versionInput.value, 0, 1_000_000_000_000)) {
        valid = false;
        versionInput.classList.add("error-input");
        errorVersion.innerText = "Pole powinno być liczbą większą od 0";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

