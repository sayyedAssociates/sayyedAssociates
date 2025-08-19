(function () {
    emailjs.init({
        publicKey: "uN_OqzWRlP5uhqcGm",
    });
})();

// Fetch Header
var header = fetch('./../header.html').then(response => response.text()).then((data) => {
    document.getElementById('header').innerHTML = data;
});

// Fetch Footer
var footer = fetch('./../footer.html').then(response => response.text()).then((data) => {
    document.getElementById('footer').innerHTML = data;
});

document.addEventListener('DOMContentLoaded', function () {
    if (header && footer) {
        Promise.all([header, footer]).then(() => {
            // Both header and footer are loaded
            const menuWrapper = document.getElementById('menuWrapper');
            const navLinks = document.getElementById('navLinks');
            if (menuWrapper && window.innerWidth <= 1140) {
                menuWrapper.classList.add('menu-fixed');
                navLinks.classList.remove('show');
            }

            // Active & Deactive Header Start
            let currentPage = location.pathname.split('/').pop();
            // Normalize for extensionless support
            currentPage = currentPage.replace(/\.html$/, '');

            // --- Handle regular navigation links
            document.querySelectorAll('.nav-links a').forEach(link => {
                let hrefPage = link.getAttribute('href').split('/').pop().replace(/\.html$/, '');
                if (hrefPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            // --- Handle mobile nav
            document.querySelectorAll('.nav-links-mob ul a').forEach(link => {
                let hrefPage = link.getAttribute('href').split('/').pop().replace(/\.html$/, '');
                if (hrefPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // ---- Practice Areas Parent Activation ----
            // 1. Define dropdown page identifiers
            const practiceAreaPages = [
                'practice-details.html?id=1',
                'practice-details.html?id=2',
                'practice-details.html?id=3',
                'practice-details.html?id=4',
                'practice-details.html?id=5',
                'practice-details.html?id=6'
            ];

            // 2. Check for presence in URL
            const onPracticeArea =
                practiceAreaPages.some(function (page) {
                    return window.location.href.includes(page);
                });

            if (onPracticeArea) {
                // Desktop parent
                document.querySelectorAll('.nav-links a[href="./practice.html"]').forEach(link => {
                    link.classList.add('active');
                });
                // Mobile parent
                document.querySelectorAll('.nav-links-mob ul a[href="./practice.html"]').forEach(link => {
                    link.classList.add('active');
                });
            }
            // Active & Deactive Header End

            const storageKey = "disclaimerAccepted";
            const oneDay = 24 * 60 * 60 * 1000; // 24 hours in ms
            const stored = JSON.parse(localStorage.getItem(storageKey));
            const now = Date.now();

            const shouldShowDisclaimer =
                !stored || !stored.timestamp || now - stored.timestamp > oneDay;

            if (shouldShowDisclaimer) {
                // Build the popup HTML
                const disclaimerHTML = `
                    <div id="disclaimerbox">
                        <div class="container">
                            <div class="disclaimer-content-wrap">
                                <div class="disclaimer-content">
                                    <h2 class="title">Disclaimer</h2>
                                    <div class="pop_up_wrap">
                                        <p>As per the rules of the Bar Council of India, we are not permitted to solicit work and advertise. By
                                            clicking on the "I agree" below, the user acknowledges the following:</p>
                                        <ul>
                                            <li>there has been no advertisement, personal communication, solicitation, invitation, or inducement
                                                of any sort whatsoever from us or any of our members to solicit any work through this website;
                                            </li>
                                            <li>the user wishes to gain more information about us for his/her own information and use;</li>
                                            <li>the information about us is provided to the user only on his/her specific request and any
                                                information obtained or materials downloaded from this website is completely at the user’s
                                                volition and any transmission, receipt, or use of this site would not create any lawyer-client
                                                relationship.</li>
                                        </ul>
                                        <p>The information provided under this website is solely available at your request for informational
                                            purposes only, should not be interpreted as soliciting or advertisement. We are not liable for any
                                            consequence of any action taken by the user relying on material/information provided under this
                                            website. In cases where the user has any legal issues, he/she in all cases must seek independent
                                            legal advice.</p>
                                    </div>
                                    <div class="popupbtn-wrap">
                                        <a  href="javascript:void(0)" id="agreeBtn" class="popupbtn">Agree <i class="fa-solid fa-arrow-right-long"></i></a>
                                        <a href="https://www.google.com/" class="popupbtn">Decline</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById("disclaimerContainer").innerHTML = disclaimerHTML;

                // Agree button logic
                document.getElementById("agreeBtn").addEventListener("click", function () {
                    localStorage.setItem(storageKey, JSON.stringify({ agreed: true, timestamp: now }));
                    document.getElementById("disclaimerbox").remove();
                });
            }
        });
    }
});

// Initialize Hero Swiper
var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    speed: 1500,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
});

// Initialize Testimonial Swiper
var swiper = new Swiper(".testimonialSwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    speed: 1500,
    grabCursor: true,
});

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Optional: open dropdown on click in mobile view
document.querySelectorAll('.dropdown > a').forEach(drop => {
    drop.addEventListener('click', function (e) {
        if (window.innerWidth <= 1140) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });
});

window.addEventListener('scroll', function () {
    if (header && footer) {
        Promise.all([header, footer]).then(() => {
            // Both header and footer are loaded
            if (window.innerWidth > 1140) {
                const menuWrapper = document.getElementById('menuWrapper');
                if (window.scrollY > 100) {
                    menuWrapper.classList.add('menu-fixed');
                } else {
                    menuWrapper.classList.remove('menu-fixed');
                }
            }
        });
    }
});

function togglePracticeDropdown() {
    document.getElementById("practiceDropdownMenu").classList.toggle("show");
}

// Accordian
const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        const panel = this.nextElementSibling;
        const isActive = this.classList.contains("active");

        // Close all panels
        for (let j = 0; j < acc.length; j++) {
            acc[j].classList.remove("active");
            acc[j].nextElementSibling.style.display = "none";
        }

        // Toggle current panel only if it was not active
        if (!isActive) {
            this.classList.add("active");
            panel.style.display = "block";
        }
    });
}

// Select Dropdown Functionality for Job Preference
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownButton = document.getElementById('selectDropdownButton');
const dropdownContent = document.getElementById('selectDropdownContent');
const selectedValueSpan = document.getElementById('selectedValue');
const hiddenInput = document.getElementById('hiddenSelectValue');
const options = document.querySelectorAll('.select-option');

// // Toggle dropdown
dropdownButton?.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from closing it
    dropdownContainer?.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    dropdownContainer?.classList.remove('open');
    const menu = document.getElementById("navLinks");
    const toggleButton = document.querySelector(".menu-toggle");

    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggleButton.contains(event.target);

    // If menu is open and clicked outside both menu and toggle
    if (menu.classList.contains("show") && !clickedInsideMenu && !clickedToggle) {
        menu.classList.remove("show");
    }
});

// Handle selection
options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const value = option.getAttribute('data-value');
        const label = option.textContent;

        selectedValueSpan.textContent = label;
        selectedValueSpan.classList.add('selected');
        hiddenInput.value = value;

        dropdownContainer.classList.remove('open');
    });
});

function showToast(message, alertType, duration = 10000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    toast.classList.add(alertType);
    // Hide after `duration` milliseconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/* Consultation Form Validation */
document.querySelector('.consultations-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('[name="fullName"]');
    const phone = this.querySelector('[name="phone"]');
    const email = this.querySelector('[name="email"]');
    const consultDropdown = document.getElementById('consultDropdown');
    const job = document.getElementById('hiddenSelectValue');
    const message = this.querySelector('[name="message"]');
    const selectedValueSpan = document.getElementById('selectedValue');

    let isValid = true;

    // Validate each field
    if (!name.value.trim()) {
        isValid = false;
    }

    if (!phone.value.trim()) {
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        isValid = false;
    }

    if (consultDropdown.classList.contains('hidden') && !job.value.trim()) {
        isValid = true;
    } else if (!consultDropdown.classList.contains('hidden') && !job.value.trim()) {
        isValid = false;
    }

    if (!message.value.trim()) {
        isValid = false;
    }

    if (!isValid) {
        showToast("Please fill out all required fields correctly.", 'warning');
        return;
    }

    // Send email via EmailJS   
    emailjs.send("service_io10ata", "template_4iypxh6", {
        name: name.value,
        phone: phone.value,
        email: email.value,
        preferredJob: job.value ? job.value : '',
        message: message.value
    }).then(function () {
        showToast("Message sent successfully!", 'success');

        // Reset form
        name.value = '';
        phone.value = '';
        email.value = '';
        job.value = '';
        message.value = '';
        selectedValueSpan.textContent = 'Preferred Job*';
        selectedValueSpan.classList.remove('selected');

    }, function () {
        showToast("Failed to send. Please try again later.", 'failed');
    });
});

const practiceCardsContainer = document.getElementById('practiceCardsContainer');
if (practiceCardsContainer) {
    practiceAreas.forEach(area => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="${area.image1}" alt="${area.title}">
          <div class="card-content">
            <h3>${area.title.toUpperCase()}</h3>
            <p>${area.description1.substring(0, 150)}...</p>
            <a href="./practice-details.html?id=${area.id}" class="learn-more">LEARN MORE</a>
          </div>
        `;

        practiceCardsContainer.appendChild(card);
    });
}