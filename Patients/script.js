var racas = [];
var especies = [];
var proprietarios = [];
var especieParaRaca = [];
var pacientes = [];

initForm();

function editar(id) {
    $("#formulario").show();
    let paciente = pacientes[id];
    $("#id").val(paciente.id);
    $("#sexo").val(paciente.sexo);
    $("#nome").val(paciente.nome);
    $("#idade").val(paciente.idade);
    $("#especie").val(paciente.id_especie);
    atualizaRacas();
    $("#raca").val(paciente.id_raca);
    $("#proprietario").val(paciente.id_proprietario);
    $("#pelagem").val(paciente.pelagem);
    $("#peso").val(paciente.peso);
    $("#endereco").val(paciente.endereco);
    $("#telefone").val(paciente.telefone);
    $("#email").val(paciente.email);
}

function excluir(id) {
    fetch("http://127.0.0.1:8000/api/pacientes/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status == 202) {
                window.alert("Paciente removido com sucesso!");
                listar();
            }
        })
}

function initForm() {
    fetch("http://127.0.0.1:8000/api/especies")
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                data.forEach(especies => {
                    especies[especies.id] = especies.especie;
                    $("#especie").append(`<option value="${especies.id}">${especies.especie}</option>`);
                });
            });
        }
    });
    fetch("http://127.0.0.1:8000/api/racas")
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                data.forEach(raca => {
                    racas[raca.id] = raca.raca;
                    especieParaRaca[raca.id_especie] = especieParaRaca[raca.id_especie] || [];
                    especieParaRaca[raca.id_especie][raca.id] = raca.raca;
                    $("#raca").append(`<option value="${raca.id}">${raca.raca}</option>`);
                });
                atualizaRacas();
            });
        }
    });
    fetch("http://127.0.0.1:8000/api/proprietarios")
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                data.forEach(proprietario => {
                    proprietarios[proprietario.id] = proprietario.nome;
                    $("#proprietario").append(`<option value="${proprietario.id}">${proprietario.nome}</option>`);
                });
            });
        }
    });
    listar();
}

function clearForm() {
    $("#id").val("");
    $("#nome").val("");
    $("#idade").val("");
    $("#pelagem").val("");
    $("#peso").val("");
    $("#endereco").val("");
    $("#telefone").val("");
    $("#email").val("");
}

function salvar() {
    let obj = {
        id: $("#id").val(),
        sexo: $("#sexo").val(),
        nome: $("#nome").val(),
        idade: $("#idade").val(),
        id_raca: $("#raca").val(),
        id_especie: $("#especie").val(),
        id_proprietario: $("#proprietario").val(),
        validade: $("#dataValidade").val(),
        pelagem: $("#pelagem").val(),
        peso: $("#peso").val(),
        endereco: $("#endereco").val(),
        telefone: $("#telefone").val(),
        email: $("#email").val()
    }

    for (var key in obj) {
        if (obj[key] == "" && key != 'id') {
            window.alert("Preencha todos os campos!");
            return;
        }
    }

    if (obj.id == "") {
        fetch("http://127.0.0.1:8000/api/pacientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(response => {
            if (response.status == 201) {
                $("#formulario").hide();
                window.alert("Produto cadastrado com sucesso!");
                listar();
            }
        })
    } else {
        fetch("http://127.0.0.1:8000/api/pacientes/" + obj.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(response => {
            if (response.status == 200) {
                $("#formulario").hide();
                window.alert("Produto atualizado com sucesso!");
                listar();
            }
        })
    }
    
}

function atualizaRacas() {
    let especieSelecionada = $("#especie").val();
    $("#raca").empty();
    let racas = especieParaRaca[especieSelecionada];
    for (var key in racas) {
        $("#raca").append(`<option value="${key}">${racas[key]}</option>`);
    }

}

function listar() {
    clearForm();
    fetch("http://127.0.0.1:8000/api/pacientes")
        .then(response => response.json())
        .then(data => {
            let table = $("#tableBody");
            table.empty();
            data.forEach(paciente => {
                pacientes[paciente.id] = paciente;	
                let especie = especies[paciente.id_especie];
                let proprietario = proprietarios[paciente.id_proprietario];
                table.append(`<tr>
                    <td><input type='checkbox'></td>
                    <td>${paciente.id}</td>
                    <td>${paciente.nome}</td>
                    <td>${proprietario}</td>
                    <td>${especie}</td>
                    <td>${paciente.sexo}</td>
                    <td>${paciente.idade}</td>
                    <td class='acoes'><i class='bx bx-edit-alt bx-sm' onClick="editar(${paciente.id})"></i><i class='bx bx-trash bx-sm' onClick="excluir(${paciente.id})"></i></td>
                    </tr>`
                );
            });
        });
}
 
function abrirFormulario() {
    $("#formulario").show();
    clearForm();
}