/**
 * Created by zhengxiuming on 2017/6/2.
 */
import './css/common.css';
import Layer from './components/layer/layer.js';
const app = ()=> {
    var layer=new Layer();
    var app=document.getElementById("app");
    app.innerHTML=layer.tpl;
};
new app();