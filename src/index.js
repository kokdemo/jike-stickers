import Vue from 'vue/dist/vue.js';
import Konva from "konva";
import _ from 'lodash';
import './index.css';
import catImage from "./cat.png";

var fontSizes = [88,58,45];

function renderText(text, offsetX, offsetY, layer, width ,height,type) {
    var shadowColor = '#5EC1FA';
    if(type == 1){
        shadowColor = '#BD7222'
    }
    var bigger = Math.max(offsetX, offsetY)
    _.times(bigger, (n) => {
        var fontID = 1;
        if(type == 1){
            var fontID = 0;
        }
        var x = offsetX * n / bigger
        var y = offsetY * n / bigger
        var tempText = new Konva.Text({
            text: text,
            fontSize: fontSizes[fontID],
            fontFamily: 'Lato,YouYuan',
            fill: '#FFFFFF',
            align: 'center',
            shadowColor: shadowColor,
            shadowOffset: {
                x: x,
                y: y
            },
            shadowBlur: 0,
            shadowOpacity: 1
        });
        if(tempText.width() >= width-10){
            tempText.fontSize(fontSizes[2]);
        }
        var textWidth = tempText.width();
        var textHeight = tempText.height();
        tempText.x((width - textWidth) / 2);
        tempText.y((height - textHeight -5) / 2);
        layer.add(tempText);
    })
}

function renderStage(width,height){
    return new Konva.Stage({
        container: 'canvas',
        width: width,
        height: height,
    });
}

function renderBackground(type,width,height,radius){
    if(type != 1){
        // 黄白
        var rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: '#FEE312',
            cornerRadius: radius
        });
    }else{
        var img = new Image();
        img.src = catImage;
        var rect = new Konva.Image({
            x:0,
            y:0,
            width:width,
            height:height,
            image:img
        });
    }
    return rect;
}

function downloaduri(uri,name){
    var link = document.createElement('a');
    link.download = name+'.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

var sticker = new Vue({
    el: '#main',
    data: {
        text: 'J',
        dataUrl: '',
        tab:0
    },
    mounted: function () {
        this.addText(0)
    },
    watch:{
        text:function(val){
            var temp = this.tab;
            this.addText(temp)
        }
    },
    methods: {
        changeTab(num){
            this.tab = num;
            if(num == 0){
                this.text = 'J';
            }else{
                this.text = 'Jiker'
            }
        },
        addText(num) {
            // 0 sticker 2 avater 1 cat-sticker
            var text = this.text;
            // 创建stage
            var size = [240,140,60];
            if(num == 2){
                size = [300,300,150]
            }
            var stage = renderStage(size[0],size[1]);          
            // 加载图层1
            var layer = new Konva.Layer();
            // 加载边框
            var rect = renderBackground(num,size[0],size[1],size[2]);
            layer.add(rect)
            renderText(text, 5, 5, layer,size[0],size[1],num);
            stage.add(layer);
            var config = {
                mineType:'image/jpeg',
                quality:1
            }
            this.dataUrl = document.getElementsByTagName('canvas')[0].toDataURL('image/png');
        },
        downloadImg(){
            var dataUrl = this.dataUrl;
            var name = this.text;
            downloaduri(dataUrl,name);

        }
    }
})