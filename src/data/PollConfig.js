const baseUrl = import.meta.env.BASE_URL;

// For question 1 : favorite seed
const seedsList = [
    {id: 1, name: "Althéa", img: baseUrl + "/images/1/althea.jpg"},
    {id: 2, name: "Arbouse", img: baseUrl + "/images/1/arbouse2.jpg"},
    {id: 3, name: "Baobab", img: baseUrl + "/images/1/baobab.jpg"},
    {id: 4, name: "Cacao", img: baseUrl + "/images/1/cacao.jpg"},
    {id: 5, name: "chataigne d'eau", img: baseUrl + "/images/1/chataigne_d_eau.jpg"},
    {id: 6, name: "Enterobolium", img: baseUrl + "/images/1/enterolobium.jpg"},
    {id: 7, name: "Euphorbe", img: baseUrl + "/images/1/euphorbe.jpg"},
    {id: 8, name: "Hévéa", img: baseUrl + "/images/1/Hevea.jpg"},
    {id: 9, name: "Lilas", img: baseUrl + "/images/1/lilas.jpg"},
    {id: 10, name: "Lithops", img: baseUrl + "/images/1/lithops.jpg"},
    {id: 11, name: "Lithops fermé", img: baseUrl + "/images/1/lithops-ferme.jpg"},
    {id: 12, name: "Samares d'érable", img: baseUrl + "/images/1/samares_erables.jpg"},
    {id: 13, name: "Sauge", img: baseUrl + "/images/1/sauge.jpg"},
    {id: 14, name: "Souci", img: baseUrl + "/images/1/Souci.jpg"},
    {id: 15, name: "Tabac", img: baseUrl + "/images/1/Tabac.jpg"},
];

// For question 3 : recognized seed
const recognizedSeedList = [
    {id: 101, name: "Arachide", img: baseUrl + "/images/3/arachide.jpg"},
    {id: 102, name: "Café", img: baseUrl + "/images/3/Cafe.jpg"},
    {id: 103, name: "Lierre", img: baseUrl + "/images/3/dans-le-zome3.jpg"},
    {id: 104, name: "Églantine", img: baseUrl + "/images/3/Eglantine.jpg"},
    {id: 105, name: "Haricot", img: baseUrl + "/images/3/haricot.jpg"},
    {id: 106, name: "Samares d'érable", img: baseUrl + "/images/3/samares_erables.jpg"},
];

// For question 5 : Three words about a seed
const threeWordsAboutASeedList = [
    {id: 201, name: "Althéa", img: baseUrl + "/images/5/althea.jpg"},
    {id: 202, name: "Chataigne d'eau", img: baseUrl + "/images/5/chataigne_d_eau.jpg"},
    {id: 203, name: "Euphorbe", img: baseUrl + "/images/5/euphorbe.jpg"},
    {id: 204, name: "Pépin de raisin", img: baseUrl + "/images/5/Pepin-raisin2.png"},
    {id: 205, name: "Sauge", img: baseUrl + "/images/5/Sauge.JPG"},
    {id: 206, name: "Tabac", img: baseUrl + "/images/5/tabac.JPG"},
]
// For question 7 : the fake/imaginary seed question
const fakeSeedsList = [
    {id: 301, name: "Campanule", img: baseUrl + "/images/7/Campanule.jpg", isFake: false},
    {id: 302, name: "Cyprus", img: baseUrl + "/images/7/cyprus.jpg", isFake: false},
    {id: 303, name: "Euonymus", img: baseUrl + "/images/7/Euonymus.jpg", isFake: false},
    {id: 304, name: "Lavatere", img: baseUrl + "/images/7/lavatere.jpg", isFake: false},
    {id: 305, name: "Lychnis", img: baseUrl + "/images/7/lychnis.jpg", isFake: true},
    {id: 306, name: "Tetragone", img: baseUrl + "/images/7/tetragone.jpg", isFake: true},
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
        seeds: recognizedSeedList,
        name: "recognized-seeds",
    },
    {
        type: "three-words",
        question: "Quand on vous dit le mot graine, vous pensez spontanément à quoi ? (trois mots)",
        name: "three-spontaneous-words",
    },

    {
        type: "seed-three-words",
        question: "Quand vous voyez cette graine, quels sont les trois premiers mots qui vous viennent à l'esprit ?",
        seeds: threeWordsAboutASeedList,
        name: "three-words-about-a-seed-1",
        seedId: 204,
        value :{ id: null, name: null, words: ["", "", ""] }
    },

    {
        type: "seed-three-words",
        question: "Quand vous voyez cette graine, quels sont les trois premiers mots qui vous viennent à l'esprit ?",
        seeds: threeWordsAboutASeedList,
        name: "three-words-about-a-seed-2",
        seedId: 202,
        value :{ id: null, name: null, words: ["", "", ""] }
    },

    {
        type: "seed-three-words",
        question: "Quand vous voyez cette graine, quels sont les trois premiers mots qui vous viennent à l'esprit ?",
        seeds: threeWordsAboutASeedList,
        name: "three-words-about-a-seed-3",
        seedId: 203,
        value :{ id: null, name: null, words: ["", "", ""] }
    },

    {
        type: "seed-three-words",
        question: "Quand vous voyez cette graine, quels sont les trois premiers mots qui vous viennent à l'esprit ?",
        seeds: threeWordsAboutASeedList,
        name: "three-words-about-a-seed-4",
        seedId: 205,
        value :{ id: null, name: null, words: ["", "", ""] }
    },

    {
        type: "fake-seed",
        question: "D'après vous, quelle est la graine qui n'existe pas parmi celles-ci ?",
        seeds: fakeSeedsList,
        name: "fake-seed-guess",
    },
    {
        type: "likert-group",
        question: "Avez-vous vu dans l'exposition quelque chose de frappant ?",
        items: [
            "Des formes de graines surprenantes",
            "La beauté de certaines graines",
            "Les différences individuelles de deux graines d'une même espèce"
        ],
        scaleLabels: [
            "Non, pas du tout",
            "Non, pas vraiment",
            "Oui, un peu",
            "Oui, tout à fait",
        ],
        name: "likert-group",
    },
    {
        type: "checkbox-list",
        question: "Qu'est-ce que l'exposition vous a apporté ?",
        options: [
            "Rien",
            "Mieux comprendre la valeur des graines",
            "Découvrir des graines inconnues",
            "Apprécier la beauté et la singularité des graines",
            "Prendre le temps de mieux regarder les graines",
            "Une émotion esthétique",
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

    {
        type: "likert-group",
        question: "",
        items: [
            "J'ai aimé cette exposition avec les graines",
        ],
        scaleLabels: [
            "pas du tout",
            "pas trop",
            "un peu",
            "beaucoup"
        ],
        name: "likert-exhibition",
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
    },
];


export default PollConfig;
