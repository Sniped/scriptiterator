import { Scripts } from './scripts';

Scripts.forEach(async script => {
    await script.send();
});