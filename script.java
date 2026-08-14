// ==========================================
// EXPERIMENTO DE MIOPIA
// ==========================================


// Pegando os elementos do HTML

const controleGrau = document.getElementById("grau");

const grauValor = document.getElementById("grauValor");

const folheto = document.getElementById("folheto");

const statusTexto = document.getElementById("statusTexto");

const mensagemVisao =
    document.getElementById("mensagemVisao");

const botaoCorrecao =
    document.getElementById("botaoCorrecao");

const botaoReset =
    document.getElementById("botaoReset");


// Guarda se o usuário está vendo
// a simulação depois da correção.

let correcaoAtiva = false;


// ==========================================
// ALTERAR O GRAU
// ==========================================

controleGrau.addEventListener("input", function () {

    // Pega o valor escolhido pelo usuário

    const grau = Number(controleGrau.value);


    // Mostra o grau na tela

    if (grau === 0) {

        grauValor.textContent = "0,00";

    } else {

        grauValor.textContent =
            "-" + grau.toFixed(2).replace(".", ",");

    }


    // Se a correção estiver ativada,
    // o usuário pode mexer no grau,
    // mas a imagem continua nítida.

    if (correcaoAtiva) {

        mensagemVisao.innerHTML = `
            <strong>
                Imagem representada após a correção.
            </strong>

            <p>
                Nesta simulação educativa, a imagem
                permanece nítida para representar
                a correção do foco.
            </p>
        `;

        return;
    }


    // Se o grau for zero,
    // não aplicamos desfoque.

    if (grau === 0) {

        folheto.style.filter = "blur(0px)";

        statusTexto.textContent =
            "Visão sem miopia";

        mensagemVisao.innerHTML = `
            <strong>
                A imagem está nítida.
            </strong>

            <p>
                Neste exemplo, não há grau de miopia.
            </p>
        `;

        return;
    }


    // ======================================
    // CALCULAR O DESFOQUE
    // ======================================

    /*
        O desfoque começa pequeno
        e aumenta conforme o grau.

        Grau 0    → 0px
        Grau 1    → 2px
        Grau 2    → 4px
        Grau 3    → 6px
        Grau 4    → 8px
        Grau 5    → 10px
    */

    const desfoque = grau * 2;

    folheto.style.filter =
        `blur(${desfoque}px)`;


    statusTexto.textContent =
        "Visão com miopia";


    mensagemVisao.innerHTML = `
        <strong>
            A imagem está ficando desfocada.
        </strong>

        <p>
            Grau selecionado:
            <strong>
                -${grau.toFixed(2).replace(".", ",")}
            </strong>
        </p>
    `;

});


// ==========================================
// BOTÃO "DEPOIS DA CORREÇÃO"
// ==========================================

botaoCorrecao.addEventListener("click", function () {

    correcaoAtiva = !correcaoAtiva;


    if (correcaoAtiva) {

        // Retira o desfoque

        folheto.classList.add("corrigido");

        folheto.style.filter =
            "blur(0px)";


        // Muda o botão

        botaoCorrecao.textContent =
            "↩ Voltar para antes";


        botaoCorrecao.classList.add("ativo");


        // Muda a informação

        statusTexto.textContent =
            "Imagem após a correção";


        mensagemVisao.innerHTML = `
            <strong>
                Agora a imagem está nítida! ✨
            </strong>

            <p>
                A simulação representa o que acontece
                quando a formação da imagem é corrigida.
            </p>
        `;


    } else {

        // Volta para o grau escolhido

        folheto.classList.remove("corrigido");

        botaoCorrecao.classList.remove("ativo");

        botaoCorrecao.textContent =
            "✨ Ver depois da correção";


        aplicarDesfoque();

    }

});


// ==========================================
// FUNÇÃO PARA APLICAR O DESFOQUE
// ==========================================

function aplicarDesfoque() {

    const grau = Number(controleGrau.value);


    if (grau === 0) {

        folheto.style.filter =
            "blur(0px)";

        statusTexto.textContent =
            "Visão sem miopia";

        mensagemVisao.innerHTML = `
            <strong>
                A imagem está nítida.
            </strong>

            <p>
                Neste exemplo, não há grau de miopia.
            </p>
        `;

        return;
    }


    const desfoque = grau * 2;

    folheto.style.filter =
        `blur(${desfoque}px)`;


    statusTexto.textContent =
        "Visão com miopia";


    mensagemVisao.innerHTML = `
        <strong>
            A imagem está desfocada.
        </strong>

        <p>
            Quanto maior o grau selecionado,
            maior é o desfoque utilizado
            nesta representação.
        </p>
    `;

}


// ==========================================
// BOTÃO RESET
// ==========================================

botaoReset.addEventListener("click", function () {

    // Volta para -2,00

    controleGrau.value = 2;

    grauValor.textContent = "-2,00";


    // Desativa a correção

    correcaoAtiva = false;


    // Remove classes

    folheto.classList.remove("corrigido");

    botaoCorrecao.classList.remove("ativo");


    // Volta o texto do botão

    botaoCorrecao.textContent =
        "✨ Ver depois da correção";


    // Aplica novamente o desfoque

    aplicarDesfoque();

});


// ==========================================
// INICIAR O EXPERIMENTO
// ==========================================

// Quando o site abre,
// começa automaticamente com -2,00.

aplicarDesfoque();