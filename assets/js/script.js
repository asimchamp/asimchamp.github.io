'use strict';

// Add this near the top of your script.js file, after the 'use strict' statement
const useCaseIcons = {
  'authentication': 'key-outline',
  'threat': 'shield-half-outline',
  'malware': 'bug-outline',
  'phishing': 'fish-outline',
  'endpoint': 'desktop-outline',
  'default': 'shield-outline'
};

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

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

select?.addEventListener("click", async function () {
  elementToggleFunc(this);
  
  // Only populate categories if they haven't been loaded yet
  const selectList = document.querySelector('.select-list');
  if (selectList && selectList.children.length <= 1) {
    try {
      const response = await fetch('assets/usecases.csv');
      const data = await response.text();
      
      // Get unique categories and sort them alphabetically
      const categories = ['All', ...new Set(data.split('\n')
        .slice(1)
        .filter(row => row.trim())
        .map(row => row.split('\t')[2]))].sort();

      // Clear existing items
      selectList.innerHTML = '';
      
      // Add all categories to the list
      categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'select-item';
        li.innerHTML = `<button data-select-item>${category}</button>`;
        
        // Add click event to new item
        li.querySelector('button').addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent event bubbling
          const selectedValue = this.textContent;
          document.querySelector('.filter-value').textContent = selectedValue;
          
          // Update active state
          document.querySelectorAll('.select-item').forEach(item => {
            item.classList.remove('active');
          });
          li.classList.add('active');
          
          // Close dropdown
          select.classList.remove('active');
          
          filterFunc(selectedValue);
        });
        
        selectList.appendChild(li);
      });
      
      // Set initial active state
      selectList.querySelector('.select-item').classList.add('active');
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const filterSelect = document.querySelector('.filter-select');
  if (!filterSelect?.contains(e.target)) {
    filterSelect?.classList.remove('active');
  }
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const searchInput = document.querySelector('[data-search]');
const filterSelect = document.querySelector('.filter-select');
const filterValue = document.querySelector('.filter-value');

// Update the filter function to handle both category and search
const filterFunc = function (selectedValue) {
  const searchTerm = searchInput.value.toLowerCase();
  const filterItems = document.querySelectorAll('[data-filter-item]');
  
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();
    const title = item.querySelector('.project-title').textContent.toLowerCase();
    const description = item.querySelector('.project-category').textContent.toLowerCase();
    
    // Check both category and search conditions
    const matchesCategory = selectedValue.toLowerCase() === 'all' || category === selectedValue.toLowerCase();
    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
    
    // Show item if it matches both conditions
    if (matchesCategory && matchesSearch) {
      item.style.display = 'block';
      item.classList.add('active');
    } else {
      item.style.display = 'none';
      item.classList.remove('active');
    }
  });
}

// Update search input event listener
searchInput?.addEventListener('input', () => {
  const selectedCategory = document.querySelector('.filter-value').textContent;
  filterFunc(selectedCategory);
});

// add event in all filter button items
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

// Function to parse CSV data
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split('\t').map(header => header.trim());
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split('\t').map(value => value.trim());
    const obj = {};
    headers.forEach((header, index) => {
      const key = header === 'discription' ? 'description' : header;
      obj[key] = values[index]?.replace(/^"|"$/g, '');
    });
    results.push(obj);
  }
  return results;
}

// Add these variables at the top of your script
const usecaseModalContainer = document.querySelector("[data-usecase-modal-container]");
const usecaseModalCloseBtn = document.querySelector("[data-modal-close-btn]");
const usecaseOverlay = document.querySelector("[data-usecase-overlay]");

// Function to format SPL query with line breaks before pipes
function formatSplQuery(query) {
  return query.replace(/\|/g, '\n|');
}

// Function to open modal
function openUsecaseModal(useCase, iconName) {
  console.log('Opening modal for:', useCase); // Debug log
  
  const modalTitle = document.querySelector("[data-usecase-modal-title]");
  const modalDescription = document.querySelector("[data-usecase-description]");
  const modalIcon = document.querySelector(".modal-usecase-icon");
  const modalQuery = document.querySelector("[data-usecase-modal-query]");

  if (modalTitle) modalTitle.textContent = useCase.title;
  if (modalDescription) modalDescription.textContent = useCase.description;
  if (modalIcon) modalIcon.setAttribute('name', iconName);
  if (modalQuery) modalQuery.textContent = formatSplQuery(useCase.spl_query);
  
  // Add active class to modal container and overlay
  document.querySelector("[data-usecase-modal-container]").classList.add("active");
  document.querySelector("[data-usecase-overlay]").classList.add("active");
}

// Function to close modal
function closeUsecaseModal() {
  document.querySelector("[data-usecase-modal-container]").classList.remove("active");
  document.querySelector("[data-usecase-overlay]").classList.remove("active");
}

// Update the loadUseCases function
async function loadUseCases() {
  try {
    const response = await fetch('assets/usecases.csv');
    const data = await response.text();
    
    // Parse CSV data
    const useCases = data.split('\n')
      .slice(1)
      .filter(row => row.trim())
      .map(row => {
        const [title, description, type, spl_query] = row.split('\t');
        return { title, description, type, spl_query };
      });

    const usecaseList = document.getElementById('usecaseList');
    if (!usecaseList) return;

    usecaseList.innerHTML = '';

    useCases.forEach(useCase => {
      const iconName = useCaseIcons[useCase.type.toLowerCase()] || useCaseIcons.default;
      const li = document.createElement('li');
      li.className = 'project-item active';
      li.setAttribute('data-filter-item', '');
      li.setAttribute('data-category', useCase.type);
      
      li.innerHTML = `
        <a href="#" class="project-item-link">
          <div class="project-item-icon-box">
            <div class="usecase-icon">
              <ion-icon class="usecase-main-icon" name="${iconName}"></ion-icon>
            </div>
          </div>
          
          <div class="project-item-content">
            <h3 class="project-title">${useCase.title}</h3>
            <span class="project-category">${useCase.type}</span>
          </div>
        </a>
      `;

      // Update click event listener
      const link = li.querySelector('a');
      link.onclick = function(e) {
        e.preventDefault();
        openUsecaseModal(useCase, iconName);
        return false;
      };

      usecaseList.appendChild(li);
    });
    
  } catch (error) {
    console.error('Error loading use cases:', error);
  }
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadUseCases();

  // Fix close button functionality
  const closeBtn = document.querySelector("[data-usecase-modal-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", function(e) {
      e.preventDefault();
      closeUsecaseModal();
    });
  }

  // Keep existing overlay click handler
  const overlay = document.querySelector("[data-usecase-overlay]");
  if (overlay) {
    overlay.addEventListener("click", closeUsecaseModal);
  }

  // Keep existing escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeUsecaseModal();
    }
  });
});

// Update the copyQuery function to preserve formatting
function copyQuery() {
  const queryText = document.querySelector('[data-usecase-modal-query]').textContent;
  // Remove the line breaks when copying to clipboard
  const cleanQuery = queryText.replace(/\n\|/g, ' |');
  navigator.clipboard.writeText(cleanQuery).then(() => {
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.innerHTML = '<ion-icon name="checkmark-outline" class="copy-icon"></ion-icon> Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = '<ion-icon name="copy-outline" class="copy-icon"></ion-icon> Copy';
    }, 2000);
  });
}