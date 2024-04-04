let participantes = [
  {
   nome: "Davi Pereira",
   email: "davipereira@gmail.com",
   dataInscricao: new Date(2024, 2, 1, 19, 23),
   dataCheckin: new Date(2024, 2, 1, 20, 20)
  },
  {
   nome: "Aurora Bonifácio",
   email: "aurorab99@hotmail.com",
   dataInscricao: new Date(2024, 2, 2, 17, 23),
   dataCheckin: new Date(2024, 2, 2, 17, 40)
  },
  {
   nome: "Fernando Silva",
   email: "fernandosilva@example.com",
   dataInscricao: new Date(2024, 2, 3, 15, 12),
   dataCheckin: new Date(2024, 2, 3, 15, 45)
  },
  {
   nome: "Mariana Costa",
   email: "mariana.costa@example.com",
   dataInscricao: new Date(2024, 2, 4, 14, 30),
   dataCheckin: new Date(2024, 2, 4, 15, 10)
  },
  {
   nome: "João Oliveira",
   email: "joao.oliveira@example.com",
   dataInscricao: new Date(2024, 2, 5, 12, 40),
   dataCheckin: new Date(2024, 2, 5, 13, 20)
  },
  {
   nome: "Luiza Santos",
   email: "luizasantos@example.com",
   dataInscricao: new Date(2024, 2, 6, 11, 20),
   dataCheckin: new Date(2024, 2, 6, 11, 50)
  },
  {
   nome: "Pedro Almeida",
   email: "pedro.almeida@example.com",
   dataInscricao: new Date(2024, 2, 7, 10, 15),
   dataCheckin: new Date(2024, 2, 7, 10, 45)
  },
  {
   nome: "Ana Rodrigues",
   email: "ana.rodrigues@example.com",
   dataInscricao: new Date(2024, 2, 8, 9, 30),
   dataCheckin: new Date(2024, 2, 8, 9, 55)
  },
  {
   nome: "Gustavo Sousa",
   email: "gustavo.sousa@example.com",
   dataInscricao: new Date(2024, 2, 9, 8, 45),
   dataCheckin: new Date(2024, 2, 9, 9, 15)
  },
  {
   nome: "Carla Mendes",
   email: "carla.mendes@example.com",
   dataInscricao: new Date(2024, 2, 10, 7, 55),
   dataCheckin: null
  },
  {
   nome: "Rafaela Nunes",
   email: "rafaela.nunes@example.com",
   dataInscricao: new Date(2024, 2, 11, 6, 40),
   dataCheckin: new Date(2024, 2, 11, 7, 10)
  },
  {
   nome: "Bruno Lima",
   email: "bruno.lima@example.com",
   dataInscricao: new Date(2024, 2, 12, 5, 20),
   dataCheckin: new Date(2024, 2, 12, 5, 55)
  },
  {
   nome: "Juliana Oliveira",
   email: "juliana.oliveira@example.com",
   dataInscricao: new Date(2024, 2, 13, 4, 30),
   dataCheckin: new Date(2024, 2, 13, 5, 5)
  },
  {
   nome: "Lucas Santos",
   email: "lucas.santos@example.com",
   dataInscricao: new Date(2024, 2, 14, 3, 15),
   dataCheckin: new Date(2024, 2, 14, 3, 45)
  },
  {
   nome: "Beatriz Souza",
   email: "beatriz.souza@example.com",
   dataInscricao: new Date(2024, 2, 15, 2, 20),
   dataCheckin: new Date(2024, 2, 15, 2, 50)
  },
  {
   nome: "André Pereira",
   email: "andre.pereira@example.com",
   dataInscricao: new Date(2024, 2, 16, 1, 10),
   dataCheckin: new Date(2024, 2, 16, 1, 40)
  }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckin = dayjs(participante.dataCheckin).format('DD/MM/YYYY HH:mm');

    if (participante.dataCheckin == null) {
        dataCheckin = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
            Confirmar Check-in
        </button>
        `;
    }

    return `
        <tr>
            <td>
                <strong>
                    ${participante.nome}
                </strong>
                <br>
                <small>
                    ${participante.email}
                </small>
            </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckin}</td>
        </tr>
        `;
}

const atualizarLista = (participantes) => {
    let output = "";

    // percorrer todos os participantes
    for (let i of participantes) {
        output = output + criarNovoParticipante(i);
    }

    // substituir informações no HTML
    document.querySelector("tbody").innerHTML = output;
}

atualizarLista(participantes);

const adicionarParticipante = (event) => {
    event.preventDefault();

    const dadosDoFormulario = new FormData(event.target);

    const participante = {
        nome: dadosDoFormulario.get("nome"),
        email: dadosDoFormulario.get("email"),
        dataInscricao: new Date(),
        dataCheckin: null
    };

    // verificar se o participante já existe
    const participanteExiste = participantes.find((p) => p.email == participante.email);

    if (participanteExiste) {
        alert("E-mail já está cadastrado!");
        return;
    }

    participantes = [participante, ...participantes];
    atualizarLista(participantes);

    // limpar o formulario
    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
}

const fazerCheckIn = (event) => {
    // confirmar se deseja realizar o checkin
    const msgConfirmacao = "Deseja realizar o check-in?";

    if (!confirm(msgConfirmacao)) {
        return;
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => p.email == event.target.dataset.email);

    // atualizar o check-in do participante
    participante.dataCheckin = new Date();

    // atualizar a lista de participantes
    atualizarLista(participantes);
}