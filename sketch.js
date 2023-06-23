'use strict';

let symbols;
let img;
let filePicker;
let slider;
let colorPicker;

let newres = 10;
let res = 10;
let wait = 0;

function preload() {
  symbols = [
    loadImage("data/1.png"),
    loadImage("data/2.png"),
    loadImage("data/3.png"),
    loadImage("data/4.png"),
    loadImage("data/5.png"),
    loadImage("data/6.png"),
    loadImage("data/7.png"),
    loadImage("data/8.png"),
    loadImage("data/9.png"),
    loadImage("data/10.png"),
    loadImage("data/11.png"),
  ];
  img = loadImage("Bio_Toni_Simon_01_Ebertin_Mann_oder_Frau_1932.png");
}

function setup() {
  createCanvas(img.width, img.height);

  filePicker = createFileInput(handleFile);

  slider = createSlider(0, 200, 10);
  slider.style('width', '150px');

  colorPicker = createColorPicker('#050505');
  colorPicker.input(()=>{mosaik()});

  setDomPos();
  mosaik();
}

function setDomPos(){
  filePicker.position(img.width+50, 50);
  slider.position(img.width+50, 100);
  colorPicker.position(img.width+50, 150);
}

function mosaik(){
  img.loadPixels();

  background(colorPicker.color());
  let xres = res; let yres = round(res*(height/width));
  let w = width/xres;
  let h = height/yres;
  for (var x = 0; x < xres; x++) {
    for (var y = 0; y < yres; y++) {
      let px = w * x;
      let py = h * y;
      let pixel = img.get(map(x, 0, xres-1, 0, img.width-1), map(y, 0, yres-1, 0, img.height-1));
      let luminance = round(red(pixel) * 0.299 + green(pixel) * 0.587 + blue(pixel) * 0.114);
      let symbolindex = round(map(luminance, 0, 255, 0, symbols.length - 1));
      image(symbols[symbolindex], px, py, w, h);
    }
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    let imgDom = createImg(file.data, '');
    imgDom.hide();

    let imgSrc = imgDom.attribute("src");
    loadImage(imgSrc, (n)=>{
      img = n;
      img.loadPixels();
      resizeCanvas(img.width, img.height);
      setDomPos();
      mosaik();
    });
  }
}

function draw(){
  newres = slider.value();
  if (res !== newres && wait <= 0) {
    wait = 100;
  }
  if (wait == 50){
    res = newres;
    mosaik();
  }
  wait = max(0, wait-1);
}

