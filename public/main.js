$(document).ready(function(){
	var convert_input = function(url){
		return function(){
			alert('doin it.');
			$.post(
				url,
				{input:$('#input').val()},
				function(data) {$('#results').html(data)}
			);
		}
	}

	$('#rdoc_btn').click(convert_input('/rdoc'));
	$('#sass_btn').click(convert_input('/sass'));
})
