const chat = document.getElementById('chat');
const expert1 = document.getElementById('expert1');
const expert2 = document.getElementById('expert2');
const btn1 = document.getElementById('respuesta1');
const btn2 = document.getElementById('respuesta2');
const btnLimpiar = document.getElementById('limpiar');
const btnPDF = document.getElementById('pdf');

// Función para obtener el ícono según el tipo de experto
function obtenerIcono(tipoUsuario) {
    const experto = tipoUsuario === 1 ? expert1.value : expert2.value;
    return experto === 'Cientifico' ? '👨‍🔬' : '👨‍⚕️';
}

async function hacerPeticion(speaker, mensaje) {
    try {
        console.log('Enviando petición:', { speaker, mensaje });
        
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker,
                expert1: expert1.value,
                expert2: expert2.value,
                message: mensaje || "la eutanacia es un tema controvertido que involucra consideraciones éticas, legales y personales. ¿Qué opinas al respecto? cientifico opina que si .. y psicologo opina que no",
            })
        });

        // Log de la respuesta
        console.log('Estado de la respuesta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error detallado:', errorText);
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta exitosa:', data);
        return data;
    } catch (error) {
        console.error('Error detallado:', error);
        throw error;
    }
}

function agregarMensaje(texto, tipoUsuario) {
    const div = document.createElement('div');
    div.className = `message user${tipoUsuario}`;
    div.innerHTML = `
        <div class="icon">${obtenerIcono(tipoUsuario)}</div>
        <div class="bubble">${texto}</div>
    `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

btn1.onclick = async () => {
    try {
        btn1.disabled = true;
        const mensaje = chat.children.length === 0 ? null : 
            chat.lastElementChild?.querySelector('.bubble')?.textContent;
            
        const data = await hacerPeticion('expert1', mensaje);
        if (data.response) {
            agregarMensaje(data.response, 1);
            btn2.disabled = false;
        }
    } catch (err) {
        agregarMensaje(err.message, 1);
    } finally {
        btn1.disabled = false;
    }
};

btn2.onclick = async () => {
    try {
        btn2.disabled = true;
        const mensaje = chat.lastElementChild?.querySelector('.bubble')?.textContent;
        
        const data = await hacerPeticion('expert2', mensaje);
        if (data.response) {
            agregarMensaje(data.response, 2);
            btn1.disabled = false;
        }
    } catch (err) {
        agregarMensaje(err.message, 2);
    } finally {
        btn2.disabled = false;
    }
};

// Limpiar historial del chat
btnLimpiar.onclick = () => {
    chat.innerHTML = '';
    btn1.disabled = false;
    btn2.disabled = true;
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    btn2.disabled = true;
});

