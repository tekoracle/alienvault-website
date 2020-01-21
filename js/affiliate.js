'use strict';

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=shiftcrypto.ch";
    document.cookie = cookie
}

function init() {
    // Track referral links
    var refID = urlParams["ref"];
    //var refID = "MEW12345"
    if (refID)
        setCookie("_ref", refID, 28);

    // Track ad links
    var adv = urlParams["adv"];
    if (adv)
        setCookie("_adv", adv, 56);// TODO - append instead of overwrite multiple ads

}
window.onload = init;
