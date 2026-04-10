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

function logout() {
    localStorage.removeItem('kinedict_auth');
    window.location.href = '/';
}

// Animaciones de entrada para formularios
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.glass-card');
    sections.forEach((s, index) => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        setTimeout(() => {
            s.style.transition = 'all 0.6s ease-out';
            s.style.opacity = '1';
            s.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. DINÁMICA DEL NAVBAR (Auth)
    const authContainer = document.getElementById("auth-container");
    if (authContainer) {
        const isLoggedIn = localStorage.getItem("kinedict_auth") === "true";
        const userName = localStorage.getItem("kinedict_user") || "Eduardo Larrain";
        
        if (isLoggedIn) {
            // Usuario Logeado
            authContainer.innerHTML = `
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100" alt="Avatar" class="w-12 h-12 rounded-full border-2 border-kineLime object-cover mb-2 shadow-md">
                <span class="text-sm font-bold text-white whitespace-nowrap">${userName}</span>
                <button onclick="logout()" class="text-[10px] font-bold text-kineLime hover:text-white hover:underline transition-colors mt-1 uppercase tracking-wider cursor-pointer">Cerrar Sesion</button>
            `;
        } else {
            // Usuario No Logeado
            authContainer.innerHTML = `
                <i class="fa-regular fa-circle-user text-3xl text-white/50 mb-2"></i>
                <a href="login.html" class="text-sm font-bold text-kineLime hover:text-white transition-colors uppercase tracking-wider text-center">INICIA SESIÓN<br><span class="text-[10px] text-white/50 font-normal">o Identifícate</span></a>
            `;
        }
    }

    // 2. LÓGICA DE LOGIN / REGISTRO CON SPINNER
    const authForm = document.getElementById("auth-form");
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Si es el registro, toma el nombre. Si es login, usa uno por defecto.
            const nameInput = authForm.querySelector('input[placeholder="Nombre Completo"]');
            const userName = nameInput ? nameInput.value : "Eduardo Larrain";

            // Mostrar el spinner de carga
            const spinner = document.getElementById("loading-spinner");
            if (spinner) spinner.classList.remove("hidden");

            // Esperar 3.5 segundos, guardar datos y redirigir
            setTimeout(() => {
                localStorage.setItem("kinedict_auth", "true");
                localStorage.setItem("kinedict_user", userName);
                window.location.href = "index.html";
            }, 3500);
        });
    }

    // (Si tienes código de modo oscuro o traductor en tu script, déjalo aquí abajo)
});

// Función global para cerrar sesión
function logout() {
    localStorage.removeItem("kinedict_auth");
    localStorage.removeItem("kinedict_user");
    window.location.reload(); // Recarga la página actual
}

// ----------------------------------------------------
    // LÓGICA DEL BOTÓN: FINALIZAR Y EVALUAR (evaluacion.html)
    // ----------------------------------------------------
    const btnEvaluar = document.getElementById('btn-evaluar');
    if (btnEvaluar) {
        btnEvaluar.addEventListener('click', () => {
            const texto = document.getElementById('btn-texto');
            const spinner = document.getElementById('btn-spinner');

            // 1. Desactivar interacciones y cambiar estilo visual a "cargando"
            btnEvaluar.classList.remove('hover:scale-[1.01]');
            btnEvaluar.classList.add('bg-[#8ece28]', 'scale-95', 'opacity-90', 'cursor-not-allowed', 'pointer-events-none');
            
            // 2. Cambiar texto y mostrar spinner
            texto.textContent = 'PROCESANDO DATOS BIOMECÁNICOS...';
            spinner.classList.remove('hidden');

            // 3. Esperar 2 segundos simulando cálculos y redirigir
            setTimeout(() => {
                window.location.href = 'resultados.html';
            }, 2000);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. MODO OSCURO / CLARO GLOBAL
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('kinedict_theme') || 'dark';

    // Aplicar al inicio
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
        if(themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
    } else {
        htmlElement.classList.remove('dark');
        if(themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
    }

    // Funcionalidad del click (Solo si el botón existe en la página actual)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            const themeToSave = isDark ? 'dark' : 'light';
            
            if (themeIcon) {
                if (isDark) {
                    themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon');
                }
            }
            localStorage.setItem('kinedict_theme', themeToSave);
        });
    }

    // Funcionalidad del botón de alternar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            let themeToSave = 'light';
            
            if (htmlElement.classList.contains('dark')) {
                themeToSave = 'dark';
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Guardar en la memoria del navegador
            localStorage.setItem('kinedict_theme', themeToSave);
        });
    }

    // ==========================================
    // 2. SISTEMA DE TRADUCCIÓN GLOBAL BÁSICO
    // ==========================================
    const langToggle = document.getElementById('lang-toggle');
    
    // Diccionario de traducciones (Agrega aquí los textos de toda la web)
    const translations = {
        es: {
            nav_home: "Inicio",
            nav_profile: "Perfil",
            nav_tests: "Tests",
            nav_history: "Historial",
            nav_info: "Info",
            hero_title: "Plataforma de examen preventivo para deportistas",
            hero_desc: "Kinedict ayuda a realizar exámenes de predicción de índice lesivo para distintos estilos de vida.",
            hero_btn: "Pruébalo →",
            res_eval_fin: "Evaluación Finalizada",
            res_diag: "Tu Diagnóstico Actual:",
            res_status: "POCA PROPENSIÓN A LESIÓN",
            res_desc: "De acuerdo con tus resultados en la simetría (Y-Balance), potencia (Hop Test) y patrones de movimiento (FMS), tu cuerpo presenta una excelente adaptación biomecánica. Sin embargo, hay áreas que puedes optimizar. Sigue haciendo scroll.",
            res_card1_t: "Entrenamiento Correctivo Funcional (FMS)",
            res_card1_d: "Si tu puntuación en pruebas como el *Deep Squat* o el *Inline Lunge* fue menor a 3, los estudios médicos recientes demuestran que integrar ejercicios correctivos aislados mejora significativamente la estabilidad de tu core (tronco) y reduce los patrones de compensación articular, previniendo lesiones graves a futuro.",
            res_card2_t: "Simetría Muscular Unilateral",
            res_card2_d: "El Y-Balance Test suele revelar pequeñas asimetrías entre tus piernas derecha e izquierda. La literatura médica recomienda incorporar ejercicios unilaterales (como sentadillas búlgaras o pesos muertos a una pierna). Una diferencia mayor a 4cm en alcances suele predecir esguinces de tobillo o rodilla.",
            res_card3_t: "La Paradoja del Entrenamiento",
            res_card3_d: "¿Sientes molestias luego del Hop Test? Contrario a lo que se piensa, descansar totalmente no siempre previene lesiones. Estudios confirman que el sub-entrenamiento puede ser tan dañino como el sobreentrenamiento. Mantener una carga de trabajo crónica alta pero estable es la mejor armadura contra roturas de tejidos.",
            res_btn: "VOLVER A MIS TESTS",
        },
        en: {
            nav_home: "Home",
            nav_profile: "Profile",
            nav_tests: "Exams",
            nav_history: "History",
            nav_info: "Info",
            hero_title: "Preventive screening platform for athletes",
            hero_desc: "Kinedict helps perform injury index prediction exams for different lifestyles.",
            hero_btn: "Try it out →",
            res_eval_fin: "Evaluation Completed",
            res_diag: "Your Current Diagnosis:",
            res_status: "LOW INJURY PROPENSITY",
            res_desc: "Based on your results in symmetry (Y-Balance), power (Hop Test), and movement patterns (FMS), your body shows excellent biomechanical adaptation. However, there are areas you can optimize. Keep scrolling.",
            res_card1_t: "Functional Corrective Training (FMS)",
            res_card1_d: "If your score on tests like the *Deep Squat* or *Inline Lunge* was less than 3, recent medical studies show that integrating isolated corrective exercises significantly improves your core stability and reduces joint compensation patterns, preventing future severe injuries.",
            res_card2_t: "Unilateral Muscular Symmetry",
            res_card2_d: "The Y-Balance Test often reveals small asymmetries between your right and left legs. Medical literature recommends incorporating unilateral exercises (like Bulgarian split squats or single-leg deadlifts). A difference greater than 4cm in reach often predicts ankle or knee sprains.",
            res_card3_t: "The Training Paradox",
            res_card3_d: "Feeling discomfort after the Hop Test? Contrary to popular belief, complete rest doesn't always prevent injuries. Studies confirm that under-training can be as harmful as over-training. Maintaining a high but stable chronic workload is the best armor against tissue tears.",
            res_btn: "BACK TO MY TESTS"
        }
    };

    // Leer el idioma guardado
    let currentLang = localStorage.getItem('kinedict_lang') || 'es';

    // Función para aplicar los textos según el idioma
    const applyLanguage = (lang) => {
        // Busca todos los elementos HTML que tengan el atributo data-i18n
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');
        
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Si es un input o textarea cambia el placeholder, sino el texto interno
                if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    };

    // Aplicar el idioma al cargar la página
    applyLanguage(currentLang);

    // Funcionalidad del botón de alternar idioma
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es'; // Alterna entre es/en
            localStorage.setItem('kinedict_lang', currentLang); // Guarda la selección
            applyLanguage(currentLang); // Aplica los cambios visualmente
        });
    }

});

// ==========================================
    // 3. ANIMACIÓN DE SCROLL (Para resultados.html)
    // ==========================================
    const reveals = document.querySelectorAll('.scroll-reveal');
    if(reveals.length > 0) {
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;
            reveals.forEach(reveal => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
    }

    
