#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const MODULES = ["site", "profile", "home", "projects", "resume", "photos"];
const input = process.argv[2];

if (!input) {
  console.error("用法: node scripts/apply-content.mjs content-bundle.json");
  process.exit(1);
}

const bundle = JSON.parse(readFileSync(resolve(input), "utf8"));
let written = 0;

for (const key of MODULES) {
  if (bundle[key] === undefined) continue;
  const target = resolve(`src/content/${key}.json`);
  writeFileSync(target, `${JSON.stringify(bundle[key], null, 2)}\n`);
  console.log(`已写入 ${target}`);
  written += 1;
}

if (written === 0) {
  console.error("bundle 中没有可写入的内容模块");
  process.exit(1);
}
