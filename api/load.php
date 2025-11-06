<?php
header('Content-Type: application/json');
$dataFile = 'web-obat/data/obat.json';

if (!file_exists($dataFile)) {
    echo json_encode([]);
    exit;
}

echo file_get_contents($dataFile);

?>
