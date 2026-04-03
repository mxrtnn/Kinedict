// --- DENTRO DE TU SCRIPT DE JAVASCRIPT ---

// 1. Base de datos de imágenes de consejos (Mockup)
const baseDeImagenesDeConsejos = {
    'NUTRICION_POTASIO': {
        texto: 'Aumenta tu consumo de potasio. Los plátanos son una excelente opción.',
        imagen: 'assets/consejos/bananas.gif' // Ruta a tu GIF animado
    },
    'DESCANSO_SUEÑO': {
        texto: 'Mejora la higiene del sueño. Duerme entre 7 y 8 horas diarias para regenerar tejidos.',
        imagen: 'assets/consejos/dormir.gif'
    },
    'MOVILIDAD_FLEXIBILIDAD': {
        texto: 'Incorpora rutinas de movilidad dinámica antes de entrenar.',
        imagen: 'assets/consejos/estirar.gif'
    }
    // Agrega tantos consejos como el algoritmo requiera
};

// 2. Función que renderiza la tarjeta de consejo dinámicamente
function mostrarConsejoAdaptativo(idDelConsejo) {
    const contenedor = document.getElementById('contenedor-resultados-consejos');
    const datos = baseDeImagenesDeConsejos[idDelConsejo];

    if (!datos) return; // Si el ID no existe, no hace nada

    // Creamos el HTML dinámicamente con Tailwind
    const htmlSnippet = `
        <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-center gap-6 mb-4">
            <div class="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden">
                <img src="${datos.imagen}" alt="Animación de consejo" class="w-full h-full object-cover">
            </div>
            <div>
                <span class="text-xs font-bold text-kineLime tracking-wider">RECOMENDACIÓN PROFESIONAL</span>
                <p class="text-slate-700 text-base leading-relaxed mt-1">${datos.texto}</p>
            </div>
        </div>
    `;

    // Lo inyectamos en la página
    contenedor.innerHTML = htmlSnippet;
}

// --- EJEMPLO DE USO ---
// Imagina que el algoritmo calculó los resultados y decidió que el consejo principal es nutrición.
// Llamaríamos a la función así al cargar la página de resultados:
mostrarConsejoAdaptativo('NUTRICION_POTASIO');


// Lógica principal de KINEDICT

// Mensaje de prueba para confirmar que el archivo está bien conectado
console.log("¡Script de Kinedict cargado correctamente!");

// Aquí estructuraremos la lógica del formulario y los resultados dinámicos