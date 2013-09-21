Instinct = Object()

/*

blink = new Object();

function light(id, enable) {
    if (enable == blink) {
        bval = 0x7f;
        val = 0;
    } else {
        bval = 0;
        val = enable?0x7f:0;
    }
    midi.sendShortMsg(0x90, id, val);
    midi.sendShortMsg(0x90, id + 0x30, bval);
}

function simpleButton(id) {
    return function(val, group) {
        var btn = (group == "[Channel1]")?(id):(id+20);

        light(btn, !!val);
    }
}

LEDs = [
    ["loop_start_position", simpleButton(1)],
    ["loop_end_position", simpleButton(2)],
    ["loop_enabled", simpleButton(51)],
    ["loop_enabled", simpleButton(52)],
    ["hotcue_1_enabled", simpleButton(5)],
    ["hotcue_2_enabled", simpleButton(6)],
    ["hotcue_3_enabled", simpleButton(7)],
    ["hotcue_4_enabled", simpleButton(8)],
    ["flanger", simpleButton(67)],
    ["play", simpleButton(15)],
    ["pfl", simpleButton(16)],
    ["beat_active", simpleButton(18)],
];
*/


/*
#  Lets map out the controls
HerculesInstinct.controls = {
    0x18: { "channel": 1, "name": "loadA",      "type": "button" },
    0x32: { "channel": 2, "name": "loadB",      "type": "button" },
    0x12: { "channel": 1, "name": "pitchbend+",     "type": "button" },
    0x11: { "channel": 1, "name": "pitchbend-",     "type": "button" },
    0x2C: { "channel": 2, "name": "pitchbend+",     "type": "button" },
    0x2B: { "channel": 2, "name": "pitchbend-",     "type": "button" },
    0x17: { "channel": 1, "name": "sync",           "type": "button" },
    0x31: { "channel": 2, "name": "sync",           "type": "button" },
    0x16: { "channel": 1, "name": "play",           "type": "button" },
    0x30: { "channel": 2, "name": "play",           "type": "button" },
    0x15: { "channel": 1, "name": "cue",            "type": "button" },
    0x2F: { "channel": 2, "name": "cue",            "type": "button" },
    0x1A: { "channel": 1, "name": "scratch",        "type": "button" },
    0x3F: { "channel": 2, "name": "scratch",        "type": "button" },
#    0x30: { "channel": 1, "name": "wheel",      "type": "pot" },
#    0x31: { "channel": 2, "name": "wheel",      "type": "pot" },
    0x36: { "channel": 1, "name": "up",         "type": "button" },
    0x37: { "channel": 1, "name": "down",         "type": "button" },
    0x39: { "channel": 1, "name": "folder",         "type": "button" },
    0x38: { "channel": 1, "name": "files",      "type": "button" },
    0x41: { "channel": 1, "name": "headphone+",      "type": "button" },
    0x40: { "channel": 1, "name": "headphone-",      "type": "button" },

# these guys are weird
# will require code
    0x34: { "channel": 1, "name": "mastertempo", "type": "button" },
    0x35: { "channel": 2, "name": "mastertempo", "type": "button" },


# some weird mode,1,2,3,4 buttons
# i have to read manual
    0x05: { "channel": 1, "name": "K1",             "type": "button" },
    0x06: { "channel": 1, "name": "K2",             "type": "button" },
    0x07: { "channel": 1, "name": "K3",             "type": "button" },
    0x08: { "channel": 1, "name": "K4",             "type": "button" },

    0x1F: { "channel": 2, "name": "K1",             "type": "button" },
    0x20: { "channel": 2, "name": "K2",             "type": "button" },
    0x21: { "channel": 2, "name": "K3",             "type": "button" },
    0x22: { "channel": 2, "name": "K4",             "type": "button" },

    0x09: { "channel": 1, "name": "loopstart",      "type": "button" },
    0x0A: { "channel": 1, "name": "loopend",        "type": "button" },
    0x0B: { "channel": 1, "name": "loopdivide",     "type": "button" },
    0x0C: { "channel": 1, "name": "loopmultiply",   "type": "button" },

    0x23: { "channel": 2, "name": "loopstart",      "type": "button" },
    0x24: { "channel": 2, "name": "loopend",        "type": "button" },
    0x25: { "channel": 2, "name": "loopdivide",     "type": "button" },
    0x26: { "channel": 2, "name": "loopmultiply",   "type": "button" },

    0x01: { "channel": 1, "name": "FX1",             "type": "button" },
    0x02: { "channel": 1, "name": "FX2",             "type": "button" },
    0x03: { "channel": 1, "name": "FX3",             "type": "button" },
    0x04: { "channel": 1, "name": "FX4",             "type": "button" },

    0x1B: { "channel": 2, "name": "FX1",             "type": "button" },
    0x1C: { "channel": 2, "name": "FX2",             "type": "button" },
    0x1D: { "channel": 2, "name": "FX3",             "type": "button" },
    0x1E: { "channel": 2, "name": "FX4",             "type": "button" },

}
*/
    
// Number of the standard RPM value. Lower values increase de sensitivity as the really records.
standardRpm = 33.33;

// The alpha value for the filter (start with 1/8 (0.125) and tune from there)
alpha = 1/8;

// The beta value for the filter (start with alpha/32 and tune from there)
beta = alpha/20;

// Timer to disable the scratch if the "jog wheel" is stopped for "x" milliseconds (default = 60)
scratchResetTime = 60;

// Seconds to the end of track after which cue button blink (default = 30)
secondsBlink = 30;

// Tune the jog sensitivity when the scratch mode is disabled (default = 1, increase for increase the sensitivity
jogSensitivity = 0.8;



superButtonHold = 0;
scratchButton = 0;
scratchMode = 0;
scratchTimer = 0;
wheelMove = [0,0];
pitchIncrementRelative = 0;
//scratchFactor = 0;
//jogPitchFactor = 0;


Instinct.init = function(id) {
    HerculesInstinct.init(id);

    // Set up LEDs
    for (var i = 0; i < 2; i += 1) {
        group = "[Channel" + (i+1) + "]";

        for (var j in LEDs) {
            var control = LEDs[j][0];
            var func = LEDs[j][1];

            engine.connectControl(group, control, func);
            engine.trigger(group, control);
        }
    }
}

var c1 = '[Channel1]'
var c2 = '[Channel2]'

Instinct.incomingData = function(data, length) {
    for (var i = 0; i < length; i += 3) {
        var status = data[i];
        var midino = data[i+1];
        var value = data[i+2];
        var group = c1;
        var f = null;

        switch ((status<<8 | midino) {
            case 0xb031:
                group = c2;
            case 0xb030:
                f = HerculesInstinct.jogWheel;

            case 0x9033:
                group = c2;
            case 0x9019:
                f = HerculesInstinct.loadTrack;
                break;

            case 0xb035:
                group = c2;
            case 0xb034:
                f = HerculesInstinct.pitch;
                break;

            case 0x902c:
            case 0x902b:
                group = c2;
            case 0x9011:
            case 0x9012:
                f = HerculesInstinct.pitchBend; 


            case 0x9031: 
                group = c2; 
            case 0x9017:
                f = HerculesInstinct.sync;
                break;
            
            case 0x9030: 
                group = c2; 
            case 0x9016:
                if (value == 0) return;
                f = "play";
                value = ! engine.getValue(group, f);
                break;

            case 0x902f: 
                group = c2;
            case 0x9015:
                f = HerculesInstinct.cue;
                break;

            case 0x902d: 
                group = c2;
            case 0x9013:
                f = "back";
                break;

            case 0x902d: 
                group = c2;
            case 0x9014:
                f = "fwd";
                break;

            case 0x9036:
                group = '[Playlist]';
                f = 'SelectPrevTrack';
                break;
            case 0x9037:
                group = '[Playlist]';
                f = 'SelectNextTrack';
                break;

            case 0x903d:
                f = HerculesInstinct.scratch;
                break;

            case 0xb03b: 
                group = c2;
            case 0xb036:
                engine.setValue(group, "volume", script.absoluteLin(value, 0, 1));
                break;
 
            case 0xb037: 
                group = c2;
            case 0xb03c:
                engine.setValue(group, "filterHigh", script.absoluteNonLin(value, 0, 1, 4));
                break;

            case 0xb038: 
                group = c2;
            case 0xb03d:
                engine.setValue(group, "filterMid", script.absoluteNonLin(value, 0, 1, 4));
                break;

            case 0xb039: 
                group = c2;
            case 0xb03e:
                engine.setValue(group, "filterLow", script.absoluteNonLin(value, 0, 1, 4));
                break;
                
            case 0xb03a:
                engine.setValue('[Master]', 'crossfader', script.absoluteLin(value, -1, 1));
                break;
           

        }

        if (typeof(f) == 'string') {
            engine.setValue(group, f, (value>0)?1:0);
        } else if (f) {
            f(0, midino, value, status, group);
        }

}


/*  This is old bits of code, that i'll slowly be stripping from

        switch ((status<<8) | midino) {
            case 0x9001: case 0x9015:
            case 0x9002: case 0x9016:
            case 0x9003: case 0x9017:
            case 0x9004: case 0x9018:
            case 0x9005: case 0x9019:
            case 0x9006: case 0x901a:
            case 0x9007: case 0x901b:
            case 0x9008: case 0x901c:
                f = HerculesInstinct.keyButton;
                break;
            case 0x9010: case 0x9024:
                if (value == 0) return;
                f = "pfl";
                value = ! engine.getValue(group, f);
                break;
            case 0x9013: case 0x9027:
                f = HerculesInstinct.masterTempo;
                break;
        }


    }

*/
}

HerculesInstinct.wheelOnOff = function() {
    // Wheel Deck A
    if (wheelMove[0]) 
        engine.scratchEnable(1, 128, standardRpm, alpha, beta);
    else 
        engine.scratchDisable(1)
    wheelMove[0] = 0;
    if (wheelMove[1]) 
        engine.scratchEnable(2, 128, standardRpm, alpha, beta);
    else 
        engine.scratchDisable(2)
    wheelMove[1] = 0;
}
