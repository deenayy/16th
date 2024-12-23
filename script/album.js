window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Setelah 2 detik, hilangkan loading screen
    setTimeout(() => {
      loadingScreen.style.opacity = '0';  // Perlahan hilangkan loading screen
      setTimeout(() => {
        loadingScreen.style.display = 'none';  // Sembunyikan loading screen setelah opacity 0
      }, 500);  // Tunggu sedikit agar transisi opacity selesai
    }, 2000);  // Tunggu 2 detik
  });

const audio = document.getElementById('myAudio');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');
const songSelector = document.getElementById('songSelector');
const openPageBtn = document.getElementById('openPageBtn');
const mainContent = document.getElementById('mainContent');

// Fungsi untuk memutar/menghentikan musik
toggleMusicBtn.addEventListener('click', () => {
    const selectedSong = songSelector.value; // Ambil lagu yang dipilih

    if (!selectedSong) {
        alert("Silakan pilih lagu terlebih dahulu!");
        return; // Jangan lanjutkan jika belum ada lagu yang dipilih
    }

    // Pastikan audio memiliki sumber yang benar sebelum mencoba memutar
    if (audio.paused) {
        audio.play(); // Memutar musik
        toggleMusicBtn.textContent = 'Matikan Musik'; // Ubah teks tombol
    } else {
        audio.pause(); // Menghentikan musik
        toggleMusicBtn.textContent = 'Putar Musik'; // Reset teks tombol
    }
});

// Fungsi untuk mengganti lagu
songSelector.addEventListener('change', () => {
    const selectedSong = songSelector.value; // Ambil nilai dari dropdown
    if (selectedSong) {
        audio.src = selectedSong; // Ganti sumber audio dengan pilihan
        audio.pause(); // Pastikan musik berhenti saat lagu baru dipilih
        toggleMusicBtn.textContent = 'Putar Musik'; // Reset teks tombol
        openPageBtn.disabled = false; // Aktifkan tombol
    }
});

// Tampilkan konten utama saat tombol "Buka Halaman" diklik
openPageBtn.addEventListener('click', () => {
    openPageBtn.style.display = 'none';
    // Tampilkan konten halaman
    mainContent.style.display = 'block';

    document.querySelector('.music-control').style.marginBottom = '10px';
});

// Modal untuk memperbesar gambar
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');
const images = document.querySelectorAll('.thumbnail');

// Daftar gambar
const imageArray = ["images/image1.jpg", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg", "images/image5.jpg"];
let currentImageIndex = 0; // Indeks gambar yang sedang ditampilkan

// Tampilkan gambar yang diperbesar
images.forEach((image) => {
    image.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
        document.body.style.overflow = 'hidden'; // Menonaktifkan scroll
    });
});

// Menutup modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Mengembalikan scroll
});

// Menutup modal jika klik di luar gambar
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Mengembalikan scroll
    }
});

// Fungsi untuk mengganti gambar dengan tombol panah
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const currentImage = document.getElementById('currentImage');

// Fungsi untuk mengganti gambar ke gambar selanjutnya
nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageArray.length; // Indeks selanjutnya
    currentImage.src = imageArray[currentImageIndex];
});

// Fungsi untuk mengganti gambar ke gambar sebelumnya
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length; // Indeks sebelumnya
    currentImage.src = imageArray[currentImageIndex];
});
