import config from '@/config';
import { fetch } from '@/api/api';

export default {
    // 获取数据列表
    getAprusList(cb, data, token) {
        fetch(config.ip.index + "/get_aplec_data", "POST", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
    },

    getDatagramByAprusId(cb, data, token) {
        // fetch(config.apix.datagram + "/latestGridsByDuration", "post", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
        // fetch(config.apix.datagram + "/getmultlist", "post", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
        fetch(config.apix.datagram + "/latestGridsByDuration", "post", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
    },


    reboot(cb, data, token) {
        console.log("hehe  reboot");
        fetch(config.apip.reboot + "/apip_push", "post", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
    },

    diagnose(cb, data, token) {
        fetch(config.apip.diagnose + "/apip_push", "post", data).then((data) => { cb(data) }).catch((e) => { cb(e) });
    }

}