// dodawanie klasy is-active do hamburgera
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".header-menu");
const menua = menu.querySelectorAll('a');


menua.forEach(function(klikadlo) {
    klikadlo.addEventListener('click', function(e) {
        const activeAll = document.querySelectorAll(".active");
        [].forEach.call(activeAll, function(el) {
            el.classList.remove("active");
        });
        e.target.className = "active";

        menu.classList.remove('is-active');


    })
})

hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('is-active');
})