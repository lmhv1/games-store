import {
    getJogoPorId,
    addJogoNoCarrinho,
    estilizarLinkCarrinho
}
from './ctlCarrinho.js';

const irParaHome = () => window.location.href = '../index.html';
const irParaCarrinho = () => window.location.href = './carrinho.html';

const carregarPagina = (id) => {
    const jogo = getJogoPorId(id);
    // Volta pra página inicial caso jogo não tenha sido carregado
    if (!jogo) irParaHome();
    // Desestruturação do objeto 'jogo'
    const {
        nome,
        generos,
        plataformas,
        descricao,
        avaliacoes,
        lancamento,
        desenvolvedor,
        preco,
        sobre
    } = jogo;

    document.title = `${nome} | Clique Jogos`;

    const btnAddCarrinho = document.getElementById('btnAddCarrinho');
    btnAddCarrinho.addEventListener('click', () => {
        addJogoNoCarrinho(id);
        irParaCarrinho();
    });

    const htmlImg = document.getElementById('jogoImg');
    htmlImg.src = `../img/jogos/${id}.jpg`;
    htmlImg.alt = `Imagem do jogo ${nome}`;

    const htmlNome = document.getElementById('jogoNome');
    const comprarNome = document.getElementById('comprarNome');
    htmlNome.innerText += nome;
    comprarNome.innerText += ' ' + nome;


    const htmlGeneros = document.getElementById('jogoGeneros');
    htmlGeneros.innerText = generos.join(', ');

    const htmlPlataformas = document.getElementById('jogoPlataformas');
    htmlPlataformas.innerText = plataformas.join(', ');

    const htmlDescricao = document.getElementById('jogoDescricao');
    htmlDescricao.innerText = descricao;

    const htmlAvaliacoes = document.getElementById('jogoAvaliacoes');
    htmlAvaliacoes.innerText = avaliacoes;

    const htmlLancamento = document.getElementById('jogoLancamento');
    htmlLancamento.innerText = lancamento;

    const htmlDesenvolvedor = document.getElementById('jogoDesenvolvedor');
    htmlDesenvolvedor.innerText = desenvolvedor;

    const htmlPreco = document.getElementById('jogoPreco');
    htmlPreco.innerText += ' ' + preco.toFixed(2);

    const htmlSobre = document.getElementById('jogoSobre');
    htmlSobre.innerText = sobre;
};

// Executa funções essenciais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {

    estilizarLinkCarrinho();

    // Verifica se foi passado id na URL, caso contrário volta para página inicial
    const params = new URL(document.location).searchParams;
    let jogoId = -1;
    for (const param of params) {
        if (param[0] == 'id') {
            jogoId = param[1];
        }
    }
    if (jogoId == -1) {
        irParaHome();
    }
    // Fim da verificação

    carregarPagina(jogoId);
});