Configuracao = {
    tamanho: {
        'width': 10,
        'height': 20
    },
    niveis: {
        0: {
            'intervalo': 620,
            'limite': 25
        },
        1: {
            'intervalo': 725,
            'limite': 50
        },
        2: {
            'intervalo': 700,
            'limite': 75
        },
        3: {
            'intervalo': 675,
            'limite': 100
        },
        4: {
            'intervalo': 650,
            'limite': 125
        },
        5: {
            'intervalo': 625,
            'limite': 150
        },
        6: {
            'intervalo': 600,
            'limite': 175
        },
        7: {
            'intervalo': 580,
            'limite': 200
        },
        8: {
            'intervalo': 560,
            'limite': 225
        },
        9: {
            'intervalo': 540,
            'limite': 250
        },
        10: {
            'intervalo': 520,
            'limite': 275
        },
        11: {
            'intervalo': 500,
            'limite': 300
        },
        12: {
            'intervalo': 480,
            'limite': 325
        },
        13: {
            'intervalo': 460,
            'limite': 350
        },
        14: {
            'intervalo': 440,
            'limite': 375
        },
        15: {
            'intervalo': 420,
            'limite': 400
        },
        16: {
            'intervalo': 400,
            'limite': 425
        },
        17: {
            'intervalo': 380,
            'limite': 450
        },
        18: {
            'intervalo': 360,
            'limite': 475
        },
        19: {
            'intervalo': 340,
            'limite': 500
        },
        20: {
            'intervalo': 320,
            'limite': 525
        },
        21: {
            'intervalo': 300,
            'limite': 550
        },
        22: {
            'intervalo': 285,
            'limite': 575
        },
        23: {
            'intervalo': 270,
            'limite': 600
        },
        24: {
            'intervalo': 255,
            'limite': 625
        },
        25: {
            'intervalo': 240,
            'limite': 650
        },
        26: {
            'intervalo': 225,
            'limite': 675
        },
        27: {
            'intervalo': 210,
            'limite': 700
        },
        28: {
            'intervalo': 195,
            'limite': 725
        },
        29: {
            'intervalo': 180,
            'limite': 750
        },
        30: {
            'intervalo': 165,
            'limite': 775
        },
        31: {
            'intervalo': 155,
            'limite': 825
        },
        32: {
            'intervalo': 145,
            'limite': 880
        },
        33: {
            'intervalo': 140,
            'limite': 950
        },
        34: {
            'intervalo': 135,
            'limite': 1050
        },
        35: {
            'intervalo': 130,
            'limite': 1150
        },
        36: {
            'intervalo': 125,
            'limite': 1250
        },
        37: {
            'intervalo': 120,
            'limite': 1350
        },
        38: {
            'intervalo': 115,
            'limite': 1500
        },
        39: {
            'intervalo': 110,
            'limite': 2000
        },
        40: {
            'intervalo': 100,
            'limite': 5000
        }
    }
}



;
(function() {

    'use strict';

    function Grid(gridDiv) {

        this.gridDiv = document.getElementById(gridDiv);

        this.InicializaPecas();

        this.previewdeDiv = document.getElementById('proxima-peca');

        this.inicializaPreviewdePecas();

        this.timer = new window.Timer(this);

        this.keyListener = new window.KeyListener(this);

        this.iniciaJogo();

    }

    Grid.prototype = {
        tamanho: Configuracao.tamanho,
        gridDiv: {},
        pecas: [],
        nivel: 0,
        niveis: Configuracao.niveis,
        tetraminos: [],
        previewdePecas: [],
        previewdeDiv: {},
        pontos: 0,
        InicializaPecas: function() {

            for (var y = 0; y < this.tamanho.height; y++) {
                this.pecas[y] = [];

                for (var x = 0; x < this.tamanho.width; x++) {
                    this.pecas[y][x] = new window.Pecas(x, y);

                    this.pecas[y][x].fazPecaHtml()
                    this.pecas[y][x].acrescentaPecas(this.gridDiv);
                }
            }

        },

        inicializaPreviewdePecas: function() {

            for (var y = 0; y < 5; y++) {

                this.previewdePecas[y] = [];

                for (var x = 0; x < 5; x++) {

                    this.previewdePecas[y][x] = new window.Pecas(x, y);

                    this.previewdePecas[y][x].fazPecaHtml()
                    this.previewdePecas[y][x].acrescentaPecas(this.previewdeDiv);

                }

            }

        },

        iniciaJogo: function() {

            this.adicionatetraminoNoJogo();

            this.adicionatetraminoNoJogo();

            this.tetraminos[0].mostraPreviewdetetramino(this.previewdePecas);

            this.tetraminos[1].mostratetramino(this.pecas);

            this.timer.iniciaTempo();

        },

        adicionatetraminoNoJogo: function() {

            this.tetraminos.unshift(new tetramino());

        },

        outputPontos: function() {

            document.getElementById("informacoes").innerHTML = this.pontos;

        },

        outputnivel: function() {

            document.getElementById("js-nivel").innerHTML = this.nivel;

        },

        encontraLinhasCheias: function(posicaoDoTetramino) {

            var linhasParaChecar = {};
            for (var index in posicaoDoTetramino) {

                linhasParaChecar[posicaoDoTetramino[index].y] = 1;

            }

            var removeLinhas = {};
            for (var row in linhasParaChecar) {

                var ContaPeca = 0;

                for (var x = 0; x < this.tamanho.width; x++) {

                    ContaPeca += this.pecas[row][x].estado;

                }

                if (ContaPeca === this.tamanho.width) {

                    removeLinhas[row] = 1;

                }

            }

            var pontos = Object.keys(removeLinhas).length * Object.keys(removeLinhas).length;
            this.pontos += pontos;
            this.outputPontos();
            for (var removeLinha in removeLinhas) {

                for (var x = 0; x < this.tamanho.width; x++) {

                    this.pecas[removeLinha][x].desmarcarPecas();

                    for (var y = removeLinha; y >= 0; y--) {

                        if ((y - 1) >= 0) {

                            if (1 == this.pecas[y - 1][x].estado) {

                                this.pecas[y][x].marcarPecas(this.pecas[y - 1][x].cor);

                            } else {

                                this.pecas[y][x].desmarcarPecas();

                            }

                        }


                    }

                }

            }

        }

    };

    window.Grid = Grid;

}());



;
(function() {

    'use strict';

    function tetramino() {

        this.posicaoAtual = {};

        this.escolherForma();

        this.escolherCor();

        this.MovimentosPossiveis = {
            'naofunciona': true,
            'funciona': true,
            'baixo': true,
            'girar': true
        };

        this.parado = false;

        this.devOutput();

    }

    tetramino.prototype = {

        MovimentosPossiveis: {
            'naofunciona': true,
            'funciona': true,
            'baixo': true,
            'girar': true
        },
        colour: '',

        colours: {
            0: 'azul',
            1: 'verde',
            2: 'amarelo',
            3: 'vermelho',
            4: 'gandalf',
            5: 'preto',
            6: 'roxo',
            7: 'laranja',
            8: 'turquesa'
        },

        posicaoAtual: {},

        orientacaoAtual: 0,
        proximaPosicao: {},
        proximaOrientacao: 0,
        formato: {},

        formatos: {
            0: {
                0: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 2
                    },
                    3: {
                        x: 5,
                        y: 3
                    }
                },
                1: {
                    0: {
                        x: 3,
                        y: 1
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 1
                    }
                }
            },
            1: {
                0: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 4,
                        y: 2
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                },
                1: {
                    0: {
                        x: 4,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 1
                    }
                },
                2: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 6,
                        y: 0
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                },
                3: {
                    0: {
                        x: 4,
                        y: 1
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 6,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 2
                    }
                }
            },
            2: {
                0: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 2
                    },
                    3: {
                        x: 6,
                        y: 2
                    }
                },
                1: {
                    0: {
                        x: 4,
                        y: 1
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 6,
                        y: 1
                    },
                    3: {
                        x: 4,
                        y: 2
                    }
                },
                2: {
                    0: {
                        x: 4,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 0
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                },
                3: {
                    0: {
                        x: 6,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 1
                    }
                }
            },
            3: {
                0: {
                    0: {
                        x: 4,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 0
                    },
                    2: {
                        x: 4,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 1
                    }
                }
            },
            4: {
                0: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 6,
                        y: 0
                    },
                    2: {
                        x: 4,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 1
                    }
                },
                1: {
                    0: {
                        x: 4,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                }
            },
            5: {
                0: {
                    0: {
                        x: 4,
                        y: 1
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 6,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                },
                1: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                },
                2: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 1
                    }
                },
                3: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 1
                    },
                    2: {
                        x: 6,
                        y: 1
                    },
                    3: {
                        x: 5,
                        y: 2
                    }
                }
            },
            6: {
                0: {
                    0: {
                        x: 4,
                        y: 0
                    },
                    1: {
                        x: 5,
                        y: 0
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 6,
                        y: 1
                    }
                },
                1: {
                    0: {
                        x: 5,
                        y: 0
                    },
                    1: {
                        x: 4,
                        y: 1
                    },
                    2: {
                        x: 5,
                        y: 1
                    },
                    3: {
                        x: 4,
                        y: 2
                    }
                }
            }
        },
        parado: false,


        contaElementos: function(obj) {

            return Object.keys(obj).length;

        },

        escolherForma: function() {

            this.formato = this.formatos[this.escolheAleatorio(this.formatos)];

            this.orientacaoAtual = this.escolheAleatorio(this.formato);
            this.copiaOrientacao();

        },

        escolherCor: function() {

            this.colour = this.colours[this.escolheAleatorio(this.colours)];

        },


        escolheAleatorio: function(obj) {

            return Math.floor(Math.random() * this.contaElementos(obj));

        },


        copiaOrientacao: function() {
            this.posicaoAtual = {
                0: {
                    x: this.formato[this.orientacaoAtual][0].x,
                    y: this.formato[this.orientacaoAtual][0].y
                },
                1: {
                    x: this.formato[this.orientacaoAtual][1].x,
                    y: this.formato[this.orientacaoAtual][1].y
                },
                2: {
                    x: this.formato[this.orientacaoAtual][2].x,
                    y: this.formato[this.orientacaoAtual][2].y
                },
                3: {
                    x: this.formato[this.orientacaoAtual][3].x,
                    y: this.formato[this.orientacaoAtual][3].y
                }
            }
        },


        pegaproximaOrientacao: function() {

            var contador = this.contaElementos(this.formato);

            if (this.orientacaoAtual === (contador - 1)) {

                var orientacao = this.formato[0];

                this.proximaOrientacao = 0;

                return orientacao;

            } else {

                var orientacao = this.formato[this.orientacaoAtual + 1];

                this.proximaOrientacao = this.orientacaoAtual + 1;

                return orientacao;

            }

        },

        mostratetramino: function(pecas) {

            for (var index in this.posicaoAtual) {

                var coordenadas = this.posicaoAtual[index];

                pecas[coordenadas.y][coordenadas.x].marcarPecas(this.colour);

            }

        },


        mostraPreviewdetetramino: function(previewdePecas) {

            for (var y = 0; y < 5; y++) {

                for (var x = 0; x < 5; x++) {

                    previewdePecas[y][x].desmarcarPecas();

                }

            }

            for (var index in this.posicaoAtual) {

                var coordenadas = this.posicaoAtual[index];

                previewdePecas[coordenadas.y + 1][coordenadas.x - 3].marcarPecas(this.colour);

            }

        },


        movetetramino: function(pecas, direcao, intervalo) {

            if (false === this.checarMovimento('baixo') &&
                'baixo' === direcao) {
                var intervalodePause = intervalo - 1;

                var t = this;

                setTimeout(function() {
                    t.setPausa();
                }, intervalodePause);

            } else {

                if (true === this.checarMovimento(direcao)) {

                    for (var index in this.posicaoAtual) {

                        var coordenadas = this.posicaoAtual[index];

                        pecas[coordenadas.y][coordenadas.x].desmarcarPecas();

                        this.setNovasCoordenadas(coordenadas, direcao);

                    }

                    this.setMovimentosPossiveis(pecas);

                    this.mostratetramino(pecas);

                }

            }

        },


        setNovasCoordenadas: function(CoordenadasAtuais, direcao) {

            switch (direcao) {
                case 'naofunciona':
                    CoordenadasAtuais.x--;
                    break;
                case 'funciona':
                    CoordenadasAtuais.x++;
                    break;
                case 'baixo':
                    CoordenadasAtuais.y++;
                    break;
            }

        },


        girar: function(pecas) {

            if (true === this.checarMovimento('girar')) {
                this.proximaPosicao = this.pegaproximaOrientacao();
                var comparaOrientacao = this.formato[this.orientacaoAtual];

                var xoffset = this.posicaoAtual[0].x - comparaOrientacao[0].x;
                var yoffset = this.posicaoAtual[0].y - comparaOrientacao[0].y;

                for (var index in this.posicaoAtual) {

                    var coordenadas = this.posicaoAtual[index];

                    pecas[coordenadas.y][coordenadas.x].desmarcarPecas();

                    this.posicaoAtual[index].x = (this.proximaPosicao[index].x + xoffset);
                    this.posicaoAtual[index].y = (this.proximaPosicao[index].y + yoffset);

                }

                this.setMovimentosPossiveis(pecas);

                this.mostratetramino(pecas);

                this.orientacaoAtual = this.proximaOrientacao;

            }

        },

        setPausa: function() {

            this.parado = true;

        },

        resetarMovimentosPossiveis: function() {

            this.MovimentosPossiveis['naofunciona'] = true;
            this.MovimentosPossiveis['funciona'] = true;
            this.MovimentosPossiveis['baixo'] = true;
            this.MovimentosPossiveis['girar'] = true;

        },

        setMovimentosPossiveis: function(pecas) {

            this.resetarMovimentosPossiveis();

            for (var index in this.posicaoAtual) {

                var coordenadas = this.posicaoAtual[index];

                if (0 === coordenadas.x ||
                    1 === pecas[coordenadas.y][(coordenadas.x - 1)].estado) {

                    this.MovimentosPossiveis['naofunciona'] = false;

                }

                if ((Configuracao.tamanho.width - 1) === coordenadas.x ||
                    1 === pecas[coordenadas.y][(coordenadas.x + 1)].estado) {

                    this.MovimentosPossiveis['funciona'] = false;

                }

                if ((Configuracao.tamanho.height - 1) === coordenadas.y ||
                    1 === pecas[(coordenadas.y + 1)][coordenadas.x].estado) {

                    this.MovimentosPossiveis['baixo'] = false;

                }

            }

            var proximaPosicaoAux = this.pegaproximaOrientacao();
            var comparaOrientacao = this.formato[this.orientacaoAtual];

            var xoffset = this.posicaoAtual[0].x - comparaOrientacao[0].x;
            var yoffset = this.posicaoAtual[0].y - comparaOrientacao[0].y;

            for (var index in this.posicaoAtual) {

                var coordenadas = this.posicaoAtual[index];

                var nextPosX = proximaPosicaoAux[index].x + xoffset;
                var nextPosY = proximaPosicaoAux[index].y + yoffset;

                if (nextPosX < 0 ||
                    nextPosX >= Configuracao.tamanho.width) {

                    this.MovimentosPossiveis['girar'] = false;

                    break;

                }

                if (nextPosY < 0 ||
                    nextPosY >= Configuracao.tamanho.height) {

                    this.MovimentosPossiveis['girar'] = false;

                    break;

                }

                if (1 === pecas[nextPosY][nextPosX].estado) {

                    this.MovimentosPossiveis['girar'] = false;

                    break;

                }

            }

        },

        checarMovimento: function(move) {

            return this.MovimentosPossiveis[move];

        },
        devOutput: function() {

            var devtetraminoOut = document.createElement("div");

            var coordenadas = "<span class='dev-coordenadas'>";

            var c = 1;

            for (var coords in this.posicaoAtual) {

                coordenadas += c + "y:" + this.posicaoAtual[coords].y + " x:" + this.posicaoAtual[coords].x + "; ";

                c++;
            }

            coordenadas += "</span><br/><br/>";

            devtetraminoOut.innerHTML = coordenadas;

            var MovimentosPossiveis = "<span class='dev-allowed'>";

            for (var allowed in this.MovimentosPossiveis) {

                MovimentosPossiveis += this.MovimentosPossiveis[allowed] + "; ";

                c++;
            }

            MovimentosPossiveis += "</span><br/><br/>";

            devtetraminoOut.innerHTML = JSON.stringify(this, null, 4) + "<br/><br/>";


        }

    };

    window.tetramino = tetramino;

}());



;
(function() {

    'use strict';

    function Pecas(x, y) {

        this.x = x;
        this.y = y;

    }

    Pecas.prototype = {

        pecaHtml: '',

        devestado: false,

        cor: 'gandalfup',

        tetramino: {},
        estado: 0,

        x: 0,
        y: 0,

        acrescentaPecas: function(gridDiv) {

            gridDiv.appendChild(this.pecaHtml);

        },

        fazPecaHtml: function() {

            this.pecaHtml = document.createElement("div");

            this.addDevOutput();

            this.setHtmlClass();

        },

        marcarPecas: function(cor) {

            this.setColour(cor);

            this.setestado(1);

        },

        desmarcarPecas: function() {

            this.setColour('gandalfup');

            this.setestado(0);

        },
        setColour: function(cor) {

            this.cor = cor;

            this.setHtmlClass();

        },

        setestado: function(estado) {

            this.estado = estado;

            if (true === this.devestado) {

                document.getElementById('js-estado-dev-' + this.x + '-' + this.y).innerHTML = estado;

            }

        },

        setHtmlClass: function() {

            this.pecaHtml.setAttribute("class", "peca " + this.cor);

        },

        addDevOutput: function() {

            if (true === this.devestado) {

                this.pecaHtml.innerHTML = "<span id='js-x-dev' class='peca-dev x-dev'>" + this.x + "</span><span id='js-y-dev y-dev' class='peca-dev'>" + this.y + "</span><span id='js-estado-dev-" + this.x + "-" + this.y + "' class='peca-dev estado-dev'>" + this.estado + "</span>";

            }

        }



    };

    window.Pecas = Pecas;

}());



;
(function() {

    'use strict';

    var t;

    function KeyListener(grid, timer) {

        t = this;

        t.grid = grid;

        t.timer = grid.timer;

        t.InicializaTeclas();

    }

    KeyListener.prototype = {

        grid: {},
        timer: {},

        InicializaTeclas: function() {

            window.addEventListener('keydown', t.keyListener);

        },

        keyListener: function(keyEvent) {

            var pecas = t.grid.pecas;

            var tetraminoemjogo = t.grid.tetraminos[1];

            switch (keyEvent.keyCode) {

                case 65:
                    keyEvent.preventDefault();
                    tetraminoemjogo.movetetramino(pecas, 'naofunciona', t.timer);
                    break;
                case 68:
                    keyEvent.preventDefault();
                    tetraminoemjogo.movetetramino(pecas, 'funciona', t.timer);
                    break;
                case 83:
                    keyEvent.preventDefault();
                    tetraminoemjogo.movetetramino(pecas, 'baixo', t.timer);
                    break;

                case 87:
                    keyEvent.preventDefault();
                    tetraminoemjogo.girar(pecas);
                    break;

                case 80:
                    keyEvent.preventDefault();
                    if (true === t.timer.rodando) {
                        t.timer.pausaTempo();
                    } else {
                        t.timer.iniciaTempo();
                    }
                    break;


            }

        }

    };

    window.KeyListener = KeyListener;

}());;
(function() {

    'use strict';

    var t;

    function Timer(grid) {

        t = this;

        t.grid = grid;

        t.intervaloAtual = t.grid.niveis[0]['intervalo'];

        t.intervalodoContaEventos = document.getElementById('ContadordeEvento');

    }

    Timer.prototype = {

        intervaloAtual: 0,

        contaEventos: 0,

        intervalodoContaEventos: {},

        intervaloID: null,
        rodando: true,

        iniciaTempo: function() {

            t.intervaloID = setInterval(t.intervalTrigger, t.intervaloAtual);

            t.rodando = true;

        },


        pausaTempo: function() {

            window.limparIntervalor(t.intervaloID);

            t.rodando = false;

        },

        intervalTrigger: function() {

            var tetraminos = t.grid.tetraminos;

            t.contaEventos++;

            t.intervalodoContaEventos.innerHTML = t.contaEventos;

            tetraminos[1].movetetramino(t.grid.pecas, 'baixo', t.intervaloAtual);

            if (true === tetraminos[1].parado) {

                tetraminos[1].mostratetramino(t.grid.pecas);

                t.grid.encontraLinhasCheias(tetraminos[1].posicaoAtual);

                tetraminos.unshift(new tetramino());

                tetraminos[0].mostraPreviewdetetramino(t.grid.previewdePecas);
                var YOUDIED = false;
                for (var index in tetraminos[1].posicaoAtual) {

                    var coordenadas = tetraminos[1].posicaoAtual[index];

                    if (1 === t.grid.pecas[coordenadas.y][coordenadas.x].estado) {

                        YOUDIED = true;

                        break;

                    }

                }

                if (true === YOUDIED) {
                    t.pausaTempo();
                }

            }

            var nivelData = t.grid.niveis[t.grid.nivel];
            if (t.contaEventos >= nivelData.limite) {

                t.grid.nivel++;

                t.grid.outputnivel();

                t.pausaTempo();

                t.intervaloAtual = nivelData.interval;

                t.iniciaTempo()

            }

        }

    };

    window.Timer = Timer;

}());





window.tetris = new window.Grid('tabuleiro');
