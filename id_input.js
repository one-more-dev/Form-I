const radioButtons = document.querySelectorAll("[data-radio]");
const idInput = document.getElementById("id_input");
const idError = document.getElementsByClassName("id_error")[0];


radioButtons.forEach((radio) => {
	radio.addEventListener("click", ()=> { changeIdFormat() })
});

function changeIdFormat(){
	idInput.readOnly = false;
	idInput.value = "";

	if(radioButtons[0].checked === true){
        idInput.className = "id_input";
		idInput.minLength = "4";
        idInput.pattern = "[0-9]*";
	}else if(radioButtons[1].checked === true){
        idInput.className = "br_input";
		idInput.minLength = "9";
        idInput.pattern = "[0-9A-z]*";
	}
}

function treatId(id){
    let identification = String(id).trim();
	identification = identification = idInput.value.replace(/[^A-z0-9]/g,"");
    return identification;
}

export default function validateId(id){
    const identification = treatId(id);
    idError.innerText = "";
    
    if(idInput.className === "id_input"){
        return identification;
    }

    else if(idInput.className === "br_input"){
        if(identification.length > 9){
            idError.innerText = "Too long for the Brazilian ID format";
        }else{
            return identification
        }
    }

    return;
}
