const $slider = document.querySelector('.slider');
const $firstSlide = document.querySelector('.slider-item1');

const slide = () => {
  const currSlide = document.querySelector('.showing');

  if(currSlide) {
    const nextSlide = currSlide.nextElementSibling;
    currSlide.classList.remove('showing');
    
    if(nextSlide) {
      nextSlide.classList.add('showing');
    } else {
      $firstSlide.classList.add('showing');
    }
  } else {
    $firstSlide.classList.add('showing');
  }
}


const setId = setInterval(slide, 2000); 

