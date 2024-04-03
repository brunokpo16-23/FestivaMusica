function iniciarApp() {
    navegacionFija(), crearGaleria(), scrollNav()
}

function navegacionFija() {
    const e = document.querySelector(".header"),
        t = document.querySelector(".sobre-festival"),
        n = document.querySelector("body");
    window.addEventListener("scroll", (function () {
        t.getBoundingClientRect().top < 0 ? (e.classList.add("fijo"), n.classList.add("body-scroll")) : (e.classList.remove("fijo"), n.classList.remove("body-scroll"))
    }))
}

function scrollNav() {
    const enlaces = document.querySelectorAll(".sobre-festival a");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click",function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrolIntoView({ behavir: "smooth"});
        });
    });
}

function crearGaleria() {
    const e = document.querySelector(".galeria-imagenes");
    for (let t = 1; t <= 12; t++) {
        const n = document.createElement("picture");
        n.innerHTML = `\n            <source srcset="build/img/thumb/${t}.avif" type="image/avif">\n            <source srcset="build/img/thumb/${t}.webp" type="image/webp">\n            <img loading="lazy" width="200" height="300" src="build/img/thumb/${t}.jpg" alt="imagen galeria">\n        `, n.onclick = function () {
            mostrarImagen(t)
        }, e.appendChild(n)
    }
}

function mostrarImagen(e) {
    const t = document.createElement("picture");
    t.innerHTML = `\n            <source srcset="build/img/grande/${e}.avif" type="image/avif">\n            <source srcset="build/img/grande/${e}.webp" type="image/webp">\n            <img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg" alt="imagen galeria">\n        `;
    const n = document.createElement("DIV");
    n.appendChild(t), n.classList.add("overlay"), n.onclick = function () {
        document.querySelector("body").classList.remove("fijar-body"), n.remove()
    };
    const i = document.createElement("P");
    i.textContent = "X", i.classList.add("btn-cerrar"), i.onclick = function () {
        document.querySelector("body").classList.remove("fijar-body"), n.remove()
    }, n.appendChild(i);
    const o = document.querySelector("body");
    o.appendChild(n), o.classList.add("fijar-body")
}
document.addEventListener("DOMContentLoaded", (function () {
    iniciarApp()
}));
//# sourceMappingURL=app.js.map