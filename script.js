/* =========================
   EXPERIMENTO
========================= */

const visionType = document.getElementById("visionType");
const lens = document.getElementById("lens");
const eye = document.getElementById("eye");
const statusText = document.getElementById("status");
const explanation = document.getElementById("explanation");


function updateVision() {

    const type = visionType.value;

    const lensValue = Number(lens.value);

    let idealValue = 0;


    /*
        Valores usados apenas para
        representar o funcionamento
        do experimento.
    */

    if (type === "myopia") {
        idealValue = 55;
    }

    if (type === "hyperopia") {
        idealValue = -55;
    }


    const difference =
        Math.abs(lensValue - idealValue);


    const blur =
        Math.min(13, difference / 5);


    eye.style.filter =
        "blur(" + blur + "px)";


    eye.style.transform =
        "scale(" +
        (1 + difference / 900) +
        ")";


    if (difference < 12) {

        statusText.textContent =
            "✨ Foco corrigido no modelo";

        explanation.textContent =
            "A lente está próxima do ajuste usado nesta simulação.";

    } else {

        statusText.textContent =
            "◌ Ainda há desfoco";

        explanation.textContent =
            "Mova a barra e observe como a mudança da lente altera a nitidez.";

    }

}


/* Quando muda o tipo de visão */

visionType.addEventListener(
    "change",
    function () {

        lens.value = 0;

        updateVision();

    }
);


/* Quando mexe na barra */

lens.addEventListener(
    "input",
    updateVision
);


/* Inicia o experimento */

updateVision();



/* =========================
   QUIZ
========================= */

const quizButton =
    document.getElementById("quizButton");


quizButton.addEventListener(
    "click",
    checkQuiz
);


function checkQuiz() {

    const answers = {

        q1: "a",
        q2: "b",
        q3: "a",
        q4: "b",
        q5: "b"

    };


    let score = 0;


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
            selected !== null &&
            selected.value === answers[question]
        ) {

            score++;

        }

    }


    const result =
        document.getElementById(
            "quizResult"
        );


    result.style.display = "block";


    if (score === 5) {

        result.innerHTML =
            "🎉 Você acertou 5 de 5! Excelente!";

    }

    else if (score >= 3) {

        result.innerHTML =
            "👏 Você acertou " +
            score +
            " de 5! Muito bem!";

    }

    else {

        result.innerHTML =
            "💡 Você acertou " +
            score +
            " de 5. Vale a pena revisar o conteúdo.";

    }

}