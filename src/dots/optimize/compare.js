
// normal compare version 1
function compare(a, b) {
    return a === b;
}

// compare version 2
function compareV1(a, b) {
    const lenA = a.length;
    if (lenA !== b.length) return false;

    for (let i = 0; i < lenA; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return false;
        }
    }
    return true;
}

// compare version 3
function safeCompare(a, b) {
    const lengthA = a.length;
    let result = 0;
    if (lengthA !== b.length) {
        b = a;
        result = 1;
    }
    for (let index = 0; index < lengthA; index++) {
        result |= (
            a.charCodeAt(index) ^ b.charCodeAt(index)
        ); // XOR
    }
    return result === 0;
}


// 0.135ms
console.time('compare');
    compare('Fronteers', 'Fronteers'); 
    compare('Fronteers', 'Fronteerz');  
    compare('Spring', 'Thing'); 
    compare('CSS', 'XSS'); 
console.timeEnd('compare');


// 0.068ms
console.time('compareV1');
    compareV1('Fronteers', 'Fronteers'); 
    compareV1('Fronteers', 'Fronteerz');  
    compareV1('Spring', 'Thing');
    compareV1('CSS', 'XSS'); 
console.timeEnd('compareV1');


// 0.092ms
console.time('safeCompare');
    safeCompare('Fronteers', 'Fronteers');  
    safeCompare('Fronteers', 'Fronteerz'); 
    safeCompare('Spring', 'Thing');
    safeCompare('CSS', 'XSS');
console.timeEnd('safeCompare');

// you see time use safeCompare < compareV1 < compare
// but when loop many many times safeCompare > compareV1 > compare