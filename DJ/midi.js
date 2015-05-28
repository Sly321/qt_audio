var midi = null;  // global MIDIAccess object

function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midi);
  
  var inputs=midiAccess.inputs.values();
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = MIDIMessageEventHandler;
    haveAtLeastOneDevice = true;
  }
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

navigator.requestMIDIAccess( { sysex: true } ).then( onMIDISuccess, onMIDIFailure );

function listInputsAndOutputs( midiAccess ) {
  for (var input in midiAccess.inputs) {
    console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'" );
  }

  for (var output in midiAccess.outputs) {
    console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'" );
  }
}

function onMIDIMessage( event ) {
  var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
  for (var i=0; i<event.data.length; i++) {
    str += "0x" + event.data[i].toString(16) + " ";
  }
  console.log( str );
}

function startLoggingMIDIInput( midiAccess, indexOfPort ) {
  midiAccess.inputs.forEach( function(entry) {entry.value.onmidimessage = onMIDIMessage;});
}

function MIDIMessageEventHandler(event) {
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
		var para		= document.getElementById('eq1hp');
		slider.value 	= event.data[2] / 127 * 200;
		slider.value 	= event.data[1] == 14 ? 100: slider.value;
		musik.changeGainHigh(slider, para);
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
		if (musik.audio.duration > 0)
		{
			musik.playPauseTrigger(document.getElementById('play1'));
		}
	}

	// Musik1 stop
	if (event.data[0] == 144 && event.data[1] == 52 && event.data[2] == 127)
	{
		if (musik.audio.duration > 0 && musik.isPlaying)
		{
			musik.stop(document.getElementById('stop1'), document.getElementById('play1'));
		}
	}

	// Musik2 play/pause
	if (event.data[0] == 144 && event.data[1] == 50 && event.data[2] == 127)
	{
		if (musik.audio.duration > 0)
		{
			musik2.playPauseTrigger(document.getElementById('play2'));
		}
	}

	// Musik2 stop
	if (event.data[0] == 144 && event.data[1] == 52 && event.data[2] == 127)
	{
		if (musik.audio.duration > 0 && musik.isPlaying)
		{
			musik2.stop(document.getElementById('stop2'), document.getElementById('play2'));
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


/*
function midicontrollerEingebunden(midisource)
{
	var testinput = midisource.inputs.entries.next();
	if (input)
	    testinput.onmidimessage = echoMIDIMessage;
	    
	var inputs = midisource.inputs;
	var outputs = midisource.outputs;
	for(var input of inputs.values())
	{
		input.addEventListener('onMIDIMessage', onMIDIMessage);
		input.addEventListener('disconnect', midiDisconnect);
	}
	
	for(var output of outputs.values())
	{
		output.addEventListener('midiListener', midiListener);
	}
	
	
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}


function midiFailure()
{
	console.log('MIDI Failure.\nPlease try to active Midi in yor Chrome-Browser with:\n\nchrome://flags/#enable-web-midi');
}

function midiDisconnect()
{
	printInfo('Kein MIDI-Gerät gefunden.');
}

var initmidi = function()
{
	if (navigator.requestMIDIAccess())
	{
		navigator.requestMIDIAccess().then(midicontrollerEingebunden, midiFailure);
	}
	else
	{
		midiFailure();
	}
}

function onMIDIMessage(event)
{
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

initmidi();

console.log("test");
*/