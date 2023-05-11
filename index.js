import {CallSignRecord} from "./js/callSignRecord.js";
import {allPotentialSuffixes, allPotentialThreeLetterSuffixes, allPotentialTwoLetterSuffixes} from "./js/suffixes.js";
import {forbiddenSuffixes} from "./data/Forbidden Call Sign Suffixes - FOI Aug 2019.js";
import {callSignFormats} from "./js/callSignFormat.js";
import {createCallSignTable} from "./js/createCallSignTable.js";
import {createCallSignTableD3} from "./js/createCallSignTableD3.js";


console.debug('allPotentialSuffixes', allPotentialSuffixes);
console.debug('allPotentialTwoLetterSuffixes', allPotentialTwoLetterSuffixes);
console.debug('allPotentialThreeLetterSuffixes', allPotentialThreeLetterSuffixes);

console.debug('forbiddenSuffixes', forbiddenSuffixes);

const nonForbiddenSuffixes = [...allPotentialSuffixes]
    .filter(suffix => !forbiddenSuffixes.includes(suffix));
console.debug('nonForbiddenSuffixes', nonForbiddenSuffixes);

console.info('callSignFormats', callSignFormats);


// fetch csv data from url and return as array of CallSignRecord objects
async function fetchCallSignRecordsCsv(url) {
    const data = await d3.csv(url, function (d) {
        return {
            callSign: d['Value'],
            status: d['Status'],
            product: d['Product'],
            lastModifiedDate: d['Call Sign MMSI: Last Modified Date'],
        };
    });
    console.debug('data', data);

    const callSignRecords = data.map(row => {
        return new CallSignRecord(row.callSign, row.status, row.product, row.lastModifiedDate);
    });
    console.debug('callSignRecords', callSignRecords);

    // const callSignRecords = await d3.csv(url, function (d) {
    //         return new CallSignRecord(
    //             d['Value'],
    //             d['Status'],
    //             d['Product'],
    //             d['Call Sign MMSI: Last Modified Date'],
    //         );
    //     });

    return callSignRecords;
}

const callSignRecords = await fetchCallSignRecordsCsv('data/amateur-callsigns--latest.csv');
console.info('callSignRecords', callSignRecords);

// Transform callSignRecords into a map for optimised lookup
const callSignRecordMap = new Map();
for (let i = 0; i < callSignRecords.length; i++) {
    const callSignRecord = callSignRecords[i];
    callSignRecordMap.set(callSignRecord.callSign, callSignRecord);
}
console.info('callSignRecordMap', callSignRecordMap);


const tableContainerElement = document.querySelector('#table-container');

// // replace contents of container element with table
// let newTableElem = createCallSignTable(callSignRecordMap, callSignFormats, allPotentialSuffixes, forbiddenSuffixes);
// tableContainerElement.innerHTML = '';
// tableContainerElement.appendChild(newTableElem);

// replace contents of container element with table
let newTableElem = createCallSignTableD3(callSignRecords, callSignRecordMap, callSignFormats, allPotentialSuffixes, forbiddenSuffixes);

