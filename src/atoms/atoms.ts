import { atom } from 'recoil';

const hamstersAtom = atom ({
	key: 'hamstersAtom',
	default: [
		{	"dbId": "fVh2ESv2NtpcsY2FbrPJ",
			"name": "Sixten",
			"age": 1,
			"favFood": "ostbollar",
			"loves": "springa i hamsterhjulet",
			"imgName": "hamster-1.jpg",
			"games": 0,
			"wins": 0,
			"defeats": 0
		}
	]
});

export { hamstersAtom };