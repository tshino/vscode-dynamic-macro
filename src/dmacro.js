const detect = function(sequence, equals) {
    if (0 === sequence.length) {
        return [];
    }
    // repeat the last single command (experimental)
    return sequence.slice(sequence.length - 1);
};

module.exports = {
    detect
};
