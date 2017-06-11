(function() {
    var gameLoop;

    function criarTabela() {
        var tabuleiro = document.getElementById("tabuleiro");
        var tabela = tabuleiro.appendChild(document.createElement("table"));
        tabela.setAttribute("id", "tabela");
        for (var i = 0; i < 18; i++) {
            var row = tabela.appendChild(document.createElement("tr"));
            for (var j = 0; j < 10; j++) {
                var td = document.createElement("td");
                row.appendChild(td);
                td.style.backgroundColor = "white";
            }
        }
    }

    function criarTabelaProximaPeca() {
        var next = document.getElementById("proxima-peca");
        var smallTable = next.appendChild(document.createElement("table"));
        smallTable.setAttribute("id", "proxima");
        for (var i = 0; i < 4; i++) {
            var row = smallTable.appendChild(document.createElement("tr"));
            for (var j = 0; j < 4; j++) {
                var td = document.createElement("td");
                row.appendChild(td);
            }
        }
    }

    function criarInformacoes() {
        var info = document.getElementById("informacoes");
        var playButton = info.appendChild(document.createElement("input"));
        playButton.setAttribute("type", "button");
        playButton.setAttribute("value", "Jogar");
    }

    function init() {
        var fps = 5;
        criarTabela();
        criarTabelaProximaPeca();
        criarInformacoes();
        geraProximaPeca();
        console.log("Na init!!");
        gameLoop = setInterval(run, 1000 / fps);
    }

    function geraColunaAleatoria() {
        var _numero = Math.floor((Math.random() * 8) + 2);

        return _numero;
    }

    function geraPecas(proxima) { //Gera as peças no tabuleiro - The place where the pieces rise -- retorna um OBJETO

        if (proxima == "i") {
            var i = {
                bloco: ["2345", "N"],
                color: 'cyan'
            };
            return i;
        }
        if (proxima == "j") {
            var j = {
                bloco: ["2344", "E"],
                color: 'blue'
            };
            return j;
        }
        if (proxima == "l") {
            var l = {
                bloco: ["2344", "D"],
                color: 'orange'
            };
            return l;
        }
        if (proxima == "o") {
            var o = {
                bloco: ["2323", "N"],
                color: 'yellow'
            };
            return o;
        }
        if (proxima == "s") {
            var s = {
                bloco: ["2233", "DE"],
                color: 'purple'
            };
            return s;
        }
        if (proxima == "t") {
            var t = {
                bloco: ["2223", "M"],
                color: 'green'
            };
            return t;
        }
        // if (proxima == "z"){
        //   var z = { bloco: ["2233", "ED" ], color: 'red'    };
        //   return z;
        // }
    }

    /* Para capturar os movimentos do jogador  */
    addEventListener("keydown", function(e) {
        if (e.key == "ArrowRight") {
            console.log("RIGHT -> ");
            var col = parseInt(coluna) + 1;
            vet = [];
            formaPeca(atual, vet, somador, col)



        } else if (e.key == "ArrowLeft") {
          console.log("left -> ");

          var col = parseInt(coluna) -1;
          vet = [];
          formaPeca(atual, vet, somador, col)
        }
    });

    function geraProximaPeca(proxima) {
        var peca;
        switch (proxima) {
            case 'i':
                peca = document.querySelector("#proxima tr:nth-child(1) td:nth-child(2)");
                peca.style.backgroundColor = "cyan";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(2)");
                peca.style.backgroundColor = "cyan";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(2)");
                peca.style.backgroundColor = "cyan";
                peca = document.querySelector("#proxima tr:nth-child(4) td:nth-child(2)");
                peca.style.backgroundColor = "cyan";
                break;
            case 'j':
                peca = document.querySelector("#proxima tr:nth-child(1) td:nth-child(3)");
                peca.style.backgroundColor = "blue";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(3)");
                peca.style.backgroundColor = "blue";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(3)");
                peca.style.backgroundColor = "blue";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(2)");
                peca.style.backgroundColor = "blue";
                break;
            case 'l':
                peca = document.querySelector("#proxima tr:nth-child(1) td:nth-child(2)");
                peca.style.backgroundColor = "orange";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(2)");
                peca.style.backgroundColor = "orange";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(2)");
                peca.style.backgroundColor = "orange";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(3)");
                peca.style.backgroundColor = "orange";
                break;
            case 'o':
                peca = document.querySelector("#proxima tr:nth-child(1) td:nth-child(2)");
                peca.style.backgroundColor = "yellow";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(2)");
                peca.style.backgroundColor = "yellow";
                peca = document.querySelector("#proxima tr:nth-child(1) td:nth-child(3)");
                peca.style.backgroundColor = "yellow";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(3)");
                peca.style.backgroundColor = "yellow";
                break;
            case 's':
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(2)");
                peca.style.backgroundColor = "green";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(3)");
                peca.style.backgroundColor = "green";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(1)");
                peca.style.backgroundColor = "green";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(2)");
                peca.style.backgroundColor = "green";
                break;
            case 't':
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(1)");
                peca.style.backgroundColor = "purple";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(2)");
                peca.style.backgroundColor = "purple";
                peca = document.querySelector("#proxima tr:nth-child(2) td:nth-child(3)");
                peca.style.backgroundColor = "purple";
                peca = document.querySelector("#proxima tr:nth-child(3) td:nth-child(2)");
                peca.style.backgroundColor = "purple";
                break;
            default:
        }
        console.log("Proxima: " + proxima);
        return proxima;
    }

    function limpaTabela(linha, coluna) {
        var tabela = document.querySelector("#tabela");
        linha--;
        for (var c = 0; c < 18; c++) { //coluna
            for (var l = 0; l < 10; l++) { // percorre linha
                if (!(l == linha && c == coluna)) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + coluna + ")");
                    peca.style.backgroundColor = "white";
                }
            }
        }
    }


    function geraLetraAleatoria() {
        var pecas = ["i", "j", "l", "o", "s", "t", "z"]; // peças
        var random = Math.floor((Math.random() * 6) + 0); //random da posicao das peças
        var letra = pecas[random];
        return letra;
    }
    var cont = 0;
    var atual = geraLetraAleatoria();
    var prox = geraLetraAleatoria();
    var coluna = String(geraColunaAleatoria());

    var somador = 0;

    /* Funcao para fazer as pecas cairem */

    function formaPeca(atual, vetBlocos, somador, coluna) { // Forma uma peça
        console.log("ENTRA FORMA ");
        var qtdPecas = 0;
        var blocoIdx = 0;
        for (var i = 0; i < 4; i++) {
            var letra = geraPecas(atual);
            var linha = parseInt(letra.bloco[0].charAt(i)) + somador; //somador - incrementador das posições
            console.log("Linha: " + linha);
            if (letra.color == 'cyan') {
                console.log('bloco I');
                qtdPecas = 1;
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + coluna + ")");
                peca.style.backgroundColor = "cyan";
                var pos = {
                    lin: linha,
                    col: parseInt(coluna)
                };
                vetBlocos.push(pos);
                ultimaPos = linha;
            }
            if (letra.color == 'blue') {

                qtdPecas = 2;
                if (i == 3) { // bloco em uma posicao diferente que deve ter pintado
                    console.log('J');
                    var colunaEsp = parseInt(coluna) - 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 0) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(coluna)
                    };
                    vetBlocos.push(pos);
                }
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                peca.style.backgroundColor = letra.color;

                ultimaPos = linha;
            }
            if (letra.color == 'orange') {
                console.log('L');
                qtdPecas = 2;
                if (i == 3) { // bloco em uma posicao diferente que deve ter pintado
                    console.log('l');
                    var colunaEsp = parseInt(coluna) + 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 0) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(coluna)
                    };
                    vetBlocos.push(pos);
                }
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                peca.style.backgroundColor = letra.color;
                ultimaPos = linha;
            }
            if (letra.color == 'yellow') {
                console.log('O');
                qtdPecas = 2;
                if (i == 3) { // bloco em uma posicao diferente que deve ter pintado
                    console.log('l');
                    var colunaEsp = parseInt(coluna) - 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 2) { // bloco em uma posicao diferente que deve ter pintado
                    console.log('l');
                    var colunaEsp = parseInt(coluna) - 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 0) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(coluna)
                    };
                    vetBlocos.push(pos);
                }
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                peca.style.backgroundColor = letra.color;
                ultimaPos = linha;
            }
            if (letra.color == 'purple') {
                console.log('t');
                qtdPecas = 4;
                if (i == 1) { // bloco em uma posicao diferente que deve ter pintado
                    var colunaEsp = parseInt(coluna) - 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 2) {
                    var colunaEsp = parseInt(coluna) + 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 0) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(coluna)
                    };
                    vetBlocos.push(pos);
                }
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                peca.style.backgroundColor = letra.color;
                vetBlocos[blocoIdx] = pos;
                ultimaPos = linha;
            }
            if (letra.color == 'green') {
                console.log('t');
                qtdPecas = 4;
                if (i == 3) { // bloco em uma posicao diferente que deve ter pintado

                    var colunaEsp = parseInt(coluna) - 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 2) { // bloco em uma posicao diferente que deve ter pintado
                    console.log('l');
                    var colunaEsp = parseInt(coluna) + 1;
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(colunaEsp) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(colunaEsp)
                    };
                    vetBlocos.push(pos);
                } else if (i == 0) {
                    var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                    peca.style.backgroundColor = letra.color;
                    var pos = {
                        lin: linha,
                        col: parseInt(coluna)
                    };
                    vetBlocos.push(pos);
                }
                var peca = document.querySelector("#tabela tr:nth-child(" + linha + ") td:nth-child(" + String(coluna) + ")");
                peca.style.backgroundColor = letra.color;
                ultimaPos = linha;
            }
            blocoIdx++;
        }
        for (var i = 0; i < qtdPecas; i++) {
            console.log("Linha: " + vetBlocos[i].lin + "Col: " + vetBlocos[i].col);
            limpaTabela(vetBlocos[i].lin, vetBlocos[i].col);
        }
        console.log("SAI FORMA");
        return ultimaPos; //

    }
    // function verificaFim(){
    //
    //   for (var c = 0; c < 18; c++) { //coluna
    //     for (var l = 0; l < 10; l++) { // percorre linha
    //         var peca = document.querySelector("#tabela tr:nth-child("+ String(l) +") td:nth-child("+String(c)+")");
    //       if (l==2){
    //         if (peca.style.backgroundColor != "white"){
    //
    //         return 0;
    //         }
    //       }
    //     }
    //   }
    // }
    /* Closure */
    var run = function run() {
        geraProximaPeca(prox);
        console.log("RUN");
        var vetBlocos = [];
        var indice = formaPeca(atual, vetBlocos, somador++, coluna);
        if (indice == 18) {
            somador = 0;
        }
        console.log("CHAMOU A FORMA PECA");
        var verifica = function verificaFim() {
            for (var c = 1; c < 18; c++) { //coluna
                for (var l = 1; l < 10; l++) { // percorre linha
                    var peca = document.querySelector("#tabela tr:nth-child(" + String(l) + ") td:nth-child(" + String(c) + ")");
                    var cor = peca.style.backgroundColor;
                    //    var cor =  peca.getPropertyValue("backgroundColor");
                    //  if (l==2){
                    if (cor != "white") {
                        return 0;
                    }
                    //  }
                }
            }
            return 1;
        };
        //  verifica();
        console.log(verifica);
        if (verifica == 0) {
            clearInterval(gameLoop);
        }
        console.log("CHAMOU A LIMPA TABELA");
        console.log("NO FIM DA RUN cont" + cont);
        return indice;
    };

    init();
})();
