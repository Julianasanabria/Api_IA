// Mensajes de ejemplo para cada experto
/* const respuestas = {
    Comunista: [
        "Hola, me gustaría debatir sobre un tema en particular.",
        "Desde mi punto de vista, esta cuestión es muy importante"
    ],
    Conservador: [
        "¡Claro! Estoy listo para escuchar tus argumentos.",
        "Entiendo tu perspectiva, pero no estoy de acuerdo."
    ],
    Liberal: [
        "Estoy abierto al diálogo y a nuevas ideas.",
        "Creo que la libertad individual es fundamental."
    ],
    Feminista: [
        "Me interesa mucho debatir sobre igualdad.",
        "La equidad de género es esencial en la sociedad."
    ]
}; */

const chat = document.getElementById('chat');
const expert1 = document.getElementById('expert1');
const expert2 = document.getElementById('expert2');
const expert3 = document.getElementById('expert3');
const btn1 = document.getElementById('respuesta1');
const btn2 = document.getElementById('respuesta2');
const btn3 = document.getElementById('respuesta3');
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

btn1.onclick = () => {
    const experto = expert1.value;
    const idx = chat.querySelectorAll('.user1').length;
    const texto = respuestas[experto][idx % respuestas[experto].length] || "Sin respuesta.";
    agregarMensaje(texto, 1);
};

btn2.onclick = () => {
    const experto = expert2.value;
    const idx = chat.querySelectorAll('.user2').length;
    const texto = respuestas[experto][idx % respuestas[experto].length] || "Sin respuesta.";
    agregarMensaje(texto, 2);
};

btnLimpiar.onclick = limpiarChat;

// Exportar a PDF (simple, usando print)
btnPDF.onclick = () => {
    window.print();
};

// Inicializar con mensajes de ejemplo
agregarMensaje(respuestas[expert1.value][0], 1);
agregarMensaje(respuestas[expert2.value][0], 2);
agregarMensaje(respuestas[expert1.value][1], 1);
agregarMensaje(respuestas[expert2.value][1], 2);
