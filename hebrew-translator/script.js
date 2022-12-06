const resetBtn = document.getElementById("resetBtn");

function resetPage() {
    window.location.href = "hebrew-translator\index.html";
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }
