(function () {

    var tabuleiro;
    var peca;
    var fps = 5;
    var gameLoop;
    var numLinhas = 14;
    var score = 0;
    addEventListener("keydown", function(e) {
        if (e.key == "ArrowLeft" && peca.isMovePecaParaEsquerda()) {
            peca.movePecaParaEsquerda();
        } else if (e.key == "ArrowRight" && peca.isMovePecaParaDireita()) {
           peca.movePecaParaDireita();
        }else if (e.key == "ArrowDown"){
          run();
        }
    });

    function init () {
       storyboard = storyboard();
       storyboard.criaTabuleiro();
       storyboard.criaTabuleiroProximaPeca();
       peca = peca();
       document.getElementById("informacoes").innerHTML = "0";

       gameLoop = setInterval(run,1200/fps);
    }

    function run () {
      storyboard.pintarTabuleiro();
      if(peca.isMovePecaParaBaixo()){
        peca.movePeca();
      }
      else {
        peca.novaPeca();
      }
      storyboard.limparTabuleiro();
      peca.pintaPeca();
      storyboard.linhaCheia();
      storyboard.pintarTabuleiro();
      if(storyboard.encerraJogo())
      {
        window.clearInterval(gameLoop);
        alert("YOU DIED"+"\n"+"Sua pontuação foi "+score+" pontos" +"\nVocê removeu o total de "+(score/100)+" linhas");
            }

    }

    var storyboard = function()
    {
        var tabuleiro;
        var flagJogoEncerrado = 0;
        var tabuleiroPreenchido = [];
        var divProxima_peca;
        var proximapeca;
        /* closure */
        var  criaTabuleiro = function()
        {
            storyboard.tabuleiro = document.getElementById("tabuleiro");
            let tabela = document.createElement("table");
            for (var i = 0; i < numLinhas; i++) {
                tabela.appendChild(storyboard.criaLinha(i));
            }
            storyboard.tabuleiro.appendChild(tabela);
        }

        var  criaTabuleiroProximaPeca = function()
        {
            storyboard.divProxima_peca = document.getElementById("proxima-peca");
            let tabela = document.createElement("table");
            for (var i = 0; i < 4; i++) {
                let linha = document.createElement("tr");
                for (var j = 0; j < 4; j++) {
                  let celula = document.createElement("td");
                  celula.id = "pp"+i+"-"+(j + 3);
                  linha.appendChild(celula);
                }
                tabela.appendChild(linha);
            }
            storyboard.divProxima_peca.appendChild(tabela);
        }

        /* closure */
        var criaLinha = function(numLinha)
        {

          let linha = document.createElement("tr");
          for (var i = 0; i < 10; i++) {
            let celula = document.createElement("td");
            celula.id = numLinha+"-"+i;
            linha.appendChild(celula);
          }
          return linha;
        }

        var removeLinha = function(linha)
        {
              storyboard.tabuleiroPreenchido.sort();

              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+0),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+1),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+2),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+3),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+4),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+5),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+6),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+7),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+8),1);
              storyboard.tabuleiroPreenchido.splice(storyboard.tabuleiroPreenchido.indexOf(linha+"-"+9),1);

              for (var i = 0; i < storyboard.tabuleiroPreenchido.length; i++) {
                  position = storyboard.tabuleiroPreenchido[i].split("-");
                  position = [parseInt(position[0]) , parseInt(position[1]) ];
                  if(position[0] < linha)
                  {
                      storyboard.tabuleiroPreenchido[i] = (position[0] + 1) +"-"+position[1];
                  }

              }
        }

        function criarInformacoes() {
          var info = document.getElementById("informacoes");
        }

        var encerraJogo = function()
        {
              if(storyboard.linhaZeroOcupada())
              {

                flagJogoEncerrado++;
              }
              else
              {
                flagJogoEncerrado = 0;
              }
              if(flagJogoEncerrado == 2){
                return true;
              }
              else
              {
                return false;
              }
        }
        var linhaZeroOcupada =  function(){
          for ( i = 0; i < 10; i++)
          {
             celula = document.getElementById("0-"+i);
             if(celula.classList.contains("verde"))
             {
                return true;
             }
          }
          return false;
        }

        var existeNoTabuleiro = function(position){
          return storyboard.tabuleiroPreenchido.indexOf(position) != -1;
        }

        var limparTabuleiro = function(){
            for (var i = 0; i < numLinhas; i++) {
              for (var j = 0; j < 10; j++) {
                position = i+"-"+j;
                celula = document.getElementById(position);
                celula.removeAttribute("class");
              }
            }
        }

        var pintarTabuleiro = function(){
          for (var i = 0; i < storyboard.tabuleiroPreenchido.length; i++) {
              position = storyboard.tabuleiroPreenchido[i];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.setAttribute("class","verde" );
          }
        }


        var linhaCheia = function()
        {

            for (var i = 0; i < numLinhas; i++)
            {
              cheia = true;
              for (var j = 0; j < 10; j++)
              {
                if(!storyboard.existeNoTabuleiro(i+"-"+j))
                {
                   cheia = false;
                }
              }
              if(cheia)
              {
                score+=100;
                storyboard.removeLinha(i);
                document.getElementById("informacoes").innerHTML = ""+score;


              }

            }
        }

        return {
          criaTabuleiro,
          criaTabuleiroProximaPeca,
          criaLinha,
          tabuleiroPreenchido,
          removeLinha,
          encerraJogo,
          linhaZeroOcupada,
          existeNoTabuleiro,
          limparTabuleiro,
          pintarTabuleiro,
          linhaCheia,
        };
    }

    var peca = function ()
    {
        var quadrado = ["0-4","0-5","1-4","1-5"];

        var linhaHorizontal = ["0-3","0-4","0-5","0-6"]; // linha horizontal
        var linhaVertical   = ["0-5","1-5","2-5","3-5"]; // linha horizontal
        var tParaCima       = ["0-3","0-4","0-5","1-4"];
        var tParaBaixo      = ["1-3","1-4","1-5","0-4"];
        var tParaDireita    = ["0-4","1-4","2-4","1-5"];
        var tParaEsquerda   = ["0-4","1-4","2-4","1-3"];

        var lParaCimaParaDireita  = ["0-4","1-4","2-4","2-5"];
        var lParaBaixoParaDireita  = ["0-4","1-4","2-4","0-5"];
        var lParaCimaParaEsquerda = ["0-4","1-4","2-4","2-3"];
        var lParaBaixoParaEsquerda = ["0-4","1-4","2-4","0-3"];


        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];
        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];
        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];
        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];
        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];
        // var linhaHorizontal = ["0-3","0-4","0-5","0-6"];


        var pecaAtual = [];
        var pecaSeguinte = [];
        var posicaoAnterion = [];

        /* closure */
        var novaPeca = function()
        {
          var numPeca  = Math.floor((Math.random() * 10));

          peca.pecaAtual = [];
          peca.pecaAtual = peca.pecaAtual.concat(peca.pecaSeguinte)

          switch (numPeca) {
            case 0:{
                  peca.pecaAtual = peca.pecaAtual.concat(linhaHorizontal);
              break;
            }
            case 1:{
                  peca.pecaAtual = peca.pecaAtual.concat(linhaVertical);
              break;
            }
            case 2:{
                  peca.pecaAtual = peca.pecaAtual.concat(tParaCima);
              break;
            }
            case 3:{
                  peca.pecaAtual = peca.pecaAtual.concat(tParaBaixo);
              break;
            }
            case 4:{
                  peca.pecaAtual = peca.pecaAtual.concat(tParaDireita);
              break;
            }
            case 5:{
                  peca.pecaAtual = peca.pecaAtual.concat(tParaEsquerda);
              break;
            }

            case 6:{
                  peca.pecaAtual = peca.pecaAtual.concat(lParaCimaParaDireita);
              break;
            }
            case 7:{
                  peca.pecaAtual = peca.pecaAtual.concat(lParaBaixoParaDireita);
              break;
            }
            case 8:{
                  peca.pecaAtual = peca.pecaAtual.concat(lParaCimaParaEsquerda);
              break;
            }
            case 9:{
                  peca.pecaAtual = peca.pecaAtual.concat(lParaBaixoParaEsquerda);
              break;
            }

            default:{
                  peca.pecaAtual = peca.pecaAtual.concat(quadrado);
            }
          }

          for (var j = 0; j < peca.pecaAtual.length; j++)
          {
              position = peca.pecaAtual[j];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.setAttribute("class","verde" );
          }
        }
        /* closure */
        var movePeca = function (){
          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.pecaAtual[i].split("-"); // quebra a posicao em linha e coluna
              position = (parseInt(position[0]) + 1)+"-"+position[1];
              peca.pecaAtual[i] = position;
          }

        }

        var pintaPeca = function(){
          for (var j = 0; j < peca.pecaAtual.length; j++)
          {
              position = peca.pecaAtual[j];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.setAttribute("class","verde" );
          }
        }

          /*closure*/
        var movePecaParaBaixo = function()
        {
          for (var j = 0; j < peca.pecaAtual.length; j++)
          {
              position = peca.pecaAtual[j];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.removeAttribute("class");
          }

          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.pecaAtual[i].split("-"); // quebra a posicao em linha e coluna
              position = (parseInt(position[0]))+"-"+(parseInt(position[1]) );
              peca.pecaAtual[i] = position;
          }

        }


        /* closure */
        var movePecaParaDireita = function()
        {
          for (var j = 0; j < peca.pecaAtual.length; j++)
          {
              position = peca.pecaAtual[j];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.removeAttribute("class");
          }

          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.pecaAtual[i].split("-"); // quebra a posicao em linha e coluna
              position = (parseInt(position[0]))+"-"+(parseInt(position[1]) + 1);
              peca.pecaAtual[i] = position;
          }

        }
        /* closure */
        var movePecaParaEsquerda= function()
        {
          for (var j = 0; j < peca.pecaAtual.length; j++)
          {
              position = peca.pecaAtual[j];
              celula = document.getElementById(position); // faz descer uma linha cada posição
              celula.removeAttribute("class");
          }

          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.pecaAtual[i].split("-"); // quebra a posicao em linha e coluna
              position = (parseInt(position[0]))+"-"+(parseInt(position[1]) - 1);
              peca.pecaAtual[i] = position;
          }
        }
        /* closure */
        var isMovePecaParaBaixo = function()
        {
          if(peca.pecaAtual == undefined)
          {
              return false;
          }
          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.getCoordenadaPosicaoX(i) // quebra a posicao em linha e coluna
              if(position[0] + 1 >= numLinhas )
              {
                storyboard.tabuleiroPreenchido.sort();
                storyboard.tabuleiroPreenchido = storyboard.tabuleiroPreenchido.concat(peca.pecaAtual);
                return false;
              }
          }
          /* closure */
          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.getCoordenadaPosicaoX(i)// quebra a posicao em linha e coluna
              position = (parseInt(position[0]) + 1)+"-"+position[1];
              if(storyboard.tabuleiroPreenchido.indexOf(position) != -1){
                storyboard.tabuleiroPreenchido.sort();
                storyboard.tabuleiroPreenchido = storyboard.tabuleiroPreenchido.concat(peca.pecaAtual);
                return false;
              }
          }

          return true;
        }

        /* closure */
        var isMovePecaParaEsquerda = function()
        {
          if(peca.pecaAtual == undefined)
          {
              return false;
          }
          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.getCoordenadaPosicaoX(i);
              if( (position[1] - 1 < 0 ) || (storyboard.existeNoTabuleiro(position[0]+"-"+(position[1] - 1))))
              {
                  return false;
              }
          }
          return true;
        }

        /* closure */
        var isMovePecaParaDireita = function()
        {

          if(peca.pecaAtual == undefined)
          {
              return false;
          }
          for (var i = 0; i < peca.pecaAtual.length; i++)
          {
              position = peca.getCoordenadaPosicaoX(i);
              if( (position[1] + 1 > 9 ) || (storyboard.existeNoTabuleiro(position[0]+"-"+(position[1] + 1))))
              {
                  return false;
              }
          }
          return true;
        }

        var getCoordenadaPosicaoX = function(x)
        {
            position = peca.pecaAtual[x].split("-");
            return  [parseInt(position[0]) , parseInt(position[1]) ]// quebra a posicao em linha e coluna
        }

        return {
          quadrado,
          linhaHorizontal,
          linhaVertical,
          tParaCima,
          tParaBaixo,
          tParaDireita,
          tParaEsquerda,
          lParaCimaParaDireita,
          lParaBaixoParaDireita,
          lParaCimaParaEsquerda,
          lParaBaixoParaEsquerda,
          novaPeca,
          movePeca,
          pintaPeca,
          movePecaParaDireita,
          movePecaParaEsquerda,
          isMovePecaParaBaixo,
          isMovePecaParaEsquerda,
          isMovePecaParaDireita,
          getCoordenadaPosicaoX,
          pecaSeguinte,
        };
    }
    init();
})();
