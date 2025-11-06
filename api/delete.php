<?php
header('Content-Type: application/json');

$dataFile = '../data/obat.json';
$obats = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if ($id) {
    foreach ($obats as $key => $obat) {
        if ($obat['id'] == $id) {
            if (!empty($obat['foto']) && file_exists($obat['foto'])) {
                unlink($obat['foto']);
            }
            unset($obats[$key]);
            file_put_contents($dataFile, json_encode(array_values($obats)));
            break;
        }
    }
}
echo json_encode(['message' => 'Dihapus']);
?>