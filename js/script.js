(function(){ 
    var matches = 0;
    var images = [];
    var cartasViradas = [];
    var modalGameOver = document.querySelector("#modalGameOver");
    var imgAcertou = document.querySelector("#imgAcertou");
    var reset = document.querySelector("#reset");
    var placar = document.querySelector("#placar");

    for(var i = 0; i < 16; i++){
        var img = {
            src: "img/"+ i +".jpg",
            id: i%8
        };
        images.push(img);        
    }
    
    startGame();

    function startGame(){
        matches = 0;
        reset.style.opacity = 1;
        cartasViradas = [];
        images = embaralhaCartas(images);
        placar.style.opacity = 1;
        placar.innerHTML = "PLACAR: "+ matches;
        
        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");

        for(var i = 0; i < 16; i++){
            frontFaces[i].classList.remove("virada","acertou");
            backFaces[i].classList.remove("virada","acertou");

            var card = document.querySelector("#card" + i);
            card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
            card.style.top = i < 8 ? 5 + "px" : 250 + "px";

            card.addEventListener("click",viraCard,false);

            frontFaces[i].style.background = "url('"+ images[i].src +"')";
            frontFaces[i].setAttribute("id", images[i].id);
        }

        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click",startGame,false);
        
    }
    //Embaralhando as cartas
    function embaralhaCartas(velhoArray){
        
        var novoArray = [];//Criando um novo array vazio        
        while(novoArray.length !== velhoArray.length){//Avaliando o número de elementos do array            
            var i = Math.floor(Math.random()*velhoArray.length);//Criando um número aleatório entre 0 e 15                       
            if(novoArray.indexOf(velhoArray[i]) < 0){//Avalia se o elemento indicado já existe no novo array                
                novoArray.push(velhoArray[i]);//caso não possua insere o elemento indicado no novo array
            }
        }

        return novoArray;//Retorna o novo array
    }

    //Virando as cartas
    function viraCard(){
        if(cartasViradas.length < 2){
            var faces = this.getElementsByClassName("face");
            if(faces[0].classList.length > 2){
                return;
            }

            faces[0].classList.toggle("virada");
            faces[1].classList.toggle("virada"); 

            cartasViradas.push(this);

            if(cartasViradas.length === 2){
                if(cartasViradas[0].childNodes[3].id === cartasViradas[1].childNodes[3].id){
                    cartasViradas[0].childNodes[1].classList.toggle("acertou");
                    cartasViradas[0].childNodes[3].classList.toggle("acertou");
                    cartasViradas[1].childNodes[1].classList.toggle("acertou");
                    cartasViradas[1].childNodes[3].classList.toggle("acertou"); 
                    
                    matchCardSing();

                    matches++;
                    placar.innerHTML = "PLACAR: "+ matches;
                    cartasViradas = [];

                    if(matches === 8){
                        gameOver();
                    }                    
                }
            }
        } else {
            cartasViradas[0].childNodes[1].classList.toggle("virada");
            cartasViradas[0].childNodes[3].classList.toggle("virada");
            cartasViradas[1].childNodes[1].classList.toggle("virada");
            cartasViradas[1].childNodes[3].classList.toggle("virada");

            cartasViradas = [];
        }               
    } 

    
    function gameOver(){
        reset.style.opacity = 0;
        placar.style.opacity = 0;
        modalGameOver.style.zIndex = 10;
        modalGameOver.addEventListener("click",startGame,false);
    }

    function matchCardSing(){
        imgAcertou.style.zIndex = 1;
        imgAcertou.style.top = 150 + "px";
        imgAcertou.style.opacity = 0;        
        setTimeout(function(){
            imgAcertou.style.zIndex = -1;
            imgAcertou.style.top = 250 + "px";
            imgAcertou.style.opacity = 1;
        },1500);
    }

    reset.addEventListener("click",startGame,false);
    
}());