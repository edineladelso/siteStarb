/**
 * Renderiza texto com highlights do servidor.
 *
 * Segurança: apenas tags <mark> são permitidas.
 * O servidor gera os highlights usando escapeRegex — nunca confia em input do usuário.
 *
 * Para casos em que o HTML vem de fontes controladas (nosso servidor),
 * dangerouslySetInnerHTML é a abordagem correta no React para preservar <mark>.
 *
 * Se preferir evitar dangerouslySetInnerHTML, use a versão com split + map abaixo.
 */

interface HighlightedTextProps {
  html: string;
  className?: string;
}

/**
 * Versão SEGURA: usa split + map, sem dangerouslySetInnerHTML.
 * Funciona apenas com o formato gerado por buildHighlights (marca com <mark>...</mark>).
 */
export function HighlightedText({ html, className }: HighlightedTextProps) {
  // Divide o texto nos pontos de abertura e fechamento da tag <mark>
  const parts = html.split(/(<mark>.*?<\/mark>)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
          const text = part.slice(6, -7); // remove <mark> e </mark>
          return (
            <mark
              key={index}
              className="rounded-sm bg-yellow-200 px-0.5 text-zinc-900 not-italic"
            >
              {text}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}