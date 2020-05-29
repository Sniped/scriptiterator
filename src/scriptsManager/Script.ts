import { isUri } from 'valid-url';
import { typeString, keyTap } from 'robotjs';
import fetch from 'node-fetch';

export default class Script {

    name: string;
    type: 'text' | 'api';
    module: any;

    constructor(name: string, type: 'text' | 'api', module: any) {
        this.name = name;
        this.type = type;
        this.module = module;
        if (this.type == 'api' && !isUri(this.module)) {
            throw new Error(`The URI provided in ${this.name} is not valid!`);
        }
        if (this.type == 'text' && typeof this.module != 'string') {
            throw new Error(`The module in ${this.name} does not point to valid text. Are you sure you provided a machine-readable text file?`);
        }
    }

    private async getText() : Promise<string> {
        let text: string;
        if (this.type == 'api') {
            text = await this.getTextFromApi();
        } else text = this.module;
        return text;
    }

    private async getTextFromApi() : Promise<string> {
        const res = await fetch(this.module);
        if (res.status != 200) {
            throw new Error(`Error while fetching script for ${this.name}!`);
        }
        const contentType = res.headers.get('Content-Type')!;
        if (!contentType.startsWith('text/plain')) {
            throw new Error(`Expected raw text for ${this.name}, however endpoint returned ${contentType}`);
        }
        return res.text();
    }

    async send() {
        const text = await this.getText();
        const splitText = text.split(' ');
        splitText.forEach(text => {
            typeString(text);
            keyTap('enter');
        });
    }

}