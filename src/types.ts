export interface tabItem {
	label: string,
	value: number,
}

export interface fileData {
	text: string,
	bytes: Uint8Array,
}

export interface GSMessageCountToken {
	'$type': 'GSMdtTools.GSMessageCountToken, GSMdtTools',
	MessageCount: number,
}

export interface GSOperationToken {
	'$type': 'GSMdtTools.GSOperationToken, GSMdtTools',
	Args: Array<number>,
	Name: string,
	Opcode: number,
}

export interface GSStringToken {
	'$type': 'GSMdtTools.GSStringToken, GSMdtTools',
	Content: string,
	Custom?: boolean,
}

export interface GSEndMessageToken {
	'$type': 'GSMdtTools.GSEndMessageToken, GSMdtTools',
	messageEnd: boolean,
}

export type GSSomething = GSMessageCountToken|
			GSOperationToken|
			GSStringToken|
			GSEndMessageToken;

export function isGSString(something: GSSomething): something is GSStringToken {
	return (something as GSStringToken).Content !== undefined;
}

export function isGSOperation(something: GSSomething): something is GSOperationToken {
	return (something as GSOperationToken).Args !== undefined;
}

export function isGSEndMessage(something: GSSomething): something is GSEndMessageToken {
	return (something as GSEndMessageToken).messageEnd !== undefined;
}

export function isGSMessageCount(something: GSSomething): something is GSMessageCountToken {
	return (something as GSMessageCountToken).MessageCount !== undefined;
}

declare global {
	interface Window { electron: any }
}
