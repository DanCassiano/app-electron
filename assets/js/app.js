

var remote 	 = require('remote');
var Menu 	 = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog   = remote.require('dialog'); 
window.$     = window.jQuery = require('./assets/js/jquery');

var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { 
	sys.puts(stdout) 
	console.log( stdout )
}

var git      = require("./modulos/git");

var menu = new Menu();
	menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
	menu.append(new MenuItem({ type: 'separator' }));
	menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));

window.addEventListener('contextmenu', function (e) {
  	e.preventDefault();
  	menu.popup(remote.getCurrentWindow());
}, false);


$(function(){
	$("body").on("click",".btn-menu",function(e){
		e.preventDefault();
		$("body").toggleClass("aberto");
		$(".titulo").toggle();	
		
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
	})	
})
