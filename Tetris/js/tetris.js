(function () { // #TO-DO: Colocar uma action no botao e iniciar o jogo a partir dele

    var proximaPeca, tabuleiro, peca, proximaPecaTable, informacoes, fps = 10, gameLoop; 
    var linha = 0, coluna = 4, celula;

    addEventListener("keydown", function(e) {
    	var prox_celula;
        if (e.key == "ArrowRight") { //Move a peça para a direita, se permitido.
            if(coluna != 9){ //Verifica se atingiu o limite horizontal esquerdo.
                prox_celula = document.getElementById("celula "+linha+" "+(coluna+1)); 
            	if(prox_celula.style.backgroundColor == ""){ //Verifica se existe uma peça à direita da atual. Se não existir, move a peça.
            		celula.style.backgroundColor = "";
                	coluna++;
                	celula = document.getElementById("celula "+linha+" "+coluna);
        			celula.style.backgroundColor = "green";
            	}
            }
        } else if (e.key == "ArrowLeft") { //Move a peça para a esquerda, se permitido.
            if(coluna != 0){ //Verifica se atingiu o limite horizontal direito.
                prox_celula = document.getElementById("celula "+linha+" "+(coluna-1)); 
            	if(prox_celula.style.backgroundColor == ""){ //Verifica se existe uma peça à esquerda da atual. Se não existir, move a peça.
            		celula.style.backgroundColor = "";
                	coluna--;
                	celula = document.getElementById("celula "+linha+" "+coluna);
        			celula.style.backgroundColor = "green";
            	}
            }
        } else if (e.key == "ArrowDown") {
            run();
        }
    });

    function init () {
        tabuleiro = document.querySelector("#tabuleiro");
        informacoes = document.querySelector("#informacoes");
        proximaPeca = document.querySelector("#proxima-peca");
        createTabuleiro(); //Cria o tabuleiro, que é uma tabela por onde as peças se movimentarão.
        createPeca(); //Cria a peça.
        createProximaPecaTable(); //Cria a tabela onde será exibida a próxima peça.
        var botao = document.createElement("button");
        var botaoTextNode = document.createTextNode("Clique aqui para iniciar")
        botao.appendChild(botaoTextNode);
        proximaPeca.appendChild(botao);
        console.log(botao);
        gameLoop = setInterval(run, 5500/fps);
    }

    function run () {
        var prox_celula;

        if(linha != 19){ //Descolore a celula anterior e colore a próxima celula caso a peça não esteja no final da tabela ou não encontre 
        				 //outra peça em sua próxima posição.
            prox_celula = document.getElementById("celula "+(linha+1)+" "+coluna);
            if(prox_celula.style.backgroundColor == "")
                celula.style.backgroundColor = "";
        }

        linha++;
        prox_celula = document.getElementById("celula "+linha+" "+coluna);
        if(linha == 20 || prox_celula.style.backgroundColor != ""){ //Reseta a posição da peça caso a peça chegue no final da tabela ou
            linha = 0;                                              //caso a próxima posição da peça esteja ocupada.
            coluna = 4; 
        }
        celula = document.getElementById("celula "+linha+" "+coluna);
        celula.style.backgroundColor = "green";

      //  if (posicao >= 650) clearInterval(gameLoop);       // **ISTO AQUI SIGNFICA QUANDO A TABELA FICA CHEIA DE PEÇAS E O JOGO DÁ GAMEOVER
        
    }

    function createPeca () {
        celula = document.getElementById("celula 0 4");
        //peca = document.createElement("div");
        celula.style.backgroundColor="green";
        //tabuleiro.appendChild(peca);
    }

    function createTabuleiro(){
        var i, j, tr, td, tabela = document.createElement("table");

        for(i = 0; i<20; i++){
            tr = document.createElement("tr");

            for(j = 0; j<10; j++){
                td = document.createElement("td");
                td.id = "celula "+i+" "+j;
                tr.appendChild(td);
            }
            tabela.appendChild(tr);
        }
        
        tabuleiro.appendChild(tabela)
    }

    function createProximaPecaTable(){
        var i, j, tr, td;
        proximaPecaTable = document.createElement("table")
        proximaPecaTable.id = "proximaPecaTable";
        for(i = 0; i<4; i++){
            tr = document.createElement("tr");

            for(j = 0; j<4; j++){
                td = document.createElement("td");
                td.id = "proximaPecaTable "+i+" "+j;
                tr.appendChild(td);
            }
            proximaPecaTable.appendChild(tr);
        }

        proximaPeca.appendChild(proximaPecaTable)
        
    }

    function geraPeca(){
        var i, j, random = Math.floor(Math.random() * 7);

        for(i = 0; i<4; i++)
            for(j = 0; j<4; j++){
                td = document.getElementById("proximaPecaTable "+i+" "+j);
                td.style.backgroundColor = "";
            }

        switch(random){
            case 0:
                td = document.getElementById("proximaPecaTable 1 0");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 1");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 2");
                td.style.backgroundColor = "cyan";
                td = document.getElementById("proximaPecaTable 1 3");
                td.style.backgroundColor = "cyan";
                break;
            case 1:
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
// style="background-color: red; border: 1px solid #000 margin: 0px"
    init();
})();