var classificacoes = [];
var produtos = [];
var stats = {"0": "Vencido", "1": "Em uso"};

initForm();

function editar(id) {
    $("#formulario").show();
    let produto = produtos[id];
    console.log(produto);
    $("#id").val(produto.id);
    $("#nome").val(produto.nome);
    $("#classificacao").val(produto.id_classificacao);
    let dataValidade = new Date(produto.validade);
    // format date to yyyy-mm-dd
    let mes = dataValidade.getMonth() + 1;
    mes = mes < 10 ? "0" + mes : mes;
    let dia = dataValidade.getDate();
    dia = dia < 10 ? "0" + dia : dia;
    dataValidade = dataValidade.getFullYear() + "-" + mes + "-" + dia;
    $("#dataValidade").val(dataValidade);
    $("#status").val(produto.status);
    $("#especie").val(produto.id_especie);
    $("#principoAtivo").val(produto.principioAtivo);
    $("#administracao").val(produto.administracao);
    $("#doses").val(produto.dose);
    $("#lote").val(produto.lote);
}

function excluir(id) {
    fetch("http://127.0.0.1:8000/api/medicamentos/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status == 202) {
                window.alert("Produto removido com sucesso!");
                listar();
            }
        })
}

function initForm() {
    fetch("http://127.0.0.1:8000/api/classificacoes")
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                data.forEach(classificacao => {
                    classificacoes[classificacao.id] = classificacao.classificacao;
                    $("#classificacao").append(`<option value="${classificacao.id}">${classificacao.classificacao}</option>`);
                });
            });
        }
    });
    fetch("http://127.0.0.1:8000/api/especies")
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                data.forEach(especies => {
                    $("#especie").append(`<option value="${especies.id}">${especies.especie}</option>`);
                });
            });
        }
    });
    listar();
}

function clearForm() {
    console.log("asdasdsa");
    $("#id").val("");
    $("#nome").val("");
    let dataAtual = new Date();
    // format to yyyy-mm-dd
    let mes = dataAtual.getMonth() + 1;
    mes = mes < 10 ? "0" + mes : mes;
    let dia = dataAtual.getDate();
    dia = dia < 10 ? "0" + dia : dia;
    dataAtual = dataAtual.getFullYear() + "-" + mes + "-" + dia;
    $("#dataValidade").val(dataAtual);
    $("#principoAtivo").val("");
    $("#administracao").val("");
    $("#doses").val("");
    $("#lote").val("");
}

function salvar() {
    let obj = {
        id: $("#id").val(),
        nome: $("#nome").val(),
        id_classificacao: $("#classificacao").val(),
        validade: $("#dataValidade").val(),
        status: $("#status").val(),
        id_especie: $("#especie").val(),
        principioAtivo: $("#principoAtivo").val(),
        administracao: $("#administracao").val(),
        dose: $("#doses").val(),
        lote: $("#lote").val()
    }

    for (var key in obj) {
        if (obj[key] == "" && key != 'id') {
            window.alert("Preencha todos os campos!");
            return;
        }
    }

    //call api with fetch, then check response status
    if (obj.id == "") {
        fetch("http://127.0.0.1:8000/api/medicamentos", {
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
        fetch("http://127.0.0.1:8000/api/medicamentos/" + obj.id, {
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

function listar() {
    clearForm();
    fetch("http://127.0.0.1:8000/api/medicamentos")
        .then(response => response.json())
        .then(data => {
            let table = $("#tableBody");
            table.empty();
            data.forEach(produto => {
                produtos[produto.id] = produto;	
                // get value from stats object
                let statusProd = stats[produto.status];
                let dataValidade = new Date(produto.validade);
                // format date to yyyy-mm-dd
                let mes = dataValidade.getMonth() + 1;
                mes = mes < 10 ? "0" + mes : mes;
                let dia = dataValidade.getDate();
                dia = dia < 10 ? "0" + dia : dia;
                dataValidade = dia + "/" + mes + "/" + dataValidade.getFullYear();
                let classificacao = classificacoes[produto.id_classificacao];
                table.append(`<tr>
                <td><input type='checkbox'></td>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${classificacao}</td>
                <td>${dataValidade}</td>
                <td>${statusProd}</td>
                <td class='acoes'><i class='bx bx-edit-alt bx-sm' onClick="editar(${produto.id})"></i><i class='bx bx-trash bx-sm' onClick="excluir(${produto.id})"></i></td>
                </tr>`);
            });
        });
}
 
function abrirFormulario() {
    $("#formulario").show();
    clearForm();
}