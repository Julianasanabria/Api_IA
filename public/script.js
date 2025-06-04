const chat = document.getElementById('chat');
const btn1 = document.getElementById('respuesta1');
const btn2 = document.getElementById('respuesta2');
const btnLimpiar = document.getElementById('limpiar');
const btnPDF = document.getElementById('pdf');

let debateActive = false;
let turno = 0;
const preguntaBase = "¿Qué sucedería si los humanos pudiéramos utilizar el 100% de nuestra capacidad cerebral? Desmitifica esta creencia y explica las implicaciones realistas.";

function agregarMensaje(texto, tipoUsuario) {
    let icono = '👤';
    let nombre = 'Usuario';
    
    if (tipoUsuario === 0) {
        icono = '❓';
        nombre = 'Sistema';
    } else if (tipoUsuario === 1) {
        icono = '🔬';
        nombre = 'Científico';
    } else if (tipoUsuario === 2) {
        icono = '🧠';
        nombre = 'Psicólogo';
    }

    const div = document.createElement('div');
    div.className = `message user${tipoUsuario}`;
    div.innerHTML = `
        <div class="icon">${icono}</div>
        <div class="bubble">
            <strong>${nombre}:</strong><br>
            ${texto}
        </div>
    `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function limpiarChat() {
    chat.innerHTML = '';
}

function actualizarIndicadorTurno() {
    const indicator = document.getElementById('turnoIndicador');
    if (turno === 0) {
        indicator.textContent = 'Debate no iniciado';
        indicator.className = 'turno-indicador';
    } else if (turno === 1) {
        indicator.textContent = 'Turno: Científico';
        indicator.className = 'turno-indicador cientifico';
    } else {
        indicator.textContent = 'Turno: Psicólogo';
        indicator.className = 'turno-indicador psicologo';
    }
}

async function obtenerUltimoMensaje() {
    try {
        const res = await fetch('http://localhost:3000/api/historial');
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error en el servidor');
        }
        const data = await res.json();
        return data.length > 0 ? data[data.length - 1].message : preguntaBase;
    } catch (err) {
        console.error('Error al obtener último mensaje:', err);
        agregarMensaje(`Error: ${err.message}`, 0);
        return preguntaBase;
    }
}

async function iniciarDebate() {
    try {
        debateActive = true;
        turno = 1;
        actualizarIndicadorTurno();
        limpiarChat();
        
        // Agregar título del debate
        const titleDiv = document.createElement('div');
        titleDiv.className = 'debate-title';
        titleDiv.textContent = 'Debate: Capacidad Cerebral Humana';
        chat.appendChild(titleDiv);
        
        // Agregar pregunta base al chat
        agregarMensaje(preguntaBase, 0);
        
        // Obtener respuesta del experto 1
        const res1 = await fetch('http://localhost:3000/api/experto1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: preguntaBase })
        });
        
        if (!res1.ok) {
            const errorData = await res1.json();
            throw new Error(errorData.error || 'Error en experto 1');
        }
        
        const data1 = await res1.json();
        agregarMensaje(data1.message, 1);
        
        // Cambiar turno al experto 2
        turno = 2;
        actualizarIndicadorTurno();
        
    } catch (err) {
        agregarMensaje(`Error al iniciar debate: ${err.message}`, 0);
        console.error('Error al iniciar debate:', err);
        debateActive = false;
        turno = 0;
        actualizarIndicadorTurno();
    }
}

async function responderExperto(expertoId) {
    try {
        const ultimoMensaje = await obtenerUltimoMensaje();
        const endpoint = expertoId === 1 ? 'experto1' : 'experto2';
        
        const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: ultimoMensaje })
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Error en experto ${expertoId}`);
        }
        
        const data = await res.json();
        agregarMensaje(data.message, expertoId);
        
        // Alternar turno
        turno = expertoId === 1 ? 2 : 1;
        actualizarIndicadorTurno();
        
    } catch (err) {
        agregarMensaje(`Error en experto: ${err.message}`, 0);
        console.error(`Error en experto ${expertoId}:`, err);
    }
}

// Eventos de botones
btn1.onclick = async () => {
    if (!debateActive) {
        await iniciarDebate();
    } else if (turno === 1) {
        await responderExperto(1);
    } else {
        agregarMensaje('Espera el turno científico', 0);
    }
};

btn2.onclick = async () => {
    if (!debateActive) {
        await iniciarDebate();
    } else if (turno === 2) {
        await responderExperto(2);
    } else {
        agregarMensaje('Espera el turno psicólogo', 0);
    }
};

btnLimpiar.onclick = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/limpiar', { method: 'DELETE' });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error al limpiar');
        }
        
        const data = await res.json();
        limpiarChat();
        debateActive = false;
        turno = 0;
        actualizarIndicadorTurno();
        //agregarMensaje('Debate reiniciado. Presiona un botón de experto para comenzar.', 0);
        agregarMensaje(data.message, 0);
        
    } catch (err) {
        agregarMensaje(`Error al reiniciar: ${err.message}`, 0);
        console.error('Error al reiniciar:', err);
    }
};

btnPDF.onclick = () => {
    window.print();
};

// Al cargar la página
actualizarIndicadorTurno();