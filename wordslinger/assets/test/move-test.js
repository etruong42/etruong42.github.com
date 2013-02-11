buster.spec.expose();

var spec = describe("Wordslinger move", function () {
	before(function () {
		
		this.board = new Board({hands: []});
		this.move = new Move(/*{board: this.board}*/);

		this.addTileToMove = function(move, letter, points, x, y) {
			move.addTile(new Tile({
				letter: letter,
				points: points,
				position: {
					x: x,
					y: y
				}
			}));
		};
	});

	it("sequence of moves give correct scores", function () {
		var move = new Move(/*{board: this.board}*/);
		move.board = this.board;
		this.addTileToMove(move, "w", 4, 6, 7);
		this.addTileToMove(move, "i", 1, 7, 7);
		this.addTileToMove(move, "f", 4, 8, 7);
		this.addTileToMove(move, "e", 1, 9, 7);
		assert.equals(move.getTotalScore(), 20);
		buster.log("w-i-f-e gives 20 points");
		var numBoardTiles = this.board.get("tiles").length;
		this.board.addMove(move);
		assert.equals(numBoardTiles + move.length, this.board.get("tiles").length);

		move = new Move(/*{board: this.board}*/);
		move.board = this.board;
		this.addTileToMove(move, "d", 1, 7, 6);
		this.addTileToMove(move, "i", 1, 8, 6);
		this.addTileToMove(move, "l", 1, 9, 6);
		this.addTileToMove(move, "d", 1, 10, 6);
		this.addTileToMove(move, "o", 1, 11, 6);
		assert.equals(move.getTotalScore(), 16);
		buster.log("d-i-l-d-o gives 16 points");

		numBoardTiles = this.board.get("tiles").length;
		this.board.addMove(move);
		assert.equals(numBoardTiles + move.length, this.board.get("tiles").length);

		move = new Move(/*{board: this.board}*/);
		move.board = this.board;
		this.addTileToMove(move, "a", 1, 9, 5);
		this.addTileToMove(move, "o", 1, 10, 5);
		assert.equals(move.getTotalScore(), 11);
		buster.log("a-o gives 11 points");

		numBoardTiles = this.board.get("tiles").length;
		this.board.addMove(move);
		assert.equals(numBoardTiles + move.length, this.board.get("tiles").length);

		move = new Move(/*{board: this.board}*/);
		move.board = this.board;
		this.addTileToMove(move, "t", 1, 9, 4);
		this.addTileToMove(move, "a", 1, 10, 4);
		this.addTileToMove(move, "d", 1, 11, 4);
		assert.equals(move.getTotalScore(), 16);
		buster.log("t-a-d gives 16 points");

		numBoardTiles = this.board.get("tiles").length;
		this.board.addMove(move);
		assert.equals(numBoardTiles + move.length, this.board.get("tiles").length);
	});
});