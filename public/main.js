$(document).ready(function(){
	var state = {format: 'rdoc'}

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
		window.location.hash = format;
		return false;
	});

	$('#visual_output_btn').click(function(event){
		show_output_panel('visual_output');
	});

	$('#code_output_btn').click(function(event){
		show_output_panel('code_output');
	});


// ==  Utilities ==

	function load_settings_from_hash(){
		if(window.location.hash && window.location.hash.length > 0){
			state.format = window.location.hash.substr(1, 40);
		}
		select_format(state.format)
	}

	function select_format(format){
		state.format = format;
		$('#format_buttons .button').removeClass('selected');
		$('#format_buttons #' + format + '_btn').addClass('selected');
	}

	function show_output_panel(panel_id, immediate){
		$('.result_panel').each(function(i, panel){
			var action = panel_id == panel.id ? 'show' : 'hide';
			if(!immediate) action = {show:'fadeIn', hide: 'fadeOut'}[action];
			$(panel)[action]();
		});
	}
})
