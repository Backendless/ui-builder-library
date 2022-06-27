export const setHorizontal = (horizontal) => {
    switch (horizontal.toLowerCase().trim()) {
        case 'left':
            return ' left';
        case 'center':
            return ' centerX';
        default:
            return ' right';
    }
}

export const setVertical = (vertical) => {
    switch (vertical.toLowerCase().trim()) {
        case 'bottom':
            return ' bottom';
        case 'center':
            return ' centerY';
        default:
            return ' top';
    }
}