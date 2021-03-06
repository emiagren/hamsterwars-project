interface HamsterObject {
	id: string,
	name: string,
	age: number,
	favFood: string,
	loves: string,
	imgName: string,
	games: number,
	wins: number,
	defeats: number
}

interface NewHamsterObject {
	name: string,
	age: number,
	favFood: string,
	loves: string,
	imgName: string,
	games: number,
	wins: number,
	defeats: number
}

interface HamsterResponse {
	hamster: null | HamsterObject;
}

interface PostResponse {
	id: string
}

export type { 
	HamsterObject, 
	NewHamsterObject, 
	HamsterResponse, 
	PostResponse
};