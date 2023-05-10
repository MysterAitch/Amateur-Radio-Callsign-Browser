export function createCallSignTable(callSignRecordMap, callSignFormats, allPotentialSuffixes, forbiddenSuffixes) {
    // Create table with all possible call signs
    // All suffixes in alphabetical order for each row heading, and all prefixes in alphabetical order for each column heading
    const tableElement = document.createElement('table');
    tableElement.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'table-sm', 'call-sign-table');

    const theadElement = document.createElement('thead');
    const theadRowElement = document.createElement('tr');

    const thElement = document.createElement('th');
    thElement.setAttribute('scope', 'col');
    thElement.textContent = 'Suffix';

    theadRowElement.appendChild(thElement);

    const distinctPrefixes = [...new Set(callSignFormats.map(callSignFormat => callSignFormat.plainPrefix))];
    for (let i = 0; i < distinctPrefixes.length; i++) {
        const prefix = distinctPrefixes[i];
        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'col');
        thElement.textContent = prefix;
        theadRowElement.appendChild(thElement);
    }

    theadElement.appendChild(theadRowElement);
    tableElement.appendChild(theadElement);


    const estimatedCellCount = allPotentialSuffixes.length * callSignFormats.length;
    let cellCount = 0;
    let shortTableForDev = false;

    const tbodyElement = document.createElement('tbody');

    for (let i = 0; i < allPotentialSuffixes.length; i++) {
        const suffix = allPotentialSuffixes[i];
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

        for (let j = 0; j < distinctPrefixes.length; j++) {
            const prefix = distinctPrefixes[j];
            const callSignFormat = callSignFormats
                .find(callSignFormat => callSignFormat.plainPrefix === prefix && callSignFormat.suffixLength === suffix.length);


            const tdElement = document.createElement('td');
            let plainCallsign = prefix + suffix;
            tdElement.textContent = plainCallsign;

            if (!callSignFormat) {
                // console.warn('No callSignFormat found for prefix', prefix, 'and suffix length', suffix.length);
                // cell indicating a never-valid format, with details
                tdElement.classList.add('never-valid-format');
                tdElement.classList.add('table-secondary');


                const detailsElement = document.createElement('div');
                detailsElement.classList.add('details');
                detailsElement.textContent = 'Not accepted format';

                tdElement.appendChild(detailsElement);
                trElement.appendChild(tdElement);

                continue;
            }

            cellCount++;
            if (shortTableForDev && cellCount > 1000) {
                continue;
            }
            if (cellCount % 1000 === 0 || cellCount === estimatedCellCount) {
                // console.debug('cellCount', cellCount, 'of', estimatedCellCount, '(', Math.round(cellCount / estimatedCellCount * 1000) / 10, '%)');
            }


            let callSignIsAllocated = callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Allocated';
            let callSignIsReserved = callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Reserved';

            // Style the cell if it is a formerly issued call sign
            if (!callSignFormat.isCurrentlyIssued) {
                tdElement.classList.add('not-currently-issued');
            }

            if (!callSignIsAllocated && !callSignIsReserved) {
                // Two-letter suffix is not allocatable (only if previously held by the applicant)
                if (suffix.length === 2) {
                    tdElement.classList.add('not-currently-issued');
                    tdElement.classList.add('table-danger');
                }
                // Prefix G2 is not allocatable (only if previously held by the applicant)
                if (callSignFormat.plainPrefix === 'G2') {
                    tdElement.classList.add('not-currently-issued');
                    tdElement.classList.add('table-danger');
                }
            }

            // Add allocation details if it is a currently issued call sign
            if (callSignIsAllocated) {
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

            if (callSignIsReserved) {
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