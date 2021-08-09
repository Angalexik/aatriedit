// import { ipcRenderer } from 'electron';

// export function fetchDecodeEncode(decode: boolean, data: string, format: string): Promise<Response> {
// 	const method = decode ? 'decode' : 'encode';
// 	const body = decode ? { 'base64': data } : { 'json': data };

// 	return fetch(`http://127.0.0.1:8079/api/${format}/${method}`, {
// 		method: 'POST',
// 		mode: 'cors',
// 		body: JSON.stringify(body),
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json',
// 		}
// 	});
// }

export function fetchDecodeEncode(decode: boolean, data: string, format: 'text' | 'lines' | 'mdt'): string {
	const method = decode ? 'Decode' : 'Encode';
	return window.electron.ipc.sendSync('decode', format + method, data);
}
