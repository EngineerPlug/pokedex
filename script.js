/* H1 Functionality */

const services = document.getElementById("services");
const textArray = [
    'Website creation', 
    'Website deployment', 
    'Website maintenance', 
    'SEO optimization'
];
let text = -1;

window.setInterval(function() {
    text++;
    if (text === textArray.length) 
      text = 0;
      services.innerHTML = textArray[text];  
    }, 2000);

    /* Form Functionality */

const url = "https://docs.google.com/forms/u/2/d/e/1FAIpQLSdSUiJJ-NS4hS50FlGmUICnn-2u3AdfAdrfdccpm3O4YyBilg/formResponse";
const form = document.querySelector('form');
const submitBtn = document.getElementById("submit");
const name = document.getElementById("name")
const email = document.getElementById("email");
const phoneNumber = document.getElementById("telephone");
const message = document.getElementById("message");

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";
    console.log(form);
    fetch(url, { mode: 'no-cors', method: 'POST', body: new FormData(form)})
    .then(response => { 
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submitted";
        submitBtn.innerHTML = "Submit";
        form.reset();
        alert('Thanks! Martin Clark will contact your shortly!', response)})
    .catch(error => alert('Error!', error.message))
})