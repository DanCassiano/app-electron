

var remote 	 = require('remote');
var Menu 	 = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog   = remote.require('dialog'); 
window.$     = window.jQuery = require('./assets/js/jquery');
var fs 		 = require("fs");
var sys 	 = require('sys');
var exec 	 = require('child_process').exec;
var config 	 = require('./modulos/arquivo');

function puts(error, stdout, stderr) { 
	sys.puts(stdout) 
	console.log( stdout )
}
var git      = require("./modulos/git");

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
			else
				$(".check-file").prop("checked",false)
		})

	cerragaRepo();

	$("#repoAtuais").on("click","li a",function(e){
		e.preventDefault();
		status( $(this).attr("href") );
	});
})

function cerragaRepo()
{
	var html = "";

	$.each(config.getConfig()['projetos'],function(i,v){
		
		$.each(v,function(d,e){
			html += "<li><a href='"+e+"'>"+d+"</a></li>";
		})
	});
	$("#repoAtuais").html( html )

}

function status( local ){

	git.dir = local;
	git.status(function(r){			

		r = r.split('\n');
		arrayReplace =  { "M ": "zmdi-flip-to-back", "??": "zmdi-chart-donut" };
		
		html = '<li class="tile ui-sortable-handle">'+
					'<a class="tile-content ink-reaction">'+
						'<div class="tile-icon">'+
							'<input type="checkbox" id="inputTodos">'+									
						'</div>'+
						'<div class="tile-text text-left"></div>'+
					'</a>'+
				'</li>';

		$.each(r,function(i,v){
			v = v.trim();
			if( v != "" ) {
				
				html += '<li class="tile ui-sortable-handle">'+
							'<a class="tile-content ink-reaction">'+
								'<div class="tile-icon">'+
									'<input type="checkbox" class="check-file">'+									
								'</div>'+
								'<div class="tile-text text-left">'+
									v.replace(/M |\?\?/gi,'') +
								'</div>'+
								'<div class="tile-icon">'+
									'<i class="zmdi ' + arrayReplace[ v.substr(0,2) ] +	'" ></i>'+
								'</div>'+
							'</a>'+
						'</li>';
				}
		});
		$(".list").html( html );
	})
}