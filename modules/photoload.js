let server_url;

export function init(url) {
	server_url = url;
}

export function loader(uri) {
	return axios.get(server_url+uri, {withCredentials:true});
}

export function addComment(uri, obj) {
	console.log(obj)
	return axios.post(server_url+uri, obj, {withCredentials:true});
}