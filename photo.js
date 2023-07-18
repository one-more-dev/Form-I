const initialButton = document.querySelector("[data-button]");
const photoArea = document.querySelector("[data-photoarea]");
const video = document.querySelector("[data-video]");
const photoButton = document.querySelector("[data-shot]");
const photoCanvas = document.querySelector("[data-photocanvas]");
const canvas = document.querySelector("[data-canvas]");
const sendButton = document.querySelector("[data-send]");

let imageURL = "";


initialButton.addEventListener("click", async function(){
    try{
        const videoStart = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        initialButton.style.display = "none";
        photoArea.style.display = "block";
        video.srcObject = videoStart;
    }catch(e){
        console.log("Something ocurred: ",e);
    }
});

photoButton.addEventListener("click", function(){
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    imageURL = canvas.toDataURL('image/jpeg');
    photoArea.style.display = "none";
    document
});

sendButton.addEventListener("click", function(){
    const userData = localStorage.getItem("user");
    const convertedData = JSON.parse(userData);
    convertedData.photo = imageURL;
    localStorage.setItem("user",JSON.stringify(convertedData));
    window.alert("Your profile is complete!")
})