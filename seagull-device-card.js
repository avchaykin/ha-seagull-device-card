const SEAGULL_DEVICE_CARD_VERSION = "1.3.0";
const SEAGULL_DEVICE_CARD_COMMIT = "dev";

const SEAGULL_ROOM_THEME_DEFAULT = {
  palette_mode: "auto", // auto | day | night
  palette: {
    card_border: { day: "#aaaaaa", night: "#64748b" },
    card_bg: { day: "#eeeeee", night: "#0f172a" },
    card_icon: { day: "#2233aa44", night: "#93c5fd55" },

    text_color: { day: "inherit", night: "#e2e8f0" },
    text_bg: { day: "transparent", night: "transparent" },
    text_border: { day: "transparent", night: "transparent" },

    btn_active_fg: { day: "#111827", night: "#111827" },
    btn_active_bg: { day: "#f59e0b", night: "#f59e0b" },
    btn_inactive_fg: { day: "#e5e7eb", night: "#e5e7eb" },
    btn_inactive_bg: { day: "#4b5563", night: "#374151" },
    btn_unavailable_fg: { day: "#d1d5db", night: "#94a3b8" },
    btn_unavailable_bg: { day: "#6b7280", night: "#475569" },
    btn_border: { day: "transparent", night: "transparent" },

    btn_auto_active_fg: { day: "#eaf2ff", night: "#eaf2ff" },
    btn_auto_active_bg: { day: "#3b82f6", night: "#2563eb" },
    btn_auto_inactive_fg: { day: "#111827", night: "#111827" },
    btn_auto_inactive_bg: { day: "#d1d5db", night: "#94a3b8" },

    btn_empty_inactive_fg: { day: "#111827", night: "#e2e8f0" },
    btn_empty_inactive_bg: { day: "#e5e7eb", night: "#334155" },

    btn_alert_active_fg: { day: "#fffafa", night: "#ffe4e6" },
    btn_alert_active_bg: { day: "#f63b3b", night: "#b91c1c" },

    obsolete_border: { day: "#d1d5db", night: "#94a3b8" },

    seagull_rose: { day: "#aa332244", night: "#aa332266" },
    seagull_indigo: { day: "#2233aa44", night: "#2233aa66" },
    seagull_emerald: { day: "#22aa3344", night: "#22aa3366" },
    seagull_amber: { day: "#cc992244", night: "#cc992266" },
    seagull_violet: { day: "#8844cc44", night: "#8844cc66" },
    seagull_cyan: { day: "#22aacc44", night: "#22aacc66" },
    seagull_orange_red: { day: "#cc552244", night: "#cc552266" },
    seagull_lime: { day: "#55aa2244", night: "#55aa2266" },
    seagull_cornflower: { day: "#4466cc44", night: "#4466cc66" },
    seagull_magenta: { day: "#cc44aa44", night: "#cc44aa66" },
    seagull_aqua: { day: "#22ccaa44", night: "#22ccaa66" },
    seagull_tangerine: { day: "#cc772244", night: "#cc772266" },
    seagull_slate_blue: { day: "#6677aa44", night: "#6677aa66" },
    seagull_olive: { day: "#77994444", night: "#77994466" },
    seagull_plum: { day: "#99447744", night: "#99447766" },
    seagull_steel: { day: "#44779944", night: "#44779966" },
    seagull_copper: { day: "#aa664444", night: "#aa664466" },
    seagull_mint: { day: "#44aa6644", night: "#44aa6666" },
  },
  card: {
    border_radius: 16,
    border_width: 0,
    border_color: "$card_border",
    background_color: "$card_bg",
    background_opacity: 0.45,
    icon: "mdi:sofa",
    icon_color: "$card_icon",
    icon_size: 60,
    font_family: "'PT Sans Narrow', sans-serif",
    font_weight: 400,
    font_size: null,
  },
  text: {
    color: "$text_color",
    background: "$text_bg",
    border_radius: 10,
    border_width: 0,
    border_color: "$text_border",
    size: 14,
    halign: "left",
    valign: "top",
    padding: 0,
    padding_top: null,
    padding_right: null,
    padding_bottom: null,
    padding_left: null,
  },
  button: {
    align: "right",
    size: 48,
    gap: 5,
    padding: 10,
    padding_top: null,
    padding_right: null,
    padding_bottom: null,
    padding_left: null,
    icons: {
      default: "mdi:help-circle-outline",
      light: { on: "mdi:lightbulb", off: "mdi:lightbulb-off" },
      lock: { locked: "mdi:lock", unlocked: "mdi:lock-open-variant", default: "mdi:lock-reset" },
      binary_sensor: {
        default_on: "mdi:check-circle",
        default_off: "mdi:circle-outline",
        device_class: {
          window: { on: "mdi:window-open", off: "mdi:window-closed" },
          door: { on: "mdi:door-open", off: "mdi:door-closed" },
          opening: { on: "mdi:garage-open", off: "mdi:garage" },
          motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
          occupancy: { on: "mdi:home-account", off: "mdi:home-outline" },
          lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
        },
      },
    },
    default: {
      border_size: 0,
      border_color: "$btn_border",
      active: { color: "$btn_active_fg", background: "$btn_active_bg" },
      inactive: { color: "$btn_inactive_fg", background: "$btn_inactive_bg" },
      unavailable: { color: "$btn_unavailable_fg", background: "$btn_unavailable_bg" },
      obsolete: { border_size: 2, border_color: "$obsolete_border" },
    },
    automation: {
      active: { color: "$btn_auto_active_fg", background: "$btn_auto_active_bg" },
      inactive: { color: "$btn_auto_inactive_fg", background: "$btn_auto_inactive_bg" },
    },
    lock: {
      active: { color: "$btn_alert_active_fg", background: "$btn_alert_active_bg" },
    },
    binary_sensor: {
      device_class: {
        door: {
          active: { color: "$btn_alert_active_fg", background: "$btn_alert_active_bg" },
        },
      },
    },
    empty: {
      inactive: { color: "$btn_empty_inactive_fg", background: "$btn_empty_inactive_bg" },
    },
  },
};

class SeagullRoomCard extends HTMLElement {
  static getStubConfig() {
    return {
      type: "custom:seagull-device-card",
      background_color: "#eeeeee",
      background_opacity: 0.45,
      border_radius: 16,
      border_width: 0,
      border_color: "#aaaaaa",
      icon: "mdi:sofa",
      icon_color: "#2233aa44",
      icon_size: 60,
      tap_action: "more-info",
      double_tap_action: "more-info",
      hold_action: "more-info",
      variables: {
        temperature: "{{ states('sensor.second_bedroom_temperature') }}",
        humidity: "{{ states('sensor.second_bedroom_humidity') }}",
      },
      text: {
        entity: null,
        value: "",
        color: "inherit",
        background_color: "transparent",
        border_radius: 10,
        size: 14,
        halign: "left",
        valign: "top",
        padding: 0,
        padding_top: null,
        padding_right: null,
        padding_bottom: null,
        padding_left: null,
        tap_action: "more-info",
        double_tap_action: "more-info",
        hold_action: "more-info",
      },
      buttons: {
        cols: 3,
        rows: 1,
        size: 48,
        gap: 5,
        padding: 10,
        padding_top: null,
        padding_right: null,
        padding_bottom: null,
        padding_left: null,
        align: "right",
        icon: null,
        color: "{{ ((entity || '').startsWith('lock.') ? state === 'unlocked' : state === 'on') ? '#111827' : '#e5e7eb' }}",
        background: "{{ ((entity || '').startsWith('lock.') ? state === 'unlocked' : state === 'on') ? '#f59e0b' : '#4b5563' }}",
        border: 0,
        border_color: "transparent",
        use_light_color: false, // false | color | brightness | both/true
        invert_state: false,
        tap_action: "toggle",
        double_tap_action: "more-info",
        hold_action: "more-info",
        obsolete: null, // hours or { hours, color, background, border, border_color, icon }
        entities: [{ entity: "light.example_light", width: 1 }],
      },
    };
  }

  static async getConfigElement() {
    return document.createElement("seagull-device-card-editor");
  }

  setConfig(config) {
    if (!config || config.type !== "custom:seagull-device-card") {
      throw new Error("Card type must be custom:seagull-device-card");
    }
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 2;
  }

  _render() {
    if (!this._config || !this._hass) return;

    this._theme = this._normalizeTheme(this._config?.theme);

    if (!this._card) {
      this._card = document.createElement("ha-card");
      this._inner = document.createElement("div");
      this._icon = document.createElement("ha-icon");
      this._icon.className = "seagull-device-card-icon";
      this._card.appendChild(this._inner);
      this._card.appendChild(this._icon);
      this.appendChild(this._card);
    }

    const cfg = this._config;
    const buttonsCfg = cfg.buttons || cfg.lights || {};

    const themeCard = this._theme?.card || {};
    const cardDef = SEAGULL_ROOM_THEME_DEFAULT.card;
    const bgColor = this._paletteColor(cfg.background_color ?? themeCard.background_color ?? cardDef.background_color);
    const opacity = this._clampOpacity(cfg.background_opacity ?? themeCard.background_opacity ?? cardDef.background_opacity);
    const radius = this._toPx(cfg.border_radius ?? themeCard.border_radius ?? cardDef.border_radius, cardDef.border_radius);
    const borderWidth = Math.max(0, this._toPx(cfg.border_width ?? themeCard.border_width ?? cardDef.border_width, cardDef.border_width));
    const borderColor = this._paletteColor(cfg.border_color ?? themeCard.border_color ?? cardDef.border_color);
    const fontFamily = cfg.font_family ?? themeCard.font_family ?? cardDef.font_family ?? "'PT Sans Narrow', sans-serif";
    const fontWeight = cfg.font_weight ?? themeCard.font_weight ?? cardDef.font_weight ?? null;
    const fontSizeRaw = cfg.font_size ?? themeCard.font_size ?? cardDef.font_size ?? null;

    const icon = cfg.icon ?? themeCard.icon ?? cardDef.icon;
    const iconColor = this._paletteColor(cfg.icon_color ?? themeCard.icon_color ?? cardDef.icon_color);
    const iconSize = Math.max(8, this._toPx(cfg.icon_size ?? themeCard.icon_size ?? cardDef.icon_size, cardDef.icon_size));

    const themeBtn = this._theme?.button || {};
    const btnDef = SEAGULL_ROOM_THEME_DEFAULT.button;
    const basePadding = Math.max(0, this._toPx(buttonsCfg.padding ?? themeBtn.padding ?? btnDef.padding, btnDef.padding));
    const padTop = Math.max(0, this._toPx(buttonsCfg.padding_top ?? themeBtn.padding_top ?? basePadding, basePadding));
    const padRight = Math.max(0, this._toPx(buttonsCfg.padding_right ?? themeBtn.padding_right ?? basePadding, basePadding));
    const padBottom = Math.max(0, this._toPx(buttonsCfg.padding_bottom ?? themeBtn.padding_bottom ?? basePadding, basePadding));
    const padLeft = Math.max(0, this._toPx(buttonsCfg.padding_left ?? themeBtn.padding_left ?? basePadding, basePadding));

    const size = Math.max(20, this._toPx(buttonsCfg.size ?? themeBtn.size ?? btnDef.size, btnDef.size));
    const gap = Math.max(0, this._toPx(buttonsCfg.gap ?? themeBtn.gap ?? btnDef.gap, btnDef.gap));
    const minRows = Math.max(0, parseInt(buttonsCfg.rows ?? 0, 10) || 0);
    const minRowsHeight = minRows > 0
      ? Math.round(padTop + padBottom + minRows * size + Math.max(0, minRows - 1) * gap)
      : 0;

    this._card.style.boxShadow = "none";
    this._card.style.borderRadius = `${radius}px`;
    this._card.style.overflow = "hidden";
    const bgIsRgba = /^rgba\(/i.test(String(bgColor).trim());
    this._card.style.background = (cfg.background_opacity == null && bgIsRgba)
      ? String(bgColor)
      : this._toRgba(bgColor, opacity);
    this._card.style.border = `${borderWidth}px solid ${borderColor}`;
    this._card.style.position = "relative";
    this._card.style.transition = "filter 120ms ease";
    this._card.style.fontFamily = String(fontFamily);
    if (fontWeight != null && fontWeight !== "") this._card.style.fontWeight = String(fontWeight);
    else this._card.style.removeProperty("font-weight");
    if (fontSizeRaw != null && fontSizeRaw !== "") this._card.style.fontSize = `${Math.max(8, this._toPx(fontSizeRaw, 14))}px`;
    else this._card.style.removeProperty("font-size");

    this._card.onmouseenter = () => {
      this._card.style.filter = "brightness(1.03)";
    };
    this._card.onmouseleave = () => {
      this._card.style.filter = "brightness(1)";
    };

    this._inner.style.minHeight = `${Math.max(80, minRowsHeight)}px`;
    this._inner.style.display = "block";
    this._inner.style.padding = `${padTop}px ${padRight}px ${padBottom}px ${padLeft}px`;
    this._inner.style.boxSizing = "border-box";
    this._inner.style.position = "relative";
    this._inner.style.zIndex = "2";

    this._updateCardIcon(icon, iconColor, iconSize);
    this._variablesContext = this._buildVariablesContext();

    const textHtml = this._buildTextHtml();
    const { html, items } = this._buildLightsHtmlAndItems();
    this._renderedLightItems = items;

    const combinedHtml = `
      ${textHtml}
      <div class="sg-room-buttons-layer" style="position:relative;z-index:3;">${html}</div>
    `;
    if (this._lastLightsHtml !== combinedHtml) {
      this._inner.innerHTML = combinedHtml;
      this._lastLightsHtml = combinedHtml;
      this._wireLightButtons();
    }

    this._wireTextActions();
    this._wireCardIconActions();
  }

  _updateCardIcon(icon, iconColor, iconSize) {
    if (!this._icon) return;

    const sig = `${icon}|${iconColor}|${iconSize}`;
    if (this._iconSig !== sig) {
      const prevIcon = this._icon.getAttribute("icon");
      if (prevIcon !== icon) this._icon.setAttribute("icon", icon);
      this._icon.style.color = iconColor;
      this._icon.style.setProperty("--mdc-icon-size", `${iconSize}px`);
      this._icon.style.width = `${iconSize}px`;
      this._icon.style.height = `${iconSize}px`;
      this._iconSig = sig;
    }

    this._icon.style.position = "absolute";
    this._icon.style.left = "10px";
    this._icon.style.top = "10px";
    this._icon.style.display = icon ? "block" : "none";
    this._icon.style.cursor = "pointer";
    this._icon.style.zIndex = "1";
  }

  _buildVariablesContext() {
    const out = {};
    const vars = this._config?.variables;
    if (!vars || typeof vars !== "object" || Array.isArray(vars)) return out;

    for (const [k, v] of Object.entries(vars)) {
      out[k] = this._resolveDynamicValue(v, this._config?.entity, this._hass?.states?.[this._config?.entity]?.state, null, out);
    }

    return out;
  }

  _buildTextHtml() {
    const textCfg = this._config?.text;
    if (!textCfg) return "";

    const entityId = this._config?.entity;
    const state = entityId && this._hass?.states?.[entityId]
      ? this._hass.states[entityId].state
      : undefined;

    const raw = this._resolveDynamicValue(textCfg.value, entityId, state, "");
    const value = raw == null ? "" : String(raw);
    if (!value.trim()) return "";

    const themeText = this._theme?.text || {};
    const txtDef = SEAGULL_ROOM_THEME_DEFAULT.text;
    const size = Math.max(8, this._toPx(textCfg.size ?? themeText.size ?? txtDef.size, txtDef.size));
    const textColor = this._paletteColor(this._resolveDynamicValue(textCfg.color, entityId, state, themeText.color ?? txtDef.color));
    const textBg = this._paletteColor(this._resolveDynamicValue(textCfg.background_color ?? textCfg.background, entityId, state, themeText.background ?? themeText.background_color ?? txtDef.background));
    const textRadius = Math.max(0, this._toPx(textCfg.border_radius ?? themeText.border_radius ?? txtDef.border_radius, txtDef.border_radius));
    const textBorderW = Math.max(0, this._toPx(textCfg.border_width ?? themeText.border_width ?? txtDef.border_width, txtDef.border_width));
    const textBorderColor = this._paletteColor(this._resolveDynamicValue(textCfg.border_color, entityId, state, themeText.border_color ?? txtDef.border_color));
    const halign = ["left", "center", "right"].includes(String(textCfg.halign ?? themeText.halign ?? txtDef.halign).toLowerCase())
      ? String(textCfg.halign ?? themeText.halign ?? txtDef.halign).toLowerCase()
      : txtDef.halign;
    const valign = ["top", "center", "bottom"].includes(String(textCfg.valign ?? themeText.valign ?? txtDef.valign).toLowerCase())
      ? String(textCfg.valign ?? themeText.valign ?? txtDef.valign).toLowerCase()
      : txtDef.valign;

    const basePadding = Math.max(0, this._toPx(textCfg.padding ?? themeText.padding ?? txtDef.padding, txtDef.padding));
    const padTop = Math.max(0, this._toPx(textCfg.padding_top ?? themeText.padding_top ?? basePadding, basePadding));
    const padRight = Math.max(0, this._toPx(textCfg.padding_right ?? themeText.padding_right ?? basePadding, basePadding));
    const padBottom = Math.max(0, this._toPx(textCfg.padding_bottom ?? themeText.padding_bottom ?? basePadding, basePadding));
    const padLeft = Math.max(0, this._toPx(textCfg.padding_left ?? themeText.padding_left ?? basePadding, basePadding));

    const alignY = valign === "top" ? "flex-start" : valign === "bottom" ? "flex-end" : "center";

    return `
      <div class="sg-room-text-layer" style="position:absolute;inset:0;z-index:2;pointer-events:auto;display:flex;align-items:${alignY};padding:${padTop}px ${padRight}px ${padBottom}px ${padLeft}px;box-sizing:border-box;overflow:hidden;cursor:pointer;">
        <style>
          .sg-room-text-layer h1,
          .sg-room-text-layer h2,
          .sg-room-text-layer h3 {
            margin: 0;
            padding: 0;
            font-weight: 700;
            line-height: 1.2;
          }
          .sg-room-text-layer h1 { font-size: 1.35em; }
          .sg-room-text-layer h2 { font-size: 1.2em; }
          .sg-room-text-layer h3 { font-size: 1.1em; }
        </style>
        <div style="width:100%;text-align:${halign};font-size:${size}px;line-height:1.35;color:${this._esc(textColor)};background:${this._esc(textBg)};border-radius:${textRadius}px;border:${textBorderW}px solid ${this._esc(textBorderColor)};padding:6px 8px;box-sizing:border-box;display:block;">${value}</div>
      </div>
    `;
  }

  _buildLightsHtmlAndItems() {
    const buttonsCfg = this._config.buttons || this._config.lights || {};
    const themeBtn = this._theme?.button || {};
    const btnDef = SEAGULL_ROOM_THEME_DEFAULT.button;
    const cols = Math.max(1, parseInt(buttonsCfg.cols ?? buttonsCfg.columns ?? 3, 10) || 3);
    const size = Math.max(20, this._toPx(buttonsCfg.size ?? themeBtn.size ?? btnDef.size, btnDef.size));
    const gap = Math.max(0, this._toPx(buttonsCfg.gap ?? themeBtn.gap ?? btnDef.gap, btnDef.gap));
    const alignRaw = String(buttonsCfg.align ?? themeBtn.align ?? btnDef.align).toLowerCase();
    const align = ["left", "right", "center", "justified"].includes(alignRaw) ? alignRaw : "justified";

    const items = this._collectButtonItems(buttonsCfg)
      .filter((it) => !it.hidden)
      .filter((it) => {
        const hasText = this._buttonTextValue(it, buttonsCfg, "") !== "";
        return this._toBool(it?.empty, false) || !!it.entity || !!it.icon || !!buttonsCfg.icon || hasText;
      })
      .map((it) => {
        const entityId = String(it?.entity || "");
        const st = entityId ? this._hass?.states?.[entityId] : null;
        const state = st?.state ?? "";

        const keepSpotRaw = Object.prototype.hasOwnProperty.call(it || {}, "keep_spot")
          ? it.keep_spot
          : buttonsCfg.keep_spot;
        const keepSpot = this._toBool(this._resolveDynamicValue(keepSpotRaw, entityId, state, false), false);

        const hasEntityState = !entityId || !!st;
        const isVisible = this._toBool(it?.empty, false) || this._isButtonItemVisible(it, buttonsCfg);

        if (hasEntityState && isVisible) return it;
        if (!keepSpot) return null;

        return { ...it, empty: true };
      })
      .filter(Boolean);

    if (!items.length) return { html: "", items: [] };

    const buttonDefs = items.map((item, index) => {
      const hasEntity = !!item?.entity;
      if (!hasEntity && this._toBool(item?.empty, false)) {
        const colSpan = Math.max(1, parseInt(item.width ?? 1, 10) || 1);
        const safeColSpan = Math.min(cols, colSpan);
        const btnWidth = size * safeColSpan + gap * (safeColSpan - 1);
        const html = `<div class="sg-room-light-empty" style="grid-column:span ${safeColSpan};width:${btnWidth}px;height:${size}px;" aria-hidden="true"></div>`;
        return { html, colSpan: safeColSpan };
      }

      const st = this._hass.states[item.entity];
      const state = st?.state || "unknown";
      const domain = String(item.entity || "").split(".")[0];

      const defaultDomainIcon = this._defaultEntityIcon(item.entity, state, st?.attributes);

      const obsoleteCfg = this._resolveObsoleteConfig(item.obsolete ?? buttonsCfg.obsolete);
      const isObsolete = this._isEntityObsolete(st, obsoleteCfg?.hours);

      const themeStyle = this._resolveThemeButtonStyle(item, buttonsCfg, st, state, isObsolete);

      const baseIconTpl = isObsolete
        ? (obsoleteCfg.icon ?? item.icon ?? buttonsCfg.icon ?? themeStyle.icon)
        : (item.icon ?? buttonsCfg.icon ?? themeStyle.icon);
      const icon = this._resolveDynamicValue(baseIconTpl, item.entity, state, st?.attributes?.icon || defaultDomainIcon);
      const iconName = typeof icon === "string" ? icon.trim() : "";

      const text = this._buttonTextValue(item, buttonsCfg, "");
      const hasText = text !== "";
      const textFontSizeRaw = this._resolveDynamicValue(item.font_size ?? buttonsCfg.font_size ?? themeStyle.font_size, item.entity, state, null);
      const textFontSize = textFontSizeRaw == null || textFontSizeRaw === ""
        ? Math.max(10, Math.round(size * 0.27))
        : Math.max(8, this._toPx(textFontSizeRaw, Math.round(size * 0.27)));
      const textFontWeightRaw = this._resolveDynamicValue(item.font_weight ?? buttonsCfg.font_weight ?? themeStyle.font_weight, item.entity, state, null);
      const textFontWeight = textFontWeightRaw == null || textFontWeightRaw === "" ? "inherit" : String(textFontWeightRaw);
      const textFontFamilyRaw = this._resolveDynamicValue(item.font_family ?? buttonsCfg.font_family ?? themeStyle.font_family, item.entity, state, null);
      const textFontFamily = textFontFamilyRaw == null || textFontFamilyRaw === "" ? "inherit" : String(textFontFamilyRaw);
      const iconSizePx = Math.max(10, Math.round(size * 0.5));
      const textIconGap = 6;
      const contentPadX = 8;

      const iconColorTpl = isObsolete
        ? (obsoleteCfg.color ?? obsoleteCfg.icon_color ?? item.color ?? item.icon_color ?? buttonsCfg.color ?? buttonsCfg.icon_color ?? themeStyle.color)
        : (item.color ?? item.icon_color ?? buttonsCfg.color ?? buttonsCfg.icon_color ?? themeStyle.color);
      const bgTpl = isObsolete
        ? (obsoleteCfg.background ?? item.background ?? buttonsCfg.background ?? buttonsCfg.bg ?? themeStyle.background)
        : (item.background ?? buttonsCfg.background ?? buttonsCfg.bg ?? themeStyle.background);
      const borderTpl = isObsolete
        ? (obsoleteCfg.border ?? item.border ?? buttonsCfg.border ?? themeStyle.border_size)
        : (item.border ?? buttonsCfg.border ?? themeStyle.border_size);
      const borderColorTpl = isObsolete
        ? (obsoleteCfg.border_color ?? item.border_color ?? buttonsCfg.border_color ?? themeStyle.border_color)
        : (item.border_color ?? buttonsCfg.border_color ?? themeStyle.border_color);

      const lightColorModeRaw = this._resolveDynamicValue(
        item.use_light_color ?? item.light_color ?? buttonsCfg.use_light_color ?? buttonsCfg.light_color,
        item.entity,
        state,
        false
      );
      const lightColorMode = this._normalizeLightColorMode(lightColorModeRaw);
      const invertState = !!this._resolveDynamicValue(item.invert_state ?? buttonsCfg.invert_state, item.entity, state, false);
      const isUnavailable = state === "unavailable";
      const baseActive = this._isEntityActive(item.entity, state);
      const isActive = invertState ? !baseActive : baseActive;

      const bDef = SEAGULL_ROOM_THEME_DEFAULT.button;
      const dDef = bDef.default || {};
      const emptyDef = bDef.empty || {};
      const autoDef = bDef.automation || {};
      const defaultBg = !hasEntity
        ? (emptyDef?.inactive?.background ?? "#e5e7eb")
        : (isUnavailable
          ? (dDef?.unavailable?.background ?? "#6b7280")
          : ((domain === "automation")
            ? (isActive ? (autoDef?.active?.background ?? "#3b82f6") : (autoDef?.inactive?.background ?? "#d1d5db"))
            : (isActive ? (dDef?.active?.background ?? "#f59e0b") : (dDef?.inactive?.background ?? "#4b5563"))));
      let bgColor = this._paletteColor(this._resolveDynamicValue(
        bgTpl,
        item.entity,
        state,
        defaultBg
      ));
      if (hasEntity && !isUnavailable && lightColorMode !== "false" && item.entity.startsWith("light.") && state === "on") {
        const resolvedLight = this._resolveLightEntityColor(st?.attributes, lightColorMode);
        if (resolvedLight) bgColor = resolvedLight;
      }

      const defaultIconColor = !hasEntity
        ? (emptyDef?.inactive?.color ?? "#9ca3af")
        : (isUnavailable
          ? (dDef?.unavailable?.color ?? "#d1d5db")
          : ((domain === "automation")
            ? (isActive ? (autoDef?.active?.color ?? "#eaf2ff") : (autoDef?.inactive?.color ?? "#111827"))
            : (isActive ? (dDef?.active?.color ?? "#111827") : (dDef?.inactive?.color ?? "#e5e7eb"))));

      const iColor = this._paletteColor(this._resolveDynamicValue(
        iconColorTpl,
        item.entity,
        state,
        defaultIconColor
      ));
      const borderW = Math.max(0, Number(this._resolveDynamicValue(borderTpl, item.entity, state, 0)) || 0);
      const borderColor = this._paletteColor(this._resolveDynamicValue(borderColorTpl, item.entity, state, "$btn_border"));
      const borderRadiusRaw = this._resolveDynamicValue(
        item.border_radius ?? buttonsCfg.border_radius ?? themeStyle.border_radius,
        item.entity,
        state,
        null
      );
      const borderRadiusCss = borderRadiusRaw == null || borderRadiusRaw === ""
        ? "9999px"
        : `${Math.max(0, this._toPx(borderRadiusRaw, 9999))}px`;

      const colSpan = Math.max(1, parseInt(item.width ?? 1, 10) || 1);
      const safeColSpan = Math.min(cols, colSpan);
      const btnWidth = size * safeColSpan + gap * (safeColSpan - 1);
      const isEmpty = !!this._resolveDynamicValue(item.empty ?? buttonsCfg.empty, item.entity, state, false);

      const isIconExplicitlyHidden = baseIconTpl === false || baseIconTpl === null;
      let showIcon = !!iconName && !isIconExplicitlyHidden;

      if (hasText && safeColSpan === 1 && showIcon) {
        const availableTextAndIconWidth = Math.max(0, btnWidth - (contentPadX * 2));
        const textWidthEstimate = this._estimateTextWidthPx(text, textFontSize);
        const neededWidth = iconSizePx + textIconGap + textWidthEstimate;
        if (neededWidth > availableTextAndIconWidth) showIcon = false;
      }

      const html = isEmpty
        ? `
        <div aria-hidden="true"
          style="grid-column:span ${safeColSpan};width:${btnWidth}px;height:${size}px;"></div>
      `
        : `
        <button class="sg-room-light-btn" data-index="${index}"
          style="grid-column:span ${safeColSpan};width:${btnWidth}px;height:${size}px;border-radius:${borderRadiusCss};border:${borderW}px solid ${this._esc(borderColor)};cursor:pointer;display:inline-flex;align-items:center;justify-content:center;align-self:start;background:${this._esc(bgColor)};padding:0;direction:ltr;">
          <span style="display:inline-flex;align-items:center;justify-content:center;max-width:100%;padding:0 ${contentPadX}px;box-sizing:border-box;gap:${textIconGap}px;overflow:hidden;">
            ${showIcon ? `<ha-icon icon="${this._esc(iconName)}" style="color:${this._esc(iColor)};--mdc-icon-size:${iconSizePx}px;flex:0 0 auto;"></ha-icon>` : ""}
            ${hasText ? `<span style="color:${this._esc(iColor)};font-size:${textFontSize}px;font-weight:${this._esc(textFontWeight)};font-family:${this._esc(textFontFamily)};line-height:1;white-space:nowrap;overflow:hidden;">${this._esc(text)}</span>` : ""}
          </span>
        </button>
      `;

      return { html, colSpan: safeColSpan };
    });

    const buttons = buttonDefs.map((b) => b.html).join("");

    if (align === "justified") {
      return {
        items,
        html: `
          <div style="display:grid;grid-template-columns:repeat(${cols}, minmax(0,1fr));gap:${gap}px;align-items:start;align-content:start;justify-items:start;direction:ltr;">
            ${buttons}
          </div>
        `,
      };
    }

    if (align === "right") {
      const rows = [];
      let current = [];
      let used = 0;

      for (const b of buttonDefs) {
        if (used + b.colSpan > cols) {
          rows.push({ items: current, used });
          current = [b];
          used = b.colSpan;
        } else {
          current.push(b);
          used += b.colSpan;
        }
      }
      if (current.length) rows.push({ items: current, used });

      const rowsHtml = rows.map((row) => {
        const empty = Math.max(0, cols - row.used);
        const spacer = empty > 0
          ? `<div style="grid-column:span ${empty};width:${size * empty + gap * (empty - 1)}px;height:1px;"></div>`
          : "";
        const rowButtons = row.items.map((b) => b.html).join("");
        return `
          <div style="display:grid;grid-template-columns:repeat(${cols}, ${size}px);gap:${gap}px;align-items:start;align-content:start;justify-items:start;width:fit-content;">
            ${spacer}
            ${rowButtons}
          </div>
        `;
      }).join("");

      return {
        items,
        html: `
          <div style="width:100%;display:flex;flex-direction:column;gap:${gap}px;align-items:flex-end;">
            ${rowsHtml}
          </div>
        `,
      };
    }

    const outerJustify = align === "left" ? "flex-start" : "center";

    return {
      items,
      html: `
        <div style="width:100%;display:flex;justify-content:${outerJustify};align-items:flex-start;">
          <div style="display:grid;grid-template-columns:repeat(${cols}, ${size}px);gap:${gap}px;align-items:start;align-content:start;justify-items:start;direction:ltr;">
            ${buttons}
          </div>
        </div>
      `,
    };
  }

  _wireLightButtons() {
    const btns = this._inner.querySelectorAll(".sg-room-light-btn");

    btns.forEach((btn) => {
      let clickTimer = null;
      let holdTimer = null;
      let holdFired = false;

      const index = Number(btn.getAttribute("data-index"));
      const item = this._renderedLightItems?.[index];
      if (!item) return;

      btn.style.transition = "filter 100ms ease";
      btn.addEventListener("mouseenter", () => {
        btn.style.filter = "brightness(1.08)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.filter = "brightness(1)";
      });

      btn.addEventListener("pointerdown", () => {
        holdFired = false;
        clearTimeout(holdTimer);
        holdTimer = setTimeout(() => {
          holdFired = true;
          this._runAction(item, "hold_action");
        }, 420);
      });

      const clearHold = () => {
        clearTimeout(holdTimer);
      };

      btn.addEventListener("pointerup", clearHold);
      btn.addEventListener("pointerleave", clearHold);

      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (holdFired) return;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          this._runAction(item, "tap_action");
        }, 210);
      });

      btn.addEventListener("dblclick", (ev) => {
        ev.preventDefault();
        clearTimeout(clickTimer);
        clearTimeout(holdTimer);
        this._runAction(item, "double_tap_action");
      });
    });
  }

  _runAction(item, key) {
    const act = this._resolveAction(item, key);
    if (!act) return;
    this._runGenericAction(act, item.entity);
  }

  async _runGenericAction(act, entityId) {
    if (!act) return;
    const hass = this._hass;
    const type = act.action;

    if (Array.isArray(act.sequence)) {
      await this._runActionSequence(act.sequence, entityId);
      return;
    }

    if (type === "sequence") {
      const seq = Array.isArray(act.actions) ? act.actions : act.sequence;
      if (Array.isArray(seq)) {
        await this._runActionSequence(seq, entityId);
      }
      return;
    }

    if (type === "toggle") {
      if (!entityId) return;

      if (entityId.startsWith("lock.")) {
        const cur = hass?.states?.[entityId]?.state;
        const svc = cur === "locked" ? "unlock" : "lock";
        hass.callService?.("lock", svc, { entity_id: entityId });
      } else if (entityId.startsWith("media_player.")) {
        const cur = hass?.states?.[entityId]?.state;
        const svc = cur === "playing" ? "media_pause" : "media_play";
        hass.callService?.("media_player", svc, { entity_id: entityId });
      } else {
        hass.callService?.("homeassistant", "toggle", { entity_id: entityId });
      }
      return;
    }

    if (type === "more-info") {
      if (!entityId) return;
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        })
      );
      return;
    }

    if (type === "navigate") {
      const path = act.navigation_path ?? act.url_path ?? act.path ?? "/";
      if (window?.history?.pushState) {
        window.history.pushState(null, "", path);
        window.dispatchEvent(new Event("location-changed"));
      } else {
        window.location.assign(path);
      }
      return;
    }

    if (type === "perform-action") {
      const perf = act.perform_action ?? act.service;
      if (!perf || typeof perf !== "string") return;
      const [domain, service] = perf.includes(".") ? perf.split(".") : ["homeassistant", perf];
      const data = act.data ?? act.service_data ?? {};
      const target = act.target ?? {};
      hass.callService?.(domain, service, { ...data, ...target });
    }
  }

  async _runActionSequence(sequence, entityId) {
    if (!Array.isArray(sequence)) return;

    for (const step of sequence) {
      if (!step) continue;

      if (typeof step === "number") {
        await this._sleep(step);
        continue;
      }

      if (typeof step === "object") {
        const delay = Number(step.delay_ms ?? step.delay ?? NaN);
        if (Number.isFinite(delay) && delay > 0) {
          await this._sleep(delay);
          continue;
        }

        const normalized = this._normalizeSequenceAction(step);
        if (normalized) await this._runGenericAction(normalized, entityId);
      }
    }
  }

  _normalizeSequenceAction(step) {
    if (!step || typeof step !== "object") return null;
    if (step.action || step.type) return { ...step, action: step.action ?? step.type };
    if (Array.isArray(step.sequence) || Array.isArray(step.actions)) return { action: "sequence", ...step };
    if (step.perform_action || step.service) return { action: "perform-action", ...step };
    if (step.navigation_path || step.url_path || step.path) return { action: "navigate", ...step };
    return null;
  }

  _sleep(ms) {
    const wait = Math.max(0, Number(ms) || 0);
    return new Promise((resolve) => setTimeout(resolve, wait));
  }

  _resolveAction(item, key) {
    const buttonsCfg = this._config.buttons || this._config.lights || {};
    const domain = String(item?.entity || "").split(".")[0];
    const isInfoDomain = domain === "sensor" || domain === "binary_sensor";
    const fallback = isInfoDomain
      ? "more-info"
      : (key === "tap_action" ? "toggle" : "more-info");
    const raw = item?.[key] ?? buttonsCfg?.[key] ?? fallback;
    if (!raw) return null;

    if (typeof raw === "string") {
      return { action: raw };
    }

    if (typeof raw === "object") {
      const action = raw.action ?? raw.type;
      if (!action) return null;
      return { ...raw, action };
    }

    return null;
  }

  _resolveCardAction(key) {
    const fallback = "more-info";
    const raw = this._config?.[key] ?? fallback;
    if (!raw) return null;

    if (typeof raw === "string") return { action: raw };
    if (typeof raw === "object") {
      const action = raw.action ?? raw.type;
      if (!action) return null;
      return { ...raw, action };
    }
    return null;
  }

  _resolveTextAction(key) {
    const textCfg = this._config?.text || {};
    const fallback = "more-info";
    const raw = textCfg?.[key] ?? fallback;

    if (!raw) return null;
    if (typeof raw === "string") return { action: raw };
    if (typeof raw === "object") {
      const action = raw.action ?? raw.type;
      if (!action) return null;
      return { ...raw, action };
    }
    return null;
  }

  _wireTextActions() {
    const el = this._inner?.querySelector?.('.sg-room-text-layer');
    if (!el) return;

    let clickTimer = null;
    let holdTimer = null;
    let holdFired = false;

    const targetEntity = this._config?.text?.entity ?? this._config?.entity;

    el.onpointerdown = () => {
      holdFired = false;
      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        holdFired = true;
        const act = this._resolveTextAction("hold_action");
        this._runGenericAction(act, targetEntity);
      }, 420);
    };

    const clearHold = () => clearTimeout(holdTimer);
    el.onpointerup = clearHold;
    el.onpointerleave = clearHold;

    el.onclick = (ev) => {
      ev.preventDefault();
      if (holdFired) return;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        const act = this._resolveTextAction("tap_action");
        this._runGenericAction(act, targetEntity);
      }, 210);
    };

    el.ondblclick = (ev) => {
      ev.preventDefault();
      clearTimeout(clickTimer);
      clearTimeout(holdTimer);
      const act = this._resolveTextAction("double_tap_action");
      this._runGenericAction(act, targetEntity);
    };
  }

  _wireCardIconActions() {
    const el = this._icon;
    if (!el) return;

    let clickTimer = null;
    let holdTimer = null;
    let holdFired = false;

    el.onpointerdown = () => {
      holdFired = false;
      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        holdFired = true;
        const act = this._resolveCardAction("hold_action");
        this._runGenericAction(act, this._config?.entity);
      }, 420);
    };

    const clearHold = () => clearTimeout(holdTimer);
    el.onpointerup = clearHold;
    el.onpointerleave = clearHold;

    el.onclick = (ev) => {
      ev.preventDefault();
      if (holdFired) return;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        const act = this._resolveCardAction("tap_action");
        this._runGenericAction(act, this._config?.entity);
      }, 210);
    };

    el.ondblclick = (ev) => {
      ev.preventDefault();
      clearTimeout(clickTimer);
      clearTimeout(holdTimer);
      const act = this._resolveCardAction("double_tap_action");
      this._runGenericAction(act, this._config?.entity);
    };
  }

  _collectButtonItems(buttonsCfg) {
    const out = [];

    const fromArray = (arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item) => {
        if (typeof item === "string") {
          out.push({ entity: item, width: 1 });
        } else if (item && typeof item === "object") {
          const hasEntity = !!item.entity;
          const hasIconOnly = !!item.icon;
          const hasText = this._buttonTextValue(item, buttonsCfg, "") !== "";
          const isEmpty = this._toBool(item.empty, false);
          if (hasEntity || hasIconOnly || hasText || isEmpty) {
            out.push({ width: 1, ...item });
          }
        }
      });
    };

    const fromObject = (obj) => {
      if (!obj || Array.isArray(obj) || typeof obj !== "object") return;
      Object.entries(obj).forEach(([entityId, value]) => {
        if (value === false) {
          out.push({ entity: entityId, hidden: true, width: 1 });
        } else if (value === true) {
          out.push({ entity: entityId, width: 1 });
        } else if (value && typeof value === "object") {
          out.push({ entity: entityId, width: 1, ...value });
        }
      });
    };

    fromArray(buttonsCfg.entities);
    fromArray(buttonsCfg.items);
    fromArray(buttonsCfg.button);
    fromArray(buttonsCfg.buttons);
    fromArray(buttonsCfg.light);

    fromObject(buttonsCfg.entities);
    fromObject(buttonsCfg.items);
    fromObject(buttonsCfg.button);
    fromObject(buttonsCfg.buttons);
    fromObject(buttonsCfg.light);

    return out;
  }

  _buttonTextValue(item, buttonsCfg = {}, fallback = "") {
    const entityId = String(item?.entity || "");
    const st = entityId ? this._hass?.states?.[entityId] : null;
    const state = st?.state ?? "";
    const raw = item?.text ?? item?.label ?? buttonsCfg?.text ?? buttonsCfg?.label;
    const resolved = this._resolveDynamicValue(raw, entityId, state, fallback);
    if (resolved == null) return "";
    return String(resolved).trim();
  }

  _estimateTextWidthPx(text, fontSizePx) {
    const s = String(text ?? "");
    if (!s) return 0;
    const fs = Math.max(1, Number(fontSizePx) || 12);
    return Math.ceil(s.length * fs * 0.56);
  }

  _isButtonItemVisible(item, buttonsCfg = {}) {
    const entityId = String(item?.entity || "");
    const st = entityId ? this._hass?.states?.[entityId] : null;
    const state = st?.state ?? "";

    const hasOwn = (obj, key) => !!obj && Object.prototype.hasOwnProperty.call(obj, key);
    const resolve = (key, fallback) => {
      const raw = hasOwn(item, key)
        ? item[key]
        : (hasOwn(buttonsCfg, key) ? buttonsCfg[key] : fallback);
      return this._resolveDynamicValue(raw, entityId, state, fallback);
    };

    const showRaw = resolve("show", true);
    if (!this._toBool(showRaw, true)) return false;

    if (!entityId) return true;

    if (hasOwn(item, "show_value") || hasOwn(buttonsCfg, "show_value")) {
      const expected = resolve("show_value", undefined);
      if (!this._matchesValueFilter(state, expected)) return false;
    }

    if (hasOwn(item, "show_not_value") || hasOwn(buttonsCfg, "show_not_value")) {
      const disallowed = resolve("show_not_value", undefined);
      if (this._matchesValueFilter(state, disallowed)) return false;
    }

    if (hasOwn(item, "show_above") || hasOwn(buttonsCfg, "show_above")) {
      const nState = Number(state);
      const nMin = Number(resolve("show_above", NaN));
      if (!Number.isFinite(nState) || !Number.isFinite(nMin) || !(nState > nMin)) return false;
    }

    if (hasOwn(item, "show_below") || hasOwn(buttonsCfg, "show_below")) {
      const nState = Number(state);
      const nMax = Number(resolve("show_below", NaN));
      if (!Number.isFinite(nState) || !Number.isFinite(nMax) || !(nState < nMax)) return false;
    }

    return true;
  }

  _matchesValueFilter(state, expected) {
    if (Array.isArray(expected)) {
      return expected.some((v) => String(state) === String(v));
    }

    if (typeof expected === "string") {
      const t = expected.trim();
      if (t.startsWith("[") && t.endsWith("]")) {
        try {
          const parsed = JSON.parse(t);
          if (Array.isArray(parsed)) {
            return parsed.some((v) => String(state) === String(v));
          }
        } catch (_e) {
          // ignore and compare as plain string
        }
      }
    }

    return String(state) === String(expected);
  }

  _toBool(value, fallback = false) {
    if (value === undefined || value === null) return fallback;
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;

    const s = String(value).trim().toLowerCase();
    if (["true", "on", "yes", "1"].includes(s)) return true;
    if (["false", "off", "no", "0", "", "none", "null", "undefined"].includes(s)) return false;
    return fallback;
  }

  _resolveDynamicValue(input, entityId, state, fallback = null, varsCtx = null) {
    if (input == null) return fallback;

    if (Array.isArray(input)) {
      const byRules = this._resolveByRules(input, entityId, state, varsCtx);
      return byRules == null ? fallback : byRules;
    }

    if (typeof input === "number" || typeof input === "boolean") return input;
    if (typeof input !== "string") return String(input);

    const s = input.trim();
    if (!s) return fallback;

    if (s.includes("{%") && s.includes("%}")) {
      const jinja = this._evalJinjaIfElseTemplate(s, entityId, state, varsCtx);
      return jinja == null ? fallback : jinja;
    }

    if (s.includes("{{") && s.includes("}}") && (!s.startsWith("{{") || !s.endsWith("}}"))) {
      return s.replace(/{{\s*([\s\S]*?)\s*}}/g, (_full, exprRaw) => {
        const expr = String(exprRaw ?? "").trim();
        const val = this._evalJsTemplateExpr(expr, entityId, state, "", varsCtx);
        return val == null ? "" : String(val);
      });
    }

    if (!s.startsWith("{{") || !s.endsWith("}}")) return s;

    const expr = s.slice(2, -2).trim();
    return this._evalJsTemplateExpr(expr, entityId, state, fallback, varsCtx);
  }

  _resolveByRules(rules, entityId, state, varsCtx = null) {
    let fallback;

    for (const rule of rules) {
      if (!rule || typeof rule !== "object") continue;
      const { value } = rule;

      const hasCond = ["state", "state_not", "state_above", "state_below", "state_template"].some((k) => rule[k] != null);
      if (!hasCond) {
        fallback = value;
        continue;
      }

      let ok = true;
      if (rule.state != null) ok = ok && String(state) === String(rule.state);
      if (rule.state_not != null) ok = ok && String(state) !== String(rule.state_not);
      if (rule.state_above != null) ok = ok && Number(state) > Number(rule.state_above);
      if (rule.state_below != null) ok = ok && Number(state) < Number(rule.state_below);
      if (rule.state_template != null) ok = ok && !!this._resolveDynamicValue(String(rule.state_template), entityId, state, false, varsCtx);

      if (ok) return value;
    }

    return fallback;
  }

  _evalJinjaIfElseTemplate(tpl, entityId, state, varsCtx = null) {
    const m = tpl.match(/{%\s*if\s+([\s\S]*?)\s*%}([\s\S]*?)(?:{%\s*else\s*%}([\s\S]*?))?{%\s*endif\s*%}/i);
    if (!m) return null;

    const cond = m[1]?.trim();
    const thenVal = (m[2] ?? "").trim();
    const elseVal = (m[3] ?? "").trim();
    const yes = this._evalSimpleCondition(cond, entityId, state, varsCtx);
    return yes ? thenVal : elseVal;
  }

  _evalSimpleCondition(cond, entityId, state, varsCtx = null) {
    const m = String(cond).match(/^(.*?)\s*(==|!=|>=|<=|>|<)\s*(.*?)$/);
    if (!m) return false;

    const left = this._resolveCondToken(m[1], entityId, state, varsCtx);
    const op = m[2];
    const right = this._resolveCondToken(m[3], entityId, state, varsCtx);

    if (op === "==") return String(left) === String(right);
    if (op === "!=") return String(left) !== String(right);

    const l = Number(left);
    const r = Number(right);
    if (!Number.isFinite(l) || !Number.isFinite(r)) return false;
    if (op === ">") return l > r;
    if (op === "<") return l < r;
    if (op === ">=") return l >= r;
    if (op === "<=") return l <= r;
    return false;
  }

  _resolveCondToken(token, entityId, state, varsCtx = null) {
    const t = String(token).trim();
    if (t === "state") return state;
    if (/^states\(entity\)$/i.test(t)) return this._hass?.states?.[entityId]?.state;
    if (varsCtx && Object.prototype.hasOwnProperty.call(varsCtx, t)) return varsCtx[t];
    const q = t.match(/^['\"]([\s\S]*)['\"]$/);
    if (q) return q[1];
    const n = Number(t);
    if (Number.isFinite(n)) return n;
    return t;
  }

  _evalJsTemplateExpr(expr, entityId, state, fallback, varsCtx = null) {
    try {
      const st = this._hass?.states?.[entityId];
      const statesFn = (eid) => this._hass?.states?.[eid]?.state;
      const evalInCtx = (code) => {
        const fn = new Function("ctx", `with (ctx) { return (${code}); }`);
        return fn({
          hass: this._hass,
          entity: entityId,
          state,
          states: statesFn,
          all_states: this._hass?.states,
          attributes: st?.attributes || {},
          is_on: state === "on",
          vars: varsCtx || this._variablesContext || {},
          ...(varsCtx || this._variablesContext || {}),
          round: (v, d = 0) => {
            const n = Number(v);
            if (!Number.isFinite(n)) return v;
            const p = Number.isFinite(Number(d)) ? Math.max(0, Number(d)) : 0;
            return Number(n.toFixed(p));
          },
          upper: (v) => String(v).toUpperCase(),
          lower: (v) => String(v).toLowerCase(),
          trim: (v) => String(v).trim(),
          capitalize: (v) => {
            const s = String(v);
            return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
          },
          title: (v) => String(v).split(/\s+/).map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w)).join(" "),
        });
      };

      const parts = String(expr).split("|").map((x) => x.trim()).filter(Boolean);
      let out = evalInCtx(parts[0] || expr);

      if (parts.length > 1) {
        for (let i = 1; i < parts.length; i += 1) {
          out = this._applyTemplateFilter(out, parts[i]);
        }
      }

      return out == null ? fallback : out;
    } catch (err) {
      console.warn("[seagull-device-card] template eval error", err, expr);
      return fallback;
    }
  }

  _applyTemplateFilter(value, filterSpec) {
    const m = String(filterSpec).match(/^(\w+)\s*(?:\((.*)\))?$/);
    if (!m) return value;

    const name = m[1].toLowerCase();
    const argRaw = (m[2] ?? "").trim();

    if (name === "round") {
      const n = Number(value);
      if (!Number.isFinite(n)) return value;
      const digits = argRaw ? Number(argRaw) : 0;
      const p = Number.isFinite(digits) ? Math.max(0, digits) : 0;
      return Number(n.toFixed(p));
    }

    if (name === "upper") return String(value).toUpperCase();
    if (name === "lower") return String(value).toLowerCase();
    if (name === "trim") return String(value).trim();
    if (name === "capitalize") {
      const s = String(value);
      return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
    }
    if (name === "title") {
      return String(value)
        .split(/\s+/)
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
        .join(" ");
    }

    return value;
  }

  _isEntityActive(entityId, state) {
    const domain = String(entityId || "").split(".")[0];
    if (domain === "lock") return state === "unlocked";
    if (domain === "media_player") return state === "playing";
    return state === "on";
  }

  _defaultEntityIcon(entityId, state, attrs = {}) {
    const domain = String(entityId || "").split(".")[0];
    const icons = this._theme?.button?.icons || SEAGULL_ROOM_THEME_DEFAULT?.button?.icons || {};

    if (domain === "light") {
      const lightCfg = icons.light || {};
      return state === "on"
        ? (lightCfg.on || "mdi:lightbulb")
        : (lightCfg.off || "mdi:lightbulb-off");
    }

    if (domain === "lock") {
      const lockCfg = icons.lock || {};
      if (state === "locked") return lockCfg.locked || "mdi:lock";
      if (state === "unlocked") return lockCfg.unlocked || "mdi:lock-open-variant";
      return lockCfg.default || "mdi:lock-reset";
    }

    if (domain === "binary_sensor") {
      const bsCfg = icons.binary_sensor || {};
      const dcMap = bsCfg.device_class || {};
      const dc = String(attrs?.device_class || "").toLowerCase();
      const on = state === "on";

      const dcCfg = dcMap?.[dc] || null;
      if (dcCfg) {
        return on
          ? (dcCfg.on || bsCfg.default_on || "mdi:check-circle")
          : (dcCfg.off || bsCfg.default_off || "mdi:circle-outline");
      }

      return on
        ? (bsCfg.default_on || "mdi:check-circle")
        : (bsCfg.default_off || "mdi:circle-outline");
    }

    return icons.default || "mdi:help-circle-outline";
  }

  _resolveObsoleteConfig(raw) {
    const obs = SEAGULL_ROOM_THEME_DEFAULT.button?.default?.obsolete || {};
    const defaults = { border: Number(obs.border_size ?? 2), border_color: String(obs.border_color ?? "#d1d5db") };

    if (raw == null || raw === false) return null;
    if (typeof raw === "number") return { hours: raw, ...defaults };
    if (typeof raw === "string") {
      const n = Number(raw);
      return Number.isFinite(n) ? { hours: n, ...defaults } : null;
    }
    if (typeof raw === "object") {
      const hours = Number(raw.hours ?? raw.after_hours ?? raw.value ?? 0);
      if (!Number.isFinite(hours) || hours <= 0) return null;
      return {
        hours,
        icon: raw.icon,
        color: raw.color,
        icon_color: raw.icon_color,
        background: raw.background,
        border: raw.border ?? defaults.border,
        border_color: raw.border_color ?? defaults.border_color,
      };
    }
    return null;
  }

  _isEntityObsolete(st, hours) {
    const h = Number(hours);
    if (!st || !Number.isFinite(h) || h <= 0) return false;

    const ts = st.last_updated || st.last_changed;
    if (!ts) return false;

    const t = Date.parse(ts);
    if (!Number.isFinite(t)) return false;

    const ageMs = Date.now() - t;
    return ageMs > h * 3600 * 1000;
  }

  _normalizeLightColorMode(v) {
    if (v === true) return "both";
    if (v === false || v == null) return "false";
    const s = String(v).toLowerCase().trim();
    if (s === "true" || s === "both") return "both";
    if (s === "color" || s === "brightness" || s === "false") return s;
    return "false";
  }

  _resolveLightEntityColor(attrs, mode = "both") {
    if (!attrs || typeof attrs !== "object") return null;

    const briRaw = Number(attrs.brightness);
    const bri = Number.isFinite(briRaw) ? Math.max(0, Math.min(255, briRaw)) : 255;
    const mul = mode === "brightness" || mode === "both"
      ? (0.25 + 0.75 * (bri / 255))
      : 1;

    if (mode === "brightness") {
      const v = Math.round(245 * mul);
      return `rgb(${v}, ${v}, ${v})`;
    }

    if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length >= 3) {
      const [r0, g0, b0] = attrs.rgb_color.map((x) => Math.max(0, Math.min(255, Number(x) || 0)));
      const r = Math.round(r0 * mul);
      const g = Math.round(g0 * mul);
      const b = Math.round(b0 * mul);
      return `rgb(${r}, ${g}, ${b})`;
    }

    if (Array.isArray(attrs.hs_color) && attrs.hs_color.length >= 2) {
      const h = Number(attrs.hs_color[0]);
      const s = Number(attrs.hs_color[1]);
      if (Number.isFinite(h) && Number.isFinite(s)) {
        const lBase = mode === "both" ? Math.round(20 + 45 * (bri / 255)) : 50;
        return `hsl(${h}, ${s}%, ${lBase}%)`;
      }
    }

    if (attrs.color_temp_kelvin) {
      const k = Number(attrs.color_temp_kelvin);
      if (Number.isFinite(k)) {
        let base = [245, 158, 11];
        if (k <= 3000) base = [245, 158, 11];
        else if (k <= 4500) base = [243, 244, 246];
        else base = [191, 219, 254];
        const [r, g, b] = base.map((v) => Math.round(v * mul));
        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    // if only color requested but no color attrs, keep default fallback in caller
    return null;
  }

  _normalizeTheme(theme) {
    if (!theme || typeof theme !== "object" || Array.isArray(theme)) {
      return JSON.parse(JSON.stringify(SEAGULL_ROOM_THEME_DEFAULT));
    }
    return this._deepMerge(SEAGULL_ROOM_THEME_DEFAULT, theme);
  }

  _deepMerge(base, patch) {
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      return JSON.parse(JSON.stringify(base));
    }
    const out = Array.isArray(base) ? [...base] : { ...(base || {}) };
    for (const [k, v] of Object.entries(patch)) {
      if (v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])) {
        out[k] = this._deepMerge(out[k], v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  _paletteMode() {
    const mode = String(this._theme?.palette_mode || "auto").toLowerCase();
    if (mode === "day" || mode === "night") return mode;

    // auto => follow client UI theme (HA frontend darkMode)
    const darkMode = this._hass?.themes?.darkMode;
    if (typeof darkMode === "boolean") return darkMode ? "night" : "day";

    return "day";
  }

  _paletteColor(value) {
    if (value == null) return value;
    if (typeof value !== "string") return value;

    const raw = value.trim();
    if (!raw.startsWith("$")) return raw;

    const key = raw.slice(1);
    const entry = this._theme?.palette?.[key];
    if (!entry) return raw;
    if (typeof entry === "string") return entry;
    if (typeof entry === "object") {
      const mode = this._paletteMode();
      return entry[mode] ?? entry.day ?? entry.night ?? raw;
    }
    return raw;
  }

  _resolveThemeButtonStyle(item, buttonsCfg, st, state, isObsolete = false) {
    const themeButton = this._theme?.button;
    if (!themeButton || typeof themeButton !== "object") return {};

    const domain = item?.entity ? String(item.entity).split(".")[0] : "empty";
    const domainCfg = themeButton?.[domain] && typeof themeButton[domain] === "object" ? themeButton[domain] : {};

    const activeRaw = this._resolveDynamicValue(item.invert_state ?? buttonsCfg.invert_state, item.entity, state, false);
    const invertState = !!activeRaw;
    const baseActive = this._isEntityActive(item.entity, state);
    const isActive = invertState ? !baseActive : baseActive;
    const isUnavailable = state === "unavailable";

    const attrs = st?.attributes || {};

    const merge = (into, from) => {
      if (!from || typeof from !== "object" || Array.isArray(from)) return into;
      return { ...into, ...from };
    };

    let style = {};
    style = merge(style, this._pickThemeBucket(themeButton, item.entity, state, attrs, isActive, isUnavailable, isObsolete));
    style = merge(style, this._pickThemeBucket(domainCfg, item.entity, state, attrs, isActive, isUnavailable, isObsolete));

    const dc = String(attrs?.device_class ?? "").trim();
    if (dc && domainCfg?.device_class && typeof domainCfg.device_class === "object") {
      const dcCfg = domainCfg.device_class[dc];
      style = merge(style, this._pickThemeBucket(dcCfg, item.entity, state, attrs, isActive, isUnavailable, isObsolete));
    }

    return {
      icon: style.icon,
      color: this._paletteColor(style.color ?? style.icon_color),
      background: this._paletteColor(style.background),
      border_size: style.border_size,
      border_color: this._paletteColor(style.border_color),
      border_radius: style.border_radius,
    };
  }

  _pickThemeBucket(src, entityId, state, attrs, isActive, isUnavailable, isObsolete) {
    if (!src || typeof src !== "object") return {};
    let out = {};

    const merge = (obj) => {
      if (obj && typeof obj === "object" && !Array.isArray(obj)) out = { ...out, ...obj };
    };

    const baseKeys = ["icon", "color", "icon_color", "background", "border_size", "border_color", "border_radius"];
    baseKeys.forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(src, k)) out[k] = src[k];
    });

    if (isUnavailable && src.unavailable) merge(src.unavailable);
    else if (isObsolete && src.obsolete) merge(src.obsolete);
    else if (isActive && src.active) merge(src.active);
    else if (!isActive && src.inactive) merge(src.inactive);

    if (src.state_value && typeof src.state_value === "object") {
      const sv = src.state_value[state];
      merge(sv);
    }

    if (src.state_not_value && typeof src.state_not_value === "object") {
      Object.entries(src.state_not_value).forEach(([k, v]) => {
        if (String(state) !== String(k)) merge(v);
      });
    }

    if (src.state_above && typeof src.state_above === "object") {
      const nState = Number(state);
      Object.entries(src.state_above).forEach(([k, v]) => {
        const n = Number(k);
        if (Number.isFinite(nState) && Number.isFinite(n) && nState > n) merge(v);
      });
    }

    if (src.state_below && typeof src.state_below === "object") {
      const nState = Number(state);
      Object.entries(src.state_below).forEach(([k, v]) => {
        const n = Number(k);
        if (Number.isFinite(nState) && Number.isFinite(n) && nState < n) merge(v);
      });
    }

    if (src.state) {
      const stateCond = this._resolveDynamicValue(src.state, entityId, state, false, attrs);
      if (this._toBool(stateCond, false) && src.state_style && typeof src.state_style === "object") {
        merge(src.state_style);
      }
    }

    if (src.attribute_value && typeof src.attribute_value === "object") {
      for (const [attrName, valuesMap] of Object.entries(src.attribute_value)) {
        if (!valuesMap || typeof valuesMap !== "object") continue;
        const attrVal = attrs?.[attrName];
        const style = valuesMap[String(attrVal)];
        merge(style);
      }
    }

    if (src.attribute_not_value && typeof src.attribute_not_value === "object") {
      for (const [attrName, valuesMap] of Object.entries(src.attribute_not_value)) {
        if (!valuesMap || typeof valuesMap !== "object") continue;
        const attrVal = attrs?.[attrName];
        Object.entries(valuesMap).forEach(([v, style]) => {
          if (String(attrVal) !== String(v)) merge(style);
        });
      }
    }

    if (src.attribute_above && typeof src.attribute_above === "object") {
      for (const [attrName, valuesMap] of Object.entries(src.attribute_above)) {
        if (!valuesMap || typeof valuesMap !== "object") continue;
        const attrVal = Number(attrs?.[attrName]);
        Object.entries(valuesMap).forEach(([v, style]) => {
          const n = Number(v);
          if (Number.isFinite(attrVal) && Number.isFinite(n) && attrVal > n) merge(style);
        });
      }
    }

    if (src.attribute_below && typeof src.attribute_below === "object") {
      for (const [attrName, valuesMap] of Object.entries(src.attribute_below)) {
        if (!valuesMap || typeof valuesMap !== "object") continue;
        const attrVal = Number(attrs?.[attrName]);
        Object.entries(valuesMap).forEach(([v, style]) => {
          const n = Number(v);
          if (Number.isFinite(attrVal) && Number.isFinite(n) && attrVal < n) merge(style);
        });
      }
    }

    if (src.attribute) {
      const attrCond = this._resolveDynamicValue(src.attribute, entityId, state, false, attrs);
      if (this._toBool(attrCond, false) && src.attribute_style && typeof src.attribute_style === "object") {
        merge(src.attribute_style);
      }
    }

    return out;
  }

  _esc(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  _toPx(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  _clampOpacity(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0.45;
    return Math.min(1, Math.max(0, n));
  }

  _toRgba(color, opacity) {
    const c = String(color).trim();
    const hex = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      let h = hex[1];
      if (h.length === 3) h = h.split("").map((x) => x + x).join("");
      const int = parseInt(h, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    const rgb = c.match(/^rgba?\(([^)]+)\)$/i);
    if (rgb) {
      const parts = rgb[1].split(",").map((v) => Number(v.trim()));
      if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
        const [r, g, b] = parts;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
    }
    return c;
  }
}

class SeagullRoomCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config || { type: "custom:seagull-device-card" };
    this._selectedAreaId = this._config?.wizard?.area_id || "";
    this._selectedDeviceIds = new Set(this._config?.wizard?.device_ids || []);
    this._selectedEntityIds = new Set(this._config?.wizard?.entity_ids || []);
    this._wizardLoaded = false;
    this._render();
    this._ensureWizardData();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
    this._ensureWizardData();
  }

  async _ensureWizardData() {
    if (!this._hass || !this._hass.connection || this._wizardLoaded) return;
    this._wizardLoaded = true;
    try {
      const [areas, devices, entities] = await Promise.all([
        this._hass.connection.sendMessagePromise({ type: "config/area_registry/list" }),
        this._hass.connection.sendMessagePromise({ type: "config/device_registry/list" }),
        this._hass.connection.sendMessagePromise({ type: "config/entity_registry/list" }),
      ]);
      this._areas = Array.isArray(areas) ? areas : [];
      this._devices = Array.isArray(devices) ? devices : [];
      this._entities = Array.isArray(entities) ? entities : [];
      this._render();
    } catch (error) {
      this._wizardError = error?.message || String(error);
      this._render();
    }
  }

  _areaDevices() {
    const areaId = this._selectedAreaId;
    if (!areaId || !Array.isArray(this._devices)) return [];
    const byDevice = new Map();
    for (const entity of this._entities || []) {
      if (!entity || entity.disabled_by || entity.hidden_by) continue;
      const devId = entity.device_id;
      if (!devId) continue;
      if (!byDevice.has(devId)) byDevice.set(devId, []);
      byDevice.get(devId).push(entity);
    }

    return this._devices
      .filter((d) => d && d.area_id === areaId)
      .map((device) => ({
        device,
        entities: (byDevice.get(device.id) || []).sort((a, b) => String(a.entity_id).localeCompare(String(b.entity_id))),
      }))
      .sort((a, b) => String(a.device?.name_by_user || a.device?.name || "").localeCompare(String(b.device?.name_by_user || b.device?.name || "")));
  }

  _onAreaChange(ev) {
    this._selectedAreaId = ev.target.value;
    this._selectedDeviceIds.clear();
    this._selectedEntityIds.clear();
    this._render();
  }

  _toggleDevice(deviceId, checked, entities) {
    if (checked) this._selectedDeviceIds.add(deviceId);
    else this._selectedDeviceIds.delete(deviceId);
    (entities || []).forEach((entity) => {
      if (checked) this._selectedEntityIds.add(entity.entity_id);
      else this._selectedEntityIds.delete(entity.entity_id);
    });
    this._render();
  }

  _toggleEntity(deviceId, entityId, checked, allDeviceEntities) {
    if (checked) this._selectedEntityIds.add(entityId);
    else this._selectedEntityIds.delete(entityId);
    const everySelected = (allDeviceEntities || []).every((e) => this._selectedEntityIds.has(e.entity_id));
    if (everySelected) this._selectedDeviceIds.add(deviceId);
    else this._selectedDeviceIds.delete(deviceId);
    this._render();
  }

  _buildGeneratedConfig() {
    const tree = this._areaDevices()
      .filter(({ device, entities }) => this._selectedDeviceIds.has(device.id) || entities.some((e) => this._selectedEntityIds.has(e.entity_id)))
      .map(({ device, entities }) => {
        const selectedEntities = entities.filter((e) => this._selectedEntityIds.has(e.entity_id));
        return {
          device_id: device.id,
          name: device.name_by_user || device.name || device.id,
          entities: selectedEntities.map((e) => ({
            entity_id: e.entity_id,
            name: e.name || e.original_name || e.entity_id,
          })),
        };
      })
      .filter((d) => d.entities.length > 0);

    const entityButtons = tree.flatMap((d) => d.entities.map((e) => ({ entity: e.entity_id, width: 1 })));
    return {
      ...this._config,
      type: "custom:seagull-device-card",
      wizard: {
        area_id: this._selectedAreaId || null,
        device_ids: [...this._selectedDeviceIds],
        entity_ids: [...this._selectedEntityIds],
      },
      devices: tree,
      buttons: {
        ...(this._config?.buttons || {}),
        entities: entityButtons,
      },
    };
  }

  _emitConfigChanged(config) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config },
    }));
  }

  _onCreateConfiguration() {
    const generated = this._buildGeneratedConfig();
    this._generatedConfig = generated;
    this._emitConfigChanged(generated);
    this._render();
  }

  _render() {
    const areas = Array.isArray(this._areas) ? this._areas : [];
    const areaRows = this._areaDevices();
    const selectedCount = this._selectedEntityIds?.size || 0;
    const generated = this._generatedConfig || this._config;

    this.innerHTML = `
      <div style="padding:12px 0; opacity:.95; font-size:13px; line-height:1.4;">
        <div style="margin:0 0 12px 0;background:var(--card-background-color,#f3f4f6);border-radius:9999px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--divider-color,#d1d5db);">
          <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Seagull Device Card</div>
          <div style="background:#0ea5e9;color:#fff;border-radius:9999px;padding:2px 8px;font-size:12px;font-weight:700;line-height:1.6;">v${SEAGULL_DEVICE_CARD_VERSION}</div>
        </div>

        <div style="border:1px solid var(--divider-color,#d1d5db);border-radius:12px;padding:12px;background:var(--card-background-color,#fff)">
          <div style="font-weight:700;margin-bottom:8px;">Wizard</div>
          <label style="display:block;margin-bottom:10px;">
            <div style="font-weight:600;margin-bottom:6px;">1) Area</div>
            <select id="sg-area" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#d1d5db);">
              <option value="">— Select area —</option>
              ${areas.map((a) => `<option value="${a.area_id}" ${a.area_id === this._selectedAreaId ? "selected" : ""}>${a.name || a.area_id}</option>`).join("")}
            </select>
          </label>

          <div style="font-weight:600;margin-bottom:6px;">2) Devices and entities</div>
          <div id="sg-tree" style="max-height:280px;overflow:auto;border:1px solid var(--divider-color,#d1d5db);border-radius:8px;padding:8px;">
            ${this._wizardError
              ? `<div style="color:#dc2626;">Failed to load HA registries: ${this._wizardError}</div>`
              : (!this._selectedAreaId
                ? `<div style="opacity:.7;">Pick an area to see the device tree.</div>`
                : (areaRows.length
                  ? areaRows.map(({ device, entities }) => {
                    const devName = device.name_by_user || device.name || device.id;
                    const devChecked = this._selectedDeviceIds.has(device.id);
                    return `
                      <div style="padding:6px 0;border-bottom:1px dashed var(--divider-color,#e5e7eb);">
                        <label style="display:flex;gap:8px;align-items:center;font-weight:600;">
                          <input type="checkbox" data-kind="device" data-device-id="${device.id}" ${devChecked ? "checked" : ""}>
                          <span>${devName}</span>
                        </label>
                        <div style="padding-left:26px;display:flex;flex-direction:column;gap:4px;margin-top:6px;">
                          ${entities.map((entity) => {
                            const checked = this._selectedEntityIds.has(entity.entity_id);
                            return `
                              <label style="display:flex;gap:8px;align-items:center;">
                                <input type="checkbox" data-kind="entity" data-device-id="${device.id}" data-entity-id="${entity.entity_id}" ${checked ? "checked" : ""}>
                                <span>${entity.name || entity.original_name || entity.entity_id}</span>
                                <code style="opacity:.65;">${entity.entity_id}</code>
                              </label>
                            `;
                          }).join("")}
                        </div>
                      </div>
                    `;
                  }).join("")
                  : `<div style="opacity:.7;">No devices found in this area.</div>`))}
          </div>

          <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <div style="opacity:.75;">Selected entities: <b>${selectedCount}</b></div>
            <button id="sg-generate" style="padding:8px 12px;border-radius:8px;border:1px solid #0284c7;background:#0ea5e9;color:#fff;font-weight:700;cursor:pointer;">3) Создать конфигурацию</button>
          </div>

          <div style="margin-top:10px;">
            <div style="font-weight:600;margin-bottom:6px;">Generated config (preview)</div>
            <textarea readonly style="width:100%;min-height:140px;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#d1d5db);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;">${JSON.stringify(generated, null, 2)}</textarea>
          </div>
        </div>
      </div>
    `;

    const areaSelect = this.querySelector("#sg-area");
    if (areaSelect) areaSelect.addEventListener("change", (ev) => this._onAreaChange(ev));

    this.querySelectorAll('input[data-kind="device"]').forEach((el) => {
      el.addEventListener("change", (ev) => {
        const deviceId = ev.target.getAttribute("data-device-id");
        const row = areaRows.find((r) => r.device.id === deviceId);
        this._toggleDevice(deviceId, ev.target.checked, row?.entities || []);
      });
    });

    this.querySelectorAll('input[data-kind="entity"]').forEach((el) => {
      el.addEventListener("change", (ev) => {
        const deviceId = ev.target.getAttribute("data-device-id");
        const entityId = ev.target.getAttribute("data-entity-id");
        const row = areaRows.find((r) => r.device.id === deviceId);
        this._toggleEntity(deviceId, entityId, ev.target.checked, row?.entities || []);
      });
    });

    const generateBtn = this.querySelector("#sg-generate");
    if (generateBtn) generateBtn.addEventListener("click", () => this._onCreateConfiguration());
  }
}

customElements.define("seagull-device-card-editor", SeagullRoomCardEditor);
customElements.define("seagull-device-card", SeagullRoomCard);

if (!window.__SEAGULL_DEVICE_CARD_ANNOUNCED__) {
  window.__SEAGULL_DEVICE_CARD_ANNOUNCED__ = true;
  console.info(
    `%c🐦 SEAGULL-DEVICE-CARD%c v${SEAGULL_DEVICE_CARD_VERSION} (%c${SEAGULL_DEVICE_CARD_COMMIT}%c) loaded`,
    "color:#fff;background:#f97316;padding:2px 6px;border-radius:4px;font-weight:700;",
    "color:inherit;",
    "color:#f59e0b;font-weight:700;",
    "color:inherit;"
  );
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "seagull-device-card",
  name: "Seagull Device Card",
  preview: true,
  description: `Device card with area/device/entity wizard (v${SEAGULL_DEVICE_CARD_VERSION}, ${SEAGULL_DEVICE_CARD_COMMIT})`,
});
