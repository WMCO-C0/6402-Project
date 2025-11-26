// Only register handler on home pages
var pathMatch = window.location.pathname.match(/\/(index\.html|home\.html)$/i);
if(pathMatch){
    var check = document.querySelector('.check');
    if(check){
        check.addEventListener('change', idioma);
    }
}

function idioma(){
    let id=check.checked;
    if (id==true){
        location.href="home.html";
    }else{
        location.href="index.html";
    }
}