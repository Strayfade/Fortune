function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

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

            // For each page
            for (var i = 0; i < Result.length; i++) {
                // For each thread in each page
                for (var y = 0; y < Result[i].threads.length; y++) {
                    var CurrThread = Result[i].threads[y];

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

                    var ThreadContent = document.createElement("h4");
                    ThreadContent.className = "ThreadContent";
                    if (CurrThread.com) {
                        var NewMessage = "";
                        var Switching = true
                        var Splits = CurrThread.com.toString()
                        for (var k = 0; k < Splits.length; k++) {
                            if (Splits[k] == ">") {
                                Switching = true;
                            }
                            if (Splits[k] == "<" && Splits[k + 1] == "a") {
                                Switching = false;
                            }
                            if (Switching) {
                                NewMessage += Splits[k]
                            }
                        }
                        ThreadContent.innerHTML = NewMessage;
                    } else {
                        ThreadContent.innerHTML = ""
                    }

                    var ThreadDetails = document.createElement("h4");
                    ThreadDetails.className = "ThreadDetails";
                    ThreadDetails.innerHTML = (!CurrThread.no ? "" : (CurrThread.no + " | ")) + (!CurrThread.name ? "" : (CurrThread.name + " | ")) + CurrThread.replies + " Replies, " + CurrThread.images + " Images | Last Modified " + new Date(CurrThread.last_modified * 1000).toLocaleDateString();

                    // Thread View Button
                    var ThreadSeparator = document.createElement('div')
                    ThreadSeparator.style.display = "flex";
                    var ThreadSeparatorChild = document.createElement('div')
                    ThreadSeparatorChild.style.flex = "60%"
                    var ThreadViewButton = document.createElement('button')
                    ThreadViewButton.className = "ThreadViewButton"
                    ThreadViewButton.innerHTML = "View Thread"
                    ThreadViewButton.setAttribute('onclick', "localStorage.setItem('ThreadId', " + CurrThread.no.toString() + "); localStorage.setItem('ThreadName', '" + (!CurrThread.sub ? "Thread" : CurrThread.sub) + "'); window.location.replace('./Thread.html')")

                    // Thread Images
                    if (CurrThread.tim) {
                        var Image = document.createElement("img");
                        Image.style.maxWidth = "20%"
                        Image.style.maxHeight = "20%"
                        Image.style.height = "100%"
                        Image.style.borderTopLeftRadius = "20px"
                        Image.style.borderBottomLeftRadius = "20px"
                        Image.style.cursor = "pointer"
                        Image.src = "https://i.4cdn.org/" + localStorage.getItem('ShortBoardname') + "/" + CurrThread.tim + CurrThread.ext
                        Image.setAttribute('onclick', "localStorage.setItem('ThreadId', " + CurrThread.no.toString() + "); localStorage.setItem('ThreadName', '" + (!CurrThread.sub ? "Thread" : CurrThread.sub) + "'); window.location.replace('./Thread.html')")
                        ThreadSeparator.appendChild(Image)
                        ThreadDetails.innerHTML += " | " + CurrThread.w + "x" + CurrThread.h + " | " + bytesToSize(CurrThread.fsize)
                    }

                    TitleFlex.appendChild(ThreadTitle)

                    if (CurrThread.sub) {
                        ThreadSeparatorChild.appendChild(TitleFlex)
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