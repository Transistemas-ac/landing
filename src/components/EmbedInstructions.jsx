import Button from "./Button";
import { SITE_URL } from "../utils/seo";

const EMBED_SNIPPET = `<iframe src="${SITE_URL}/hormonizacion/embed" title="Mapa de hormonización de Argentina" width="100%" height="600" loading="lazy" style="border:0;border-radius:12px"></iframe>`;

const EMBED_RESIZE_SNIPPET = `<iframe src="${SITE_URL}/hormonizacion/embed" title="Mapa de hormonización de Argentina" width="100%" height="600" loading="lazy" style="border:0;border-radius:12px"></iframe>
<script>
  window.addEventListener("message", (event) => {
    if (event.origin !== "${SITE_URL}") return;
    const iframe = document.querySelector('iframe[src*="/hormonizacion/embed"]');
    if (iframe && event.data && event.data.type === "transistemas-embed-height") {
      iframe.style.height = event.data.height + "px";
    }
  });
</script>`;

export { EMBED_SNIPPET, EMBED_RESIZE_SNIPPET };

function EmbedInstructions() {
  return (
    <section className="hormonizacion-embed-instructions">
      <h2 className="hormonizacion-embed-title">
        Insertá el mapa de hormonización en tu sitio
      </h2>
      <p className="hormonizacion-embed-description">
        Copiá el siguiente código y pegalo en cualquier página web para mostrar
        el mapa y el listado de centros de hormonización. El mapa se actualiza
        automáticamente con los datos de transistemas.org.
      </p>
      <div className="hormonizacion-embed-snippet">
        <code>{EMBED_SNIPPET}</code>
        <Button copy={EMBED_SNIPPET} className="hormonizacion-embed-copy">
          Copiar
        </Button>
      </div>
      <details className="hormonizacion-embed-resize">
        <summary>¿Querés que el iframe se ajuste solo a la altura del contenido?</summary>
        <p>
          Usá este código alternativo: el mapa avisa a la página su altura y se
          redimensiona automáticamente.
        </p>
        <div className="hormonizacion-embed-snippet">
          <code>{EMBED_RESIZE_SNIPPET}</code>
          <Button copy={EMBED_RESIZE_SNIPPET} className="hormonizacion-embed-copy">
            Copiar
          </Button>
        </div>
      </details>
    </section>
  );
}

export default EmbedInstructions;