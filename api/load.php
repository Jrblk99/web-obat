<?php
header('Content-Type: application/json');
$dataFile = '../data/obat.json';

if (!file_exists($dataFile)) {
    echo json_encode([]);
    exit;
}

echo file_get_contents($dataFile);
?>