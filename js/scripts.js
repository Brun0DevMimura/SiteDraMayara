document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".menu-icon");
    const mobileMenu = document.querySelector(".content-nav");
    const fadeElements = document.querySelectorAll(".fade-in");
    console.log(hamburger);
    console.log(mobileMenu);
//Abrir menu mobile
    if (hamburger && mobileMenu) {
        console.log(hamburger);
    console.log(mobileMenu);
        hamburger.addEventListener("click", function () {
               console.log("click no hamburguer");
            mobileMenu.classList.toggle("active");
            hamburger.classList.toggle("open");
        });
    }

    //Fechar Menu Mobile
    const navlinks = document.querySelectorAll(".nav-links a");
    navlinks.forEach((link) => {
        link.addEventListener("click",() => {
            if(mobileMenu.classList.contains("active")){
                mobileMenu.classList.remove("active");
                hamburger.classList.remove("open");
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

    // ========== CONTROLE DO CARROSSEL DE DEPOIMENTOS ==========
    const carousel = document.getElementById('testimonialsCarousel');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    // Função para rolar o carrossel
    function scrollCarousel(direction) {
        const scrollAmount = 300; // Ajuste conforme a largura do item + gap, se necessário
        if (direction === 'left') {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    // Adiciona eventos de clique às setas
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => scrollCarousel('left'));
        nextBtn.addEventListener('click', () => scrollCarousel('right'));
    }

    // Opcional: Permitir navegação com as setas do teclado (quando o carrossel está focado)
    carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            scrollCarousel('left');
        } else if (e.key === 'ArrowRight') {
            scrollCarousel('right');
        }
    });

    // Opcional: Tornar o carrossel focável para teclado
    carousel.setAttribute('tabindex', '0'); // Permite foco via tab ou programaticamente
});


// ========== MODAIS DE SERVIÇO ==========
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(`modal-${modalId}`).classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    });
});

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// ========== MODAL WHATSAPP ==========
const whatsappBtn = document.getElementById('whatsappBtn');
const whatsappModal = document.getElementById('whatsappModal');
const closeModal = document.getElementById('closeModal');
const userMessageInput = document.getElementById('userMessage');
const sendMessageBtn = document.getElementById('sendMessage');
const messageContainer = document.getElementById('messageContainer');
const WHATSAPP_NUMERO = '5511970753485';
whatsappBtn.addEventListener('click', () => {
    whatsappModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    userMessageInput.focus();
});

closeModal.addEventListener('click', () => {
    whatsappModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

whatsappModal.addEventListener('click', (e) => {
    if (e.target === whatsappModal) {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

function enviarMensagem() {
    const mensagem = userMessageInput.value.trim();
    if (!mensagem) return;

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble', 'sent');
    bubble.textContent = mensagem;
    messageContainer.appendChild(bubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    userMessageInput.value = '';

    const texto = encodeURIComponent(`Olá, Dra. Mayara! ${mensagem}`);
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`, '_blank'); // Corrigido: removido espaço extra

    setTimeout(() => {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 1000);
}

sendMessageBtn.addEventListener('click', enviarMensagem);
userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
});

 // ←←← Altere APENAS aqui se mudar o número

function abrirWhatsApp(mensagemPersonalizada = "Olá, Dra. Mayara! Gostaria de agendar uma consulta.") {
    const texto = encodeURIComponent(mensagemPersonalizada);
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`, '_blank'); // Corrigido: removido espaço extra
}

// ========== HEADER SCROLL ==========
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== ANIMAÇÃO AO ROLAR ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

/* Play an animation on each click */
    let iconSkipForward = document.querySelector('.bodymovinanim');

    let animationSkipForward = bodymovin.loadAnimation({
            container: iconSkipForward,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/skip-forward.json" // Espaços removidos
    });

      iconSkipForward.addEventListener('click', function() {
      animationSkipForward.playSegments([0,60], true);
    });

    document.querySelectorAll('.testimonial-screenshot').forEach(img => {
  img.addEventListener('click', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // trava scroll
  });
});

document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this || e.target.classList.contains('close-lightbox')) {
    this.style.display = 'none';
    document.body.style.overflow = ''; // libera scroll
  }
});

// Fechar com tecla ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('lightbox').style.display == 'flex') 
    { // Corrigido: era ===, deve ser =
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
  }
});