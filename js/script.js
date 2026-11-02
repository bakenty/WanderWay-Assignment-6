document.addEventListener("DOMContentLoaded", () => {
    // Contact form validation: checks required fields and matching passwords.
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const formMessage = document.getElementById("formMessage");
        const checkPasswords = () => {
            if (!password || !confirmPassword) return;
            confirmPassword.setCustomValidity(password.value === confirmPassword.value ? "" : "Passwords do not match.");
            confirmPassword.classList.toggle("is-invalid", password.value !== confirmPassword.value && confirmPassword.value.length > 0);
        };
        password?.addEventListener("input", checkPasswords);
        confirmPassword?.addEventListener("input", checkPasswords);
        contactForm.addEventListener("submit", event => {
            event.preventDefault(); checkPasswords();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                if (formMessage) { formMessage.textContent = "Please complete all required fields correctly and make sure passwords match."; formMessage.className = "mt-3 text-danger"; }
                contactForm.reportValidity(); return;
            }
            if (formMessage) { formMessage.textContent = "Form validated successfully! This demo does not send data to a server."; formMessage.className = "mt-3 text-success"; }
        });
        contactForm.addEventListener("reset", () => { contactForm.classList.remove("was-validated"); if (formMessage) formMessage.textContent = ""; confirmPassword?.setCustomValidity(""); confirmPassword?.classList.remove("is-invalid"); });
    }

    // FAQ: event delegation and dynamic DOM classes.
    document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => {
        const item = button.closest(".faq-item"); const willOpen = !item.classList.contains("open");
        item.classList.toggle("open", willOpen); button.setAttribute("aria-expanded", String(willOpen));
    }));

    // Accessible popup with Escape-to-close behavior.
    const popup = document.getElementById("subscriptionModal");
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const closePopup = () => { popup?.classList.remove("show"); popup?.setAttribute("aria-hidden", "true"); };
    openPopupBtn?.addEventListener("click", () => { popup?.classList.add("show"); popup?.setAttribute("aria-hidden", "false"); document.getElementById("subscriptionEmail")?.focus(); });
    closePopupBtn?.addEventListener("click", closePopup);
    popup?.addEventListener("click", event => { if (event.target === popup) closePopup(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closePopup(); });
    const subscriptionForm = document.getElementById("subscriptionForm");
    subscriptionForm?.addEventListener("submit", event => {
        event.preventDefault();
        if (subscriptionForm.checkValidity()) { const message = document.getElementById("subscriptionMessage"); if (message) message.textContent = "Thank you! You are subscribed to our demo travel updates."; subscriptionForm.reset(); }
        else subscriptionForm.reportValidity();
    });

    // DOM styling and animation: cycle background colors with a button.
    const colorButton = document.getElementById("changeColorBtn");
    if (colorButton) { let colorIndex = 0; const colorClasses = ["color-change-1", "color-change-2", "color-change-3", "color-change-4"];
        colorButton.addEventListener("click", () => { document.body.classList.remove(...colorClasses); document.body.classList.add(colorClasses[colorIndex]); colorIndex = (colorIndex + 1) % colorClasses.length; colorButton.classList.add("animate__unused"); }); }

    // Date/time uses Date and updates once per second.
    const dateTime = document.getElementById("dateTime");
    if (dateTime) { const updateDateTime = () => { dateTime.textContent = new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }); }; updateDateTime(); window.setInterval(updateDateTime, 1000); }

    // Array of destination objects, higher-order functions, loops, and switch statement.
    const travelIdeas = [
        { category: "nature", title: "Nature escape", text: "Explore Kazakhstan's mountains and wide-open landscapes." },
        { category: "culture", title: "Culture trip", text: "Discover traditional temples, museums, local food and history in Japan." },
        { category: "city", title: "City adventure", text: "Walk through Italy's lively squares, historic streets and beautiful cities." },
        { category: "nature", title: "Coastal reset", text: "Spend a relaxing day by the sea and enjoy the natural scenery." }
    ];
    const title = document.getElementById("suggestionTitle"); const text = document.getElementById("suggestionText");
    const card = document.getElementById("destinationSuggestion"); const message = document.getElementById("interactionMessage");
    function showSuggestion(category) {
        // switch chooses the category based on user input.
        let selectedCategory;
        switch (category) { case "nature": selectedCategory = "nature"; break; case "culture": selectedCategory = "culture"; break; case "city": selectedCategory = "city"; break; default: selectedCategory = "nature"; }
        const matches = travelIdeas.filter(idea => idea.category === selectedCategory);
        const idea = matches[Math.floor(Math.random() * matches.length)];
        if (idea && title && text) { title.textContent = idea.title; text.textContent = idea.text; card?.classList.remove("pulse"); void card?.offsetWidth; card?.classList.add("pulse"); if (message) message.textContent = `Showing a ${selectedCategory} idea. Choose another category to explore more.`; }
    }
    document.querySelectorAll(".travel-filter").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".travel-filter").forEach(item => { item.classList.remove("btn-primary"); item.classList.add("btn-outline-primary"); });
        button.classList.add("btn-primary"); button.classList.remove("btn-outline-primary"); showSuggestion(button.dataset.category);
    }));
    document.getElementById("surpriseMeBtn")?.addEventListener("click", () => {
        const idea = travelIdeas[Math.floor(Math.random() * travelIdeas.length)];
        if (title && text) { title.textContent = idea.title; text.textContent = idea.text; card?.classList.remove("pulse"); void card?.offsetWidth; card?.classList.add("pulse"); }
        if (message) message.textContent = "Surprise! A new travel idea has been selected.";
    });

    // Day/night theme toggle using CSS classes and dynamic text.
    const themeToggle = document.getElementById("themeToggle");
    themeToggle?.addEventListener("click", () => { const night = document.body.classList.toggle("night-mode"); themeToggle.textContent = night ? "Switch to Day Mode" : "Switch to Night Mode"; themeToggle.setAttribute("aria-pressed", String(night)); if (message) message.textContent = night ? "Night theme enabled." : "Day theme enabled."; });

    // Short sound effect made with Web Audio API; no external audio file required.
    document.getElementById("soundToggle")?.addEventListener("click", () => {
        try { const AudioContextClass = window.AudioContext || window.webkitAudioContext; if (!AudioContextClass) throw new Error("Audio unavailable");
            const audio = new AudioContextClass(); const oscillator = audio.createOscillator(); const gain = audio.createGain();
            oscillator.type = "sine"; oscillator.frequency.setValueAtTime(660, audio.currentTime); oscillator.frequency.setValueAtTime(880, audio.currentTime + 0.12);
            gain.gain.setValueAtTime(0.0001, audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.35);
            oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + 0.36); oscillator.addEventListener("ended", () => audio.close());
            if (message) message.textContent = "Travel chime played!";
        } catch (error) { if (message) message.textContent = "Sound is not supported by this browser."; }
    });

    // Keyboard navigation: left/right arrow keys move focus through the main menu.
    const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));
    navLinks.forEach((link, index) => link.addEventListener("keydown", event => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % navLinks.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + navLinks.length) % navLinks.length;
        else return;
        event.preventDefault(); navLinks[nextIndex].focus();
    }));
});


// ==========================================================
// ASSIGNMENT 6: jQuery features
// ==========================================================
$(document).ready(function () {
    console.log("jQuery is ready!");

    // Task 1 and 2: real-time destination search and autocomplete.
    const $destinationInput = $("#destinationSearch");
    const $destinationCards = $(".destination-item");
    const $suggestions = $("#searchSuggestions");
    const destinationNames = $destinationCards.map(function () {
        return $(this).find("h2").first().text().trim();
    }).get();

    function filterDestinations(value) {
        const query = value.toLowerCase().trim();
        let visibleCount = 0;

        $destinationCards.each(function () {
            const $card = $(this);
            const matches = $card.text().toLowerCase().includes(query);
            $card.closest(".col-sm-12").toggle(matches);
            if (matches) visibleCount++;
        });

        $("#searchResultCount").text(
            query ? visibleCount + " destination(s) found." : "Showing all destinations."
        );
    }

    $destinationInput.on("keyup input", function () {
        const query = $(this).val().trim();
        filterDestinations(query);
        $suggestions.empty();

        if (query.length === 0) return;

        const matches = destinationNames.filter(function (name) {
            return name.toLowerCase().includes(query.toLowerCase());
        });

        matches.forEach(function (name) {
            $("<button>", {
                type: "button",
                class: "suggestion-option",
                text: name,
                role: "option"
            }).appendTo($suggestions);
        });

        if (matches.length === 0) {
            $("<div>", { class: "suggestion-empty", text: "No suggestions found" }).appendTo($suggestions);
        }
    });

    $suggestions.on("click", ".suggestion-option", function () {
        const selectedName = $(this).text();
        $destinationInput.val(selectedName);
        filterDestinations(selectedName);
        $suggestions.empty();
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest(".destination-search").length) {
            $suggestions.empty();
        }
    });

    // Task 3: highlight matching words in FAQ questions and answers.
    const $faqSearch = $("#faqSearch");
    const $faqItems = $(".faq-item");
    const faqOriginalContent = [];

    $faqItems.each(function () {
        const $item = $(this);
        faqOriginalContent.push({
            question: $item.find(".faq-question").html(),
            answer: $item.find(".faq-answer p").html()
        });
    });

    $faqSearch.on("input", function () {
        const query = $(this).val().trim();
        let visibleFaqs = 0;

        $faqItems.each(function (index) {
            const $item = $(this);
            const $question = $item.find(".faq-question");
            const $answer = $item.find(".faq-answer p");
            const original = faqOriginalContent[index];

            $question.html(original.question);
            $answer.html(original.answer);

            if (!query) {
                $item.show();
                visibleFaqs++;
                return;
            }

            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp("(" + escapedQuery + ")", "gi");
            const fullText = $item.text();
            const matches = fullText.toLowerCase().includes(query.toLowerCase());

            $item.toggle(matches);
            if (matches) {
                visibleFaqs++;
                $question.html(original.question.replace(regex, "<mark>$1</mark>"));
                $answer.html(original.answer.replace(regex, "<mark>$1</mark>"));
            }
        });

        $("#faqSearchMessage").text(query ? visibleFaqs + " matching FAQ item(s)." : "");
    });

    // Task 4: scroll progress bar.
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const pageHeight = $(document).height() - $(window).height();
        const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
        $("#scrollProgressFill").css("width", progress + "%");
    }
    $(window).on("scroll resize", updateScrollProgress);
    updateScrollProgress();

    // Task 5: animated number counters when they become visible.
    let countersStarted = false;
    function startCounters() {
        const $counters = $(".stat-number");
        if (!$counters.length || countersStarted) return;

        const top = $counters.first().offset().top;
        if (top < $(window).scrollTop() + $(window).height()) {
            countersStarted = true;
            $counters.each(function () {
                const $counter = $(this);
                const target = Number($counter.attr("data-target"));
                $({ count: 0 }).animate({ count: target }, {
                    duration: 1600,
                    easing: "swing",
                    step: function () {
                        $counter.text(Math.floor(this.count).toLocaleString());
                    },
                    complete: function () {
                        $counter.text(target.toLocaleString() + "+");
                    }
                });
            });
        }
    }
    $(window).on("scroll resize", startCounters);
    startCounters();

    // Shared toast notification used by submit and copy actions.
    function showToast(message) {
        const $toast = $("<div>", { class: "travel-toast", text: message });
        $("#toastContainer").append($toast);
        window.setTimeout(function () {
            $toast.addClass("toast-hide");
            window.setTimeout(function () { $toast.remove(); }, 350);
        }, 2400);
    }

    // Task 6: loading spinner on form submission.
    $("form").on("submit", function () {
        const form = this;
        if (!form.checkValidity()) return;

        const $button = $(form).find('button[type="submit"]').first();
        if (!$button.length || $button.prop("disabled")) return;

        const originalText = $button.html();
        $button.prop("disabled", true)
            .html('<span class="jquery-spinner" aria-hidden="true"></span> Please wait...');

        window.setTimeout(function () {
            $button.prop("disabled", false).html(originalText);
            if (form.id === "contactForm") {
                showToast("Your message was validated successfully!");
            } else {
                showToast("Form submitted successfully!");
            }
        }, 1400);
    });

    // Task 7: notifications for useful user actions.
    $(".travel-filter, #surpriseMeBtn, #themeToggle, #soundToggle").on("click", function () {
        const label = $(this).text().trim();
        if (label) showToast(label + " selected");
    });

    // Task 8: copy travel tips to clipboard and show a checkmark.
    $(".copy-tips").on("click", function () {
        const $button = $(this);
        const $container = $button.closest(".card-body, #before-leave");
        const textToCopy = $container.find("ul, ol").text().replace(/\s+/g, " ").trim();

        function copied() {
            const oldText = $button.text();
            $button.text("✓ Copied!");
            showToast("Copied to clipboard!");
            window.setTimeout(function () { $button.text(oldText); }, 1800);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(copied).catch(function () {
                fallbackCopy(textToCopy, copied);
            });
        } else {
            fallbackCopy(textToCopy, copied);
        }
    });

    function fallbackCopy(text, callback) {
        const $temporary = $("<textarea>").val(text).css({
            position: "fixed", left: "-9999px", top: "0"
        }).appendTo("body");
        $temporary[0].select();
        try {
            document.execCommand("copy");
            callback();
        } catch (error) {
            showToast("Copy is not available in this browser.");
        }
        $temporary.remove();
    }

    // Task 9: lazy loading images when they approach the visible screen.
    function loadVisibleImages() {
        $("img[data-src]").each(function () {
            const $image = $(this);
            const imageTop = $image.offset().top;
            const screenBottom = $(window).scrollTop() + $(window).height() + 180;

            if (imageTop < screenBottom) {
                $image.attr("src", $image.attr("data-src"));
                $image.removeAttr("data-src");
            }
        });
    }
    $(window).on("scroll resize", loadVisibleImages);
    loadVisibleImages();
});
