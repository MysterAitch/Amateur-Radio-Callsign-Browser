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


// Create every combination of AAA-ZZZ
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allSuffixes = [];
for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
        for (let k = 0; k < alphabet.length; k++) {
            allSuffixes.push(alphabet[i] + alphabet[j] + alphabet[k]);
        }
    }
}

console.info('allSuffixes', allSuffixes);

const nonForbiddenSuffixes = allSuffixes.filter(suffix => !forbiddenSuffixes.includes(suffix));

console.info('nonForbiddenSuffixes', nonForbiddenSuffixes);


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
    console.info('callSignFormat', callSignFormat);

    const thElement = document.createElement('th');
    thElement.setAttribute('scope', 'col');
    thElement.textContent = callSignFormat.prefix;

    theadRowElement.appendChild(thElement);
}

theadElement.appendChild(theadRowElement);
tableElement.appendChild(theadElement);


const estimatedCellCount = allSuffixes.length * callSignFormats.length;
let cellCount = 0;

const tbodyElement = document.createElement('tbody');

for (let i = 0; i < allSuffixes.length; i++) {
    const suffix = allSuffixes[i];
    const trElement = document.createElement('tr');

    // style the row if it's a forbidden suffix
    if (forbiddenSuffixes.includes(suffix)) {
        trElement.classList.add('table-danger');
    }

    const thElement = document.createElement('th');
    thElement.setAttribute('scope', 'row');
    thElement.textContent = suffix;

    trElement.appendChild(thElement);

    for (let j = 0; j < callSignFormats.length; j++) {
        cellCount++;
        if (cellCount % 1000 === 0 || cellCount === estimatedCellCount) {
            console.debug('cellCount', cellCount, 'of', estimatedCellCount, '(', Math.round(cellCount / estimatedCellCount * 1000) / 10, '%)');
        }

        const callSignFormat = callSignFormats[j];

        const tdElement = document.createElement('td');
        tdElement.textContent = callSignFormat.prefix + suffix;

        trElement.appendChild(tdElement);
    }

    tbodyElement.appendChild(trElement);
}

tableElement.appendChild(tbodyElement);

tableContainerElement.appendChild(tableElement);
