(function() {

  var tabuleiro;
  var tabelaTabuleiro;
  var proximaPeca;
  var tabelaProxPeca;
  var pieceofsheet;
  var hor = 0;
  var posLeft = 0;
  var fps = 3;
  var gameLoop;
  var PiecePos = [];
  var numLinhas = 0;
  var next;
  var linhas = 20;
  var col = 15;
  var dir = 0;
  var pScore;
  var pQtdScore;
  var pLinhas;
  var pQtdLinhas;


  var i = {
    blk: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
      ],
    ],
    cor: 'rgb(252, 235, 117)',
    bases: [
      [
        [3, 0]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
      ],
      [
        [3, 0]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
      ],
    ],
    pontasEsq: [
      [
        [0, 0],
        [3, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 0]
      ],
      [
        [0, 0],
        [3, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 0]
      ]
    ],
    rightbord: [
      [
        [0, 0],
        [3, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 3]
      ],
      [
        [0, 0],
        [3, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 3]
      ]
    ]
  };
  var o = {
    blk: [
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
      ]
    ],
    cor: 'rgb(249, 103, 98)',
    bases: [
      [
        [1, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [1, 1]
      ]
    ],
    pontasEsq: [
      [
        [1, 0],
        [0, 0]
      ],
      [
        [1, 0],
        [0, 0]
      ],
      [
        [1, 0],
        [0, 0]
      ],
      [
        [1, 0],
        [0, 0]
      ]
    ],
    rightbord: [
      [
        [1, 1],
        [0, 1]
      ],
      [
        [1, 1],
        [0, 1]
      ],
      [
        [1, 1],
        [0, 1]
      ],
      [
        [1, 1],
        [0, 1]
      ]
    ]
  };
  var t = {
    blk: [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 1]
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [0, 1]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1]
      ],
    ],
    cor: 'rgb(173, 129, 255)',
    bases: [
      [
        [0, 0],
        [1, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [2, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [1, 1]
      ]
    ],
    pontasEsq: [
      [
        [0, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [2, 1]
      ],
      [
        [1, 0]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ]
    ],
    rightbord: [
      [
        [0, 2],
        [1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [1, 2]
      ],
      [
        [1, 1],
        [2, 0]
      ]
    ]
  };
  var j = {
    blk: [
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 0]
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2]
      ],
    ],
    cor: 'rgb(147, 244, 244)',
    bases: [
      [
        [2, 0],
        [2, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [0, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 2]
      ]
    ],
    pontasEsq: [
      [
        [2, 0],
        [0, 1]
      ],
      [
        [0, 0],
        [0, 1]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 0],
        [1, 2],
        [0, 1]
      ]
    ],
    rightbord: [
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [1, 2],
        [0, 1]
      ],
      [
        [0, 1],
        [2, 0]
      ],
      [
        [1, 2],
        [0, 2]
      ]
    ]
  };
  var l = {
    blk: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [0, 2]
      ]
    ],
    cor: 'rgb(93, 232, 183)',
    bases: [
      [
        [2, 0],
        [2, 1]
      ],
      [
        [1, 0],
        [0, 2],
        [0, 1]
      ],
      [
        [0, 0],
        [2, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ]
    ],
    pontasEsq: [
      [
        [2, 0],
        [1, 0],
        [0, 0]
      ],
      [
        [1, 0],
        [0, 0]
      ],
      [
        [0, 0],
        [2, 1],
        [1, 1]
      ],
      [
        [1, 0],
        [0, 2]
      ]
    ],
    rightbord: [
      [
        [2, 1],
        [0, 0]
      ],
      [
        [0, 2],
        [1, 0]
      ],
      [
        [2, 1],
        [1, 1],
        [0, 1]
      ],
      [
        [0, 2],
        [1, 2]
      ]
    ]
  };
  var s = {
    blk: [
      [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1]
      ]
    ],
    cor: 'rgb(247, 242, 111)',
    bases: [
      [
        [0, 2],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 0],
        [2, 1]
      ]
    ],
    pontasEsq: [
      [
        [1, 0]
      ],
      [
        [1, 0],
        [0, 0],
        [2, 1]
      ],
      [
        [1, 0]
      ],
      [
        [1, 0],
        [0, 0],
        [2, 1]
      ]
    ],
    rightbord: [
      [
        [0, 2],
        [1, 2]
      ],
      [
        [2, 1],
        [1, 1]
      ],
      [
        [0, 2],
        [1, 2]
      ],
      [
        [2, 1],
        [1, 1]
      ]
    ]
  };
  var z = {
    blk: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2]
      ],
      [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1]
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2]
      ],
      [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1]
      ]
    ],
    cor: 'rgb(96, 126, 215)',
    bases: [
      [
        [0, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [1, 1]
      ]
    ],
    pontasEsq: [
      [
        [0, 0],
        [1, 1]
      ],
      [
        [2, 0],
        [1, 0]
      ],
      [
        [0, 0],
        [1, 1]
      ],
      [
        [2, 0],
        [1, 0]
      ]
    ],
    rightbord: [
      [
        [1, 2]
      ],
      [
        [1, 1],
        [0, 1],
        [2, 0]
      ],
      [
        [1, 2]
      ],
      [
        [1, 1],
        [0, 1],
        [2, 0]
      ]
    ]
  };

  var pieces = [i, o, t, j, l, s, z];

  function init() {
    pieceofsheet = selectnext();
    createScore(0, 0);
    createTable();
    createNextPc();
    gameLoop = setInterval(run, 460/ fps);
  }

  addEventListener("keydown", function(e) {
    if (e.key == "ArrowLeft") {
      if (posLeft > 0 && !leftCell())
        posLeft = posLeft - 1;
    } else if (e.key == "ArrowRight") {
      if (posr(pieceofsheet) + posLeft < col - 1 && !rightCell())
        posLeft = posLeft + 1;
    } else if (e.key == "Enter") {
      clearInterval(gameLoop);
    } else if (e.key == "ArrowUp") {
      if (!starteditall()) {
        dir = dir + 1;
        if (dir == 4)
          dir = 0;
      }
    } else if (e.key == "ArrowDown") {
      if (hor < linhas - 5 && allowdwn())
        hor = hor + 1;
    }
  });

  function run() {
    var fit = false;
    var undercell = false;

    if (ocpcell() && hor == 0) {
      clearInterval(gameLoop);
      window.alert("☠☠☠☠☠☠☠☠☠ YOU DIED ☠☠☠☠☠☠☠☠");
    } else {
      hor = hor + 1;

      if (hor + linedwn(pieceofsheet) == linhas - 1 || ocpcell()) {
        attScore(10, 0);
        fit = true;
        addTablePc();
        pieceofsheet = next;
        showpreview();
        hor = 0;
        posLeft = 0;
        dir = 0;
      }

      attTab();
      if (fit) {
        lineck();
      }
    }
  }

  function addTablePc() {
    pieceofsheet.blk[dir].forEach(function(coords) {
      PiecePos.push([coords[0] + hor, coords[1] + posLeft, pieceofsheet.cor]);
    });
  }

  function starteditall() {
    var nextposs = 0;
    var go = false;
    if (dir == 4)
      nextposs = 0;
    else nextposs = nextposs + 1;

    pieceofsheet.blk[nextposs].forEach(function(coords) {
      if (coords[1] + posLeft >= col)
        go = true;
    });

    return go;
  }

  function posr(peca) {
    var bgdir = -1;
    peca.blk[dir].forEach(function(coords) {
      if (coords[0] > bgdir) {
        bgdir = coords[1];
      }
    });
    return bgdir;
  }

  function posicaoEsquerda(peca) {
    var smllef = 100;
    peca.blk[dir].forEach(function(coords) {
      if (coords[1] < smllef) {
        smllef = coords[1];
      }
    });
    return smllef;
  }

  function createTable() {
    tabuleiro = document.querySelector("#tabuleiro");
    tabelaTabuleiro = document.createElement("table");
    tabelaTabuleiro.setAttribute("id", "tabelaTabuleiro");
    var tabody = document.createElement('tbody');
    for (var i = 0; i < linhas; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < col; j++) {
        var td = document.createElement("td");
        tr.appendChild(td);
      }
      tabody.appendChild(tr);
    }
    tabelaTabuleiro.appendChild(tabody);
    tabuleiro.appendChild(tabelaTabuleiro);
    antpcs();
    drawpctab(pieceofsheet);
  }

  function antpcs() {
    PiecePos.forEach(function(coords) {
      tabelaTabuleiro.rows[coords[0]].cells[coords[1]].style.backgroundColor = coords[2];
    });
  }

  function attTab() {
    tabuleiro.removeChild(tabelaTabuleiro);
    createTable();
  }

  function ocpcell() {
    var hasdown = false;
    pieceofsheet.bases[dir].forEach(function(coords) {
      PiecePos.forEach(function(c2) {
        if (coords[0] + hor + 1 == c2[0] && coords[1] + posLeft == c2[1])
          hasdown = true;
      });
    });

    return hasdown;
  }

  function allowdwn() {
    var hasdown = true;
    pieceofsheet.bases[dir].forEach(function(coords) {
      PiecePos.forEach(function(c2) {
        if (coords[0] + hor + 3 >= c2[0] && coords[1] + posLeft == c2[1])
          hasdown = false;
      });
    });

    return hasdown;
  }

  function rightCell() {
    var hasright = false;
    pieceofsheet.rightbord[dir].forEach(function(coords) {
      PiecePos.forEach(function(c2) {
        if (coords[0] + hor == c2[0] && coords[1] + posLeft + 1 == c2[1] ||
          coords[0] + hor + 1 == c2[0] && coords[1] + posLeft + 1 == c2[1]
        )
          hasright = true;
      });
    });

    return hasright;
  }

  function leftCell() {
    var hasleft = false;
    pieceofsheet.pontasEsq[dir].forEach(function(coords) {
      PiecePos.forEach(function(c2) {
        if (coords[0] + hor == c2[0] && coords[1] + posLeft - 1 == c2[1] ||
          coords[0] + hor + 1 == c2[0] && coords[1] + posLeft - 1 == c2[1])
          hasleft = true;
      });
    });

    return hasleft;
  }

  function drawcell(celula) {
    if (celula.style.backgroundColor == "rgb(252, 235, 117)" || celula.style.backgroundColor == "rgb(249, 103, 98)" ||
      celula.style.backgroundColor == "rgb(173, 129, 255)" || celula.style.backgroundColor == "rgb(93, 232, 183)" ||
      celula.style.backgroundColor == "rgb(247, 242, 111)" || celula.style.backgroundColor == "rgb(147, 244, 244)" ||
      celula.style.backgroundColor == "rgb(96, 126, 215)") {
      return true;
    } else return false;
  }

  function linedwn(peca) {
    var maior = 0;
    peca.blk[dir].forEach(function(coords) {
      if (coords[0] > maior)
        maior = coords[0];
    });
    return maior;
  }

  function lineck() {
    var clearedlines = [];
    for (var i = linhas - 1; i >= 0; i--) {
      ncolors = 0;
      var coloridos = [];
      for (var j = 0; j < col; j++) {
        if (drawcell(tabelaTabuleiro.rows[i].cells[j])) {
          coloridos.push([i, j]);
          ncolors++;
        }
      }
      if (ncolors == col) {
        clearedlines.push(i);
        numLinhas++;
      }
    }
    clearedlines.sort(function(a, b) {
      return a - b
    });
    for (var i = 0; i < clearedlines.length; i++) {
      linedelete(clearedlines[i]);
      attScore(80, 1);
    }
  }


  function linedelete(linhaAp) {
    for (var i = 0; i < col; i++) {
      tabelaTabuleiro.rows[linhaAp].cells[i].style.removeProperty("background-color");
    }


    mtpcs = []
    for (var j = 0; j < PiecePos.length; j++) {

      if (PiecePos[j][0] != linhaAp) {
        if (PiecePos[j][0] < linhaAp) {
          mtpcs.push([PiecePos[j][0] + 1, PiecePos[j][1], PiecePos[j][2]]);
        } else mtpcs.push([PiecePos[j][0], PiecePos[j][1], PiecePos[j][2]]);
      }
    }
    PiecePos = mtpcs;
  }

  function letirrain(i, j) {
    if (drawcell(tabelaTabuleiro.rows[i + 1].cells[j])) {
      return false;
    } else return true;
  }

  function createNextPc() {
    proximaPeca = document.querySelector("#proxima-peca");
    tabelaProxPeca = document.createElement("table");
    tabelaProxPeca.setAttribute("id", "tabelaProxPeca");
    var tabody = document.createElement('tbody');
    for (var i = 0; i < 5; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 5; j++) {
        var td = document.createElement("td");
        tr.appendChild(td);
      }
      tabody.appendChild(tr);
    }
    tabelaProxPeca.appendChild(tabody);
    proximaPeca.appendChild(tabelaProxPeca);
    next = selectnext();
    drawpc(next);
  }

  function selectnext() {
    var x = Math.floor((Math.random() * pieces.length));
    var newpiece = pieces[x];
    return newpiece;
  }

  function showpreview() {
    proximaPeca.removeChild(tabelaProxPeca);
    createNextPc();
  }

  function drawpc(peca) {
    peca.blk[0].forEach(function(coords) {
      tabelaProxPeca.rows[coords[0] + 1].cells[coords[1] + 1].style.backgroundColor = peca.cor;
    });
  }

  function drawpctab(peca) {
    peca.blk[dir].forEach(function(coords) {
      tabelaTabuleiro.rows[coords[0] + hor].cells[coords[1] + posLeft].style.backgroundColor = peca.cor;
    });
  }


  function createScore(pontos, linha) {
    pontuacao = document.querySelector("#informacoes");
    var txtScore = document.createTextNode("Points");
    pScore = document.createElement("p");
    pScore.appendChild(txtScore);
    pScore.setAttribute("id", "pScore");

    var qtdPontos = newpiece(pontos);
    var qtdScore = document.createTextNode(qtdPontos);
    pQtdScore = document.createElement("p");
    pQtdScore.appendChild(qtdScore);
    pQtdScore.setAttribute("id", "pQtdScore");

    var txtLinhas = document.createTextNode("Lines");
    pLinhas = document.createElement("p");
    pLinhas.appendChild(txtLinhas);
    pLinhas.setAttribute("id", "pLinhas");

    var novaQtdLinhas = novaLinha(linha);
    var qtdLinhas = document.createTextNode(novaQtdLinhas);
    pQtdLinhas = document.createElement("p");
    pQtdLinhas.appendChild(qtdLinhas);
    pQtdLinhas.setAttribute("id", "pQtdLinhas");

    pontuacao.appendChild(pScore);
    pontuacao.appendChild(pQtdScore);
    pontuacao.appendChild(pLinhas);
    pontuacao.appendChild(pQtdLinhas);
  }


  function attScore(pontos, linha) {
    pontuacao.removeChild(pScore);
    pontuacao.removeChild(pQtdScore);
    pontuacao.removeChild(pLinhas);
    pontuacao.removeChild(pQtdLinhas);
    createScore(pontos, linha);
  }

  /* closure */
  function addlines() {
    var linhas = 0;
    return function(y) {
      linhas = linhas + y;
      return linhas;
    }
  }

  var novaLinha = addlines();

  /* closure */
  function checkpoint() {
    var valor = 0;
    return function(y) {
      valor = valor + y;
      return valor;
    }
  }

  var newpiece = checkpoint();
  alert('⚔⚔⚔⚔⚔ ☠☠ TETRIS SOULS ☠☠ ⚔⚔⚔⚔');
  init();
})();
