// Función para generar el footer
function crearFooter() {
    // Contenido HTML del footer
    const footerHTML = `
      <footer class="footer text-white text-center py-3" style="background-color: #836857;">
        <div class="container-fluid px-5">
          <div class="row LineaFoot">
            <div class="col-12 col-md-4 mt-5">
              <img src="Img/logofooter.png" alt="Logo Footer" class="img-fluid">
            </div>
            <div class="col-12 col-md-4 mt-5 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex flex-column align-items-center justify-content-center text-center footer-license">
                <p class="lic-title" style="margin-bottom: .25rem;"><strong>Licencia Creative Commons:</strong> Atribución-NoComercial-SinDerivadas (CC BY-NC-ND 4.0)</p>
                <p class="lic-desc" style="margin-bottom:.75rem;">Algunas imágenes y materiales en este sitio están disponibles bajo la licencia Creative Commons Atribución-NoComercial-SinDerivadas. Esto permite compartir el material con atribución, pero no permite usos comerciales ni obras derivadas. Para más información sobre la licencia, visita <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer" style="color: #F1E8D9; text-decoration: underline;">CC BY-NC-ND 4.0</a>.</p>
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer" aria-label="Licencia CC BY-NC-ND" style="display:inline-block;">
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <img src="Img/cc/cc.svg" alt="CC" style="width:40px;height:40px; display:block;">
                    <img src="Img/cc/by.svg" alt="BY" style="width:40px;height:40px; display:block;">
                    <img src="Img/cc/nc.svg" alt="NC" style="width:40px;height:40px; display:block;">
                    <img src="Img/cc/nd.svg" alt="ND" style="width:40px;height:40px; display:block;">
                  </div>
                </a>
              </div>
            </div>
            <div class="col-12 col-md-4 mt-5 d-flex flex-column justify-content-center">
              <div class="d-flex justify-content-evenly">
                <a href="https://www.facebook.com/wikimedia.co" target="_blank" class="ColorRedes" aria-label="Facebook">
                  <i class="bi bi-facebook" style="font-size: 2rem;"></i>
                </a>
                <a href="https://www.instagram.com/wikimediaco/?hl=es" target="_blank" class="ColorRedes" aria-label="Instagram">
                  <i class="bi bi-instagram" style="font-size: 2rem;"></i>
                </a>
                <a href="https://www.youtube.com/@wikimediacolombia4747" target="_blank" class="ColorRedes" aria-label="YouTube">
                  <i class="bi bi-youtube" style="font-size: 2rem;"></i>
                </a>
              </div>
              <p class="mt-3" style="font-size: 14px;">
                Sigamos tejiendo memoria juntos. Conéctate, comparte y sé parte de 6402+
              </p>
            </div>
          </div>
          
        </div>
      </footer>
    `;
  
    // Inserta el footer en el documento
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
  
  // Llama a la función al cargar la página
  crearFooter();