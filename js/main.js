(function($) {
    $(document).ready(function() {
        var qm = document.location.search.replace(/(^\?)/, '').split("&").map(function(n) {
            return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
        if (qm.oops !== undefined) {console.log(qm.oops);
            switch (qm.oops) {
                case '1':
                    alert("Don't hack me, please!");
                    break;
                case '2':
                    alert("發生錯誤，請確認資料是否正確！ / Checking required fields, please!");
                    break;
                default:
                    break;
            }
        }
        var md = new MobileDetect(window.navigator.userAgent);

        function draw(id, imgsrc) {
            $("#" + id).html('<img src=' + imgsrc + ' id="img-preview" height="200" alt="Image preview...">');
        }
        //For Submit
        $("#submit_btn").click(function() {
            $("body").waitMe({
                effect: "bounce",
                text: "Uploading...",
            });
            if (md.is('iOS') && parseInt(md.version('iOS')) == 12) {
                if (md.userAgent() == 'Chrome') {
                    // 針對 iOS12 + Chrome App 的使用者做的表單前處理
                    // $('#wctpe2018_form').attr('target', '_blank');
                    // $('#wctpe2018_form').attr('action', location.href + '?t=' + new Date().getTime());
                }
            }
            // $('#wctpe2018_form').attr('target', 'wctpe_ios12_bug_fixed');
            // $('#wctpe2018_form').attr('action', location.href);
            // var iframe = document.createElement('iframe');
            // iframe.setAttribute('src', '');
            // iframe.setAttribute('id', 'wctpe_ios12_bug_fixed');
            // iframe.setAttribute('name', 'wctpe_ios12_bug_fixed');
            // iframe.setAttribute('style', 'display:none;');
            // $("body").append(iframe);
            $('#wctpe2018_form').submit();
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
                alert("Too old to use this browser! Update it please! / 你的瀏覽器舊到一個極致了！再麻煩升級主流新版的瀏覽器，謝謝。");
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
            $(this).attr('disabled', true);
            var that = $(this);
            if (WCTPE.posts.max_num_pages == WCTPE.posts.current_page) {
                $(this).text('The END! / 最後一頁');
                $(this).unbind('click');
                return;
            }
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
            // if (md.is('iOS') && parseInt(md.version('iOS')) == 12) {
            //     if (md.userAgent() == 'Chrome') {
            //         location.href = '/page/' + (WCTPE.posts.current_page + 1) + '/';
            //         return;
            //     }
            // }
            $.post(WCTPE.ajaxurl, data, function(res) {
                if (res.success) {
                    $('.tattoo_posts_lists').append(res.data.data);
                    history.pushState(null, null, '/page/' + (WCTPE.posts.current_page + 1) + '/');
                    WCTPE.posts.current_page += 1;
                    that.attr('disabled', false);
                } else {
                    alert('Oops! Sorry error occurred!');
                    location.reload();
                }
                $("body").waitMe('hide');
            }).fail(function() {
                alert('Oops! Sorry error occurred! Internet issue.');
            });
        });
        $('.new_posts').click(function() {
            location.href = '/';
        });
    });
}(jQuery))
