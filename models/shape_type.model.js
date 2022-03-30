export const ShapeTypes = Object.freeze({
    STRAIGHT: Symbol('STRAIGHT'),
    SQUARE: Symbol('SQUARE'),
    TSYMBOL: Symbol('TSYMBOL'),
    LSYMBOL: Symbol('LSYMBOL'),
    SKEW: Symbol('SKEW')
});

export const ShapeSizes = Object.freeze({
    STRAIGHT: {width: 1, length: 4},
    SQUARE: {width: 2, length: 2},
    TSYMBOL: {width: 2, length: 3},
    LSYMBOL: {width: 3, length: 2},
    SKEW: { width: 2, length: 3}
});
