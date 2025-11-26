// Only register handler on creditos/About pages
var pathMatch = window.location.pathname.match(/\/(creditos|About|creditos2)(?:\.html)?$/i);
if(pathMatch){
    var check = document.querySelector('.check');
    if(check){
        check.addEventListener('change', idioma);
    }
}

function idioma(){
    let id=check.checked;
    if (id==true){
        location.href="About.html";
    }else{
        location.href="creditos.html";
    }
}