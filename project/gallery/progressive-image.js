!function(t){"use strict";window.GalProImage=function(c){for(var e=c.querySelectorAll(".progressiveImage"),a=e.length,i=0,t=0;t<a;t++)r(e[t]);function s(t,e,a){var i=a/e*100;t.querySelector(".pi-canvas").setAttribute("style","padding-bottom:"+i+"%;")}function r(t,e){var a=t.children[0];if(t.dataset.width&&t.dataset.height)s(t,t.dataset.width,t.dataset.height);else if(a.getAttribute("width")&&a.getAttribute("height"))s(t,a.getAttribute("width"),a.getAttribute("height"));else var i=!1;var r=new Image;r.onload=function(){a.classList.add("loaded"),0==i&&s(t,this.width,this.height),n()},r.onerror=function(){n()},r.src=a.src}function n(){if(++i==a)for(var t=0;t<a;t++)o(e[t],t)}function o(t,e){var a,i,r=t.offsetWidth,s=Math.round(r/(t.dataset.width/t.dataset.height));if(a=c.nextSibling,i="mRight",-1<(" "+a.className+" ").indexOf(" "+i+" ")){document.getElementsByTagName("html")[0];var n=c.getElementsByClassName("progressiveImage")[0];c.setAttribute("style","height:"+parseInt(s)+"px;"),n.setAttribute("style","height:"+parseInt(s)+"px; width: "+parseInt(r)+"px;"),c.nextSibling.setAttribute("style","height:"+parseInt(s)+"px;")}var o=new Image;if(o.onload=function(){o.classList.add("loaded","largeImage"),t.removeAttribute("data-large")},o.onerror=function(){console.log("Large Image - "+e+" Failed To Load")},t.dataset.large)o.src=t.dataset.large;else if("blogger"==t.dataset.source){var g=t.children[0].src,l=g.split("/"),d=l[l.length-2],h=g.replace(d,"w"+r+"-h"+s+"-c");o.src=h}else console.log("Data Large Image - "+e+" is missing");t.appendChild(o)}}}();