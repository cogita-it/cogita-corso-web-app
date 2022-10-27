// JavaScript Playground. Questo è un commento!

// Variables
let nome = "Mike";
let anni = 10;

// Mike diventa un anno più grande
anni = 11;

// Stampare il risultato
console.log("Mike ha " + anni + " anni");

// Condizioni. Mike è maggiorenne?
if (anni >= 18) {
  console.log("Mike è maggiorenne!");
} else {
  console.log("Mike non è maggiorenne");
}

// Cicli. Stampa 5 volte il nome
for (let i = 0; i < 5; i++) {
  console.log(nome);
}

// Funzioni. Trasformare o fare operazioni con dei dati.
function saluta(nomeDaSalutare: string) {
  console.log("Ciao " + nomeDaSalutare);
}

// Eseguire una funzione
saluta(nome);

// Le funzioni possono essere scritte anche così
let salutoAlternativo = (nomeDaSalutare: string) => {
  console.log("Saluto alternativo per " + nomeDaSalutare);
};

// È possibile passare delle funzioni come argomenti ad altre funzioni
let chiamaUnaFunzionePerMe = (funzione: () => void) => {
  funzione();
};

chiamaUnaFunzionePerMe(() => salutoAlternativo(nome));

// Oggetti. Come rappresentare il mondo reale in codice
interface Persona {
  nome: string;
  anni: number;
  miglioreAmico?: Persona;
}

let martina: Persona = {
  nome: "Martina",
  anni: 28,
};

let alex: Persona = {
  nome: "Alex",
  anni: 25,
  miglioreAmico: martina,
};

let determinaMiglioreAmico = (persona: Persona) => {
  console.log(
    "Il migliore amico di " + persona.nome + " è " + persona.miglioreAmico?.nome
  );
};

// Chiamiamo la funzione per alex
determinaMiglioreAmico(alex);

// Se facciamo la stessa cosa per Martina,
// non funzionerà, perché l'oggetto "martina" non ha il dato "miglioreAmico"

// Creiamo un altro amico in comune
let giovanna = {
  nome: "Giovanna",
  anni: 26,
  miglioreAmico: martina,
};

// Array. Collezione di dati
let amici: Persona[] = [martina, alex, giovanna];

// Stampare tutti i nomi degli amici
amici.forEach((amico) => {
  console.log(amico.nome);
});

// Stampiamo il nome degli amici che hanno più di 25 anni
let stampaAmiciGrandi = (amiciDaStampare: Persona[]) => {
  amiciDaStampare.forEach((amico) => {
    if (amico.anni > 25) {
      console.log(amico.nome + " ha più di 25 anni");
    }
  });
};

stampaAmiciGrandi(amici);

// Continua su: https://it.javascript.info

export default {};
