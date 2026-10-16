// 프롬프트 복사 버튼 + (측정 ID가 있을 때만) GA4
(function () {
  document.querySelectorAll(".prompt").forEach(function (box) {
    var pre = box.querySelector("pre");
    var btn = document.createElement("button");
    btn.className = "copy"; btn.type = "button"; btn.textContent = "복사";
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        btn.textContent = "복사됨 ✓"; btn.classList.add("done");
        setTimeout(function () { btn.textContent = "복사"; btn.classList.remove("done"); }, 1600);
        if (window.gtag) gtag("event", "copy_prompt", { prompt_id: box.id || "" });
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
      else { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); done(); }
    });
    box.appendChild(btn);
  });

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
