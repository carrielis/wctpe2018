(function($) {
    function draw(id, imgsrc) {
        $("#" + id).html('<img src='+imgsrc+' id="img-preview" height="200" alt="Image preview...">');
    }
    $(document).ready(function() {
        //For Submit
        $("#submit_btn").click(function() {
            $("body").waitMe({
                effect: "bounce",
                text: "Uploading...(If you are using iOS 12 that you may stuck here. Refresh after 20s. Thank you.)",
            });
        });
        $("#qa-image").change(function() {
            input = document.getElementById("qa-image");
            var loadingImage = loadImage(
                input.files[0],
                function(img) {
                    $("#qa-image-proc").val(img.toDataURL("image/jpeg"));
                    draw("img-preview", img.toDataURL("image/jpeg"));
                }, { maxWidth: 1024, canvas: true, orientation: true });
            if (!loadingImage) {
                alert("Too old to use this browser! Update it please!");
            }
        });
        $('#FBShare').click(function() {
            FB.ui({
                method: 'share',
                hashtag: '#WordCampTaipei2018',
                //quote: '',
                display: 'popup',
                href: location.href,
            }, function(response) { /*console.log(response);*/ });
        });
        $('#TwitterShare').click(function() {
            var shareURL = 'http://twitter.com/share?';
            var params = {
                url: location.href,
                text: 'Hey! I am here in WordCamp Taipei 2018 now!',
                via: 'WordCampTaipei',
                hashtags: 'WCTPE,WordCampTaipei2018'
            }
            for (var prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
            window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
        });
    });
}(jQuery))
