// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio entre 5px y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Animación con duración aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Retraso aleatorio
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

// Efecto parallax para el fondo
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const waves = document.querySelectorAll('.wave');
        const shine = document.querySelector('.shine');

        if (waves) {
            waves.forEach((wave, index) => {
                const speed = 0.05 + (index * 0.02);
                wave.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }

        if (shine) {
            shine.style.transform = `translateX(${scrollPosition * 0.3}px) translateY(${scrollPosition * 0.2}px)`;
        }
    });
}

// Función para mostrar tarjetas de éxito
function showSuccessCard(cardId, isLogin = false) {
    const successCard = document.getElementById(cardId);
    if (successCard) {
        successCard.classList.add('active');

        // Redirigir después de 3 segundos
        setTimeout(function() {
            if (isLogin) {
                window.location.href = '../index.html';
            } else {
                window.location.href = 'login.html';
            }
        }, 3000);
    }
}

// Función para seleccionar rol en registro
function selectRole(element) {
    const options = document.querySelectorAll('.role-option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
}

// Funciones de redirección
function redirectToDashboard() {
    window.location.href = '../index.html';
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas
    createParticles();

    // Configurar efecto parallax
    setupParallax();

    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessCard('successCard', true);
        });
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación de campos
            let isValid = true;
            const nombre = document.getElementById('reg-nombre');
            const apellido = document.getElementById('reg-apellido');
            const correo = document.getElementById('reg-correo');
            const contrasena = document.getElementById('reg-contrasena');
            const confirmarContrasena = document.getElementById('reg-confirmar-contrasena');
            const formMessage = document.getElementById('formMessage');

            // Validar nombre
            if (nombre.value.trim() === '') {
                document.getElementById('reg-nombreError').style.display = 'block';
                document.getElementById('reg-nombreError').textContent = 'El nombre es obligatorio.';
                isValid = false;
            } else {
                document.getElementById('reg-nombreError').style.display = 'none';
            }

            // Validar apellido
            if (apellido.value.trim() === '') {
                document.getElementById('reg-apellidoError').style.display = 'block';
                document.getElementById('reg-apellidoError').textContent = 'El apellido es obligatorio.';
                isValid = false;
            } else {
                document.getElementById('reg-apellidoError').style.display = 'none';
            }

            // Validar correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo.value.trim())) {
                document.getElementById('reg-correoError').style.display = 'block';
                document.getElementById('reg-correoError').textContent = 'Ingresa un formato de correo electrónico válido.';
                isValid = false;
            } else {
                document.getElementById('reg-correoError').style.display = 'none';
            }

            // Validar contraseña
            if (contrasena.value.length < 8) {
                document.getElementById('reg-contrasenaError').style.display = 'block';
                document.getElementById('reg-contrasenaError').textContent = 'La contraseña debe tener al menos 8 caracteres.';
                isValid = false;
            } else {
                document.getElementById('reg-contrasenaError').style.display = 'none';
            }

            // Validar confirmación de contraseña
            if (contrasena.value !== confirmarContrasena.value) {
                document.getElementById('reg-confirmar-contrasenaError').style.display = 'block';
                document.getElementById('reg-confirmar-contrasenaError').textContent = 'Las contraseñas no coinciden.';
                isValid = false;
            } else {
                document.getElementById('reg-confirmar-contrasenaError').style.display = 'none';
            }

            if (isValid) {
                showSuccessCard('successCard');
            } else {
                formMessage.textContent = 'ERROR. Por favor, corrige los errores en el formulario.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });
    }
});


// Asistente Virtual
document.addEventListener('DOMContentLoaded', function() {
    const assistantToggle = document.getElementById('assistantToggle');
    const assistantContainer = document.getElementById('assistantContainer');
    const assistantClose = document.getElementById('assistantClose');
    const assistantOptions = document.querySelectorAll('.assistant-option');
    const assistantAnswer = document.getElementById('assistantAnswer');

    // Alternar visibilidad del asistente
    assistantToggle.addEventListener('click', function() {
        assistantContainer.style.display = assistantContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar asistente
    assistantClose.addEventListener('click', function() {
        assistantContainer.style.display = 'none';
    });

    // Respuestas del asistente
    const answers = {
        register: {
            title: '¿Cómo me registro?',
            content: 'Para registrarte en WARISMART, sigue estos pasos: 1. Haz clic en el botón "Registrarse" en la parte superior derecha. 2. Completa el formulario con tus datos personales. 4. Haz clic en "Registrarse" y listo, ¡ya eres parte de WARISMART!'
        },
        what_is_warismart: {
            title: '¿Qué es WARISMART?',
            content: 'WARISMART es un sistema de gestión simple y completo para tu bodega o tienda en Perú. Te ayuda a controlar el **inventario, las ventas y el dinero** para que ganes más y trabajes menos.'
        },
        who_is_it_for: {
        title: '¿Para quién es WARISMART?',
            content: 'Es ideal para **emprendedores independientes, dueños de bodegas, minimarkets y pequeñas cadenas** (hasta 5 locales) que quieren digitalizar su negocio sin complicaciones.'
        },
        
        // --- Preguntas sobre INVENTARIO ---
        how_to_register_product: {
            title: '¿Cómo registro un producto nuevo?',
            content: 'Es muy fácil: 1. Ve al módulo **"Inventario"**. 2. Haz clic en el botón **"+ Agregar Producto"**. 3. Ingresa el **nombre, precio y la cantidad** que tienes en stock. 4. ¡Guarda y listo!'
        },
        stock_low_alert: {
            title: '¿Cómo me avisa si se acaba algo (Stock Bajo)?',
            content: 'WARISMART te avisa de dos maneras: 1. En el **Dashboard principal** verás un resumen de los productos que se están acabando. 2. En el módulo **"Inventario"**, los productos con poco stock se marcan con un color de alerta (Amarillo o Rojo).'
        },
        
        // --- Preguntas sobre VENTAS (POS) ---
        how_to_sell: {
            title: '¿Cómo registro una venta en el Punto de Venta (POS)?',
            content: 'El POS está diseñado para ser rápido: 1. Ve al módulo **"Punto de Venta"**. 2. **Busca o escanea** el producto que el cliente quiere. 3. Haz clic en **"Pagar"**. 4. Elige si es **Efectivo o Tarjeta**. ¡Venta terminada!'
        },
        issue_receipt: {
            title: '¿WARISMART emite boletas o facturas?',
            content: 'Sí, WARISMART está preparado para la emisión de **Boletas y Facturas Electrónicas** (integración con SUNAT). Esto depende del plan que contrates. Pregunta a nuestro equipo sobre la configuración para tu RUC.'
        },
        
        // --- Preguntas sobre REPORTES ---
        see_earnings: {
            title: '¿Dónde veo cuánto he ganado hoy/este mes?',
            content: 'Toda la información importante está en el **Dashboard principal** y el módulo **"Reportes"**: 1. En el **Dashboard** verás un resumen de las ventas del día. 2. En **"Reportes"** puedes ver gráficos simples de tus ganancias, gastos y los productos más vendidos.'
        },
        
        // --- Preguntas sobre SEGURIDAD Y SOPORTE ---
        security_data: {
            title: '¿Mi información y datos están seguros?',
            content: 'Sí, tu información está **totalmente segura**. Usamos tecnología avanzada para proteger tus datos de inventario, ventas y clientes. Solo tú y las personas que autorices pueden ver esa información.'
        },
        need_help: {
            title: '¿Qué hago si tengo un problema o duda?',
            content: 'Puedes pedir ayuda de tres formas: 1. Usa el **botón de chat** que aparece en la esquina. 2. Llama a nuestra línea de **Soporte Técnico**. 3. Puede escribirnos un correo a contacto@warismart.pe. ¡Estamos para ayudarte!'
        }
    };

    // Manejar clics en las opciones del asistente
    assistantOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const answer = answers[question];

            assistantAnswer.innerHTML = `
                <h4>${answer.title}</h4>
                <p>${answer.content}</p>
            `;
            assistantAnswer.classList.add('active');
        });
    });
});

// Crear partículas flotantes
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15; // Número de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio entre 5px y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Animación con duración aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Retraso aleatorio
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // Efecto parallax mejorado para el fondo
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const waves = document.querySelectorAll('.wave');

        waves.forEach((wave, index) => {
            const speed = 0.05 + (index * 0.02);
            wave.style.transform = `translateY(${scrollPosition * speed}px)`;
        });

        const shine = document.querySelector('.shine');
        shine.style.transform = `translateX(${scrollPosition * 0.3}px) translateY(${scrollPosition * 0.2}px)`;
    });

    // Animación para las secciones al hacer scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Función para mostrar modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Deshabilitar scroll cuando el modal está abierto
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modales
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Habilitar scroll cuando el modal se cierra
        document.body.style.overflow = '';
    }
}

// Validación de email (función compartida)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Manejo del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos obligatorios
            const nombre = this.querySelector('input[name="nombre"]');
            const email = this.querySelector('input[name="email"]');
            const mensaje = this.querySelector('textarea[name="mensaje"]');

            let isValid = true;

            // Validar nombre
            if (nombre.value.trim() === '') {
                isValid = false;
                nombre.style.borderColor = '#ff6b6b';
            } else {
                nombre.style.borderColor = '#ddd';
            }

            // Validar email
            if (email.value.trim() === '' || !validateEmail(email.value.trim())) {
                isValid = false;
                email.style.borderColor = '#ff6b6b';
            } else {
                email.style.borderColor = '#ddd';
            }

            // Validar mensaje
            if (mensaje.value.trim() === '') {
                isValid = false;
                mensaje.style.borderColor = '#ff6b6b';
            } else {
                mensaje.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Mostrar modal de éxito
                showModal('contactSuccessModal');
                // Limpiar formulario
                this.reset();
            } else {
                // Mostrar modal de error
                showModal('contactErrorModal');
            }
        });

        // Limpiar estilos de error al enfocar campos
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }
}

// Manejo del formulario de registro gratuito
function setupFreeRegistrationForm() {
    const freeRegForm = document.querySelector('.registro-form');
    if (freeRegForm) {
        freeRegForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos
            const negocio = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');

            let isValid = true;

            // Validar nombre del negocio
            if (negocio.value.trim() === '') {
                isValid = false;
                negocio.style.borderColor = '#ff6b6b';
            } else {
                negocio.style.borderColor = '#ddd';
            }

            // Validar email
            if (email.value.trim() === '' || !validateEmail(email.value.trim())) {
                isValid = false;
                email.style.borderColor = '#ff6b6b';
            } else {
                email.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Mostrar modal de éxito
                showModal('freeRegisterSuccessModal');
                // Limpiar formulario
                this.reset();
            } else {
                // Mostrar modal de error
                showModal('freeRegisterErrorModal');
            }
        });

        // Limpiar estilos de error al enfocar campos
        const requiredFields = freeRegForm.querySelectorAll('input');
        requiredFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }
}

// Inicializar TODO cuando el DOM esté cargado (solo una vez)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de contacto
    setupContactForm();

    // Inicializar formulario de registro gratuito
    setupFreeRegistrationForm();

    // Cerrar modales al hacer clic fuera de ellos
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
});

// --- SISTEMA DE TRADUCCIÓN (I18N) ---


const translations = {
    es: {
        nav_inicio: "Inicio",
        nav_beneficios: "Beneficios",
        nav_testimonios: "Testimonios",
        nav_planes: "Planes",
        nav_contacto: "Contacto",
        btn_login: "Iniciar Sesión",
        btn_register: "Registrarse",
        
        hero_title: "Transforma tu Bodega con Tecnología",
        hero_desc: "Sistema de gestión inteligente para bodegas y retail en Perú",
        hero_cta: "Comenzar Gratis",
        
        about_title: "Sobre Nosotros",
        about_desc: "En WARISMART, nos dedicamos a transformar la gestión de bodegas y pequeños comercios en Perú, ofreciendo soluciones tecnológicas accesibles y fáciles de usar.",
        mission_title: "Nuestra Misión",
        mission_desc: "Empoderar a los pequeños comercios con herramientas tecnológicas que les permitan competir en igualdad de condiciones.",
        tech_title: "Nuestra Tecnología",
        tech_desc: "Desarrollamos software intuitivo y potente, diseñado específicamente para las necesidades de bodegas y pequeños comercios.",
        commitment_title: "Nuestro Compromiso",
        commitment_desc: "Ofrecemos soporte continuo y capacitación para asegurar que nuestros clientes saquen el máximo provecho de nuestras herramientas.",
        community_title: "Nuestra Comunidad",
        community_desc: "Trabajamos de la mano con nuestros clientes para construir una comunidad de emprendedores exitosos.",

        benefits_title: "Beneficios de WARISMART",
        ben_stock_title: "Control de Inventario",
        ben_stock_desc: "Gestiona tu stock en tiempo real con alertas automáticas",
        ben_sales_title: "Ventas Rápidas",
        ben_sales_desc: "Punto de venta optimizado con emisión de boletas electrónicas",
        ben_reports_title: "Reportes Visuales",
        ben_reports_desc: "Análisis detallados para tomar mejores decisiones",
        ben_cloud_title: "En la Nube",
        ben_cloud_desc: "Accede desde cualquier dispositivo, en cualquier momento",

        testimonials_title: "Lo que dicen nuestros clientes",
        test_1_text: "\"WARISMART transformó mi bodega. Ahora tengo control total de mi inventario y mis ventas han aumentado.\"",
        test_1_loc: "Bodega El Sol, Lima",
        test_2_text: "\"La facilidad de uso es increíble. En una semana ya estábamos operando sin problemas.\"",
        test_2_loc: "Minimarket San Pedro, Arequipa",
        test_3_text: "\"Los reportes me ayudan a tomar mejores decisiones. Sé exactamente qué productos comprar.\"",
        test_3_loc: "Bodega La Esquina, Cusco",
        test_4_text: "\"Antes llevaba todo en cuadernos. Ahora, con solo un clic, veo mis ganancias diarias. Es como tener un contador en mi bolsillo.\"",
        test_4_loc: "Mini Market Andina, Ancash",
        test_5_text: "\"Emitir boletas electrónicas era un dolor de cabeza. Con WARISMART lo hago en segundos y sin errores. Mis clientes están más contentos.\"",
        test_5_loc: "Tienda El Ahorro, Chiclayo",
        test_6_text: "\"Puedo ver en tiempo real qué productos se venden más. Así ajusto mis compras y ya no me quedo sin stock en los días clave.\"",
        test_6_loc: "Bodega La Victoria, Piura",

        plans_title: "Planes para tu negocio",
        plan_basic: "Básico",
        plan_pro: "Profesional",
        plan_ent: "Empresa",
        plan_rec: "Recomendado",
        plan_mo: "/mes",
        plan_btn: "Comenzar",
        feat_inv_basic: "Inventario básico",
        feat_pos: "Punto de venta",
        feat_rep_basic: "Reportes básicos",
        feat_usr_1: "1 usuario",
        feat_all_basic: "Todo lo del plan Básico",
        feat_prov: "Gestión de proveedores",
        feat_rep_adv: "Reportes avanzados",
        feat_usr_5: "5 usuarios",
        feat_bill: "Boletas electrónicas",
        feat_all_pro: "Todo lo del plan Profesional",
        feat_usr_unlim: "Usuarios ilimitados",
        feat_api: "API personalizada",
        feat_support: "Soporte prioritario",
        feat_multi: "Múltiples sucursales",

        contact_title: "Contáctanos",
        contact_desc: "¿Tienes preguntas? Estamos aquí para ayudarte a transformar tu negocio.",
        contact_loc: "Lima, Perú",
        form_name: "Nombre",
        form_email: "Email",
        form_phone: "Teléfono",
        form_message: "Mensaje",
        btn_send: "Enviar Mensaje",

        footer_cta_title: "Comienza tu prueba gratuita hoy",
        footer_cta_desc: "No requiere tarjeta de crédito. Empieza en minutos.",
        form_business: "Nombre del negocio",
        btn_register_free: "Registrarse Gratis",

        modal_success_title: "¡Mensaje Enviado!",
        modal_success_desc: "Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo pronto.",
        modal_error_title: "Campos incompletos",
        modal_error_desc: "Por favor, completa todos los campos obligatorios para enviar tu mensaje.",
        modal_btn_ok: "Aceptar",
        modal_reg_success_title: "¡Registro Exitoso!",
        modal_reg_success_desc: "Tu prueba gratuita ha sido activada. Revisa tu correo para confirmar tu cuenta.",
        modal_btn_cont: "Continuar",
        modal_reg_error_desc: "Por favor, completa todos los campos para registrarte.",

        footer_brand_desc: "Transformación digital para bodegas y retail en Perú",
        footer_prod: "Producto",
        footer_company: "Empresa",
        footer_legal: "Legal",
        footer_blog: "Blog",
        footer_privacy: "Privacidad",
        footer_terms: "Términos",
        footer_copy: "© 2025 FLUXA. Todos los derechos reservados.",

        assistant_title: "Asistente Virtual",
        assistant_welcome: "Hola, soy tu asistente virtual de WARISMART. ¿En qué puedo ayudarte?",
        faq_register: "¿Cómo me registro?",
        faq_what: "¿Qué es WARISMART?",
        faq_who: "¿Para quién es WARISMART?",
        faq_prod: "¿Cómo registro un producto nuevo?",
        faq_stock: "¿Cómo me avisa si se acaba algo?",
        faq_sell: "¿Cómo registro una venta?",
        faq_receipt: "¿Emite boletas o facturas?",
        faq_earn: "¿Dónde veo mis ganancias?",
        faq_sec: "¿Mis datos están seguros?",
        faq_help: "¿Necesito ayuda?",

        video_title:"Mira WARISMART en acción",
        video_sub:"Antes y Después de tu Negocio",
        video_desc:"Olvídate del caos de los cuadernos y las cuentas perdidas. Descubre cómo centralizar toda tu operación en una sola pantalla.",
        video_feat_1:"✅ Adiós al estrés del inventario",
        video_feat_2:"✅ Cuentas claras en segundos",
        video_cta:"Quiero probarlo ahora",
    },
    en: {
        nav_inicio: "Home",
        nav_beneficios: "Benefits",
        nav_testimonios: "Testimonials",
        nav_planes: "Plans",
        nav_contacto: "Contact",
        btn_login: "Log In",
        btn_register: "Sign Up",
        
        hero_title: "Transform Your Store with Technology",
        hero_desc: "Smart management system for grocery stores and retail in Peru",
        hero_cta: "Start for Free",
        
        about_title: "About Us",
        about_desc: "At WARISMART, we dedicate ourselves to transforming the management of grocery stores and small businesses in Peru, offering accessible and easy-to-use tech solutions.",
        mission_title: "Our Mission",
        mission_desc: "Empower small businesses with technological tools that allow them to compete on equal terms.",
        tech_title: "Our Technology",
        tech_desc: "We develop intuitive and powerful software, designed specifically for the needs of grocery stores and small businesses.",
        commitment_title: "Our Commitment",
        commitment_desc: "We offer continuous support and training to ensure our clients get the most out of our tools.",
        community_title: "Our Community",
        community_desc: "We work hand in hand with our clients to build a community of successful entrepreneurs.",

        benefits_title: "WARISMART Benefits",
        ben_stock_title: "Inventory Control",
        ben_stock_desc: "Manage your stock in real-time with automatic alerts",
        ben_sales_title: "Fast Sales",
        ben_sales_desc: "Optimized point of sale with electronic receipt issuance",
        ben_reports_title: "Visual Reports",
        ben_reports_desc: "Detailed analytics to make better decisions",
        ben_cloud_title: "In the Cloud",
        ben_cloud_desc: "Access from any device, at any time",

        testimonials_title: "What our clients say",
        test_1_text: "\"WARISMART transformed my store. Now I have total control of my inventory and my sales have increased.\"",
        test_1_loc: "Bodega El Sol, Lima",
        test_2_text: "\"The ease of use is incredible. In one week we were already operating without problems.\"",
        test_2_loc: "Minimarket San Pedro, Arequipa",
        test_3_text: "\"The reports help me make better decisions. I know exactly what products to buy.\"",
        test_3_loc: "Bodega La Esquina, Cusco",
        test_4_text: "\"I used to keep everything in notebooks. Now, with just one click, I see my daily earnings. It's like having an accountant in my pocket.\"",
        test_4_loc: "Mini Market Andina, Ancash",
        test_5_text: "\"Issuing electronic receipts was a headache. With WARISMART I do it in seconds and without errors. My clients are happier.\"",
        test_5_loc: "Tienda El Ahorro, Chiclayo",
        test_6_text: "\"I can see in real-time which products sell the most. So I adjust my purchases and I no longer run out of stock on key days.\"",
        test_6_loc: "Bodega La Victoria, Piura",

        plans_title: "Plans for your business",
        plan_basic: "Basic",
        plan_pro: "Professional",
        plan_ent: "Enterprise",
        plan_rec: "Recommended",
        plan_mo: "/mo",
        plan_btn: "Get Started",
        feat_inv_basic: "Basic Inventory",
        feat_pos: "Point of Sale (POS)",
        feat_rep_basic: "Basic Reports",
        feat_usr_1: "1 user",
        feat_all_basic: "Everything in Basic plan",
        feat_prov: "Supplier Management",
        feat_rep_adv: "Advanced Reports",
        feat_usr_5: "5 users",
        feat_bill: "Electronic Receipts (Billing)",
        feat_all_pro: "Everything in Professional plan",
        feat_usr_unlim: "Unlimited Users",
        feat_api: "Custom API",
        feat_support: "Priority Support",
        feat_multi: "Multiple Branches",

        contact_title: "Contact Us",
        contact_desc: "Have questions? We are here to help you transform your business.",
        contact_loc: "Lima, Peru",
        form_name: "Name",
        form_email: "Email",
        form_phone: "Phone",
        form_message: "Message",
        btn_send: "Send Message",

        footer_cta_title: "Start your free trial today",
        footer_cta_desc: "No credit card required. Start in minutes.",
        form_business: "Business Name",
        btn_register_free: "Sign Up Free",

        modal_success_title: "Message Sent!",
        modal_success_desc: "We have received your message correctly. We will contact you soon.",
        modal_error_title: "Incomplete fields",
        modal_error_desc: "Please complete all required fields to send your message.",
        modal_btn_ok: "Accept",
        modal_reg_success_title: "Registration Successful!",
        modal_reg_success_desc: "Your free trial has been activated. Check your email to confirm your account.",
        modal_btn_cont: "Continue",
        modal_reg_error_desc: "Please complete all fields to register.",

        footer_brand_desc: "Digital transformation for grocery stores and retail in Peru",
        footer_prod: "Product",
        footer_company: "Company",
        footer_legal: "Legal",
        footer_blog: "Blog",
        footer_privacy: "Privacy",
        footer_terms: "Terms",
        footer_copy: "© 2025 FLUXA. All rights reserved.",

        assistant_title: "Virtual Assistant",
        assistant_welcome: "Hello, I am your WARISMART virtual assistant. How can I help you?",
        faq_register: "How do I register?",
        faq_what: "What is WARISMART?",
        faq_who: "Who is it for?",
        faq_prod: "How to add a product?",
        faq_stock: "Low stock alerts?",
        faq_sell: "How to make a sale?",
        faq_receipt: "Does it issue receipts?",
        faq_earn: "See my earnings?",
        faq_sec: "Are my data safe?",
        faq_help: "I need help",

        video_title:"See WARISMART in action",
        video_sub: "Before and After Your Business",
        video_desc: "Forget the chaos of notebooks and missing accounts. Discover how to centralize your entire operation on a single screen.",
        video_feat_1: "✅ Goodbye inventory stress",
        video_feat_2: "✅ Clear accounts in seconds",
        video_cta: "I want to try it now",
    }
};

function changeLanguage(lang) {
    // 1. Cambiar textos normales
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 2. Cambiar placeholders (inputs)
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // 3. Actualizar estilo de botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtnText = lang === 'es' ? 'ES' : 'EN';
    const buttons = Array.from(document.querySelectorAll('.lang-btn'));
    const activeButton = buttons.find(btn => btn.textContent.trim() === activeBtnText);
    if(activeButton) activeButton.classList.add('active');

    // 4. Guardar preferencia
    localStorage.setItem('warismart_lang', lang);
}

// Cargar idioma guardado al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('warismart_lang') || 'es';
    changeLanguage(savedLang);
});
