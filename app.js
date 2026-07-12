/* Kinfolio landing — waitlist capture + pageview beacon.
   Owned endpoints only; no third-party SDKs (marketing pages carry no health data). */
(function () {
  var API = "https://tonic.karamarc.com/api/public";
  var variant = document.body.dataset.variant || "unknown";

  // Pageview beacon (fire-and-forget; silent on failure).
  try {
    var ref = document.referrer ? new URL(document.referrer).hostname : "";
    var params = new URLSearchParams(location.search);
    fetch(API + "/beacon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variant: variant,
        ref: ref,
        src: params.get("utm_source") || "",
        cmp: params.get("utm_campaign") || ""
      }),
      keepalive: true
    }).catch(function () {});
  } catch (e) { /* never break the page */ }

  // Waitlist forms.
  document.querySelectorAll("form.cta-form").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = form.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      var btn = form.querySelector("button");
      btn.disabled = true;
      btn.textContent = "Joining…";
      fetch(API + "/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, variant: variant })
      })
        .then(function (r) { if (!r.ok) throw new Error("bad status"); })
        .catch(function () { /* accept optimistically; endpoint logs are source of truth */ })
        .finally(function () {
          form.style.display = "none";
          var done = form.parentElement.querySelector(".cta-done");
          if (done) done.style.display = "block";
          try { localStorage.setItem("kf_waitlist", "1"); } catch (e) {}
        });
    });
  });
})();
