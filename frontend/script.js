const API_URL = "http://localhost:5000/usuarios";
let editId = null;

// 🔹 Função para carregar os usuários
async function carregarUsuarios() {
    const resposta = await fetch(API_URL);
    const usuarios = await resposta.json();
    
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
    
    usuarios.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${usuario.nome} - ${usuario.email}
            <button class="btn-editar" onclick="editarUsuario(${usuario.id}, '${usuario.nome}', '${usuario.email}')">✏️</button>
            <button class="btn-excluir" onclick="excluirUsuario(${usuario.id})">🗑️</button>
        `;
        lista.appendChild(li);
    });
}

// 🔹 Função para salvar (adicionar ou editar) um usuário
async function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editId) {
        // Atualiza o usuário
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        });
        editId = null;
    } else {
        // Adiciona novo usuário
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        });
    }

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    carregarUsuarios();
}

// 🔹 Função para editar um usuário
function editarUsuario(id, nome, email) {
    document.getElementById("nome").value = nome;
    document.getElementById("email").value = email;
    editId = id;
}

// 🔹 Função para excluir um usuário
async function excluirUsuario(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        carregarUsuarios();
    }
}

// 🔹 Carregar os usuários ao iniciar
carregarUsuarios();
