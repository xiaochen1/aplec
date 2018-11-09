const protocol = 'http://';

const host = "192.168.88.16";

const port = 8888;

// const apixHost = "http://pro.xinrui.mixiot.top"
// const apixHost = "pro.huirong.mixiot.top";


// const apipHost = "pro.huirong.mixiot.top";

// const apixHost = "pro.kps.mixiot.top";

const apixHost = "pro.kps.mixiot.top";
const apipHost = "pro.kps.mixiot.top/proqy";





const ip = {
    index: protocol + host + ":" + port + "/aplec"
}

const apix = {
    datagram: protocol + apixHost + "/v1/apix"
}

const apip = {
    reboot: protocol + apipHost + "/api/apip",
    diagnose: protocol + apipHost + "/api/apip"
}

export default {
    ip: ip,
    apix: apix,
    apip: apip
}