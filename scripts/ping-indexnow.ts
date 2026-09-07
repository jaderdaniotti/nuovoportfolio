/**
 * Post-deploy IndexNow: notifica URL core (non il silo 190K).
 *
 *   npm run seo:indexnow
 *   npm run seo:indexnow:dry
 */

import {
  getIndexNowCoreUrls,
  submitIndexNow,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
} from "../lib/indexnow";

const dryRun = process.argv.includes("--dry-run");

async function main() {
  const urls = getIndexNowCoreUrls();
  console.log(`IndexNow key: ${INDEXNOW_KEY}`);
  console.log(`Key file: ${INDEXNOW_KEY_LOCATION}`);
  console.log(`URL da inviare: ${urls.length}`);

  if (dryRun) {
    console.log(urls.slice(0, 20).join("\n"));
    if (urls.length > 20) console.log(`… +${urls.length - 20} altre`);
    console.log("Dry-run: nessuna richiesta inviata.");
    return;
  }

  const result = await submitIndexNow(urls);
  console.log(
    `HTTP ${result.status} ok=${result.ok} submitted=${result.submitted}`,
  );
  if (result.body) console.log(result.body);
  if (!result.ok) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
