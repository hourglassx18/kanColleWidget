(function(){
    "use strict";

    if (Config.get('tiredness-recovery-minutes') == 0) $('#tiredness-contents').hide();

    // {{{ #page0
    var timersView = new widgetPages.TimersView();
    var tirednessListView = new widgetPages.TirednessListView();
    var mainClockView = new widgetPages.MainClockView();
    $("#page0").append(
        mainClockView.render(),
        timersView.render(),
        tirednessListView.render()
    );
    // }}}

    // {{{ #page1
    // var questListView = new widgetPages.QuestListView(new KanColleWidget.Quests());
    var questPageView = new widgetPages.QuestPageView();
    $("#page1").append(
        questPageView.render()
    );
    // }}}

    // {{{ #page2
    var memoView = new widgetPages.MemoView();
    $("#page2").append(
        memoView.render()
    );
    // }}}

    if (Config.get('clockmode-style') == 1) {//Tab Style
        var sideNaviView = new widgetPages.SideNaviView();
        $('#wrapper').append(sideNaviView.render());
        widgetPages.SideNaviView.adjustToSideNavi();
    }

    var sendDashboardTracking = function(){
        var mess = {
            purpose: 'dashboardTracking',
            position : {
                top  : window.screenTop,
                left : window.screenLeft
            },
            size : {
                innerWidth  : window.innerWidth,
                innerHeight : window.innerHeight,
                outerWidth  : window.outerWidth,
                outerHeight : window.outerHeight
            }
        };
        chrome.runtime.sendMessage(null, mess);
    };

    setInterval(function(){
        mainClockView.update();
    }, 1000);
    setInterval(function(){
        sendDashboardTracking();
        timersView.update();
        tirednessListView.update();
        questPageView.achievements.update();
        if (questPageView.questlist.haveUpdate()) questPageView.questlist.update();
    },5000);

    $('<link>').attr({
        rel : 'shortcut icon',
        href: Config.get('notification-img-file') || '../img/icon.48.png'
    }).appendTo('head');
})();
