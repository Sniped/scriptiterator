# Script Iterator
A program that will iterate through a text file or raw text fetched from an API.

## Setting Up
Setting up this program is pretty easy, you simply need [TypeScript](https://www.typescriptlang.org) and [NodeJS](https://nodejs.org/en/).

1. Install the dependencies
2. Configure `src/scripts.ts` ([more here](https://github.com/Sniped/scriptiterator#configuring-scripts.ts))
3. Start the program with `yarn start`

## Configuring scripts.ts
The file is an array of objects that derive from the class `Script`, you can find an example in the source code for how it should look, simply copy and paste what's already in there and configure accordingly.

If you're grabbing raw text from an endpoint, you would use `api` as the type and a link to the raw text as the module, if you're using a local text file, you would use `text` as the type and require the text file in the file and use it as the module. 