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
    0x30: { "channel": 1, "name": "wheel",      "type": "pot" },
    0x31: { "channel": 2, "name": "wheel",      "type": "pot" },
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
    0x01: { "channel": 1, "name": "K1",             "type": "button" },
    0x02: { "channel": 1, "name": "K2",             "type": "button" },
    0x03: { "channel": 1, "name": "K3",             "type": "button" },
    0x04: { "channel": 1, "name": "K4",             "type": "button" },
    0x05: { "channel": 1, "name": "K5",             "type": "button" },
    0x06: { "channel": 1, "name": "K6",             "type": "button" },
    0x07: { "channel": 1, "name": "K7",             "type": "button" },
    0x08: { "channel": 1, "name": "K8",             "type": "button" },
    0x15: { "channel": 2, "name": "K1",             "type": "button" },
    0x16: { "channel": 2, "name": "K2",             "type": "button" },
    0x17: { "channel": 2, "name": "K3",             "type": "button" },
    0x18: { "channel": 2, "name": "K4",             "type": "button" },
    0x19: { "channel": 2, "name": "K5",             "type": "button" },
    0x1A: { "channel": 2, "name": "K6",             "type": "button" },
    0x1B: { "channel": 2, "name": "K7",             "type": "button" },
    0x1C: { "channel": 2, "name": "K8",             "type": "button" },

}


*/
    

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
        var group;
        var f = null;



        if (status == 0xb0) {
            if ((midino > 0x38) || 
                ((midino < 0x34) && (midino & 1))) {
                group = c2;
            } else {
                group = c1;
            }
        } else if (status == 0x90) {
            if (midino <= 20) {
                group = c1;
            } else if (midino < 40) {
                group = c2;
            }
        }

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
            case 0x900a: case 0x901e:
            case 0x900b: case 0x901f:
                f = HerculesInstinct.pitchbend;
                break;
            case 0x900c: case 0x9020:
                f = "back";
                break;
            case 0x900d: case 0x9021:
                f = "fwd";
                break;
            case 0x900e: case 0x9022:
                f = HerculesInstinct.cue;
                break;
            case 0x900f: case 0x9023:
                if (value == 0) return;
                f = "play";
                value = ! engine.getValue(group, f);
                break;
            case 0x9010: case 0x9024:
                if (value == 0) return;
                f = "pfl";
                value = ! engine.getValue(group, f);
                break;
            case 0x9011: case 0x9025:
                f = HerculesInstinct.loadTrack;
                break;
            case 0x9012: case 0x9026:
                f = HerculesInstinct.sync;
                break;
            case 0x9013: case 0x9027:
                f = HerculesInstinct.masterTempo;
                break;


            case 0x9029:
                group = '[Playlist]';
                f = 'SelectPrevTrack';
                break;
            case 0x902a:
                group = '[Playlist]';
                f = 'SelectNextTrack';
                break;
            case 0x902b:
            case 0x902c:
                group = '[Playlist]';
                f = HerculesInstinct.scroll;
                break;
            case 0x902d:
                f = HerculesInstinct.scratch;
                break;
            case 0x902e:
                f = HerculesInstinct.automix;
                break;

            case 0xb030: case 0xb031:
                f = HerculesInstinct.jogWheel;
                break;
            case 0xb032: case 0xb033:
                f = HerculesInstinct.pitch;
                break;
            case 0xb034: case 0xb039:
                engine.setValue(group, "volume", script.absoluteLin(value, 0, 1));
                break;
            case 0xb035: case 0xb03a:
                engine.setValue(group, "filterHigh", script.absoluteNonLin(value, 0, 1, 4));
                break;
            case 0xb036: case 0xb03b:
                engine.setValue(group, "filterMid", script.absoluteNonLin(value, 0, 1, 4));
                break;
            case 0xb037: case 0xb03c:
                engine.setValue(group, "filterLow", script.absoluteNonLin(value, 0, 1, 4));
                break;
            case 0xb038:
                engine.setValue('[Master]', 'crossfader', script.absoluteLin(value, -1, 1));
                break;
        }

        if (typeof(f) == 'string') {
            engine.setValue(group, f, (value>0)?1:0);
        } else if (f) {
            f(0, midino, value, status, group);
        }
    }

*/
}

