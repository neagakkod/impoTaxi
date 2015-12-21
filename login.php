<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="site pour generer trimestre">
    <meta name="author" content="">

    <title>ImpoTaxi Login</title>

    <!-- Bootstrap core CSS -->
     <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom styles for this template --> <link href="css/login.css" rel="stylesheet">


    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="js/plugins/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="js/plugins/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">

      <form id="loginForm" class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputUsr" class="sr-only">Email address</label>
        <input type="text" id="inputUsr" class="form-control" placeholder="username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <a  id="submitCredBtn" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</a>
      </form>

    </div> <!-- /container -->

	
 	<!-- jQuery -->
    <script src="js/plugins/jquery-2.1.4.min.js"></script>
    
     
    <!-- handlebars JavaScript -->
    <script src="js/plugins/handlebars-v4.0.4.js"></script>
	
	<!-- Utilities -->
    <script src="js/utilities/KuaminikaAuthenticator.js"></script>
    <script src="js/utilities/Fetcher.js"></script>
   
   	<!-- controllers -->
    <script src="js/Controllers/LoginController.js"></script>
    
    
    <!-- app -->
    <script src="js/impoTaxi.js"></script>
    
    
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/plugins/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
