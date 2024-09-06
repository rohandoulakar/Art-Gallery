const init = () => {
	setSearchHandler();
	getArts('');
};

//Event listner for the search button
const setSearchHandler = () => {
	const button = document.getElementById('search-button');
	button.addEventListener('click', handleSearch);
};

//Will show the relevent artwork based on the search input
const handleSearch = () => {
	const query = document.getElementById('search-query').value;
	getArts(query);
};

const getArts = (searchQuery) => {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		//Do your Async thing
		if (this.readyState == 4) {
			if (this.status === 200) {
				const data = JSON.parse(this.responseText);
				renderArts(data.arts);
			} else {
				alert('There is some error');
			}
		}
	};

	//Post request
	xhttp.open('get', `/gallery/all?query=${searchQuery}&page=1`, true); //API .open(METHOD, URL)
	xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.setRequestHeader('accept', 'application/json');
	xhttp.send();
};

//Function to output the artworks based on the user search
const renderArts = (arts) => {
	let tableHtml = '';
	arts.forEach((art) => {
		tableHtml += `
            <tr>
                <td>
                    <img style="height: 256px" src="${art.image}"></img>
                </td>
                <td>
                    <div style="margin-left:10px">
                        <p><b>Name: </b>${art.name}</p>
                        <p><b>Artist: </b>${art.artist.username}</p>
                        <p><b>Year: </b>${art.year}</p>
                        <p><b>Category: </b>${art.category}</p>
                        <p><b>Medium: </b>${art.medium}</p>
                        <p><b>Description: </b>${art.description}</p>
                        <p><b>Likes: </b>${art.likes}</p>
						<p><a href="/gallery/reviews/${art._id}">Show Reviews</a> <a href="/gallery/review/add/${art._id}">Add Review</a></p>
						<p><a href="#" onclick="likeArt('${art._id}')">Like</a></p>
                    </div>
                </td>
            </tr>
        `;
	});
	document.getElementById(
		'content'
	).innerHTML = `<table>${tableHtml}</table>`;
};

const likeArt = (artId, liked) => {
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
	xhttp.open('post', `/gallery/like/${artId}`, true); //API .open(METHOD, URL)
	xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.setRequestHeader('accept', 'application/json');
	xhttp.send(
		JSON.stringify({
			liked,
		})
	);
};

init();
