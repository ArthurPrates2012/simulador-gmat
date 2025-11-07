import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // 🟨 cor da paleta principal (FAD419)
  const mainColor = "#FAD419";

  // Função que simula a busca das questões (pode vir de um CSV no futuro)
  const fetchQuestions = async (num) => {
    const mockData = [
      {
        question: "Quanto é 12 + 8?",
        options: ["18", "20", "22", "24"],
        answer: "20",
      },
      {
        question: "Qual é o valor de 9²?",
        options: ["18", "81", "27", "36"],
        answer: "81",
      },
      {
        question: "Se x = 3 e y = 2x, qual é o valor de y?",
        options: ["3", "5", "6", "9"],
        answer: "6",
      },
      {
        question: "A raiz quadrada de 144 é:",
        options: ["10", "12", "14", "16"],
        answer: "12",
      },
      {
        question: "Em uma PA com a1=3 e r=2, qual é o 5º termo?",
        options: ["9", "11", "13", "15"],
        answer: "11",
      },
    ];
    // embaralhar e escolher
    return mockData.sort(() => 0.5 - Math.random()).slice(0, num);
  };

  const startQuiz = async () => {
    const q = await fetchQuestions(parseInt(numQuestions));
    setQuestions(q);
    setTimeLeft(parseInt(numQuestions) * 1.5 * 60); // 1.5 min por questão
    setQuizStarted(true);
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      setQuizFinished(true);
    }
  }, [timeLeft, quizStarted, quizFinished]);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = option;
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!quizStarted)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h1 style={{ color: mainColor }}>Simulado GMAT</h1>
        <input
          type="number"
          placeholder="Número de questões"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "8px" }}
        />
        <br />
        <button
          onClick={startQuiz}
          style={{
            background: mainColor,
            color: "#000",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Iniciar Simulado
        </button>
      </div>
    );

  if (quizFinished)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2 style={{ color: mainColor }}>Resultado</h2>
        {questions.map((q, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <b>{q.question}</b>
            <br />
            <span
              style={{
                color:
                  answers[i] === q.answer
                    ? "green"
                    : answers[i]
                    ? "red"
                    : "gray",
              }}
            >
              {answers[i]
                ? answers[i] === q.answer
                  ? "✔ Correta"
                  : `✖ Errada (resposta: ${q.answer})`
                : "Não respondida"}
            </span>
          </div>
        ))}
      </div>
    );

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2 style={{ color: mainColor }}>Tempo restante: {formatTime(timeLeft)}</h2>
      <h3>
        Questão {currentQuestion + 1} de {questions.length}
      </h3>
      <p style={{ fontSize: "18px" }}>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            borderRadius: "8px",
            background: mainColor,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default App;


