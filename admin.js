let obats = JSON.parse(localStorage.getItem('obats')) || [];
let editingId = null;

function simpanKeStorage() {
  localStorage.setItem('obats', JSON.stringify(obats));
}

function loadData() {
  obats = JSON.parse(localStorage.getItem('obats')) || [];
  renderList();
}

function renderList() {
  const container = document.getElementById('daftarObat');
  if (obats.length === 0) {
    container.innerHTML = '<p>Belum ada obat.</p>';
    return;
  }
  container.innerHTML = obats.map((obat, idx) => `
    <div class="obat-item">
      <div>
        <strong>${obat.nama}</strong><br>
        Rp ${parseInt(obat.harga).toLocaleString('id-ID')}
      </div>
      <button class="btn" onclick="editObat(${idx})">Edit</button>
    </div>
  `).join('');
}

function editObat(index) {
  const obat = obats[index];
  document.getElementById('inputNama').value = obat.nama;
  document.getElementById('inputHarga').value = obat.harga;
  document.getElementById('formTitle').textContent = '✏️ Edit Obat';
  document.getElementById('btnHapus').style.display = 'inline-block';
  editingId = index;
}

document.getElementById('btnHapus').onclick = () => {
  if (!confirm('Yakin hapus?')) return;
  obats.splice(editingId, 1);
  simpanKeStorage();
  loadData();
  resetForm();
};

document.getElementById('obatForm').onsubmit = (e) => {
  e.preventDefault();
  const nama = document.getElementById('inputNama').value.trim();
  const harga = document.getElementById('inputHarga').value;
  const file = document.getElementById('inputFoto').files[0];
  
  if (!nama || !harga || harga <= 0 || !file) {
    alert('Isi semua kolom!');
    return;
  }
  
  const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowed.includes(file.type)) {
    alert('Hanya PNG/JPG!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const fotoBase64 = e.target.result;
    
    if (editingId !== null) {
      obats[editingId] = { nama, harga: parseInt(harga), foto: fotoBase64 };
    } else {
      obats.push({ nama, harga: parseInt(harga), foto: fotoBase64 });
    }
    
    simpanKeStorage();
    loadData();
    resetForm();
  };
  reader.readAsDataURL(file);
};

function resetForm() {
  document.getElementById('obatForm').reset();
  document.getElementById('formTitle').textContent = '➕ Tambah Obat Baru';
  document.getElementById('btnHapus').style.display = 'none';
  editingId = null;
}

loadData();
