// src/components/PollConfig.js

// Images can be local or hosted
const seedsList = [
    { id: 1, name: "Tournesol", img: "/images/tournesol.jpg" },
    { id: 2, name: "Érable", img: "/images/erable.jpg" },
    { id: 3, name: "Haricot", img: "/images/haricot.jpg" },
    { id: 4, name: "Olivier", img: "/images/olivier.jpg" },
    { id: 5, name: "Pavot", img: "/images/pavot.jpg" },
    { id: 6, name: "Tilleul", img: "/images/tilleul.jpg" },
    // Add more seeds as needed
];

// For the fake/imaginary seed question
const fakeSeedsList = [
    { id: 101, name: "Sculpture A", img: "/images/sculpture-a.jpg", isFake: false },
    { id: 102, name: "Sculpture B", img: "/images/sculpture-b.jpg", isFake: false },
    { id: 103, name: "Sculpture C", img: "/images/sculpture-c.jpg", isFake: false },
    { id: 104, name: "Sculpture D", img: "/images/sculpture-d.jpg", isFake: false },
    { id: 105, name: "Imaginaire", img: "/images/sculpture-imaginaire.jpg", isFake: true },
];

// Main configuration array
const PollConfig = () => [
    {
        type: "single-seed",
        question: "Quelle est votre graine préférée ?",
        seeds: seedsList,
        name: "favorite-seed"
    },
    {
        type: "text",
        question: "Pourquoi ?",
        name: "favorite-seed-reason"
    },
    {
        type: "multi-seed",
        question: "Avez-vous reconnu des graines que vous connaissiez ? Lesquelles ?",
        seeds: seedsList,
        name: "recognized-seeds",
    },
    {
        type: "three-words",
        question: "Quand on vous dit le mot graine, vous pensez spontanément à quoi ? (trois mots)",
        name: "three-spontaneous-words"
    },

    {
        type: "seed-three-words",
        question: "Quand vous voyez cette graine, quels sont les trois premiers mots qui vous viennent à l'esprit ?",
        seeds: seedsList,
        name: "three-words-about-a-seed",
    },
    {
        type: "seed-three-words",
        question: "Idem avec celle-là",
        seeds: seedsList,
        name: "three-words-about-a-second-seed",
    },

    {
        type: "fake-seed",
        question: "D'après vous, quelle est la graine qui n'existe pas parmi celles-ci ?",
        seeds: fakeSeedsList,
        name: "fake-seed-guess",
    },
    {
        type: "likert-group",
        question: "Avez-vous vu dans l'exposition quelque chose que vous n'aviez pas vu jusqu'à présent ?",
        items: [
            "Des formes de graines surprenantes",
            "La beauté de certaines graines",
            "Les différences individuelles de deux graines d'une même espèce"
        ],
        name: "likert-group",
    },
    {
        type: "radio-list",
        question: "Qu'est-ce que l'exposition vous a apporté ?",
        options: [
            "Rien",
            "Mieux comprendre la valeur des graines",
            "Découvrir des graines inconnues",
            "Apprécier la beauté et la singularité des graines",
            "Prendre le temps de mieux regarder les graines",
            "Autre chose"
        ],
        name: "benefits-of-the-exhibition",
    },
    {
        type: "agree-disagree-list",
        question: "Pensez-vous que l'exposition changera votre regard à l'avenir sur les graines et les plantes ?",
        statements: [
            "Oui, car j'y ferai plus attention",
            "Oui, car je les regarderai mieux",
            "Oui, car j'apprécierai mieux leur importance pour nous",
            "Non, car je connaissais déjà tout ça",
            "Non, car ça ne m'intéresse pas",
            "Non, car je préfère regarder les animaux"
        ],
        showOther: true,
        name: "paradigm-shift",
    },
    // Subsidiary (important) questions
    {
        type: "demographics",
        question: "Questions subsidiaires",
        name: "demographics",
    },
    {
        type: "text",
        question: "Quelle est votre plante préférée ?",
        name: "favoritePlant"
    },
    {
        type: "text",
        question: "Pouvez-vous nous dire pourquoi ?",
        name: "favoritePlantReason"
    },
    {
        type: "consent",
        question: "Nous autorisez-vous à garder ces données anonymes pour une recherche sur les relations aux plantes ?",
        name: "consent",
    }
];

export default PollConfig;
