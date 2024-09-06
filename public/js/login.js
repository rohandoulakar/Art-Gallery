let isLogin = false;

const init = () => {
	if (window.location.href.split('/').pop() == 'signup') isLogin = false;
	else isLogin = true;

	console.log('isLogin', isLogin);
	setHandleButton();
};

//Login button event listner
const setHandleButton = () => {
	// get button
	const button = document.getElementById('submit-button');
	button.addEventListener('click', handleButton);
};

const handleButton = () => {
	// get username and password
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	if (!username || !password) {
		window.alert('Username or password invalid');
		return;
	}

	if (isLogin) {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//Do your Async thing
			if (this.readyState == 4) {
				if (this.status === 200) {
					const data = JSON.parse(this.responseText);
					alert(data.message);
					window.location.href = `/user/${data.userId}`;
				} else if (this.status == 400) {
					const data = JSON.parse(this.responseText);
					alert(data.message);
				} else {
					alert('There is some error');
				}
			}
		};

		//Post request
		xhttp.open('POST', '/user/login', true); //API .open(METHOD, URL)
		xhttp.setRequestHeader('Content-type', 'application/json');
		xhttp.setRequestHeader('accept', 'application/json');
		
		//Will send the username and password information
		xhttp.send(
			JSON.stringify({
				username,
				password,
			})
		);
	} else {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//Do your Async thing
			if (this.readyState == 4) {
				if (this.status === 200) {
					const data = JSON.parse(this.responseText);
					alert(data.message);
					window.location.href = `/`;
				} else {
					alert('There is some error');
				}
			}
		};

		//Post request
		xhttp.open('POST', '/user/create', true); //API .open(METHOD, URL)
		xhttp.setRequestHeader('Content-type', 'application/json');
		xhttp.setRequestHeader('accept', 'application/json');
		xhttp.send(
			JSON.stringify({
				username,
				password,
			})
		);
	}
};

init();
