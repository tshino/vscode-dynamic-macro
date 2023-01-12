const detect = function(sequence, equals, config = {}) {
    if (0 === sequence.length) {
        return {};
    }

    const { maxMacroLength = 100 } = config;
    const maxDistance = Math.min(maxMacroLength, sequence.length - 1);

    let rule1Match = null;
    let rule2Match = null;
    for (let distance = 1; distance <= maxDistance; distance++) {
        let match = 0, pos = sequence.length - 1;
        for (; match < distance; match++, pos--) {
            if (!equals(sequence[pos - distance], sequence[pos])) {
                break;
            }
        }
        if (match === distance) {
            rule1Match = distance;
        } else if (0 < match) {
            if (rule2Match === null || rule2Match.match < match) {
                rule2Match = { distance, match };
            }
        }
    }
    if (rule1Match !== null) {
        const macro = sequence.slice(-rule1Match);
        return { macro };
    }
    if (rule2Match !== null) {
        const { distance, match } = rule2Match;
        const macro = sequence.slice(-distance - match, -match);
        const position = match;
        return { macro, position };
    }
    return {};
};

module.exports = {
    detect
};
