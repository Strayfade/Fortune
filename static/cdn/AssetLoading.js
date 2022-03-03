function LoadAsset(AssetName) {
    var scripts = document.getElementsByTagName('script');
    var ThisScript = scripts[scripts.length - 1];
    (window.event).preventDefault();

    fetch(AssetName + ".html")
        .then((response) => response.text())
        .then((html) => {
            console.log("Loaded " + AssetName + " on page from " + AssetName + ".html")
            var div = document.createElement('div');
            div.innerHTML = html;
            ThisScript.parentNode.insertBefore(div, ThisScript);
        })
        .catch((error) => {
            console.warn(error);
        });
}