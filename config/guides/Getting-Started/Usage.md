# Start using LDocGen

To start using LDocGen you need to complete the following steps.

## Setup on local machine

### Prerequisites

Before you can start using LDocGen, you need to install [Node.js](https://nodejs.org/en/) and [LDoc](https://github.com/lunarmodules/ldoc#installation).

### Installing LDocGen

Once you have installed [Node.js](https://nodejs.org/en/) and [LDoc](https://github.com/lunarmodules/ldoc#installation), you can clone the LDocGen repository and install the dependencies.

```bash
git clone https://github.com/MULTIVERSE-Project/LDocGen.git
cd LDocGen
npm install
```

This will clone the LDocGen repository and install the dependencies. Once the dependencies have been installed, you can start using LDocGen.

> **Note:**
> LDocGen repository provides a `config.ld` file that can be used to configure LDoc to work with LDocGen. This file will be used in this guide.

### Preparing your project

You need to copy yours project `lua` folder into LDocGen folder. For example, if your project is located in `C:\Users\user\Desktop\MyProject`, you need to copy `C:\Users\user\Desktop\MyProject\lua` folder into `C:\Users\user\Desktop\LDocGen\lua`.

> **Note:**
> You can modify the `config.ldoc` file to change the location of your project `lua` folder. By default, it is set to `./lua`.

### Generating LDoc reference file

If you want to generate the LDoc reference file, without building docs, you need to run the following command:

```bash
npm run ldoc:generate
```

This will generate the LDoc reference file in the `data` folder.

### Writing guides

LDocGen provides a `data/guides` folder that can be used to store guides. You can create a new guide by creating a new folder in the `data/guides` folder. For example, if you want to create a guide called `Getting Started`, you can create a folder called `Getting-Started` in the `data/guides` folder. You can then create a `Instalation.md` file in the `data/guides/Getting-Started` folder to write the guide. This will be recognized by LDocGen as a guide called `Instalation` in the `Getting Started` section.

### Generating documentation

To generate the documentation, you need to run the following command:

```bash
npm run build
```

This will generate the documentation in the `dist` folder.

### Running the documentation

To run the documentation, you need to run the following command:

> `serve` package is required, you can install it using `npm install -g serve`

```bash
npm run preview
```

This will start a local server on port `3000` that you can use to view the documentation.
