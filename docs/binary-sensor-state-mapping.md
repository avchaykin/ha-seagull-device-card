# Binary sensor state mapping (On/Off)

Проверочная таблица того, как `seagull-device-card` отображает `binary_sensor` по `device_class`.

| device_class | when `on` | when `off` |
|---|---|---|
| none / not set | On | Off |
| battery | Low | Normal |
| battery_charging | Charging | Not charging |
| carbon_monoxide | Detected | Clear |
| cold | Cold | Normal |
| connectivity | Connected | Disconnected |
| door | Open | Closed |
| garage_door | Open | Closed |
| gas | Detected | Clear |
| heat | Hot | Normal |
| light | Detected | Clear |
| lock | Unlocked | Locked |
| moisture | Wet | Dry |
| motion | Detected | Clear |
| moving | Moving | Stopped |
| occupancy | Occupied | Clear |
| opening | Open | Closed |
| plug | Plugged | Unplugged |
| power | On | Off |
| presence | Home | Away |
| problem | Problem | OK |
| running | Running | Not running |
| safety | Unsafe | Safe |
| smoke | Smoke | Clear |
| sound | Detected | Quiet |
| tamper | Tampered | Clear |
| update | Update available | Up-to-date |
| vibration | Vibration | Still |
| window | Open | Closed |

> Примечание: для неизвестных классов fallback остаётся `On` / `Off`.
