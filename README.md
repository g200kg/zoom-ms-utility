# zoom-ms-utility
Zoom MS-50G/MS-60B/MS-70CDR multi stomp patch editor.

This is a patch utility for the ZOOM MS - 50G / 60B / 70 CDR MultiStomp guitar pedal.  
This is still a very tentative version for the confirmation of MIDI related function.

* in v1.0.2, standalone executables for Win / Mac are available. 

## Install
* **Online version** :  
The application starts just by accessing it with **Chrome**, so installation is not required.

* **Stand-alone version** :  

  **Windows (x64)** :  
  > Download and Unzip [zoom-ms-utility-1.0.2-win-x64.zip](https://www.g200kg.com/software/zoom-ms-utility/zoom-ms-utility-1.0.2-win-x64.zip)  
  > startup executable is `ZoomMSUtility.exe` in the folder.

  **Mac (x64)** : 
  > **You should manage `GateKeeper` by yourself**.  
  > Download and Unzip [zoom-ms-utility-1.0.2-mac-x64.zip](https://www.g200kg.com/software/zoom-ms-utility/zoom-ms-utility-1.0.2-mac-x64.zip)  
  > Starts with `ZoomMSUtility.app` in the folder.  

## Usage
* Connect PC/Mac to MS-50G/60B/70CDR via USB
* Launch this app. You should use latest ***Chrome*** for Online version
* Press accept if 'MIDI device' dialog is displayed
* Select MidiPort to 'ZOOM MS Series'

## TECH NOTE : For build standalone packages
* The standalone versions are packaged using [`NW.js`](https://nwjs.io/)
* Create dist-files with `npm run dist`.
* Start the built NW.js app with `npm run nwstart`.

## Offline mode
For windows, the standalone version is recommended for offline use.
On mac, you need to manage GateKeeper yourself to launch the standalone version. Or build it yourself or use the following offline modes.

### Via Node.js

Standard Node.js workflow, clone this repo and run:
```bash
npm install
npm start
```
As per the output, open a Browser and visit [http://localhost:3000](http://localhost:3000)

### Via Other local web servers

This tool will not work if you just open the local html file by Chrome because of file access security limitation. There are several ways to use this tool in an offline environment.

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

## History
* v1.0.2 add standalone version
* v1.0.1 Fix behavior when click a switch

## Info
If you are interested in MS-50G/70CDR MIDI function, check `midimessage.md`
