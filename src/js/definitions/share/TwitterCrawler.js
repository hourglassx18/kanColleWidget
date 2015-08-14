var KanColleWidget = KanColleWidget || {};
(function() {
    // static module
    var TwitterCrawler = KanColleWidget.TwitterCrawler = {};
    // TwitterCrawler._baseURL = "https://twitter.com/search";
    TwitterCrawler._baseURL = "https://twitter.com/KanColle_STAFF";
    /*
    TwitterCrawler._getDaysBefore = function(_d) {
        var days = 24*60*60*1000;
        var theDay = new Date(Date.now() - _d*days);
        return theDay.toISOString();
    };
    TwitterCrawler._query = {
        keyword : 'メンテナンス',
        from    : 'KanColle_STAFF',
        since   : TwitterCrawler._getDaysBefore(3),
        f       : 'realtime'
    };
    */
    TwitterCrawler._buildURL = function() {
        return TwitterCrawler._baseURL;
    };
    TwitterCrawler.findMaintenanceInfo = function(callback, opt) {
        var mod = TwitterCrawler;
        $.ajax({
            type: 'GET',
            url : mod._buildURL(),
            success : function(res){
                callback(res);
            },
            error : function(err){
                console.log(err);
            }
        });
    };
    TwitterCrawler.get$ = function(callback, opt) {
        TwitterCrawler.findMaintenanceInfo(function(res) {
            var iterateForEach = 'div.tweet.js-stream-tweet';// 'div.Grid:not(.Grid--withGutter)';
            var pickupHeader = 'div.stream-item-header';// 'div.ProfileTweet-header';
            var pickupContent = 'p.tweet-text';// 'p.ProfileTweet-text';
            var accountGroup = 'a.account-group';
            var $elements = $.map($(res).find(iterateForEach), function(li){
                $(li).find('.js-relative-timestamp').remove();
                $(li).find('button').remove();
                var userID = $(li).find(accountGroup).attr('data-user-id');
                if (userID != 294025417) {
                    console.log("FILTER THIS", userID);
                    return;
                }
                var $content = $(li).find(pickupContent);
                opt = {highlights:['全サーバ群共通メンテナンス']};
                if (opt && opt.highlights && opt.highlights.length != 0) {
                    $content.html($content.html().replace(
                        new RegExp(opt.highlights.join('|'), 'g'),
                        function(w) {
                                return '<b style="background-color:yellow">' + w + '</b>';
                        }
                    ));
                }
                var $el = $('<div></div>').addClass('stream-item').append(
                     $(li).find(pickupHeader),
                     $(li).find(pickupContent)
                );
                $el.find('a').attr({href: TwitterCrawler._buildURL()}).on('click',function(){
                    chrome.tabs.create({
                        url : $(this).attr('href')
                    });
                });
                $el.find('a.account-group').after('<br>');
                $el.find('div.action-more-container').remove();
                return $el;
            });
            callback($elements);
        }, opt);
    };
})();
