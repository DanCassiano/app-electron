

exports.dir = "";

exports.status  = function( retorno ){
	
	exec( 'cd ' + this.dir + '\n git status -s',function(error, stdout, stderr){
		retorno(stdout);		
	});	
}


