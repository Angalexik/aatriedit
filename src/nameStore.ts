import { writable } from 'svelte/store';

export type NameDict = {
	[index: number]: [string, string]
}

// index: [original, localised]
const nameDict: NameDict = {
	0: ['', ''], // Without name
	512: ['Phoenix', 'Phoenix'],
	13: ['Phoenix', 'Phoenix'], // Used when Phoenix accuses Sahwit
	1792: ['Mia', 'Mia'],
	6400: ['Butz', 'Butz'],
	2048: ['Judge', 'Judge'],
	2560: ['Payne', 'Payne'],
	256: ['???', '???'],
	3840: ['???', '???'], // Used in Maya’s phone call
	6656: ['Sahwit', 'Sahwit'],
	3328: ['Cellular', 'Cellular'],
	1024: ['Maya', 'Maya'],
	5120: ['Gumshoe', 'Gumshoe'],
	768: ['Police', 'Police'],
	5632: ['April', 'April'],
	5888: ['Bellboy', 'Bellboy'],
	3072: ['Grossberg', 'Grossberg'],
	2304: ['Edgeworth', 'Edgeworth'],
	5376: ['White', 'White'],
	2816: ['Interphone', 'Interphone'],
	4864: ['TV', 'TV'],
	6912: ['Will', 'Will'],
	4352: ['Oldbag', 'Oldbag'],
	4096: ['Penny', 'Penny'],
	4608: ['Manella', 'Manella'],
	7168: ['Cody', 'Cody'],
	6144: ['Vasquez', 'Vasquez'],
	7936: ['Lotta', 'Lotta'],
	11008: ['Chief', 'Chief'],
	8448: ['von Karma', 'von Karma'],
	8960: ['Missile', 'Missile'],
	8704: ['Polly', 'Polly'],
	9216: ['Caretaker', 'Caretaker'],
	9472: ['Guard', 'Guard'],
	8192: ['Yogi', 'Yogi'],
};

let stored: NameDict;

if (localStorage.names !== undefined) {
	stored = JSON.parse(localStorage.names);
} else {
	stored = nameDict;
}

export const names = writable(stored);
names.subscribe((val) => { localStorage.names = JSON.stringify(val); });
