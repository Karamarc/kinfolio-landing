/* www.kinfolio.health is no longer a site — it forwards to the app's origin.
 *
 * The campaign pages used to live here while the app was on tonic.karamarc.com.
 * Once the app took the kinfolio.health apex, two near-identical hostnames were
 * serving two different sites and visitors could not tell them apart, so the
 * landing moved to kinfolio.health/landing and this host became a redirect.
 *
 * GitHub Pages cannot issue a 301, so this runs client-side. 404.html loads it
 * too, which is what makes the redirect PATH-PRESERVING: Pages serves 404.html
 * for every path that no longer exists here, so an old link such as
 * /labs.html still arrives at /landing/labs.html rather than the home page.
 */
(function () {
  var APEX = 'https://kinfolio.health';
  var path = window.location.pathname || '/';
  var target;

  if (path === '/' || path === '/index.html') {
    target = APEX + '/landing/';
  } else {
    // /labs.html -> /landing/labs.html ; /demo/ -> /landing/demo/
    target = APEX + '/landing' + path;
  }
  window.location.replace(target + window.location.search + window.location.hash);
})();
