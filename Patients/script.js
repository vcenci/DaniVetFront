let pacientes = [];
let pacienteId = 1;

function abrirFormulario() {
    const formulario = document.getElementById("formulario");
    formulario.classList.remove("escondido");
}

function adicionarPaciente() {
    const nome = document.getElementById("nome").value;

    // Adicione os demais campos do paciente conforme necessário

    const novoPaciente = {
        id: pacienteId++,
        nome: nome,
        // Adicione os demais campos do paciente conforme necessário
    };

    pacientes.push(novoPaciente);
    exibirPacientes();
    limparFormulario();
}

function exibirPacientes() {
    const tabelaPacientes = document.getElementById("tabela-pacientes");
    tabelaPacientes.innerHTML = "";

    pacientes.forEach((paciente) => {
        const row = tabelaPacientes.insertRow();
        for (const key in paciente) {
            if (paciente.hasOwnProperty(key)) {
                const cell = row.insertCell();
                cell.appendChild(document.createTextNode(paciente[key]));
            }
        }
    });
}

function limparFormulario() {
    const formulario = document.getElementById("formulario");
    formulario.classList.add("escondido");

    // Limpar os campos do formulário aqui
    document.getElementById("nome").value = "";
}

// Inicializa exibição da lista de pacientes
exibirPacientes();
