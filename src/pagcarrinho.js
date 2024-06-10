import {
    estaNoCarrinho,
    removerJogoPorId,
    calcSomaPreco,
    getJogosNoCarrinho,
    estilizarLinkCarrinho
} from './ctlCarrinho.js';


// Remove um item especifico do carrinho e atualiza a tabela
const removerJogo = id => {
    removerJogoPorId(id);
    mostrarJogosNoCarrinho();
};

const mostrarJogosNoCarrinho = () => {
    // Monta uma array com dados dos jogos do carrinho
    const arrJogos = getJogosNoCarrinho();

    const tblCarrinho = document.getElementById('tblCarrinho');
    tblCarrinho.innerHTML = '';

    if (arrJogos.length <= 0) {
        const trMensagem = document.createElement('tr');
        const tdMensagem = document.createElement('td');
        tdMensagem.innerHTML = 'O carrinho está vazio';
        tdMensagem.colSpan = 4;
        tdMensagem.style.paddingLeft = '10px';

        trMensagem.appendChild(tdMensagem);
        tblCarrinho.appendChild(trMensagem);
        return;
    }

    // Itera por cada item do carrinho para preencher a tabela
    arrJogos.forEach(jogo => {

        // Cria linhas na tabela
        const jogoTr = document.createElement('tr');

        // Cria link para página do jogo
        const jogoLink = document.createElement('a');
        jogoLink.href = `../pages/jogo.html?id=${jogo.id}`;
        jogoLink.innerText = jogo.nome;

        // Anexar imagem na linha
        const tdImg = document.createElement('td');
        const img = document.createElement('img');
        img.src = `../img/jogos/${jogo.id}.jpg`;
        img.classList.add('img_jogo');
        tdImg.classList.add('tdata-img');
        tdImg.appendChild(img);

        // Anexar o nome na linha (com link para página do jogo)
        const tdNome = document.createElement('td');
        tdNome.classList.add('tdata-nome');
        tdNome.appendChild(jogoLink);

        // Anexar o preço na linha
        const tdPreco = document.createElement('td');
        tdPreco.classList.add('tdata-preco');
        tdPreco.innerText = 'R$ ' + jogo.preco.toFixed(2);

        // Anexar o botão de remover item na linha
        const tdBtn = document.createElement('td');
        tdBtn.classList.add('tdata-lixo');
        const imgLixo = document.createElement('img');
        imgLixo.src = '../img/lixo.svg';
        imgLixo.classList.add('icon_lixo');
        imgLixo.addEventListener('click', () => removerJogo(jogo.id));
        tdBtn.appendChild(imgLixo);


        // Executa a anexação
        jogoTr.appendChild(tdImg);
        jogoTr.appendChild(tdNome);
        jogoTr.appendChild(tdPreco);
        jogoTr.appendChild(tdBtn);

        // Anexa a linha na tabela
        tblCarrinho.appendChild(jogoTr);
    });

    // Penúltima linha da tabela - calcula valor total do carrinho
    const trValorTotal = document.createElement('tr');

    const tdTxtValorTotal = document.createElement('td');
    const tdValorTotal = document.createElement('td');
    tdTxtValorTotal.colSpan = 2;
    tdTxtValorTotal.classList.add('tdata-nome', 'bold');
    tdValorTotal.colSpan = 2;
    tdValorTotal.classList.add('tdata-preco', 'bold');

    tdTxtValorTotal.innerText = 'Total estimado:';
    tdValorTotal.innerText = 'R$ ' + calcSomaPreco().toFixed(2);

    trValorTotal.appendChild(tdTxtValorTotal);
    trValorTotal.appendChild(tdValorTotal);
    tblCarrinho.appendChild(trValorTotal);


    // Última linha da tabela - botão de finalizar compra
    const trFinalizar = document.createElement('tr');

    const tdBtnFinalizar = document.createElement('td');
    tdBtnFinalizar.colSpan = 4;
    const btnFinalizar = document.createElement('button');
    btnFinalizar.classList.add('btnFinalizar', 'btnGradVerde');
    btnFinalizar.innerText = 'Comprar para a minha conta';
    btnFinalizar.addEventListener('click',
        () => window.location.href = '../pages/cadastro.html');

    tdBtnFinalizar.appendChild(btnFinalizar);
    trFinalizar.appendChild(tdBtnFinalizar);
    tblCarrinho.appendChild(trFinalizar);

};

// Executa funções essenciais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    estilizarLinkCarrinho();
    mostrarJogosNoCarrinho();
});