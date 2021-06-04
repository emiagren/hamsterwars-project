import { useState, useRef } from 'react';
import { ModalProps } from '../../types/ModalInterface';
import { NewHamsterObject, HamsterFormInput, PostResponse, HamsterObject } from '../../types/HamsterInterface';
import './HamsterModal.css';
import './HamsterForm.css';
import { idText } from 'typescript';
import { Agent } from 'http';

const HamsterForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {

	const [inputName, setInputName] = useState("");
	const [nameInputError, setNameInputError] = useState("");
	// const [inputNameTouched, setInputNameTouched] = useState(false);

	const [inputAge, setInputAge] = useState("");
	const [ageInputError, setAgeInputError] = useState("");
	// const [inputAgeTouched, setInputAgeTouched] = useState(false);

	const [inputFood, setInputFood] = useState("");
	const [foodInputError, setFoodInputError] = useState("");
	// const [inputFoodTouched, setInputFoodTouched] = useState(false);

	const [inputLoves, setInputLoves] = useState("");
	const [lovesInputError, setLovesInputError] = useState("");
	// const [inputLovesTouched, setInputLovesTouched] = useState(false);

	const [inputImg, setInputImg] = useState("");
	const [imgInputError, setImgInputError] = useState("");
	// const [inputImgTouched, setInputImgTouched] = useState(false);

	const newId = "";

	function validTextInput(text:string) {
		const letters = /^[A-Za-z]+$/;
		if(!letters.test(text)) return false;
		return true;
	}

	function validTextLength(text:string) {
		if(text.length > 40) return false;
		return true;
	}

	function validName(event:any) {
		const name = event.target.value;
		let validText = validTextInput(name);
		let validLength = validTextLength(name);
		if(name.length < 2) return setNameInputError("The name has to contain at least two letters.");
		if(!validText) return setNameInputError("Text can only contain letters.");
		if(!validLength) return setNameInputError("Text is to long. Maximum is 40 characters.");
		setAgeInputError("");
		setInputName(name);
		validateForm();
	}

	function validAge(event:any) {
		const age = event.target.value;
		const validChars = "0123456789";
		if(age.length === 0 || !inputAge.split("").every(char => validChars.includes(char))) {
			return setAgeInputError("Please enter your hamsters age in numbers");
		}
		setAgeInputError("");
		setInputAge(age);
		validateForm();
	}

	function validFood(event:any) {
		const favFood = event.target.value;
		let validText = validTextInput(favFood);
		let validLength = validTextLength(favFood);
		if(favFood.length < 2) return setFoodInputError("Please enter what food your hamster loves ( min two letters).");
		if(!validText) return setNameInputError("Text can only contain letters.");
		if(!validLength) return setNameInputError("Text is to long. Maximum is 40 characters.");
		setFoodInputError("");
		setInputFood(favFood);
		validateForm();
	}

	function validLoves(event:any) {
		const loves = event.target.value;
		let validText = validTextInput(loves);
		let validLength = validTextLength(loves);
		if(loves.length < 2) return setLovesInputError("Please enter what your hamster loves ( min two letters).");
		if(!validText) return setNameInputError("Text can only contain letters.");
		if(!validLength) return setNameInputError("Text is to long. Maximum is 40 characters.");
		setLovesInputError("");
		setInputLoves(loves);
		validateForm();
	}

	function validImg(event:any) {
		const imgName = event.target.value;
		let validLength = validTextLength(imgName)
		if(imgName.length === 0 || !imgName.endsWith(".jpg")) return setImgInputError("Please enter a valid URL.");
		if(!validLength) return setNameInputError("URL is to long. Maximum is 40 characters.");
		setImgInputError("");
		setInputImg(imgName);
		validateForm();
	}
	
	const [formValid, setFormValid] = useState(false);
	function validateForm() {
		const errors = (inputName === "" || inputAge === "" || inputFood === "" || inputLoves === ""
		|| inputImg === "")

		if(!errors) {
			return setFormValid(true);
		}
		
		return setFormValid(false);
	}

	async function addHamster() {

		let newHamster: HamsterObject = {
			dbId: newId,
			name: inputName,
			age: Number(inputAge),
			favFood: inputFood,
			loves: inputLoves,
			imgName: inputImg,
			games: 0,
			wins: 0,
			defeats: 0
		}

		try{
			
		const response = await fetch('/hamsters', {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(newHamster)});
			
			if(response.status === 200 ) {
				const data = await response.json();
				console.log(data);
			}
		} catch(error) {
			console.log(error);
		}
	}

	const overlayRef = useRef(null);
	const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (e.target === overlayRef.current) {
			onClose();
		}
	}

	return isOpen ? (
		<div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
			<div className="modal-box">
				<div className="hamster-form-container">
					<h1>Add your hamster</h1>
					<div className="hamster-form">

						<label htmlFor="name"> Name:
						<input
						type="text" 
						name="name" 
						onBlur={validName}
						value={inputName} 
						onChange={e=> {console.log(e.target.value); setInputName(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{nameInputError}</div>
						
						<label htmlFor="age"> Age: 
						<input
						type="text" 
						name="age" 
						onBlur={validAge}
						value={inputAge} 
						onChange={e=> {console.log(e.target.value);setInputAge(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{ageInputError}</div>

						<label htmlFor="favFood"> Favorite food: 
						<input
						type="text" 
						name="favFood" 
						onBlur={validFood}
						value={inputFood} 
						onChange={e=> {console.log(e.target.value); setInputFood(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{foodInputError}</div>
						
						<label htmlFor="Loves"> Loves:
						<input
						type="text" 
						name="loves" 
						onBlur={validLoves}
						value={inputLoves} 
						onChange={e=> {console.log(e.target.value); setInputLoves(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{lovesInputError}</div>
						
						<label htmlFor="imgName"> Upload image (url): 
						<input
						type="text" 
						name="imgName" 
						onBlur={validImg}
						value={inputImg} 
						onChange={e=> {console.log(e.target.value); setInputImg(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{imgInputError}</div>

						<div>
							<img src={inputImg} alt="Super cute hamster" 
							width="100%" height="auto" />
						</div>
						
					</div>

					<div className="buttons">
						{formValid ?
						<button onClick={() => addHamster()}> Submit </button> :
						<button> Submit </button>
						}
						<button onClick={onClose}> Cancel </button>
					</div>

				</div>
			</div>
		</div>
	): null;
}

// const [updateHamsters, setUpdateHamsters] = useState<undefined | PostResponse>(undefined);
// const [postHamsterResponse, setPostHamsterResponse] = useState(false);

// const [newHamster, setNewHamster] = useState<NewHamsterObject>({
// 	name: "",
// 	age: 0,
// 	favFood: "",
// 	loves: "",
// 	imgName: "",
// 	games: 0,
// 	wins: 0,
// 	defeats: 0
// })

// const updateInput = ({target: {name, value} }: HamsterFormInput ) => {
// 	setNewHamster({
// 		...newHamster, [name]: value
// 	});
// }

// console.log(newHamster.name, newHamster.age,
// 	newHamster.favFood, newHamster.loves, newHamster.imgName);

// async function postHamster() {

// 	try{
		
// 	const response = await fetch('/hamsters', {method: 'POST', headers: {
// 		'Content-type': 'application/json'}, body: JSON.stringify(newHamster)});
		
// 		if(response.status === 200 ) {
// 			const data = await response.json();
// 			console.log(data);
// 			setUpdateHamsters(data); 
// 		}
// 	} catch(error) {
// 		console.log(error);
// 	}
// }

// const overlayRef = useRef(null);
// const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
// 	if (e.target === overlayRef.current) {
// 		onClose();
// 	}
// }

// return isOpen ? (
// 	<div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
// 		<div className="modal-box">
// 			<div className="hamster-form-container">
// 				<h1>Add your hamster</h1>
// 				<div className="hamster-form">

// 					<label htmlFor="name"> Name:
// 					<input 
// 					type="text" 
// 					name="name" 
// 					value={newHamster.name} 
// 					onChange={updateInput}/>
// 					</label>
					
// 					<label htmlFor="age"> Age: 
// 					<input 
// 					type="text" 
// 					name="age" 
// 					value={newHamster.age} 
// 					onChange={updateInput}/>
// 					</label>
					
// 					<label htmlFor="favFood"> Favorite food: 
// 					<input 
// 					type="text" 
// 					name="favFood" 
// 					value={newHamster.favFood} 
// 					onChange={updateInput}/>
// 					</label>
					
// 					<label htmlFor="Loves"> Loves:
// 					<input 
// 					type="text" 
// 					name="loves" 
// 					value={newHamster.loves} 
// 					onChange={updateInput}/>
// 					</label>
					
// 					<label htmlFor="imgName"> Upload image (url): 
// 					<input
// 					type="text" 
// 					name="imgName" 
// 					value={newHamster.imgName} 
// 					onChange={updateInput}/>
// 					</label>

// 					<div>
// 						<img src={newHamster.imgName} alt="Super cute hamster" 
// 						width="100%" height="auto" />
// 					</div>
					
// 				</div>
// 				<button onClick={() => postHamster()}> Submit </button>
// 			</div>
// 		</div>
// 	</div>
// ): null;
// }



// let validName: boolean = true;
// let invalidNameMsg: string = "";
// if(inputName === "" || !inputName.match(letters)) {
// 	validName = false;
// 	invalidNameMsg = "Please enter a name.";
// }

// let nameClass = "";
// if(inputNameTouched) {
// 	nameClass = (validName ? 'valid' : 'error')
// }

// let validAge: boolean = true;
// let invalidAgeMsg: string = "";
// if(inputAge === "" || 
// !inputAge.split("").every(char => validChars.includes(char))) {
// 	validName = false;
// 	invalidNameMsg = "Please enter age in numbers.";
// }

// let ageClass = "";
// if(inputAgeTouched) {
// 	ageClass = (validAge ? 'valid' : 'error')
// }

// let validFood: boolean = true;
// let invalidFoodMsg: string = "";
// if(inputFood === "" || !letters) {
// 	validFood = false;
// 	invalidFoodMsg = "Please enter favorite food.";
// }

// let favFoodClass = "";
// if(inputFoodTouched) {
// 	favFoodClass = (validFood ? 'valid' : 'error')
// }

// let validLoves: boolean = true;
// let invalidLovesMsg: string = "";
// if(inputLoves === "" || !letters) {
// 	validLoves = false;
// 	invalidLovesMsg = "Please enter something your hamster loves.";
// }

// let lovesClass = "";
// if(inputLovesTouched) {
// 	lovesClass = (validLoves ? 'valid' : 'error')
// }

// let validImg: boolean = true;
// let invalidImgMsg: string = "";
// if(inputImg === "") {
// 	validImg = false;
// 	invalidImgMsg = "Please enter a URL for your image.";
// }

// let imgClass = "";
// if(inputImgTouched) {
// 	imgClass = (validImg ? 'valid' : 'error')
// }

// let invalidForm = !validName || !validAge || !validFood || !validLoves || !validImg

export default HamsterForm;