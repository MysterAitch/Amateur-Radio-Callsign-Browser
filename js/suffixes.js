
// Create every combination of AA-ZZ and AAA-ZZZ
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const allPotentialSuffixes = [];

export const allPotentialTwoLetterSuffixes = [];

export const allPotentialThreeLetterSuffixes = [];

for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
        allPotentialTwoLetterSuffixes.push(alphabet[i] + alphabet[j]);
        for (let k = 0; k < alphabet.length; k++) {
            allPotentialThreeLetterSuffixes.push(alphabet[i] + alphabet[j] + alphabet[k]);
        }
    }
}

allPotentialSuffixes.push(...allPotentialTwoLetterSuffixes);
allPotentialSuffixes.push(...allPotentialThreeLetterSuffixes);

allPotentialSuffixes.sort();
