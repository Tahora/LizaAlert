let forms = document.querySelectorAll('form'),
    formsArr = Array.from(forms),
    userName = document.querySelector('.profile-info__name'),
    userNameInput = document.querySelector('input[name="userName"]'),
    userAvatar = document.querySelector(".profile-info__image"),
    file = document.getElementById("avatar");
formsArr.forEach((form)=> {
  let inputs = form.querySelectorAll('input'),
      submitBtn = form.querySelector('.profile__submit-btn'),    
      inputsArr = Array.from(inputs);
  inputsArr.forEach((input)=> {
    if(input.type !== "submit") {
    input.addEventListener('input', ()=> activateSubmitBtn(submitBtn));
  } else {
    input.addEventListener('click', ()=> submitEdition(form, submitBtn));
  }; 
  });
});

function activateSubmitBtn(btn) {
  btn.removeAttribute('disabled');
};

function changeUserAvatar() {
  if(file.files.length > 0) {
    userAvatar.src = URL.createObjectURL(file.files[0]);
    userAvatar.style.display = "block";
  }; 
};

function changeUserName() {
  if(userName.textContent !== userNameInput.value){
  userName.textContent = userNameInput.value;}
};

function submitEdition(form, btn) {
  changeUserName();
  changeUserAvatar();
  form.addEventListener('submit',(evt)=>{
  evt.preventDefault();  
  });
  btn.setAttribute('disabled', true);
};
