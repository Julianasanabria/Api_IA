const chat = document.getElementById('chat');
const expert1 = document.getElementById('expert1');
const expert2 = document.getElementById('expert2');
const btn1 = document.getElementById('respuesta1');
const btn2 = document.getElementById('respuesta2');
const btnLimpiar = document.getElementById('limpiar');
const btnPDF = document.getElementById('pdf');
const promptInput = document.getElementById('promptInput');
const btnEnviar = document.getElementById('enviar');

function agregarMensaje(texto, tipoUsuario) {
    let icono = '👤';
    if (tipoUsuario === 1) icono = '🔬';
    if (tipoUsuario === 2) icono = '🧠';

    const div = document.createElement('div');
    div.className = `message user${tipoUsuario}`;
    div.innerHTML = `
        <div class="icon">${icono}</div>
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
    try {
        const res = await fetch('http://localhost:3000/api/history');
        if (!res.ok) {
            throw new Error('Error al cargar el historial');
        }
        const data = await res.json();
        data.forEach(msg => {
            agregarMensaje(msg.message, msg.speaker === 'expert1' ? 1 : 2);
        });
    } catch (err) {
        agregarMensaje('Error al cargar el historial', 1);
        console.error('Error al cargar el historial:', err);
    }
}

// enviar pregunta
btnEnviar.onclick = async () => {
    const prompt = promptInput.value;
    if (!prompt){
        agregarMensaje('Por favor escribe una pregunta', 1);
        return;
    }
    // Mostrar la pregunta del usuario
    agregarMensaje(prompt, 1);
    
    try {
        // Obtener respuesta del experto 1
        const res1 = await fetch('http://localhost:3000/api/expert1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt
            })
        });
        
        if (!res1.ok) throw new Error('Error en respuesta del experto 1');
        const data1 = await res1.json();
        agregarMensaje(data1.message, 1);

        // Obtener respuesta del experto 2
        const res2 = await fetch('http://localhost:3000/api/expert2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt
            })
        });
        
        if (!res2.ok) throw new Error('Error en respuesta del experto 2');
        const data2 = await res2.json();
        agregarMensaje(data2.message, 2);

        // Limpiar el input después de las respuestas
        promptInput.value = '';
    } catch (err) {
        agregarMensaje('Error: ' + err.message, 1);
        console.error('Error:', err);
    }
}

// Respuesta individual del experto 1
btn1.onclick = async () => {
    try {
        const prompt = promptInput.value;
        if (!prompt) {
            throw new Error('Por favor escribe una pregunta', 1);
        }
        agregarMensaje(prompt, 1); // Mostrar pregunta del usuario
        
        const res = await fetch('http://localhost:3000/api/expert1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                expert: expert1.value
            })
        });
        
        if (!res.ok) throw new Error('Error al obtener respuesta del experto 1');
        const data = await res.json();
        agregarMensaje(data.message, 1);
        promptInput.value = '';
    } catch (err) {
        agregarMensaje(err.message, 1);
        console.error('Error:', err);
    }
};

// Llama a la API para obtener respuesta del experto 2
btn2.onclick = async () => {
    try {
        const prompt = promptInput.value;
        if (!prompt) {
            throw new Error("Por favor, ingresa tu pregunta.");
        }
        agregarMensaje(prompt, 2); // Mostrar pregunta del usuario

        const res = await fetch('http://localhost:3000/api/expert2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt
            })
        });
        if (!res.ok) {
            throw new Error('Error al obtener respuesta del experto 2');
        }
        const data = await res.json();
        agregarMensaje(data.message, 2);
        promptInput.value = '';
    } catch (err) {
        agregarMensaje('Error al obtener respuesta del experto 2', 2);
        console.error('Error al obtener respuesta del experto 2:', err);
    }
}

// Limpiar historial en backend y frontend
btnLimpiar.onclick = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/clear', { method: 'DELETE' });
        if (!res.ok) {
            throw new Error('Error al limpiar el historial');
        }
        const data = await res.json();
        agregarMensaje(data.message, 1);

        // Limpiar el chat en la interfaz
        limpiarChat();
    } catch (err) {
        agregarMensaje('Error al limpiar el historial', 1);
        console.error('Error al limpiar el historial:', err);
    }
};

// Exportar a PDF (simple, usando print)
btnPDF.onclick = () => {
    window.print();
};

// Al cargar la página, muestra el historial
cargarHistorial();

