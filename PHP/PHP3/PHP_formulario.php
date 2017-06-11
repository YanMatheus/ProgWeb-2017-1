
<?php
	echo "Nome: " . $_GET["nome"] . "<br>";
	echo "Senha: " . $_GET["senha"] . "<br>";
	
	if (($_GET["senha"] == "demo") && ($_GET["nome"] == "demo")) {
		//header("Location: PHP_formulario.php");
		/*init_session();
		$_SESSION["user"] = $_GET["nome"];
		echo $_SESSION["user"];*/
	}
	else{
		header("Location: PHP_login.php");
	}
?>


<!DOCTYPE html>
<html>

	<head>

		<meta charset="utf-8">

		<title>
			Instituto de Computação
		</title>

	</head>

	<body>
		
		<h1>Formulário de Contato</h1>
		
		<p>
			Por favor, preencha o formulário abaixo e clique no botão Enviar Mensagem. Agradecemos por seu contato.
		</p>

		<form action="PHP_impressao.php" method="GET">

			<fieldset>

				<legend>Dados Básicos</legend>

				<label for="nome">Nome</label>
				<input type="text" name="nome" id="nome"> <br>

				<label for="email">E-mail</label>
				<input type="email" name="email" id="email" required placeholder="seu_nome@email.com"> <br>

				<label for="website">Website</label>
				<input type="text" name="website" id="website" value="http://"> <br>

			</fieldset>

			<br>

			<input type="reset" name="resetar">
			<input type="submit" name="submit">
	
		</form>
		
	</body>

</html>
