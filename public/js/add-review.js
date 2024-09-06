let artId = "";

const init = ()=>{
	console.log("test");
    artId = window.location.href.split("/").pop();
    setButtonHandler();
}

//Event listner for the add review button
const setButtonHandler = ()=>{
    const button = document.getElementById("review-button");
    button.addEventListener("click",handleButton);
}

const handleButton = ()=>{
    const review = document.getElementById("review").value;
    let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		//Do your Async thing
		if (this.readyState == 4) {
			if (this.status === 200) {
				const data = JSON.parse(this.responseText);
				window.alert(data.message);
			} else {
				alert('There is some error');
			}
		}
	};

	// Post request
	xhttp.open('post', `/gallery/review/add`, true); //API .open(METHOD, URL)
	xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.setRequestHeader('accept', 'application/json');
	xhttp.send(
		//Will send the review information to the correct artId
		JSON.stringify({
			review,
            artId
		})
	);
}

init();