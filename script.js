import validateId from "./id_input.js";


const formSubmit = document.getElementsByTagName("form")[0];
const fullName = document.getElementById("full_name");
const birth = document.getElementById("birthday");
const idInput = document.getElementById("id_input");
const birthError = document.getElementsByClassName("birth_error")[0];

const currentDate = new Date();


function treatName(name){
	let nome = name.trim();
	nome = nome.replace(/[^A-z\s]/g,"");
	nome = nome.replace(/\s\s+/g," ");
	return nome;
}

function validateName(name){
	const nome = treatName(name);
    const regex = new RegExp('[A-z]');
    if(regex.test(nome) === true && nome.length > 0){
		return nome;
    }else{
        return false;
    }
}

function validateMajority(birth){
	const majority = new Date(currentDate.getFullYear()-18, currentDate.getMonth(), currentDate.getDay());
	birthError.innerText = "";

	if(new Date(birth).getFullYear() < 1900){
		birthError.innerText = "Dates before 1900 are up to personalized service";
		return;
	}else{
		if(new Date(birth) <= majority){
			return new Date(birth);
		}else{
			birthError.innerText = "Too young too be signed on this system";
			return false;
		}
	}
}


formSubmit.addEventListener(
	"submit", (evento)=>{
		evento.preventDefault();
		const validations = [
			validateName(fullName.value),
			validateMajority(birth.value),
			validateId(idInput.value)
		];

		if(validations.includes(undefined) || validations.includes(false)){
			window.alert("Recheck your data and try again");
		}else{
			const userData = {
				"fullname": validateName(fullName.value),
				"email": evento.target.elements["mail"].value,
				"birthday": validateMajority(birth.value),
				"user_id": validateId(idInput)
			}
			localStorage.setItem("user",JSON.stringify(userData));
			window.location.href = "./userphoto.html";
		}
	}
);
