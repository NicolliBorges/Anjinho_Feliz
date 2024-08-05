document.addEventListener('DOMContentLoaded', () => {
    const galleryButton = document.querySelector('.gallery-button');
    const gallery = document.getElementById('gallery');
    const galleryClose = document.querySelector('.gallery-close');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevArrow = document.getElementById('prev');
    const nextArrow = document.getElementById('next');
    const buttons = document.querySelectorAll('.gallery-filters button');
    const galleryContent = document.querySelector('.gallery-content');
    const images = {
        all: [
            'Fotos/galeria/aluno1.jpg',
            'Fotos/galeria/aluno19.jpg',
            'Fotos/galeria/ambiente2.jpg',
            'Fotos/galeria/ambiente3.jpg',
            'Fotos/galeria/evento2.jpg',
            'Fotos/galeria/evento3.jpg'
        ],
        students: [
            'Fotos/galeria/aluno1.jpg',
            'Fotos/galeria/aluno19.jpg',
            'Fotos/galeria/aluno20.jpg',
            'Fotos/galeria/aluno21.jpg',
            'Fotos/galeria/aluno22.jpg',
            'Fotos/galeria/aluno23.jpg',
            'Fotos/galeria/aluno24.jpg',
            'Fotos/galeria/aluno25.jpg',
            'Fotos/galeria/aluno26.jpg',
            'Fotos/galeria/aluno27.jpg',
            'Fotos/galeria/aluno28.jpg',
            'Fotos/galeria/aluno29.jpg',
            'Fotos/galeria/aluno30.jpg',
            'Fotos/galeria/aluno31.jpg',
            'Fotos/galeria/aluno32.jpg',
            'Fotos/galeria/aluno33.jpg',
            'Fotos/galeria/aluno34.jpg',
            'Fotos/galeria/aluno35.jpg',
            'Fotos/galeria/aluno36.jpg',
            'Fotos/galeria/aluno37.jpg',
            'Fotos/galeria/aluno38.jpg',
            'Fotos/galeria/aluno39.jpg',
            // Adicione o restante das imagens
        ],
        environment: [
            'Fotos/galeria/ambiente2.jpg',
            'Fotos/galeria/ambiente3.jpg',
            'Fotos/galeria/ambiente4.jpg',
            'Fotos/galeria/ambiente5.jpg',
            'Fotos/galeria/ambiente.jpg',
            // Adicione o restante das imagens
        ],
        events: [
            'Fotos/galeria/evento1.jpg',
            'Fotos/galeria/evento2.jpg',
            'Fotos/galeria/evento3.jpg',
            'Fotos/galeria/evento4.jpg',
            'Fotos/galeria/evento5.jpg',
            'Fotos/galeria/evento6.jpg',
            'Fotos/galeria/evento7.jpg',
            'Fotos/galeria/evento8.jpg',
            'Fotos/galeria/evento9.jpg',
            'Fotos/galeria/evento10.jpg',
            'Fotos/galeria/evento11.jpg',
            'Fotos/galeria/evento12.jpg',
            'Fotos/galeria/evento13.jpg',
            'Fotos/galeria/evento14.jpg',
            'Fotos/galeria/evento15.jpg',
            'Fotos/galeria/evento16.jpg',
            'Fotos/galeria/evento17.jpg',
            'Fotos/galeria/evento18.jpg',
            'Fotos/galeria/evento19.jpg',
            'Fotos/galeria/evento20.jpg',
            'Fotos/galeria/evento21.jpg',
            'Fotos/galeria/evento22.jpg',
            'Fotos/galeria/evento23.jpg',
            // Adicione o restante das imagens
        ]
    };

    let currentImageIndex = 0;
    let currentFilter = 'all';

    function showGallery() {
        gallery.style.display = 'flex';
    }

    function hideGallery() {
        gallery.style.display = 'none';
    }

    function displayImages(filter) {
        galleryContent.innerHTML = '';
        images[filter].forEach((src, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = src;
            img.alt = filter;
            img.addEventListener('click', () => {
                lightboxImg.src = src;
                currentImageIndex = index;
                lightbox.style.display = 'flex';
            });
            div.appendChild(img);
            galleryContent.appendChild(div);
        });
        currentFilter = filter;
    }    
    function showLightboxImage(index) {
        const src = images[currentFilter][index];
        lightboxImg.src = src;
        currentImageIndex = index;
    }

    galleryButton.addEventListener('click', showGallery);
    galleryClose.addEventListener('click', hideGallery);
    lightboxClose.addEventListener('click', hideGallery);

    prevArrow.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showLightboxImage(currentImageIndex - 1);
        }
    });

    nextArrow.addEventListener('click', () => {
        if (currentImageIndex < images[currentFilter].length - 1) {
            showLightboxImage(currentImageIndex + 1);
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayImages(button.getAttribute('data-filter'));
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideGallery();
            lightbox.style.display = 'none';
        }
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevArrow.click();
            } else if (e.key === 'ArrowRight') {
                nextArrow.click();
            }
        }
    });

    // Exibir todas as imagens por padrão
    displayImages('all');
});
