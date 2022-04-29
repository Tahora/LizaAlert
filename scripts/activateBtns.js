let forms = document.querySelectorAll('form'),
    formsArr = Array.from(forms),
    userName = document.querySelector('.profile-info__name'),
    userNameInput = document.querySelector('input[name="userName"]');
formsArr.forEach((form)=> {
  let inputs = form.querySelectorAll('input'),
      submitBtn = form.querySelector('.profile__submit-btn'),    
      inputsArr = Array.from(inputs);
  inputsArr.forEach((input)=> {
    if(input.type !== "submit"){
    input.addEventListener('input', ()=> activateSubmitBtn(submitBtn));
  } else {
    input.addEventListener('click', ()=> submitEdition(form, submitBtn));
  }; 
  });
});

function activateSubmitBtn(btn) {
  btn.removeAttribute('disabled');
}


function submitEdition(form, btn) {
  userName.textContent = userNameInput.value
  form.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  });
  btn.setAttribute('disabled', true)
}