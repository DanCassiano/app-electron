

var remote 	 = require('remote');
var Menu 	 = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog   = remote.require('dialog'); 
window.$     = window.jQuery = require('./assets/js/jquery');

var fs = require("fs");

var sys = require('sys');
var exec = require('child_process').exec;

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
	$("body").on("click",".btn-menu",function(e){
		e.preventDefault();
		$("body").toggleClass("aberto");		
	})	

	git.status(function(r){			

			r = r.split('\n');
			html = "";
			arrayReplace =  { "M ": "zmdi-flip-to-back", "??": "zmdi-chart-donut" };
			$.each(r,function(i,v){
				v = v.trim();
				if( v != "" ) {
				
				html += '<li class="tile ui-sortable-handle">'+
							'<a class="tile-content ink-reaction">'+
								'<div class="tile-icon">'+
									'<input type="checkbox">'+									
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

	
	fs.readdir("../", function(err, files){
  		console.log(files);
	});
})
