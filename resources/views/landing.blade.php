<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/jpg" href="{{ asset('favicon.jpg') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">

  <title>{{ $title }}</title>
</head>
<body>
  <div id="main"></div>
  <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
</html>
