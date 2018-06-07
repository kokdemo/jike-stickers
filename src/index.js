import Vue from 'vue/dist/vue.js';
import Konva from "konva";
import _ from 'lodash'

var fontSize = 58;
var fontSizeLite = 45;

function renderText(text, offsetX, offsetY, layer) {
    var bigger = Math.max(offsetX, offsetY)
    _.times(bigger, (n) => {
        var x = offsetX * n / bigger
        var y = offsetY * n / bigger
        var tempText = new Konva.Text({
            text: text,
            fontSize: fontSize,
            fontFamily: 'Lato,YouYuan',
            fill: '#FFFFFF',
            align: 'center',
            shadowColor: "#5EC1FA",
            shadowOffset: {
                x: x,
                y: y
            },
            shadowBlur: 0,
            shadowOpacity: 1
        });
        if(tempText.width() >= 230){
            tempText.fontSize(fontSizeLite);
        }
        var textWidth = tempText.width();
        var textHeight = tempText.height();
        tempText.x((240 - textWidth) / 2);
        tempText.y((140 - textHeight -5) / 2);
        layer.add(tempText);
    })
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
        dataUrl: ''
    },
    mounted: function () {
        this.addText()
    },
    watch:{
        text:function(val){
            this.addText()
        }
    },
    methods: {
        addText() {
            var text = this.text;
            var stage = new Konva.Stage({
                container: 'canvas',
                width: 240,
                height: 140,
            });
            var layer = new Konva.Layer();
            var rect = new Konva.Rect({
                x: 0,
                y: 0,
                width: 240,
                height: 140,
                fill: '#FEE312',
                cornerRadius: 60
            });
            // add the shape to the layer
            layer.add(rect);
            // add text with shadows
            renderText(text, 5, 5, layer);
            // add the layer to the stage
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