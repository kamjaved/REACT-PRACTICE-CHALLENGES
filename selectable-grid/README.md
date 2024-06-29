# Grid Selection Logic

# Grid Selection Logic

## Overview

This document explains the logic behind the `getSelectedRange` function used for selecting cells in a dynamic grid. The function calculates the range of cells within a specified rectangular area, based on starting and ending cells, and works with 1-based indexes.

## `getSelectedRange` Function

### Function Signature

    const getSelectedRange = (start, end, rowCount, colCount) => {
      // Function body
    };

### Simplified Example

###### Let’s walk through a simplified example for a 3x3 grid, selecting from cell `2` to cell `7`.

Grid Layout (1-based indexes):

```javascript
1  2  3
4  5  6
7  8  9

```

##### Starting Cell: 2 (Top Row, Second Column)

`start = 2`

`startRow = Math.floor((2 - 1) / 3) = 0`

`startCol = (2 - 1) % 3 = 1`

##### Ending Cell: 7 (Bottom Row, First Column)

`end = 7`

`endRow = Math.floor((7 - 1) / 3) = 2`

`endCol = (7 - 1) % 3 = 0`

##### Range Calculation:

`minRow = Math.min(0, 2) = 0`

`maxRow = Math.max(0, 2) = 2`

`minCol = Math.min(1, 0) = 0`

`maxCol = Math.max(1, 0) = 1`

##### Selected Cells:

Iterate from row 0 to 2 and col 0 to 1:

`r = 0, c = 0 → 0 * 3 + 0 + 1 = 1`

`r = 0, c = 1 → 0 * 3 + 1 + 1 = 2`

`r = 1, c = 0 → 1 * 3 + 0 + 1 = 4`

`r = 1, c = 1 → 1 * 3 + 1 + 1 = 5`

`r = 2, c = 0 → 2 * 3 + 0 + 1 = 7`

`r = 2, c = 1 → 2 * 3 + 1 + 1 = 8`

The selected cells for this example would be [1, 2, 4, 5, 7, 8].
