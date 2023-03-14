/*-----------------GENERAL-----------------*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*-----------------NAVBAR-----------------*/
const navbarMarker = document.querySelector("#navbar-container .marker-circle");
const scrollDown = document.getElementById('scroll-down');
let selected;
document.querySelectorAll("#navbar-container ul li").forEach(x => {
    x.addEventListener('click', (e) => {
        const scrollTarget = document.getElementById(e.target.getAttribute('scroll'));
        if(selected.target == e.target) {
            scrollTo({ behavior: 'smooth', top: scrollTarget.getBoundingClientRect().top })
            return;
        }
        
        selected = e;
        
        navbarMarker.style.left = (e.target.offsetLeft - e.target.parentElement.offsetLeft) + e.target.offsetWidth / 2 - navbarMarker.offsetWidth / 2 + 'px';
        
        sleep(450).then(() => {
            if (selected.target != e.target)
            return;
            
            scrollTo({ behavior: 'smooth', top: scrollTarget.getBoundingClientRect().top })
        });
    })

    if (selected == null) {
        selected = { target: x };
        
        navbarMarker.style.left = (x.parentElement.offsetLeft - x.parentElement.offsetLeft) + x.offsetWidth / 2 - navbarMarker.offsetWidth / 2 + 'px';
    }
});

scrollDown.addEventListener('click', () => {
    selected = { target: document.querySelector('#navbar-container ul li') };
    navbarMarker.style.left = (selected.target.offsetLeft - selected.target.parentElement.offsetLeft) + selected.target.offsetWidth / 2 - navbarMarker.offsetWidth / 2 + 'px';
    
    const scrollTarget = document.getElementById(selected.target.getAttribute('scroll'));
    scrollTo({ behavior: 'smooth', top: scrollTarget.getBoundingClientRect().top })
});


/*-----------------WINDOW EVENTS-----------------*/
window.addEventListener('resize', (e) => {
    if (selected != null) { // Navbar marker position
        navbarMarker.style.left = (selected.target.offsetLeft - selected.target.parentElement.offsetLeft) + selected.target.offsetWidth / 2 - navbarMarker.offsetWidth / 2 + 'px';
    }
})