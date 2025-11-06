let obats = [];
let currentIndex = 0;
let delay = 5; // default 5 detik

// Ambil data dari file JSON via PHP
fetch('api/load.php')
  .then(res => res.json())
  .then(data => {
    obats = data;
    if (obats.length > 0) {
      tampilkanObat(0);
      // Rotasi otomatis
      setInterval(() => {
        currentIndex = (currentIndex + 1) % obats.length;
        tampilkanObat(currentIndex);
      }, delay * 1000);
    } else {
      document.getElementById('namaObat').textContent = 'Tidak ada data obat';
    }
  })
  .catch(() => {
    document.getElementById('namaObat').textContent = 'Gagal memuat data';
  });

function tampilkanObat(index) {
  const obat = obats[index];
  if (!obat) return;
  
  document.getElementById('namaObat').textContent = obat.nama;
  document.getElementById('hargaObat').textContent = `Rp ${parseInt(obat.harga).toLocaleString('id-ID')}`;
  
  const img = document.getElementById('fotoObat');
  if (obat.foto) {
    img.src = obat.foto + '?t=' + Date.now(); // hindari cache
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}