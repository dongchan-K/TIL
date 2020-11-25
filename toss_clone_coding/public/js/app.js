const $btnBurger = document.querySelector('.btn-burger');
const $burgerTop = document.querySelector('.nav-burger-top');
const $burgerMid = document.querySelector('.nav-burger-mid');
const $burgerBtm = document.querySelector('.nav-burger-btm');

let check = true;

$btnBurger.onclick = e => {
  console.log(check);
  if(check) {
    $burgerTop.classList.add('closetop');
    $burgerMid.classList.add('closemid');
    $burgerBtm.classList.add('closebottom');
    check = false;
  } else {
    $burgerTop.classList.remove('closetop');
    $burgerMid.classList.remove('closemid');
    $burgerBtm.classList.remove('closebottom');
    check = true;
  }
}