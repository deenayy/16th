const giftContainer = document.getElementById('gift-container');
const gift = document.getElementById('gift');
const giftLid = document.getElementById('gift-lid');
const card = document.getElementById('card');
const clickCounter = document.querySelector('.counter-value');
const celebrateSound = document.getElementById('celebrate-sound');

let clickCount = 0;
let canClick = true;

const shakeSounds = [
    'shake_1.mp3',
    'shake_2.mp3',
    'shake_3.mp3'
];

function playRandomShakeSound() {
    const randomIndex = Math.floor(Math.random() * shakeSounds.length);
    const audio = new Audio(shakeSounds[randomIndex]);
    audio.play();
}

function getRandomColor() {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                            ${Math.floor(Math.random() * 256)}, 
                            ${Math.floor(Math.random() * 256)})`;
    console.log("Generated Color:", randomColor);
    return randomColor;
}

function changeBackgroundColor() {
  const newColor = getRandomColor(); 
  document.body.style.background = ""; 
  document.body.style.backgroundColor = newColor; 
  console.log("Background color changed to:", newColor);
}

giftContainer.addEventListener('click', () => {
    if (!canClick) return;
    if (clickCount >= 16) return; 

    canClick = false;
    playRandomShakeSound();

    clickCount++;
    clickCounter.textContent = clickCount;

    changeBackgroundColor();

    giftContainer.style.animation = 'shake 0.3s ease-out';

    giftContainer.addEventListener('animationend', () => {
        giftContainer.style.animation = '';
    });

    if (clickCount === 16) {

        setTimeout(() => {
        gift.style.transition = 'transform 2s ease'; // Perpanjang durasi animasi menjadi 3 detik
        giftLid.style.transition = 'transform 2s ease'; // Perpanjang durasi animasi menjadi 3 detik
        gift.style.transform = 'translateY(20px)';
        giftLid.style.transform = 'translateY(-20px)';
      }, 500); 

      setTimeout(() => {
      document.getElementById('click-counter').style.display = 'none';
      }, 4000); 

      setTimeout(() => {
      celebrateSound.play();
    }, 2000); 

    setTimeout(() => {
        card.classList.remove('hidden');
        card.style.transition = 'transform 2s ease-out'; // Durasi animasi 2 detik
        card.style.transform = 'scale(1)'; // Ukuran kartu menjadi 4x dari ukuran awal
        }, 2000); // 500ms delay sebelum kartu muncul
    }
    
    setTimeout(() => {
      const cakeLink = document.getElementById('cake-link');
      cakeLink.style.pointerEvents = 'none'; // Disable link interactions
      cakeLink.style.opacity = '0.6'; // Optionally, dim the link
      cakeLink.style.cursor = 'not-allowed'; // Change cursor to indicate non-clickable
  }, 1000); // Disable link after card animation finishes

  setTimeout(() => {
      const cakeLink = document.getElementById('cake-link');
      cakeLink.style.pointerEvents = 'auto'; // Re-enable link interactions
      cakeLink.style.opacity = '1'; // Restore opacity
      cakeLink.style.cursor = 'pointer'; // Restore cursor
  }, 2000); // Re-enable after 3 seconds

  setTimeout(() => {
  canClick = true;
  }, 500);

});


const cakeLink = document.getElementById('cake-link');
const cakeSection = document.getElementById('yourcake'); // Target section
const cakeGroup = document.getElementById('yourcake2');
const hbdSound = new Audio('hbd.mp3');
const cakeImages = document.querySelectorAll('.cake-group');
const cake4 = document.querySelector('.cake4');
const finalLink = document.getElementById('final-link');
const horeSound = new Audio('hore.mp3'); // Ganti dengan path file hore.mp3 yang sesuai
const pElement = document.querySelector('#yourcake p');
hbdSound.loop = true; // Set the song to loop initially

let cakeClickCount = 0;
let canClickcake = true; // Variabel untuk mengatur status apakah klik dapat dilakukan


cakeLink.addEventListener('click', (event) => {
  event.preventDefault();
  card.classList.add('hidden'); 
  cakeSection.classList.add('visible');
  cakeGroup.classList.add('visible');

  hbdSound.play(); // Start playing the HBD song
});

const images = document.querySelectorAll('.cake-img');
let currentIndex = 0;

images.forEach(img => img.style.opacity = 0);
images[0].style.opacity = 1;
  
const interval = setInterval(() => {
  images[currentIndex].style.opacity = 0;

  currentIndex = (currentIndex + 1) % images.length;

  images[currentIndex].style.opacity = 1;
}, 1000);

cakeImages.forEach((img) => {
  img.addEventListener('click', () => {
    if (!canClickcake) return; // Cek apakah klik diizinkan
    canClickcake = false; // Nonaktifkan klik sementara

    cakeClickCount++;

    if (cakeClickCount >= 3) {
      hbdSound.pause(); // Stop the HBD song
      hbdSound.currentTime = 0; // Reset the song to the beginning
      
      horeSound.play(); // Play the hore song after hbd.mp3 is stopped
      horeSound.loop = false; // Pastikan lagu tidak looping, hanya diputar sekali

      finalLink.style.display = 'block'; // Tampilkan link
      pElement.style.display = 'none'; // Tampilkan link
    }

    if (cakeClickCount <= 3) {
      cakeImages.forEach((image) => {
        image.style.opacity = 1 - (cakeClickCount * 0.33); // Each click reduces opacity by 1/3
      });
    }

    // If opacity reaches 0 for cake1, cake2, and cake3, hide them after 3 clicks
    if (cakeClickCount >= 3) {
      setTimeout(() => {
        cakeImages.forEach((image) => {
          image.style.display = 'none';  
        });
      }, 1000); 
    }

    setTimeout(() => {
      canClickcake = true; // Mengaktifkan kembali klik setelah 1 detik
    }, 500); 
  });
});
