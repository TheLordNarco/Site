document.addEventListener("DOMContentLoaded", function () {
    carregarExtrato();
    carregarCadastros();
    carregarCarrinho();
    configurarBotoes();
});

function comprar(produto) {
    let extrato = JSON.parse(localStorage.getItem("extrato")) || [];
    extrato.push(`Comprado: ${produto}`);
    localStorage.setItem("extrato", JSON.stringify(extrato));
    carregarExtrato();

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

function carregarExtrato() {
    const extratoLista = document.getElementById("extrato-lista");
    extratoLista.innerHTML = "";
    let extrato = JSON.parse(localStorage.getItem("extrato")) || [];
    extrato.forEach(item => {
        const novoItem = document.createElement("p");
        novoItem.textContent = item;
        extratoLista.appendChild(novoItem);
    });
}

function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    if (nome && email) {
        let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
        cadastros.push({ nome, email });
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
        alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nEmail: ${email}`);
    } else {
        alert("Preencha todos os campos!");
    }
}

function carregarCadastros() {
    console.log("Usuários cadastrados:", JSON.parse(localStorage.getItem("cadastros")) || []);
}

function login() {
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    let usuario = cadastros.find(user => user.email === email);
    if (usuario) {
        alert(`Login realizado com sucesso!\nBem-vindo, ${usuario.nome}`);
    } else {
        alert("Usuário não encontrado!");
    }
}

function carregarCarrinho() {
    const carrinhoLista = document.getElementById("carrinho-lista");
    carrinhoLista.innerHTML = "";
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.forEach(item => {
        const novoItem = document.createElement("p");
        novoItem.textContent = item;
        carrinhoLista.appendChild(novoItem);
    });
}

function configurarBotoes() {
    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", function () {
            comprar(this.getAttribute("data-produto"));
        });
    });

    document.getElementById("cadastrar-btn").addEventListener("click", cadastrar);
    document.getElementById("login-btn").addEventListener("click", login);
}