<?php
header('Content-Type: application/json');

$uploadDir = '../uploads/';
$dataFile = '../data/obat.json';

// Buat folder jika belum ada
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
if (!is_dir(dirname($dataFile))) mkdir(dirname($dataFile), 0755, true);

// Baca data lama
$obats = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

$nama = trim($_POST['nama'] ?? '');
$harga = trim($_POST['harga'] ?? '');
$id = $_POST['id'] ?? null;
$action = $_POST['action'] ?? '';

if (!$nama || !is_numeric($harga) || $harga <= 0) {
    echo json_encode(['message' => 'Data tidak valid']);
    exit;
}

$fotoPath = null;
if (!empty($_FILES['foto']['name'])) {
    $file = $_FILES['foto'];
    $allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['message' => 'Hanya PNG/JPG']);
        exit;
    }
    
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $fileName = uniqid() . '.' . $ext;
    $target = $uploadDir . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $target)) {
        $fotoPath = $target;
    }
}

if ($action === 'update' && $id !== null) {
    foreach ($obats as &$obat) {
        if ($obat['id'] == $id) {
            $obat['nama'] = $nama;
            $obat['harga'] = (int)$harga;
            if ($fotoPath) $obat['foto'] = $fotoPath;
            break;
        }
    }
} else {
    $obats[] = [
        'id' => time(),
        'nama' => $nama,
        'harga' => (int)$harga,
        'foto' => $fotoPath
    ];
}

file_put_contents($dataFile, json_encode($obats, JSON_PRETTY_PRINT));
echo json_encode(['message' => 'Berhasil']);
?>