// Stüdyonun kendi Cloudflare hesabına yayın.
// Kullanım (önce `npm run build`):
//   D1_DATABASE_ID=<id> npm run deploy:cloudflare           → migration'ları uygular ve yayınlar
//   D1_DATABASE_ID=<id> npm run deploy:cloudflare -- --dry  → yalnızca yayın ayarını hazırlar
// Cloudflare Workers Builds (GitHub bağlantısı) için:
//   Build command:  npm run build
//   Deploy command: npm run deploy:cloudflare
//   Değişken: D1_DATABASE_ID (Cloudflare panelinde D1 veritabanının kimliği)
// Gerekli ortam değişkenleri: D1_DATABASE_ID. İsteğe bağlı: WORKER_NAME (varsayılan omu-bumu),
// D1_DATABASE_NAME (varsayılan omu-bumu). Yerelde yayın için ayrıca CLOUDFLARE_API_TOKEN.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const built = `${root}dist/server/wrangler.json`;
const target = `${root}dist/server/wrangler.deploy.json`;
const dry = process.argv.includes("--dry");

if (!existsSync(built)) {
  console.error("dist/server/wrangler.json yok. Önce `npm run build` çalıştırın.");
  process.exit(1);
}
const databaseId = process.env.D1_DATABASE_ID;
if (!databaseId || !/^[0-9a-f-]{36}$/i.test(databaseId)) {
  console.error("D1_DATABASE_ID ortam değişkeni eksik veya geçersiz.");
  process.exit(1);
}
const workerName = process.env.WORKER_NAME || "omu-bumu";
const databaseName = process.env.D1_DATABASE_NAME || "omu-bumu";

const config = JSON.parse(readFileSync(built, "utf8"));
config.name = workerName;
config.topLevelName = workerName;
delete config.dev;
config.d1_databases = [{
  binding: "DB",
  database_name: databaseName,
  database_id: databaseId,
  // Yol bu dosyaya göre: dist/server → proje kökü/drizzle
  migrations_dir: "../../drizzle",
}];
writeFileSync(target, JSON.stringify(config, null, 2));
console.log(`Yayın ayarı hazır: ${target} (worker: ${workerName}, D1: ${databaseName})`);
if (dry) process.exit(0);

const wrangler = (...args) => {
  const result = spawnSync("npx", ["wrangler", ...args, "--config", target], { stdio: "inherit", cwd: root });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
wrangler("d1", "migrations", "apply", databaseName, "--remote");
wrangler("deploy");
