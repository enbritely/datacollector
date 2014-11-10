var ScarabQueue = ScarabQueue || [];
(function(subdomain, id) {
    var js, fs;
    if (document.getElementById(id)) return;
    js = document.createElement('script'),
    js.id = id;
    js.src = subdomain + '.scarabresearch.com/js/1D6B8E82D9350744/scarab-v2.js';
    fs = document.getElementsByTagName('script')[0];
    fs.parentNode.insertBefore(js, fs);
})('https:' == document.location.protocol ? 'https://recommender' : 'http://cdn', 'scarab-js-api');

