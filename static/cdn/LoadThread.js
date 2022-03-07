function LoadThread(ThreadId, ThreadName) {
    var Container = document.getElementById("PostContainer")

    document.getElementById('ThreadTitle').innerHTML = localStorage.getItem('CurrentBoard') + " > " + ThreadName

    var scripts = document.getElementsByTagName('script');
    var ThisScript = scripts[scripts.length - 1];
    (window.event).preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            var Result = JSON.parse(xhr.response);
            console.log(Result)
            for (var x = 0; x < Result.posts.length; x++) {
                CurrPost = Result.posts[x];

                // Main Thread
                var Thread = document.createElement('div');
                Thread.className = "Thread";
                Thread.style.marginTop = "10px"
                if (x > 0) {
                    Thread.style.marginLeft = "5%";
                    Thread.style.width = "95%";
                }
                Thread.id = "p" + CurrPost.no;

                var ThreadContent = document.createElement("h4");
                ThreadContent.className = "ThreadContent";
                if (CurrPost.com) {
                    var NewMessage = "";
                    var Switching = true
                    var Splits = CurrPost.com.toString()
                    for (var k = 0; k < Splits.length; k++) {
                        Splits = Splits.replace(">>>", '<p class="quotelink">')
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
                    ThreadContent.innerHTML = Splits;
                } else {
                    ThreadContent.innerHTML = ""
                }

                var ThreadDetails = document.createElement("h4");
                ThreadDetails.className = "ThreadDetails";
                ThreadDetails.innerHTML = (!CurrPost.no ? "" : (CurrPost.no + " | ")) + (!CurrPost.name ? "" : (CurrPost.name + " | ")) + (!CurrPost.replies ? "" : CurrPost.replies + " Replies, " + CurrPost.images + " Images | ") + "Last Modified " + new Date(CurrPost.time * 1000).toLocaleDateString();

                var ThreadSeparator = document.createElement('div')
                ThreadSeparator.style.display = "flex";
                var ThreadSeparatorChild = document.createElement('div')
                ThreadSeparatorChild.style.flex = "60%"

                // Thread Images
                if (CurrPost.tim) {
                    var Image = document.createElement("img");
                    Image.style.maxWidth = "20%"
                    Image.style.maxHeight = "20%"
                    Image.style.height = "100%"
                    Image.style.borderTopLeftRadius = "20px"
                    Image.style.borderBottomLeftRadius = "20px"
                    Image.style.cursor = "pointer"
                    Image.src = "https://i.4cdn.org/" + localStorage.getItem('ShortBoardname') + "/" + CurrPost.tim + CurrPost.ext
                    Image.setAttribute("onclick", "localStorage.setItem('ImageCache', '" + Image.src + "'); window.location.replace('./ImageViewer.html')")
                    ThreadSeparator.appendChild(Image)
                    ThreadDetails.innerHTML += " | " + CurrPost.w + "x" + CurrPost.h
                }

                ThreadSeparatorChild.appendChild(ThreadContent);
                ThreadSeparatorChild.appendChild(ThreadDetails);
                ThreadSeparator.appendChild(ThreadSeparatorChild);
                Thread.appendChild(ThreadSeparator);

                if (CurrPost.resto) {
                    var divcont = document.createElement('div')
                    divcont.appendChild(Thread);
                    divcont.style.marginLeft = "5%";
                    Thread.style.width = "95%";
                    Container.appendChild(divcont)
                } else {
                    Container.appendChild(Thread);
                }
            }
        } else {
            console.error('Error!');
        }
    };
    xhr.open('GET', "https://a.4cdn.org/" + localStorage.getItem('ShortBoardname') + "/thread/" + ThreadId.toString() + ".json");
    xhr.setRequestHeader('If-Modified-Since', 'Wed, 21 Oct 2015 07:28:00 GMT');
    xhr.send();
}