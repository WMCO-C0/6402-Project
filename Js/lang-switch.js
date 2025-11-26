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
        var pathname = window.location.pathname;
        var segs = pathname.split('/');
        // remove empty trailing segment if path ends with '/'
        if(segs.length > 1 && segs[segs.length-1] === '') segs.pop();

        var last = segs[segs.length-1] || '';
        var isHtml = /\.html$/i.test(last);
        var base = last;
        if(isHtml){ base = last.replace(/\.html$/i, ''); }

        var dir = segs.slice(0, segs.length-1).join('/') + '/';
        var candidates = [];

        // Special case: index <-> home
        if(base === 'index'){
            candidates.push(dir + 'home.html');
        } else if(base === 'home'){
            candidates.push(dir + 'index.html');
        } else {
            // Standard case: page <-> page-ENG
            var isEng = /-ENG$/i.test(base);
            var otherBase = isEng ? base.replace(/-ENG$/i, '') : base + '-ENG';

            if(isHtml){
                // if current is file.html, try sibling file
                candidates.push(dir + otherBase + '.html');
                // also try directory form
                candidates.push(dir + otherBase + '/');
                candidates.push(dir + otherBase + '/index.html');
            } else {
                // current is directory-like or no extension
                var parent = dir + otherBase + '/';
                candidates.push(parent);
                candidates.push(parent + 'index.html');
                // also try file variant at same level
                candidates.push(dir + otherBase + '.html');
            }
        }

        // try to find an existing candidate via HEAD request, fallback to first candidate
        (async function(){
            for(var i=0;i<candidates.length;i++){
                try{
                    var url = candidates[i];
                    var resp = await fetch(url, {method: 'HEAD'});
                    if(resp && resp.ok){
                        window.location.href = url;
                        return;
                    }
                }catch(e){
                    // ignore and try next
                }
            }
            // fallback: navigate to first candidate (may 404 but server might redirect)
            window.location.href = candidates[0];
        })();
    }

    // Use change event for accessibility; click may fire before checked state changes in some browsers
    check.addEventListener('change', goToOtherLang);
});
