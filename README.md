# Sky Browser Integration 2021
This is a project to integrate World Wide Telescope and OpenSpace. It is carried out at Linköping University, Sweden, as a master thesis work of a MSE with specialization in Media Technology.
The students who work on this project are Ylva Selling and Ester Lindgren.

# Set up and dependencies
Currently the project is dependent on an OpenSpace patch that has not yet been merged into the WorldWide Telescope master. To use the project, you need to download a developer version of the WorldWide Telescope research app that has this patch.

### Set up instructions

1. Download [this repo](https://github.com/imbasimba/wwt-webgl-engine/tree/open-space) and follow the instructions. Make sure you download the `open-space` branch. The `wwtlib.js` file is pushed to this project and should be copied and pasted as stated in the instructions. Serve the research application with the command described in the repository ReadMe (serve it on default port - should be `8080`).

2. Download this repo. The first time using this project, the typescript file needs to be compiled into javascript. [Here](https://code.visualstudio.com/docs/typescript/typescript-compiling) you can see instructions for doing that on Windows. Then, serve it on `localhost:8000`.

3. Start OpenSpace with the SkyBrowser module. Note that you need to import assets for the browser and the target.

##### No images show up or OpenSpace crashes?

If no images show up at all (or if the GUI component of the skybrowser module makes OpenSpace crash), the problem might be that you need to download the image data files from the web. This only needs to be done once - when the files are on disc, loading the images from disc is much faster. To download the image data frmo the web, do this:
In the `skybrowsermodule_lua.inl` file, find the function `int getListOfImages(lua_State* L)`. Find the call to `module->loadImages(root, SkyBrowserModule::FROM_DIRECTORY);`. Change `FROM_DIRECTORY` to `FROM_URL`. This will make the WorldWide Telescope data be downloaded to disc.

This is the quick fix for now but a better fix will be done in the future :-)

#### Deprecated instructions
This web page is dependent on World Wide Telescope packages @wwtelescope/research-app-messages/dist/classic_pywwt and @wwtelescope/research-app. These are node_modules that need to be downloaded.
The research app needs to be build and to be set up on a local host: http://localhost:7800 is the address right now. The files in this repo need to be on a local host: http://localhost:8000 is the address right now. The typescript file needs to be compiled into JS.
