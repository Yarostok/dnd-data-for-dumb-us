var scriptUrl = "https://script.google.com/macros/s/AKfycbwhzjCucIEjstmLxGmBRVKSLAceQZQ2FELM3VHUNOpN8VAhSrNpxzZUuK7FSaINJF-lhg/exec";
    
window.onload=()=> {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );
    if(page=="news.html"){
        GetNews()}
    if(page=="characters.html"){
        GetChars()}
    if(page=="charac.html"){
        var url = new URL(decodeURI(window.location.href));
        var name = url.searchParams.get("name");
        GetChar(name)}
}

function GetNews(){
    const formData = new FormData();
    formData.append("operation", "news");
    console.log(formData)
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         AddNews(data);
         document.getElementById("loading").style.display="none"
      })
}

function AddNews(data) {
    dataOnSite = document.getElementById("content")
    dataOnSite.innerHTML = "<h2>Новости</h2><div id='loading'><img src='images/Load.gif'></div>";
    //За каждую строку в таблице получаем по ряду
    data.forEach((row, index) => {
        row.content = row.content.replace(/(?:\r\n|\r|\n)/g, '</p><p>&emsp;&emsp;');
        dataOnSite.innerHTML += 
        "<div class='element'>"+
        " <div class='Title'>"+row.title+"</div>"+
        " <div class='Time'>"+new Date(row.time).toLocaleDateString()+"</div>"+
        " <br><p><div class='Cont'>&emsp;&emsp;"+row.content+"</p></div>"+
        "</div>"
    })

}

function GetChars(){
    const formData = new FormData();
    formData.append("operation", "chars");
    console.log(formData)
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         AddChars(data);
         document.getElementById("loading").style.display="none"
      })
}

function AddChars(data) {

    document.getElementById("content").innerHTML="<h2>Персонажи</h2><div id='loading'><img src='images/Load.gif'></div><div class='nos' id='nos'></div>"
    dataOnSite = document.getElementById("nos")
    dataOnSite.innerHTML;
    //За каждую строку в таблице получаем по ряду
    data.forEach((row, index) => {
        row.image="https://drive.google.com/uc?id="+row.image;
        dataOnSite.innerHTML += 
        "<div class='element1' onclick='Currentize(this)' name='" + row.name +"'>"+
        " <div class='Title'>"+row.name+"</div>"+
        " &emsp;&emsp;<div class='Conten'>   <img class='pict' src="+row.image+" onerror='onImgError(this);' ></div>"+
        "</div>"
    })
    dataOnSite.innerHTML += "</div>"
}

function onImgError(source){
    source.src = "images/nouser.jpg";
    source.onerror = ""; 
    return true; 
} 

function Currentize(source){
    
    window.location.href = "charac.html"+"?name="+source.getAttribute("name");
} 

function GetChar(name){
    const formData = new FormData();
    formData.append("operation", "char");
    formData.append("name", name);
    console.log(formData)
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         AddChar(data);
         document.getElementById("loading").style.display="none"
      })
}

function AddChar(data) {

    dataOnSite = document.getElementById("content")
    dataOnSite.innerHTML = "<h2>"+data[0].name+"</h2><div id='loading'><img src='images/Load.gif'></div>";
    //За каждую строку в таблице получаем по ряду
    data[0].features = data[0].features.replace(/(?:\r\n|\r|\n)/g, '</p><p>&emsp;&emsp;');
    data[0].abilities = data[0].abilities.replace(/(?:\r\n|\r|\n)/g, '</p><p>&emsp;&emsp;');
    data[0].inventory = data[0].inventory.replace(/(?:\r\n|\r|\n)/g, '</p><p>&emsp;&emsp;');
    data[0].description = data[0].description.replace(/(?:\r\n|\r|\n)/g, '</p><p>&emsp;&emsp;');
    data[0].image="https://drive.google.com/uc?id="+data[0].image;
    dataOnSite.innerHTML
    if(data[0].description!==null){
    dataOnSite.innerHTML += " <h3>&emsp;&emsp;"+"Описание"+"</h3>"+
    " <p><div class='Cont'>&emsp;&emsp;"+data[0].description+"</p></div>"}
    if(data[0].features!==null){
        dataOnSite.innerHTML += " <h3>&emsp;&emsp;"+"Особенности"+"</h3>"+
        " <p><div class='Cont'>&emsp;&emsp;"+data[0].features+"</p></div>"}
    if(data[0].abilities!==null){
        dataOnSite.innerHTML += " <h3>&emsp;&emsp;"+"Способности"+"</h3>"+
        " <p><div class='Cont'>&emsp;&emsp;"+data[0].abilities+"</p></div>"}
    if(data[0].inventory!==null){
        dataOnSite.innerHTML += " <h3>&emsp;&emsp;"+"Инвентарь"+"</h3>"+
        " <p><div class='Cont'>&emsp;&emsp;"+data[0].inventory+"</p></div>"}

    dataOnSite.innerHTML += " &emsp;&emsp;<div class='Cont'>   <img class='pictur' src="+data[0].image+" onerror='onImgError(this);' ></div>"+
    "</div>"

}