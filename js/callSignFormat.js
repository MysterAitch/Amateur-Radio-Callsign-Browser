/**
 * Per: https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/amateur-radio/amateur-radio-info
 *
 * ## Foundation licence
 *
 * ### Now issuing
 *
 * - M7 + 3 letters
 *
 * ### Formerly issued
 *
 * - M3 + 3 Letters
 * - M6 + 3 Letters
 *
 *
 * ## Intermediate licence
 *
 * ### Currently issuing
 *
 * - 20 + 3 letters
 *
 * ### Formerly issued
 *
 * - 21 + 3 letters
 *
 * ## Full licence callsigns
 *
 * ### Currently issuing
 *
 * - M0 + 3 letters
 *
 * ### Formerly issued
 *
 * - G1 + 3 letters
 * - G2 + 2 letters
 * - G2 + 3 letters
 * - G3 + 2 letters
 * - G3 + 3 letters
 * - G4 + 2 letters
 * - G4 + 3 letters
 * - G5 + 2 letters
 * - G6 + 2 letters
 * - G6 + 3 letters
 * - G7 + 3 letters
 * - G8 + 2 letters
 * - G8 + 3 letters
 * - G0 + 3 letters
 * - M1 + 3 letters
 * - M5 + 3 letters
 *
 * An applicant for a new Full Licence (or a Full (Club) Licence) may request a call sign with three trailing letters, using any valid Full Licence prefix in the list, above, except ‘G2’.
 * Call signs using formerly issued prefixes are not available via the licensing portal and must be requested on a paper application form (a fee is payable).
 * A callsign with only two trailing letters or which starts with ‘G2’ is only available if the applicant previously held it.
 * Our policy that a station may change its call sign only in exceptional circumstances remains unchanged though Ofcom may, on occasion, require a station to change its call sign.
 */
export class CallSignFormat {
    /**
     * This class represents a call sign format which may/may not be valid/currently issued.
     *
     * @param plainPrefix e.g. M7, 20, M0, etc - no RSL placeholder (#), note that this may not result in a valid call sign (e.g., 20 is not a valid prefix as it must _always_ have the RSL placeholder)
     * @param prefixWithRslPlaceholder e.g. M#7, 2#0, M#0, etc where # is the RSL placeholder
     * @param licenceLevel License level which may hold this license (Foundation, Intermediate, Full)
     * @param suffixLength Length of the suffix (e.g. 3 for M#7ABC)
     * @param isCurrentlyIssued Whether this call sign format is currently issued by Ofcom
     * @param hasEverBeenIssued Whether this call sign format has ever been issued by Ofcom
     */
    constructor(plainPrefix, prefixWithRslPlaceholder, licenceLevel, suffixLength, isCurrentlyIssued, hasEverBeenIssued = false) {
        this.plainPrefix = plainPrefix;
        this.prefixWithRsl = prefixWithRslPlaceholder;
        this.licenceLevel = licenceLevel;
        this.suffixLength = suffixLength;
        this.isCurrentlyIssued = isCurrentlyIssued;
        this.hasEverBeenIssued = hasEverBeenIssued;
    }
}


export const callSignFormats = [
    // Currently issued
    new CallSignFormat('M7', 'M#7', 'Foundation', 3, true, true),
    new CallSignFormat('20', '2#0', 'Intermediate', 3, true, true),
    new CallSignFormat('M0', 'M#0', 'Full', 3, true, true),

    // Formerly issued
    new CallSignFormat('M3', 'M#3', 'Foundation', 3, false, true),
    new CallSignFormat('M6', 'M#6', 'Foundation', 3, false, true),
    new CallSignFormat('21', '2#1', 'Intermediate', 3, false, true),
    new CallSignFormat('G1', 'G#1', 'Full', 3, false, true),
    new CallSignFormat('G2', 'G#2', 'Full', 2, false, true),
    new CallSignFormat('G2', 'G#2', 'Full', 3, false, true),
    new CallSignFormat('G3', 'G#3', 'Full', 2, false, true),
    new CallSignFormat('G3', 'G#3', 'Full', 3, false, true),
    new CallSignFormat('G4', 'G#4', 'Full', 2, false, true),
    new CallSignFormat('G4', 'G#4', 'Full', 3, false, true),
    new CallSignFormat('G5', 'G#5', 'Full', 2, false, true),
    new CallSignFormat('G6', 'G#6', 'Full', 2, false, true),
    new CallSignFormat('G6', 'G#6', 'Full', 3, false, true),
    new CallSignFormat('G7', 'G#7', 'Full', 3, false, true),
    new CallSignFormat('G8', 'G#8', 'Full', 2, false, true),
    new CallSignFormat('G8', 'G#8', 'Full', 3, false, true),
    new CallSignFormat('G0', 'G#0', 'Full', 3, false, true),
    new CallSignFormat('M1', 'M#1', 'Full', 3, false, true),
    new CallSignFormat('M5', 'M#5', 'Full', 3, false, true),
];


// sort callsignformats by level (in the order: foundation, intermediate, full) and then by prefix
callSignFormats.sort((a, b) => {
    // First sort by level (in the order: foundation, intermediate, full)
    const levelOrder = ['Foundation', 'Intermediate', 'Full'];
    const aLevelIndex = levelOrder.indexOf(a.licenceLevel);
    const bLevelIndex = levelOrder.indexOf(b.licenceLevel);
    if (aLevelIndex < bLevelIndex) {
        return -1;
    } else if (aLevelIndex > bLevelIndex) {
        return 1;
    } else {
        // Second sort by prefix
        if (a.plainPrefix < b.plainPrefix) {
            return -1;
        } else if (a.plainPrefix > b.plainPrefix) {
            return 1;
        } else {
            return 0;
        }
    }
});