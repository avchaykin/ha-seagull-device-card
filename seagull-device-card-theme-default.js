# Seagull Device Card — DEFAULT THEME SPEC (palette-enabled)

palette_mode: auto # auto | day | night (auto follows HA client dark mode)

palette:
  card_border: { day: "#aaaaaa", night: "#64748b" }
  card_bg: { day: "#eeeeee", night: "#0f172a" }
  card_icon: { day: "#2233aa44", night: "#93c5fd55" }

  text_color: { day: "inherit", night: "#e2e8f0" }
  text_bg: { day: "transparent", night: "transparent" }
  text_border: { day: "transparent", night: "transparent" }

  btn_active_fg: { day: "#111827", night: "#111827" }
  btn_active_bg: { day: "#f59e0b", night: "#f59e0b" }
  btn_inactive_fg: { day: "#e5e7eb", night: "#e5e7eb" }
  btn_inactive_bg: { day: "#4b5563", night: "#374151" }
  btn_unavailable_fg: { day: "#d1d5db", night: "#94a3b8" }
  btn_unavailable_bg: { day: "#6b7280", night: "#475569" }
  btn_border: { day: "transparent", night: "transparent" }

  btn_auto_active_fg: { day: "#eaf2ff", night: "#eaf2ff" }
  btn_auto_active_bg: { day: "#3b82f6", night: "#2563eb" }
  btn_auto_inactive_fg: { day: "#111827", night: "#111827" }
  btn_auto_inactive_bg: { day: "#d1d5db", night: "#94a3b8" }

  btn_empty_inactive_fg: { day: "#111827", night: "#e2e8f0" }
  btn_empty_inactive_bg: { day: "#e5e7eb", night: "#334155" }

  btn_alert_active_fg: { day: "#fffafa", night: "#ffe4e6" }
  btn_alert_active_bg: { day: "#f63b3b", night: "#b91c1c" }

  obsolete_border: { day: "#d1d5db", night: "#94a3b8" }

  seagull_rose: { day: "#aa332244", night: "#aa332266" }
  seagull_indigo: { day: "#2233aa44", night: "#2233aa66" }
  seagull_emerald: { day: "#22aa3344", night: "#22aa3366" }
  seagull_amber: { day: "#cc992244", night: "#cc992266" }
  seagull_violet: { day: "#8844cc44", night: "#8844cc66" }
  seagull_cyan: { day: "#22aacc44", night: "#22aacc66" }
  seagull_orange_red: { day: "#cc552244", night: "#cc552266" }
  seagull_lime: { day: "#55aa2244", night: "#55aa2266" }
  seagull_cornflower: { day: "#4466cc44", night: "#4466cc66" }
  seagull_magenta: { day: "#cc44aa44", night: "#cc44aa66" }
  seagull_aqua: { day: "#22ccaa44", night: "#22ccaa66" }
  seagull_tangerine: { day: "#cc772244", night: "#cc772266" }
  seagull_slate_blue: { day: "#6677aa44", night: "#6677aa66" }
  seagull_olive: { day: "#77994444", night: "#77994466" }
  seagull_plum: { day: "#99447744", night: "#99447766" }
  seagull_steel: { day: "#44779944", night: "#44779966" }
  seagull_copper: { day: "#aa664444", night: "#aa664466" }
  seagull_mint: { day: "#44aa6644", night: "#44aa6666" }

card:
  border_radius: 16
  border_width: 0
  border_color: "$card_border"
  background_color: "$card_bg"
  background_opacity: 0.45
  icon: "mdi:sofa"
  icon_color: "$card_icon"
  icon_size: 60
  font_family: "'PT Sans Narrow', sans-serif"
  font_weight: 400
  font_size: null

text:
  color: "$text_color"
  background: "$text_bg"
  border_radius: 10
  border_width: 0
  border_color: "$text_border"
  size: 14
  halign: left
  valign: top
  padding: 0
  padding_top: null
  padding_right: null
  padding_bottom: null
  padding_left: null

button:
  align: right
  size: 48
  font_family: null
  font_weight: null
  font_size: null
  gap: 5
  padding: 10
  padding_top: null
  padding_right: null
  padding_bottom: null
  padding_left: null

  icons:
    default: mdi:help-circle-outline
    light: { on: mdi:lightbulb, off: mdi:lightbulb-off }
    lock: { locked: mdi:lock, unlocked: mdi:lock-open-variant, default: mdi:lock-reset }
    binary_sensor:
      default_on: mdi:check-circle
      default_off: mdi:circle-outline
      device_class:
        window: { on: mdi:window-open, off: mdi:window-closed }
        door: { on: mdi:door-open, off: mdi:door-closed }
        opening: { on: mdi:garage-open, off: mdi:garage }
        motion: { on: mdi:motion-sensor, off: mdi:motion-sensor-off }
        occupancy: { on: mdi:home-account, off: mdi:home-outline }
        lock: { on: mdi:lock-open-variant, off: mdi:lock }

  default:
    border_size: 0
    border_color: "$btn_border"
    active: { color: "$btn_active_fg", background: "$btn_active_bg" }
    inactive: { color: "$btn_inactive_fg", background: "$btn_inactive_bg" }
    unavailable: { color: "$btn_unavailable_fg", background: "$btn_unavailable_bg" }
    obsolete: { border_size: 2, border_color: "$obsolete_border" }

  automation:
    active: { color: "$btn_auto_active_fg", background: "$btn_auto_active_bg" }
    inactive: { color: "$btn_auto_inactive_fg", background: "$btn_auto_inactive_bg" }

  lock:
    active: { color: "$btn_alert_active_fg", background: "$btn_alert_active_bg" }

  binary_sensor:
    device_class:
      door:
        active: { color: "$btn_alert_active_fg", background: "$btn_alert_active_bg" }

  empty:
    inactive: { color: "$btn_empty_inactive_fg", background: "$btn_empty_inactive_bg" }
