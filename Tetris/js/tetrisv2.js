
(function () {

    var tabuleiro;
    var peca;
    var fps = 10;
    var gameLoop;

    addEventListener("keydown", function(e) {
        if (e.key == "ArrowRight") {
            if(!(parseInt(peca.style.left) >= 308))
                peca.style.left = (parseInt(peca.style.left) + 34) + "px";
        } else if (e.key == "ArrowLeft") {
            if(!(parseInt(peca.style.left) <= 18))
                peca.style.left = (parseInt(peca.style.left) - 34) + "px";
        }
    });

    function init () {
        createTabuleiro();
        createPeca();
        gameLoop = setInterval(run, 1500/fps);
    }

    function run () {
        var posicao = parseInt(peca.style.top);
        posicao = posicao + 17;
        if (posicao >= 650) {
            clearInterval(gameLoop);
        }
        peca.style.top = posicao + "px";
    }

    function createPeca () {
        tabuleiro = document.querySelector("#tabuleiro");
        peca = document.createElement("div");
        peca.style.top = "12px";
        peca.style.left = "148px";
        tabuleiro.appendChild(peca);
    }

    function createTabuleiro(){
        tabuleiro = document.querySelector("#tabuleiro");
        var tabela = document.createElement("table");
        tabela.cellPadding = "15px";
        var i, j;
        var tr, td, texto;

        for(i = 0; i<20; i++){
            tr = document.createElement("tr");

            for(j = 0; j<10; j++){
                td = document.createElement("td");
                td.id = "celula "+i+" "+j;
                texto = document.createTextNode(" ");
                td.appendChild(texto);
                tr.appendChild(td);
            }
            tabela.appendChild(tr);
        }

        tabuleiro.appendChild(tabela)
        tabela.setAttribute("border","1");

    }

    init();
})();