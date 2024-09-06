const init = () => {
	setButtonHandler();
};

//Event listner for the submit button
const setButtonHandler = () => {
	const button = document.getElementById('submit-button');
	button.addEventListener('click', submitHandler);
};

const submitHandler = () => {
	const name = document.getElementById('name').value;
	const year = document.getElementById('year').value;
	const category = document.getElementById('category').value;
	const medium = document.getElementById('medium').value;
	const description = document.getElementById('description').value;
	const imageUrl = document.getElementById('image').value;

	//If any of the fields are missing
	if (!(name && year && category && medium && description && imageUrl)) {
		window.alert('Some fields are missing');
		return;
	}

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		//Do your Async thing
		if (this.readyState == 4) {
			const data = JSON.parse(this.responseText);
			if (this.status === 200) {
				alert(data.message);
			} else if (this.status == 409) {
				alert(data.message);
				window.location.href = '/gallery/add';
			} else {
				alert('There is some error');
			}
		}
	};

	//Post request
	xhttp.open('POST', '/gallery/art', true); //API .open(METHOD, URL)
	xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.setRequestHeader('accept', 'application/json');
	
	//Will send the new artwork information
	xhttp.send(
		JSON.stringify({
			name,
			year,
			category,
			medium,
			description,
			image: imageUrl,
		})
	);
};

init();
