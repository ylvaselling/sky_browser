# Sky Browser Integration 2021
This is a project to integrate World Wide Telescope and OpenSpace. It is carried out at Linköping University, Sweden, as a master thesis work of a MSE with specialization in Media Technology.
The students who work on this project are Ylva Selling and Ester Lindgren.

# Set up and dependencies
Currently the project is dependent on an OpenSpace patch that has not yet been merged into the WorldWide Telescope master. To use the project, you need to download a developer version of the WorldWide Telescope research app that has this patch.

### Set up instructions

1. Download [this repo](https://github.com/imbasimba/wwt-webgl-engine/tree/open-space) and follow the instructions. Make sure you download the `open-space` branch. The `wwtlib.js` file can be found in this `sky_browser` repository and should be copied and pasted as stated in the instructions. Run the research application with the command described in the repository ReadMe (serve it on default port - should be `8080`).

2. Download this repo. The first time using this project, the typescript file needs to be compiled into javascript. [Here](https://code.visualstudio.com/docs/typescript/typescript-compiling) you can see instructions for doing that on Windows. Then, run it on `localhost:8000`.

3. Start OpenSpace with the SkyBrowser module. Note that you need to import assets for the browser and the target.

#### GUI crashes?
There's a lot of data processing happening upon startup. Try to be patient and wait a little bit. :-) If the GUI crashes, reload it and wait a minute or two.

#### No images show up?
Try removing the WWTimagedata folder, if there is one in the skybrowser module. If there exists a folder with that name, but it's empty, it won't download any new WWT files.


#### Deprecated instructions
This web page is dependent on World Wide Telescope packages @wwtelescope/research-app-messages/dist/classic_pywwt and @wwtelescope/research-app. These are node_modules that need to be downloaded.
The research app needs to be build and to be set up on a local host: http://localhost:7800 is the address right now. The files in this repo need to be on a local host: http://localhost:8000 is the address right now. The typescript file needs to be compiled into JS.
