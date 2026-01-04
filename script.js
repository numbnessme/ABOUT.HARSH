document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggling Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeIcon.innerText = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        themeIcon.innerText = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. AI Chat Logic
    const aiWindow = document.getElementById('ai-window');
    const chatBtn = document.getElementById('chat-btn');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatContent = document.getElementById('chat-content');

    // Toggle Window with Animation
    function toggleChat() {
        if (aiWindow.classList.contains('hidden')) {
            aiWindow.classList.remove('hidden');
            setTimeout(() => {
                aiWindow.classList.add('scale-100', 'opacity-100');
            }, 10);
        } else {
            aiWindow.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => {
                aiWindow.classList.add('hidden');
            }, 300);
        }
    }

    chatBtn.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    const API_KEY = "AIzaSyBe0NFsyfkp1RYMNR5_3LB8rt0lVlhOxKU"; // Your Key
    const CONTEXT = "You are Harsh Chauhan's AI. Harsh is a Computer Scientist and Music Producer. He loves Uttarakhand. Be witty.";

    async function handleChat() {
        const msg = chatInput.value.trim();
        if(!msg) return;

        appendMsg('User', msg);
        chatInput.value = '';

        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: CONTEXT + "\nUser: " + msg }] }] })
            });
            const data = await res.json();
            const aiText = data.candidates[0].content.parts[0].text;
            appendMsg('AI', aiText);
        } catch (e) {
            appendMsg('AI', "Lag spike! Check your connection.");
        }
    }

    function appendMsg(sender, text) {
        const div = document.createElement('div');
        div.className = sender === 'AI' 
            ? 'bg-accent/20 p-2 rounded-lg max-w-[85%]' 
            : 'bg-white/10 p-2 rounded-lg text-right ml-auto max-w-[85%]';
        div.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatContent.appendChild(div);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });

    // 3. Scroll-Activated Skill Bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
        });
    }, { threshold: 0.3 });

    skillObserver.observe(document.getElementById('skills'));
});