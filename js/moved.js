/**
 * "Now part of ClickTooling" — the announcement over the original page.
 * Everything it says has to stay TRUE: the tool was really built and run in-house by Click, and
 * the parts that worked were folded into ClickTooling. It never says "acquired", never names
 * customers or numbers, and lists only things ClickTooling really does. The page underneath is
 * left as it was; "See the original site" dismisses this for the visit, and the page's demo
 * buttons bring it back (there is no separate demo to send anyone to any more).
 */
(function () {
    'use strict';
    var cfg = window.MOVED_TO_CLICKTOOLING;
    if (!cfg) return;
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('moved-dismissed') === '1'; } catch (e) { /* show it */ }

    function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

    var veil = el('div', 'moved-veil');
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.setAttribute('aria-labelledby', 'moved-title');
    var card = el('div', 'moved-card');

    var marks = el('div', 'moved-marks');
    var from = el('img', 'moved-mark'); from.src = 'icons/favicon.svg'; from.alt = cfg.name;
    var arrow = el('span', 'moved-arrow', '→'); arrow.setAttribute('aria-hidden', 'true');
    var to = el('img', 'moved-mark moved-mark-to'); to.src = 'icons/clicktooling.svg'; to.alt = 'ClickTooling';
    marks.appendChild(from); marks.appendChild(arrow); marks.appendChild(to);

    var eyebrow = el('p', 'moved-eyebrow', 'Where it went');
    var title = el('h2', 'moved-title', cfg.name + ' is now part of ClickTooling.'); title.id = 'moved-title';
    var lede = el('p', 'moved-lede', cfg.lede);

    var list = el('ul', 'moved-list');
    var headRow = el('li', 'moved-list-head');
    headRow.appendChild(el('span', '', 'What it did'));
    headRow.appendChild(el('span', '', 'Where it lives now'));
    list.appendChild(headRow);
    cfg.features.forEach(function (f) {
        var li = el('li', '');
        li.appendChild(el('span', 'moved-was', f[0]));
        li.appendChild(el('span', 'moved-now', f[1]));
        list.appendChild(li);
    });

    var actions = el('div', 'moved-actions');
    var go = el('a', 'moved-go', 'Go to ClickTooling →'); go.href = 'https://clicktooling.com/';
    var stay = el('button', 'moved-stay', 'See the original site'); stay.type = 'button';
    actions.appendChild(go); actions.appendChild(stay);

    var fine = el('p', 'moved-fine', 'ClickTooling is a private platform run by Click Plumbing and Electrical. Access is by invitation.');

    [marks, eyebrow, title, lede, list, actions, fine].forEach(function (n) { card.appendChild(n); });
    veil.appendChild(card);

    function close() {
        try { sessionStorage.setItem('moved-dismissed', '1'); } catch (e) { /* fine */ }
        document.documentElement.classList.remove('moved-open');
        veil.remove();
        document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    stay.addEventListener('click', close);
    veil.addEventListener('click', function (e) { if (e.target === veil) close(); });

    function open() {
        document.documentElement.classList.add('moved-open');
        document.body.appendChild(veil);
        document.addEventListener('keydown', onKey);
        go.focus();
    }
    function start() {
        // The old "Try Demo" / "Contact Us for a Demo" buttons now answer with this card.
        Array.prototype.forEach.call(document.querySelectorAll('a, button'), function (b) {
            if (veil.contains(b) || !/try demo|contact us for a demo/i.test(b.textContent)) return;
            b.addEventListener('click', function (e) { e.preventDefault(); open(); });
        });
        if (!dismissed) open();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
