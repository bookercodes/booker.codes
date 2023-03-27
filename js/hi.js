// console.log("hi")

// import { annotate } from 'rough-notation';
// Or using unpkg
// import { annotate } from 'https://unpkg.com/rough-notation?module';

const e = document.querySelector('#hi');
const annotation = RoughNotation.annotate(e, { type: 'highlight', color:'yellow' });
annotation.show();