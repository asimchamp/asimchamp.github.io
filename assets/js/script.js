'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Get modal container, modal, and close button
const workmodalContainer = document.getElementById('serviceModalContainer');
const workoverlay = document.getElementById('overlay');
const modal = document.getElementById('serviceModal');
const closeBtn = document.getElementById('serviceModalCloseBtn');

// Modal content elements
const workmodalTitle = document.getElementById('serviceModalTitle');
const workmodalText = document.getElementById('serviceModalText');
const modalTime = document.getElementById('serviceModalTime');

// Function to open the modal and populate content dynamically
function openServiceModal(event) {
  const title = event.currentTarget.querySelector('.service-item-title').textContent;
  const text = event.currentTarget.querySelector('.service-item-text').getAttribute('data-full-text');
  const time = new Date().toLocaleDateString();  // You can use a different timestamp if needed
  
  // Set the modal content
  workmodalTitle.textContent = title;

  // Clear previous content
  const modalTextList = document.getElementById('serviceModalText');
  modalTextList.innerHTML = ''; // Clear previous content

  // Split the text by a delimiter (e.g., comma or newline) and create list items
  const textItems = text.split('^'); // Change this delimiter as needed
  textItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.trim(); // Trim whitespace
      modalTextList.appendChild(listItem);
  });

  modalTime.textContent = time;

  // Show modal container and overlay
  workmodalContainer.classList.add('active');
  workoverlay.classList.add('active');
}

// Close the modal
closeBtn.addEventListener('click', () => {
  workmodalContainer.classList.remove('active');
  workoverlay.classList.remove('active');
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === workmodalContainer) {
    workmodalContainer.classList.remove('active');
    workoverlay.classList.remove('active');
  }
});

// Add event listeners to all service items
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', openServiceModal);
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}