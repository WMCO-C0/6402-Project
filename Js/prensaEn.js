// Only register handler on prensa/news pages
var pathMatch = window.location.pathname.match(/\/(prensa|news)(?:\.html)?$/i);
if(pathMatch){
    var check = document.querySelector('.check');
    if(check){
        check.addEventListener('change', idioma);
    }
}

function idioma(){
    let id=check.checked;
    if (id==true){
        location.href="news.html";
    }else{
        location.href="prensa.html";
    }
}