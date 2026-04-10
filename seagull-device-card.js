const SEAGULL_DEVICE_CARD_VERSION = "0.1.0";
const SEAGULL_DEVICE_CARD_COMMIT = "dev";

class SeagullDeviceCard extends HTMLElement {
  static getStubConfig() {
    return {
      type: "custom:seagull-device-card",
      background_color: "#e5e7eb",
      background_opacity: 1,
      border_radius: 16,
      border_width: 0,
      border_color: "#9ca3af",
      grid_columns: 4,
      grid_gap: 6,
      button_border_radius: 8,
      button_height: 36,
      background_icon_scale: 1.7,
      hide_unavailable: false,
      sort: true,
      badge: {
        type: "last_changed",
        color: [
          { delay: 60, value: "#22c55e" },
          { delay: 360, value: "#facc15" },
          { delay: 720, value: "#f97316" },
          { delay: 1440, value: "#ef4444" },
          { delay: 10080, value: "#9ca3af" },
        ],
      },
      wizard: {
        area_id: null,
        device_ids: [],
        entity_ids: [],
      },
      devices: [],
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
    if (!this._config) return;

    if (!this._card) {
      this._card = document.createElement("ha-card");
      this._inner = document.createElement("div");
      this._card.appendChild(this._inner);
      this.appendChild(this._card);
    }

    const radius = Math.max(0, Number(this._config.border_radius ?? 16) || 16);
    const borderWidth = Math.max(0, Number(this._config.border_width ?? 0) || 0);
    const borderColor = String(this._config.border_color ?? "#9ca3af");
    const bg = this._toRgba(String(this._config.background_color ?? "#e5e7eb"), this._clampOpacity(this._config.background_opacity ?? 1));

    this._card.style.borderRadius = `${radius}px`;
    this._card.style.border = `${borderWidth}px solid ${borderColor}`;
    this._card.style.background = "transparent";
    this._card.style.boxShadow = "none";
    this._card.style.overflow = "hidden";
    this._card.style.fontFamily = "var(--paper-font-common-base_-_font-family, Roboto, Noto, sans-serif)";

    this._inner.style.minHeight = "160px";
    this._inner.style.width = "100%";
    this._inner.style.boxSizing = "border-box";
    this._inner.style.padding = "12px";

    const devices = Array.isArray(this._config?.devices) ? this._config.devices : [];
    if (!devices.length) {
      this._inner.innerHTML = "";
      return;
    }

    const cols = Math.max(1, Number(this._config.grid_columns ?? 4) || 4);
    const gap = Math.max(0, Number(this._config.grid_gap ?? 6) || 6);
    const btnRadius = Math.max(0, Number(this._config.button_border_radius ?? 8) || 8);
    const btnHeight = Math.max(18, Number(this._config.button_height ?? 36) || 36);
    const bgIconScale = Math.max(0.8, Number(this._config.background_icon_scale ?? 1.7) || 1.7);
    const bgIconSize = Math.max(24, Math.round(btnHeight * bgIconScale));
    const isDark = !!this._hass?.themes?.darkMode;
    const primaryTextColor = isDark ? "#e5e7eb" : "var(--primary-text-color,#111827)";

    const renderEntityButton = (entityId) => {
      const st = this._hass?.states?.[entityId];
      const entityPicture = st?.attributes?.entity_picture;
      const icon = this._entityIconForState(entityId, st);
      const displayValue = this._formatEntityValue(entityId, st);
      const isUnavailable = String(st?.state ?? "") === "unavailable";
      const domain = String(entityId || "").split(".")[0];
      const hideText = domain === "light" || domain === "switch";
      const isActive = this._isEntityActiveState(entityId, st?.state);
      const span = this._estimateButtonSpan(displayValue, cols, hideText);
      const textSize = this._fitTextSize(displayValue, span, cols, gap);
      const iconFg = isActive
        ? ((domain === "light" || domain === "switch") ? "#f59e0b" : "#7c3aed")
        : "#6b7280";
      const bgIconOpacity = hideText ? 0.42 : 0.18;
      const badgeColor = this._badgeColorForEntity(st);
      const buttonBg = isUnavailable
        ? (isDark
          ? "repeating-linear-gradient(-45deg, rgba(100,116,139,0.45) 0 8px, rgba(71,85,105,0.65) 8px 16px)"
          : "repeating-linear-gradient(-45deg, rgba(148,163,184,0.35) 0 8px, rgba(203,213,225,0.55) 8px 16px)")
        : (isDark ? "#1f2937" : "#eeeeee");
      const html = `
        <button class="sg-device-btn" data-entity-id="${this._esc(entityId)}" style="position:relative;grid-column:span ${span};display:flex;align-items:center;justify-content:center;padding:5px 12px;border-radius:${btnRadius}px;border:none;background:${buttonBg};cursor:pointer;min-height:${btnHeight}px;overflow:hidden;font-family:inherit;">
          ${badgeColor ? `<span style="position:absolute;right:6px;top:6px;width:8px;height:8px;border-radius:999px;background:${this._esc(badgeColor)};z-index:2;"></span>` : ""}
          ${entityPicture
            ? `<img src="${this._esc(entityPicture)}" alt="" style="position:absolute;left:-2px;top:50%;transform:translateY(-50%);width:${bgIconSize}px;height:${bgIconSize}px;border-radius:999px;object-fit:cover;opacity:${bgIconOpacity};pointer-events:none;">`
            : `<ha-icon icon="${this._esc(icon)}" style="position:absolute;left:-2px;top:50%;transform:translateY(-50%);--mdc-icon-size:${bgIconSize}px;color:${iconFg};opacity:${bgIconOpacity};pointer-events:none;"></ha-icon>`}
          ${(hideText || isUnavailable)
            ? ``
            : `<span style="position:relative;z-index:1;display:block;max-width:100%;text-align:center;font-size:${textSize}px;color:${primaryTextColor};white-space:nowrap;overflow:hidden;text-overflow:clip;font-family:inherit;">${this._esc(displayValue)}</span>`}
        </button>
      `;
      return { span, html, entityId };
    };

    const sortEnabled = this._config?.sort !== false;
    const areaOrder = [];
    const areaMap = new Map();

    for (const device of devices) {
      const areaId = device?.area_id || "__unassigned__";
      const areaName = String(device?.area_name || (areaId === "__unassigned__" ? "Unassigned" : areaId));
      if (!areaMap.has(areaId)) {
        areaMap.set(areaId, { areaId, areaName, devices: [] });
        areaOrder.push(areaId);
      }
      areaMap.get(areaId).devices.push(device);
    }

    const areas = areaOrder.map((id) => areaMap.get(id));
    if (sortEnabled) {
      areas.sort((a, b) => String(a.areaName).localeCompare(String(b.areaName)));
      areas.forEach((a) => {
        a.devices.sort((d1, d2) => String(d1?.name || d1?.device_id || "").localeCompare(String(d2?.name || d2?.device_id || "")));
      });
    }

    const deviceBlocks = [];
    const globalSeen = new Set();

    for (const area of areas) {
      const areaDeviceBlocks = [];

      for (const device of area.devices) {
      const deviceName = String(device?.name || device?.device_id || "Device");
      const rawEntities = Array.isArray(device?.entities) ? device.entities : [];
      const buttons = rawEntities
        .map((e) => (typeof e === "string" ? e : e?.entity_id))
        .filter((id) => {
          if (!id) return false;
          if (!this._config?.hide_unavailable) return true;
          return String(this._hass?.states?.[id]?.state ?? "") !== "unavailable";
        })
        .filter((id) => id && !globalSeen.has(id))
        .map((id) => {
          globalSeen.add(id);
          return renderEntityButton(id);
        });
      const deviceBadgeColor = this._badgeColorForDevice(buttons.map((b) => b.entityId));

      const nameSpan = this._estimateDeviceNameSpan(deviceName, cols);
      const firstRowSlots = Math.max(0, cols - nameSpan);

      const packedRows = [];
      let idx = 0;

      const takeRow = (capacity) => {
        const row = [];
        let used = 0;
        while (idx < buttons.length) {
          const btn = buttons[idx];
          const btnSpan = Math.max(1, Math.min(cols, btn.span));
          if (used + btnSpan > capacity) break;
          row.push(btn);
          used += btnSpan;
          idx += 1;
        }
        return { row, used };
      };

      const first = takeRow(firstRowSlots);
      packedRows.push({ name: deviceName, nameSpan, ...first, capacity: firstRowSlots });

      while (idx < buttons.length) {
        const next = takeRow(cols);
        if (!next.row.length) {
          // safety: force progress even if span somehow > capacity
          next.row.push(buttons[idx]);
          next.used = Math.min(cols, Math.max(1, buttons[idx].span));
          idx += 1;
        }
        packedRows.push({ name: null, nameSpan: 0, ...next, capacity: cols });
      }

      const blockHtml = packedRows.map((r) => {
        const rowButtons = r.row.map((b) => b.html).join("");
        if (r.name) {
          const spacer = Math.max(0, cols - r.nameSpan - r.used);
          return `
            <div style="display:grid;grid-template-columns:repeat(${cols}, minmax(0,1fr));gap:${gap}px;align-items:stretch;">
              <button class="sg-device-title" data-device-id="${this._esc(device.device_id)}" style="grid-column:span ${r.nameSpan};display:flex;align-items:center;padding-left:6px;font-weight:700;font-size:15px;color:${primaryTextColor};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:none;border:none;cursor:pointer;font-family:inherit;text-align:left;">
                ${this._esc(r.name)}
              </button>
              ${spacer > 0 ? `<div style="grid-column:span ${spacer};"></div>` : ""}
              ${rowButtons}
            </div>
          `;
        }

        const spacer = Math.max(0, cols - r.used);
        return `
          <div style="display:grid;grid-template-columns:repeat(${cols}, minmax(0,1fr));gap:${gap}px;align-items:stretch;">
            ${spacer > 0 ? `<div style="grid-column:span ${spacer};"></div>` : ""}
            ${rowButtons}
          </div>
        `;
      }).join(`<div style="height:${gap}px;"></div>`);

      areaDeviceBlocks.push(`
        <div style="position:relative;display:flex;flex-direction:column;background:${isDark ? "rgba(51,65,85,0.45)" : "rgba(148,163,184,0.04)"};border-radius:10px;padding:8px;">
          ${deviceBadgeColor ? `<span style="position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:999px;background:${this._esc(deviceBadgeColor)};z-index:2;"></span>` : ""}
          ${blockHtml}
        </div>
      `);
    }

      const areaHeader = `<div style="font-size:12px;font-weight:700;opacity:.95;color:${primaryTextColor};padding:3px 8px;border-radius:8px;background:${isDark ? "rgba(30,41,59,0.75)" : "rgba(148,163,184,0.20)"};">${this._esc(area.areaName)}</div>`;

      deviceBlocks.push(`
        <div style="display:flex;flex-direction:column;gap:${gap}px;">
          ${areaHeader}
          ${areaDeviceBlocks.join("")}
        </div>
      `);
    }

    this._inner.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:${gap}px;">
        ${deviceBlocks.join("")}
      </div>
    `;

    this._inner.querySelectorAll(".sg-device-btn").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        const entityId = ev.currentTarget.getAttribute("data-entity-id");
        if (!entityId) return;
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId },
          })
        );
      });
    });

    this._inner.querySelectorAll(".sg-device-title").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const deviceId = ev.currentTarget.getAttribute("data-device-id");
        if (!deviceId) return;
        // Preferred path for Device Info popup in HA
        this.dispatchEvent(
          new CustomEvent("hass-show-dialog", {
            bubbles: true,
            composed: true,
            detail: {
              dialogTag: "ha-device-info-dialog",
              dialogParams: { deviceId },
            },
          })
        );

        // Extra compatibility path used by some HA builds
        this.dispatchEvent(
          new CustomEvent("show-dialog", {
            bubbles: true,
            composed: true,
            detail: {
              dialogTag: "ha-device-info-dialog",
              dialogParams: { deviceId },
            },
          })
        );

        // Compatibility fallback
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { deviceId },
          })
        );
      });
    });
  }

  _estimateButtonSpan(value, cols, hideText = false) {
    if (hideText) return 1;
    const text = String(value ?? "");
    const len = text.length;
    if (len > 28) return Math.min(cols, 3);
    if (len > 14) return Math.min(cols, 2);
    return 1;
  }

  _estimateDeviceNameSpan(name, cols) {
    if (cols <= 1) return 1;
    const len = String(name ?? "").length;
    if (len > 24) return Math.min(cols - 1, 3);
    if (len > 12) return Math.min(cols - 1, 2);
    return 1;
  }

  _fitTextSize(value, span, cols, gap) {
    const text = String(value ?? "");
    const base = 14;
    const min = base / 1.5;
    const cardPadding = 24;
    const estimatedColWidth = 96;
    const width = Math.max(40, span * estimatedColWidth + (span - 1) * gap - cardPadding);
    const estAtBase = text.length * base * 0.56;
    if (estAtBase <= width) return base;
    const ratio = width / Math.max(1, estAtBase);
    const fitted = Math.max(min, Math.floor(base * ratio * 10) / 10);
    return Math.min(base, fitted);
  }

  _isToggleEntity(entityId, stateObj) {
    const domain = String(entityId || "").split(".")[0];
    const toggleDomains = new Set([
      "light",
      "switch",
      "fan",
      "input_boolean",
      "automation",
      "media_player",
      "cover",
      "lock",
      "humidifier",
      "vacuum",
    ]);
    if (toggleDomains.has(domain)) return true;
    return !!stateObj?.attributes?.assumed_state;
  }

  _getEntityConfig(entityId) {
    const devices = Array.isArray(this._config?.devices) ? this._config.devices : [];
    for (const device of devices) {
      const entities = Array.isArray(device?.entities) ? device.entities : [];
      for (const entity of entities) {
        if (typeof entity === "string") {
          if (entity === entityId) return null;
          continue;
        }
        if (entity?.entity_id === entityId) return entity;
      }
    }
    return null;
  }

  _formatEntityValue(entityId, stateObj) {
    const state = stateObj?.state ?? "unknown";
    const attrs = stateObj?.attributes || {};
    const domain = String(entityId || "").split(".")[0];
    const unit = attrs.unit_of_measurement;
    const entityCfg = this._getEntityConfig(entityId);
    const unitAllowed = entityCfg?.unit_of_measurement !== false;

    if (domain === "binary_sensor") {
      const mapped = this._mapBinarySensorState(state, attrs.device_class);
      return mapped;
    }

    if (!unit || !unitAllowed) return String(state);
    return `${state}${unit}`;
  }

  _mapBinarySensorState(state, deviceClass) {
    const st = String(state ?? "").toLowerCase();
    const dc = String(deviceClass ?? "").toLowerCase();
    const on = st === "on";

    const map = {
      window: on ? "Open" : "Closed",
      door: on ? "Open" : "Closed",
      opening: on ? "Open" : "Closed",
      garage_door: on ? "Open" : "Closed",
      lock: on ? "Unlocked" : "Locked",
      motion: on ? "Motion" : "Clear",
      occupancy: on ? "Occupied" : "Clear",
      presence: on ? "Home" : "Away",
      connectivity: on ? "Connected" : "Disconnected",
      plug: on ? "Plugged" : "Unplugged",
      power: on ? "Power issue" : "Normal",
      problem: on ? "Problem" : "OK",
      smoke: on ? "Smoke" : "Clear",
      moisture: on ? "Wet" : "Dry",
      battery: on ? "Low" : "Normal",
      battery_charging: on ? "Charging" : "Not charging",
      sound: on ? "Detected" : "Quiet",
      vibration: on ? "Vibration" : "Still",
    };

    if (map[dc]) return map[dc];
    if (st === "on") return "On";
    if (st === "off") return "Off";
    return String(state ?? "unknown");
  }

  _isEntityActiveState(entityId, state) {
    const domain = String(entityId || "").split(".")[0];
    const st = String(state ?? "");
    if (domain === "lock") return st === "unlocked";
    if (domain === "media_player") return st === "playing";
    if (domain === "cover") return st === "open" || st === "opening";
    if (domain === "vacuum") return st === "cleaning";
    return st === "on";
  }

  _badgeColorForEntity(stateObj) {
    const elapsedMin = this._badgeAgeMinutesForState(stateObj);
    if (elapsedMin == null) return null;
    return this._badgeColorFromElapsed(elapsedMin);
  }

  _badgeColorForDevice(entityIds) {
    if (!Array.isArray(entityIds) || !entityIds.length) return null;
    const ages = entityIds
      .map((entityId) => this._badgeAgeMinutesForState(this._hass?.states?.[entityId]))
      .filter((v) => Number.isFinite(v));

    if (!ages.length) return null;
    const elapsedMin = Math.min(...ages);
    return this._badgeColorFromElapsed(elapsedMin);
  }

  _badgeAgeMinutesForState(stateObj) {
    const badge = this._config?.badge;
    if (!badge || typeof badge !== "object") return null;
    const type = badge.type === "last_updated" ? "last_updated" : "last_changed";
    const ts = stateObj?.[type];
    if (!ts) return null;

    const parsed = Date.parse(ts);
    if (!Number.isFinite(parsed)) return null;

    const elapsedMin = (Date.now() - parsed) / 60000;
    if (!Number.isFinite(elapsedMin) || elapsedMin < 0) return null;
    return elapsedMin;
  }

  _badgeColorFromElapsed(elapsedMin) {
    if (!Number.isFinite(elapsedMin) || elapsedMin < 0) return null;

    const badge = this._config?.badge;

    const defaultStops = [
      { delay: 60, value: "#22c55e" },
      { delay: 360, value: "#facc15" },
      { delay: 720, value: "#f97316" },
      { delay: 1440, value: "#ef4444" },
      { delay: 10080, value: "#9ca3af" },
    ];

    const stopsRaw = Array.isArray(badge.color) ? badge.color : defaultStops;
    const stops = stopsRaw
      .map((s) => ({ delay: Number(s?.delay), value: s?.value }))
      .filter((s) => Number.isFinite(s.delay) && s.delay >= 0 && typeof s.value === "string" && s.value)
      .sort((a, b) => a.delay - b.delay);

    if (!stops.length) return null;

    let color = null;
    for (const stop of stops) {
      if (elapsedMin >= stop.delay) color = stop.value;
      else break;
    }

    return color;
  }

  _esc(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  _entityIconForState(entityId, stateObj) {
    const attrIcon = stateObj?.attributes?.icon;
    if (attrIcon) return attrIcon;

    const domain = String(entityId || "").split(".")[0];
    const state = String(stateObj?.state ?? "");
    const dc = String(stateObj?.attributes?.device_class ?? "").toLowerCase();

    if (domain === "binary_sensor") {
      const map = {
        battery: state === "on" ? "mdi:battery-alert" : "mdi:battery",
        battery_charging: state === "on" ? "mdi:battery-charging" : "mdi:battery",
        cold: state === "on" ? "mdi:snowflake-alert" : "mdi:snowflake",
        connectivity: state === "on" ? "mdi:wifi" : "mdi:wifi-off",
        door: state === "on" ? "mdi:door-open" : "mdi:door-closed",
        garage_door: state === "on" ? "mdi:garage-open" : "mdi:garage",
        gas: state === "on" ? "mdi:gas-cylinder" : "mdi:shield-check",
        heat: state === "on" ? "mdi:fire" : "mdi:fire-off",
        light: state === "on" ? "mdi:brightness-7" : "mdi:brightness-5",
        lock: state === "on" ? "mdi:lock-open-variant" : "mdi:lock",
        moisture: state === "on" ? "mdi:water-alert" : "mdi:water-check",
        motion: state === "on" ? "mdi:motion-sensor" : "mdi:motion-sensor-off",
        occupancy: state === "on" ? "mdi:home-account" : "mdi:home-outline",
        opening: state === "on" ? "mdi:square-outline" : "mdi:square",
        plug: state === "on" ? "mdi:power-plug" : "mdi:power-plug-off",
        power: state === "on" ? "mdi:flash-alert" : "mdi:flash",
        presence: state === "on" ? "mdi:account" : "mdi:account-off",
        problem: state === "on" ? "mdi:alert-circle" : "mdi:check-circle",
        running: state === "on" ? "mdi:run-fast" : "mdi:walk",
        safety: state === "on" ? "mdi:alert" : "mdi:shield-check",
        smoke: state === "on" ? "mdi:smoke-detector-alert" : "mdi:smoke-detector",
        sound: state === "on" ? "mdi:music-note" : "mdi:music-note-off",
        vibration: state === "on" ? "mdi:vibrate" : "mdi:crop-portrait",
        window: state === "on" ? "mdi:window-open" : "mdi:window-closed",
      };
      return map[dc] || (state === "on" ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline");
    }

    if (domain === "sensor") {
      const map = {
        apparent_power: "mdi:flash",
        aqi: "mdi:air-filter",
        atmospheric_pressure: "mdi:gauge",
        battery: "mdi:battery",
        carbon_dioxide: "mdi:molecule-co2",
        carbon_monoxide: "mdi:molecule-co",
        current: "mdi:current-ac",
        data_rate: "mdi:speedometer",
        data_size: "mdi:database",
        distance: "mdi:map-marker-distance",
        duration: "mdi:timer-outline",
        energy: "mdi:lightning-bolt",
        frequency: "mdi:sine-wave",
        gas: "mdi:meter-gas",
        humidity: "mdi:water-percent",
        illuminance: "mdi:brightness-5",
        irradiance: "mdi:white-balance-sunny",
        moisture: "mdi:water-percent",
        monetary: "mdi:currency-eur",
        nitrogen_dioxide: "mdi:molecule",
        nitrogen_monoxide: "mdi:molecule",
        nitrous_oxide: "mdi:molecule",
        ozone: "mdi:molecule",
        pm1: "mdi:blur",
        pm10: "mdi:blur",
        pm25: "mdi:blur",
        power: "mdi:flash",
        power_factor: "mdi:angle-acute",
        precipitation: "mdi:weather-rainy",
        precipitation_intensity: "mdi:weather-pouring",
        pressure: "mdi:gauge",
        reactive_power: "mdi:flash-outline",
        signal_strength: "mdi:wifi",
        sound_pressure: "mdi:ear-hearing",
        speed: "mdi:speedometer",
        sulphur_dioxide: "mdi:molecule",
        temperature: "mdi:thermometer",
        timestamp: "mdi:clock-outline",
        volatile_organic_compounds: "mdi:cloud",
        voltage: "mdi:sine-wave",
        volume: "mdi:car-coolant-level",
        water: "mdi:water",
        weight: "mdi:weight",
        wind_speed: "mdi:weather-windy",
      };
      return map[dc] || "mdi:meter-electric";
    }

    if (domain === "light") return state === "on" ? "mdi:lightbulb" : "mdi:lightbulb-off";
    if (domain === "switch") return "mdi:toggle-switch-variant";
    if (domain === "climate") {
      if (state === "heat") return "mdi:fire";
      if (state === "cool") return "mdi:snowflake";
      if (state === "dry") return "mdi:water-percent";
      if (state === "fan_only") return "mdi:fan";
      return "mdi:thermostat";
    }
    if (domain === "lock") return state === "unlocked" ? "mdi:lock-open-variant" : "mdi:lock";
    if (domain === "cover") {
      if (dc === "garage") return state === "open" ? "mdi:garage-open" : "mdi:garage";
      if (dc === "gate") return state === "open" ? "mdi:gate-open" : "mdi:gate";
      if (dc === "door") return state === "open" ? "mdi:door-open" : "mdi:door-closed";
      if (dc === "curtain") return state === "open" ? "mdi:curtains" : "mdi:curtains-closed";
      if (dc === "blind" || dc === "shade" || dc === "shutter") return state === "open" ? "mdi:blinds-open" : "mdi:blinds";
      if (dc === "window") return state === "open" ? "mdi:window-open" : "mdi:window-closed";
      return "mdi:window-shutter";
    }
    if (domain === "media_player") return "mdi:play-circle";
    if (domain === "alarm_control_panel") return state === "disarmed" ? "mdi:shield-off" : "mdi:shield-home";
    if (domain === "person") return state === "home" ? "mdi:account" : "mdi:account-arrow-right";
    if (domain === "device_tracker") return state === "home" ? "mdi:cellphone-marker" : "mdi:cellphone-off";
    if (domain === "sun") return state === "above_horizon" ? "mdi:white-balance-sunny" : "mdi:weather-night";
    if (domain === "weather") return "mdi:weather-partly-cloudy";

    return "mdi:help-circle-outline";
  }

  _clampOpacity(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 1;
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

class SeagullDeviceCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config || { type: "custom:seagull-device-card" };
    this._selectedAreaId = "";
    this._selectedDeviceIds = new Set(this._config?.wizard?.device_ids || []);
    this._selectedEntityIds = new Set(this._config?.wizard?.entity_ids || []);
    this._expandedDeviceIds = this._expandedDeviceIds || new Set();
    this._expandedAreaIds = this._expandedAreaIds || new Set();
    this._selectionHydrated = false;
    this._wizardLoaded = this._wizardLoaded || false;
    this._render();
    this._ensureWizardData();
  }

  set hass(hass) {
    this._hass = hass;
    this._ensureWizardData();
  }

  async _ensureWizardData() {
    if (!this._hass?.connection || this._wizardLoaded) return;
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
      this._hydrateSelectionFromConfig();
      this._render();
    } catch (error) {
      this._wizardError = error?.message || String(error);
      this._render();
    }
  }

  _areaRows(areaId = null) {
    const entitiesByDevice = new Map();
    for (const entity of this._entities || []) {
      if (!entity || entity.disabled_by || entity.hidden_by) continue;
      if (!entity.device_id) continue;
      if (!entitiesByDevice.has(entity.device_id)) entitiesByDevice.set(entity.device_id, []);
      entitiesByDevice.get(entity.device_id).push(entity);
    }

    return (this._devices || [])
      .filter((d) => d && (areaId == null || d.area_id === areaId))
      .map((device) => ({
        device,
        entities: (entitiesByDevice.get(device.id) || []).sort((a, b) => String(a.entity_id).localeCompare(String(b.entity_id))),
      }))
      .sort((a, b) => String(a.device?.name_by_user || a.device?.name || "").localeCompare(String(b.device?.name_by_user || b.device?.name || "")));
  }

  _areaGroups() {
    const areas = Array.isArray(this._areas) ? this._areas : [];
    const areaMap = new Map(areas.map((a) => [a.area_id, a.name || a.area_id]));
    const rows = this._areaRows(null);
    const byArea = new Map();

    rows.forEach((row) => {
      const key = row.device?.area_id || "__unassigned__";
      if (!byArea.has(key)) byArea.set(key, []);
      byArea.get(key).push(row);
    });

    const groups = [...byArea.entries()].map(([areaId, areaRows]) => ({
      areaId,
      areaName: areaId === "__unassigned__" ? "Unassigned" : (areaMap.get(areaId) || areaId),
      rows: areaRows,
    }));

    groups.sort((a, b) => String(a.areaName).localeCompare(String(b.areaName)));
    return groups;
  }

  _hydrateSelectionFromConfig() {
    if (this._selectionHydrated) return;
    this._selectionHydrated = true;

    const devices = Array.isArray(this._config?.devices) ? this._config.devices : [];
    devices.forEach((dev) => {
      if (!dev?.device_id) return;
      if (this._isDisabled(dev)) return;
      this._selectedDeviceIds.add(dev.device_id);
      (Array.isArray(dev.entities) ? dev.entities : []).forEach((e) => {
        const id = this._entityId(e);
        if (id && !this._isDisabled(e)) this._selectedEntityIds.add(id);
      });
    });
  }

  _emitConfigChanged(config) {
    if (!config) return;
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config },
    }));
  }

  _selectedDevicesFromWizard() {
    const rows = this._areaRows(null);
    const areaNameById = new Map((this._areas || []).map((a) => [a.area_id, a.name || a.area_id]));
    return rows
      .map(({ device, entities }) => ({
        device_id: device.id,
        name: device.name_by_user || device.name || device.id,
        area_id: device.area_id || null,
        area_name: device.area_id ? (areaNameById.get(device.area_id) || device.area_id) : "Unassigned",
        entities: entities
          .filter((e) => this._selectedEntityIds.has(e.entity_id))
          .map((e) => e.entity_id),
      }))
      .filter((d) => d.entities.length > 0);
  }

  _entityId(entity) {
    return typeof entity === "string" ? entity : entity?.entity_id;
  }

  _hasEntityCustomConfig(entity) {
    if (!entity || typeof entity !== "object" || Array.isArray(entity)) return false;
    return Object.keys(entity).some((k) => k !== "entity_id" && k !== "disable");
  }

  _hasDeviceCustomConfig(device) {
    if (!device || typeof device !== "object" || Array.isArray(device)) return false;
    return Object.keys(device).some((k) => !["device_id", "entities", "name", "disable", "area_id", "area_name"].includes(k));
  }

  _isDisabled(item) {
    return !!(item && typeof item === "object" && !Array.isArray(item) && item.disable === true);
  }

  _getExistingDevice(deviceId) {
    return (Array.isArray(this._config?.devices) ? this._config.devices : []).find((d) => d?.device_id === deviceId) || null;
  }

  _mergeDevices(existingDevices, newDevices) {
    const map = new Map();

    for (const dev of Array.isArray(existingDevices) ? existingDevices : []) {
      if (!dev || !dev.device_id) continue;
      const entities = Array.isArray(dev.entities) ? dev.entities : [];
      const entityMap = new Map();
      entities.forEach((e) => {
        const entityId = typeof e === "string" ? e : e?.entity_id;
        if (!entityId) return;
        entityMap.set(entityId, typeof e === "string" ? { entity_id: entityId, name: entityId } : e);
      });
      map.set(dev.device_id, {
        device_id: dev.device_id,
        name: dev.name || dev.device_id,
        entities: entityMap,
      });
    }

    for (const dev of Array.isArray(newDevices) ? newDevices : []) {
      if (!dev || !dev.device_id) continue;
      if (!map.has(dev.device_id)) {
        map.set(dev.device_id, {
          device_id: dev.device_id,
          name: dev.name || dev.device_id,
          entities: new Map(),
        });
      }
      const existing = map.get(dev.device_id);
      (Array.isArray(dev.entities) ? dev.entities : []).forEach((e) => {
        const entityId = typeof e === "string" ? e : e?.entity_id;
        if (!entityId) return;
        existing.entities.set(entityId, typeof e === "string" ? { entity_id: entityId, name: entityId } : e);
      });
    }

    return [...map.values()]
      .map((dev) => ({
        device_id: dev.device_id,
        name: dev.name,
        entities: [...dev.entities.values()].sort((a, b) => String(a.entity_id).localeCompare(String(b.entity_id))),
      }))
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  }

  _onAreaChange(_value) {}

  _isAreaExpanded(areaId) {
    return this._expandedAreaIds?.has(areaId);
  }

  _toggleAreaExpanded(areaId) {
    if (!this._expandedAreaIds) this._expandedAreaIds = new Set();
    if (this._expandedAreaIds.has(areaId)) this._expandedAreaIds.delete(areaId);
    else this._expandedAreaIds.add(areaId);
    this._render();
  }

  _toggleArea(areaId, checked, areaRows) {
    (areaRows || []).forEach(({ device, entities }) => {
      if (checked) this._selectedDeviceIds.add(device.id);
      else this._selectedDeviceIds.delete(device.id);
      const isNewDevice = !this._getExistingDevice(device.id);
      (entities || []).forEach((entity) => {
        if (checked) {
          if (!isNewDevice || this._isDefaultIncludedEntity(entity)) this._selectedEntityIds.add(entity.entity_id);
        } else {
          this._selectedEntityIds.delete(entity.entity_id);
        }
      });
    });
    this._syncConfigFromSelection();
    this._render();
  }

  _isDeviceExpanded(deviceId) {
    return this._expandedDeviceIds?.has(deviceId);
  }

  _toggleDeviceExpanded(deviceId) {
    if (!this._expandedDeviceIds) this._expandedDeviceIds = new Set();
    if (this._expandedDeviceIds.has(deviceId)) this._expandedDeviceIds.delete(deviceId);
    else this._expandedDeviceIds.add(deviceId);
    this._render();
  }

  _toggleDevice(deviceId, checked, entities) {
    if (checked) this._selectedDeviceIds.add(deviceId);
    else this._selectedDeviceIds.delete(deviceId);

    const isNewDevice = !this._getExistingDevice(deviceId);

    for (const entity of entities || []) {
      const entityId = entity.entity_id;
      if (checked) {
        if (!isNewDevice || this._isDefaultIncludedEntity(entity)) this._selectedEntityIds.add(entityId);
      } else {
        this._selectedEntityIds.delete(entityId);
      }
    }

    this._syncConfigFromSelection();
    this._render();
  }

  _toggleEntity(deviceId, entityId, checked, deviceEntities) {
    if (checked) this._selectedEntityIds.add(entityId);
    else this._selectedEntityIds.delete(entityId);

    const allSelected = (deviceEntities || []).every((e) => this._selectedEntityIds.has(e.entity_id));
    if (allSelected && (deviceEntities || []).length) {
      this._selectedDeviceIds.add(deviceId);
    } else {
      this._selectedDeviceIds.delete(deviceId);
    }

    this._syncConfigFromSelection();
    this._render();
  }

  _selectAllInArea() {
    const rows = this._areaRows(null);
    for (const { device, entities } of rows) {
      this._selectedDeviceIds.add(device.id);
      const isNewDevice = !this._getExistingDevice(device.id);
      for (const entity of entities) {
        if (!isNewDevice || this._isDefaultIncludedEntity(entity)) this._selectedEntityIds.add(entity.entity_id);
      }
    }
    this._syncConfigFromSelection();
    this._render();
  }

  _clearSelection() {
    const rows = this._areaRows(null);
    for (const { device, entities } of rows) {
      this._selectedDeviceIds.delete(device.id);
      for (const entity of entities) {
        this._selectedEntityIds.delete(entity.entity_id);
      }
    }
    this._syncConfigFromSelection();
    this._render();
  }

  _isDefaultIncludedEntity(entity) {
    const entityId = String(entity?.entity_id || "").toLowerCase();
    const name = String(entity?.name || entity?.original_name || "").toLowerCase();
    const category = String(entity?.entity_category || "").toLowerCase();
    const domain = entityId.split(".")[0] || "";

    const excludedPatterns = ["identify", "firmware", "battery_voltage", "battery voltage"];
    if (excludedPatterns.some((p) => entityId.includes(p) || name.includes(p))) return false;
    if (category === "diagnostic") {
      const dc = String(entity?.device_class || "").toLowerCase();
      const allowDiagnostic = ["battery", "temperature"].some((k) => entityId.includes(k) || name.includes(k) || dc.includes(k));
      if (!allowDiagnostic) return false;
    }
    if (category === "config" || category === "configuration") return false;

    const sensorDomains = new Set(["sensor", "binary_sensor"]);
    const controlDomains = new Set(["switch", "light", "fan", "cover", "climate", "lock", "button", "select", "number", "input_boolean"]);
    return sensorDomains.has(domain) || controlDomains.has(domain);
  }

  _syncConfigFromSelection() {
    const currentRows = this._areaRows(null);
    const currentAreaDeviceIds = new Set(currentRows.map((r) => r.device.id));
    const selectedFromWizard = this._selectedDevicesFromWizard();
    const selectedMap = new Map(selectedFromWizard.map((d) => [d.device_id, d]));
    const existing = Array.isArray(this._config?.devices) ? this._config.devices : [];

    const result = [];

    for (const dev of existing) {
      if (!dev || !dev.device_id) continue;
      const isInCurrentArea = currentAreaDeviceIds.has(dev.device_id);
      if (!isInCurrentArea) {
        result.push(dev);
        continue;
      }

      const selectedDev = selectedMap.get(dev.device_id);
      const hasDeviceCustom = this._hasDeviceCustomConfig(dev);
      const existingEntities = Array.isArray(dev.entities) ? dev.entities : [];
      const existingMap = new Map(existingEntities.map((e) => [this._entityId(e), e]).filter(([id]) => !!id));
      const selectedEntityIds = new Set((selectedDev?.entities || []).map((e) => this._entityId(e)).filter(Boolean));

      const mergedEntities = [];
      for (const [id, entityCfg] of existingMap.entries()) {
        const wasSelected = selectedEntityIds.has(id);
        const hasEntityCustom = this._hasEntityCustomConfig(entityCfg);

        if (wasSelected) {
          if (typeof entityCfg === "object" && entityCfg) {
            const { disable, ...rest } = entityCfg;
            mergedEntities.push(Object.keys(rest).length === 1 && rest.entity_id ? id : rest);
          } else {
            mergedEntities.push(id);
          }
          selectedEntityIds.delete(id);
          continue;
        }

        if (hasEntityCustom) {
          const base = (typeof entityCfg === "object" && entityCfg) ? { ...entityCfg } : { entity_id: id };
          base.disable = true;
          mergedEntities.push(base);
        }
      }
      for (const id of selectedEntityIds) mergedEntities.push(id);

      const shouldBeEnabled = !!selectedDev;
      const hasConfiguredEntities = mergedEntities.some((e) => this._hasEntityCustomConfig(e));

      if (!shouldBeEnabled && !hasDeviceCustom && !hasConfiguredEntities) {
        // clean device removed from wizard => drop fully
        selectedMap.delete(dev.device_id);
        continue;
      }

      const outDev = {
        device_id: dev.device_id,
        name: selectedDev?.name || dev.name || dev.device_id,
        area_id: selectedDev?.area_id ?? dev.area_id ?? null,
        area_name: selectedDev?.area_name || dev.area_name || (selectedDev?.area_id || dev.area_id || "Unassigned"),
        entities: mergedEntities.sort((a, b) => String(this._entityId(a)).localeCompare(String(this._entityId(b)))),
      };

      Object.keys(dev).forEach((k) => {
        if (k === "device_id" || k === "entities" || k === "name") return;
        if (k === "disable") return;
        outDev[k] = dev[k];
      });

      if (!shouldBeEnabled && (hasDeviceCustom || hasConfiguredEntities)) {
        outDev.disable = true;
      }

      result.push(outDev);
      selectedMap.delete(dev.device_id);
    }

    for (const [deviceId, selectedDev] of selectedMap.entries()) {
      const entities = (selectedDev.entities || []).map((e) => this._entityId(e)).filter(Boolean).sort();
      if (!entities.length) continue;
      result.push({
        device_id: deviceId,
        name: selectedDev.name || deviceId,
        area_id: selectedDev.area_id ?? null,
        area_name: selectedDev.area_name || (selectedDev.area_id || "Unassigned"),
        entities,
      });
    }

    const config = {
      ...this._config,
      type: "custom:seagull-device-card",
      hide_unavailable: !!this._config?.hide_unavailable,
      wizard: {
        area_id: this._selectedAreaId || null,
        device_ids: [...this._selectedDeviceIds],
        entity_ids: [...this._selectedEntityIds],
      },
      devices: result,
    };

    this._emitConfigChanged(config);
  }

  _toggleHideUnavailable(checked) {
    const config = {
      ...this._config,
      type: "custom:seagull-device-card",
      hide_unavailable: !!checked,
    };
    this._emitConfigChanged(config);
    this._render();
  }

  _esc(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  _render() {
    const areaGroups = this._areaGroups();
    const prevTreeScrollTop = this.querySelector("#sg-tree")?.scrollTop ?? 0;
    const selectedUnavailableCount = [...(this._selectedEntityIds || [])]
      .filter((entityId) => String(this._hass?.states?.[entityId]?.state ?? "") === "unavailable")
      .length;

    this.innerHTML = `
      <div style="padding:12px 0; font-size:13px; line-height:1.4;">
        <div style="margin:0 0 12px 0;background:var(--card-background-color,#f3f4f6);border-radius:9999px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--divider-color,#d1d5db);">
          <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Seagull Device Card</div>
          <div style="background:#7c3aed;color:#fff;border-radius:9999px;padding:2px 8px;font-size:12px;font-weight:700;line-height:1.6;">v${SEAGULL_DEVICE_CARD_VERSION}</div>
        </div>

        <div style="border:1px solid var(--divider-color,#d1d5db);border-radius:12px;padding:12px;background:var(--card-background-color,#fff)">
          <div id="sg-tree" style="max-height:320px;overflow:auto;border:1px solid var(--divider-color,#d1d5db);border-radius:8px;padding:8px;">
            ${this._wizardError
              ? `<div style="color:#dc2626;">Failed to load HA registries: ${this._wizardError}</div>`
              : (!areaGroups.length
                ? `<div style="opacity:.7;">Нет доступных устройств.</div>`
                : areaGroups.map(({ areaId, areaName, rows }) => {
                    const isAreaExpanded = this._isAreaExpanded(areaId);
                    const allAreaEntities = rows.flatMap((r) => r.entities || []);
                    const selectedAreaEntities = allAreaEntities.filter((e) => this._selectedEntityIds.has(e.entity_id)).length;
                    const areaDeviceIds = rows.map((r) => r.device.id);
                    const selectedAreaDevices = areaDeviceIds.filter((id) => this._selectedDeviceIds.has(id)).length;
                    return `
                      <div style="padding:6px 0;border-bottom:1px solid var(--divider-color,#e5e7eb);">
                        <div style="display:flex;gap:8px;align-items:center;font-weight:700;">
                          <button type="button" data-kind="area-expand" data-area-id="${areaId}" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;font-size:22px;line-height:1;color:var(--primary-text-color,#111827);padding:0;display:inline-flex;align-items:center;justify-content:center;">${isAreaExpanded ? "▾" : "▸"}</button>
                          <input type="checkbox" data-kind="area" data-area-id="${areaId}" data-selected="${selectedAreaEntities}" data-total="${allAreaEntities.length}" ${selectedAreaEntities > 0 && selectedAreaEntities === allAreaEntities.length ? "checked" : ""}>
                          <span>${this._esc(areaName)}</span>
                          <span style="opacity:.6;font-weight:500;">(${selectedAreaDevices}/${rows.length} devices)</span>
                        </div>
                        ${isAreaExpanded
                          ? rows.map(({ device, entities }) => {
                    const devName = device.name_by_user || device.name || device.id;
                    const devChecked = this._selectedDeviceIds.has(device.id);
                    const selectedCount = entities.filter((e) => this._selectedEntityIds.has(e.entity_id)).length;
                    const isExpanded = this._isDeviceExpanded(device.id);
                    return `
                      <div style="padding:6px 0 6px 24px;border-bottom:1px dashed var(--divider-color,#e5e7eb);">
                        <div style="display:flex;gap:8px;align-items:center;font-weight:700;">
                          <button type="button" data-kind="expand" data-device-id="${device.id}" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;font-size:22px;line-height:1;color:var(--primary-text-color,#111827);padding:0;display:inline-flex;align-items:center;justify-content:center;">${isExpanded ? "▾" : "▸"}</button>
                          <input type="checkbox" data-kind="device" data-device-id="${device.id}" data-selected="${selectedCount}" data-total="${entities.length}" ${devChecked ? "checked" : ""}>
                          <span>${devName}</span>
                          <span style="opacity:.6;font-weight:500;">(${selectedCount}/${entities.length})</span>
                        </div>
                        ${isExpanded
                          ? `<div style="padding:8px 0 0 30px;display:flex;flex-direction:column;gap:4px;">
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
                            </div>`
                          : ""}
                      </div>
                    `;
                  }).join("")
                          : ""}
                      </div>
                    `;
                  }).join(""))}
          </div>

          <div style="margin-top:10px;opacity:.8;">
            Выбрано: <b>${this._selectedEntityIds?.size || 0}</b> сущностей, <b>${this._selectedDeviceIds?.size || 0}</b> устройств, <b>${areaGroups.filter((g) => g.rows.some((r) => this._selectedDeviceIds.has(r.device.id))).length}</b> area, <b>${selectedUnavailableCount}</b> unavailable
          </div>

          <label style="margin-top:8px;display:flex;align-items:center;gap:8px;opacity:.9;">
            <input id="sg-hide-unavailable" type="checkbox" ${this._config?.hide_unavailable ? "checked" : ""}>
            <span>Hide unavailable entities</span>
          </label>

        </div>
      </div>
    `;

    this.querySelectorAll('button[data-kind="area-expand"]').forEach((el) => {
      el.addEventListener("click", (ev) => {
        const areaId = ev.currentTarget.getAttribute("data-area-id");
        this._toggleAreaExpanded(areaId);
      });
    });

    this.querySelectorAll('input[data-kind="area"]').forEach((el) => {
      const selected = Number(el.getAttribute("data-selected") || 0);
      const total = Number(el.getAttribute("data-total") || 0);
      el.indeterminate = selected > 0 && selected < total;
      el.addEventListener("change", (ev) => {
        const areaId = ev.target.getAttribute("data-area-id");
        const group = areaGroups.find((g) => String(g.areaId) === String(areaId));
        this._toggleArea(areaId, ev.target.checked, group?.rows || []);
      });
    });

    this.querySelectorAll('button[data-kind="expand"]').forEach((el) => {
      el.addEventListener("click", (ev) => {
        const deviceId = ev.currentTarget.getAttribute("data-device-id");
        this._toggleDeviceExpanded(deviceId);
      });
    });

    this.querySelectorAll('input[data-kind="device"]').forEach((el) => {
      const selected = Number(el.getAttribute("data-selected") || 0);
      const total = Number(el.getAttribute("data-total") || 0);
      el.indeterminate = selected > 0 && selected < total;
    });

    this.querySelectorAll('input[data-kind="device"]').forEach((el) => {
      el.addEventListener("change", (ev) => {
        const deviceId = ev.target.getAttribute("data-device-id");
        const row = areaGroups.flatMap((g) => g.rows).find((r) => r.device.id === deviceId);
        this._toggleDevice(deviceId, ev.target.checked, row?.entities || []);
      });
    });

    this.querySelectorAll('input[data-kind="entity"]').forEach((el) => {
      el.addEventListener("change", (ev) => {
        const deviceId = ev.target.getAttribute("data-device-id");
        const entityId = ev.target.getAttribute("data-entity-id");
        const row = areaGroups.flatMap((g) => g.rows).find((r) => r.device.id === deviceId);
        this._toggleEntity(deviceId, entityId, ev.target.checked, row?.entities || []);
      });
    });

    const hideUnavailableCheckbox = this.querySelector("#sg-hide-unavailable");
    if (hideUnavailableCheckbox) {
      hideUnavailableCheckbox.addEventListener("change", (ev) => {
        this._toggleHideUnavailable(ev.target.checked);
      });
    }

    const tree = this.querySelector("#sg-tree");
    if (tree) tree.scrollTop = prevTreeScrollTop;
  }
}

customElements.define("seagull-device-card-editor", SeagullDeviceCardEditor);
customElements.define("seagull-device-card", SeagullDeviceCard);

if (!window.__SEAGULL_DEVICE_CARD_ANNOUNCED__) {
  window.__SEAGULL_DEVICE_CARD_ANNOUNCED__ = true;
  console.info(
    `%c🐦 SEAGULL-DEVICE-CARD%c v${SEAGULL_DEVICE_CARD_VERSION} (%c${SEAGULL_DEVICE_CARD_COMMIT}%c) loaded`,
    "color:#fff;background:#7c3aed;padding:2px 6px;border-radius:4px;font-weight:700;",
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
  description: `Bare rounded gray card + interactive area/device/entity wizard (v${SEAGULL_DEVICE_CARD_VERSION}, ${SEAGULL_DEVICE_CARD_COMMIT})`,
});
