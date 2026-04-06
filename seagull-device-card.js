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
    this._card.style.background = bg;
    this._card.style.boxShadow = "none";
    this._card.style.overflow = "hidden";

    this._inner.style.minHeight = "160px";
    this._inner.style.width = "100%";
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
    this._selectedAreaId = this._config?.wizard?.area_id || "";
    this._selectedDeviceIds = new Set(this._config?.wizard?.device_ids || []);
    this._selectedEntityIds = new Set(this._config?.wizard?.entity_ids || []);
    this._expandedDeviceIds = new Set();
    this._selectionHydrated = false;
    this._wizardLoaded = false;
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

  _areaRows() {
    if (!this._selectedAreaId) return [];

    const entitiesByDevice = new Map();
    for (const entity of this._entities || []) {
      if (!entity || entity.disabled_by || entity.hidden_by) continue;
      if (!entity.device_id) continue;
      if (!entitiesByDevice.has(entity.device_id)) entitiesByDevice.set(entity.device_id, []);
      entitiesByDevice.get(entity.device_id).push(entity);
    }

    return (this._devices || [])
      .filter((d) => d && d.area_id === this._selectedAreaId)
      .map((device) => ({
        device,
        entities: (entitiesByDevice.get(device.id) || []).sort((a, b) => String(a.entity_id).localeCompare(String(b.entity_id))),
      }))
      .sort((a, b) => String(a.device?.name_by_user || a.device?.name || "").localeCompare(String(b.device?.name_by_user || b.device?.name || "")));
  }

  _hydrateSelectionFromConfig() {
    if (this._selectionHydrated) return;
    this._selectionHydrated = true;

    const devices = Array.isArray(this._config?.devices) ? this._config.devices : [];
    devices.forEach((dev) => {
      if (!dev?.device_id) return;
      this._selectedDeviceIds.add(dev.device_id);
      (Array.isArray(dev.entities) ? dev.entities : []).forEach((e) => {
        const id = this._entityId(e);
        if (id) this._selectedEntityIds.add(id);
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
    const rows = this._areaRows();
    return rows
      .map(({ device, entities }) => ({
        device_id: device.id,
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
    return Object.keys(entity).some((k) => k !== "entity_id");
  }

  _hasDeviceCustomConfig(device) {
    if (!device || typeof device !== "object" || Array.isArray(device)) return false;
    return Object.keys(device).some((k) => k !== "device_id" && k !== "entities");
  }

  _getExistingDevice(deviceId) {
    return (Array.isArray(this._config?.devices) ? this._config.devices : []).find((d) => d?.device_id === deviceId) || null;
  }

  _isDeviceLocked(deviceId) {
    const dev = this._getExistingDevice(deviceId);
    if (!dev) return false;
    if (this._hasDeviceCustomConfig(dev)) return true;
    return (Array.isArray(dev.entities) ? dev.entities : []).some((e) => this._hasEntityCustomConfig(e));
  }

  _isEntityLocked(deviceId, entityId) {
    const dev = this._getExistingDevice(deviceId);
    if (!dev) return false;
    const entity = (Array.isArray(dev.entities) ? dev.entities : []).find((e) => this._entityId(e) === entityId);
    return this._hasEntityCustomConfig(entity);
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

  _onAreaChange(value) {
    this._selectedAreaId = value;
    this._expandedDeviceIds.clear();
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
    if (!checked && this._isDeviceLocked(deviceId)) {
      this._render();
      return;
    }

    if (checked) this._selectedDeviceIds.add(deviceId);
    else this._selectedDeviceIds.delete(deviceId);

    for (const entity of entities || []) {
      const entityId = entity.entity_id;
      if (checked) {
        this._selectedEntityIds.add(entityId);
      } else if (!this._isEntityLocked(deviceId, entityId)) {
        this._selectedEntityIds.delete(entityId);
      }
    }

    this._syncConfigFromSelection();
    this._render();
  }

  _toggleEntity(deviceId, entityId, checked, deviceEntities) {
    if (!checked && this._isEntityLocked(deviceId, entityId)) {
      this._render();
      return;
    }

    if (checked) this._selectedEntityIds.add(entityId);
    else this._selectedEntityIds.delete(entityId);

    const allSelected = (deviceEntities || []).every((e) => this._selectedEntityIds.has(e.entity_id));
    if (allSelected && (deviceEntities || []).length) {
      this._selectedDeviceIds.add(deviceId);
    } else if (!this._isDeviceLocked(deviceId)) {
      this._selectedDeviceIds.delete(deviceId);
    }

    this._syncConfigFromSelection();
    this._render();
  }

  _selectAllInArea() {
    const rows = this._areaRows();
    for (const { device, entities } of rows) {
      this._selectedDeviceIds.add(device.id);
      for (const entity of entities) this._selectedEntityIds.add(entity.entity_id);
    }
    this._syncConfigFromSelection();
    this._render();
  }

  _clearSelection() {
    const rows = this._areaRows();
    for (const { device, entities } of rows) {
      if (!this._isDeviceLocked(device.id)) this._selectedDeviceIds.delete(device.id);
      for (const entity of entities) {
        if (!this._isEntityLocked(device.id, entity.entity_id)) this._selectedEntityIds.delete(entity.entity_id);
      }
    }
    this._syncConfigFromSelection();
    this._render();
  }

  _syncConfigFromSelection() {
    const currentRows = this._areaRows();
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
        if (selectedEntityIds.has(id) || this._hasEntityCustomConfig(entityCfg)) {
          mergedEntities.push(this._hasEntityCustomConfig(entityCfg) ? entityCfg : id);
          selectedEntityIds.delete(id);
        }
      }
      for (const id of selectedEntityIds) mergedEntities.push(id);

      if (mergedEntities.length === 0 && !hasDeviceCustom) continue;

      const outDev = { device_id: dev.device_id, entities: mergedEntities.sort((a, b) => String(this._entityId(a)).localeCompare(String(this._entityId(b)))) };
      if (hasDeviceCustom) {
        Object.keys(dev).forEach((k) => {
          if (k !== "device_id" && k !== "entities") outDev[k] = dev[k];
        });
      }
      result.push(outDev);
      selectedMap.delete(dev.device_id);
    }

    for (const [deviceId, selectedDev] of selectedMap.entries()) {
      const entities = (selectedDev.entities || []).map((e) => this._entityId(e)).filter(Boolean).sort();
      if (!entities.length) continue;
      result.push({ device_id: deviceId, entities });
    }

    const config = {
      ...this._config,
      type: "custom:seagull-device-card",
      wizard: {
        area_id: this._selectedAreaId || null,
        device_ids: [...this._selectedDeviceIds],
        entity_ids: [...this._selectedEntityIds],
      },
      devices: result,
    };

    this._emitConfigChanged(config);
  }

  _render() {
    const areas = Array.isArray(this._areas) ? this._areas : [];
    const rows = this._areaRows();

    this.innerHTML = `
      <div style="padding:12px 0; font-size:13px; line-height:1.4;">
        <div style="margin:0 0 12px 0;background:var(--card-background-color,#f3f4f6);border-radius:9999px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--divider-color,#d1d5db);">
          <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Seagull Device Card</div>
          <div style="background:#7c3aed;color:#fff;border-radius:9999px;padding:2px 8px;font-size:12px;font-weight:700;line-height:1.6;">v${SEAGULL_DEVICE_CARD_VERSION}</div>
        </div>

        <div style="border:1px solid var(--divider-color,#d1d5db);border-radius:12px;padding:12px;background:var(--card-background-color,#fff)">
          <div style="font-weight:700;margin-bottom:8px;">Entity Wizard</div>

          <div style="margin-bottom:10px;">
            <div style="font-weight:600;margin-bottom:6px;">1) Выбери area</div>
            <select id="sg-area" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#d1d5db);">
              <option value="">— Select area —</option>
              ${areas.map((a) => `<option value="${a.area_id}" ${a.area_id === this._selectedAreaId ? "selected" : ""}>${a.name || a.area_id}</option>`).join("")}
            </select>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:10px;">
            <button id="sg-all" style="padding:6px 10px;border-radius:8px;border:1px solid #7c3aed;background:#ede9fe;color:#5b21b6;font-weight:700;cursor:pointer;">Select all in area</button>
            <button id="sg-clear" style="padding:6px 10px;border-radius:8px;border:1px solid #d1d5db;background:#fff;color:#374151;font-weight:700;cursor:pointer;">Clear</button>
          </div>

          <div style="font-weight:600;margin-bottom:6px;">2) Выбери девайсы и сущности</div>
          <div style="max-height:320px;overflow:auto;border:1px solid var(--divider-color,#d1d5db);border-radius:8px;padding:8px;">
            ${this._wizardError
              ? `<div style="color:#dc2626;">Failed to load HA registries: ${this._wizardError}</div>`
              : (!this._selectedAreaId
                ? `<div style="opacity:.7;">Сначала выбери area.</div>`
                : (!rows.length
                  ? `<div style="opacity:.7;">В этой area нет устройств.</div>`
                  : rows.map(({ device, entities }) => {
                    const devName = device.name_by_user || device.name || device.id;
                    const devChecked = this._selectedDeviceIds.has(device.id);
                    const selectedCount = entities.filter((e) => this._selectedEntityIds.has(e.entity_id)).length;
                    const isExpanded = this._isDeviceExpanded(device.id);
                    const deviceLocked = this._isDeviceLocked(device.id);
                    return `
                      <div style="padding:6px 0;border-bottom:1px dashed var(--divider-color,#e5e7eb);">
                        <div style="display:flex;gap:8px;align-items:center;font-weight:700;">
                          <button type="button" data-kind="expand" data-device-id="${device.id}" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;font-size:22px;line-height:1;color:var(--primary-text-color,#111827);padding:0;display:inline-flex;align-items:center;justify-content:center;">${isExpanded ? "▾" : "▸"}</button>
                          <input type="checkbox" data-kind="device" data-device-id="${device.id}" data-selected="${selectedCount}" data-total="${entities.length}" ${deviceLocked ? "disabled" : ""} ${devChecked ? "checked" : ""}>
                          <span>${devName}</span>
                          <span style="opacity:.6;font-weight:500;">(${selectedCount}/${entities.length})</span>
                          ${deviceLocked ? `<span style="font-size:11px;opacity:.65;padding:2px 6px;border-radius:999px;background:#f3f4f6;">locked</span>` : ""}
                        </div>
                        ${isExpanded
                          ? `<div style="padding:8px 0 0 30px;display:flex;flex-direction:column;gap:4px;">
                              ${entities.map((entity) => {
                                const checked = this._selectedEntityIds.has(entity.entity_id);
                                const entityLocked = this._isEntityLocked(device.id, entity.entity_id);
                                return `
                                  <label style="display:flex;gap:8px;align-items:center;">
                                    <input type="checkbox" data-kind="entity" data-device-id="${device.id}" data-entity-id="${entity.entity_id}" ${entityLocked ? "disabled" : ""} ${checked ? "checked" : ""}>
                                    <span>${entity.name || entity.original_name || entity.entity_id}</span>
                                    <code style="opacity:.65;">${entity.entity_id}</code>
                                    ${entityLocked ? `<span style="font-size:11px;opacity:.65;">🔒</span>` : ""}
                                  </label>
                                `;
                              }).join("")}
                            </div>`
                          : ""}
                      </div>
                    `;
                  }).join("")))}
          </div>

          <div style="margin-top:10px;opacity:.8;">
            Выбрано: <b>${this._selectedEntityIds?.size || 0}</b> сущностей, <b>${this._selectedDeviceIds?.size || 0}</b> устройств
          </div>

        </div>
      </div>
    `;

    const areaSelect = this.querySelector("#sg-area");
    if (areaSelect) areaSelect.addEventListener("change", (ev) => this._onAreaChange(ev.target.value));

    const btnAll = this.querySelector("#sg-all");
    if (btnAll) btnAll.addEventListener("click", () => this._selectAllInArea());

    const btnClear = this.querySelector("#sg-clear");
    if (btnClear) btnClear.addEventListener("click", () => this._clearSelection());

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
        const row = rows.find((r) => r.device.id === deviceId);
        this._toggleDevice(deviceId, ev.target.checked, row?.entities || []);
      });
    });

    this.querySelectorAll('input[data-kind="entity"]').forEach((el) => {
      el.addEventListener("change", (ev) => {
        const deviceId = ev.target.getAttribute("data-device-id");
        const entityId = ev.target.getAttribute("data-entity-id");
        const row = rows.find((r) => r.device.id === deviceId);
        this._toggleEntity(deviceId, entityId, ev.target.checked, row?.entities || []);
      });
    });
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
