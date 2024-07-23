document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    let hearts = parseInt(localStorage.getItem('hearts')) || 5; // Initialise hearts à partir du localStorage ou à 5

    // Fonction pour démarrer ou arrêter la musique
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicControl.classList.remove('stopped');
                musicControl.classList.add('playing');
                musicIcon.className = 'fas fa-volume-mute'; // Icône quand la musique est jouée
                musicControl.setAttribute('aria-label', 'Arrêter la musique');
            }).catch(error => {
                console.log('Erreur lors de la lecture de la musique de fond:', error);
            });
        } else {
            backgroundMusic.pause();
            musicControl.classList.remove('playing');
            musicControl.classList.add('stopped');
            musicIcon.className = 'fas fa-volume-up'; // Icône quand la musique est arrêtée
            musicControl.setAttribute('aria-label', 'Démarrer la musique');
        }
    }

    // Fonction pour valider le nom
    function validateName() {
        const nameInput = document.querySelector('#nameInput');
        const nameIndicator = document.getElementById('nameIndicator');

        if (nameInput.value.trim() === '') {
            nameIndicator.className = 'indicator'; // Gris
        } else if (nameInput.value.toUpperCase() === 'MERIEM') {
            nameIndicator.className = 'indicator correct'; // Bleu clair
        } else {
            nameIndicator.className = 'indicator incorrect'; // Rouge
        }
    }

    // Fonction pour valider le code (si nécessaire)
    function validateCode() {
        // Validation du code non nécessaire pour l'indicateur
    }

    // Fonction pour valider la connexion
    function validateLogin() {
        const nameInput = document.querySelector('#nameInput');
        const codeInput = document.querySelector('#codeInput');
        const accessDeniedMessage = document.getElementById('accessDenied');
        const headerText = document.getElementById('headerText');
        const backgroundVideo = document.getElementById('backgroundVideo'); // Référence à la vidéo
        const errorSound = document.getElementById('errorSound');

        let errorMessage = '';
        let isNameIncorrect = nameInput.value.toUpperCase() !== 'MERIEM';
        let isPasswordIncorrect = codeInput.value.toUpperCase() !== 'AS';

        if (isNameIncorrect && isPasswordIncorrect) {
            errorMessage = 'Accès refusé. Vérifiez votre nom et votre mot de passe.';
            headerText.textContent = 'Error 404';
            headerText.style.color = '#FF007F'; // Rouge rosé
        } else if (isNameIncorrect) {
            errorMessage = 'Accès refusé. Vérifiez votre nom.';
            headerText.textContent = 'Error 404';
            headerText.style.color = '#FF007F'; // Rouge rosé
        } else if (isPasswordIncorrect) {
            errorMessage = 'Accès refusé. Vérifiez votre mot de passe.';
            headerText.textContent = 'Error 404';
            headerText.style.color = '#FF007F'; // Rouge rosé
        }

        if (errorMessage) {
            accessDeniedMessage.textContent = errorMessage;
            errorSound.play(); // Joue le son d'erreur

            // Mettre à jour le nombre de cœurs
            hearts = Math.max(0, hearts - 1); // Assurez-vous que hearts ne devient pas négatif
            localStorage.setItem('hearts', hearts); // Sauvegarde la nouvelle valeur
            updateHeartsDisplay(); // Met à jour l'affichage des cœurs

            if (hearts <= 0) {
                setTimeout(() => {
                    window.location.href = 'echec.html'; // Redirige vers une page d'échec
                }, 1000);
            } else {
                // Changer la vidéo de fond en rouge
                backgroundVideo.src = 'media/red.mp4'; // Assurez-vous que le chemin est correct
                backgroundVideo.load(); // Recharge la nouvelle vidéo
            }
        } else {
            // Rediriger vers la page suivante
            window.location.href = 'page-suivante.html';
        }
    }

    // Met à jour l'affichage des cœurs
    function updateHeartsDisplay() {
        for (let i = 1; i <= 5; i++) {
            const heart = document.getElementById(`heart${i}`);
            if (i > hearts) {
                heart.style.visibility = 'hidden';
            } else {
                heart.style.visibility = 'visible';
            }
        }
        document.getElementById('heartsCounter').textContent = `X${hearts}`;
    }

    // Attache les événements
    document.querySelector('#nameInput').addEventListener('input', validateName);
    document.querySelector('#codeInput').addEventListener('input', validateCode);
    document.querySelector('.login-button').addEventListener('click', validateLogin);
    musicControl.addEventListener('click', toggleMusic);

    // Initialiser la musique
    function initializeMusic() {
        backgroundMusic.play().then(() => {
            musicControl.classList.remove('stopped');
            musicControl.classList.add('playing');
            musicIcon.className = 'fas fa-volume-mute'; // Icône pour musique jouée
        }).catch(error => {
            console.log('Erreur lors de la lecture de la musique de fond:', error);
        });
    }

    initializeMusic();
});
