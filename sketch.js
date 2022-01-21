var chao,chaoImg,chaoCld;
var batata,batataFrita,garfo,batataMal;
var batataImg,batataFritaImg,garfoImg,batataMalImg;
var jogador,jogadorAnim,jogadorBaixoImg,jogadorPerderImg;
const JOGAR = 0;
const PERDER = 1;
var estado = JOGAR;
var grupoBatatas,grupoObstaculos,grupoBatatasFritas;
var pontuacao;

function criarBatatas(){
  if (frameCount%400 == 0){
    batata = createSprite(900,200);
    batata.velocityX = -5;
    batata.lifetime = 225;
    batata.addImage(batataImg);
    grupoBatatas.add(batata);
  }
  if (frameCount%1900 == 0){
    batataFrita = createSprite(900,200);
    batataFrita.velocityX = -7;
    batataFrita.lifetime = 180;
    batataFrita.addImage(batataFritaImg);
    grupoBatatasFritas.add(batataFrita);
  }
}

function criarObstaculos(){
  if (frameCount%300 == 0){
    garfo = createSprite(900,320);
    garfo.velocityX = -6;
    garfo.lifetime = 150;
    garfo.addImage(garfoImg);
    grupoObstaculos.add(garfo);
    garfo.setCollider("rectangle", 0, 0, 10, 85);
    //garfo.debug = true;
  }
  if (frameCount%720 == 0){
   batataMal = createSprite(910,260);
   batataMal.velocityX = -8;
   batataMal.lifetime = 160;
   batataMal.addImage(batataMalImg);
   grupoObstaculos.add(batataMal);
  }
}

function resetar(){
  estado = JOGAR;
  grupoBatatas.destroyEach();
  grupoBatatasFritas.destroyEach();
  grupoObstaculos.destroyEach();
  pontuacao = 0;
  jogador.addImage(jogadorAnim);
}

function preload(){
 chaoImg = loadImage("chao.png");
 jogadorAnim = loadImage("jogadorAnim.gif");
 jogadorBaixoImg = loadImage("jogadorBaixo.png");
 jogadorPerderImg = loadImage("jogadorPerder.png");
 batataImg = loadImage("batata.png");
 batataFritaImg = loadImage("batatafrita.png");
 batataMalImg = loadImage("batataMal.png");
 garfoImg = loadImage("garfo.png");
}

function setup() {
  createCanvas(900,400);
  jogador = createSprite(60,300);
  jogador.addImage(jogadorAnim);
  //jogador.debug = true;
  chao = createSprite(450,375);
  chao.addImage(chaoImg);
  chaoCld = createSprite(450,375,900,50);
  chaoCld.visible = false;
  grupoBatatas = new Group();
  grupoBatatasFritas = new Group();
  grupoObstaculos = new Group();
  pontuacao = 0;
}

function draw() {
  background(30,240,240);
  text("pontuaçao: " + Math.round(pontuacao), 800, 50);

  if (estado == JOGAR){
    if (chao.x < 0){
      chao.x = 450;
    }

    if(keyDown("space") && jogador.y >= 290){
      jogador.velocityY = -10;
    }

    if (keyDown("s")){
      jogador.addImage(jogadorBaixoImg);
      jogador.setCollider("rectangle", 0, 0, 50, 60);
      jogador.velocityY = jogador.velocityY+1;
    }else{
      jogador.addImage(jogadorAnim);
      jogador.setCollider("rectangle", 0, 0, 60, 100);
    }

    if (grupoObstaculos.isTouching(jogador)){
     estado = PERDER;
    }

    if (grupoBatatas.isTouching(jogador)){
      pontuacao += 1;
      batata.lifetime = 0;
    }
    if (grupoBatatasFritas.isTouching(jogador)){
      pontuacao += 10;
      batataFrita.lifetime = 0;
    }
    chao.velocityX = -6;

    criarBatatas();
    criarObstaculos();

    jogador.velocityY = jogador.velocityY+0.5;

  } else if (estado == PERDER){
    chao.velocityX = 0;
    grupoBatatas.setVelocityXEach(0);
    grupoBatatasFritas.setVelocityXEach(0);
    grupoObstaculos.setVelocityXEach(0);
    jogador.velocityY = 0;

    grupoBatatas.setLifetimeEach(-1);
    grupoBatatasFritas.setLifetimeEach(-1);
    grupoObstaculos.setLifetimeEach(-1);  

    jogador.addImage(jogadorPerderImg);

    text("presione Espaço para reiniciar", 400, 200);

    if (keyDown("space") && estado == PERDER){
      resetar();
    }
  }

  jogador.collide(chaoCld);
  drawSprites();
}