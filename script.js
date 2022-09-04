var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0 , 9);
};

// function SudokuSolver(board, i, j) {
// 	// Write your Code here
// }
function isCorrect( board,  i, j,  val  , n) {
	// row check
	for (let c = 0; c < 9; c++) {
		if (board[i][c] == val) {
			return false;
		}
	}

	// Col Check
	for (let r = 0; r < 9; r++) {
		if (board[r][j] == val) {
			return false;
		}
	}

	// Box Check
	let si = i - i % 3;
	let sj = j - j % 3;

	for (let r = si; r < si + 3; r++) {
		for (let c = sj; c < sj + 3; c++) {
			if(board[r][c]==val)
				return false;
		}
	}

return true;
}

function SudokuSolver( board, i,  j , n) {

	//Base Case
	 if(i == n)
     {
        FillBoard(board)
        return true;
     }
	// some Checks

	if (j == n) {
		return SudokuSolver(board, i + 1, 0 , n);
	}

	if (board[i][j] != 0) {
		return SudokuSolver(board, i, j + 1 , n);   
	}

	for (let val = 1; val <= 9; val++) {
		if (isCorrect(board, i, j, val , n)) {
			board[i][j] = val;
			let ans = SudokuSolver(board, i, j + 1 , n);
			if (ans)
				return true;
			board[i][j] = 0;
		}
	}
	return false;
}
