var Aprilfool = {};
Aprilfool.getReason = function(){
    if (Math.random() < Aprilfool.specialRate)
        return Aprilfool.ArrayRand(Aprilfool.Reasons.normal);
    return Aprilfool.ArrayRand(Aprilfool.Reasons.special);
}
Aprilfool.ArrayRand = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
Aprilfool.Twitter = {
    tweet: function(text){
        var params = {
            text: text,
            hashtags: Aprilfool.HashTags,
            url: Aprilfool.URL
        };
        window.open(Aprilfool.TwiterIntentURL + Aprilfool.toQueryString(params));
    }
}
Aprilfool.toQueryString = function(obj){
    var params = [];
    for (key in obj) {
        params.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return "?" + params.join("&");
}
Aprilfool.thePrefix = "艦これウィジェット使ってたら";
Aprilfool.theReason = "";
Aprilfool.theConclusion = "これぜったい垢BAN対象だと思います！！";
Aprilfool.specialRate = 0.4;
Aprilfool.Reasons = {
    normal: [
        "小破轟沈しました。やっぱり",
        "PCが壊れました。",
        "頻繁に猫るようになりました。やっぱり",
        "彼女ができました。",
        "留年したので、"
    ],
    special: [
        // 内輪ネタ
        "武蔵が出ません。",
        "曙の改二が来ません。",
        "菱餅ぜんぜん集まりませんでした。",
        "龍驤がまな板です。",
        "南西諸島海域任務終わりません！",
        // metaネタ
        "アニメも楽しめました。やっぱり",
        "DMMに課金してしまいました！",
        "彼女ができたので、",
        "佐倉綾音さんに会えたので",
        // 現実ネタ
        "宝くじに当たりました。",
        "転職できました。",
        "結婚できました。",
        "自転車が盗まれました",
        "友達が減りました...",
        // 機能系ネタ
        "画面のスクショが簡単に取れる機能があります。",
        "画面のスクショが簡単にツイッター投稿できる機能があります。",
        "進撃時に艦娘の状態を表示してくれる機能があります。、",
        "建造や開発のレシピが検索できて怖いです。",
        "入渠の時間を自動で取得してくれて怖いです。",
        "入渠や遠征終了時に通知をしてくれて便利です、、",
        "デイリー任務の着手し忘れを防止する機能があります。",
        "今週こなした出撃や建造の回数を記録してくれる機能があり、",
        "運営電文をちょこっと見やすく表示してくれる機能があり、",
        "遠征帰投通知に音声を設定できる機能があります。",
        "複数PCで遠征帰投時間などを同期することができ、",
        "他のChrome拡張と合わせてiPhone通知もできる機能があります。",
        "wikiの遠征早見表とかも簡単にチェックでき、"
    ]
}
Aprilfool.URL = "http://otiai10.github.io/kanColleWidget/aprilfools/2015";
Aprilfool.TwiterIntentURL = "https://twitter.com/intent/tweet";
Aprilfool.HashTags = "春のBANまつり,AprilFools";
window.onload = function(){
    Aprilfool.theReason = Aprilfool.getReason();
    var theText = Aprilfool.thePrefix + Aprilfool.theReason + Aprilfool.theConclusion;
    document.getElementById("js-text-to-tweet").innerHTML = theText;
    document.getElementById("js-tweet-now").addEventListener('click',function(){
        var text = document.getElementById("js-text-to-tweet").innerText;
        Aprilfool.Twitter.tweet(text);
    });
}
