function OpenBoard(Boardname, ShortBoardname) {
    localStorage.setItem("CurrentBoard", Boardname)
    localStorage.setItem("ShortBoardname", ShortBoardname)
    window.location.replace("./Board.html")
}

function LoadBoards() {
    var scripts = document.getElementsByTagName('script');
    var ThisScript = scripts[scripts.length - 1];
    (window.event).preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            var Result = JSON.parse(xhr.response);
            for (var i = 0; i < Result.boards.length; i++) {
                var Curr = Result.boards[i];
                var link = document.createElement('button');
                link.className = "BoardLink";
                link.innerHTML = "/" + Curr.board + "/ - " + Curr.title;
                link.setAttribute("onclick", "OpenBoard('" + "/" + Curr.board + "/ - " + Curr.title + "', '" + Curr.board + "');");
                document.getElementById("BoardsContainer").appendChild(link);
            }
        } else {
            console.error('Error!');
        }
    };
    xhr.open('GET', "https://boards.4channel.org/boards.json");
    xhr.setRequestHeader('If-Modified-Since', 'Wed, 21 Oct 2015 07:28:00 GMT');
    xhr.send();
}