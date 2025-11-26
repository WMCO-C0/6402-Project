// Only register handler on Ana-Paez pages
var pathMatch = window.location.pathname.match(/\/Ana-Paez(?:-ENG)?\.html$/i);
if(pathMatch){
    var check = document.querySelector('.check');
    if (check) check.addEventListener('change', idioma);
}

function idioma(){
    let id = check.checked;
    if (id == true){
        location.href = "Ana-Paez-ENG.html";
    } else {
        location.href = "Ana-Paez.html";
    }
}