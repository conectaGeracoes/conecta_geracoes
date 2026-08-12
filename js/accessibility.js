// ===== Widget de Acessibilidade — Conecta Gerações =====
(function () {
    "use strict";

    var STORAGE_KEY = "cg_a11y_settings";
    var FONT_STEP = 10; // %
    var FONT_MIN = 80;
    var FONT_MAX = 150;

    var defaultSettings = {
        fontSize: 100,
        contrast: false,
        readableFont: false,
        textSpacing: false,
        highlightLinks: false
    };

    function loadSettings() {
        try {
            var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!saved) return Object.assign({}, defaultSettings);
            return Object.assign({}, defaultSettings, saved);
        } catch (e) {
            return Object.assign({}, defaultSettings);
        }
    }

    function saveSettings(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            /* localStorage indisponível: aplica só na sessão atual */
        }
    }

    var settings = loadSettings();

    function applySettings() {
        var html = document.documentElement;
        html.style.fontSize = settings.fontSize + "%";
        html.classList.toggle("a11y-contrast-alto", settings.contrast);
        html.classList.toggle("a11y-fonte-legivel", settings.readableFont);
        html.classList.toggle("a11y-espacamento", settings.textSpacing);
        html.classList.toggle("a11y-links-destacados", settings.highlightLinks);
    }

    // Aplica imediatamente (evita "flash" sem os ajustes salvos)
    applySettings();

    function ensureStylesheet() {
        if (document.getElementById("a11y-widget-css")) return;
        var link = document.createElement("link");
        link.id = "a11y-widget-css";
        link.rel = "stylesheet";
        link.href = "/components/accessibility.css";
        document.head.appendChild(link);
    }

    function iconAcessibilidade() {
        return '<img src="/assets/img/Web Accessibility.png" alt="" class="a11y-fab-icon">';
    }

    function buildWidget() {
        var wrapper = document.createElement("div");
        wrapper.id = "a11y-widget";

        wrapper.innerHTML =
            '<button type="button" id="a11yToggle" class="a11y-fab" aria-haspopup="dialog" ' +
            'aria-expanded="false" aria-controls="a11yPanel" aria-label="Abrir menu de acessibilidade">' +
            iconAcessibilidade() +
            "</button>" +
            '<div id="a11yPanel" class="a11y-panel" role="dialog" aria-modal="true" ' +
            'aria-label="Menu de acessibilidade" hidden>' +
            '<div class="a11y-panel-header">' +
            "<h2>Acessibilidade</h2>" +
            '<button type="button" id="a11yClose" class="a11y-close" aria-label="Fechar menu de acessibilidade">&times;</button>' +
            "</div>" +
            '<div class="a11y-panel-body">' +
            '<div class="a11y-group">' +
            '<span class="a11y-group-label" id="a11yFontLabel">Tamanho da fonte</span>' +
            '<div class="a11y-btn-row" role="group" aria-labelledby="a11yFontLabel">' +
            '<button type="button" data-action="decrease-font" aria-label="Diminuir fonte">A-</button>' +
            '<button type="button" data-action="reset-font" aria-label="Fonte no tamanho padrão">A</button>' +
            '<button type="button" data-action="increase-font" aria-label="Aumentar fonte">A+</button>' +
            "</div>" +
            "</div>" +
            '<button type="button" class="a11y-option" data-toggle="contrast" aria-pressed="false">Alto contraste</button>' +
            '<button type="button" class="a11y-option" data-toggle="readableFont" aria-pressed="false">Fonte legível</button>' +
            '<button type="button" class="a11y-option" data-toggle="textSpacing" aria-pressed="false">Espaçamento de texto</button>' +
            '<button type="button" class="a11y-option" data-toggle="highlightLinks" aria-pressed="false">Destacar links</button>' +
            '<button type="button" id="a11yReset" class="a11y-option a11y-option-reset">Restaurar padrão</button>' +
            "</div>" +
            "</div>";

        document.body.appendChild(wrapper);
        return wrapper;
    }

    function initWidget() {
        ensureStylesheet();
        var wrapper = buildWidget();

        var toggleBtn = wrapper.querySelector("#a11yToggle");
        var panel = wrapper.querySelector("#a11yPanel");
        var closeBtn = wrapper.querySelector("#a11yClose");
        var resetBtn = wrapper.querySelector("#a11yReset");
        var toggleOptions = wrapper.querySelectorAll("[data-toggle]");
        var fontButtons = wrapper.querySelectorAll("[data-action]");

        function syncUI() {
            toggleOptions.forEach(function (btn) {
                var key = btn.getAttribute("data-toggle");
                btn.setAttribute("aria-pressed", settings[key] ? "true" : "false");
            });
        }

        function openPanel() {
            panel.hidden = false;
            toggleBtn.setAttribute("aria-expanded", "true");
            closeBtn.focus();
            document.addEventListener("keydown", onKeydown);
            document.addEventListener("click", onOutsideClick, true);
        }

        function closePanel() {
            panel.hidden = true;
            toggleBtn.setAttribute("aria-expanded", "false");
            toggleBtn.focus();
            document.removeEventListener("keydown", onKeydown);
            document.removeEventListener("click", onOutsideClick, true);
        }

        function onKeydown(e) {
            if (e.key === "Escape" || e.key === "Esc") {
                closePanel();
            }
        }

        function onOutsideClick(e) {
            if (!wrapper.contains(e.target)) {
                closePanel();
            }
        }

        toggleBtn.addEventListener("click", function () {
            if (panel.hidden) {
                openPanel();
            } else {
                closePanel();
            }
        });

        closeBtn.addEventListener("click", closePanel);

        fontButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var action = btn.getAttribute("data-action");
                if (action === "increase-font") {
                    settings.fontSize = Math.min(FONT_MAX, settings.fontSize + FONT_STEP);
                } else if (action === "decrease-font") {
                    settings.fontSize = Math.max(FONT_MIN, settings.fontSize - FONT_STEP);
                } else if (action === "reset-font") {
                    settings.fontSize = defaultSettings.fontSize;
                }
                applySettings();
                saveSettings(settings);
            });
        });

        toggleOptions.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var key = btn.getAttribute("data-toggle");
                settings[key] = !settings[key];
                applySettings();
                saveSettings(settings);
                syncUI();
            });
        });

        resetBtn.addEventListener("click", function () {
            settings = Object.assign({}, defaultSettings);
            applySettings();
            saveSettings(settings);
            syncUI();
        });

        syncUI();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWidget);
    } else {
        initWidget();
    }
})();