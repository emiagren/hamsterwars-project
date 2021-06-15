import { useState, useRef } from 'react';
import { ModalProps } from '../../types/ModalInterface';
import { NewHamsterObject } from '../../types/HamsterInterface'
import './HamsterForm.css';

const HamsterForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {

	const [inputName, setInputName] = useState("");
	const [nameInputError, setNameInputError] = useState("");

	const [inputAge, setInputAge] = useState("");
	const [ageInputError, setAgeInputError] = useState("");

	const [inputFood, setInputFood] = useState("");
	const [foodInputError, setFoodInputError] = useState("");

	const [inputLoves, setInputLoves] = useState("");
	const [lovesInputError, setLovesInputError] = useState("");

	const [inputImg, setInputImg] = useState("");
	const [imgInputError, setImgInputError] = useState("");

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
		if(!validText) return setFoodInputError("Text can only contain letters.");
		if(!validLength) return setFoodInputError("Text is to long. Maximum is 40 characters.");
		setFoodInputError("");
		setInputFood(favFood);
		validateForm();
	}

	function validLoves(event:any) {
		const loves = event.target.value;
		let validText = validTextInput(loves);
		let validLength = validTextLength(loves);
		if(loves.length < 2) return setLovesInputError("Please enter what your hamster loves ( min two letters).");
		if(!validText) return setLovesInputError("Text can only contain letters.");
		if(!validLength) return setLovesInputError("Text is to long. Maximum is 40 characters.");
		setLovesInputError("");
		setInputLoves(loves);
		validateForm();
	}

	function validImg(event:any) {
		const imgName = event.target.value;
		if(imgName.length === 0 || !imgName.endsWith(".jpg")) return setImgInputError("Please enter a valid URL.")
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

		let newHamster: NewHamsterObject = {
			name: inputName,
			age: Number(inputAge),
			favFood: inputFood,
			loves: inputLoves,
			imgName: inputImg,
			games: 0,
			wins: 0,
			defeats: 0
		}
			
		const response = await fetch('/hamsters', {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(newHamster)});
			const data = await response.json();
			console.log(data);

			window.location.reload()
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
						accept="image/*"
						onBlur={validImg}
						value={inputImg} 
						onChange={e=> {console.log(e.target.value); setInputImg(e.target.value)}}/>
						</label>
						<div className="invalid-msg">{imgInputError}</div>
						{inputImg ? 
						<div>
							<img src={inputImg} className="hamster-img"
							width="100%" height="auto" />
						</div> : 
						<div>
							<img src='upload-logo.png' className="upload-logo"
							width="100%" height="auto" />
						</div>
						}
						
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

export default HamsterForm;