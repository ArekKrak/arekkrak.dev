<?php
  $lines = file(__DIR__ . '/../.env');

  foreach ($lines as $line) {
    $line = trim($line);

    if ($line === '') {
      continue;
    }

    $parts = explode('=', $line);
    $key = trim($parts[0]);
    $value = trim($parts[1]);
    $_ENV[$key] = $value;
  }
?>