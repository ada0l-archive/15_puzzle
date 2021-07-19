class Util {

    static swapNodes(n1, n2) {
        var p1 = n1.parentNode;
        var p2 = n2.parentNode;
        var i1, i2;
        for (var i = 0; i < p1.children.length; i++) {
            if (p1.children[i].isEqualNode(n1)) {
                i1 = i;
            }
        }
        for (var i = 0; i < p2.children.length; i++) {
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


    static shuffle(arr) {
        for (let i = 0; i < arr.length; ++i) {
            let j = Math.floor(Math.random() * i);
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }

}

class Grid {

    constructor(length, table_html) {
        this.length = length;
        this.table_html = table_html;
    }

    render() {
        for (let i = 0; i < this.length; ++i) {
            let row = document.createElement('tr');
            for (let j = 0; j < this.length; ++j) {
                let cell = document.createElement('td');
                cell.addEventListener('click', (new CellClickListener(this)).action);
                let index = j + this.length * i + 1;
                if (index != this.length * this.length) {
                    cell.innerText = index;
                    cell.classList = [];
                } else {
                    cell.classList.add('empty');
                }
                row.appendChild(cell)
            }
            this.table_html.appendChild(row);
        }
    }

    shuffle() {
        let numbers = [];

        for (let i = 0; i < this.length * this.length; ++i) {
            numbers.push(i + 1);
        }

        Util.shuffle(numbers);

        for (let i = 0; i < numbers.length; ++i) {
            let x = i % this.length;
            let y = (i - x) / this.length;
            let cell =  this.getCell(x, y);
            
            if (numbers[i] != this.length * this.length) {
                cell.innerText = numbers[i];
                cell.classList = [];
            } else {
                cell.innerText = '';
                cell.classList.add('empty');
            }
        }
    }

    getCell(x, y) {
        return this.table_html.childNodes[y].childNodes[x];
    }

    isVictory() {
        for (let i = 0; i < this.length; ++i) {
            for (let j = 0; j < this.length; ++j) {
                let cell = this.getCell(j, i);
                if (i == this.length - 1 && j == this.length - 1) {
                    if (cell.innerText != '') {
                        return false;
                    }
                } else {
                    let index = j + this.length * i + 1;
                    if (cell.innerText != index) {
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

    static getNeighbors(grid, element) {
        let dx = [-1, 0, 1,  0];
        let dy = [ 0, 1, 0, -1];
        let neighbors = []
        let indexes = this.getIndexes(element);

        for (let i = 0; i < dx.length; ++i) {
            let x = indexes['x'] + dx[i];
            let y = indexes['y'] + dy[i];
            if ((0 <= x && x < grid.length) && (0 <= y && y < grid.length)) {
                neighbors.push(
                    grid.getCell(x, y)
                );
            }
        }

        return neighbors;
    }

}

class CellClickListener {

    constructor(grid) {
        this.grid = grid;
    }

    action(event) {
        let neighbors = Grid.getNeighbors(grid, event.target);
        for (let i = 0; i < neighbors.length; ++i) {
            if (neighbors[i].classList.contains('empty')) {
                Util.swapNodes(event.target, neighbors[i]);
            }
        }
        if (grid.isVictory()) {
            alert("WIN");
        }
    }
}

/*
 *
 */

let grid = (new Grid(4, document.getElementById('game')));
grid.render();

document.getElementById('game-btn-shuffle').onclick = ((event) => {
    grid.shuffle();
})