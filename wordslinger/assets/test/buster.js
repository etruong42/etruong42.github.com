var config = module.exports;

config["My tests"] = {
    env: "browser",        // or "node"
    rootPath: "../",
    sources: [
        "js/vendor/jquery-1.8.2.js",
		"js/vendor/underscore.js",
		"js/jst.js",
		"js/vendor/ui/jquery-ui.custom.js",
		"js/vendor/backbone.js",
		"js/models/Tile.js",
		"js/models/HandSlot.js",
		"js/models/Hand.js",
		"js/models/TileSlot.js",
		"js/models/Board.js",
		"js/models/Grabbag.js",
		"js/models/Move.js",
		"js/models/WordslingerGame.js"
    ],
    tests: [
        "test/*-test.js"
    ]
};