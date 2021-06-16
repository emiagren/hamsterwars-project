import { atom } from 'recoil';

const loadingHamsters = atom ({
	key: 'loadingHamsters',
	default: true
})

const hamstersAtom = atom ({
	key: 'hamstersAtom',
	default: [
		{	"id": "fVh2ESv2NtpcsY2FbrPJ",
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

const matchesAtom = atom ({
	key: 'matchesAtom',
	default: [
		{	"id": "fVh2ESv2NtpcsY2FbrPJ",
			"winnerId": "kopöilkuyyygkjhköpoi",
			"loserId": "opöilukyhtersghdjfgkyul",
		}
	]
});

export { loadingHamsters, hamstersAtom, matchesAtom };