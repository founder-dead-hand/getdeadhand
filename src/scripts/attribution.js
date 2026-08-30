/* First-party signup attribution, getdeadhand.com only.
 *
 * What it does: if someone arrives with ?ref= (or utm_*), remember the label in
 * this browser, and put it on the links out to dead-hand.app so the signup can
 * be tagged with which video or link it came from.
 *
 * What it deliberately does not do: no cookies, no network request, no third
 * party, nothing that leaves this browser except one short label in a link the
 * visitor clicks. Storage is localStorage on getdeadhand.com, which no other
 * site can read.
 *
 * Why the link and not storage: getdeadhand.com and dead-hand.app are separate
 * origins. Browser storage does not cross between them by design. The URL is
 * the only first-party way to hand the label over.
 *
 * The label is forced through an allowlist - lowercase letters, digits, hyphen,
 * underscore, 32 characters - so a URL cannot smuggle an email address, a name
 * or anything else personal into the tag. Anything that does not survive that
 * is dropped, not stored, not sent.
 */
(function () {
  try {
    var KEY = "dh_src";
    var SHAPE = /^[a-z0-9_-]{1,32}$/;
    var UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

    function label(value) {
      if (!value) return "";
      var v = String(value).trim().toLowerCase();
      // Reject anything that is not already a plain label. Do NOT strip the
      // offending characters and keep the rest: stripping turns
      // "founder@getdeadhand.com" into "foundergetdeadhandcom" and a phone
      // number into a phone number, which is the exact thing this must never
      // carry. Something that is not a label is not a label.
      if (!SHAPE.test(v)) return "";
      // A long run of digits is an account or phone number, not a campaign.
      if (/^[0-9]{7,}$/.test(v)) return "";
      return v;
    }

    var params = new URLSearchParams(window.location.search);
    var arriving = {};
    var ref = label(params.get("ref"));
    if (ref) arriving.ref = ref;
    for (var i = 0; i < UTMS.length; i++) {
      var v = label(params.get(UTMS[i]));
      if (v) arriving[UTMS[i]] = v;
    }

    var held = null;
    try {
      held = JSON.parse(window.localStorage.getItem(KEY) || "null");
    } catch (e) {
      held = null;
    }

    // First touch wins. Whichever link brought someone here the first time is
    // the one that gets the credit, even if they come back later by another
    // route. A second visit never overwrites the first.
    if (!held && Object.keys(arriving).length) {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(arriving));
      } catch (e) {}
      held = arriving;
    }
    if (!held) return;

    var tag = label(held.ref) || label(held.utm_campaign) || label(held.utm_source);
    if (!tag) return;

    // Hand the label across the origin boundary in the link itself.
    var links = document.querySelectorAll('a[href^="https://dead-hand.app"]');
    for (var j = 0; j < links.length; j++) {
      var url;
      try {
        url = new URL(links[j].href);
      } catch (e) {
        continue;
      }
      if (url.searchParams.has("ref")) continue; // an explicit link wins
      url.searchParams.set("ref", tag);
      for (var k = 0; k < UTMS.length; k++) {
        var carried = label(held[UTMS[k]]);
        if (carried) url.searchParams.set(UTMS[k], carried);
      }
      links[j].href = url.toString();
    }
  } catch (e) {
    // Attribution is never worth breaking a page over.
  }
})();
