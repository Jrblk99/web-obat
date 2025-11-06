let obats = [];
let editingId = null;

function loadData() {
  fetch('api/load.php')
    .then(res => res.json())
    .then(data => {
      obats = data;
      renderList();
    });
}

function renderList() {
  const container = document.getElementById('daftarObat');
  if (obats.length === 0) {
    container.innerHTML = '<p>Belum ada obat.</p>';
    return;
  }
  container.innerHTML = obats.map(obat => `
    <div class="obat-item">
      <div>
        <strong>${obat.nama}</strong><br>
        Rp ${parseInt(obat.harga).toLocaleString('id-ID')}
      </div>
      <button class="btn" onclick="editObat(${obat.id})">Edit</button>
    </div>
  `).join('');
}

function editObat(id) {
  const obat = obats.find(o => o.id == id);
  if (!obat) return;
  
  document.getElementById('inputNama').value = obat.nama;
  document.getElementById('inputHarga').value = obat.harga;
  document.getElementById('formTitle').textContent = '✏️ Edit Obat';
  document.getElementById('btnHapus').style.display = 'inline-block';
  editingId = id;
}

document.getElementById('btnHapus').onclick = () => {
  if (!confirm('Yakin hapus?')) return;
  
  fetch('api/delete.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: editingId })
  }).then(() => {
    loadData();
    resetForm();
  });
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
  
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    alert('Hanya PNG/JPG!');
    return;
  }

  const formData = new FormData();
  formData.append('action', editingId ? 'update' : 'add');
  formData.append('id', editingId || '');
  formData.append('nama', nama);
  formData.append('harga', harga);
  formData.append('foto', file);

  fetch('api/save.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(() => {
      loadData();
      resetForm();
    })
    .catch(() => alert('Gagal menyimpan.'));
};

function resetForm() {
  document.getElementById('obatForm').reset();
  document.getElementById('formTitle').textContent = '➕ Tambah Obat Baru';
  document.getElementById('btnHapus').style.display = 'none';
  editingId = null;
}

loadData();