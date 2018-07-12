/*
  > j = { "payload": 0 }
    { payload: 0 }
  > typeof(j.payload)
    'number'
  > 
  > j = { "payload": "0" }
    { payload: '0' }
  > typeof(j.payload)
    'string'
  > 
  > j = { "payload": "{ \"payload\":0}" }
  { payload: '{ "payload":0}' }
  > typeof(j.payload)
    'string'
  > 
  > j = { "payload": {"payload": 0 }}
  { payload: { payload: 0 } }
  > typeof(j.payload)
    'object'
  > 
  > j = { "payload": {"payload": "0" }}
    { payload: { payload: '0' } }
  > typeof(j.payload)
    'object'
  > 
*/

var arr = [
    { "payload": 0 },
    { "payload": "0" },
    { "payload": "{ \"payload\":0}" },
    { "payload": {"payload": 0 }},
    { "payload": {"payload": "0" }},
    { "payload": "0", "qos": 0 },
    { "payload": "{ \"payload\":0}", "qos": 0 },
    { "payload": {"payload": 0, "qos": 0 }},
    { "payload":"{ \"payload\":0,\"timeout\":6,\"warning\":0}","qos": 0 },
    { "payload":"{ \"payload\":\"0\",\"timeout\":6,\"warning\":0}","qos": 0 },
    { "payload":"{ \"payload\":\"ON\",\"timeout\":6,\"warning\":0}","qos": 0 }
];

var xarr = [
    { "payload": 0 },
    { "payload": "0" },
    { "payload": "{ \"payload\":0}" },

    { "payload":"{ \"payload\":0,\"timeout\":6,\"warning\":0}","qos": 0 },
    { "payload":"{ \"payload\":\"0\",\"timeout\":6,\"warning\":0}","qos": 0 },
    { "payload":"{ \"payload\":\"ON\",\"timeout\":6,\"warning\":0}","qos": 0 }
];

function newMsg(msg) {
    var nMsg = msg;

    console.log("msg  = " + JSON.stringify(msg));
    console.log("nMsg = " + JSON.stringify(nMsg));

    switch(typeof(msg.payload)) {
        case "string":
            if(/.*"payload".*/.test(msg.payload)) {
                // string contain payload, convery to JSON
                //
                // in   = {"payload":"{ \"payload\":\"on\",\"timeout\":6,\"warning\":0}","qos":0}
                // msg  = {"payload":"{ \"payload\":\"on\",\"timeout\":6,\"warning\":0}","qos":0}
                // nMsg = {"payload":"{ \"payload\":\"on\",\"timeout\":6,\"warning\":0}","qos":0}
                // msg  = {"payload":"on","timeout":6,"warning":0}
                // nMsg = {"payload":"on","timeout":6,"warning":0}
                // str msg  = {"payload":"on","timeout":6,"warning":0}
                // str msg  = {"payload":"on","qos":0}
                // out  = {"payload":"on","qos":0}
                //
                // > obj1 = { "payload": 1, "qos": 0 };
                // > obj2 = { "payload": "on", "timeout": 60 };
                // > var result = Object.assign({},obj1, obj2);
                // { payload: 'on', qos: 0, timeout: 60 }
                //
                t = newMsg(JSON.parse(msg.payload));
                //nMsg.payload = t.payload;
                nMsg = Object.assign({}, msg, t);
            } else {
                console.log("Not a /.*\"payload\".*/")
                //nMsgpayload = msg.payload;
            }
            console.log("str msg  = " + JSON.stringify(nMsg));
            console.log("typeof   = " + typeof(nMsg));
            console.log("str msg  = " + JSON.stringify(nMsg.payload));
            console.log("typeof   = " + typeof(nMsg.payload));

            try{
                nMsg.payload = nMsg.payload.toLowerCase();
            } catch(e) {
                nMsg.payload = nMsg.payload.toString().toLowerCase();
            }
            break;

        case "number":
            nMsg.payload = msg.payload.toString();
            console.log("num msg  = " + JSON.stringify(nMsg));
            break;

        case "object":
            console.log("obj msg  = " + JSON.stringify(msg));
            msg.payload = msg.payload.payload;
            t = newMsg(msg);
            nMsg = t.payload;
            console.log("obj nmsg = " + JSON.stringify(nMsg));
            break;

        default:
            console.log("??? msg  = " + JSON.stringify(msg));
            console.log("??? msg  = " + typeof(msg.payload));
            nMsg = { "payload": "" };
            console.log("??? msg  = " + JSON.stringify(nMsg));
            break;
    }

    return(nMsg);
}

for(j in arr) {
    console.log();
    console.log("in   = " + JSON.stringify(arr[j]));
    msg = newMsg(arr[j]);
    console.log("msg  = " + JSON.stringify(msg));
    console.log("type = " + typeof(msg.payload));
}

// Git changes for master
// blah blah blah

// Changes made for issue iss53
// git checkout -b iss53

