var check = document.querySelector('.check');

// Sólo registrar el listener en las páginas relacionadas con el formulario
if (check && (window.location.pathname.endsWith('formulario.html') || window.location.pathname.endsWith('forms.html'))) {
    check.addEventListener('change', idioma);
}

function idioma(){
    let id = check.checked;
    if (id == true){
        location.href = "forms.html";
    } else {
        location.href = "formulario.html";
    }
}