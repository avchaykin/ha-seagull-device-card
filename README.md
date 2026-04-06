# ha-seagull-device-card

Home Assistant custom card: `custom:seagull-device-card`.

A device-oriented card with an interactive editor wizard (area → device → entity) and a compact grid UI for selected entities.

## What it does

- Editor wizard with hierarchical tree:
  - Areas (expand/collapse + checkbox)
  - Devices inside areas (expand/collapse + checkbox)
  - Entities inside devices (checkbox)
- Live config updates while you click (no separate “create config” button)
- Safe removal behavior:
  - Clean entries are removed from config when unchecked
  - Configured entries are marked with `disable: true` when unchecked
  - Re-checking removes `disable: true`
- Device card rendering:
  - Grouped by device
  - Device title on the left
  - Entity buttons right-aligned in grid slots
  - `more-info` on click
- Entity visuals:
  - Large semi-transparent background icon per button
  - Toggle-style entities (`light`, `switch`) show icon-only
  - Unavailable entities show diagonal striped fill and no text
  - Binary sensor state mapping (e.g. `window off -> Closed`, `door on -> Open`)
  - `unit_of_measurement` appended to state unless explicitly disabled per entity config

## Installation

### Option A — HACS (recommended)

1. HACS → **Frontend** → **⋮** → **Custom repositories**
2. Add: `https://github.com/avchaykin/ha-seagull-device-card`
3. Category: **Dashboard**
4. Install **Seagull Device Card**
5. Add Lovelace resource:
   - URL: `/hacsfiles/ha-seagull-device-card/seagull-device-card.js`
   - Type: `JavaScript Module`

### Option B — Manual

1. Copy files to HA:
   - `/config/www/seagull-device-card.js`
   - `/config/www/seagull-device-card-loader.js`
2. Add Lovelace resource:
   - URL: `/local/seagull-device-card-loader.js`
   - Type: `JavaScript Module`

## Minimal config

```yaml
type: custom:seagull-device-card
devices: []
```

Tip: start from this minimal config and use the visual editor wizard.

## Card options

### Layout / look

- `grid_columns` (default: `4`)
- `grid_gap` (default: `6`)
- `button_border_radius` (default: `8`)
- `button_height` (default: `36`)
- `background_icon_scale` (default: `1.7`) — multiplier relative to `button_height`

### Container

- `background_color` (kept for compatibility)
- `background_opacity`
- `border_radius`
- `border_width`
- `border_color`

## Config structure

```yaml
type: custom:seagull-device-card
grid_columns: 4
grid_gap: 6
button_border_radius: 8
button_height: 36
background_icon_scale: 1.7
wizard:
  area_id: null
  device_ids: []
  entity_ids: []
devices:
  - device_id: abc123
    name: Living Room Lights
    entities:
      - light.floor_lamp
      - entity_id: binary_sensor.window_left
        # Any extra per-entity settings are preserved by wizard.
        # If unchecked in wizard, this becomes disable: true.
        unit_of_measurement: false
```

## Notes

- The editor shows a version pill.
- The card and loader log version announcements in browser console.
- Auto-deploy hooks (if enabled in local clone) are in `scripts/` and `.githooks/`.
