// 1. Theme Toggling Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// 2. AI Chat Logic (Simulated Interaction)
function toggleChat() {
    const chatWindow = document.getElementById('ai-window');
    chatWindow.classList.toggle('hidden');
    chatWindow.classList.toggle('active');
}

const chatInput = document.getElementById('chat-input');
const chatContent = document.getElementById('chat-content');

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== "") {
        const userMsg = chatInput.value;
        appendMessage('User', userMsg);
        chatInput.value = '';
        
        // Simple AI Response logic
        setTimeout(() => {
            let botResponse = "That's a great question! I specialize in Neural Networks and Logic Pro X.";
            if(userMsg.toLowerCase().includes("travel")) botResponse = "I've been to Tokyo, Paris, and New York. Check the blog!";
            appendMessage('AI', botResponse);
        }, 600);
    }
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'AI' ? 'bg-accent/20 p-2 rounded-lg' : 'bg-slate-200 dark:bg-slate-800 p-2 rounded-lg text-right';
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatContent.appendChild(msgDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 3. Scroll-Activated Skill Bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
});

observer.observe(document.getElementById('skills'));