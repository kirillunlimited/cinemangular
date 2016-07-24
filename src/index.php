<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Киношка</title>
  <link rel="stylesheet" href="css/main.css" />
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=PT+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script> -->
  <!-- <script src="https://code.angularjs.org/1.5.6/angular-route.min.js"></script> -->
  <script src="app/app.js"></script>
  <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body class="page" ng-app="app" ng-cloak>

  <!-- <aside class="page__aside aside"> -->
  <nav class="page__navigation navigation">
    <ul class="navigation__menu menu">
      <li class="menu__item"><a class="menu__link" ui-sref="afisha.today">Афиша</a></li>
      <li class="menu__item"><a class="menu__link" ui-sref="search">Поиск</a></li>
    </ul>
  </nav>
  <!-- </aside> -->

  <div class="page__content content">
    <div class="content__wrapper" ui-view></div>
  </div>

</body>
</html>
