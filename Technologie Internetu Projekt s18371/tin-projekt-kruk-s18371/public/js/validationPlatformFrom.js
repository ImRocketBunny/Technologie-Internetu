function validateForm() {
    const nameInput = document.getElementById('name');
    const producerInput = document.getElementById('producer');
    

    const errorName = document.getElementById('errorName');
    const errorProducer = document.getElementById('errorProducer');
    
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([nameInput,producerInput],[errorName,errorProducer],errorsSummary);
    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(producerInput.value)) {
        valid = false;
        producerInput.classList.add("error-input");
        errorProducer.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(producerInput.value, 2, 60)) {
        valid = false;
        producerInput.classList.add("error-input");
        errorProducer.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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