/*
* Create by 张晓坤 on 2018/4/20
*
* 本文件主要封装一套处理浏览器兼容性的webapi，方便以后工作中使用
*/

/** 1.通过id获取元素
* @param idName:元素id字符串
* @return 获取到的dom对象
*/
function id (idName ) {

    return document.getElementById(idName);

}

/** 2.获取标签元素的内容文本
* @param ele:dom对象元素
* @return 该元素的内容文本
*/
function getText (ele ) {
    //能力检测：判断该元素是否可以通过innerText得到文本
    if(ele.innerText == undefined){
        //如果不行，就换textContent
        return ele.textContent;
    }else{
        //如果可以拿到就返回
        return ele.innerText;
    }
}

/** 3.设置标签元素的内容文本
 * @param ele:dom对象元素  text：要设置的文本
 * @return 无
 */
function setText (ele ,text) {
    //能力检测：判断该元素是否可以通过innerText得到文本
    if(ele.innerText == undefined){
        ele.textContent = text;
    }else{
        ele.innerText = text;
    }
}

/** 4.获取下一个元素
* @param obj：元素节点
* @return 下一个元素节点
*/
function getNextElement ( obj ) {
    //能力检测
    if(obj.nextElementSibling){
        return obj.nextElementSibling;
    }else{
        //获取下一个节点
        var node = obj.nextSibling;//node可能是null 可能是元素节点 可能是其他节点
        //但是并能保证下一个节点是元素，如果不是元素则继续找下一个，以此类推，直到找到下一个为止
        while (node && node.nodeType != 1){//存在且类型不是元素
            //如果节点的类型不是1，表示node不是一个元素节点，那么继续找下一个
            node = node.nextSibling;
        }
        return node;
    }
}

/** 5.获取上一个元素节点
* @param obj:元素节点
* @return  上一个元素节点
*/
function getPreviousElement ( obj ) {
    //能力检测
    if(obj.previousElementSibling){
        return obj.previousElementSibling;
    }else{
        //获取上一个节点
        var node = obj.previousSibling;//node可能是null 可能是元素节点 可能是其他节点
        //但是并能保证上一个节点是元素，如果不是元素则继续找上一个，以此类推，直到找到为止
        while (node && node.nodeType != 1){//存在且类型不是元素
            //如果节点的类型不是1，表示node不是一个元素节点，那么继续找上一个
            node = node.previousSibling;
        }
        return node;
    }
}

/** 6.获取第一个子元素
* @param obj:元素节点
* @return 该元素的第一个子元素节点
*/
function getFirstElement(obj){
    //能力检测
    if(obj.firstElementChild){
        return obj.firstElementChild;
    }else {
        //IE8及之前浏览器会进入这个方法
        var node = obj.firstChild;
        //如果第一个子节点不是元素节点，那么我们应该获取它的下一个节点
        while(node && node.nodeType != 1){
            node = node.nextSibling;//为什么这里是下一个子节点？  第一个子节点只有下一个没有上一个
        }
        return node;
    }
}

/** 7.获取最后一个子元素
* @param obj:元素节点
* @return 最后一个子元素节点
*/
function getLastElement(obj){
    //能力检测
    if(obj.lastElementChild){
        return obj.lastElementChild;
    }else {
        //IE8及之前浏览器会进入这个方法
        var node = obj.lastChild;
        //如果最后一个子节点不是元素节点，那么我们应该获取它的上一个节点
        while(node && node.nodeType != 1){
            node = node.previousSibling;//为什么这里是上一个子节点？  最后一个子节点只有上一个没有下一个
        }
        return node;
    }
}

/** 8.获取元素的样式属性
 * @param  obj:元素对象   attr：属性名字符串
 * @return  value:属性值字符串
 */
function getStyle (obj, attr ) {
    //能力检测
    if(obj.currentStyle){
        //IE8及之前的
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

/** 9.获取页面滚动出去的距离
* @param 无参数
* @return 对象类型   scrollLeft:左边滚动出去的距离  scrollTop：上边滚动出去的距离
*/
function getScroll (  ) {
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return {
        scrollLeft : scrollLeft,//左边是对象属性名，右边是属性值
        scrollTop : scrollTop
    }
}

/** 10.获取页面可视区域大小
* @param 无参数
* @return 对象类型   clientWidth:可视宽度  clientHeight：可视高度
*/
getClientSize = function (  ) {
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
    }
}

/** 11.获取事件的pageX和pageY ：事件触发点相对于页面左上角距离
* @param e:事件对象
* @return 对象类型  pageX：左边距离  pageY：上边距离
*/
function getPagePoint ( e ) {
    e = e || window.event;//事件对象兼容
    return {
        pageX : e.pageX || getScroll().scrollLeft + e.clientX,
        pageY : e.pageY || getScroll().scrollTop + e.clientY,
    }
}