<?php
$dir = 'drawings/';
$files = array_diff(scandir($dir), ['.', '..']);
echo json_encode(array_values($files));
?>