const detect = function(sequence, equals) {
    if (0 === sequence.length) {
        return [];
    }
    for (let distance = 1; distance < Math.min(100, sequence.length); distance++) {
        let match = 0, pos = sequence.length - 1;
        for (; match < distance; match++, pos--) {
            if (!equals(sequence[pos - distance], sequence[pos])) {
                break;
            }
        }
        if (match === distance) { // Match with Rule 1
            return sequence.slice(-distance);
        }
    }
    return [];
};

module.exports = {
    detect
};
