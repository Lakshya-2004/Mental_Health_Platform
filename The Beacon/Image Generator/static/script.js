const chatBox  = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-btn");

function addMessage(text, sender, memeUrl = null) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = text;
    chatBox.appendChild(msg);

    if (memeUrl) {
        const img = document.createElement("img");
        img.src = memeUrl;
        img.classList.add("meme");
        chatBox.appendChild(img);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const indicator = document.createElement("div");
    indicator.classList.add("typing-indicator");
    indicator.id = "typing";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(indicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const el = document.getElementById("typing");
    if (el) el.remove();
}

function setLoading(state) {
    sendBtn.disabled  = state;
    userInput.disabled = state;
}

sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";
    setLoading(true);
    showTyping();

    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    hideTyping();
    addMessage(data.reply, "bot", data.meme_url);
    setLoading(false);
    userInput.focus();
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});