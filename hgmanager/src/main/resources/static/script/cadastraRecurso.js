document.addEventListener('DOMContentLoaded', function () {
    alert("Script carregado");

    document.getElementById('formulario').addEventListener('submit', async function (event) {
        event.preventDefault();

        alert("Capturando os dados do formulário...");

        const formData = new FormData(this);

        const data = {
            marca: formData.get('marca'),
            descricao: formData.get('descricao'),
            estado: formData.get('estado'), // 'estado' já é string
            departamento: {
                id: formData.get('departamentoSelect') // Garantindo tipo numérico
            }
        };

        // Validação
        if (!data.marca || !data.descricao || !data.estado || !data.departamento.id) {
            alert('Preencha todos os campos!');
            return;
        }

        console.log('Dados enviados:', data);

        try {
            const response = await fetch('http://localhost:8080/Recurso/cadastroRecurso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Recurso cadastrado com sucesso! ID: ');
            } else {
                const error = await response.text();
                alert('Erro ao cadastrar recurso: ' + error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor. Verifique sua conexão ou o endereço do servidor.' + error);
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    alert('caralho');
    listarDepartamentos();
});

function listarDepartamentos() {
    const url = "http://localhost:8080/Departamento/listarDepartamento";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert("departamento");
                console.error("Erro ao resgatar departamentos:", response.status);
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json(); // Adicionado o retorno do JSON
        })
        .then(departamentos => {
            const selecao = document.getElementById("departamentoSelect");
            departamentos.forEach(opcao => {
                console.log(opcao);
                const op = document.createElement("option");
                op.value = opcao.id;
                op.textContent = opcao.nome;
                selecao.appendChild(op);
            });
        })
        .catch(error => console.error("Erro ao listar departamentos:", error));
}
