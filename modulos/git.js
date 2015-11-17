

exports.dir = "";

exports.status  = function( retorno ){
	
	exec( ' git status -s' , {cwd: this.dir },function(error, stdout, stderr){	
		retorno(stdout)
	});	
}

exports.add = function( arquivo, retorno ){
		sys.puts(arquivo) 
	exec( 'git add '+ arquivo,{ cwd: this.dir} ,function(error, stdout, stderr){
		retorno(stdout);		
	});	
}

exports.commit = function( titulo, msg, retorno ){
	exec(' git commit -m "'+ titulo + '\s\n' + msg + '"' ,{ cwd: this.dir},function(error, stdout, stderr){
		retorno(stdout);	
		sys.puts(error) 

	});		
}


