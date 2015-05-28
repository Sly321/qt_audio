/** Erstellen der Objecte mit den Audiodatei url */
var musik = new AudioDatei("comwws.mp3");
var musik2 = new AudioDatei("eott.mp3");

/** Initialisiert so einiges damit die Musik dann auch dort rauskommt wo und wie sie soll - need */
musik.init();
musik2.init();
var cf = new Crossfader(musik, musik2);

/** Setzt die Zeitupdates bei veränderungen in den <p> damit man sieht wo man ist können wir
	dann mit variablen machen damit da evtl sich div's oder so bewegen. */
var updateTimer = setInterval(update, 0.1);

function update() {
	document.getElementById("informations").innerHTML = musik.informations();
	document.getElementById("informations2").innerHTML = musik2.informations();
}