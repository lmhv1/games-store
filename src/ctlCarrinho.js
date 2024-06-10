import jogos from "./carregarJogos.js";

// Retorna uma array com os ids dos jogos no carrinho
const loadArrCarrinho = () => {
    const arrCarrinho = localStorage.getItem("carrinho");
    if (arrCarrinho === undefined || arrCarrinho === null || arrCarrinho.length === 0) {
        return [];
    }

    return arrCarrinho.trim().split(" ");
};



// Retorna uma array com todos os jogos cadastrados
const getTodosJogos = () => {
    return jogos;
};

// Retorna um objeto com os dados do jogo fornecido via id
const getJogoPorId = id => {
    return jogos.find(jogo => jogo.id == id);
};

// Retorna uma array de objetos com dados dos jogos de acordo com a categoria
const getJogosPorCategoria = categoria => {
    return jogos.filter(jogo => jogo.categoria == categoria);
};

// Retorna uma array de objetos com dados dos jogos que estão no carrinho
const getJogosNoCarrinho = () => {
    return jogos.filter(jogo => estaNoCarrinho(jogo.id));
};

// Retorna quantidade de itens no carrinho
const getQtdItensNoCarrinho = () => {
    return getJogosNoCarrinho().length;
};

// verifica se um jogo está presente na localstorage do carrinho através do id,
// retornando true/false
const estaNoCarrinho = id => {
    const arrCarrinho = loadArrCarrinho();

    return arrCarrinho.some(jogo => jogo == id);
};

// remove o id de um jogo na localstorage do carrinho
const removerJogoPorId = id => {
    const arrCarrinho = loadArrCarrinho();

    const novaArrCarrinho = arrCarrinho.filter(jogo => jogo != id);
    localStorage.setItem("carrinho", novaArrCarrinho.join(" "));
};

// Calcula a soma dos preços dos jogos, sem aplicar descontos ou taxas
const calcSomaPreco = () => {
    const arrCarrinho = loadArrCarrinho();

    const jogosCarrinho = arrCarrinho.map(idJogo => getJogoPorId(idJogo));

    const total = jogosCarrinho.reduce((total, jogo) => total + jogo.preco, 0);
    return total;
};

// Insere id no carrinho
const addJogoNoCarrinho = (id) => {
    const arrCarrinho = loadArrCarrinho();

    if (!estaNoCarrinho(id)) {
        arrCarrinho.push(id);
        localStorage.setItem("carrinho", arrCarrinho.join(" "));
    }
};

// Estiliza o link do carrinho no cabeçalho caso tenha itens no carrinho
const estilizarLinkCarrinho = () => {
    const qtdCarrinho = getQtdItensNoCarrinho();
    if (qtdCarrinho > 0) {
        const txtCarrinho = document.getElementById('txtCarrinho');
        txtCarrinho.classList.add('verde');
        txtCarrinho.innerText += ` (${qtdCarrinho})`;
    }
};

export {
    getTodosJogos,
    getJogoPorId,
    getJogosPorCategoria,
    getJogosNoCarrinho,
    getQtdItensNoCarrinho,
    estaNoCarrinho,
    removerJogoPorId,
    calcSomaPreco,
    addJogoNoCarrinho,
    estilizarLinkCarrinho
};