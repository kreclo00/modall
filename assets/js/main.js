
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


const handleClickOutside = (event) => {
    if (!event.target.closest('.dropbtn') && !event.target.closest('.dropdown-content')) {
        document.querySelectorAll('.dropdown-content').forEach(drop => {
            drop.classList.remove('show');
        });
    }
};


const initializeAccordion = () => {
    const accordions = document.querySelectorAll('.accordion');
    if (!accordions.length) return;

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            acc.classList.toggle('active');
            const panel = acc.nextElementSibling;
            if (!panel) return;

            panel.classList.toggle('active');
            panel.style.maxHeight = panel.classList.contains('active') 
                ? `${panel.scrollHeight}px` 
                : null;
        });
    });
};


const initializeSlider = () => {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    if (!slidesContainer || !slides.length) return;

    let currentIndex = 0;
    let intervalId = null;
    const slideInterval = 4000;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const startSlider = () => { intervalId = setInterval(nextSlide, slideInterval); };
    const stopSlider = () => clearInterval(intervalId);

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

const initializeAboutFilters = () => {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const images = document.querySelectorAll('.about-img');
    const blocks = document.querySelectorAll('.about-other-block');
    if (!filterButtons.length || !images.length || !blocks.length) return;

    filterButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
        
            [filterButtons, images, blocks].forEach(group => {
                group.forEach(item => item.classList.remove('active'));
            });

        
            button.classList.add('active');
            images[index].classList.add('active');
            blocks[index].classList.add('active');
        });
    });
};

//  модальны окна
const manageModal = (action, type, toType = null) => {
    const modal = document.getElementById(`modal-${type}`);
    if (!modal) return;

    if (action === 'open') {
        modal.style.display = 'flex';
    } else if (action === 'close') {
        modal.style.display = 'none';
    } else if (action === 'switch' && toType) {
        modal.style.display = 'none';
        const toModal = document.getElementById(`modal-${toType}`);
        if (toModal) toModal.style.display = 'flex';
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initializeAccordion();
    initializeSlider();
    initializeAboutFilters();
    document.addEventListener('click', handleClickOutside);
});


window.openModal = (type) => manageModal('open', type);
window.closeModal = (type) => manageModal('close', type);
window.switchModal = (from, to) => manageModal('switch', from, to);