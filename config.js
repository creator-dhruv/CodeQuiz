import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".gemini_config.json");

function saveApiKey(apiKey) {
  const config = { apiKey };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log("✅ API key saved successfully!");
}

function loadApiKey() {
  if (fs.existsSync(CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    return config.apiKey;
  }
  return null; // not set yet
}

function removeApiKey() {
  if (fs.existsSync(CONFIG_PATH)) {
    fs.unlinkSync(CONFIG_PATH);
    console.log("🗑️  API key removed successfully!");
  } else {
    console.log("⚠️  No API key found to remove.");
  }
}

export { saveApiKey, loadApiKey, removeApiKey  };
