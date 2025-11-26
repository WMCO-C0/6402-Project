// Only register handler on testimonios/testimonials pages
var pathMatch = window.location.pathname.match(/\/(testimonios|testimonials)(?:\.html)?$/i);
if(pathMatch){
    var check = document.querySelector('.check');
    if(check){
        check.addEventListener('change', idioma);
    }
}

function idioma(){
    let id=check.checked;
    if (id==true){
        location.href="testimonials.html";
    }else{
        location.href="testimonios.html";
    }
}