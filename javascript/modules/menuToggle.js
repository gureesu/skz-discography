// modules/menuToggle.js
export function initializeMenuToggle() {
    const menuToggle = document.querySelector(".bx-menu-alt-left");
    const showcase = document.querySelector(".showcase");

    menuToggle.addEventListener("click", () => {
        showcase.classList.toggle("active");
        if (menuToggle.classList.contains("bx-menu-alt-left")) {
            menuToggle.classList.replace("bx-menu-alt-left", "bx-x");
        } else {
            menuToggle.classList.replace("bx-x", "bx-menu-alt-left");
        }
    });

    // Showcase fullscreen on escape
    document.querySelector("body").addEventListener("keyup", (event) => {
        if (event.key == "Escape") {
            menuToggle.classList.remove("active");
            showcase.classList.remove("active");
            if (menuToggle.classList.contains("bx-x")) {
                menuToggle.classList.replace("bx-x", "bx-menu-alt-left");
            }
        }
    });
}