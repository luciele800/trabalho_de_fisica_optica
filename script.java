// ==========================================
// EXPERIMENTO DE MIOPIA
// ==========================================

// Elementos da página
const controleGrau = document.getElementById("grau");
const grauValor = document.getElementById("grauValor");
const folheto = document.getElementById("folheto");
const statusTexto = document.getElementById("statusTexto");
const mensagemVisao = document.getElementById("mensagemVisao");
const botaoCorrecao = document.getElementById("botaoCorrecao");
const botaoReset = document.getElementById("botaoReset");

// Guarda se a correção está ativada
let correcaoAtiva = false;


// ==========================================
// MOSTRAR O GRAU NA TELA
// ==========================================

function mostrarGrau(grau) {

    if (grau === 0) {
        grauValor.textContent = "0,00";
    } else {
        grauValor.textContent =
            "-" + grau.toFixed(2).replace(".", ",");
    }
}


// ==========================================
// ATUALIZAR A VISÃO
// ==========================================

function atualizarVisao() {

    const grau = Number(controleGrau.value);

    // Mostra o número escolhido
    mostrarGrau(grau);


    // --------------------------------------
    // SE A CORREÇÃO ESTIVER ATIVADA
    // --------------------------------------

    if (correcaoAtiva) {

        // A imagem fica totalmente nítida
        folheto.style.filter = "blur(0px)";

        statusTexto.textContent =
            "Visão após a correção";

        mensagemVisao.innerHTML = `
            <strong>
                A imagem está nítida! ✨
            </strong>

            <p>
                Nesta simulação, a correção representa
                a formação da imagem com foco adequado.
            </p>
        `;

        return;
    }


    // --------------------------------------
    // SEM MIOPIA
    // --------------------------------------

    if (grau === 0) {

        folheto.style.filter = "blur(0px)";

        statusTexto.textContent =
            "Visão sem miopia";

        mensagemVisao.innerHTML = `
            <strong>
                A imagem está nítida.
            </strong>

            <p>
                Neste exemplo, o grau selecionado é 0,00.
            </p>
        `;

        return;
    }


    // --------------------------------------
    // COM MIOPIA
    // --------------------------------------

    /*
        O valor do desfoque é calculado
        a partir do grau escolhido.

        -0,25 → 0,5px
        -1,00 → 2px
        -2,00 → 4px
        -3,00 → 6px
        -4,00 → 8px
        -5,00 → 10px
    */

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
            Grau selecionado:
            <strong>
                -${grau.toFixed(2).replace(".", ",")}
            </strong>
        </p>
    `;
}


// ==========================================
// CONTROLE DO GRAU
// ==========================================

controleGrau.addEventListener("input", function () {

    /*
        Toda vez que você arrastar a bolinha
        do controle, esta função será chamada.
    */

    atualizarVisao();

});


// ==========================================
// BOTÃO DE CORREÇÃO
// ==========================================

botaoCorrecao.addEventListener("click", function () {

    // Inverte o estado
    correcaoAtiva = !correcaoAtiva;


    if (correcaoAtiva) {

        // ----------------------------------
        // DEPOIS DA CORREÇÃO
        // ----------------------------------

        folheto.style.filter = "blur(0px)";

        statusTexto.textContent =
            "Visão após a correção";

        mensagemVisao.innerHTML = `
            <strong>
                Agora a imagem está nítida! ✨
            </strong>

            <p>
                A simulação representa a imagem
                depois da correção do foco.
            </p>
        `;

        botaoCorrecao.textContent =
            "↩ Voltar para antes";

        botaoCorrecao.classList.add("ativo");

    } else {

        // ----------------------------------
        // VOLTAR PARA A MIOPIA
        // ----------------------------------

        botaoCorrecao.textContent =
            "✨ Ver depois da correção";

        botaoCorrecao.classList.remove("ativo");

        atualizarVisao();
    }

});


// ==========================================
// BOTÃO RESET
// ==========================================

botaoReset.addEventListener("click", function () {

    // Volta o controle para -2,00
    controleGrau.value = "2";

    // Desativa a correção
    correcaoAtiva = false;

    // Volta o texto do botão
    botaoCorrecao.textContent =
        "✨ Ver depois da correção";

    botaoCorrecao.classList.remove("ativo");

    // Atualiza tudo
    atualizarVisao();

});


// ==========================================
// INICIAR O EXPERIMENTO
// ==========================================

// Começa com -2,00
atualizarVisao();