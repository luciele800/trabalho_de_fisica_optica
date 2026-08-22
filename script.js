/* =========================
   EXPERIMENTO DA VISÃO
========================= */


/* Pegando os elementos do HTML */

const visionType =
    document.getElementById("visionType");

const lens =
    document.getElementById("lens");

const eye =
    document.getElementById("eye");

const statusText =
    document.getElementById("status");

const explanation =
    document.getElementById("explanation");


/* Verificação de segurança */

if (
    visionType &&
    lens &&
    eye &&
    statusText &&
    explanation
) {


    function updateVision() {

        const type =
            visionType.value;

        const lensValue =
            Number(lens.value);


        let idealValue = 0;


        /*
            Estes valores são apenas
            parte da simulação educativa.
        */

        if (type === "myopia") {

            idealValue = 55;

        }


        if (type === "hyperopia") {

            idealValue = -55;

        }


        const difference =
            Math.abs(
                lensValue - idealValue
            );


        const blur =
            Math.min(
                13,
                difference / 5
            );


        /* Aplica o desfoque */

        eye.style.filter =
            "blur(" +
            blur +
            "px)";


        /* Pequena mudança visual */

        eye.style.transform =
            "scale(" +
            (1 + difference / 900) +
            ")";


        /* Mensagem */

        if (difference < 12) {

            statusText.textContent =
                "✨ Foco corrigido!";

            explanation.textContent =
                "A lente está próxima do ajuste usado nesta simulação.";

        } else {

            statusText.textContent =
                "◌ Ainda está desfocado";

            explanation.textContent =
                "Mova a barra para observar como a mudança da lente altera a nitidez.";

        }

    }


    /* Quando muda a situação */

    visionType.addEventListener(
        "change",
        function () {

            lens.value = 0;

            updateVision();

        }
    );


    /* Quando movimenta a lente */

    lens.addEventListener(
        "input",
        updateVision
    );


    /* Inicia o experimento */

    updateVision();

}



/* =========================
   QUIZ
========================= */


/* Botão */

const quizButton =
    document.getElementById("quizButton");


/* Resultado */

const quizResult =
    document.getElementById("quizResult");


/* Só executa se os elementos existirem */

if (
    quizButton &&
    quizResult
) {


    quizButton.addEventListener(
        "click",
        checkQuiz
    );


    function checkQuiz() {


        /* Respostas corretas */

        const answers = {

            q1: "a",

            q2: "b",

            q3: "a",

            q4: "b",

            q5: "b"

        };


        let score = 0;


        /* Verifica cada pergunta */

        for (
            const question in answers
        ) {


            const selected =
                document.querySelector(
                    'input[name="' +
                    question +
                    '"]:checked'
                );


            if (
                selected &&
                selected.value ===
                answers[question]
            ) {

                score++;

            }

        }


        /* Mostra o resultado */

        quizResult.style.display =
            "block";


        if (score === 5) {

            quizResult.textContent =
                "🎉 Você acertou 5 de 5! Excelente!";

        }

        else if (score >= 3) {

            quizResult.textContent =
                "👏 Você acertou " +
                score +
                " de 5! Muito bem!";

        }

        else {

            quizResult.textContent =
                "💡 Você acertou " +
                score +
                " de 5. Revise o conteúdo e tente novamente!";

        }

    }

}