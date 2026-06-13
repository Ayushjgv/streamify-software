

import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

process.env.APP_ROOT = path.join(
  __dirname,
  ".."
);

export const VITE_DEV_SERVER_URL =
  process.env["VITE_DEV_SERVER_URL"];

export const MAIN_DIST = path.join(
  process.env.APP_ROOT,
  "dist-electron"
);

export const RENDERER_DIST = path.join(
  process.env.APP_ROOT,
  "dist"
);

process.env.VITE_PUBLIC =
  VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let win: BrowserWindow | null;

// ================= REDIS =================
const redis = createClient({
  url: "redis://default:9aSdEW0W55yEGPwhljH0mR40AStz7BKZ@vertical-meeting-lunch-59337.db.redis.io:15218",
});

redis.on("error", (err) =>
  console.log("Redis Error:", err)
);

async function connectRedis() {
  try {
    await redis.connect();

    console.log("Redis Connected");
  } catch (err) {
    console.error(err);
  }
}

// ================= WINDOW =================

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(
      process.env.VITE_PUBLIC,
      "electron-vite.svg"
    ),

    webPreferences: {
      preload: path.join(
        __dirname,
        "preload.mjs"
      ),

      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.webContents.on(
    "did-finish-load",
    () => {
      win?.webContents.send(
        "main-process-message",
        new Date().toLocaleString()
      );
    }
  );
  //ad blocking

  win.webContents.on("will-navigate", (event, url) => {
    console.log("Navigation blocked:", url);
    event.preventDefault();
  });

  win.webContents.setWindowOpenHandler((details) => {
    console.log("Popup blocked:", details.url);

    return {
      action: "deny",
    };
  });

  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  //

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(
      path.join(
        RENDERER_DIST,
        "index.html"
      )
    );
  }
}



// ================= IPC =================

ipcMain.handle(
  "get-anime-list",
  async (_, { query, type }) => {
    try {
      const cacheKey = `anime:${type}`;

      const cached =
        await redis.get(cacheKey);

      if (cached) {
        console.log(
          "Cache hit:",
          cacheKey
        );

        return JSON.parse(cached);
      }

      console.log(
        "Cache miss:",
        cacheKey
      );

      const response =
        await axios.post(
          "https://graphql.anilist.co",
          {
            query,
          }
        );

      const media =
        response.data.data.Page.media;

      await redis.set(
        cacheKey,
        JSON.stringify(media),
        {
          EX: 3600,
        }
      );

      return media;
    } catch (err) {
      console.error(err);

      return [];
    }
  }
);

// ================= EVENTS =================

app.on(
  "window-all-closed",
  () => {
    if (process.platform !== "darwin") {
      app.quit();
      win = null;
    }
  }
);

app.on("activate", () => {
  if (
    BrowserWindow.getAllWindows()
      .length === 0
  ) {
    createWindow();
  }
});

app.on(
  "certificate-error",
  (
    event,
    _webContents,
    url,
    _error,
    _certificate,
    callback
  ) => {
    if (
      url.startsWith(
        "https://graphql.anilist.co"
      )
    ) {
      event.preventDefault();
      callback(true);
    } else {
      callback(false);
    }
  }
);
app.whenReady().then(async () => {
  await connectRedis();

  createWindow();
});