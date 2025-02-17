document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    const modal = document.getElementById("document-modal");
    const closeBtn = modal?.querySelector(".close");
    const docViewer = document.getElementById("doc-viewer");
    const downloadBtn = document.getElementById("download-btn");
    let navLinks = document.querySelectorAll(".nav-link");
    let currentPath = window.location.pathname.split("/").pop();

    // Check if modal exists before adding event listeners
    if (modal) {
        document.querySelectorAll(".preview-btn").forEach(button => {
            button.addEventListener("click", () => {
                const docUrl = button.getAttribute("data-doc");
                if (docViewer && downloadBtn) {
                    docViewer.src = docUrl;
                    downloadBtn.href = docUrl;
                }
                modal.style.display = "flex";
                modal.classList.add("fade-in-modal");
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("fade-in-modal");
                modal.classList.add("fade-out-modal");
                setTimeout(() => {
                    modal.style.display = "none";
                    modal.classList.remove("fade-out-modal");
                }, 300);
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("fade-in-modal");
                modal.classList.add("fade-out-modal");
                setTimeout(() => {
                    modal.style.display = "none";
                    modal.classList.remove("fade-out-modal");
                }, 300);
            }
        });
    }

    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "index.html"; // Default to index.html
    }

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active"); // Add 'active' class to current link
        }
    });

    // Fade-in animation when scrolling
    function checkVisibility() {
        fadeElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !element.classList.contains("visible")) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    // GitHub Repository Popup Functionality
    let githubButtons = document.querySelectorAll(".github-btn");
    let popup = document.getElementById("repo-popup");
    let backendLink = document.getElementById("backend-link");
    let frontendLink = document.getElementById("frontend-link");
    let closePopup = document.querySelector(".close-popup");

    if (popup) {
        githubButtons.forEach(button => {
            button.addEventListener("click", function () {
                let backendUrl = this.getAttribute("data-backend");
                let frontendUrl = this.getAttribute("data-frontend");

                if (backendLink && frontendLink) {
                    backendLink.href = backendUrl;
                    frontendLink.href = frontendUrl;
                }

                popup.style.display = "block";
            });
        });

        if (closePopup) {
            closePopup.addEventListener("click", function () {
                popup.style.display = "none";
            });
        }

        window.addEventListener("click", function (event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        });
    }
});
