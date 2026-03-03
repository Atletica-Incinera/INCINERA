import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import {
  loadDirectories,
  loadExecutiveBoard,
} from "../src/data/loaders/loadDirectory";

async function run() {
  try {
    const exec = await loadExecutiveBoard();
    console.log("Executive Board:", JSON.stringify(exec, null, 2));

    const dirs = await loadDirectories();
    console.log("Directories:", JSON.stringify(dirs, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
