console.info('forbiddenSuffixes', forbiddenSuffixes);


const tableContainerElement = document.querySelector('#table-container');


/*
  Per: https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/amateur-radio/amateur-radio-info

    ## Foundation licence
    ## Now issuing

    M7 + 3 letters

    ## Formerly issued

    M3 + 3 Letters
    M6 + 3 Letters


    ## Intermediate licence
    ### Currently issuing

    20 + 3 letters

    ### Formerly issued

    21 + 3 letters

    ## Full licence callsigns
    ### Currently issuing

    M0 + 3 letters

    ## Formerly issued

    G1 + 3 letters
    G2 + 2 letters
    G2 + 3 letters
    G3 + 2 letters
    G3 + 3 letters
    G4 + 2 letters
    G4 + 3 letters
    G5 + 2 letters
    G6 + 2 letters
    G6 + 3 letters
    G7 + 3 letters
    G8 + 2 letters
    G8 + 3 letters
    G0 + 3 letters
    M1 + 3 letters
    M5 + 3 letters

    An applicant for a new Full Licence (or a Full (Club) Licence) may request a call sign with three trailing letters, using any valid Full Licence prefix in the list, above, except ‘G2’. Call signs using formerly issued prefixes are not available via the licensing portal and must be requested on a paper application form (a fee is payable). A callsign with only two trailing letters or which starts with ‘G2’ is only available if the applicant previously held it. Our policy that a station may change its call sign only in exceptional circumstances remains unchanged though Ofcom may, on occasion, require a station to change its call sign.
*/

/**
 * - Prefix (M7, 20, M0, etc)
 * - Level (Foundation, Intermediate, Full)
 * - Suffix length
 * - Is currently issued
 * - Is formerly issued
 */
class CallSignFormat {
    constructor(prefix, level, suffixLength, isCurrentlyIssued, isFormerlyIssued) {
        this.prefix = prefix;
        this.level = level;
        this.suffixLength = suffixLength;
        this.isCurrentlyIssued = isCurrentlyIssued;
        this.isFormerlyIssued = isFormerlyIssued;
    }
}

const callSignFormats = [
    // Currently issued
    new CallSignFormat('M7', 'Foundation', 3, true, false),
    new CallSignFormat('20', 'Intermediate', 3, true, false),
    new CallSignFormat('M0', 'Full', 3, true, false),

    // Formerly issued
    new CallSignFormat('M3', 'Foundation', 3, false, true),
    new CallSignFormat('M6', 'Foundation', 3, false, true),
    new CallSignFormat('21', 'Intermediate', 3, false, true),
    new CallSignFormat('G1', 'Full', 3, false, true),
    new CallSignFormat('G2', 'Full', 2, false, true),
    new CallSignFormat('G2', 'Full', 3, false, true),
    new CallSignFormat('G3', 'Full', 2, false, true),
    new CallSignFormat('G3', 'Full', 3, false, true),
    new CallSignFormat('G4', 'Full', 2, false, true),
    new CallSignFormat('G4', 'Full', 3, false, true),
    new CallSignFormat('G5', 'Full', 2, false, true),
    new CallSignFormat('G6', 'Full', 2, false, true),
    new CallSignFormat('G6', 'Full', 3, false, true),
    new CallSignFormat('G7', 'Full', 3, false, true),
    new CallSignFormat('G8', 'Full', 2, false, true),
    new CallSignFormat('G8', 'Full', 3, false, true),
    new CallSignFormat('G0', 'Full', 3, false, true),
    new CallSignFormat('M1', 'Full', 3, false, true),
    new CallSignFormat('M5', 'Full', 3, false, true),
];


// Create every combination of AA-ZZ and AAA-ZZZ
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allSuffixes = [];
for (let i = 0; i < alphabet.length; i++) {
    // Two-letter suffixes
    for (let j = 0; j < alphabet.length; j++) {
        const suffix = alphabet[i] + alphabet[j];
        allSuffixes.push(suffix);
    }

    // Three-letter suffixes
    for (let j = 0; j < alphabet.length; j++) {
        for (let k = 0; k < alphabet.length; k++) {
            const suffix = alphabet[i] + alphabet[j] + alphabet[k];
            allSuffixes.push(suffix);
        }
    }
}

console.info('allSuffixes', allSuffixes);

const nonForbiddenSuffixes = allSuffixes.filter(suffix => !forbiddenSuffixes.includes(suffix));

console.info('nonForbiddenSuffixes', nonForbiddenSuffixes);


/*
Call Sign,Status,Product,Call Sign MMSI: Last Modified Date
M7RFT,Allocated,Amateur Foundation Radio Licence,05/11/2022
M3YVL,Allocated,Amateur Foundation Radio Licence,23/07/2016
M7CVI,Allocated,Amateur Foundation Radio Licence,28/01/2022
M6DNO,Allocated,Amateur Foundation Radio Licence,10/08/2016
M7VIK,Allocated,Amateur Foundation Radio Licence,27/10/2022
M3CAB,Allocated,Amateur Foundation Radio Licence,29/01/2022
M7EIE,Allocated,Amateur Foundation Radio Licence,26/10/2021
M6GWB,Allocated,Amateur Foundation Radio Licence,16/11/2019
20LQX,Allocated,Amateur Intermediate Radio Licence,20/01/2022
 */

class CallSignRecord {
    constructor(callSign, status, product, lastModifiedDate) {
        this.callSign = callSign;
        this.status = status;
        this.product = product;
        this.lastModifiedDate = lastModifiedDate;
    }
}

// fetch csv data from url and return as array of CallSignRecord objects
async function fetchCsv(url) {
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

const callSignRecords = await fetchCsv('data/amateur-callsigns--latest.csv');

console.info('callSignRecords', callSignRecords);

// turn callSignRecords into a map of callSign to CallSignRecord
const callSignRecordMap = new Map();
for (let i = 0; i < callSignRecords.length; i++) {
    const callSignRecord = callSignRecords[i];
    callSignRecordMap.set(callSignRecord.callSign, callSignRecord);
}

console.info('callSignRecordMap', callSignRecordMap);



// replace contents of container element with table
let newTableElem = createCallSignTable();
tableContainerElement.innerHTML = '';
tableContainerElement.appendChild(newTableElem);


function createCallSignTable() {
    // Create table with all possible call signs
    // All suffixes in alphabetical order for each row heading, and all prefixes in alphabetical order for each column heading
    const tableElement = document.createElement('table');
    tableElement.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'table-sm');

    const theadElement = document.createElement('thead');
    const theadRowElement = document.createElement('tr');

    const thElement = document.createElement('th');
    thElement.setAttribute('scope', 'col');
    thElement.textContent = 'Suffix';

    theadRowElement.appendChild(thElement);

    for (let i = 0; i < callSignFormats.length; i++) {
        const callSignFormat = callSignFormats[i];
        console.debug('callSignFormat', callSignFormat);

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'col');
        thElement.textContent = callSignFormat.prefix;

        // Style the cell if it is a formerly issued call sign
        if (callSignFormat.isFormerlyIssued) {
            thElement.classList.add('not-currently-issued');
        }

        theadRowElement.appendChild(thElement);
    }

    theadElement.appendChild(theadRowElement);
    tableElement.appendChild(theadElement);


    const estimatedCellCount = allSuffixes.length * callSignFormats.length;
    let cellCount = 0;
    let shortTableForDev = false;

    const tbodyElement = document.createElement('tbody');

    for (let i = 0; i < allSuffixes.length; i++) {
        const suffix = allSuffixes[i];
        const trElement = document.createElement('tr');

        // Style the row if it's a forbidden suffix
        if (forbiddenSuffixes.includes(suffix)) {
            trElement.classList.add('forbidden-suffix');
            trElement.classList.add('table-danger');
        }
        // Only allow two-letter suffixes if previously allocated (i.e., not currently issued)
        if (suffix.length === 2) {
            trElement.classList.add('two-letter-suffix');
            trElement.classList.add('table-warning');
        }

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row');
        thElement.textContent = suffix;

        trElement.appendChild(thElement);

        for (let j = 0; j < callSignFormats.length; j++) {
            cellCount++;
            if (shortTableForDev && cellCount > 1000) {
                continue;
            }
            if (cellCount % 1000 === 0 || cellCount === estimatedCellCount) {
                // console.debug('cellCount', cellCount, 'of', estimatedCellCount, '(', Math.round(cellCount / estimatedCellCount * 1000) / 10, '%)');
            }

            const callSignFormat = callSignFormats[j];

            const tdElement = document.createElement('td');
            let plainCallsign = callSignFormat.prefix + suffix;
            tdElement.textContent = plainCallsign;

            // Style the cell if it is a formerly issued call sign
            if (callSignFormat.isFormerlyIssued) {
                tdElement.classList.add('not-currently-issued');
            }

            // Add allocation details if it is a currently issued call sign
            if(callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Allocated') {
                const callSignRecord = callSignRecordMap.get(plainCallsign);
                tdElement.classList.add('currently-issued');
                tdElement.classList.add('table-success');
                tdElement.setAttribute('data-toggle', 'tooltip');
                tdElement.setAttribute('data-placement', 'top');
                tdElement.setAttribute('title', callSignRecord.callSign + ' ' + callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate);

                // Add details to cell
                const detailsElement = document.createElement('div');
                detailsElement.classList.add('details');
                detailsElement.textContent = callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate;
                tdElement.appendChild(detailsElement);
            }

            if(callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Reserved') {
                const callSignRecord = callSignRecordMap.get(plainCallsign);
                tdElement.classList.add('currently-issued');
                tdElement.classList.add('table-info');
                tdElement.setAttribute('data-toggle', 'tooltip');
                tdElement.setAttribute('data-placement', 'top');
                tdElement.setAttribute('title', callSignRecord.callSign + ' ' + callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate);
                // Add details to cell
                const detailsElement = document.createElement('div');
                detailsElement.classList.add('details');
                detailsElement.textContent = callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate;
                tdElement.appendChild(detailsElement);
            }

            trElement.appendChild(tdElement);
        }

        tbodyElement.appendChild(trElement);
    }

    tableElement.appendChild(tbodyElement);

    return tableElement;
}