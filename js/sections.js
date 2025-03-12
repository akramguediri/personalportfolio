import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js';

// ✅ Section Data with Date Field (Italic)
const sections = [
    {
        y: 0, x: 0,
        title: "",
        description: "",
        date: "",
        alignRight: false
    },
    {
        y: -5, x: 15,
        title: "Mastering the Algorithmic Arena",
        description: "Ranked among the top 1000 in CodinGame. Precision, logic, and strategy—honed in real-time competition.",
        date: "codingame.com, \n2023",
        alignRight: false
    },
    {
        y: -10, x: -15,
        title: "AI That Sees Beyond",
        description: "Winner of an AI Hackathon. Engineered a computer vision system that detects parking availability in real-time—because perception is power.",
        date: "Le jour d\'IA,\n 2022",
        alignRight: true
    },
    {
        y: -15, x: 15,
        title: "Exposing the Unseen",
        description: "Penetration tester for high-stakes operations. Master of OSINT, automation, and ethical intrusion.\nWas involved in private and government-related company projects.",
        date: "NDA - Tunis, \nFeb 2022 - Aug 2022",
        alignRight: false
    },
    {
        y: -20, x: -15,
        title: "Architect of Intelligence",
        description: "Shaped the mind of machines—fine-tuning LLMs, automating intelligence, and pushing the limits of AI in cybersecurity and fintech.",
        date: "Scale AI - San Francisco (remote) \n Jul 2024 - Oct 2024",
        alignRight: true
    },
    {
        y: -25, x: 15,
        title: "Engineering Digital Worlds",
        description: "Creative Director and IT Strategist. Designed immersive gaming experiences, built robust systems, automations, and crafted digital identities.",
        date: "GameZoneIsetMa - Mahdia, \n Mar 2020 - Mar 2023",
        alignRight: false
    },
    {
        y: -30, x: -15,
        title: "Decoding Luxury",
        description: "Certified by LVMH in branding and global supply chain mastery. Where technology meets high-end precision.",
        date: "2024",
        alignRight: true
    },
    {
        y: -35, x: 15,
        title: "42 Heilbronn: Forging a Hacker Mindset",
        description: "Not just learning—evolving. Advanced system architecture, low-level programming, and creative problem-solving.",
        date: "Heilbronn, \n2023 - Present",
        alignRight: false
    },
    {
        y: -40, x: -15,
        title: "Mastering the Stack",
        description: "Cybersecurity. AI. Creative Computing. I move seamlessly between Python, C++, TensorFlow, and Three.js—because limits are illusions.",
        date: "Ongoing...",
        alignRight: true
    },
    {
        y: -45, x: 15,
        title: "Connections That Matter",
        description: "AI, Cybersecurity, Digital Art. If you seek innovation at the edge, let’s talk.",
        date: "Always Open",
        alignRight: false
    }
];

let currentSection = 0;
let scrollCooldown = false;

// ✅ Create & Store Text Container
let textContainer;
export function initializeSections(scene, camera) {
    textContainer = document.createElement("div");
    textContainer.style.position = "absolute";
    textContainer.style.top = "15%";
    textContainer.style.width = "35%";
    textContainer.style.color = "red";
    textContainer.style.fontSize = "1.8rem";
    textContainer.style.fontFamily = "BrillantFont";
    textContainer.style.textShadow = "2px 2px 10px rgba(255, 255, 255, 0.2)";
    textContainer.style.zIndex = "1000";
    textContainer.style.textAlign = "left";
    document.body.appendChild(textContainer);

    updateSectionText(sections[0].title, sections[0].description, sections[0].date, sections[0].alignRight);
}

// ✅ Handle Scroll Events
export function handleScroll(event, camera) {
    if (scrollCooldown) return;
    scrollCooldown = true;

    setTimeout(() => {
        scrollCooldown = false;
    }, 800);

    const delta = event.deltaY > 0 ? 1 : -1;
    const newIndex = currentSection + delta;

    if (newIndex >= 0 && newIndex < sections.length) {
        currentSection = newIndex;
        console.log(`➡️ Switching to section ${currentSection}: ${sections[currentSection].title}`);

        gsap.to(textContainer, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                updateSectionText(
                    sections[currentSection].title,
                    sections[currentSection].description,
                    sections[currentSection].date,
                    sections[currentSection].alignRight
                );
                gsap.to(textContainer, { opacity: 1, duration: 0.5 });
            }
        });

        moveToSection(camera, sections[currentSection].y);
    } else {
        console.warn("🚨 No more sections to scroll!");
    }
}

// ✅ Move Camera to New Section
function moveToSection(camera, targetY) {
    gsap.to(camera.position, {
        y: targetY,
        duration: 1.5,
        ease: "power2.inOut",
    });
}

// ✅ Update Text Content (Now Includes Date)
function updateSectionText(title, description, date, alignRight) {
    if (!textContainer) {
        console.error("❌ Text container is not initialized!");
        return;
    }

    textContainer.innerHTML = "";

    if (alignRight) {
        textContainer.style.left = "unset";
        textContainer.style.right = "5%";
        textContainer.style.textAlign = "right";
    } else {
        textContainer.style.left = "5%";
        textContainer.style.right = "unset";
        textContainer.style.textAlign = "left";
    }

    const titleElement = document.createElement("h2");
    titleElement.innerText = title;
    titleElement.style.fontSize = "2.5rem";
    titleElement.style.marginBottom = "10px";
    titleElement.style.fontFamily = "BrillantFont";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = description;
    descriptionElement.style.fontSize = "1.5rem";
    descriptionElement.style.fontFamily = "paragraph";
    descriptionElement.style.lineHeight = "1.5";

    // ✅ Date Element (Italic)
    const dateElement = document.createElement("p");
    dateElement.innerText = date;
    dateElement.style.fontSize = "1.2rem";
    dateElement.style.fontStyle = "italic";
    dateElement.style.opacity = "0.8";
    dateElement.style.fontFamily = "paragraph";
    dateElement.style.marginTop = "5px";

    textContainer.appendChild(titleElement);
    textContainer.appendChild(descriptionElement);
    textContainer.appendChild(dateElement);
}
