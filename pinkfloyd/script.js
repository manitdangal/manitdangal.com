/**
 * Pink Floyd Fanbase Website - JavaScript
 * Handles audio playback and interactive elements
 */

// Get audio element and toggle button (get them early)
let audio, audioToggle;

// Function to attempt playing audio
function attemptAutoPlay() {
    if (!audio) {
        audio = document.getElementById('backgroundAudio');
        audioToggle = document.getElementById('audioToggle');
    }
    
    if (audio && audioToggle) {
        // Set volume to a reasonable level
        audio.volume = 0.7;
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Audio started playing successfully
                    audioToggle.classList.add('playing');
                    console.log('Audio started playing');
                })
                .catch(error => {
                    // Auto-play was prevented by browser
                    console.log('Auto-play prevented. User interaction required.');
                    audioToggle.classList.remove('playing');
                    
                    // Show a subtle hint to user
                    audioToggle.style.animation = 'pulse-hint 2s ease-in-out';
                    
                    // Try to play on first user interaction
                    const playOnInteraction = function() {
                        audio.play()
                            .then(() => {
                                audioToggle.classList.add('playing');
                                document.removeEventListener('click', playOnInteraction);
                                document.removeEventListener('touchstart', playOnInteraction);
                                document.removeEventListener('keydown', playOnInteraction);
                            })
                            .catch(() => {});
                    };
                    
                    document.addEventListener('click', playOnInteraction, { once: true });
                    document.addEventListener('touchstart', playOnInteraction, { once: true });
                    document.addEventListener('keydown', playOnInteraction, { once: true });
                });
        }
    }
}

// Try to play immediately (before DOM is ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attemptAutoPlay);
} else {
    // DOM is already ready
    attemptAutoPlay();
}

// Also try when window loads
window.addEventListener('load', function() {
    setTimeout(attemptAutoPlay, 100);
});

// Wait for DOM to be fully loaded for other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get audio element and toggle button if not already set
    if (!audio) {
        audio = document.getElementById('backgroundAudio');
    }
    if (!audioToggle) {
        audioToggle = document.getElementById('audioToggle');
    }
    
    // Ensure audio is ready
    if (audio) {
        audio.volume = 0.7;
        
        // Try playing one more time after a short delay
        setTimeout(attemptAutoPlay, 200);
    }
    
    // Toggle play/pause on button click
    if (audioToggle) {
        audioToggle.addEventListener('click', function() {
        if (audio.paused) {
            // Play audio
            audio.play()
                .then(() => {
                    audioToggle.classList.add('playing');
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        } else {
            // Pause audio
            audio.pause();
            audioToggle.classList.remove('playing');
        }
        });
    }
    
    // Handle audio events
    if (audio) {
        audio.addEventListener('play', function() {
            if (audioToggle) audioToggle.classList.add('playing');
        });
        
        audio.addEventListener('pause', function() {
            if (audioToggle) audioToggle.classList.remove('playing');
        });
        
        audio.addEventListener('ended', function() {
            // Since loop is enabled, this shouldn't fire, but just in case
            if (audioToggle) audioToggle.classList.remove('playing');
        });
        
        // Handle audio loading errors
        audio.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            // Hide the audio button if audio file is not found
            if (audio.error && audio.error.code === 4 && audioToggle) {
                audioToggle.style.display = 'none';
                console.warn('Audio file not found. Please ensure "comfortably-numb.mp3" is in the project directory.');
            }
        });
    }
    
    // Add smooth scroll behavior for better UX
    // (CSS already handles this, but we can enhance it)
    
    // Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add subtle parallax effect to background elements on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const backgroundLogo = document.querySelector('.background-logo');
        const prismBackground = document.querySelector('.prism-background');
        
        if (backgroundLogo) {
            // Subtle parallax movement for logo
            const parallaxOffset = currentScrollY * 0.3;
            backgroundLogo.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;
        }
        
        if (prismBackground) {
            // Slower parallax for prism background
            const prismOffset = currentScrollY * 0.15;
            prismBackground.style.transform = `translateY(${prismOffset}px)`;
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add keyboard accessibility for audio toggle
    document.addEventListener('keydown', function(e) {
        // Space bar to toggle audio (when not in input field)
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && audioToggle) {
            e.preventDefault();
            audioToggle.click();
        }
    });
    
    // Enhance band card interactions
    const bandCards = document.querySelectorAll('.band-card');
    bandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale animation
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Enhance song card interactions
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add smooth scroll to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If href is '#', prevent default and add visual feedback
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Add a pulse animation
                this.style.animation = 'pulse-social 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    });
});

// Add CSS animations (dynamically added styles)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-hint {
        0%, 100% {
            box-shadow: 0 0 20px var(--glow-purple);
        }
        50% {
            box-shadow: 0 0 40px var(--glow-purple), 0 0 60px var(--glow-purple);
        }
    }
    @keyframes pulse-social {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

