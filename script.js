/* =================================
   SIGNLOOP SCRIPT
   Works with the elements in index.html
================================= */

/* FSL lesson descriptions and optional video links.
   Replace empty values with real video URLs when ready.
   Do not leave VIDEO_ID placeholder links in place. */
const lessonVideos = {
    "FSL Greetings": { local: "", youtube: "" },
    "FSL Alphabet":  { local: "videos/alphabet.mp4", youtube: "" },
    "FSL Numbers":   { local: "videos/numbers.mp4", youtube: "" },
    "FSL Fruits":    { local: "videos/fruits.mp4", youtube: "" },
    "FSL Colors":    { local: "videos/colors.mp4", youtube: "" }
};

const lessonDescriptions = {
    "FSL Greetings": "Learn basic greetings and everyday expressions in Filipino Sign Language.",
    "FSL Alphabet": "Practice the FSL alphabet and fingerspelling.",
    "FSL Numbers": "Learn basic numbers using Filipino Sign Language.",
    "FSL Fruits": "Learn common fruit vocabulary in Filipino Sign Language.",
    "FSL Colors": "Learn common colors using Filipino Sign Language."
};

function showLesson(lessonName, localVideoUrl = "", youtubeURL = "") {
    const modalElement = document.getElementById("lessonModal");
    if (!modalElement || typeof bootstrap === "undefined") {
        console.error("Lesson modal or Bootstrap JavaScript is missing.");
        return;
    }

    const title = document.getElementById("lessonModalTitle");
    const name = document.getElementById("lessonName");
    const description = document.getElementById("lessonDescription");
    const message = document.getElementById("lessonMediaMessage");
    const iframe = document.getElementById("youtubeVideo");
    const localVideo = document.getElementById("localVideo");
    const localSource = document.getElementById("localVideoSource");

    if (title) title.textContent = lessonName;
    if (name) name.textContent = lessonName;
    if (description) description.textContent = lessonDescriptions[lessonName] || "FSL lesson information coming soon.";

    const configured = lessonVideos[lessonName] || {};
    const localURL = localVideoUrl || configured.local || "";
    const youtube = youtubeURL || configured.youtube || "";
    const usableYoutube = youtube && !youtube.includes("VIDEO_ID") && /^https:\/\/(www\.)?youtube\.com\/embed\//i.test(youtube);

    if (iframe) {
        iframe.src = usableYoutube ? youtube : "about:blank";
        iframe.classList.toggle("d-none", !usableYoutube);
    }
    if (localVideo && localSource) {
        localVideo.pause();
        localVideo.classList.toggle("d-none", !localURL);
        localSource.src = localURL;
        localVideo.load();
    }
    if (message) {
        if (usableYoutube || localURL) {
            message.textContent = "If the video does not play, check that its file or video link exists.";
        } else {
            message.textContent = "The video for this lesson has not been added yet. Add a real YouTube embed link or a video file in the videos folder.";
        }
    }

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

/* ================================= DICTIONARY ================================= */
const dictionaryData = [
    { word: "hello", title: "Hello", filipino: "Kumusta", english: "Hello", description: "Basic greeting." },
    { word: "thank you", title: "Thank You", filipino: "Salamat", english: "Thank you", description: "Expression of appreciation." },
    { word: "name", title: "Name", filipino: "Pangalan", english: "Name", description: "Used when asking or sharing a name." },
    { word: "greetings", title: "Greetings", filipino: "Pagbati", english: "Greetings", description: "Common expressions used to greet someone." },
    { word: "numbers", title: "Numbers", filipino: "Mga numero", english: "Numbers", description: "Basic number signs in FSL." },
    { word: "colors", title: "Colors", filipino: "Mga kulay", english: "Colors", description: "Basic color vocabulary in FSL." },
    { word: "fruits", title: "Fruits", filipino: "Mga prutas", english: "Fruits", description: "Common fruit vocabulary in FSL." }
];

function displayDictionary(items) {
    const results = document.getElementById("dictionaryResults") || document.getElementById("dictionaryResult");
    if (!results) return;
    results.replaceChildren();

    if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "dictionary-item";
        const heading = document.createElement("h3");
        heading.textContent = "No result found";
        const paragraph = document.createElement("p");
        paragraph.textContent = "Try another word.";
        empty.append(heading, paragraph);
        results.appendChild(empty);
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "dictionary-item";
        const heading = document.createElement("h3");
        heading.textContent = item.title;
        const description = document.createElement("p");
        description.textContent = item.description;
        const filipino = document.createElement("p");
        filipino.textContent = `Filipino: ${item.filipino}`;
        const english = document.createElement("p");
        english.textContent = `English: ${item.english}`;
        card.append(heading, description, filipino, english);
        results.appendChild(card);
    });
}

function searchDictionary() {
    const input = document.getElementById("dictionarySearch");
    if (!input) return;
    const query = input.value.toLowerCase().trim();
    const filtered = query
        ? dictionaryData.filter(item => [item.word, item.title, item.filipino, item.english].some(value => value.toLowerCase().includes(query)))
        : dictionaryData;
    displayDictionary(filtered);
}

/* ================================= ABOUT / QUESTIONS ================================= */
const questionData = {
    "FAQ": "SignLoop is an educational project that introduces Filipino Sign Language, Deaf culture, and accessibility. Lesson videos will appear when valid video links or files are added.",
    "Contact Us": "Contact details have not been added to this demo yet.",
    "About the Project": "Deaf Access on SignLoop: How Deaf Content Creators Promote Inclusion and Awareness. Capstone Project • Video Production.",
    "Help Center": "Use the navigation menu to explore FSL lessons, the dictionary, Deaf culture, and accessibility information.",
    "Give Feedback": "A feedback form has not been connected to this demo yet. Please share feedback with the project team directly."
};

function showQuestion(topic) {
    const result = document.getElementById("questionResult");
    if (!result) return;
    result.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = topic;
    const paragraph = document.createElement("p");
    paragraph.textContent = questionData[topic] || "Information is not available yet.";
    result.append(heading, paragraph);
}

function searchQuestion() {
    const input = document.getElementById("questionSearch");
    const result = document.getElementById("questionResult");
    if (!input || !result) return;
    const query = input.value.trim().toLowerCase();
    if (!query) {
        showQuestion("FAQ");
        return;
    }
    const match = Object.entries(questionData).find(([title, text]) => `${title} ${text}`.toLowerCase().includes(query));
    if (match) {
        showQuestion(match[0]);
    } else {
        result.replaceChildren();
        const heading = document.createElement("h3");
        heading.textContent = "No matching information found";
        const paragraph = document.createElement("p");
        paragraph.textContent = "Try searching for FSL, lessons, Deaf culture, accessibility, or contact.";
        result.append(heading, paragraph);
    }
}

/* ================================= LOGIN / FORGOT PASSWORD ================================= */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");
        const message = document.getElementById("loginMessage");
        if (!email || !password || !message) return;
        if (!email.value.trim() || !password.value) {
            message.textContent = "Please enter your email and password.";
            return;
        }
        message.textContent = "This is a front-end demo. Login authentication is not connected yet.";
    });
}

const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
    forgotPassword.addEventListener("click", event => {
        event.preventDefault();
        const message = document.getElementById("loginMessage");
        if (message) message.textContent = "Password reset is not connected yet. Please contact the project administrator.";
    });
}

/* ================================= VIDEO UPLOAD DEMO ================================= */
const videoUpload = document.getElementById("videoUpload");
if (videoUpload) {
    videoUpload.addEventListener("change", () => {
        const message = document.getElementById("uploadMessage");
        const file = videoUpload.files && videoUpload.files[0];
        if (!message) return;
        if (!file) {
            message.textContent = "";
            return;
        }
        if (!file.type.startsWith("video/")) {
            message.textContent = "Please choose a video file.";
            videoUpload.value = "";
            return;
        }
        message.textContent = `Selected: ${file.name}. This demo selects a file but does not upload or generate captions.`;
    });
}

/* ================================= NAVIGATION ================================= */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = [...document.querySelectorAll('.nav-tabs-custom .nav-link[href^="#"]')];
    const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${sectionId}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }

    navLinks.forEach(link => link.addEventListener("click", () => {
        const id = link.getAttribute("href").slice(1);
        setActiveLink(id);
        const menu = document.getElementById("mainNav");
        if (menu && menu.classList.contains("show") && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    }));

    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) setActiveLink(visible[0].target.id);
        }, { rootMargin: "-100px 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] });
        sections.forEach(section => observer.observe(section));
    }

    const initialId = window.location.hash.slice(1) || "home";
    setActiveLink(document.getElementById(initialId) ? initialId : "home");
});
