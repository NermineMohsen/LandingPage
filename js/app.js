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
 * get all sections
 */
function getSections() {
    return document.querySelectorAll('section');
}

/**
 * this function reassign the 'your-active-class' and 
 * 'activetab' to the current/new active section
 * and list item (navigation tab)
 */
function activateSection(sectionid) {
    /**
   * remove the active class value from the section 
   * and navigation item that were previously active
   */
    const active = document.getElementsByClassName('your-active-class')[0]
    document.getElementById(`tab${active.id}`).classList.remove('activeTab');
    active.classList.remove('your-active-class');
    /**
   * set the active class value from the section 
   * and navigation item that are currently active
   */
    let activeNow = document.getElementById(sectionid)
    activeNow.classList.add('your-active-class');
    document.getElementById(`tab${sectionid}`).classList.add('activeTab');
    return activeNow;

}
/**
 * The inViewSections function get the bounds of the 
 * section given and compares them to the screen/page 
 * view bounds to check if the section is even partially
 * visible within the screen/view page bounds    
 * (taken  into consideration the size of the header)
*/
function inViewSections(sections) {
    var viewSections = [];
    var page = document.documentElement;
    var headersize = document.getElementsByClassName('page__header')[0].offsetHeight;
    for (const section of sections) {

        var sectionHeight = section.offsetHeight - headersize;
        //        var sectionWidth = section.offsetWidth;
        var sectionBound = section.getBoundingClientRect();
        if (sectionBound.top >= -sectionHeight
            && sectionBound.bottom <= (window.innerHeight || document.documentElement.clientHeight) + sectionHeight) {
            viewSections.push(section);

        }
    }
    return viewSections;
}


/**
 * The function buildNav creates list items with anchors
 * displaying the section it's pointing to.
 * 
 * eventlistener is added to each anchor on click 
 * 
*/
function buildNav() {
    const sections = getSections();
    const nav = document.getElementById('navbar__list');
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const tab = document.createElement('li');
        const anchor = document.createElement('a');
        //each item in the navbar has an id tabsection1, tabsection2...etc
        anchor.id = `tab${section.id}`;
        anchor.textContent = section.getAttribute('data-nav');
        anchor.addEventListener("click", anchorClick);
        tab.appendChild(anchor);
        fragment.appendChild(tab)

    }
    //default is that the first section tab is active
    fragment.getElementById('tabsection1').classList.add("activeTab");
    nav.appendChild(fragment);

}


/**
 * this listener gets all the sections currently inview 
 * and checks which is closer to the top and give it the
 * activates the corresponding section and navigation item
 */

document.addEventListener("scroll", function () {
    const sections = inViewSections(getSections());
    if (sections.length == 0) {
        const active = document.getElementsByClassName('your-active-class')[0]
        document.getElementById(`tab${active.id}`).classList.remove('activeTab');
        active.classList.remove('your-active-class');
        return;
    }
    let topSection = sections[0].offsetTop;
    let topID = sections[0].id;
    for (var section of sections) {
        if (section.offsetTop <= topSection) {
            topID = section.id;
        }
    }
    activateSection(topID)
});
/**
 * this function scrolls smoothly to the section refered to 
 * by the clicked anchor 
 */
function anchorClick(event) {
    let target = event.target;
    document.getElementById(target.id.substring(3)).scrollIntoView({ behavior: "smooth" })
}

buildNav();
