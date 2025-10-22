<!DOCTYPE html>
<html>

<head>
  <title>ContactoPro</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
  @viteReactRefresh
  @vite('resources/js/main.jsx')
  @inertiaHead
</head>
@csrf

<body>
  @csrf
  @inertia
  @csrf
  <script src="https://kit.fontawesome.com/355d019965.js" crossorigin="anonymous"></script>
  @csrf
</body>

</html>