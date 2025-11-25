var check = document.querySelector('.check');
if (check) check.addEventListener('click', idioma);

function idioma(){
    let id = check.checked;
    if (id == true){
        location.href = "Ana-Paez-ENG.html";
    } else {
        location.href = "Ana-Paez.html";
    }
}
