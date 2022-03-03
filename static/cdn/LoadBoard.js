function LoadPosts(Boardname, ShortBoardname) {
    document.getElementById("BoardTitle").innerHTML = "Loading " + Boardname

    var Container = document.getElementById("ThreadContainer")
    document.getElementById("BoardTitle").innerHTML = Boardname;
    var scripts = document.getElementsByTagName('script');
    var ThisScript = scripts[scripts.length - 1];
    (window.event).preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            var Result = JSON.parse(xhr.response);
            console.log(Result);
            // For each page
            for (var i = 0; i < Result.length; i++) {
                // For each thread in each page
                for (var y = 0; y < Result[i].threads.length; y++) {
                    var CurrThread = Result[i].threads[y];
                    console.log(CurrThread)

                    // Main Thread
                    var Thread = document.createElement('div');
                    Thread.className = "Thread";

                    // Thread Title
                    var ThreadTitle = document.createElement("h2")
                    ThreadTitle.innerHTML = !CurrThread.sub ? "" : CurrThread.sub;

                    // Thread Title Container
                    var TitleFlex = document.createElement('div');
                    TitleFlex.style.display = "flex";
                    TitleFlex.style.paddingBottom = "0px";
                    TitleFlex.style.paddingTop = "0px";
                    TitleFlex.style.margin = "0px";
                    TitleFlex.style.marginBottom = "0px";
                    TitleFlex.className = "ThreadTitle";

                    // Thread Tags
                    if (CurrThread.sticky == 1) {
                        Thread.style.backgroundColor = "rgb(40, 40, 40)"
                        var ThreadTag1 = document.createElement('h2');
                        ThreadTag1.className = "ThreadTag-Neutral";
                        ThreadTag1.innerHTML = "Pin";
                        TitleFlex.appendChild(ThreadTag1)
                    }
                    if (CurrThread.closed == 1) {
                        var ThreadTag2 = document.createElement('h2');
                        ThreadTag2.className = "ThreadTag-Negative";
                        ThreadTag2.innerHTML = "Closed";
                        TitleFlex.appendChild(ThreadTag2)
                    }

                    function Linkify(inputText) {
                        //URLs starting with http://, https://, or ftp://
                        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
                        var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

                        //URLs starting with www. (without // before it, or it'd re-link the ones done above)
                        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
                        var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

                        //Change email addresses to mailto:: links
                        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
                        var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

                        return replacedText
                    }

                    var ThreadContent = document.createElement("h4")
                    ThreadContent.className = "ThreadContent"
                    var p = CurrThread.com.toString();
                    p = Linkify(p)
                    ThreadContent.innerHTML = p;

                    var ThreadDetails = document.createElement("h4")
                    ThreadDetails.className = "ThreadDetails"
                    ThreadDetails.innerHTML = CurrThread.replies + " Replies | Last Modified " + new Date(CurrThread.last_modified * 1000).toLocaleDateString()

                    // Thread View Button
                    var ThreadSeparator = document.createElement('div')
                    ThreadSeparator.style.display = "flex";
                    var ThreadSeparatorChild = document.createElement('div')
                    ThreadSeparatorChild.style.flex = "80%"
                    var ThreadViewButton = document.createElement('button')
                    ThreadViewButton.className = "ThreadViewButton"
                    ThreadViewButton.innerHTML = "View Thread"

                    TitleFlex.appendChild(ThreadTitle)
                    if (CurrThread.sub) {
                        ThreadSeparatorChild.appendChild(TitleFlex)
                    } else {

                        ThreadSeparatorChild.appendChild(ThreadTitle)
                    }

                    ThreadSeparatorChild.appendChild(ThreadContent)
                    ThreadSeparatorChild.appendChild(ThreadDetails)
                    ThreadSeparator.appendChild(ThreadSeparatorChild)
                    ThreadSeparator.appendChild(ThreadViewButton)
                    Thread.appendChild(ThreadSeparator)
                    Container.appendChild(Thread);
                }
            }
            document.getElementById("BoardTitle").innerHTML = Boardname
        } else {
            console.error('Error!');
        }
    };
    xhr.open('GET', "https://a.4cdn.org/" + ShortBoardname + "/catalog.json");
    xhr.setRequestHeader('If-Modified-Since', 'Wed, 21 Oct 2015 07:28:00 GMT');
    xhr.send();
}