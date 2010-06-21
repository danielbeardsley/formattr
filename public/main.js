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
				$('#results').html(data)
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
})
