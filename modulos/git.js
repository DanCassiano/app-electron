


exports.status  = function( retorno ){
	exec('git status -s',function(error, stdout, stderr){
		retorno(stdout);
	});	
}


