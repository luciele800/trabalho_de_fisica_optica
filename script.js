document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTOS DO SITE
    // ==========================================

    const controleGrau =
        document.getElementById("grau");

    const textoGrau =
        document.getElementById("grauValor");

    const folheto =
        document.getElementById("folheto");

    const statusTexto =
        document.getElementById("statusTexto");

    const mensagem =
        document.getElementById("mensagem");

    const botaoCorrecao =
        document.getElementById("botaoCorrecao");

    const botaoReset =
        document.getElementById("botaoReset");


    // ==========================================
    // VERIFICAÇÃO
    // ==========================================

    if (
        !controleGrau ||
        !textoGrau ||
        !folheto ||
        !statusTexto ||
        !mensagem ||
        !botaoCorrecao ||
        !botaoReset
    ) {

        console.error(
            "Erro: algum elemento do experimento não foi encontrado."
        );

        return;
    }


    // ==========================================
    // ESTADO DA CORREÇÃO
    // ==========================================

    let correcaoAtiva = false;


    // ==========================================
    // MOSTRAR O GRAU
    // ==========================================

    function mostrarGrau(valor) {

        if (valor === 0) {

            textoGrau.textContent = "0,00";

            return;
        }


        textoGrau.textContent =
            "-" +
            valor.toFixed(2).replace(".", ",");
    }


    // ==========================================
    // ATUALIZAR O EXPERIMENTO
    // ==========================================

    function atualizarExperimento() {

        /*
            Pega o número da barra.

            Exemplo:

            0
            1
            2
            3
            4
            5
        */

        const valor =
            Number(controleGrau.value);


        // Mostra o grau

        mostrarGrau(valor);


        // --------------------------------------
        // SE A CORREÇÃO ESTÁ ATIVADA
        // --------------------------------------

        if (correcaoAtiva) {

            folheto.style.filter =
                "blur(0px)";

            statusTexto.textContent =
                "Visão após a correção";

            mensagem.innerHTML = `
                <strong>
                    A imagem está nítida! ✨
                </strong>

                <p>
                    Nesta simulação, a correção representa
                    uma imagem formada com foco adequado.
                </p>
            `;

            return;
        }


        // --------------------------------------
        // SEM GRAU
        // --------------------------------------

        if (valor === 0) {

            folheto.style.filter =
                "blur(0px)";

            statusTexto.textContent =
                "Visão sem miopia";

            mensagem.innerHTML = `
                <strong>
                    A imagem está nítida.
                </strong>

                <p>
                    Grau selecionado: 0,00.
                </p>
            `;

            return;
        }


        // --------------------------------------
        // COM MIOPIA
        // --------------------------------------

        /*
            Cada 1 grau = 2px de desfoque.

            0,25 → 0,5px
            0,50 → 1px
            1,00 → 2px
            2,00 → 4px
            3,00 → 6px
            4,00 → 8px
            5,00 → 10px
        */

        const quantidadeBlur =
            valor * 2;


        folheto.style.filter =
            `blur(${quantidadeBlur}px)`;


        statusTexto.textContent =
            "Visão com miopia";


        mensagem.innerHTML = `
            <strong>
                A imagem está desfocada.
            </strong>

            <p>
                Grau selecionado:
                <strong>
                    -${valor.toFixed(2).replace(".", ",")}
                </strong>
            </p>
        `;
    }


    // ==========================================
    // BARRA DE GRAU
    // ==========================================

    controleGrau.addEventListener(
        "input",
        function () {

            /*
                IMPORTANTE:

                "input" faz a mudança acontecer
                ENQUANTO você arrasta a bolinha.

                Não precisa soltar o mouse.
            */

            atualizarExperimento();

        }
    );


    // ==========================================
    // BOTÃO DE CORREÇÃO
    // ==========================================

    botaoCorrecao.addEventListener(
        "click",
        function () {

            // Inverte o estado

            correcaoAtiva =
                !correcaoAtiva;


            // ----------------------------------
            // CORREÇÃO ATIVADA
            // ----------------------------------

            if (correcaoAtiva) {

                folheto.style.filter =
                    "blur(0px)";

                statusTexto.textContent =
                    "Visão após a correção";

                mensagem.innerHTML = `
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

                botaoCorrecao.classList.add(
                    "corrigido"
                );

            }


            // ----------------------------------
            // CORREÇÃO DESATIVADA
            // ----------------------------------

            else {

                botaoCorrecao.textContent =
                    "✨ Ver depois da correção";

                botaoCorrecao.classList.remove(
                    "corrigido"
                );

                atualizarExperimento();
            }

        }
    );


    // ==========================================
    // BOTÃO REINICIAR
    // ==========================================

    botaoReset.addEventListener(
        "click",
        function () {

            // Volta para -2,00

            controleGrau.value = "2";


            // Desativa correção

            correcaoAtiva = false;


            // Volta o botão

            botaoCorrecao.textContent =
                "✨ Ver depois da correção";

            botaoCorrecao.classList.remove(
                "corrigido"
            );


            // Atualiza tudo

            atualizarExperimento();

        }
    );


    // ==========================================
    // INICIAR O SITE
    // ==========================================

    atualizarExperimento();

});