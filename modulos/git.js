

exports.dir = "";

exports.status  = function( retorno ){
	
	exec( 'cd ' + this.dir + '\n git status -s',function(error, stdout, stderr){
		retorno(stdout);		
	});	
}

exports.add = function( arquivo, retorno ){
		sys.puts(arquivo) 
	exec( 'cd ' + this.dir + '\n git add '+ arquivo ,function(error, stdout, stderr){
		retorno(stdout);		
	});	
}

exports.commit = function( titulo, msg, retorno ){
	exec( 'cd ' + this.dir + '\n git commit -m "'+ titulo + '\s\n' + msg + '"' ,function(error, stdout, stderr){
		retorno(stdout);	
		sys.puts(error) 

	});		
}


