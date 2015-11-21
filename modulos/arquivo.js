

exports.getConfig =function( ) {

	return JSON.parse(fs.readFileSync("config.json", 'utf8'));
}

exports.setConfig = function( dado, valor ){
	// return 
}


exports.getOrigin = function( repo, retorno  ){

	fs.readdir( repo , function(err, files){

		files
		   	.map(function (file) {
        		return path.join(repo, file);
    		})
		   	.filter(function (file) {
        		return fs.statSync(file).isDirectory();
    		})
    		.forEach(function (file) {        
    			retorno(file )
        		// console.log("%s (%s)", file, path.extname(file));
    		})

  		files
  			.map(function (file) {
        		return path.join(repo, file);
    		})
    		.filter(function (file) {
        		return fs.statSync(file).isFile();
    		})
    		.forEach(function (file) {        
    			retorno(file )
        		// console.log("%s (%s)", file, path.extname(file));
    		});
	});
    	
}