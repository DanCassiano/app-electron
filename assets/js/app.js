

var remote 	 = require('remote');
var Menu 	 = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog   = remote.require('dialog'); 
window.$     = window.jQuery = require('./assets/js/jquery');
var fs 		 = require("fs");
var path 	 = require("path");
var sys 	 = require('sys');
var exec 	 = require('child_process').exec;
var config 	 = require('./modulos/arquivo');
var git      = require("./modulos/git");
require('./assets/js/ace/ace')


function puts(error, stdout, stderr) { 
	sys.puts(stdout) 	
}

var menu = new Menu();
	
	menu.append(new MenuItem({ type: 'separator' }));
	menu.append(new MenuItem({ label: 'Sobre', click: function(){
				dialog.showMessageBox({ title: "Opa!", detail: "Mensagem" ,message: "Codigos por:\n\n\n DanCassiano", type: 'question', buttons: ["OK"] } )
			}
		})
	);

window.addEventListener('contextmenu', function (e) {
  	e.preventDefault();
  	menu.popup(remote.getCurrentWindow());
}, false);


$(function(){


	$("body")
		.on("click",".btn-menu",function(e){
			e.preventDefault();
			$("body").toggleClass("aberto");		
		})
		.on("click","#inputTodos",function(){
			if( $(this).prop("checked") == true ) {
				$(".check-file").prop("checked",true)
				$(".card-form").show();
			}
			else{
				$(".check-file").prop("checked",false)
				$(".card-form").hide();
			}
		})
		.on("click","#btnAdicionarArquivos",function(){			
			$("input.check-file:checked").each(function(i,v){

				git.add( $(v).val(), function(r){
					// console.log( r )
				});
			})
		})
		.on("click","#btnComitar",function(e){
			e.preventDefault()
			var titulo = $("#inputTitulo").val(),
				msg    = $("#txtMsg").val();

				git.commit(titulo, msg, function(r){
					// console.log(r)
				})
		})

	cerragaRepo();

	$("#repoAtuais")
		.on("click","li a",function(e){
			e.preventDefault();
			status( $(this).attr("href") );
			$(this).addClass("ativo");
		});

    	$("#editor").html( fs.readFileSync("app.js", 'utf8') )
	var editor = ace.edit("editor");
		ace.config.set('basePath', './assets/js/ace/');
		editor.getSession().setUseWorker(false);
	 	editor.setTheme("ace/theme/monokai");
    	editor.session.setMode("ace/theme/javascript");

    	


})

function cerragaRepo()
{
	var html = "";

	$.each(config.getConfig()['projetos'],function(i,v){
		
		$.each(v,function(d,e){
			html += "<li><a href='"+e+"'>"+d+"</a></li>";
		})
	});
	
	$("#repoAtuais").html( html );

	//pegando o primeiro repositorio
	git.dir =$("#repoAtuais li:first-child a").attr("href");	

	git.listaBranch(function(r){
			// console.log( r)
			var b = r,
				html = "";
			$.each(b,function(i,v){
				var atual = "";
				if( v.charAt(0) == "*"){
					atual = "disabled";
					$("#dLabel").html(v.replace("*","")+ "<span class='caret'></span>")
				}

				html += "<li class='"+atual+"'><a href='#'>"+ v.replace("*","") +"</a></li>";
			})
		$("#listaBranchs").html( html )
		$("#tituloRepo").html( $("#repoAtuais li:first-child a").text() )
	});

	// carregaOrigin( git.dir );
}

function status( local ){

	git.dir = local;
	git.status(function(r){			

		r = r.split('\n');
		arrayReplace =  { "M ": "zmdi-flip-to-back", "??": "zmdi-chart-donut", " M":"zmdi-comment-more" };
		
		html = '<li class="tile ui-sortable-handle">'+
					'<a class="tile-content ink-reaction">'+
						'<div class="tile-icon">'+
							'<input type="checkbox" id="inputTodos">'+									
						'</div>'+
						'<div class="tile-text text-left"></div>'+
					'</a>'+
				'</li>';

		$.each(r,function(i,v){
			
			if( v != "" ) {
				arquivo = v.replace(/M |\?\?/gi,'');

				html += '<li class="tile ">'+
							'<a class="tile-content ink-reaction">'+
								'<div class="tile-icon">'+
									'<input type="checkbox" class="check-file" value="'+ arquivo +'" >'+									
								'</div>'+
								'<div class="tile-text text-left">'+
									arquivo +
								'</div>'+
								'<div class="tile-icon">'+
									'<i class="zmdi ' + arrayReplace[ v.substr(0,2) ] +	'" ></i>'+
								'</div>'+
							'</a>'+
						'</li>';
				}
		});
		$("#listaArquivosGit").html( html );
	})
}

function carregaOrigin( repo )
{
	var html     = "";
		arquivos = [];
		pastas   = [];
		a = [];

	config.getOrigin( repo,function(r){		

		var icone = "<i class='zmdi zmdi-file'></i>";
		
		if( path.basename(r)!= ".git") {		

			if( path.extname(r ) == "" )
				icone = "<i class='zmdi zmdi-folder-star'></i>";			

			$("#listaOrigin")
				.append( "<li class='tile '>"+
							"<a class='tile-content ink-reaction'>"+
								"<div class='tile-icon'>"+
									icone+
								"</div>"+
								"<div class='tile-text text-left'>"+ 
									path.basename(r)+
								"</div>"+
							"</a>"+
						"</li>" );
		}
			
	});
		
}