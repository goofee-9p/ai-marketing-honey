// 복사 버튼(요청문 .prompt · 한 줄 명령 .cmd) + 자동 목차 + (측정 ID가 있을 때만) GA4
(function () {
  function addCopy(box, src, id) {
    var btn = document.createElement("button");
    btn.className = "copy"; btn.type = "button"; btn.textContent = "복사";
    btn.addEventListener("click", function () {
      var text = src.innerText.replace(/\n+$/, "");
      var done = function () {
        btn.textContent = "복사됨 ✓"; btn.classList.add("done");
        setTimeout(function () { btn.textContent = "복사"; btn.classList.remove("done"); }, 1600);
        if (window.gtag) gtag("event", "copy_prompt", { prompt_id: id });
      };
      var fallback = function () { var t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.position = "absolute"; t.style.left = "-9999px"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); done(); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
    box.appendChild(btn);
  }
  document.querySelectorAll(".prompt").forEach(function (box) {
    var pre = box.querySelector("pre");
    if (pre) addCopy(box, pre, box.id || "");
  });
  // 한 줄 명령: 어느 카드의 몇 번째 명령인지 남겨요(예: t2-cmd3)
  document.querySelectorAll(".cmd").forEach(function (box, i) {
    var code = box.querySelector("code");
    if (!code) return;
    var owner = box.closest("[id]");
    addCopy(box, code, box.id || ((owner ? owner.id + "-" : "") + "cmd" + (i + 1)));
  });

  // 목차: <nav class="toc" data-auto></nav> → 각 section의 h2로 링크를 채워요
  // 빼고 싶은 섹션은 <section data-toc="skip">
  var toc = document.querySelector(".toc[data-auto]");
  if (toc) {
    var k = 0;
    document.querySelectorAll("section").forEach(function (sec) {
      var h = sec.querySelector("h2");
      if (!h || sec.dataset.toc === "skip") return;
      k++;
      if (!sec.id) sec.id = "s" + (k < 10 ? "0" : "") + k;
      var n = h.querySelector(".n");
      var title = Array.prototype.filter.call(h.childNodes, function (c) { return !(c.classList && c.classList.contains("n")); })
        .map(function (c) { return c.textContent; }).join("").trim();
      var a = document.createElement("a");
      a.href = "#" + sec.id;
      if (n) { var s = document.createElement("span"); s.className = "n"; s.textContent = n.textContent; a.appendChild(s); }
      a.appendChild(document.createTextNode(title));
      toc.appendChild(a);
    });
    toc.setAttribute("aria-label", "목차");
  }

  // 목록 탭: #reels(기본) · #youtube — JS가 없으면 두 목록이 모두 보여요
  var tabs = document.querySelectorAll(".tabs [data-tab]");
  if (tabs.length) {
    var show = function () {
      var want = (location.hash || "#reels").slice(1);
      if (!document.getElementById(want) || !document.getElementById(want).classList.contains("pane")) want = "reels";
      document.querySelectorAll(".pane").forEach(function (p) { p.hidden = p.id !== want; });
      tabs.forEach(function (a) { var on = a.dataset.tab === want; a.classList.toggle("on", on); a.setAttribute("aria-selected", on); });
    };
    tabs.forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); history.replaceState(null, "", "#" + a.dataset.tab); show(); }); });
    window.addEventListener("hashchange", show); show();
  }

  var id = window.SITE && window.SITE.GA_ID;
  if (!id) return;
  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", id);
})();
