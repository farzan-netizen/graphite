import Script from 'next/script'

const SBJS_DOMAIN = process.env.NEXT_PUBLIC_SBJS_DOMAIN || ''

export const SourcebusterInit = () => {
  return (
    <Script id="sourcebuster-init" strategy="beforeInteractive">
      {`
(function() {
  var script = document.createElement('script');
  script.src = 'https://assets.bm-cdn.net/scripts/sourcebuster.min.js';
  script.onload = function() {
    if (window.sbjs) {
      window.sbjs.init({
        domain: {
          host: '${SBJS_DOMAIN}',
          isolate: false
        }
      });
    }
  };
  document.head.appendChild(script);
})();
      `}
    </Script>
  )
}
