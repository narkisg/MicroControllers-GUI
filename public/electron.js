const { spawn } = require('child_process');
const path = require("path");
var killtree = require('tree-kill');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const url = require("url");
const isDev = require("electron-is-dev");
const { kill } = require('process');

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
    child = spawn('py-server.exe', null, {}, (data, err) => {
        console.log(err);
    });
    console.log(child.pid)

}

app.on("ready", createWindow);
 app.on("will-quit", () => {
  console.log(child.pid)

    killtree(child.pid);
});
app.on("window-all-closed", async () => {

    app.quit()
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


