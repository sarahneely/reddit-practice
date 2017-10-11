getReq('https://www.reddit.com/r/php/search.json?q=cats&limit=5', processAjax);

const newPosts = [];
function getReq(url, callback){
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function(){
        if(req.readyState === 4 && req.status === 200){
            callback(JSON.parse(req.responseText));
        }else{
            console.log('error', req.statusText);
        }
    }
    req.send(null);
}

function processAjax(object){
	const postList = getPostInfo(object);
	loadData();
}

function getPostInfo(postObject) {
	// We will explain the 'postData => {' syntax on Tuesday
	postObject.data.children.forEach(postData => {
		const post = { title: '', url: '' };

		postData = postData.data;
		post.title = postData.title;
		post.url = postData.url;
		newPosts.push(post);
	});

	return newPosts;
}

function loadData() {
	newPosts.forEach(post => {
		// Manipulate the data here!
     let pos = newPosts.indexOf(post) + 1;
     document.getElementById('post' + pos).innerHTML = post.title + " " +post.url;
	})
}

 console.log(newPosts);
