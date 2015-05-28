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


///Midi Part

initmidi();

function bindMidi(midi)
{
	var inputs = midi.inputs;
	for(var input of inputs.values())
	{
		console.log(input);
		input.connection = "open";
		input.addEventListener('midiListener', midiListener);
	}
}

function midiFailure()
{
	console.log('MIDI Failure.\nPlease try to active Midi in yor Chrome-Browser with:\n\nchrome://flags/#enable-web-midi');
}

function midiDisconnect()
{
	printInfo('Kein MIDI-Gerät gefunden.');
}

function initmidi()
{
	if (navigator.requestMIDIAccess)
	{
		navigator.requestMIDIAccess().then(bindMidi, midiFailure);
	}
	else
	{
		midiFailure();
	}
}

function midiListener(event)
{
	console.log("Event");
	// Event fuer den Crossfader
	if (event.data[0] == 176 && event.data[1] == 8)
	{
		var slider = document.getElementById('cross');
		slider.value = event.data[2] / 127 * 100;
		cf.change(slider);
	}

	// Lautstaerke Audio1
	if (event.data[0] == 176 && event.data[1] == 12)
	{
		var slider 		= document.getElementById('vol1');
		slider.value 	= event.data[2] / 127 * 100;
		musik.volume(slider);
	}

	// Lautstaerke Audio2
	if (event.data[0] == 176 && event.data[1] == 13)
	{
		var slider 		= document.getElementById('vol2');
		slider.value 	= event.data[2] / 127 * 100;
		musik2.volume(slider);
	}

	// Equalizer fuer die hoehen Audio1
	if ((event.data[0] == 176 && event.data[1] == 20) | (event.data[0] == 144 && event.data[1] == 14))
	{
		var slider 		= document.getElementById('eq1h');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 14 ? 100: slider.value;
		musik.changeGainHigh(slider);
	}

	// Equalizer fuer die mitten Audio1
	if ((event.data[0] == 176 && event.data[1] == 21) | (event.data[0] == 144 && event.data[1] == 15))
	{
		var slider 		= document.getElementById('eq1m');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 15 ? 100: slider.value;
		musik.changeGainMid(slider);
	}

	// Equalizer fuer die tiefen Audio1
	if ((event.data[0] == 176 && event.data[1] == 23) | (event.data[0] == 144 && event.data[1] == 17))
	{
		var slider 		= document.getElementById('eq1l');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 17 ? 100: slider.value;
		musik.changeGainLow(slider);
	}

	// Equalizer fuer die hoehen Audio2
	if ((event.data[0] == 176 && event.data[1] == 24) | (event.data[0] == 144 && event.data[1] == 18))
	{
		var slider 		= document.getElementById('eq2h');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 18 ? 100: slider.value;
		musik2.changeGainHigh(slider);
	}

	// Equalizer fuer die mitten Audio2
	if ((event.data[0] == 176 && event.data[1] == 25) | (event.data[0] == 144 && event.data[1] == 19))
	{
		var slider 		= document.getElementById('eq2m');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 19 ? 100: slider.value;
		musik2.changeGainMid(slider);
	}

	// Equalizer fuer die tiefen Audio1
	if ((event.data[0] == 176 && event.data[1] == 27) | (event.data[0] == 144 && event.data[1] == 21))
	{
		var slider 		= document.getElementById('eq2l');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 21 ? 100: slider.value;
		musik2.changeGainLow(slider);
	}

	// Musik1 play/pause
	if (event.data[0] == 144 && event.data[1] == 50 && event.data[2] == 127)
	{
		if (audio.sample[0].duration > 0)
		{
			var button = document.getElementById('a1b1');
			musik.playPauseTrigger(button);
		}
	}

	// Musik1 stop
	if (event.data[0] == 144 && event.data[1] == 52 && event.data[2] == 127)
	{
		if (audio.sample[0].duration > 0 && musik.isPlaying)
		{
			musik.stop();
		}
	}

	// Musik2 play/pause
	if (event.data[0] == 144 && event.data[1] == 50 && event.data[2] == 127)
	{
		if (audio.sample[0].duration > 0)
		{
			var button = document.getElementById('a2b1');
			musik2.playPauseTrigger(button);
		}
	}

	// Musik2 stop
	if (event.data[0] == 144 && event.data[1] == 52 && event.data[2] == 127)
	{
		if (audio.sample[0].duration > 0 && musik.isPlaying)
		{
			musik2.stop();
		}
	}

	// Tempo musik1
	if (event.data[0] == 176 && event.data[1] == 12)
	{
		var slider 		= document.getElementById('tempo1');
		slider.value 	= event.data[2] / 127 * 100;
		musik.tempo(slider);
	}

	// Tempo musik2
	if (event.data[0] == 176 && event.data[1] == 13)
	{
		var slider 		= document.getElementById('tempo2');
		slider.value 	= event.data[2] / 127 * 100;
		musik2.tempo(slider);
	}
}
