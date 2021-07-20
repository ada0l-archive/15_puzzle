let game_grid_array = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];

var game_grid_html = document.getElementById('game');

function init() {
    for (let i = 0; i < game_grid_array.length; ++i) {
        let row = document.createElement('tr');
        for (let j = 0; j < game_grid_array[i].length; ++j) {
            let cur_block = document.createElement('td');
            cur_block.addEventListener('click', click_element);
            if (game_grid_array[i][j] != -1) {
                cur_block.innerText = game_grid_array[i][j];
            } else {
                cur_block.classList.add('empty');
            }
            
            row.appendChild(cur_block)
        }
        game_grid_html.appendChild(row);
    }
}

function get_element_for_change(elem) {
    let all_candidates = [
        elem.previousSibling, 
        elem.nextSibling
    ];
    function get_element_from_row(elem, index) {
        if (elem == null || elem == undefined || elem.nodeName == 'TD') {
            return null;
        }
        return elem.childNodes[index];
    }
    all_candidates.push(get_element_from_row(elem.parentElement.previousSibling, elem.cellIndex));
    all_candidates.push(get_element_from_row(elem.parentElement.nextSibling, elem.cellIndex));
    for (let i = 0; i < all_candidates.length; ++i) {
        if (all_candidates[i] == null) continue;
        if (all_candidates[i] == undefined) continue;
        if (!all_candidates[i].classList.contains('empty')) continue;
        return all_candidates[i];
    }
    return null;
}

function swapNodes(n1, n2) {
    var p1 = n1.parentNode;
    var p2 = n2.parentNode;
    var i1, i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
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

function click_element(event) {
    element_for_change = get_element_for_change(event.target);
    if (element_for_change == null) return;
    swapNodes(event.target, element_for_change);
}

init()

