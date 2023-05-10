import {CallSignRecord} from "./js/callSignRecord.js";
import {allPotentialSuffixes, allPotentialThreeLetterSuffixes, allPotentialTwoLetterSuffixes} from "./js/suffixes.js";
import {forbiddenSuffixes} from "./data/Forbidden Call Sign Suffixes - FOI Aug 2019.js";
import {callSignFormats} from "./js/callSignFormat.js";
import {createCallSignTable} from "./js/createCallSignTable.js";


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
    const response = await fetch(url);
    const text = await response.text();
    // split by any line separator
    const rows = text.split(/\r\n|\n|\r/);
    const callSignRecords = rows.map(row => {
        const columns = row.split(',');
        return new CallSignRecord(columns[0], columns[1], columns[2], columns[3]);
    });
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

// replace contents of container element with table
let newTableElem = createCallSignTable(callSignRecordMap, callSignFormats, allPotentialSuffixes, forbiddenSuffixes);
tableContainerElement.innerHTML = '';
tableContainerElement.appendChild(newTableElem);
