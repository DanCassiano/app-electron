

exports.getConfig =function( ) {

	return JSON.parse(fs.readFileSync("config.json", 'utf8'));
}

exports.setConfig = function( dado, valor ){
	// return 
}