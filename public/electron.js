const execFile = require('child_process').execFile;
const path = require("path");
var killtree = require('tree-kill');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow
let child

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
 
  mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
    );
  mainWindow.on("closed", () => {
   mainWindow = null;
  });

}

app.on("ready", createWindow);

app.on("window-all-closed", async () => {
    killtree(child.pid, 'SIGKILL');
    app.quit()
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

child = execFile( path.join(__dirname, 'py-server.exe'), (data, err) => {
  console.log(err);
});
