let obats = JSON.parse(localStorage.getItem('obats')) || [];
let currentIndex = 0;
let delay = parseInt(localStorage.getItem('delay')) || 5;

if (obats.length > 0) {
  tampilkanObat(0);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % obats.length;
    tampilkanObat(currentIndex);
  }, delay * 1000);
} else {
  document.getElementById('namaObat').textContent = 'Belum ada data. Silakan ke halaman admin.';
}

function tampilkanObat(index) {
  const obat = obats[index];
  document.getElementById('namaObat').textContent = obat.nama;
  document.getElementById('hargaObat').textContent = `Rp ${parseInt(obat.harga).toLocaleString('id-ID')}`;
  
  const img = document.getElementById('fotoObat');
  if (obat.foto) {
    img.src = obat.foto;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}
