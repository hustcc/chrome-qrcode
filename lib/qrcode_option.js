function get_qrcode_option(text, cellSize = 8) {
    var colorIn = "#191970";
    var colorOut = "#cd5c5c";
    var colorFore = "#4169e1";
    var colorBack = "#ffffff";
    var options = {
        cellSize: cellSize,
        foreground: [
            // foreground color
            {style: colorFore},
            // outer squares of the positioner
            {row: 0, rows: 7, col: 0, cols: 7, style: colorOut},
            {row: -7, rows: 7, col: 0, cols: 7, style: colorOut},
            {row: 0, rows: 7, col: -7, cols: 7, style: colorOut},
            // inner squares of the positioner
            {row: 2, rows: 3, col: 2, cols: 3, style: colorIn},
            {row: -5, rows: 3, col: 2, cols: 3, style: colorIn},
            {row: 2, rows: 3, col: -5, cols: 3, style: colorIn},
        ],
        background: colorBack,
        data: text,
        typeNumber: 1,
        "effect": {
            "key": "round",
            "value": 0
        },
        // "logo": {
        //     "image": favicon_dom,
        //     "size": 0.13
        // }
    };
    return options;
}

        