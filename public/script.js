const chat = document.getElementById('chat');
const expert1 = document.getElementById('expert1');
const expert2 = document.getElementById('expert2');
const btn1 = document.getElementById('respuesta1');
const btn2 = document.getElementById('respuesta2');
const btnLimpiar = document.getElementById('limpiar');
const btnPDF = document.getElementById('pdf');

function agregarMensaje(texto, user) {
    const div = document.createElement('div');
    div.className = `message user${user}`;
    div.innerHTML = `
        <div class="icon">${user === 1 ? '🧑' : '🧑‍💼'}</div>
        <div class="bubble">${texto}</div>
    `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function limpiarChat() {
    chat.innerHTML = '';
}

// Llama a la API para obtener el historial y mostrarlo al cargar
async function cargarHistorial() {
    limpiarChat();
    const res = await fetch('/api/history');
    const data = await res.json();
    data.forEach(msg => {
        agregarMensaje(msg.message, msg.speaker === 'expert1' ? 1 : 2);
    });
}

// Llama a la API para obtener respuesta del experto 1
btn1.onclick = async () => {
    const res = await fetch('/api/expert1', { method: 'POST' });
    const data = await res.json();
    agregarMensaje(data.message, 1);
};

// Llama a la API para obtener respuesta del experto 2
btn2.onclick = async () => {
    const res = await fetch('/api/expert2', { method: 'POST' });
    const data = await res.json();
    agregarMensaje(data.message, 2);
};

// Limpiar historial en backend y frontend
btnLimpiar.onclick = async () => {
    await fetch('/api/conversations/clear', { method: 'DELETE' });
    limpiarChat();
};

// Exportar a PDF (simple, usando print)
btnPDF.onclick = () => {
    window.print();
};

// Al cargar la página, muestra el historial
cargarHistorial();
