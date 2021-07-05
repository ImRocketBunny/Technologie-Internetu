function validateForm() {
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');
    const editionInput = document.getElementById('edition');

    const errorTitle = document.getElementById('errorTitle');
    const errorCategory = document.getElementById('errorCategory');
    const errorEdition = document.getElementById('errorEdition');
    const errorsSummary = document.getElementById('errorsSummary');
    console.log('elo');

    resetErrors([titleInput,categoryInput,editionInput],[errorTitle,errorCategory,errorEdition],errorsSummary);
    let valid = true;

    if (!checkRequired(titleInput.value)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(titleInput.value, 2, 60)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(categoryInput.value)) {
        valid = false;
        categoryInput.classList.add("error-input");
        errorCategory.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(categoryInput.value, 2, 60)) {
        valid = false;
        categoryInput.classList.add("error-input");
        errorCategory.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(editionInput.value)) {
        valid = false;
        editionInput.classList.add("error-input");
        errorEdition.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(editionInput.value, 2, 60)) {
        valid = false;
        editionInput.classList.add("error-input");
        errorEdition.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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