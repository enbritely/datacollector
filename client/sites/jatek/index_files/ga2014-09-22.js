(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

var customer_id_match = document.cookie.match(/customer_id=(\d+)/);
if (customer_id_match) {
    ga('create', 'UA-441284-2', 'auto', { userId: customer_id_match[1] });
    ga('set', 'dimension1', customer_id_match[1] );
    var customer_type_match = document.cookie.match(/customer_type=(\w+)/);
    if (customer_type_match) {
        ga('set', 'dimension2', customer_type_match[1]);
    }
} else {
    ga('create', 'UA-441284-2', 'auto');
}
ga('require', 'displayfeatures');
//ga('send', 'pageview');