(function($) {
    function draw(id, imgsrc) {
        $("#" + id).html('<img src=' + imgsrc + ' id="img-preview" height="200" alt="Image preview...">');
    }

    $(document).ready(function() {
        //For Submit
        $("#submit_btn").click(function() {
            $("body").waitMe({
                effect: "bounce",
                text: "Uploading...(If you are using iOS 12 and Chrome app that you may stuck here. Refresh after 20s and do not resend again. Thank you. / 如果你使用 iOS 12 且 Chrome App 操作此功能而停在這個畫面，請於20秒左右重新整理並不要重新傳送表單，謝謝。)",
            });
            // $('#wctpe2018_form').attr('target', 'wctpe_ios12_bug_fixed');
            // $('#wctpe2018_form').attr('action', location.href);
            // var iframe = document.createElement('iframe');
            // iframe.setAttribute('src', '');
            // iframe.setAttribute('id', 'wctpe_ios12_bug_fixed');
            // iframe.setAttribute('name', 'wctpe_ios12_bug_fixed');
            // iframe.setAttribute('style', 'display:none;');
            // $("body").append(iframe);
            // $('#wctpe2018_form').submit();
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
        $('.more_posts').click(function() {
            $("body").waitMe({
                effect: "bounce",
                text: "Loading...",
            });
            var data = {
                'action': 'mxp_ajax_get_next_page_data',
                'nonce': WCTPE.nonce,
                'max_num_pages': WCTPE.posts.max_num_pages,
                'current_page': WCTPE.posts.current_page,
                'found_posts': WCTPE.posts.found_posts,
            };
            var md = new MobileDetect(window.navigator.userAgent);
            if (md.is('iOS') && md.is('Chrome') && md.version('iOS') > 11) {
                location.href = '/page/' + (WCTPE.posts.current_page + 1) + '/';
            }
            $.post(WCTPE.ajaxurl, data, function(res) {
                if (res.success) {
                    $('.tattoo_posts_lists').append(res.data.data);
                    history.pushState(null, null, '/page/' + (WCTPE.posts.current_page + 1) + '/');
                } else {
                    alert('Oops! Sorry error occurred!');
                }
                $("body").waitMe('hide');
            });
        });
        $('.new_posts').click(function() {
            location.href = '/';
        });
    });
}(jQuery))
