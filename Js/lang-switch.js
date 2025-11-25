// Global language switch: toggles between `page.html` and `page-ENG.html`
document.addEventListener('DOMContentLoaded', function(){
    var check = document.querySelector('.check');
    if(!check) return;

    // Reflect current language in checkbox state
    var path = window.location.pathname;
    var filename = path.split('/').pop();
    if(filename.indexOf('-ENG') !== -1){
        try{ check.checked = true; }catch(e){}
    }

    function goToOtherLang(){
        var path = window.location.pathname;
        var dir = path.substring(0, path.lastIndexOf('/') + 1);
        var current = path.split('/').pop();
        if(!current) return;
        if(current.indexOf('-ENG') !== -1){
            // ENG -> base (remove -ENG)
            var target = current.replace(/-ENG\.html$/i, '.html');
            window.location.href = dir + target;
        } else {
            // base -> ENG
            var target = current.replace(/\.html$/i, '-ENG.html');
            window.location.href = dir + target;
        }
    }

    // Use change event for accessibility; click may fire before checked state changes in some browsers
    check.addEventListener('change', goToOtherLang);
});
