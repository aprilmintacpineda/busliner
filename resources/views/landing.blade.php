<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf_token" content="{{ csrf_token() }}">
  <link rel="icon" type="image/jpg" href="{{ asset('favicon.jpg') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
  <title>{{ $title }}</title>
</head>
<body>
  <div id="main"></div>
  @if(Session::has('pop_message'))
    <script type="text/javascript">
      window.pop_message = {!! json_encode(Session::get('pop_message')) !!}
    </script>
  @endif
  <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
  @if(isset($map) && $map)
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyhDDLqPWekONyGquAYZkPBcHfRwrP5c0&callback=window.initMap" defer async></script>
  @endif
</body>
</html>
