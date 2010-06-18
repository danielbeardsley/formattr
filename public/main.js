$(document).ready(function(){
	$('#rdoc_btn').click(function(){
		$.post(
			'/rdoc',
			{input:$('#input').val()},
			function(data) {$('#results').html(data)}
		);
	});
})
