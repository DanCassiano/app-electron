

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


exports.gitListContribuidores = function(retorno ){
	
	exec( 'git log --pretty=format:%an' ,{ cwd: this.dir},function(error, stdout, stderr){
		retorno(stdout);	
		puts( error, stdout, stderr );
		console.log( error, stdout, stderr)
	});		
}


exports.branchAtual = function(retorno){
	exec( 'git branch' ,{ cwd: this.dir},function(error, stdout, stderr){
		retorno(stdout);	
		puts( error, stdout, stderr );
		console.log( error, stdout, stderr)
	});	
}


exports.listaBranch = function(retorno){
	exec( 'git branch -a' ,{ cwd: this.dir},function(error, stdout, stderr){

		var b = stdout;
			b = b.toString("utf8");
			b = b.split(/\n/)
			b.pop()
		retorno(b);			
	});	
}