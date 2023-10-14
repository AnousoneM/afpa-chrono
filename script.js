// Declaration des elements html
const btnStart = document.getElementById('btn-start')
const btnPause = document.querySelector('#btn-pause')
const btnStop = document.querySelector('#btn-stop')
const spanInfo = document.querySelector('#span-info')

// initialisation du temps de départ
let tpsEcoule = 0

// création d'une variable qui permettra de savoir si nous avons mis le chrono sur pause
let pause = false

// Fonction permettant de lancer le chrono avec un paramètre de temps
function chrono(tempo = 0) {
    // on affiche le bouton pause
    btnPause.style.display = 'block'

    // ************************************************************************
    // Algo de calcul de nombre heures, minutes et secondes écoulées
    // ************************************************************************
    // On démarre avec le timestamp lorsque l'on clique sur start qu'on stock dans startTime
    var startTime = new Date();

    // on lance un setInterval
    decompte = setInterval(function () {

        // 1- Convertir en secondes ：
        var seconds = Math.round(
            (new Date().getTime() - startTime.getTime()) / 1000 + tempo);

        // 2- Extraire les heures:
        var hours = parseInt(seconds / 3600);
        seconds = seconds % 3600; // secondes restantes

        // 3- Extraire les minutes:
        var minutes = parseInt(seconds / 60);
        seconds = seconds % 60; // secondes restantes

        // 4- afficher dans le span
        spanInfo.innerHTML = ajouteUnZero(hours)
            + ":" + ajouteUnZero(minutes)
            + ":" + ajouteUnZero(seconds)

        tpsEcoule++

    }, 1000); // fin de function anonyme dans setInterval
}


// On ajoute un écouteur d'événement sur le bouton start
btnStart.addEventListener('click', function () {
    // Nous lançons notre fonction chrono sans paramètre pour que tempo soit égale à 0
    chrono()
    // puis nous cachons le bouton start
    btnStart.style.display = 'none'
    // puis nous affichons le bouton stop
    btnStop.style.display = 'block'

})

// on ajoute un écouteur d'événement sur le bouton stop
btnStop.addEventListener('click', function () {

    // nous vérifions si decompte est défini
    if (typeof (decompte) !== 'undefined') {
        // on cache le bouton pause
        btnPause.style.display = 'none'

        // Nous arrêtons le chrono en cours
        clearInterval(decompte)

        // et nous remettons toutes les variables dans leurs états initiales
        pause = false
        tpsEcoule = 0

        // Nous mettons à zero l'affichage du compteur
        spanInfo.innerText = '00:00:00'
        // puis nous affichons le bouton start
        btnStart.style.display = 'block'
        // puis nous cachons le bouton stop
        btnStop.style.display = 'none'
    }

})

// On ajoute un écouteur d'événement sur le bouton pause
btnPause.addEventListener('click', function () {
    // nous regardons l'état du pause
    if (pause == false) {
        // on stop notre interval
        clearInterval(decompte)

        // nous changeons le texte du bouton
        btnPause.innerText = 'Continuer'

        // et nous passons l'etat du bouton en pause en true
        pause = true
    } else {
        // on relance notre fonction chrono avec le tps deja ecoulé
        chrono(tpsEcoule)
        // nous changeons le texte du bouton
        btnPause.innerText = 'Pause'
        // et nous passons l'état du bouton en false
        pause = false
    }
})


// fonction permettant de rajouter un zéro selon condition 10aine ou pas
// La fonction prends en paramètre un nombre
function ajouteUnZero(tps) {
    if (tps <= 9) {
        return '0' + tps
    } else {
        return tps
    }
}