"use strict";
(() => {
  void function() {
    const LANG_LIST = ["en", "zh-hans"];
    const L10N = {
      "en": {
        selector: {
          "head > title": "Requirements for Tibetan Text Layout and Typography",
          "#abstract > h2": "Abstract",
          "#toc > ol > li:nth-child(1) > a": "Abstract",
          "#sotd > h2": "Status of This Document",
          "#toc > ol > li:nth-child(2) > a": "Status of This Document",
          "#table-of-contents": "Table of Contents",
          ".note-title": "Note"
        },
        "fig": "Fig. ",
        dt: {},
        dd: {
          "Bug tracker:": '<a href="https://github.com/w3c/tlreq/issues">file a bug</a> (<a href="https://github.com/w3c/tlreq/issues">open bugs</a>)'
        }
      },
      "zh-hans": {
        selector: {
          "head > title": "藏文排版需求",
          "#abstract > h2": "\u6458\u8981",
          "#toc > ol > li:nth-child(1) > a": "\u6458\u8981",
          "#sotd > h2": "\u5173\u4E8E\u672C\u6587\u6863",
          "#toc > ol > li:nth-child(2) > a": "\u5173\u4E8E\u672C\u6587\u6863",
          "#table-of-contents": "\u5185\u5BB9\u5927\u7EB2",
          ".note-title": "\u6CE8"
        },
        "fig": "\u56FE",
        "summary": "\u5173\u4E8E\u6B64\u6587\u6863",
        dt: {
          "This version:": "\u672C\u7248\u672C\uFF1A",
          "History:": "\u5386\u53F2\uFF1A",
          "Previous version:": "\u4E0A\u4E00\u7248\uFF1A",
          "Latest published version:": "\u6700\u65B0\u53D1\u5E03\u8349\u7A3F\uFF1A",
          "Latest editor's draft:": "\u6700\u65B0\u7F16\u8F91\u8349\u7A3F\uFF1A",
          "Editors:": "\u7F16\u8F91\uFF1A",
          "Former editors:": "\u539F\u7F16\u8F91\uFF1A",
          "Participate:": "\u534F\u52A9\u53C2\u4E0E\uFF1A",
          "Feedback:": "\u53CD\u9988\uFF1A"
        },
        dd: {
          "Bug tracker:": '<a href="https://github.com/w3c/tlreq/issues">\u53CD\u9988\u9519\u8BEF</a>\uFF08<a href="https://github.com/w3c/tlreq/issues">\u4FEE\u6B63\u4E2D\u7684\u9519\u8BEF</a>\uFF09'
        }
      }
    };
    const $root = document.documentElement;
    let $$hidden = [];
    function arrayify(obj) {
      return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj);
    }
    function $$(selector) {
      return arrayify(document.querySelectorAll(selector));
    }
    function toggle$rootClass(lang) {
      $root.lang = lang === "all" ? "en" : lang;
      if (lang === "all") {
        $root.classList.add("is-multilingual");
        $root.classList.remove("isnt-multilingual");
      } else {
        $root.classList.remove("is-multilingual");
        $root.classList.add("isnt-multilingual");
      }
    }
    function showAndHideLang(lang) {
      $$hidden.forEach(function($elmt) {
        Object.assign($elmt, { hidden: false });
      });
      if (lang === "all") {
        return;
      }
      $$hidden = LANG_LIST.filter(function(it) {
        return it !== lang;
      }).reduce(function(result, it) {
        return result.concat($$('[its-locale-filter-list="' + it + '"]'));
      }, []).map(function($elmt) {
        return Object.assign($elmt, { hidden: true });
      });
    }
    function replaceBoilerplateText(lang) {
      const l10n = L10N[lang === "all" ? "en" : lang];
      Object.keys(l10n.selector).forEach(function(s) {
        $$(s).forEach(function($elmt) {
          Object.assign($elmt, { textContent: l10n.selector[s] });
        });
      });
      $$("figcaption, .fig-ref").forEach(function($elmt) {
        Object.assign($elmt.firstChild, { textContent: l10n["fig"] });
      });
      $$("body > div.head > details > summary").forEach(function($summary) {
        let originalText = $summary.dataset.originalText || $summary.textContent.trim();
        let text = l10n["summary"] || originalText;
        if (text) {
          $summary.textContent = text;
          $summary.dataset.originalText = originalText;
        }
      });
      $$("body > div.head > details > dl > dt").forEach(function($dt) {
        let originalText = $dt.dataset.originalText || $dt.textContent.trim();
        let text = l10n.dt[originalText] || originalText;
        if (text) {
          $dt.textContent = text;
          $dt.dataset.originalText = originalText;
        }
        if (originalText === "Bug tracker:") {
          $dt.nextElementSibling.innerHTML = l10n.dd["Bug tracker:"];
        }
      });
    }
    window.switchLang = function(lang) {
      toggle$rootClass(lang);
      showAndHideLang(lang);
      replaceBoilerplateText(lang);
    };
    function addLangAttr() {
      toggle$rootClass("all");
      LANG_LIST.forEach(function(lang) {
        $$('[its-locale-filter-list="' + lang + '"]').forEach(function($elmt) {
          if (!$elmt.lang) {
            $elmt.lang = lang;
          }
        });
      });
    }
    addLangAttr();
  }();
})();
