(() => {
  const version = Date.now();
  const url = `/local/seagull-device-card.js?t=${version}`;

  import(url)
    .then(() => {
      console.info(`%c🐦 SEAGULL-ROOM-CARD-LOADER%c loaded ${url}`, "color:#fff;background:#f97316;padding:2px 6px;border-radius:4px;font-weight:700;", "color:inherit;");
    })
    .catch((err) => {
      console.error("[seagull-device-card-loader] failed to load module", url, err);
    });
})();
