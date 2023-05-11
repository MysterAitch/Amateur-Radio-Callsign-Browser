export function createCallSignTableD3(callSignRecords, callSignRecordMap, callSignFormats, allPotentialSuffixes, forbiddenSuffixes) {

    // Remove any existing table
    d3.select('#table-container').selectAll('*').remove();

    const tableElem = d3.select('#table-container')
        .append('table')
        .attr('class', 'table table-bordered table-striped table-hover table-sm align-middle call-sign-table')
    ;

    const theadElem = tableElem.append('thead');
    const tbodyElem = tableElem.append('tbody');

    const distinctPrefixes = [...new Set(callSignFormats.map(callSignFormat => callSignFormat.plainPrefix))];

    theadElem.append('tr')
        .selectAll('th')
        .data(['Suffix', ...distinctPrefixes])
        .enter()
        .append('th')
        .attr('scope', 'col')
        .text(d => d)
    ;

    const trElems = tbodyElem.selectAll('tr')
        .data(allPotentialSuffixes)
        .enter()
        .append('tr')
        .attr('class', d => {
            if (forbiddenSuffixes.includes(d)) {
                return 'forbidden-suffix table-danger';
            }
            if (d.length === 2) {
                return 'two-letter-suffix table-warning';
            }
            return '';
        })
    ;

    trElems.append('th')
        .attr('scope', 'row')
        .text(d => d)
    ;

    const tdElems = trElems.selectAll('td')
        .data(potentialSuffixD => distinctPrefixes.map(plainPrefix => {
            const callSign = plainPrefix + potentialSuffixD;
            const callSignRecord = callSignRecordMap.get(callSign);
            const callSignFormat = callSignFormats
                .find(callSignFormat => callSignFormat.plainPrefix === plainPrefix && callSignFormat.suffixLength === potentialSuffixD.length);

            return {
                callSign: callSign,
                callSignRecord: callSignRecord,
                callSignFormat: callSignFormat,
                prefix: plainPrefix,
                prefixWithRsl: plainPrefix[0] + '#' + plainPrefix[1],
                suffix: potentialSuffixD,
                isValidFormat: callSignFormat !== undefined,
                isForbiddenSuffix: forbiddenSuffixes.includes(potentialSuffixD),
            };
        }))
        .enter()
        .append('td')
        .text(d => {
            let text = d.prefixWithRsl + d.suffix

            // Call sign format not recognised as a valid Ofcom-issued callsign
            if (!d.isValidFormat) {
                text += ' ' + 'Non-valid format';
            }

            // Include details
            if (d.callSignRecord) {
                text += ' ' + d.callSignRecord.status + ' ' + d.callSignRecord.product + ' ' + d.callSignRecord.lastModifiedDate;
            }

            if (!d.callSignFormat && d.callSignRecord
                // && d.prefix !== 'G5'
            ) {
                text += ' ' + 'WARN: Non-valid format thus should not be allocated, but record exists';
            }

            // Cross-reference the expected licence level with the actual allocated licence level
            if (d.callSignRecord && d.callSignFormat && d.callSignRecord.status === 'Allocated') {
                if (d.callSignFormat.licenceLevel === 'Full' && d.callSignRecord.product === 'Amateur Club Radio Licence') {
                    // No comment required
                } else if (d.callSignFormat.licenceLevel === 'Full' && d.callSignRecord.product === 'Special Event Station') {
                    // No comment required
                } else {
                    const expected = 'Amateur ' + d.callSignFormat.licenceLevel + ' Radio Licence';
                    if (d.callSignRecord.product !== expected) {
                        if (d.callSignRecord.product === '') {
                            text += ' ' + 'Licence marked as allocated, but no "product" found';
                        } else {
                            text += ' ' + 'Licence level mismatch (`' + d.callSignRecord.product + '` vs expected `' + expected + '`)';
                        }
                    }
                }
            }
            return text;
        })
        .attr('class', d => {
            // If we have a record of this call sign, style the cell according to its status
            // This takes precedence over generic formatting rules which apply to the format
            // TODO: Do a combination(?) -- e.g., if it's not an approved format but has been allocated/issued, then indicate this
            if (d.callSignRecord) {
                if (d.callSignRecord.status === 'Allocated') {
                    return 'allocated-call-sign table-success';
                }
                if (d.callSignRecord.status === 'Reserved') {
                    return 'reserved-call-sign table-info';
                }
                if (d.callSignRecord.status === 'Available') {
                    // return 'reserved-call-sign table-info';
                    return 'reserved-call-sign';
                }
            }

            // Style the cell if it is not a recognised Ofcom-issue call sign format
            if (!d.isValidFormat) {
                return 'non-valid-format table-secondary';
            }

            if (d.callSign) {
                // Style the cell if it is a forbidden suffix
                if (d.isForbiddenSuffix) {
                    return 'forbidden-suffix table-danger';
                }
                // Only allow two-letter suffixes if previously allocated (i.e., not currently issued)
                if (d.suffix.length === 2) {
                    return 'two-letter-suffix table-warning';
                }
            }

            return '';
        })


    // return tableElem;


    // // Create table with all possible call signs
    // // All suffixes in alphabetical order for each row heading, and all prefixes in alphabetical order for each column heading
    // const tableElement = document.createElement('table');
    // tableElement.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'table-sm', 'call-sign-table');
    //
    // const theadElement = document.createElement('thead');
    // const theadRowElement = document.createElement('tr');
    //
    // const thElement = document.createElement('th');
    // thElement.setAttribute('scope', 'col');
    // thElement.textContent = 'Suffix';
    //
    // theadRowElement.appendChild(thElement);
    //
    // const distinctPrefixes = [...new Set(callSignFormats.map(callSignFormat => callSignFormat.plainPrefix))];
    // for (let i = 0; i < distinctPrefixes.length; i++) {
    //     const prefix = distinctPrefixes[i];
    //     const thElement = document.createElement('th');
    //     thElement.setAttribute('scope', 'col');
    //     thElement.textContent = prefix;
    //     theadRowElement.appendChild(thElement);
    // }
    //
    // theadElement.appendChild(theadRowElement);
    // tableElement.appendChild(theadElement);
    //
    //
    // const estimatedCellCount = allPotentialSuffixes.length * callSignFormats.length;
    // let cellCount = 0;
    // let shortTableForDev = false;
    //
    // const tbodyElement = document.createElement('tbody');
    //
    // for (let i = 0; i < allPotentialSuffixes.length; i++) {
    //     const suffix = allPotentialSuffixes[i];
    //     const trElement = document.createElement('tr');
    //
    //     // Style the row if it's a forbidden suffix
    //     if (forbiddenSuffixes.includes(suffix)) {
    //         trElement.classList.add('forbidden-suffix');
    //         trElement.classList.add('table-danger');
    //     }
    //     // Only allow two-letter suffixes if previously allocated (i.e., not currently issued)
    //     if (suffix.length === 2) {
    //         trElement.classList.add('two-letter-suffix');
    //         trElement.classList.add('table-warning');
    //     }
    //
    //     const thElement = document.createElement('th');
    //     thElement.setAttribute('scope', 'row');
    //     thElement.textContent = suffix;
    //
    //     trElement.appendChild(thElement);
    //
    //     for (let j = 0; j < distinctPrefixes.length; j++) {
    //         const prefix = distinctPrefixes[j];
    //         const callSignFormat = callSignFormats
    //             .find(callSignFormat => callSignFormat.plainPrefix === prefix && callSignFormat.suffixLength === suffix.length);
    //
    //
    //         const tdElement = document.createElement('td');
    //         let plainCallsign = prefix + suffix;
    //         tdElement.textContent = plainCallsign;
    //
    //         if (!callSignFormat) {
    //             // console.warn('No callSignFormat found for prefix', prefix, 'and suffix length', suffix.length);
    //             // cell indicating a never-valid format, with details
    //             tdElement.classList.add('never-valid-format');
    //             tdElement.classList.add('table-secondary');
    //
    //
    //             const detailsElement = document.createElement('div');
    //             detailsElement.classList.add('details');
    //             detailsElement.textContent = 'Not accepted format';
    //
    //             tdElement.appendChild(detailsElement);
    //             trElement.appendChild(tdElement);
    //
    //             continue;
    //         }
    //
    //         cellCount++;
    //         if (shortTableForDev && cellCount > 1000) {
    //             continue;
    //         }
    //         if (cellCount % 1000 === 0 || cellCount === estimatedCellCount) {
    //             // console.debug('cellCount', cellCount, 'of', estimatedCellCount, '(', Math.round(cellCount / estimatedCellCount * 1000) / 10, '%)');
    //         }
    //
    //
    //         let callSignIsAllocated = callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Allocated';
    //         let callSignIsReserved = callSignRecordMap.has(plainCallsign) && callSignRecordMap.get(plainCallsign).status === 'Reserved';
    //
    //         // Style the cell if it is a formerly issued call sign
    //         if (!callSignFormat.isCurrentlyIssued) {
    //             tdElement.classList.add('not-currently-issued');
    //         }
    //
    //         if (!callSignIsAllocated && !callSignIsReserved) {
    //             // Two-letter suffix is not allocatable (only if previously held by the applicant)
    //             if (suffix.length === 2) {
    //                 tdElement.classList.add('not-currently-issued');
    //                 tdElement.classList.add('table-danger');
    //             }
    //             // Prefix G2 is not allocatable (only if previously held by the applicant)
    //             if (callSignFormat.plainPrefix === 'G2') {
    //                 tdElement.classList.add('not-currently-issued');
    //                 tdElement.classList.add('table-danger');
    //             }
    //         }
    //
    //         // Add allocation details if it is a currently issued call sign
    //         if (callSignIsAllocated) {
    //             const callSignRecord = callSignRecordMap.get(plainCallsign);
    //             tdElement.classList.add('currently-issued');
    //             tdElement.classList.add('table-success');
    //             tdElement.setAttribute('data-toggle', 'tooltip');
    //             tdElement.setAttribute('data-placement', 'top');
    //             tdElement.setAttribute('title', callSignRecord.callSign + ' ' + callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate);
    //
    //             // Add details to cell
    //             const detailsElement = document.createElement('div');
    //             detailsElement.classList.add('details');
    //             detailsElement.textContent = callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate;
    //             tdElement.appendChild(detailsElement);
    //         }
    //
    //         if (callSignIsReserved) {
    //             const callSignRecord = callSignRecordMap.get(plainCallsign);
    //             tdElement.classList.add('currently-issued');
    //             tdElement.classList.add('table-info');
    //             tdElement.setAttribute('data-toggle', 'tooltip');
    //             tdElement.setAttribute('data-placement', 'top');
    //             tdElement.setAttribute('title', callSignRecord.callSign + ' ' + callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate);
    //             // Add details to cell
    //             const detailsElement = document.createElement('div');
    //             detailsElement.classList.add('details');
    //             detailsElement.textContent = callSignRecord.product + ' ' + callSignRecord.status + ' ' + callSignRecord.lastModifiedDate;
    //             tdElement.appendChild(detailsElement);
    //         }
    //
    //         trElement.appendChild(tdElement);
    //     }
    //
    //     tbodyElement.appendChild(trElement);
    // }
    //
    // tableElement.appendChild(tbodyElement);
    //
    // return tableElement;
}