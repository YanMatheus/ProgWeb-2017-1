
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>
			Instituto de Computação
		</title>
	</head>
	<body>
		<h1>Login de Usuário</h1>
		<p> Para preencher o formulário é necessário estar logado!</p>

		<form action="PHP_formulario.php" method="GET">
			<fieldset>
				<legend>Dados Básicos</legend>
				<label for="nome">Nome</label>
				<input type="text" name="nome" id="nome"> <br>

				<label for="senha">Senha</label>
				<input type="password" name="senha" id="senha"> <br>

			</fieldset>

			<br>

			<input type="reset" name="resetar">
			<input type="submit" name="submit">
	
		</form>
		
	</body>

</html>
