class Util {

    static swapNodes(n1, n2) {
        let i;
        const p1 = n1.parentNode;
        const p2 = n2.parentNode;
        let i1, i2;
        for (i = 0; i < p1.children.length; i++) {
            if (p1.children[i].isEqualNode(n1)) {
                i1 = i;
            }
        }
        for (i = 0; i < p2.children.length; i++) {
            if (p2.children[i].isEqualNode(n2)) {
                i2 = i;
            }
        }
        if ( p1.isEqualNode(p2) && i1 < i2 ) {
            i2++;
        }
        p1.insertBefore(n2, p1.children[i1]);
        p2.insertBefore(n1, p2.children[i2]);
    }

    static random(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

}

class GridGenerator {

    static getSolved(n) {
        let result = [];
        for (let i = 0; i < n; ++i) {
            result.push(new Array(n));
        }
        for (let i = 0; i < result.length; ++i) {
            for (let j = 0; j < result[i].length; ++j) {
                result[i][j] = j + n * i + 1;
            }
        }
        return result;
    }

    static getShuffled(n, number_of_iterations) {
        let result = GridGenerator.getSolved(n);
        let x = result.length - 1;
        let y = result.length - 1;

        function get_range(a) {
            if (1 <= a && a < n - 1) {
                return [-1, 1];
            } else if (1 <= a) {
                return [-1, 0];
            } else if (a < n - 1) {
                return [0, 1];
            }
        }

        for (let i = 0; i < number_of_iterations; ++i) {
            let new_index_x = x + Util.random.apply(this, get_range(x));
            let new_index_y = y + Util.random.apply(this, get_range(y));

            let tmp = result[new_index_x][new_index_y];
            result[new_index_x][new_index_y] = result[x][y];
            result[x][y] = tmp;

            x = new_index_x;
            y = new_index_y;
        }
        return result;
    }

}

class Grid {

    constructor(length, table_html, win_function) {
        this.length = length;
        this.table_html = table_html;
        this.win_function = win_function;
    }

    render() {
        for (let i = 0; i < this.length; ++i) {
            let row = document.createElement('tr');
            for (let j = 0; j < this.length; ++j) {
                let cell = document.createElement('td');
                cell.addEventListener('click', (event) => {
                    let neighbors = this.getNeighbors(event.target);
                    for (let i = 0; i < neighbors.length; ++i) {
                        if (neighbors[i].classList.contains('empty')) {
                            AnimationCSS.fadeInFadeOut(event.target);
                            AnimationCSS.fadeInFadeOut(neighbors[i]);
                            Util.swapNodes(event.target, neighbors[i]);
                        }
                    }
                    if (this.isVictory()) {
                        this.win_function();
                    }
                });
                row.appendChild(cell)
            }
            this.table_html.appendChild(row);
        }

        this.fillCells(GridGenerator.getSolved(this.length));
    }

    fillCells(data) {
        for (let i = 0; i < this.length; ++i) {
            for (let j = 0; j < this.length; ++j) {
                let cell = this.getCell(j, i);
                AnimationCSS.fadeInFadeOut(cell);
                if (data[i][j] !== this.length * this.length) {
                    cell.innerText = data[i][j];
                    cell.classList = [];
                } else {
                    cell.innerText = '';
                    cell.classList.add('empty');
                }
            }
        }
    }

    shuffle() {
        this.fillCells(GridGenerator.getShuffled(this.length, 100));
    }

    getCell(x, y) {
        return this.table_html.childNodes[y].childNodes[x];
    }

    isVictory() {
        for (let i = 0; i < this.length; ++i) {
            for (let j = 0; j < this.length; ++j) {
                let cell = this.getCell(j, i);
                if (i === this.length - 1 && j === this.length - 1) {
                    if (cell.innerText !== '') {
                        return false;
                    }
                } else {
                    let index = j + this.length * i + 1;
                    if (cell.innerText !== index) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    static getIndexes(element) {
        return {
            x: element.cellIndex,
            y: element.parentNode.rowIndex
        }
    }

    getNeighbors(element) {
        let dx = [-1, 0, 1,  0];
        let dy = [ 0, 1, 0, -1];
        let neighbors = []
        let indexes = Grid.getIndexes(element);

        for (let i = 0; i < dx.length; ++i) {
            let x = indexes['x'] + dx[i];
            let y = indexes['y'] + dy[i];
            if ((0 <= x && x < this.length) && (0 <= y && y < this.length)) {
                neighbors.push(this.getCell(x, y));
            }
        }

        return neighbors;
    }

}

document.getElementById('game-btn-shuffle').onclick = (() => {
    grid.shuffle();
});