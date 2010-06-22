$(document).ready(function(){
	var state = {format: 'rdoc', results: 'visual'}

	var formats = {
		'rdoc': {button: 'rdoc_btn', response_format: 'html'},
		'sass': {button: 'sass_btn', response_format: 'css'}
	}


	load_settings_from_hash();



// ==  Event Handlers  ==

	$('#go_btn').click(function(){
		$.post(
			'/' + state.format,
			{input:$('#input').val()},
			function(data) {
				$('#code_output').text(data)
				$('#visual_output').html(data)
			}
		);
	});


	$('#format_buttons .button').click(function(event){
		var format;
		for(format in formats)
			if(formats[format] && formats[format].button == event.target.id) break;

		select_format(format);
		save_settings_to_hash();

		return false;
	});

	$('#output_view_buttons .button').click(function(event){
		show_output_panel(event.target.id.split('_')[0]);
		save_settings_to_hash();
	});


// ==  Utilities ==

	function load_settings_from_hash(){
		if(window.location.hash && window.location.hash.length > 0){
			var pairs = window.location.hash.substr(1).split('&');
			for(var i=0,l=pairs.length; i<l; i++){
				var key_value = pairs[i].split('=');
				state[key_value[0]] = key_value[1];
			}
		}
		select_format(state.format)
		show_output_panel(state.results);
	}

	function save_settings_to_hash(){
		var pairs = [];
		for(var k in state){
			pairs.push([k, state[k]].join('='));
		}
		window.location.hash = pairs.join('&');
	}


	function select_format(format){
		state.format = format;
		select_button(format + '_btn')
	}

	function select_button(button){
		$('#' + button).siblings().removeClass('selected');
		$('#' + button).addClass('selected');
	}


	function show_output_panel(panel_id, immediate){
		state.results = panel_id;
		panel_id += '_output';
		select_button(panel_id + '_btn');
		$('.result_panel').each(function(i, panel){
			var action = panel_id == panel.id ? 'show' : 'hide';
			if(!immediate) action = {show:'fadeIn', hide: 'fadeOut'}[action];
			$(panel)[action]();
		});
	}
})
