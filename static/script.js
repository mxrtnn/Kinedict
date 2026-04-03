// ==========================================
// LÓGICA PRINCIPAL DE KINEDICT
// ==========================================
console.log("¡Script de Kinedict cargado correctamente!");

// ------------------------------------------
// 1. SISTEMA DE RECOMENDACIONES (MOCKUP)
// ------------------------------------------
const baseDeImagenesDeConsejos = {
    'NUTRICION_POTASIO': {
        texto: 'Aumenta tu consumo de potasio. Los plátanos son una excelente opción.',
        imagen: 'assets/consejos/bananas.gif'
    },
    'DESCANSO_SUEÑO': {
        texto: 'Mejora la higiene del sueño. Duerme entre 7 y 8 horas diarias para regenerar tejidos.',
        imagen: 'assets/consejos/dormir.gif'
    },
    'MOVILIDAD_FLEXIBILIDAD': {
        texto: 'Incorpora rutinas de movilidad dinámica antes de entrenar.',
        imagen: 'assets/consejos/estirar.gif'
    }
};

function mostrarConsejoAdaptativo(idDelConsejo) {
    const contenedor = document.getElementById('contenedor-resultados-consejos');
    
    // ¡Validación crucial! Si el contenedor no existe en esta página, la función se detiene sin romper el resto del script.
    if (!contenedor) return; 

    const datos = baseDeImagenesDeConsejos[idDelConsejo];
    if (!datos) return; 

    const htmlSnippet = `
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 flex items-center gap-6 mb-4 transition-colors">
            <div class="w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden">
                <img src="${datos.imagen}" alt="Animación de consejo" class="w-full h-full object-cover">
            </div>
            <div>
                <span class="text-xs font-bold text-kineLime tracking-wider">RECOMENDACIÓN PROFESIONAL</span>
                <p class="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-1">${datos.texto}</p>
            </div>
        </div>
    `;

    contenedor.innerHTML = htmlSnippet;
}

// Llamada de prueba (solo funcionará cuando creemos la página de resultados)
mostrarConsejoAdaptativo('NUTRICION_POTASIO');


// ------------------------------------------
// 2. MODO OSCURO (DARK MODE)
// ------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Verificamos si los botones existen en la página actual
if (themeToggleBtn && themeIcon) {
    // Comprobar preferencia guardada o sistema operativo
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlElement.classList.remove('dark');
    }

    // Evento de clic
    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}


// ------------------------------------------
// 3. SISTEMA DE TRADUCCIÓN
// ------------------------------------------
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
let currentLang = localStorage.getItem('lang') || 'es';

const translations = {
    es: {
        nav_home: "Inicio",
        nav_about: "Nosotros",
        nav_services: "Servicios",
        nav_blog: "Blog",
        nav_contact: "Contacto",
        nav_login: "Iniciar Sesión"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_services: "Services",
        nav_blog: "Blog",
        nav_contact: "Contact",
        nav_login: "Log In"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Si el elemento es un input o un placeholder, se maneja distinto, pero por ahora solo es texto
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    if (langText) langText.textContent = lang;
    localStorage.setItem('lang', lang);
}

// Inicializar idioma al cargar
updateLanguage(currentLang);

// Evento de clic
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(currentLang);
    });
}