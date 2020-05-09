// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const webview = document.querySelector('#view');
const popup = document.querySelector('#popup');
const form = document.querySelector('form');
const input = document.querySelector('input');
const gotoBtn = document.querySelector('#goto');
const backBtn = document.querySelector('#back');
const forwardBtn = document.querySelector('#forward');
const refreshBtn = document.querySelector('#refresh');

const checkBackAndForwardStatus = () => {
  if (webview.canGoBack()) {
    backBtn.classList.remove('disabled');
  } else {
    backBtn.classList.add('disabled');
  }

  if (webview.canGoForward()) {
    forwardBtn.classList.remove('disabled');
  } else {
    forwardBtn.classList.add('disabled');
  }
};

webview.addEventListener('dom-ready', () => {
  checkBackAndForwardStatus();
  if (webview.getURL() === 'about:blank') {
    popup.classList.add('active');
  }
});

gotoBtn.addEventListener('click', e => {
  e.preventDefault();
  popup.classList.add('active');
});

popup.addEventListener('click', e => {
  e.preventDefault();
  popup.classList.remove('active');
});

popup.addEventListener('transitionend', () => {
  input.focus();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = input.value.trim();
  let url = null;
  if (value.startsWith('http://') || value.startsWith('https://')) {
    url = value;
  } else {
    url = `https://${value}`;
  }
  popup.classList.remove('active');
  input.value = '';
  webview.loadURL(url);
});

backBtn.addEventListener('click', e => {
  e.preventDefault();
  if (webview.canGoBack()) {
    webview.goBack();
    checkBackAndForwardStatus();
  }
});

forwardBtn.addEventListener('click', e => {
  e.preventDefault();
  if (webview.canGoForward()) {
    webview.goForward();
    checkBackAndForwardStatus();
  }
});

refreshBtn.addEventListener('click', e => {
  e.preventDefault();
  webview.reload();
});
