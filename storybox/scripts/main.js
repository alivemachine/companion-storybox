const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var entity1name = urlParams.get('entity1');
        var entity2name = urlParams.get('entity2');
        var isplaying = false;
        var issounding = false;
        var entity1photo="";
        var entity2photo="";
        var names;
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var level=0;
        var whoareyou="";
        let cookieDoc = document.cookie;
        var allNames="";
        var allPortraits;
        var allColors;
        window.onload = function() {
        
            if(page=="scene.html"){
                    if(entity1name==null||entity2name==null){
                            fetch('https://www.wolframcloud.com/obj/madelaine0/checkMap?t=0')
                                .then(response => response.json())
                                .then(data => {updateNames(data);
                                    fetch('https://www.wolframcloud.com/obj/madelaine0/readMap?timestamp=0')
                                    .then(response => response.json())
                                    .then(data => {updateNames(data);});
                                });
                    }else{
                        loadCompass(entity1name);
                        loadCompass(entity2name);
                        setTimeout(() => {
                            fetch('https://www.wolframcloud.com/obj/madelaine0/checkMap?t=0')
                                .then(response => response.json())
                                .then(data => {updateNames(data);
                                    fetch('https://www.wolframcloud.com/obj/madelaine0/readMap?timestamp=0')
                                    .then(response => response.json())
                                    .then(data => {updateNames(data);});
                                
                                });
                        }, 5000);
                    }
           
            }else if(page=="map.html"){
                   document.getElementById('ent1control').style.display='none';
                    document.getElementById('ent2control').style.display='none';
                if(whoareyou!=""){document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Loading community...';}
            }
        }
        

        function updateNames(obj){
            if(page=="scene.html"){
            var x=obj.names;
            if(entity1name==null||entity2name==null){
                    entity1name=x[getRandomInt(x.length-1)];
                    entity2name=x[getRandomInt(x.length-1)];
                    loadCompass(entity1name);
                    loadCompass(entity2name);
            }
            for(var i =0; i<x.length;i++){
                var newOption = document.createElement('option');
                var optionText = document.createTextNode(x[i]);
                newOption.appendChild(optionText);
                newOption.setAttribute('value',x[i]);
                document.getElementById('entity1').appendChild(newOption);
                document.getElementById('entity2').appendChild(newOption.cloneNode(true));
            }
            }
        }
        ///////LOAD
        function loadCompass(name){
            document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Loading entities...';
            if(page=="scene.html"){

                if(name==null){
                    if(document.getElementById('entity1').value!=entity1name){
                    name=document.getElementById('entity1').value;
                    entity1name=name;
                    }
                    if(document.getElementById('entity2').value!=entity2name){
                    name=document.getElementById('entity2').value;
                    entity2name=name;
                    }
                }
                document.getElementById('chatContainer').style.opacity="0";
                if(name==entity1name){
                    document.documentElement.style.setProperty('--entity1-color', "grey"); 
                    document.getElementById('ent1control').style.display='none';
                }
                if(name==entity2name){
                    document.documentElement.style.setProperty('--entity2-color', "grey"); 
                    document.getElementById('ent2control').style.display='none';
                }
                botui.message.removeAll();
            }else if(page=="map.html"){
                document.documentElement.style.setProperty('--entity1-color', document.getElementById('ent1color').value);
            }
            fetch('https://www.wolframcloud.com/obj/madelaine0/readCompass?name='+name+'&length=8')
              .then(response => response.json())
              .then(data => updateCompass(name, data));
             
        }
        ///////UPDATE
        function updateCompass(ent, obj){
            document.getElementById('info').innerHTML="";
            if(page=="scene.html"){
                document.getElementById('chatContainer').style.opacity="1";
                if(ent==entity1name){
                    document.getElementById('ent1control').style.display='block';
                    document.documentElement.style.setProperty('--entity1-color', obj.color);
                    document.getElementById('entity1').value=entity1name;
                    entity1photo=obj.portrait;
                    document.getElementById('ent1color').value=obj.color;
                    setPatchVar("color1",obj.color);
                    setPatchVar("here1",1);
                    document.getElementById('ent1img').value=obj.portrait;
                    document.getElementById('formPortrait1').src=obj.portrait;
                    document.getElementById('ent1desc').value=obj.personality;
                    var x = document.getElementsByClassName("human");
                    for(var i =0; i<x.length;i++){x[i].src=entity1photo}
                }
                if(ent==entity2name){
                    document.getElementById('ent2control').style.display='block';
                    document.documentElement.style.setProperty('--entity2-color', obj.color);
                    document.getElementById('entity2').value=entity2name;
                    document.getElementById('ent2desc').value=obj.personality;
                    document.getElementById('ent2color').value=obj.color;
                    setPatchVar("color2",obj.color);
                    setPatchVar("here2",1);
                    document.getElementById('ent2img').value=obj.portrait;
                    document.getElementById('formPortrait2').src=obj.portrait;
                    entity2photo=obj.portrait;
                    var x = document.getElementsByClassName("agent");
                    for(var i =0; i<x.length;i++){x[i].src=entity2photo}
                }
            }else if(page=="map.html"){
                    document.getElementById('ent1control').style.display='block';
                    document.documentElement.style.setProperty('--entity1-color', obj.color);
                    entity1photo=obj.portrait;
                    document.getElementById('ent1color').value=obj.color;
                    document.getElementById('ent1img').value=obj.portrait;
                    document.getElementById('formPortrait1').src=obj.portrait;
                    document.getElementById('ent1desc').value=obj.personality;
                if(level==1){document.getElementById('ent1control').style.display='block';}
                
                document.getElementById('ent2control').style.display='none';
                setPatchVar("refresh",1);
                document.getElementById('create').style.display='block';
                setTimeout(() => {setPatchVar("refresh",0);}, 100);
            }
            
        }
        function playbtn(){
            if(isplaying==false){isplaying=true;talkLoop();}else{isplaying=false;talkLoop();}
        }
        function soundbtn(){
            if(issounding==false){
                document.getElementById('sound').value="🔈";
                setPatchVar("sound",1);
                issounding=true;
            }else{
                document.getElementById('sound').value="🔇";
                setPatchVar("sound",0);
                issounding=false;
            }
        }
        var turn=0;
        function talkLoop(){
            if(isplaying==true){
                document.getElementById('play').value="⏸︎";
                
                var sender,receiver;
                if(turn==0){sender=entity1name;receiver=entity2name;turn=1;}else if(turn==1){sender=entity2name;receiver=entity1name;turn=0;}
                fetch('https://www.wolframcloud.com/obj/madelaine0/say?sender='+sender+'&receiver='+receiver)
                  .then(response => response.json())
                  .then(data => updateChat(sender,data));
            }else{
                document.getElementById('play').value="▶";
                setPatchVar("anim1",0);setPatchVar("anim2",0);
            }
        }
        
        function updateChat(sender,obj){
            var photolink;
            if(sender==entity1name){
                photolink=entity1photo;
                setPatchVar("anim1",1);setPatchVar("anim2",0);
                botui.message.add({
                  photo: photolink,
                  loading: true
                }).then(function (index) {
                  setTimeout(function () {
                    botui.message.update(index, {
                      content: obj.response,
                      loading: false
                    });
                    if(issounding==true){outLoud(obj.response,1,1,1);}
                    if(isplaying==true){talkLoop();}
                  },1000);
                });
            }else{
                photolink=entity2photo;
                setPatchVar("anim1",0);setPatchVar("anim2",1);
                botui.message.add({
                  human:true,
                  photo: photolink,
                  loading: true
                }).then(function (index) {
                  setTimeout(function () {
                    botui.message.update(index, {
                      content: obj.response,
                      loading: false
                    });
                    if(issounding==true){outLoud(obj.response,1,1,1);}
                    if(isplaying==true){talkLoop();}
                  },1000);
                });
            }
        }
        
     function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }   
    function entsave(i){
            document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Creating entity...';
            var name = document.getElementById('entity'+i).value;
            var color = document.getElementById('ent'+i+'color').value.replace('#','');
            var personality=document.getElementById('ent'+i+'desc').value;
            var portrait=document.getElementById('ent'+i+'img').value;
            if(page=="map.html"){
                if(level==1){document.getElementById('ent1control').style.display='block';}
                document.getElementById('ent2control').style.display='none';
                document.getElementById('ent2control').style.display='none';
                document.getElementById('create').style.display='none';
            }
           fetch('https://www.wolframcloud.com/obj/madelaine0/createPerson?name='+name+'&personality='+personality+'&color='+color+'&portrait='+portrait)
                  .then(response => response.json())
                  .then(data => loadCompass(name));
            

    }
    function portraitDisplay(){
        document.getElementById('formPortrait1').src=document.getElementById('ent1img').value;
        document.getElementById('formPortrait2').src=document.getElementById('ent2img').value;
    }

            function createEntity(name){
            document.getElementById('ent1control').style.display='none';
            document.getElementById('ent2control').style.display='block';
        }
        function notavailable(){
            alert("Feature not available");
        }

        

      function mapReady(){
            setTimeout(function(){document.getElementById('info').innerHTML='';}, 3000);
            
            if(whoareyou!=""){
                document.getElementById('glcanvas').style.opacity=1;
                
                document.getElementById('Scene').style.display='none';
                document.getElementById('whoareyou').style.display="none";
            }else{
                
                document.getElementById('Scene').style.display='none';
            }

      } 

      function iam(){
        if(document.getElementById('entityuser').value!=""){
        whoareyou=document.getElementById('entityuser').value.replaceAll("[^A-Za-z0-9]","");
        window.parent.postMessage('enter', '*');

        if(allNames.includes(whoareyou)==true){//returning user
            document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Welcome back '+whoareyou+'!';
            mapReady();
        }else{//create new user
            document.getElementById('Scene').style.display='none';
            document.getElementById('whoareyou').style.display="none";
            document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Creating '+whoareyou+'...';
            fetch('https://www.wolframcloud.com/obj/madelaine0/createPerson?name='+whoareyou)
                  .then(response => response.json())
                  .then(data => {
                      loadCompass(name);
                      document.getElementById('info').innerHTML='<img class="loadIcon" src="https://i.gifer.com/ZZ5H.gif"/> Welcome '+whoareyou+'!';
                      mapReady();
                  });
        }
        }
      } 


    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }



    function mapChatSend(){
        botui.action.text({ // show 'text' action
                        action: {
                          placeholder: '...'
                        }
                      }).then(function (res) { // get the result
                            fetch('https://www.wolframcloud.com/obj/madelaine0/say?sender='+whoareyou+'&receiver='+document.getElementById('entity1').value)
                              .then(response => response.json())
                              .then(data => {
                                botui.message.add({
                                  loading: true
                                }).then(function (index) {
                                  setTimeout(function () {
                                    botui.message.update(index, {
                                      content: data.response,
                                      loading: false
                                    });
                                    mapChatSend();
                                  },1000);
                                });
                              });
                      });
    }
