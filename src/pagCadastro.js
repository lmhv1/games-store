import {
    estilizarLinkCarrinho
} from './ctlCarrinho.js';



// Executa a função para exibir os itens do carrinho assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    estilizarLinkCarrinho();
});


// Validação do cadastro de usuário
const form = document.getElementById('frmCadastro');
form.addEventListener('submit', e => {
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const emailConfirm = document.getElementById('confirmarEmail').value;
    const senha = document.getElementById('senha').value;
    const senhaConfirm = document.getElementById('confirmarSenha').value;
    const termos = document.getElementById('termos');
    const msgErro = document.getElementById('msgErro');

    // Modelos regex para validação
    const emailEhValido = /^\S+@\S+$/g;
    const possuiMaiuscula = /[A-Z]/g;
    const possuiNumero = /\d/g;

    let mensagens = [];

    // Validação de usuário
    if (!usuario) mensagens.push('Preencha o campo usuário.');
    if (usuario.length < 3) mensagens.push('Nome de usuário deve ter mais de 3 caracteres');

    // Validação de email
    if (!email) mensagens.push('Preencha o campo email.');
    if (!emailEhValido.test(email)) mensagens.push('Insira um email válido');

    if (!emailConfirm) mensagens.push('Preencha o campo confirmar email.');
    if (emailConfirm != email) mensagens.push('Emails não coincidem.');

    // Validação de senha
    if (!senha) mensagens.push('Preencha o campo senha.');
    if (senha.length < 8) mensagens.push('A senha deve ter pelo menos 8 caracteres.');
    if (!possuiMaiuscula.test(senha)) mensagens.push('A senha deve ter pelo menos uma letra maiúscula.');
    if (!possuiNumero.test(senha)) mensagens.push('A senha deve ter pelo menos um número.');

    if (!senhaConfirm) mensagens.push('Preencha o campo confirmar senha.');
    if (senhaConfirm != senha) mensagens.push('As senhas não coincidem.');

    // Concordância com os termos de uso
    if (!termos.checked) mensagens.push('Você deve concordar com os termos de uso.');

    // Não envia o formulário até que os erros sejam resolvidos
    if (mensagens.length > 0) {
        e.preventDefault();
        msgErro.innerText = mensagens.join('\n');
    }

});