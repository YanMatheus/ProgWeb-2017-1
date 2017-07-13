
    (function () {

      var gameLoop;
      var cont  = 0;
      var atual  = geraLetraAleatoria();
      var coluna = String(geraColunaAleatoria());
      var somador = 0;
      var contPosicoes = 0;
      var vetPosicoesOcupadas = [];
      var fps = 5;

      function criarMenu(){
        var menu = document.createElement("div");
        var body = document.body;
        menu.setAttribute("id", "menu");
        body.appendChild(menu);
      }

      function criarTabela() {
        var tabuleiro = document.getElementById("tabuleiro");
        var tabela = tabuleiro.appendChild(document.createElement("table"));
        tabela.setAttribute("id", "tabela");
        menu.appendChild(tabuleiro);
        for (var i = 1; i <= 18; i++) {
          var row =  tabela.appendChild(document.createElement("tr"));
          for (var j = 1; j <= 10; j++) {
            var td = document.createElement("td");
            td.setAttribute("id",""+i+""+""+j+"");
            row.appendChild(td);
            td.style.backgroundColor = "white";
          }
        }
      }

      function criarTabelaProximaPeca() {
        var next = document.getElementById("proxima-peca");
        var smallTable = next.appendChild(document.createElement("table"));
        smallTable.setAttribute("id","proxima");
        menu.appendChild(next);
        for (var i = 0; i < 4; i++) {
          var row = smallTable.appendChild(document.createElement("tr"));
          for (var j = 0; j < 4; j++) {
            var td = document.createElement("td");
            td.style.backgroundColor = "white";
            row.appendChild(td);
            }
          }
        }

      function criarInformacoes() {
        var info = document.getElementById("informacoes");
        menu.appendChild(info);
        var pontuacao = info.appendChild(document.createElement("p"));
        var texto = document.createTextNode("Pontuação");
        pontuacao.appendChild(texto);

        var visor = document.createElement("input");
        visor.setAttribute("id", "pontos");
        visor.setAttribute("type", "text");
        visor.setAttribute("value", "0000");
        pontuacao.appendChild(visor);

        var linhasVisor = document.createElement("input");
        linhasVisor.setAttribute("id", "linhas");
        linhasVisor.setAttribute("type","text");
        linhasVisor.setAttribute("value", "00");

        var pLinha = info.appendChild(document.createElement("p"));
        var textoLinha = document.createTextNode("Linhas");
        pLinha.appendChild(textoLinha);
        pLinha.appendChild(linhasVisor);
      }

      function criarTitulo() {
        var h1 = document.createElement("h1");
        var texto = document.createTextNode("Tetris");
        h1.appendChild(texto);
        menu.appendChild(h1);
      }

      function init() {
        criarMenu();
        criarTitulo();
        criarTabela();
        criarTabelaProximaPeca();
        criarInformacoes();
        gameLoop = setInterval(run, 2000/fps);
      }

      function geraColunaAleatoria() {
         var _numero = Math.floor((Math.random() * 8) + 2);
         return _numero;
      }

      function geraPecas(proxima) { //Gera as peças no tabuleiro
            if (proxima == "i"){
              var i = { bloco: "2345", color: 'cyan'  };
              return i;
            }
            if (proxima == "j"){
              var j = { bloco: "2344", color: 'blue' };
              return j;
            }
            if (proxima == "l"){
              var l = { bloco: "2344", color: 'orange' };
              return l;
            }
            if (proxima == "o"){
              var o = { bloco: "2323", color: 'yellow' };
              return o;
            }
            if (proxima == "s"){
              var s = { bloco: "2223", color: 'green'  };
              return s;
            }
            if (proxima == "t"){
              var t = { bloco: "2223", color: 'purple' };
              return t;
            }
            if (proxima == "z"){
              var t = { bloco: "2233", color: 'red' };
              return t;
          }
      }

      function geraBlocos(pos,coluna,cor){
      var vetLinhas = ["1234","1233","1233","1212","2233","2223"];
      var vetColunas = ["2222", "3332", "2223", "2233","2312","1232","2334"];

      for (var i = 0; i < 4; i++) {
          linha = String(vetLinhas[pos].charAt(i));
          coluna = String(vetColunas[pos].charAt(i));
          var peca = document.querySelector("#proxima tr:nth-child("+ linha +") td:nth-child("+ coluna +")");
          peca.style.backgroundColor = cor;
        }
      }

      function geraProximaPeca(proxima){
          switch (proxima) {
            case 'i':
              geraBlocos(0,0,"cyan");
            break;
              case 'j':
              geraBlocos(1,1,"blue");
            break;
              case 'l':
              geraBlocos(2,2,"orange");
            break;
              case 'o':
              geraBlocos(3,3,"yellow");
            break;
              case 's':
              geraBlocos(4,3,"green");
              break;
              case 't':
              geraBlocos(5,4,"purple");
              break;
              case 'z':
              geraBlocos(4,5,"red");
              break;
          default:
        }
        return proxima;
      }

    /* Função limpa (colocando a cor de fundo) em uma posicao especifica da tabela */
  function limpaTabela(linha, coluna){
  linha--;
  for (var c = 0; c < 18; c++) { //coluna
      for (var l = 0; l < 10; l++) { // percorre linha
        if (!(l == linha && c == coluna)){
            var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+coluna+")");
            peca.style.backgroundColor = "white";
          }
        }
    }
  }

  function verificaLimite(linha) {
    for (var coluna = 1; coluna <= 10; coluna++) {
    var td = document.getElementById(""+linha+""+""+coluna+"");
          if (td.style.backgroundColor != "white"){
              return true;
            }
          }
        return false;   //Nao tem espaco em branco ~
  }

  /* Função que checa se uma linha inteira está ocupada */
  function verificaLinha(linha) {
    for (var coluna = 1; coluna <= 10; coluna++) {
    var td = document.getElementById(""+linha+""+""+coluna+"");
          if (td.style.backgroundColor == "white"){
              return false;
            }
          }
        return true;   //Nao tem espaco em branco ~ linha completa ~soma 100
  }

  /* Função que verifica se um bloco está ocupado */
  function verificaPosicao(linha, coluna) {
    var td = document.getElementById(""+linha+""+""+coluna+"");
      if (td.style.backgroundColor == "white"){
        return 1;
      }
      return 0;
  }

  function verificaTabela(linha, coluna) {
    var id = ""+linha+""+""+coluna+"";
    for (var l = 1; l <= 18; l++) { //linha
      for (var c = 1; c <= 10; c++) { // percorre coluna
        var td = document.getElementById(""+l+""+""+c+"");
        if (td.style.backgroundColor != "white"){
          vetPosicoesOcupadas[contPosicoes] = ""+l+""+""+c+"";
          contPosicoes++;
        }
      }
    }
      for (var i = 0; i < vetPosicoesOcupadas.length; i++) {
       if (vetPosicoesOcupadas[i] == id){
         return 0;
       }
      }
      return 1;
  }

    function apagaTudo(linha, coluna){
      for (var l = 1; l <= 18; l++) {
        for (var c = 1; c <= 10; c++) {
           if (c == coluna && l == linha){
            var peca = document.querySelector ("#tabela tr:nth-child("+ String(l) +") td:nth-child("+String(c)+")");
            peca.style.backgroundColor = "white";
           }
          }
      }
    }

   function limpa() {
     for (var l = 1; l <= 4; l++) {
          for (var c = 1; c <= 4; c++) {
            var bloco = document.querySelector("#proxima tr:nth-child("+ String(l) +") td:nth-child("+String(c)+")");
            bloco.style.backgroundColor = "white";
          }
        }
     }

     function verificaParada(ultimaPos, coluna){
     if (ultimaPos+1 != 19){
     var verificaPosUm = verificaPosicao(ultimaPos+1,coluna);
     if (verificaPosUm == 0){
       return 18;
      }
     }
     return ultimaPos;
 }
  /* Função que gera aleatoriamente uma letra que representará a peça correspondente  */
  function geraLetraAleatoria() {
      var pecas = ["i","j","l","o","s","t","z"]; // peças
      var random = Math.floor((Math.random() * 7) + 0); //random da posicao das peças
      var letra = pecas[random];
      return letra;
  }

  /* Para capturar os movimentos do jogador  */
  addEventListener("keydown", function(e) {
      if (e.key == "ArrowRight") {
      var vet = [];
      if (coluna+1 <= 10){
        var ultimaLinha =  formaPeca(atual, vet, somador, coluna++);
        var blocos = getPosicoesPeca(v);
        for (var i = 0; i < blocos.length; i++) {
          apagaTudo(blocos[i].lin,blocos[i].col);
          }
        }
      } else if (e.key == "ArrowLeft") {
        if (coluna-1 >= 1){
        var vet = [];
        var ultimaLinha =  formaPeca(atual, vet, somador, coluna--);
        var blocos = getPosicoesPeca(v);
        for (var i = 0; i < blocos.length; i++) {
          apagaTudo(blocos[i].lin,blocos[i].col);
          }
        }
      }
      else if (e.key == "ArrowDown") {
        if (somador < 18){
          var vet = [];
          var ultimaLinha =  formaPeca(atual, vet, somador, coluna);
          apagaTudo(ultimaLinha);
        }
      }
  });

  var v;

    /* Funcao para fazer as pecas cairem */
    function formaPeca(atual, vetBlocos, somador, coluna) { // Forma uma peça
        v = [];
        var qtdPecas = 0;
        var blocoIdx = 0;
        for (var i = 0; i < 4; i++) {
          var letra = geraPecas(atual);
          var linha = parseInt(letra.bloco.charAt(i)) + somador;   //somador - incrementador das posições
          if (letra.color == 'cyan'){
              qtdPecas = 1;
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ coluna +")");
              peca.style.backgroundColor = "cyan";
              var pos = {lin:linha, col:parseInt(coluna)};
              vetBlocos.push(pos);
              ultimaPos = linha;
              v.push(pos);
          }
          if (letra.color == 'blue'){
            qtdPecas = 2;
            if (i == 3){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) - 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
            } else if (i == 0){
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(coluna)};
              vetBlocos.push(pos);
              v.push(pos);
            }
            var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
            peca.style.backgroundColor = letra.color;
            var pos = {lin:linha, col:parseInt(coluna)};
            v.push(pos);
            ultimaPos = linha;
          }
          if (letra.color == 'orange'){
            qtdPecas = 2;
            if (i == 3){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) + 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
            } else if (i == 0){
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(coluna)};
              vetBlocos.push(pos);
              v.push(pos);
            }
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              ultimaPos = linha;
              var pos = {lin:linha, col:parseInt(coluna)};
              v.push(pos);
          }
          if (letra.color == 'yellow' ){
            qtdPecas = 2;
            if (i == 3){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) - 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
            } else if (i == 2){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) - 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
            } else if (i == 0){
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(coluna)};
              vetBlocos.push(pos);
              v.push(pos);
            }
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              ultimaPos = linha;
              var pos = {lin:linha, col:parseInt(coluna)};
              v.push(pos);
          }
         if (letra.color == 'purple' ){
          qtdPecas = 3;
          if (i == 1){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) - 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
            v.push(pos);
          } else if (i == 2) {
              var colunaEsp = parseInt(coluna) + 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
          }
          else  if (i == 0) {
              var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(coluna)};
              vetBlocos.push(pos);
              v.push(pos);
          }
            var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna)  +")");
            peca.style.backgroundColor = letra.color;
            var pos = {lin:linha, col:parseInt(coluna)};
            v.push(pos);
            ultimaPos = linha;
        }
        if (letra.color == 'red' ){
         qtdPecas = 3;
         if (i == 1){ // bloco em uma posicao diferente que deve ter pintado
             var colunaEsp = parseInt(coluna) - 1;
             var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
             peca.style.backgroundColor = letra.color;
             var pos = {lin:linha, col:parseInt(colunaEsp)};
             vetBlocos.push(pos);
             v.push(pos);
         } else if (i == 2) {
             var colunaEsp = parseInt(coluna) + 1;
             var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
             peca.style.backgroundColor = letra.color;
             var pos = {lin:linha, col:parseInt(colunaEsp)};
             vetBlocos.push(pos);
             v.push(pos);
         }
         else  if (i == 0) {
             var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
             peca.style.backgroundColor = letra.color;
             var pos = {lin:linha, col:parseInt(coluna)};
             vetBlocos.push(pos);
             v.push(pos);
         }
             var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna)  +")");
             peca.style.backgroundColor = letra.color;
             ultimaPos = linha;
             var pos = {lin:linha, col:parseInt(coluna)};
             v.push(pos);
       }
      if (letra.color == 'green' ){
        qtdPecas = 3;
        if (i == 3){ // bloco em uma posicao diferente que deve ter pintado
              var colunaEsp = parseInt(coluna) - 1;
              var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
              peca.style.backgroundColor = letra.color;
              var pos = {lin:linha, col:parseInt(colunaEsp)};
              vetBlocos.push(pos);
              v.push(pos);
        } else if (i == 2){ // bloco em uma posicao diferente que deve ter pintado
            var colunaEsp = parseInt(coluna) + 1;
            var peca = document.querySelector("#tabela tr:nth-child("+linha+") td:nth-child("+String(colunaEsp)+")");
            peca.style.backgroundColor = letra.color;
            var pos = {lin:linha, col:parseInt(colunaEsp)};
            vetBlocos.push(pos);
            v.push(pos);
        } else if (i == 0){
            var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
            peca.style.backgroundColor = letra.color;
            var pos = {lin:linha, col:parseInt(coluna)};
            vetBlocos.push(pos);
            v.push(pos);
        }
            var peca = document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child("+ String(coluna) +")");
            peca.style.backgroundColor = letra.color;
            ultimaPos = linha;
            var pos = {lin:linha, col:parseInt(coluna)};
            v.push(pos);
          }
    }
    getPosicoesPeca(v);

    for (var i = 0; i < qtdPecas; i++) { //limpa os blocos das posições anteriores
      limpaTabela(vetBlocos[i].lin, vetBlocos[i].col);
    }

    ultimaPos = verificaParada(ultimaPos,parseInt(coluna));
    return ultimaPos;
  }
  function getPosicoesPeca(v) {
      return v;
  }

 function reset() {
   somador = 0;
   limpa();
   atual  = prox;
   verifica = false;
   prox = geraProximaPeca(geraLetraAleatoria());
   coluna = geraColunaAleatoria();
 }

  var valor = 0;
  var valorLinhas = 0;

  var prox = geraLetraAleatoria();
     function run () {
          geraProximaPeca(prox);

          var vetBlocos=[];

          var indice = formaPeca(atual, vetBlocos, somador++, coluna);

          if (indice == 18){ // Uma peca parou de mover
            /* Closure */
            function somaPontos(nova) {
              return function (antigo) {
                nova = nova + antigo;
                return nova;
              };
            }
            var soma1 = somaPontos(valorLinhas);
            var soma10 = somaPontos(valor);
            var soma100 = somaPontos(valor);
            var verifica  = verificaLinha(indice);
            if (verifica == true){
                document.getElementById('pontos').value = soma100(100);
                document.getElementById('linhas').value = soma1(1);
                valor = valor + 100;
                valorLinhas = valorLinhas + 1;
            }else{
                document.getElementById('pontos').value = soma10(10);
                valor = valor + 10;
            }
            reset();
            var limite = verificaLimite(2);
            if (limite == true){
              window.clearInterval(gameLoop);
              alert('Fim de jogo - Atualize a página para jogar novamente');
              init();
            }
          }
          return indice;
        }
    init();
  })();
