export function fetchDecodeEncode(decode: boolean, data: string, format: string): Promise<Response> {
	const method = decode ? 'decode' : 'encode';
	const body = decode ? { 'base64': data } : { 'json': data };

	return fetch(`http://10.0.1.33:8079/api/${format}/${method}`, {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	});
}
