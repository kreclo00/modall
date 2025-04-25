
const toggleDropdown = (event, id) => {
    event.preventDefault();
    
    const targetDropdown = document.getElementById(id);
    if (!targetDropdown) return; 


    document.querySelectorAll('.dropdown-content').forEach(drop => {
        if (drop.id !== id && drop.classList.contains('show')) {
            drop.classList.remove('show');
        }
    });


    targetDropdown.classList.toggle('show');
};

document.addEventListener('click', event => {
    if (!event.target.closest('.dropbtn') && !event.target.closest('.dropdown-content')) {
        document.querySelectorAll('.dropdown-content').forEach(drop => {
            drop.classList.remove('show');
        });
    }
});


const initializeAccordion = () => {
    const accordions = document.querySelectorAll('.accordion');
    if (!accordions.length) return; 

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            acc.classList.toggle('active');
            const panel = acc.nextElementSibling;
            if (!panel) return;

            if (panel.classList.contains('active')) {
                panel.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
};


const initializeSlider = () => {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    if (!slidesContainer || slides.length === 0) return;
    let currentIndex = 0;
    let intervalId = null;
    const slideInterval = 4000; 

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const showNextSlide = () => {
        showSlide(currentIndex + 1);
    };

   
    const startSlider = () => {
        intervalId = setInterval(showNextSlide, slideInterval);
    };

    const stopSlider = () => {
        clearInterval(intervalId);
    };

    
    startSlider();

    slidesContainer.addEventListener('mouseenter', stopSlider);
    slidesContainer.addEventListener('mouseleave', startSlider);

   
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            stopSlider();
            startSlider();
        });
        nextButton.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            stopSlider();
            startSlider();
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initializeAccordion();
    initializeSlider();
});


const initializeAboutFilters = () => {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const images = document.querySelectorAll('.about-img');
  const blocks = document.querySelectorAll('.about-other-block');

  if (!filterButtons.length || !images.length || !blocks.length) {
      console.warn('Не найдены элементы для фильтров, изображений или блоков.');
      return;
  }


  filterButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          
          filterButtons.forEach(btn => btn.classList.remove('active'));
          images.forEach(img => img.classList.remove('active'));
          blocks.forEach(block => block.classList.remove('active'));

         
          button.classList.add('active');
          images[index].classList.add('active');
          blocks[index].classList.add('active');
      });
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initializeAboutFilters();
});

let btns = document.querySelectorAll('.btn-filter')
let images = document.querySelectorAll('.about-img')
let texts = document.querySelectorAll('.about-other-block')

btns.forEach((btn, index)=>{
  btn.onclick=()=>{
    document.querySelector('.btn-filter.active').classList.remove('active')
    btn.classList.add('active')
    document.querySelector('.about-img.active').classList.remove('active')
    images[index].classList.add('active')
    document.querySelector('.about-other-block.active').classList.remove('active')
    texts[index].classList.add('active')
  }
})

function openModal(type) {
  document.getElementById(`modal-${type}`).style.display = "flex";
}

function closeModal(type) {
  document.getElementById(`modal-${type}`).style.display = "none";
}

function switchModal(from, to) {
  closeModal(from);
  openModal(to); }
  