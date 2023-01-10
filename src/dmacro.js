const detect = function(sequence, equals) {
    if (0 === sequence.length) {
        return {};
    }
    const rule1Matches = [];
    for (let distance = 1; distance < Math.min(100, sequence.length); distance++) {
        let match = 0, pos = sequence.length - 1;
        for (; match < distance; match++, pos--) {
            if (!equals(sequence[pos - distance], sequence[pos])) {
                break;
            }
        }
        if (match === distance) {
            rule1Matches.push(distance);
        }
    }
    if (0 < rule1Matches.length) {
        const macro = sequence.slice(-rule1Matches.pop());
        return { macro };
    }
    return {};
};

module.exports = {
    detect
};
