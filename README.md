# zoom-ms-utility
Zoom MS-50G/MS-60B/MS-70CDR multi stomp patch editor.

This is an updated GUI Web Version only for the original repo: https://github.com/g200kg/zoom-ms-utility

### Available online
The tool is available online without any installation, open the following link in Chrome (or other Web MIDI supported browser)
https://radinsky.github.io/zoom-ms-utility/

### Usage
Just open index.html in your (Chrome) browser

### Via Other local web servers
1. Connect via the local server  
  If you already have a full-fledged http server such as Apache on your PC, place zoom-ms-utility in the document folder and connect via localhost. On Windows, you need to prepare your server program yourself. On Mac, Apache has already been installed, but configuration is necessary.
    https://discussions.apple.com/docs/DOC-3083

2. Connect via a simple local server.  
  Simple local server is supported in script language environment like Python. They can be used as a local-server. For example Python 3.x:  
 (1) install python 3.x.x and setup PATH  
 (2) start server with command prompt > python -m http.server 8888  
 (3) access by Chrome to http://localhost:8888/  

3. Specify startup options for Chrome  
  If `--allow-file-access-from-files` option is specified when launch, security restrictions on file access are canceled and zoom-ms-utility works.  
  For example on Windows,  
  Make a shortcut of Chrome, like
  `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  --allow-file-access-from-files file:///C:/Users/xxxx/zoom-ms-utility/index.html`  
  Or on Mac, use Automator shell script, like  
  `Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files /Users/xxxx/zoom-ms-utility/index.html`  
  Note that this method will not work if the Chrome instance is already exist. You should close all Chrome window before launch.

## Info
If you are interested in MS-50G/70CDR MIDI function, check `midimessage.md`
