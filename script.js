/* =================================
   SIGNLOOP SCRIPT
================================= */


/* =================================
   YOUTUBE LESSON LINKS
=================================

   Add your YouTube links later.

   Example:

   "FSL Greetings": "https://www.youtube.com/watch?v=XXXX",

*/

const lessonVideos = {

    "FSL Greetings": "",

    "FSL Alphabet": "",

    "FSL Numbers": "",

    "FSL Fruits": "",

    "FSL Colors": ""

};


/* =================================
   LESSON DESCRIPTIONS
================================= */

const lessonDescriptions = {

    "FSL Greetings":
        "Learn basic greetings and everyday expressions in Filipino Sign Language.",

    "FSL Alphabet":
        "Practice the FSL alphabet and fingerspelling.",

    "FSL Numbers":
        "Learn basic numbers using Filipino Sign Language.",

    "FSL Fruits":
        "Learn common fruit vocabulary in Filipino Sign Language.",

    "FSL Colors":
        "Learn common colors using Filipino Sign Language."

};


/* =================================
   OPEN LESSON
================================= */

function openLesson(lessonName) {

    const lessonTitle =
        document.getElementById("lessonModalTitle");

    const lessonNameElement =
        document.getElementById("lessonName");

    const lessonDescription =
        document.getElementById("lessonDescription");

    const youtubeButton =
        document.getElementById("youtubeButton");


    lessonTitle.textContent = lessonName;

    lessonNameElement.textContent = lessonName;

    lessonDescription.textContent =
        lessonDescriptions[lessonName] ||
        "FSL lesson information coming soon.";


    const youtubeURL =
        lessonVideos[lessonName];


    if (youtubeURL && youtubeURL.trim() !== "") {

        youtubeButton.href = youtubeURL;

        youtubeButton.classList.remove("disabled");

        youtubeButton.setAttribute(
            "aria-disabled",
            "false"
        );

        youtubeButton.textContent =
            "Watch on YouTube";

    } else {

        youtubeButton.href = "#";

        youtubeButton.classList.add("disabled");

        youtubeButton.setAttribute(
            "aria-disabled",
            "true"
        );

        youtubeButton.textContent =
            "YouTube Video Coming Soon";

    }


    const modalElement =
        document.getElementById("lessonModal");


    const modal =
        new bootstrap.Modal(modalElement);


    modal.show();

}


/* =================================
   DICTIONARY
================================= */

const dictionaryData = [

    {
        word: "hello",
        title: "Hello",
        description: "Basic greeting."
    },

    {
        word: "thank you",
        title: "Thank You",
        description: "Expression of appreciation."
    },

    {
        word: "name",
        title: "Name",
        description: "Used when asking or sharing a name."
    },

    {
        word: "greetings",
        title: "Greetings",
        description: "Common expressions used to greet someone."
    },

    {
        word: "numbers",
        title: "Numbers",
        description: "Basic number signs in FSL."
    },

    {
        word: "colors",
        title: "Colors",
        description: "Basic color vocabulary in FSL."
    },

    {
        word: "fruits",
        title: "Fruits",
        description: "Common fruit vocabulary in FSL."
    }

];


function searchDictionary() {

    const searchInput =
        document.getElementById("dictionarySearch");

    const results =
        document.getElementById("dictionaryResults");


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText === "") {

        displayDictionary(dictionaryData);

        return;
    }


    const filtered =
        dictionaryData.filter(item =>
            item.word.includes(searchText)
        );


    if (filtered.length === 0) {

        results.innerHTML = `
            <div class="dictionary-item">
                <h3>No result found</h3>
                <p>Try another word.</p>
            </div>
        `;

        return;
    }


    displayDictionary(filtered);

}


function displayDictionary(items) {

    const results =
        document.getElementById("dictionaryResults");


    results.innerHTML = "";


    items.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "dictionary-item";


        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;


        results.appendChild(card);

    });

}


/* =================================
   ENTER KEY SEARCH
================================= */

const dictionarySearch =
    document.getElementById("dictionarySearch");


if (dictionarySearch) {

    dictionarySearch.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                searchDictionary();

            }

        }
    );

}

/* =================================
   LOGIN FORM
================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const loginEmail =
            document.getElementById("loginEmail").value.trim();

        const loginPassword =
            document.getElementById("loginPassword").value;

        const loginMessage =
            document.getElementById("loginMessage");

        if (!loginEmail || !loginPassword) {
            loginMessage.textContent =
                "Please enter your email and password.";
            return;
        }

        loginMessage.textContent =
            "Login form submitted. Authentication is not connected yet.";
    });
}


/* =================================
   FORGOT PASSWORD
================================= */

const forgotPassword =
    document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function(event) {
        event.preventDefault();

        const loginMessage =
            document.getElementById("loginMessage");

        if (loginMessage) {
            loginMessage.textContent =
                "Please contact the website administrator to reset your password.";
        }
    });
}


/* =================================
   SIGN UP
================================= */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match. Please try again."
                );

                return;

            }


            alert(
                "Your SignLoop account form was submitted successfully!"
            );


            signupForm.reset();

        }
    );

}



/* ================= NAVIGATION INTERACTIONS ================= */

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(
        '.nav-tabs-custom .nav-link[href^="#"]'
    );

    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(section => section !== null);

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute("href") === "#" + sectionId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // Highlight clicked navigation link.
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            const targetId = this.getAttribute("href").substring(1);
            setActiveLink(targetId);

            // Close Bootstrap's mobile menu after selection.
            const menu = document.getElementById("mainNav");
            const toggler = document.querySelector(".navbar-toggler");

            if (menu && menu.classList.contains("show") && toggler) {
                toggler.click();
            }
        });
    });

    // Update active link while scrolling.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            const visibleSections = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) =>
                    b.intersectionRatio - a.intersectionRatio
                );

            if (visibleSections.length > 0) {
                setActiveLink(visibleSections[0].target.id);
            }
        }, {
            rootMargin: "-100px 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        });

        sections.forEach(section => observer.observe(section));
    }

    // Set the initial active link.
    const initialId = window.location.hash.substring(1) || "home";
    setActiveLink(
        document.getElementById(initialId) ? initialId : "home"
    );
});