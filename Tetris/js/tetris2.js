(function() {

    var proximaPeca, tabuleiro, peca, proximaPecaTable, informacoes, fps = 10,
        gameLoop;
    var linha = 0,
        coluna = 4,
        celula, celula2,celula3,celula3,celulaaux;

    addEventListener("keydown", function(e) {
        var prox_celula;
        if (e.key == "ArrowRight") {
            if (coluna != 9) {
                prox_celula = document.getElementById("celula " + linha + " " + (coluna + 1));
                if (prox_celula.style.backgroundColor == "") { //Verifica se existe uma peça à direita da atual. Se não existir, move a peça.
                    celula.style.backgroundColor = "";
                    coluna++;
                    celula = document.getElementById("celula " + linha + " " + coluna);
                    celula.style.backgroundColor = "green";
                }
            }
        } else if (e.key == "ArrowLeft") { //Move a peça para a esquerda, se permitido.
            if (coluna != 0) { //Verifica se atingiu o limite horizontal direito.
                prox_celula = document.getElementById("celula " + linha + " " + (coluna - 1));
                if (prox_celula.style.backgroundColor == "") { //Verifica se existe uma peça à esquerda da atual. Se não existir, move a peça.
                    celula.style.backgroundColor = "";
                    coluna--;
                    celula = document.getElementById("celula " + linha + " " + coluna);
                    celula.style.backgroundColor = "green";
                }
            }
        } else if (e.key == "ArrowDown") {
            run();
        }
    });

    function init() {
        tabuleiro = document.querySelector("#tabuleiro");
        informacoes = document.querySelector("#informacoes");
        proximaPeca = document.querySelector("#proxima-peca");
        createTabuleiro(); //Cria o tabuleiro, que é uma tabela por onde as peças se movimentarão.
        createPeca();
        createProximaPecaTable(); //Cria a tabela onde será exibida a próxima peça.
        var botao = document.createElement("button");
        var botaoTextNode = document.createTextNode("GG")
        botao.appendChild(botaoTextNode);
        proximaPeca.appendChild(botao);
        console.log(botao);
        gameLoop = setInterval(run, 3000/ fps);

    }



    function run() {
        var prox_celula, celulaaux;



        if (linha != 19) { //Descolore a celula anterior e colore a próxima celula caso a peça não esteja no final da tabela ou não encontre
            //outra peça em sua próxima posição.
            prox_celula = document.getElementById("celula " + (linha + 1) + " " + coluna);
            if (prox_celula.style.backgroundColor == "")
                celula.style.backgroundColor = "";
        }

        linha++;
        prox_celula = document.getElementById("celula " + linha + " " + coluna);
        if (linha == 20 || prox_celula.style.backgroundColor != "") { //Reseta a posição da peça caso a peça chegue no final da tabela ou
            linha = 0; //caso a próxima posição da peça esteja ocupada.
            coluna = 4;
            geraPeca();
        }
        celula = document.getElementById("celula " + linha + " " + coluna);
        celula.style.backgroundColor = "green";

        if(celula.style.backgroundColor == "blue"){
        //  celula = document.getElementById("celula " + (linha) + " " + (coluna));
            celula.style.backgroundColor = "blue";
        }

        if (linha == 19) {

        prox_celula = document.getElementById("celula " + (linha + 1) + " " + coluna);
              celula.style.backgroundColor = "blue";

        }



      Verificaparaapagar();




    }

    function Verificaparaapagar(celulaaux){
      var cont = 0;
      for (var i = -1; i < 9; i++) {
        celulaaux = document.getElementById("celula 19 "+ i);
        if(celulaaux.style.backgroundColor == "blue"){
           cont ++;
         }
        if (cont = 9) {

          for (var i = -1; i < 9; i++) {
            celulaaux = document.getElementById("celula 19 "+ i);

            celulaaux.style.backgroundColor = "";
          }

        }
      }

    }

    function apaga(){

      if (celula.style.backgroundColor = "blue") {

    //prox_celula = document.getElementById("celula " + (linha + 1) + " " + coluna);
            celula.style.backgroundColor = "";
           //  clearInterval(gameLoop);}
         }

    }

    function createPeca() {

        celula = document.getElementById("celula 0 4");
        celula.style.backgroundColor = "green";
        var i, j, tr, td;
        proximaPecaTable = document.createElement("table")
        proximaPecaTable.id = "proximaPecaTable";
        for (i = 0; i < 4; i++) {
            tr = document.createElement("tr");

            for (j = 0; j < 4; j++) {
                td = document.createElement("td");
                td.id = "proximaPecaTable " + i + " " + j;
                tr.appendChild(td);

            }
            proximaPecaTable.appendChild(tr);

        }

        proximaPeca.appendChild(proximaPecaTable);
        geraPeca();
    }

    function createTabuleiro() {
        var i, j, tr, td, tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela");

        for (i = 0; i < 20; i++) {
            tr = document.createElement("tr");

            for (j = 0; j < 10; j++) {
                td = document.createElement("td");
                td.id = "celula " + i + " " + j;
                tr.appendChild(td);
            }
            tabela.appendChild(tr);
        }

        tabuleiro.appendChild(tabela)
    }

    function createProximaPecaTable() {
        var i, j, tr, td;
        proximaPecaTable = document.createElement("table")
        proximaPecaTable.id = "proximaPecaTable";
        for (i = 0; i < 4; i++) {
            tr = document.createElement("tr");

            for (j = 0; j < 4; j++) {
                td = document.createElement("td");
                td.id = "proximaPecaTable " + i + " " + j;
                tr.appendChild(td);

            }
            proximaPecaTable.appendChild(tr);

        }

        proximaPeca.appendChild(proximaPecaTable);
        geraPeca();

    }

    function geraPeca() {
      console.log("No geraPeca");


        var i, j, random = Math.floor(Math.random() * 7);


        for (i = 0; i < 4; i++)
            for (j = 0; j < 4; j++) {
                td = document.getElementById("proximaPecaTable " + i + " " + j);
                td.style.backgroundColor = "";
            }

        switch (random) {
            case 0:
            console.log("CASE 0");
            //document.querySelector("#tabela tr:nth-child("+ linha +") td:nth-child(4)");
            //   td = document.querySelector("#tabela tr:nth-child(2) td:nth-child(0)");
                td =   document.querySelector("#tabela tr:nth-child(1) td:nth-child(1)");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 3");
                td.style.backgroundColor = "cyan";
                celula

                break;
            case 1:
            console.log("CASE 1");
                td = document.getElementById("proximaPecaTable 1 0");
                td.style.backgroundColor = "blue";
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "blue";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "blue";
                td = document.getElementById("proximaPecaTable 2 2");
                td.style.backgroundColor = "blue";
                break;
            case 2:
            console.log("CASE 2");
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "orange";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "orange";
                td = document.getElementById("proximaPecaTable 1 3");
                td.style.backgroundColor = "orange";
                td = document.getElementById("proximaPecaTable 2 1");
                td.style.backgroundColor = "orange";
                break;
            case 3:
            console.log("CASE 3");
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "yellow";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "yellow";
                td = document.getElementById("proximaPecaTable 2 1");
                td.style.backgroundColor = "yellow";
                td = document.getElementById("proximaPecaTable 2 2");
                td.style.backgroundColor = "yellow";
                break;
            case 4:
            console.log("CASE 4");
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "green";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "green";
                td = document.getElementById("proximaPecaTable 2 0");
                td.style.backgroundColor = "green";
                td = document.getElementById("proximaPecaTable 2 1");
                td.style.backgroundColor = "green";
                break;
            case 5:
            console.log("CASE 5");
                td = document.getElementById("proximaPecaTable 1 0");
                td.style.backgroundColor = "purple";
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "purple";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "purple";
                td = document.getElementById("proximaPecaTable 2 1");
                td.style.backgroundColor = "purple";
                break;
            case 6:
            console.log("CASE 6");
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "red";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "red";
                td = document.getElementById("proximaPecaTable 2 2");
                td.style.backgroundColor = "red";
                td = document.getElementById("proximaPecaTable 2 3");
                td.style.backgroundColor = "red";
                break;
        }
    }
    init();
})();
