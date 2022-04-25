let forms = document.querySelectorAll('form'),
    formsArr = Array.from(forms);
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
  btn.classList.add('btn_active');
  };

function submitEdition(form, btn) {
  form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    });
  btn.setAttribute('disabled', true);
};