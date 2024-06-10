import {
    getTodosJogos,
    estilizarLinkCarrinho,
    getJogoPorId
}
from './ctlCarrinho.js';


// Remove a filtragem dos cards por genero ou plataforma
const removerFiltro = () => {
    var cards = document.querySelectorAll('.jogoCard');

    cards.forEach(card => {
        card.style.display = 'block';
    });
};

// Filtra os cards por genero ou plataforma
const filtrarCards = (valor) => {
    var cards = document.querySelectorAll('.jogoCard');

    removerFiltro();

    cards.forEach(card => {
        if (!card.textContent.includes(valor)) {
            card.style.display = 'none';
        }
    });

};

// Preenche a página com os dados dos jogos
const popularPagina = dados => {
    const jogos = dados;

    // Cria um card para cada jogo
    jogos.forEach(jogo => {
        const {
            id,
            nome,
            generos,
            plataformas,
            preco
        } = jogo;

        const cards = document.getElementById('cards');

        const jogoCard = document.createElement('div');
        jogoCard.classList.add('jogoCard');

        const jogoLink = document.createElement('a');
        jogoLink.classList.add('jogoLink');
        jogoLink.href = `../pages/jogo.html?id=${id}`;

        const picture = document.createElement('picture');

        const jogoImg = document.createElement('img');
        jogoImg.classList.add('jogoImg');
        jogoImg.src = `../img/jogos/${id}.jpg`;
        jogoImg.alt = nome;

        const cardBottom = document.createElement('div');
        cardBottom.classList.add('cardBottom');

        const jogoNome = document.createElement('p');
        jogoNome.classList.add('jogoNome');
        jogoNome.innerText = nome;

        const jogoPreco = document.createElement('p');
        jogoPreco.classList.add('jogoPreco');
        jogoPreco.innerText = `R$ ${preco.toFixed(2)}`;

        const jogoGeneros = document.createElement('p');
        jogoGeneros.style.display = 'none';
        jogoGeneros.innerText = generos.join(', ');

        const jogoPlataformas = document.createElement('p');
        jogoPlataformas.style.display = 'none';
        jogoPlataformas.innerText = plataformas.join(', ');


        picture.appendChild(jogoImg);

        cardBottom.appendChild(jogoNome);
        cardBottom.appendChild(jogoPreco);

        jogoLink.appendChild(picture);
        jogoLink.appendChild(cardBottom);

        jogoCard.appendChild(jogoLink);
        jogoCard.appendChild(jogoGeneros);
        jogoCard.appendChild(jogoPlataformas);

        cards.appendChild(jogoCard);
    });
};


const popularTopJogos = () => {
    // gera 5 números aleatórios de 1 a 20
    var arr = [];
    while (arr.length < 5) {
        var r = Math.floor(Math.random() * 20) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    // Popula a lista ordenada
    arr.forEach(num => {
        const jogo = getJogoPorId(num);
        const {
            id,
            nome
        } = jogo;

        const ol = document.getElementById('lstTopJogos');

        const link = document.createElement('a');
        link.href = `../pages/jogo.html?id=${id}`;
        link.innerText = nome;

        const listItem = document.createElement('li');

        listItem.appendChild(link);
        ol.appendChild(listItem);
    });
};

// Executa funções essenciais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {

    // Repopula pagina com todos os jogos caso sejam limpados os filtros
    document.getElementById('btnLimparFiltro').addEventListener('click',
        () => removerFiltro()
    );

    // Aplica filtro de genero de jogo
    const selectGenero = document.getElementById('filtroGenero');
    selectGenero.addEventListener('change',
        () => filtrarCards(selectGenero.options[selectGenero.selectedIndex].value)
    );

    // Aplica filtro de plataforma de jogo
    const selectPlataforma = document.getElementById('filtroPlataforma');
    selectPlataforma.addEventListener('change',
        () => filtrarCards(selectPlataforma.options[selectPlataforma.selectedIndex].value)
    );

    popularPagina(getTodosJogos());
    popularTopJogos();
    estilizarLinkCarrinho();
});