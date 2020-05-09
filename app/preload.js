// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const ipc = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {
  const webview = document.querySelector('#view');
  ipc.on('open-blank-url', (e, arg) => {
    webview.loadURL(arg);
  });
});
