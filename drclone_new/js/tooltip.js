addEvent(window,"load",init);
var delayOn = 100;						//delayOn - Tiempo por defecto para que emerja el tooltip (default: 1000ms = 1s)
var delayOffShort = 5000;			//delayOffShort - Tiempo corto por defecto para que se oculte el tooltip
var delayOffMedium = 10000;		//delayOffMedium - Tiempo medio por defecto para que se oculte el tooltip
var delayOffLong = 60000;			//delayOffLong - Tiempo largo por defecto para que se oculte el tooltip

function init()
{
	isTitle = false;
	bodyElm = document.getElementsByTagName("BODY")[0];
	if (document.all)	allElms = document.all;
	else				allElms = document.getElementsByTagName("*");
	for(i=0;i<allElms.length;i++)
	{
		if ((allElms[i].title) && (allElms[i].title!="") && (allElms[i].tagName!="LINK"))
		{
			addEvent(allElms[i],"mousemove",mouseMove);
			addEvent(allElms[i],"mouseover",mouseOver);
			addEvent(allElms[i],"mouseout",mouseOut);

			if (!isTitle)
			{
				labelElm = document.createElement("div");
				labelElm.className = "label";
				bodyElm.appendChild(labelElm);

				isTitle = true;
			}
		}
	}
}

function mouseMove(e)
{
	e = fixE(e);
	labelElm.style.left = (e.x+20)+"px";
	labelElm.style.top = (e.y-20)+"px";

}

function mouseOver(e)
{
	e = fixE(e);
	labelElm.innerHTML = e.targetElement.title;
	e.targetElement.setAttribute("title","");

	if ((labelElm.innerHTML.length>25) && (labelElm.innerHTML.length<=50))	delayOff = delayOffMedium;
	else
	{
		if (labelElm.innerHTML.length>50)	delayOff = delayOffLong;
		else	delayOff = delayOffShort;
	}

	if(labelElm.innerHTML!="")		//opera hack
		timeout = setTimeout("delaying("+delayOff+");",delayOn);
}

function mouseOut(e)
{
	e = fixE(e);
	e.targetElement.setAttribute("title",labelElm.innerHTML);
	labelElm.innerHTML = "";
	labelElm.style.display = "none";
	clearTimeout(timeout);
//	clearTimeout(timeoutOff); //Quitado por drclone
}

function delaying(delay)
{
	labelElm.style.display = 'block';
	timeoutOff = setTimeout("labelElm.style.display = 'none';",delay);		//zatial ee :)
}

function fixE(e)		//make event work in both IE and NN
{
	e = (e) ? e : (window.event) ? window.event : "";
	if (!e.x)	e.x=e.layerX;
	if (!e.y)	e.y=e.layerY;
	e.targetElement = (e.target) ? e.target : e.srcElement;
	e.targetElement = (e.targetElement.nodeType == 1) ? e.targetElement : e.targetElement.parentNode;
	return e;
}

//Scott Andrew's event attacher
function addEvent(obj, evType, fn, useCapture)
{
	if (window.opera)		//opera hack - by Riki 'Fczbkk' Fridrich
		obj = (obj = window) ? document : obj;

	if (obj.addEventListener)
	{
		obj.addEventListener(evType, fn, useCapture);
		return true;
	}
	else if (obj.attachEvent)
	{
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	}
	else
		return false;
}