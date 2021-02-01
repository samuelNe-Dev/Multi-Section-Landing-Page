/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sectionTitleList = document.querySelectorAll("h2");
const sectionList = document.querySelectorAll("section");
const menuLinks = document.getElementsByClassName("menu__link");
const navList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * 
 */


// Build the Navigation Bar
function buildNavItems() {
    for (var i = 0; i < sectionTitleList.length; i++) {
        name = sectionTitleList[i].innerText;
        let newListElement = document.createElement("li");
        let newLink = document.createElement("a");
        newLink.setAttribute("class", "menu__link");
        newLink.textContent = name;
        newListElement.appendChild(newLink);
        navList.appendChild(newListElement);
    }
}

// Call Nav-Builder-Function
// Build Menu 
buildNavItems();

// Add class 'active' to section using the InsersectionObserverAPI
// Set sections as active
const callbackFunction = function (entries) {
    for (menuLink of menuLinks) {
        var linkText = menuLink.innerText;
        linkText = linkText.charAt(0).toLowerCase() + linkText.slice(1);
        linkText = linkText.replace(/ /g, '');
        for (section of sectionList) {
            if (linkText === entries[0].target.id) {
                menuLink.classList.add("active");
                if (section.id === linkText) {
                    section.classList.add("your-active-class");
                } else {
                    section.classList.remove("your-active-class");
                }
            } else {
                menuLink.classList.remove("active");
            }
        }
    }
}

const observer = new IntersectionObserver(callbackFunction, {
    threshold: 1
});

sectionList.forEach((section) => {
    observer.observe(section);
});

// Scroll to section on link click
for (const item of menuLinks) {
    item.addEventListener("click", function (event) {
        var sectionId = event.srcElement.innerText;

        sectionId = sectionId.charAt(0).toLowerCase() + sectionId.slice(1);
        sectionId = sectionId.replace(/ /g, '');

        document.getElementById(sectionId).scrollIntoView({
            behavior: "smooth"
        });
    });
}