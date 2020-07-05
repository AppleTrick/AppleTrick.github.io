$('#send').on('click',clicksendbutton);

function clicksendbutton(){
	var newMessage = $('#new-message').val();

	console.log($('#new-message').val());
	if (newMessage != '') {
		$('.chatbox').append('<div class="my-bubble bubble">' + newMessage + '</div>');
		$('#newMessage').val('');
	}
	
}