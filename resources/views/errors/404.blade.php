<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page Not Found @ busliner.com</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
</head>
<body>
  <div class="error-body-wrapper">
    <div class="error-body">
      <img src="{{ asset('vader404.jpg') }}">

      <h1>Page not found</h1>

      <p>The link you followed may be broken or the page may have been removed.</p>
      <p><a class="button-default button-green" href="{{ url('/') }}">Take me to the homepage.</a></p>
    </div>
  </div>
</body>
</html>