"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Ui=Ops.Ui || {};
Ops.Anim=Ops.Anim || {};
Ops.Date=Ops.Date || {};
Ops.Html=Ops.Html || {};
Ops.Json=Ops.Json || {};
Ops.Math=Ops.Math || {};
Ops.User=Ops.User || {};
Ops.Vars=Ops.Vars || {};
Ops.Array=Ops.Array || {};
Ops.Color=Ops.Color || {};
Ops.Patch=Ops.Patch || {};
Ops.Value=Ops.Value || {};
Ops.Cables=Ops.Cables || {};
Ops.Json3d=Ops.Json3d || {};
Ops.String=Ops.String || {};
Ops.Boolean=Ops.Boolean || {};
Ops.Devices=Ops.Devices || {};
Ops.Physics=Ops.Physics || {};
Ops.Sidebar=Ops.Sidebar || {};
Ops.Trigger=Ops.Trigger || {};
Ops.WebAudio=Ops.WebAudio || {};
Ops.Gl.Matrix=Ops.Gl.Matrix || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};
Ops.Gl.Shader=Ops.Gl.Shader || {};
Ops.Deprecated=Ops.Deprecated || {};
Ops.Json3d.Bones=Ops.Json3d.Bones || {};
Ops.Deprecated.Gl=Ops.Deprecated.Gl || {};
Ops.Devices.Mouse=Ops.Devices.Mouse || {};
Ops.Devices.Mobile=Ops.Devices.Mobile || {};
Ops.User.alivemachine=Ops.User.alivemachine || {};
Ops.Deprecated.Gl.Matrix=Ops.Deprecated.Gl.Matrix || {};
Ops.WebAudio.TextToSpeech=Ops.WebAudio.TextToSpeech || {};



// **************************************************************
// 
// Ops.Html.ElementChilds
// 
// **************************************************************

Ops.Html.ElementChilds = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    parentPort = op.inObject("Parent"),
    outParent = op.outObject("Parent Out");

const inPorts = [];
for (let i = 0; i < 10; i++)
{
    const p = op.inObject("Child " + (i + 1));
    inPorts.push(p);
    p.onChange = rebuild;
}

parentPort.onChange = rebuild;

function rebuild()
{
    const parent = parentPort.get();
    if (!parent) return;

    let child = parent.lastElementChild;
    while (child)
    {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }

    for (let i = 0; i < inPorts.length; i++)
    {
        const p = inPorts[i].get();
        if (p && parent)
        {
            parent.appendChild(p);
        }
    }

    outParent.set(parent);
}


};

Ops.Html.ElementChilds.prototype = new CABLES.Op();
CABLES.OPS["65c535ef-70f0-47f6-bb82-5b6c8e6d9dd9"]={f:Ops.Html.ElementChilds,objName:"Ops.Html.ElementChilds"};




// **************************************************************
// 
// Ops.Cables.FPS
// 
// **************************************************************

Ops.Cables.FPS = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inDuration = op.inFloat("Duration", 3),
    active = op.inBool("Active", true),
    outFPS = op.outValue("FPS"),
    outFPSAvg = op.outValue("Average FPS");

let startTime = Date.now();
let countFpsNums = 0;
let countFps = 0;

op.onDelete = function ()
{
    op.patch.removeEventListener("performance", update);
};

function update(p)
{
    if (active.get())
    {
        outFPS.set(p.fps);
        countFps += p.fps;
        countFpsNums++;

        if ((Date.now() - startTime) / 1000 > inDuration.get())
        {
            outFPSAvg.set(countFps / countFpsNums);
            countFps = 0;
            countFpsNums = 0;
            startTime = Date.now();
        }
    }
}

op.patch.addEventListener("performance", update);


};

Ops.Cables.FPS.prototype = new CABLES.Op();
CABLES.OPS["1bbd3b97-d8cd-4ff6-a6a4-f5121c28d29f"]={f:Ops.Cables.FPS,objName:"Ops.Cables.FPS"};




// **************************************************************
// 
// Ops.Sidebar.Sidebar
// 
// **************************************************************

Ops.Sidebar.Sidebar = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={style_css:" /*\n * SIDEBAR\n  http://danielstern.ca/range.css/#/\n  https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-progress-value\n */\n\n\n.icon-chevron-down {\n    top: 2px;\n    right: 9px;\n}\n\n.iconsidebar-chevron-up,.sidebar__close-button {\n\tbackground-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n}\n\n.iconsidebar-minimizebutton {\n    background-position: 98% center;\n    background-repeat: no-repeat;\n}\n\n.sidebar-cables-right\n{\n    right: 15px;\n    left: initial !important;\n}\n\n.sidebar-cables {\n    --sidebar-color: #07f78c;\n    --sidebar-width: 220px;\n    --sidebar-border-radius: 10px;\n    --sidebar-monospace-font-stack: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n    --sidebar-hover-transition-time: .2s;\n\n    position: absolute;\n    top: 15px;\n    left: 15px;\n    border-radius: var(--sidebar-border-radius);\n    z-index: 100000;\n    color: #BBBBBB;\n    width: var(  --sidebar-width);\n    max-height: 100%;\n    box-sizing: border-box;\n    overflow-y: auto;\n    overflow-x: hidden;\n    font-size: 13px;\n    font-family: Arial;\n    line-height: 1em; /* prevent emojis from breaking height of the title */\n}\n\n.sidebar-cables::selection {\n    background-color: var(--sidebar-color);\n    color: #EEEEEE;\n}\n\n.sidebar-cables::-webkit-scrollbar {\n    background-color: transparent;\n    --cables-scrollbar-width: 8px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-track {\n    background-color: transparent;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-thumb {\n    background-color: #333333;\n    border-radius: 4px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables--closed {\n    width: auto;\n}\n\n.sidebar__close-button {\n    background-color: #222;\n    /*-webkit-user-select: none;  */\n    /*-moz-user-select: none;     */\n    /*-ms-user-select: none;      */\n    /*user-select: none;          */\n    /*transition: background-color var(--sidebar-hover-transition-time);*/\n    /*color: #CCCCCC;*/\n    height: 2px;\n    /*border-bottom:20px solid #222;*/\n\n    /*box-sizing: border-box;*/\n    /*padding-top: 2px;*/\n    /*text-align: center;*/\n    /*cursor: pointer;*/\n    /*border-radius: 0 0 var(--sidebar-border-radius) var(--sidebar-border-radius);*/\n    /*opacity: 1.0;*/\n    /*transition: opacity 0.3s;*/\n    /*overflow: hidden;*/\n}\n\n.sidebar__close-button-icon {\n    display: inline-block;\n    /*opacity: 0;*/\n    width: 20px;\n    height: 20px;\n    /*position: relative;*/\n    /*top: -1px;*/\n\n\n}\n\n.sidebar--closed {\n    width: auto;\n    margin-right: 20px;\n}\n\n.sidebar--closed .sidebar__close-button {\n    margin-top: 8px;\n    margin-left: 8px;\n    padding:10px;\n\n    height: 25px;\n    width:25px;\n    border-radius: 50%;\n    cursor: pointer;\n    opacity: 0.3;\n    background-repeat: no-repeat;\n    background-position: center center;\n    transform:rotate(180deg);\n}\n\n.sidebar--closed .sidebar__group\n{\n    display:none;\n\n}\n.sidebar--closed .sidebar__close-button-icon {\n    background-position: 0px 0px;\n}\n\n.sidebar__close-button:hover {\n    background-color: #111111;\n    opacity: 1.0 !important;\n}\n\n/*\n * SIDEBAR ITEMS\n */\n\n.sidebar__items {\n    /* max-height: 1000px; */\n    /* transition: max-height 0.5;*/\n    background-color: #222;\n    padding-bottom: 20px;\n}\n\n.sidebar--closed .sidebar__items {\n    /* max-height: 0; */\n    height: 0;\n    display: none;\n    pointer-interactions: none;\n}\n\n.sidebar__item__right {\n    float: right;\n}\n\n/*\n * SIDEBAR GROUP\n */\n\n.sidebar__group {\n    /*background-color: #1A1A1A;*/\n    overflow: hidden;\n    box-sizing: border-box;\n    animate: height;\n    background-color: #151515;\n    /* max-height: 1000px; */\n    /* transition: max-height 0.5s; */\n--sidebar-group-header-height: 33px;\n}\n\n.sidebar__group-items\n{\n    padding-top: 15px;\n    padding-bottom: 15px;\n}\n\n.sidebar__group--closed {\n    /* max-height: 13px; */\n    height: var(--sidebar-group-header-height);\n}\n\n.sidebar__group-header {\n    box-sizing: border-box;\n    color: #EEEEEE;\n    background-color: #151515;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n\n    /*height: 100%;//var(--sidebar-group-header-height);*/\n\n    padding-top: 7px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    cursor: pointer;\n    /*transition: background-color var(--sidebar-hover-transition-time);*/\n    position: relative;\n}\n\n.sidebar__group-header:hover {\n  background-color: #111111;\n}\n\n.sidebar__group-header-title {\n  float: left;\n  overflow: hidden;\n  padding: 0 15px;\n  padding-top:5px;\n  padding-bottom:10px;\n  font-weight:bold;\n}\n\n.sidebar__group-header-undo {\n    float: right;\n    overflow: hidden;\n    padding-right: 15px;\n    padding-top:5px;\n    font-weight:bold;\n  }\n\n.sidebar__group-header-icon {\n    width: 17px;\n    height: 14px;\n    background-repeat: no-repeat;\n    display: inline-block;\n    position: absolute;\n    background-size: cover;\n\n    /* icon open */\n    /* feather icon: chevron up */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n    top: 4px;\n    right: 5px;\n    opacity: 0.0;\n    transition: opacity 0.3;\n}\n\n.sidebar__group-header:hover .sidebar__group-header-icon {\n    opacity: 1.0;\n}\n\n/* icon closed */\n.sidebar__group--closed .sidebar__group-header-icon {\n    /* feather icon: chevron down */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n    top: 4px;\n    right: 5px;\n}\n\n/*\n * SIDEBAR ITEM\n */\n\n.sidebar__item\n{\n    box-sizing: border-box;\n    padding: 7px;\n    padding-left:15px;\n    padding-right:15px;\n\n    overflow: hidden;\n    position: relative;\n}\n\n.sidebar__item-label {\n    display: inline-block;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    width: calc(50% - 7px);\n    margin-right: 7px;\n    margin-top: 2px;\n    text-overflow: ellipsis;\n    /* overflow: hidden; */\n}\n\n.sidebar__item-value-label {\n    font-family: var(--sidebar-monospace-font-stack);\n    display: inline-block;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    max-width: 60%;\n}\n\n.sidebar__item-value-label::selection {\n    background-color: var(--sidebar-color);\n    color: #EEEEEE;\n}\n\n.sidebar__item + .sidebar__item,\n.sidebar__item + .sidebar__group,\n.sidebar__group + .sidebar__item,\n.sidebar__group + .sidebar__group {\n    /*border-top: 1px solid #272727;*/\n}\n\n/*\n * SIDEBAR ITEM TOGGLE\n */\n\n/*.sidebar__toggle */\n.icon_toggle{\n    cursor: pointer;\n}\n\n.sidebar__toggle-input {\n    --sidebar-toggle-input-color: #CCCCCC;\n    --sidebar-toggle-input-color-hover: #EEEEEE;\n    --sidebar-toggle-input-border-size: 2px;\n    display: inline;\n    float: right;\n    box-sizing: border-box;\n    border-radius: 50%;\n    cursor: pointer;\n    --toggle-size: 11px;\n    margin-top: 2px;\n    background-color: transparent !important;\n    border: var(--sidebar-toggle-input-border-size) solid var(--sidebar-toggle-input-color);\n    width: var(--toggle-size);\n    height: var(--toggle-size);\n    transition: background-color var(--sidebar-hover-transition-time);\n    transition: border-color var(--sidebar-hover-transition-time);\n}\n.sidebar__toggle:hover .sidebar__toggle-input {\n    border-color: var(--sidebar-toggle-input-color-hover);\n}\n\n.sidebar__toggle .sidebar__item-value-label {\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    max-width: calc(50% - 12px);\n}\n.sidebar__toggle-input::after { clear: both; }\n\n.sidebar__toggle--active .icon_toggle\n{\n\n    background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE1cHgiIHdpZHRoPSIzMHB4IiBmaWxsPSIjMDZmNzhiIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzA2Zjc4YiIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCBjMTIuNjUsMCwyMy0xMC4zNSwyMy0yM2wwLDBjMC0xMi42NS0xMC4zNS0yMy0yMy0yM0gzMHogTTcwLDY3Yy05LjM4OSwwLTE3LTcuNjEtMTctMTdzNy42MTEtMTcsMTctMTdzMTcsNy42MSwxNywxNyAgICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PC9nPjwvZz48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMweiBNNzAsNjdjLTkuMzg5LDAtMTctNy42MS0xNy0xN3M3LjYxMS0xNywxNy0xN3MxNyw3LjYxLDE3LDE3ICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBmaWxsPSIjMDZmNzhiIiBzdHJva2U9IiMwNmY3OGIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNyw1MGMwLDEyLjY1LDEwLjM1LDIzLDIzLDIzaDQwICAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMwQzE3LjM1LDI3LDcsMzcuMzUsNyw1MEw3LDUweiI+PC9wYXRoPjwvZz48Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNmY3OGIiIHN0cm9rZT0iIzA2Zjc4YiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI3MCIgY3k9IjUwIiByPSIxNyI+PC9jaXJjbGU+PC9nPjxnIGRpc3BsYXk9Im5vbmUiPjxwYXRoIGRpc3BsYXk9ImlubGluZSIgZD0iTTcwLDI1SDMwQzE2LjIxNSwyNSw1LDM2LjIxNSw1LDUwczExLjIxNSwyNSwyNSwyNWg0MGMxMy43ODUsMCwyNS0xMS4yMTUsMjUtMjVTODMuNzg1LDI1LDcwLDI1eiBNNzAsNzEgICBIMzBDMTguNDIxLDcxLDksNjEuNTc5LDksNTBzOS40MjEtMjEsMjEtMjFoNDBjMTEuNTc5LDAsMjEsOS40MjEsMjEsMjFTODEuNTc5LDcxLDcwLDcxeiBNNzAsMzFjLTEwLjQ3NywwLTE5LDguNTIzLTE5LDE5ICAgczguNTIzLDE5LDE5LDE5czE5LTguNTIzLDE5LTE5UzgwLjQ3NywzMSw3MCwzMXogTTcwLDY1Yy04LjI3MSwwLTE1LTYuNzI5LTE1LTE1czYuNzI5LTE1LDE1LTE1czE1LDYuNzI5LDE1LDE1Uzc4LjI3MSw2NSw3MCw2NXoiPjwvcGF0aD48L2c+PC9zdmc+);\n    opacity: 1;\n    transform: rotate(0deg);\n}\n\n\n.icon_toggle\n{\n    float: right;\n    width:40px;\n    height:18px;\n    background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE1cHgiIHdpZHRoPSIzMHB4IiBmaWxsPSIjYWFhYWFhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2FhYWFhYSIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCBjMTIuNjUsMCwyMy0xMC4zNSwyMy0yM2wwLDBjMC0xMi42NS0xMC4zNS0yMy0yMy0yM0gzMHogTTcwLDY3Yy05LjM4OSwwLTE3LTcuNjEtMTctMTdzNy42MTEtMTcsMTctMTdzMTcsNy42MSwxNywxNyAgICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PC9nPjwvZz48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMweiBNNzAsNjdjLTkuMzg5LDAtMTctNy42MS0xNy0xN3M3LjYxMS0xNywxNy0xN3MxNyw3LjYxLDE3LDE3ICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBmaWxsPSIjYWFhYWFhIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNyw1MGMwLDEyLjY1LDEwLjM1LDIzLDIzLDIzaDQwICAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMwQzE3LjM1LDI3LDcsMzcuMzUsNyw1MEw3LDUweiI+PC9wYXRoPjwvZz48Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNhYWFhYWEiIHN0cm9rZT0iI2FhYWFhYSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI3MCIgY3k9IjUwIiByPSIxNyI+PC9jaXJjbGU+PC9nPjxnIGRpc3BsYXk9Im5vbmUiPjxwYXRoIGRpc3BsYXk9ImlubGluZSIgZD0iTTcwLDI1SDMwQzE2LjIxNSwyNSw1LDM2LjIxNSw1LDUwczExLjIxNSwyNSwyNSwyNWg0MGMxMy43ODUsMCwyNS0xMS4yMTUsMjUtMjVTODMuNzg1LDI1LDcwLDI1eiBNNzAsNzEgICBIMzBDMTguNDIxLDcxLDksNjEuNTc5LDksNTBzOS40MjEtMjEsMjEtMjFoNDBjMTEuNTc5LDAsMjEsOS40MjEsMjEsMjFTODEuNTc5LDcxLDcwLDcxeiBNNzAsMzFjLTEwLjQ3NywwLTE5LDguNTIzLTE5LDE5ICAgczguNTIzLDE5LDE5LDE5czE5LTguNTIzLDE5LTE5UzgwLjQ3NywzMSw3MCwzMXogTTcwLDY1Yy04LjI3MSwwLTE1LTYuNzI5LTE1LTE1czYuNzI5LTE1LDE1LTE1czE1LDYuNzI5LDE1LDE1Uzc4LjI3MSw2NSw3MCw2NXoiPjwvcGF0aD48L2c+PC9zdmc+);\n    background-size: 50px 37px;\n    background-position: -6px -10px;\n    transform: rotate(180deg);\n    opacity: 0.4;\n}\n\n\n\n/*.sidebar__toggle--active .sidebar__toggle-input {*/\n/*    transition: background-color var(--sidebar-hover-transition-time);*/\n/*    background-color: var(--sidebar-toggle-input-color);*/\n/*}*/\n/*.sidebar__toggle--active .sidebar__toggle-input:hover*/\n/*{*/\n/*    background-color: var(--sidebar-toggle-input-color-hover);*/\n/*    border-color: var(--sidebar-toggle-input-color-hover);*/\n/*    transition: background-color var(--sidebar-hover-transition-time);*/\n/*    transition: border-color var(--sidebar-hover-transition-time);*/\n/*}*/\n\n/*\n * SIDEBAR ITEM BUTTON\n */\n\n.sidebar__button {}\n\n.sidebar__button-input {\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    min-height: 24px;\n    background-color: transparent;\n    color: #CCCCCC;\n    box-sizing: border-box;\n    padding-top: 3px;\n    text-align: center;\n    border-radius: 125px;\n    border:2px solid #555;\n    cursor: pointer;\n    padding-bottom: 3px;\n}\n\n.sidebar__button-input.plus, .sidebar__button-input.minus {\n    display: inline-block;\n    min-width: 20px;\n}\n\n.sidebar__button-input:hover {\n  background-color: #333;\n  border:2px solid var(--sidebar-color);\n}\n\n/*\n * VALUE DISPLAY (shows a value)\n */\n\n.sidebar__value-display {}\n\n/*\n * SLIDER\n */\n\n.sidebar__slider {\n    --sidebar-slider-input-height: 3px;\n}\n\n.sidebar__slider-input-wrapper {\n    width: 100%;\n    margin-top: 8px;\n    position: relative;\n}\n\n.sidebar__slider-input {\n    -webkit-appearance: none;\n    appearance: none;\n    margin: 0;\n    width: 100%;\n    height: var(--sidebar-slider-input-height);\n    background: #555;\n    cursor: pointer;\n    outline: 0;\n\n    -webkit-transition: .2s;\n    transition: background-color .2s;\n    border: none;\n}\n\n.sidebar__slider-input:focus, .sidebar__slider-input:hover {\n    border: none;\n}\n\n.sidebar__slider-input-active-track {\n    user-select: none;\n    position: absolute;\n    z-index: 11;\n    top: 0;\n    left: 0;\n    background-color: var(--sidebar-color);\n    pointer-events: none;\n    height: var(--sidebar-slider-input-height);\n\n    /* width: 10px; */\n}\n\n/* Mouse-over effects */\n.sidebar__slider-input:hover {\n    /*background-color: #444444;*/\n}\n\n/*.sidebar__slider-input::-webkit-progress-value {*/\n/*    background-color: green;*/\n/*    color:green;*/\n\n/*    }*/\n\n/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */\n\n.sidebar__slider-input::-moz-range-thumb\n{\n    position: absolute;\n    height: 15px;\n    width: 15px;\n    z-index: 900 !important;\n    border-radius: 20px !important;\n    cursor: pointer;\n    background: var(--sidebar-color) !important;\n    user-select: none;\n\n}\n\n.sidebar__slider-input::-webkit-slider-thumb\n{\n    position: relative;\n    appearance: none;\n    -webkit-appearance: none;\n    user-select: none;\n    height: 15px;\n    width: 15px;\n    display: block;\n    z-index: 900 !important;\n    border: 0;\n    border-radius: 20px !important;\n    cursor: pointer;\n    background: #777 !important;\n}\n\n.sidebar__slider-input:hover ::-webkit-slider-thumb {\n    background-color: #EEEEEE !important;\n}\n\n/*.sidebar__slider-input::-moz-range-thumb {*/\n\n/*    width: 0 !important;*/\n/*    height: var(--sidebar-slider-input-height);*/\n/*    background: #EEEEEE;*/\n/*    cursor: pointer;*/\n/*    border-radius: 0 !important;*/\n/*    border: none;*/\n/*    outline: 0;*/\n/*    z-index: 100 !important;*/\n/*}*/\n\n.sidebar__slider-input::-moz-range-track {\n    background-color: transparent;\n    z-index: 11;\n}\n\n/*.sidebar__slider-input::-moz-range-thumb:hover {*/\n  /* background-color: #EEEEEE; */\n/*}*/\n\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input-active-track {*/\n/*    background-color: #EEEEEE;*/\n/*}*/\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-moz-range-thumb {*/\n/*    background-color: #fff !important;*/\n/*}*/\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-webkit-slider-thumb {*/\n/*    background-color: #EEEEEE;*/\n/*}*/\n\n.sidebar__slider input[type=text] {\n    box-sizing: border-box;\n    /*background-color: #333333;*/\n    text-align: right;\n    color: #BBBBBB;\n    display: inline-block;\n    background-color: transparent !important;\n\n    width: 40%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n}\n\n.sidebar__slider input[type=text]:active,\n.sidebar__slider input[type=text]:focus,\n.sidebar__slider input[type=text]:hover {\n\n    color: #EEEEEE;\n}\n\n/*\n * TEXT / DESCRIPTION\n */\n\n.sidebar__text .sidebar__item-label {\n    width: auto;\n    display: block;\n    max-height: none;\n    margin-right: 0;\n    line-height: 1.1em;\n}\n\n/*\n * SIDEBAR INPUT\n */\n.sidebar__text-input textarea,\n.sidebar__text-input input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: 50%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    border:1px solid #666;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n}\n\n.sidebar__text-input textarea:focus::placeholder {\n  color: transparent;\n}\n\n.sidebar__color-picker .sidebar__item-label\n{\n    width:45%;\n}\n\n.sidebar__text-input textarea,\n.sidebar__text-input input[type=text]:active,\n.sidebar__text-input input[type=text]:focus,\n.sidebar__text-input input[type=text]:hover {\n    background-color: transparent;\n    color: #EEEEEE;\n}\n\n.sidebar__text-input textarea\n{\n    margin-top:10px;\n    height:60px;\n    width:100%;\n}\n\n/*\n * SIDEBAR SELECT\n */\n\n\n\n .sidebar__select {}\n .sidebar__select-select {\n    color: #BBBBBB;\n    /*-webkit-appearance: none;*/\n    /*-moz-appearance: none;*/\n    appearance: none;\n    /*box-sizing: border-box;*/\n    width: 50%;\n    height: 20px;\n    background-color: #333333;\n    /*background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);*/\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 16px 16px;\n    margin: 0;\n    /*padding: 0 2 2 6px;*/\n    border-radius: 5px;\n    border: 1px solid #777;\n    background-color: #444;\n    cursor: pointer;\n    outline: none;\n    padding-left: 5px;\n\n }\n\n.sidebar__select-select:hover,\n.sidebar__select-select:active,\n.sidebar__select-select:active {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n/*\n * COLOR PICKER\n */\n\n .sidebar__color-picker-color-input {}\n\n .sidebar__color-picker input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: calc(50% - 21px); /* 50% minus space of picker circle */\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n    margin-right: 7px;\n}\n\n.sidebar__color-picker input[type=text]:active,\n.sidebar__color-picker input[type=text]:focus,\n.sidebar__color-picker input[type=text]:hover {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n.sidebar__color-picker input[type=color],\n.sidebar__palette-picker input[type=color] {\n    display: inline-block;\n    border-radius: 100%;\n    height: 14px;\n    width: 14px;\n    padding: 0;\n    border: none;\n    border-color: transparent;\n    outline: none;\n    background: none;\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    cursor: pointer;\n    position: relative;\n    top: 3px;\n}\n.sidebar__color-picker input[type=color]:focus,\n.sidebar__palette-picker input[type=color]:focus {\n    outline: none;\n}\n.sidebar__color-picker input[type=color]::-moz-color-swatch,\n.sidebar__palette-picker input[type=color]::-moz-color-swatch {\n    border: none;\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch-wrapper,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch-wrapper {\n    padding: 0;\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch {\n    border: none;\n    border-radius: 100%;\n}\n\n/*\n * Palette Picker\n */\n.sidebar__palette-picker .sidebar__palette-picker-color-input.first {\n    margin-left: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input.last {\n    margin-right: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input {\n    margin: 0 4px;\n}\n\n.sidebar__palette-picker .circlebutton {\n    width: 14px;\n    height: 14px;\n    border-radius: 1em;\n    display: inline-block;\n    top: 3px;\n    position: relative;\n}\n\n/*\n * Preset\n */\n.sidebar__item-presets-preset\n{\n    padding:4px;\n    cursor:pointer;\n    padding-left:8px;\n    padding-right:8px;\n    margin-right:4px;\n    background-color:#444;\n}\n\n.sidebar__item-presets-preset:hover\n{\n    background-color:#666;\n}\n\n.sidebar__greyout\n{\n    background: #222;\n    opacity: 0.8;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 1000;\n    right: 0;\n    top: 0;\n}\n\n.sidebar_tabs\n{\n    background-color: #151515;\n    padding-bottom: 0px;\n}\n\n.sidebar_switchs\n{\n    float: right;\n}\n\n.sidebar_tab\n{\n    float:left;\n    background-color: #151515;\n    border-bottom:1px solid transparent;\n    padding-right:7px;\n    padding-left:7px;\n    padding-bottom: 5px;\n    padding-top: 5px;\n    cursor:pointer;\n}\n\n.sidebar_tab_active\n{\n    background-color: #272727;\n    color:white;\n}\n\n.sidebar_tab:hover\n{\n    border-bottom:1px solid #777;\n    color:white;\n}\n\n\n.sidebar_switch\n{\n    float:left;\n    background-color: #444;\n    padding-right:7px;\n    padding-left:7px;\n    padding-bottom: 5px;\n    padding-top: 5px;\n    cursor:pointer;\n}\n\n.sidebar_switch:last-child\n{\n    border-top-right-radius: 7px;\n    border-bottom-right-radius: 7px;\n}\n\n.sidebar_switch:first-child\n{\n    border-top-left-radius: 7px;\n    border-bottom-left-radius: 7px;\n}\n\n\n.sidebar_switch_active\n{\n    background-color: #999;\n    color:white;\n}\n\n.sidebar_switch:hover\n{\n    color:white;\n}\n",};
// vars
const CSS_ELEMENT_CLASS = "cables-sidebar-style"; /* class for the style element to be generated */
const CSS_ELEMENT_DYNAMIC_CLASS = "cables-sidebar-dynamic-style"; /* things which can be set via op-port, but not attached to the elements themselves, e.g. minimized opacity */
const SIDEBAR_CLASS = "sidebar-cables";
const SIDEBAR_ID = "sidebar" + CABLES.uuid();
const SIDEBAR_ITEMS_CLASS = "sidebar__items";
const SIDEBAR_OPEN_CLOSE_BTN_CLASS = "sidebar__close-button";

const BTN_TEXT_OPEN = ""; // 'Close';
const BTN_TEXT_CLOSED = ""; // 'Show Controls';

let openCloseBtn = null;
let openCloseBtnIcon = null;
let headerTitleText = null;

// inputs
const visiblePort = op.inValueBool("Visible", true);
const opacityPort = op.inValueSlider("Opacity", 1);
const defaultMinimizedPort = op.inValueBool("Default Minimized");
const minimizedOpacityPort = op.inValueSlider("Minimized Opacity", 0.5);
const undoButtonPort = op.inValueBool("Show undo button", false);
const inMinimize = op.inValueBool("Show Minimize", false);

const inTitle = op.inString("Title", "Sidebar");
const side = op.inValueBool("Side");

// outputs
const childrenPort = op.outObject("childs");
const isOpenOut = op.outBool("Opened");

let sidebarEl = document.querySelector("." + SIDEBAR_ID);
if (!sidebarEl)
{
    sidebarEl = initSidebarElement();
}
// if(!sidebarEl) return;
const sidebarItemsEl = sidebarEl.querySelector("." + SIDEBAR_ITEMS_CLASS);
childrenPort.set({
    "parentElement": sidebarItemsEl,
    "parentOp": op,
});
onDefaultMinimizedPortChanged();
initSidebarCss();
updateDynamicStyles();

// change listeners
visiblePort.onChange = onVisiblePortChange;
opacityPort.onChange = onOpacityPortChange;
defaultMinimizedPort.onChange = onDefaultMinimizedPortChanged;
minimizedOpacityPort.onChange = onMinimizedOpacityPortChanged;
undoButtonPort.onChange = onUndoButtonChange;
op.onDelete = onDelete;

// functions

function onMinimizedOpacityPortChanged()
{
    updateDynamicStyles();
}

inMinimize.onChange = updateMinimize;

function updateMinimize(header)
{
    if (!header || header.uiAttribs) header = document.querySelector(".sidebar-cables .sidebar__group-header");
    if (!header) return;

    const undoButton = document.querySelector(".sidebar-cables .sidebar__group-header .sidebar__group-header-undo");

    if (inMinimize.get())
    {
        header.classList.add("iconsidebar-chevron-up");
        header.classList.add("iconsidebar-minimizebutton");

        if (undoButton)undoButton.style.marginRight = "20px";
    }
    else
    {
        header.classList.remove("iconsidebar-chevron-up");
        header.classList.remove("iconsidebar-minimizebutton");

        if (undoButton)undoButton.style.marginRight = "initial";
    }
}

side.onChange = function ()
{
    if (side.get()) sidebarEl.classList.add("sidebar-cables-right");
    else sidebarEl.classList.remove("sidebar-cables-right");
};

function onUndoButtonChange()
{
    const header = document.querySelector(".sidebar-cables .sidebar__group-header");
    if (header)
    {
        initUndoButton(header);
    }
}

function initUndoButton(header)
{
    if (header)
    {
        const undoButton = document.querySelector(".sidebar-cables .sidebar__group-header .sidebar__group-header-undo");
        if (undoButton)
        {
            if (!undoButtonPort.get())
            {
                // header.removeChild(undoButton);
                undoButton.remove();
            }
        }
        else
        {
            if (undoButtonPort.get())
            {
                const headerUndo = document.createElement("span");
                headerUndo.classList.add("sidebar__group-header-undo");
                headerUndo.classList.add("fa");
                headerUndo.classList.add("fa-undo");

                headerUndo.addEventListener("click", function (event)
                {
                    event.stopPropagation();
                    const reloadables = document.querySelectorAll(".sidebar-cables .sidebar__reloadable");
                    const doubleClickEvent = document.createEvent("MouseEvents");
                    doubleClickEvent.initEvent("dblclick", true, true);
                    reloadables.forEach((reloadable) =>
                    {
                        reloadable.dispatchEvent(doubleClickEvent);
                    });
                });
                header.appendChild(headerUndo);
            }
        }
    }
    updateMinimize(header);
}

function onDefaultMinimizedPortChanged()
{
    if (!openCloseBtn) { return; }
    if (defaultMinimizedPort.get())
    {
        sidebarEl.classList.add("sidebar--closed");
        if (visiblePort.get())
        {
            isOpenOut.set(false);
        }
        // openCloseBtn.textContent = BTN_TEXT_CLOSED;
    }
    else
    {
        sidebarEl.classList.remove("sidebar--closed");
        if (visiblePort.get())
        {
            isOpenOut.set(true);
        }
        // openCloseBtn.textContent = BTN_TEXT_OPEN;
    }
}

function onOpacityPortChange()
{
    const opacity = opacityPort.get();
    sidebarEl.style.opacity = opacity;
}

function onVisiblePortChange()
{
    if (visiblePort.get())
    {
        sidebarEl.style.display = "block";
        if (!sidebarEl.classList.contains("sidebar--closed"))
        {
            isOpenOut.set(true);
        }
    }
    else
    {
        sidebarEl.style.display = "none";
        isOpenOut.set(false);
    }
}

side.onChanged = function ()
{

};

/**
 * Some styles cannot be set directly inline, so a dynamic stylesheet is needed.
 * Here hover states can be set later on e.g.
 */
function updateDynamicStyles()
{
    const dynamicStyles = document.querySelectorAll("." + CSS_ELEMENT_DYNAMIC_CLASS);
    if (dynamicStyles)
    {
        dynamicStyles.forEach(function (e)
        {
            e.parentNode.removeChild(e);
        });
    }
    const newDynamicStyle = document.createElement("style");
    newDynamicStyle.classList.add(CSS_ELEMENT_DYNAMIC_CLASS);
    let cssText = ".sidebar--closed .sidebar__close-button { ";
    cssText += "opacity: " + minimizedOpacityPort.get();
    cssText += "}";
    const cssTextEl = document.createTextNode(cssText);
    newDynamicStyle.appendChild(cssTextEl);
    document.body.appendChild(newDynamicStyle);
}

function initSidebarElement()
{
    const element = document.createElement("div");
    element.classList.add(SIDEBAR_CLASS);
    element.classList.add(SIDEBAR_ID);
    const canvasWrapper = op.patch.cgl.canvas.parentElement; /* maybe this is bad outside cables!? */

    // header...
    const headerGroup = document.createElement("div");
    headerGroup.classList.add("sidebar__group");

    element.appendChild(headerGroup);
    const header = document.createElement("div");
    header.classList.add("sidebar__group-header");

    element.appendChild(header);
    const headerTitle = document.createElement("span");
    headerTitle.classList.add("sidebar__group-header-title");
    headerTitleText = document.createElement("span");
    headerTitleText.classList.add("sidebar__group-header-title-text");
    headerTitleText.innerHTML = inTitle.get();
    headerTitle.appendChild(headerTitleText);
    header.appendChild(headerTitle);

    initUndoButton(header);
    updateMinimize(header);

    headerGroup.appendChild(header);
    element.appendChild(headerGroup);
    headerGroup.addEventListener("click", onOpenCloseBtnClick);

    if (!canvasWrapper)
    {
        op.warn("[sidebar] no canvas parentelement found...");
        return;
    }
    canvasWrapper.appendChild(element);
    const items = document.createElement("div");
    items.classList.add(SIDEBAR_ITEMS_CLASS);
    element.appendChild(items);
    openCloseBtn = document.createElement("div");
    openCloseBtn.classList.add(SIDEBAR_OPEN_CLOSE_BTN_CLASS);
    openCloseBtn.addEventListener("click", onOpenCloseBtnClick);
    // openCloseBtn.textContent = BTN_TEXT_OPEN;
    element.appendChild(openCloseBtn);
    // openCloseBtnIcon = document.createElement("span");

    // openCloseBtnIcon.classList.add("sidebar__close-button-icon");
    // openCloseBtnIcon.classList.add("iconsidebar-chevron-up");

    // openCloseBtn.appendChild(openCloseBtnIcon);

    return element;
}

inTitle.onChange = function ()
{
    if (headerTitleText)headerTitleText.innerHTML = inTitle.get();
};

function setClosed(b)
{

}

function onOpenCloseBtnClick(ev)
{
    ev.stopPropagation();
    if (!sidebarEl) { op.error("Sidebar could not be closed..."); return; }
    sidebarEl.classList.toggle("sidebar--closed");
    const btn = ev.target;
    let btnText = BTN_TEXT_OPEN;
    if (sidebarEl.classList.contains("sidebar--closed"))
    {
        btnText = BTN_TEXT_CLOSED;
        isOpenOut.set(false);
    }
    else
    {
        isOpenOut.set(true);
    }
}

function initSidebarCss()
{
    // var cssEl = document.getElementById(CSS_ELEMENT_ID);
    const cssElements = document.querySelectorAll("." + CSS_ELEMENT_CLASS);
    // remove old script tag
    if (cssElements)
    {
        cssElements.forEach(function (e)
        {
            e.parentNode.removeChild(e);
        });
    }
    const newStyle = document.createElement("style");
    newStyle.innerHTML = attachments.style_css;
    newStyle.classList.add(CSS_ELEMENT_CLASS);
    document.body.appendChild(newStyle);
}

function onDelete()
{
    removeElementFromDOM(sidebarEl);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild) el.parentNode.removeChild(el);
}


};

Ops.Sidebar.Sidebar.prototype = new CABLES.Op();
CABLES.OPS["5a681c35-78ce-4cb3-9858-bc79c34c6819"]={f:Ops.Sidebar.Sidebar,objName:"Ops.Sidebar.Sidebar"};




// **************************************************************
// 
// Ops.Sidebar.Slider_v2
// 
// **************************************************************

Ops.Sidebar.Slider_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
2;

// constants
const STEP_DEFAULT = 0.00001;

// inputs
const parentPort = op.inObject("link");
const labelPort = op.inValueString("Text", "Slider");
const minPort = op.inValue("Min", 0);
const maxPort = op.inValue("Max", 1);
const stepPort = op.inValue("Step", STEP_DEFAULT);

const inGreyOut = op.inBool("Grey Out", false);
const inVisible = op.inBool("Visible", true);

const inputValuePort = op.inValue("Input", 0.5);
const setDefaultValueButtonPort = op.inTriggerButton("Set Default");
const reset = op.inTriggerButton("Reset");

const defaultValuePort = op.inValue("Default", 0.5);
defaultValuePort.setUiAttribs({ "hidePort": true, "greyout": true });

// outputs
const siblingsPort = op.outObject("childs");
const valuePort = op.outValue("Result", defaultValuePort.get());

op.toWorkNeedsParent("Ops.Sidebar.Sidebar");
op.setPortGroup("Range", [minPort, maxPort, stepPort]);
op.setPortGroup("Visibility", [inGreyOut, inVisible]);

// vars
const el = document.createElement("div");
el.classList.add("sidebar__item");
el.classList.add("sidebar__slider");
const label = document.createElement("div");
label.classList.add("sidebar__item-label");

const greyOut = document.createElement("div");
greyOut.classList.add("sidebar__greyout");
el.appendChild(greyOut);
greyOut.style.display = "none";

const labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);

const value = document.createElement("input");
value.value = defaultValuePort.get();
value.classList.add("sidebar__text-input-input");
// value.setAttribute('type', 'number'); /* not possible to use '.' instead of ',' as separator on German computer, so not usable... */
value.setAttribute("type", "text");
// value.setAttribute('lang', 'en-US'); // force '.' as decimal separator
// value.setAttribute('pattern', '[0-9]+([\.][0-9]+)?'); // only allow '.' as separator
// value.setAttribute('step', 'any'); /* we cannot use the slider step, as it restricts valid numbers to be entered */
// value.setAttribute('formnovalidate', '');
// value.oninput = onTextInputChanged;
value.addEventListener("input", onTextInputChanged);
value.addEventListener("blur", onTextInputBlur);

el.appendChild(value);

const inputWrapper = document.createElement("div");
inputWrapper.classList.add("sidebar__slider-input-wrapper");
el.appendChild(inputWrapper);

const activeTrack = document.createElement("div");
activeTrack.classList.add("sidebar__slider-input-active-track");
inputWrapper.appendChild(activeTrack);
const input = document.createElement("input");
input.classList.add("sidebar__slider-input");
input.setAttribute("min", minPort.get());
input.setAttribute("max", maxPort.get());
input.setAttribute("type", "range");
input.setAttribute("step", stepPort.get());
input.setAttribute("value", defaultValuePort.get());
input.style.display = "block"; /* needed because offsetWidth returns 0 otherwise */
inputWrapper.appendChild(input);

updateActiveTrack();
input.addEventListener("input", onSliderInput);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
inputValuePort.onChange = onInputValuePortChanged;
defaultValuePort.onChange = onDefaultValueChanged;
setDefaultValueButtonPort.onTriggered = onSetDefaultValueButtonPress;
minPort.onChange = onMinPortChange;
maxPort.onChange = onMaxPortChange;
stepPort.onChange = stepPortChanged;
op.onDelete = onDelete;

// op.onLoadedValueSet=function()
op.onLoaded = op.onInit = function ()
{
    if (op.patch.config.sidebar)
    {
        op.patch.config.sidebar[labelPort.get()];
        valuePort.set(op.patch.config.sidebar[labelPort.get()]);
    }
    else
    {
        valuePort.set(parseFloat(defaultValuePort.get()));
        inputValuePort.set(parseFloat(defaultValuePort.get()));
        // onInputValuePortChanged();
    }
};

reset.onTriggered = function ()
{
    const newValue = parseFloat(defaultValuePort.get());
    valuePort.set(newValue);
    value.value = newValue;
    input.value = newValue;
    inputValuePort.set(newValue);
    updateActiveTrack();
};

inGreyOut.onChange = function ()
{
    greyOut.style.display = inGreyOut.get() ? "block" : "none";
};

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};

function onTextInputBlur(ev)
{
    let newValue = parseFloat(ev.target.value);
    if (isNaN(newValue)) newValue = 0;
    const min = minPort.get();
    const max = maxPort.get();

    if (blur)
    {
        let resetValue = false;
        if (newValue < min) { newValue = min; resetValue = true; }
        else if (newValue > max) { newValue = max; resetValue = true; }

        if (resetValue)
        {
            value.removeEventListener("input", onTextInputChanged);
            // value.oninput = null;
            value.value = newValue;
            input.value = newValue;
            value.addEventListener("input", onTextInputChanged);
            // value.oninput = onTextInputChanged;
        }
    }
    valuePort.set(newValue);
    updateActiveTrack();
    inputValuePort.set(newValue);
    if (op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */
}

function onTextInputChanged(ev, blur)
{
    let newValue = parseFloat(ev.target.value);
    if (isNaN(newValue)) newValue = 0;
    valuePort.set(newValue);
    updateActiveTrack();
    inputValuePort.set(newValue);
    if (op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */
}

function onInputValuePortChanged()
{
    let newValue = parseFloat(inputValuePort.get());
    const minValue = minPort.get();
    const maxValue = maxPort.get();
    value.value = newValue;

    if (newValue > maxValue) { newValue = maxValue; }
    else if (newValue < minValue) { newValue = minValue; }
    input.value = newValue;
    valuePort.set(newValue);
    updateActiveTrack();
}

function onSetDefaultValueButtonPress()
{
    let newValue = parseFloat(inputValuePort.get());
    const minValue = minPort.get();
    const maxValue = maxPort.get();
    if (newValue > maxValue) { newValue = maxValue; }
    else if (newValue < minValue) { newValue = minValue; }
    value.value = newValue;
    input.value = newValue;
    valuePort.set(newValue);
    defaultValuePort.set(newValue);
    if (op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */

    updateActiveTrack();
}

function onSliderInput(ev)
{
    ev.preventDefault();
    ev.stopPropagation();
    value.value = ev.target.value;
    const inputFloat = parseFloat(ev.target.value);
    valuePort.set(inputFloat);
    inputValuePort.set(inputFloat);
    if (op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */

    updateActiveTrack();
    return false;
}

function stepPortChanged()
{
    const step = stepPort.get();
    input.setAttribute("step", step);
    updateActiveTrack();
}

function updateActiveTrack(val)
{
    let valueToUse = parseFloat(input.value);
    if (typeof val !== "undefined") valueToUse = val;
    let availableWidth = input.offsetWidth; /* this returns 0 at the beginning... */
    if (availableWidth === 0) { availableWidth = 206; }
    const trackWidth = CABLES.map(
        valueToUse,
        parseFloat(input.min),
        parseFloat(input.max),
        0,
        availableWidth - 16 /* subtract slider thumb width */
    );
    // activeTrack.style.width = 'calc(' + percentage + '%' + ' - 9px)';
    activeTrack.style.width = trackWidth + "px";
}

function onMinPortChange()
{
    const min = minPort.get();
    input.setAttribute("min", min);
    updateActiveTrack();
}

function onMaxPortChange()
{
    const max = maxPort.get();
    input.setAttribute("max", max);
    updateActiveTrack();
}

function onDefaultValueChanged()
{
    const defaultValue = defaultValuePort.get();
    valuePort.set(parseFloat(defaultValue));
    onMinPortChange();
    onMaxPortChange();
    input.value = defaultValue;
    value.value = defaultValue;

    updateActiveTrack(defaultValue); // needs to be passed as argument, is this async?
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI) op.setTitle("Slider: " + labelText);
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else if (el.parentElement) el.parentElement.removeChild(el);
}

function showElement(el)
{
    if (el)el.style.display = "block";
}

function hideElement(el)
{
    if (el)el.style.display = "none";
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild) el.parentNode.removeChild(el);
}


};

Ops.Sidebar.Slider_v2.prototype = new CABLES.Op();
CABLES.OPS["2f3b9d8a-228b-4ff8-948a-13a7eb9d8241"]={f:Ops.Sidebar.Slider_v2,objName:"Ops.Sidebar.Slider_v2"};




// **************************************************************
// 
// Ops.Sidebar.ColorPicker_v2
// 
// **************************************************************

Ops.Sidebar.ColorPicker_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// constants
const DEFAULT_COLOR_HEX = "#07F78C";

// inputs
const parentPort = op.inObject("Link");
const labelPort = op.inString("Text", "Hex Color");
const defaultColorArr = hexToRgbNorm(DEFAULT_COLOR_HEX);
const inputRedPort = op.inValueSlider("Input Red", defaultColorArr[0]);
const inputGreenPort = op.inValueSlider("Input Green", defaultColorArr[1]);
const inputBluePort = op.inValueSlider("Input Blue", defaultColorArr[2]);
// const inputValuePort = op.inValueString('Input', DEFAULT_COLOR_HEX);
const setDefaultValueButtonPort = op.inTriggerButton("Set Default");
const defaultValuePort = op.inValueString("Default", DEFAULT_COLOR_HEX);
defaultValuePort.setUiAttribs({ "hidePort": true, "greyout": true });

// outputs
const siblingsPort = op.outObject("Children");
// const valuePort = op.outValue('Result', defaultValuePort.get());
const redPort = op.outValue("Red", 0.0);
const greenPort = op.outValue("Green", 0.0);
const bluePort = op.outValue("Blue", 0.0);

const outHex = op.outString("Hex", DEFAULT_COLOR_HEX);

// vars
const el = document.createElement("div");
el.addEventListener("dblclick", function ()
{
    let defaultValue = defaultValuePort.get();
    input.setAttribute("value", defaultValue);
    if (defaultValue)
    {
        if (defaultValue.length === 6 && defaultValue.charAt(0) !== "#")
        {
            defaultValue = "#" + defaultValue;
        }
        if (defaultValue.length === 7)
        {
            input.value = defaultValue;
            colorInput.value = defaultValue;
            setColorOutPorts(defaultValue);
        }
    }
});

el.classList.add("sidebar__item");
el.classList.add("sidebar__color-picker");
el.classList.add("sidebar__reloadable");

const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelTextNode = document.createTextNode(labelPort.get());
label.appendChild(labelTextNode);
el.appendChild(label);
// var inputWrapper = document.createElement('div');
// inputWrapper.classList.add('sidebar__text-input-input-wrapper');
// el.appendChild(inputWrapper);
const input = document.createElement("input");
input.classList.add("sidebar__color-picker-input");
/* input.classList.add('jscolor'); */ /* color picker library */
input.setAttribute("type", "text");
input.setAttribute("value", defaultValuePort.get());
// inputWrapper.appendChild(input);
el.appendChild(input);
input.addEventListener("input", onInput);
const colorInput = document.createElement("input");
colorInput.classList.add("sidebar__color-picker-color-input");
colorInput.setAttribute("type", "color");
colorInput.setAttribute("value", defaultValuePort.get());
colorInput.addEventListener("change", onColorPickerChange, false);
el.appendChild(colorInput);
input.addEventListener("input", onInput);

onDefaultValueChanged(); /* initialize once */

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
op.onDelete = onDelete;
// inputValuePort.onChange = onInputValuePortChange;
setDefaultValueButtonPort.onTriggered = setDefaultColor;
inputRedPort.onChange = inputColorChanged;
inputGreenPort.onChange = inputColorChanged;
inputBluePort.onChange = inputColorChanged;

// functions

function inputColorChanged()
{
    const hex = getInputColorHex();
    // defaultValuePort.set(hex);
    colorInput.value = hex;
    input.value = hex;
    setColorOutPorts(hex);
    /*
    if(CABLES.UI){
        gui.opParams.show(op); // update DOM
    }
    */
}

/**
 * Returns the color of the op params ("input red", "input green", "input blue") as hex
 */
function getInputColorHex()
{
    const r = inputRedPort.get();
    const g = inputGreenPort.get();
    const b = inputBluePort.get();
    const hex = rgbNormToHex(r, g, b);
    return hex;
}

function setDefaultColor()
{
    // let hexCol = inputValuePort.get().trim();
    const hex = getInputColorHex();
    defaultValuePort.set(hex);
    outHex.set(hex);
    if (CABLES.UI)
    {
        gui.opParams.show(op); /* update DOM */
    }
}

/*
function onInputValuePortChange() {
    let hexCol = inputValuePort.get().trim();
    if(hexCol.length === 6 && hexCol.charAt(0) !== '#') {
        hexCol = '#' + hexCol;
    }
    if(hexCol.length === 7) {
        colorInput.value = hexCol;
        input.value = hexCol;
        setColorOutPorts(hexCol);
    }
}
*/

function hexToRgbNorm(hexColor)
{
    if (!hexColor || hexColor.length !== 7) { return; }
    return hexColor
        .match(/[A-Za-z0-9]{2}/g)
        .map(function (v)
        {
            return parseInt(v, 16) / 255;
        });
}

/**
 * Helper for rgbNormToHex / rgbToHex
 * Converts a number in range [0..255] to hex [00..FF] (with left padding)
 */
function componentToHex(c)
{
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/*
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
*/

/**
 * r, g, b in range [0..1]
 * @returns {string} e.g. "#ff0000"
 */
function rgbNormToHex(r, g, b)
{
    return "#" + componentToHex(Math.floor(255 * r)) + componentToHex(Math.floor(255 * g)) + componentToHex(Math.floor(255 * b));
}

function onColorPickerChange(event)
{
    const hex = event.target.value;
    setColorOutPorts(hex);
    input.value = hex;
    // inputValuePort.set(hex)
    outHex.set(hex);
    setInputsByHex(hex);
    if (CABLES.UI)
    {
        gui.opParams.show(op); /* update DOM */
    }
}

/**
 * Sets the op param color input ports by hex value (e.g. "#FF0000")
 * Does NOT update the gui
 */
function setInputsByHex(hex)
{
    const colorArr = hexToRgbNorm(hex);
    inputRedPort.set(colorArr[0]);
    inputGreenPort.set(colorArr[1]);
    inputBluePort.set(colorArr[2]);
    outHex.set(hex);
}

function onInput(ev)
{
    let newValue = ev.target.value;
    if (newValue.length === 6 && newValue.charAt(0) !== "#")
    {
        newValue = "#" + newValue;
    }
    if (newValue.length === 7)
    {
        colorInput.value = newValue;
        setColorOutPorts(newValue);
        // inputValuePort.set(newValue)
        setInputsByHex(newValue);
        outHex.set(newValue);
        if (CABLES.UI)
        {
            gui.opParams.show(op); /* update DOM */
        }
    }
}

// hex must be 7 digits
function setColorOutPorts(hex)
{
    const colorArr = hexToRgbNorm(hex);
    outHex.set(hex);
    redPort.set(colorArr[0]);
    greenPort.set(colorArr[1]);
    bluePort.set(colorArr[2]);
}

function onDefaultValueChanged()
{
    let defaultValue = defaultValuePort.get();
    input.setAttribute("value", defaultValue);
    if (defaultValue)
    {
        if (defaultValue.length === 6 && defaultValue.charAt(0) !== "#")
        {
            defaultValue = "#" + defaultValue;
        }
        if (defaultValue.length === 7)
        {
            input.value = defaultValue;
            colorInput.value = defaultValue;
            setColorOutPorts(defaultValue);
        }
    }
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;

    if (CABLES.UI)
    {
        op.setTitle("Color Picker: " + labelText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.ColorPicker_v2.prototype = new CABLES.Op();
CABLES.OPS["e744a32a-8734-46bb-bba2-841355763031"]={f:Ops.Sidebar.ColorPicker_v2,objName:"Ops.Sidebar.ColorPicker_v2"};




// **************************************************************
// 
// Ops.Sidebar.DisplayValue_v2
// 
// **************************************************************

Ops.Sidebar.DisplayValue_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("link");
const labelPort = op.inString("Text", "Value");
const valuePort = op.inString("Value", "");

// outputs
const siblingsPort = op.outObject("childs");

// vars
const el = document.createElement("div");
el.classList.add("sidebar__item");
el.classList.add("sidebar__value-display");
const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelTextNode = document.createTextNode(labelPort.get());
label.appendChild(labelTextNode);
el.appendChild(label);
const value = document.createElement("div");
value.textContent = valuePort.get();
value.classList.add("sidebar__item-value-label");
el.appendChild(value);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
valuePort.onChange = onValueChanged;
op.onDelete = onDelete;

// functions

function onValueChanged()
{
    value.textContent = valuePort.get();
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI)
    {
        op.setTitle("Value: " + labelText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(element)
{
    if (element)
    {
        element.style.display = "block";
    }
}

function hideElement(element)
{
    if (element)
    {
        element.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(element)
{
    if (element && element.parentNode && element.parentNode.removeChild)
    {
        element.parentNode.removeChild(element);
    }
}


};

Ops.Sidebar.DisplayValue_v2.prototype = new CABLES.Op();
CABLES.OPS["3dd9927e-0d34-4442-8a8a-0ab843aee6e3"]={f:Ops.Sidebar.DisplayValue_v2,objName:"Ops.Sidebar.DisplayValue_v2"};




// **************************************************************
// 
// Ops.String.NumberToString_v2
// 
// **************************************************************

Ops.String.NumberToString_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    val = op.inValue("Number"),
    result = op.outString("Result");

op.setUiAttrib({ "title": "num2str" });

val.onChange = update;
update();

function update()
{
    result.set(String(val.get() || 0));
}


};

Ops.String.NumberToString_v2.prototype = new CABLES.Op();
CABLES.OPS["5c6d375a-82db-4366-8013-93f56b4061a9"]={f:Ops.String.NumberToString_v2,objName:"Ops.String.NumberToString_v2"};




// **************************************************************
// 
// Ops.Sidebar.Group
// 
// **************************************************************

Ops.Sidebar.Group = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
let parentPort = op.inObject("link");
let labelPort = op.inString("Text", "Group");
const inShowTitle = op.inBool("Show Title", true);
let defaultMinimizedPort = op.inValueBool("Default Minimized");
const inVisible = op.inBool("Visible", true);

// outputs
let nextPort = op.outObject("next");
let childrenPort = op.outObject("childs");

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};

// vars
var el = document.createElement("div");
el.classList.add("sidebar__group");
onDefaultMinimizedPortChanged();
let header = document.createElement("div");
header.classList.add("sidebar__group-header");
el.appendChild(header);
header.addEventListener("click", onClick);
let headerTitle = document.createElement("div");
headerTitle.classList.add("sidebar__group-header-title");
// headerTitle.textContent = labelPort.get();
header.appendChild(headerTitle);
let headerTitleText = document.createElement("span");
headerTitleText.textContent = labelPort.get();
headerTitleText.classList.add("sidebar__group-header-title-text");
headerTitle.appendChild(headerTitleText);
let icon = document.createElement("span");
icon.classList.add("sidebar__group-header-icon");
icon.classList.add("iconsidebar-chevron-up");
headerTitle.appendChild(icon);
let groupItems = document.createElement("div");
groupItems.classList.add("sidebar__group-items");
el.appendChild(groupItems);
op.toWorkPortsNeedToBeLinked(parentPort);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultMinimizedPort.onChange = onDefaultMinimizedPortChanged;
op.onDelete = onDelete;

// functions

inShowTitle.onChange = () =>
{
    if (inShowTitle.get())header.style.display = "block";
    else header.style.display = "none";
};

function onDefaultMinimizedPortChanged()
{
    if (defaultMinimizedPort.get())
    {
        el.classList.add("sidebar__group--closed");
    }
    else
    {
        el.classList.remove("sidebar__group--closed");
    }
}

function onClick(ev)
{
    ev.stopPropagation();
    el.classList.toggle("sidebar__group--closed");
}

function onLabelTextChanged()
{
    let labelText = labelPort.get();
    headerTitleText.textContent = labelText;
    if (CABLES.UI)
    {
        op.setTitle("Group: " + labelText);
    }
}

function onParentChanged()
{
    let parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        childrenPort.set(null);
        childrenPort.set({
            "parentElement": groupItems,
            "parentOp": op,
        });
        nextPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.Group.prototype = new CABLES.Op();
CABLES.OPS["86ea2333-b51c-48ed-94c2-8b7b6e9ff34c"]={f:Ops.Sidebar.Group,objName:"Ops.Sidebar.Group"};




// **************************************************************
// 
// Ops.Sidebar.SidebarText_v2
// 
// **************************************************************

Ops.Sidebar.SidebarText_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("link");
const labelPort = op.inString("Text", "Value");
const inId = op.inValueString("Id", "");

// outputs
const siblingsPort = op.outObject("childs");

// vars
const el = document.createElement("div");
el.classList.add("sidebar__item");
el.classList.add("sidebar__text");
const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
inId.onChange = onIdChanged;
op.onDelete = onDelete;

op.toWorkNeedsParent("Ops.Sidebar.Sidebar");

// functions

function onIdChanged()
{
    el.id = inId.get();
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI)
    {
        if (labelText && typeof labelText === "string")
        {
            op.setTitle("Text: " + labelText.substring(0, 10)); // display first 10 characters of text in op title
        }
        else
        {
            op.setTitle("Text");
        }
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.SidebarText_v2.prototype = new CABLES.Op();
CABLES.OPS["cc591cc3-ff23-4817-907c-e5be7d5c059d"]={f:Ops.Sidebar.SidebarText_v2,objName:"Ops.Sidebar.SidebarText_v2"};




// **************************************************************
// 
// Ops.Ui.PatchInput
// 
// **************************************************************

Ops.Ui.PatchInput = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

op.getPatchOp=function()
{
    for(var i in op.patch.ops)
    {
        if(op.patch.ops[i].patchId)
        {
            if(op.patch.ops[i].patchId.get()==op.uiAttribs.subPatch)
            {
                return op.patch.ops[i];
            }
        }
    }
};


};

Ops.Ui.PatchInput.prototype = new CABLES.Op();
CABLES.OPS["e3f68bc3-892a-4c78-9974-aca25c27025d"]={f:Ops.Ui.PatchInput,objName:"Ops.Ui.PatchInput"};




// **************************************************************
// 
// Ops.Ui.PatchOutput
// 
// **************************************************************

Ops.Ui.PatchOutput = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

// empty

};

Ops.Ui.PatchOutput.prototype = new CABLES.Op();
CABLES.OPS["851b44cb-5667-4140-9800-5aeb7031f1d7"]={f:Ops.Ui.PatchOutput,objName:"Ops.Ui.PatchOutput"};




// **************************************************************
// 
// Ops.Ui.SubPatch
// 
// **************************************************************

Ops.Ui.SubPatch = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
op.dyn = op.addInPort(new CABLES.Port(op, "create port", CABLES.OP_PORT_TYPE_DYNAMIC));
op.dynOut = op.addOutPort(new CABLES.Port(op, "create port out", CABLES.OP_PORT_TYPE_DYNAMIC));

const dataStr = op.addInPort(new CABLES.Port(op, "dataStr", CABLES.OP_PORT_TYPE_VALUE, { "display": "readonly" }));
op.patchId = op.addInPort(new CABLES.Port(op, "patchId", CABLES.OP_PORT_TYPE_VALUE, { "display": "readonly" }));

dataStr.setUiAttribs({ "hideParam": true });
op.patchId.setUiAttribs({ "hideParam": true });

let data = { "ports": [], "portsOut": [] };

// Ops.Ui.Patch.maxPatchId=CABLES.generateUUID();

op.patchId.onChange = function ()
{
    const oldPatchOps = op.patch.getSubPatchOps(oldPatchId);

    if (oldPatchOps.length == 2)
    {
        for (let i = 0; i < oldPatchOps.length; i++)
        {
            op.patch.deleteOp(oldPatchOps[i].id);
        }
    }
    else
    {
    }
};

var oldPatchId = CABLES.generateUUID();
op.patchId.set(oldPatchId);

op.onLoaded = function ()
{
    // op.patchId.set(CABLES.generateUUID());
};

op.onLoadedValueSet = function ()
{
    data = JSON.parse(dataStr.get());
    if (!data)
    {
        data = { "ports": [], "portsOut": [] };
    }
    setupPorts();
};

function loadData()
{
}

getSubPatchInputOp();
getSubPatchOutputOp();

let dataLoaded = false;
dataStr.onChange = function ()
{
    if (dataLoaded) return;

    if (!dataStr.get()) return;
    try
    {
        loadData();
    }
    catch (e)
    {
        op.error("cannot load subpatch data...");
        op.error(e);
    }
};

function saveData()
{
    dataStr.set(JSON.stringify(data));
}

function addPortListener(newPort, newPortInPatch)
{
    newPort.addEventListener("onUiAttrChange", function (attribs)
    {
        if (attribs.title)
        {
            let i = 0;
            for (i = 0; i < data.portsOut.length; i++)
                if (data.portsOut[i].name == newPort.name)
                    data.portsOut[i].title = attribs.title;

            for (i = 0; i < data.ports.length; i++)
                if (data.ports[i].name == newPort.name)
                    data.ports[i].title = attribs.title;

            saveData();
        }
    });

    if (newPort.direction == CABLES.PORT_DIR_IN)
    {
        if (newPort.type == CABLES.OP_PORT_TYPE_FUNCTION)
        {
            newPort.onTriggered = function ()
            {
                if (newPortInPatch.isLinked())
                    newPortInPatch.trigger();
            };
        }
        else
        {
            newPort.onChange = function ()
            {
                newPortInPatch.set(newPort.get());
            };
        }
    }
}

function setupPorts()
{
    if (!op.patchId.get()) return;
    const ports = data.ports || [];
    const portsOut = data.portsOut || [];
    let i = 0;

    for (i = 0; i < ports.length; i++)
    {
        if (!op.getPortByName(ports[i].name))
        {
            const newPort = op.addInPort(new CABLES.Port(op, ports[i].name, ports[i].type));

            const patchInputOp = getSubPatchInputOp();
            const newPortInPatch = patchInputOp.addOutPort(new CABLES.Port(patchInputOp, ports[i].name, ports[i].type));

            newPort.ignoreValueSerialize = true;
            newPort.setUiAttribs({ "editableTitle": true });
            if (ports[i].title)
            {
                newPort.setUiAttribs({ "title": ports[i].title });
                newPortInPatch.setUiAttribs({ "title": ports[i].title });
            }
            if (ports[i].objType)
            {
                newPort.setUiAttribs({ "objType": ports[i].objType });
                newPortInPatch.setUiAttribs({ "objType": ports[i].objType });
            }
            addPortListener(newPort, newPortInPatch);
        }
    }

    for (i = 0; i < portsOut.length; i++)
    {
        if (!op.getPortByName(portsOut[i].name))
        {
            const newPortOut = op.addOutPort(new CABLES.Port(op, portsOut[i].name, portsOut[i].type));
            const patchOutputOp = getSubPatchOutputOp();
            const newPortOutPatch = patchOutputOp.addInPort(new CABLES.Port(patchOutputOp, portsOut[i].name, portsOut[i].type));

            newPortOut.ignoreValueSerialize = true;
            newPortOut.setUiAttribs({ "editableTitle": true });

            if (portsOut[i].title)
            {
                newPortOut.setUiAttribs({ "title": portsOut[i].title });
                newPortOutPatch.setUiAttribs({ "title": portsOut[i].title });
            }
            if (portsOut[i].objType)
            {
                newPortOut.setUiAttribs({ "objType": portsOut[i].objType });
                newPortOutPatch.setUiAttribs({ "objType": portsOut[i].objType });
            }

            // addPortListener(newPortOut,newPortOutPatch);
            addPortListener(newPortOutPatch, newPortOut);
        }
    }

    dataLoaded = true;
}

op.dyn.onLinkChanged = function ()
{
    if (op.dyn.isLinked())
    {
        const otherPort = op.dyn.links[0].getOtherPort(op.dyn);
        op.dyn.removeLinks();
        otherPort.removeLinkTo(op.dyn);

        op.log("dyn link changed!!!");

        const newName = "in" + data.ports.length + " " + otherPort.parent.name + " " + otherPort.name;

        const o = { "name": newName, "type": otherPort.type };
        if (otherPort.uiAttribs.objType)o.objType = otherPort.uiAttribs.objType;
        data.ports.push(o);

        setupPorts();

        const l = gui.scene().link(
            otherPort.parent,
            otherPort.getName(),
            op,
            newName
        );

        dataLoaded = true;
        saveData();
    }
    else
    {
        setTimeout(function ()
        {
            op.dyn.removeLinks();
            gui.patch().removeDeadLinks();
        }, 100);
    }
};

op.dynOut.onLinkChanged = function ()
{
    if (op.dynOut.isLinked())
    {
        const otherPort = op.dynOut.links[0].getOtherPort(op.dynOut);
        op.dynOut.removeLinks();
        otherPort.removeLinkTo(op.dynOut);
        const newName = "out" + data.portsOut.length + " " + otherPort.parent.name + " " + otherPort.name;

        const o = { "name": newName, "type": otherPort.type };
        if (otherPort.uiAttribs.objType)o.objType = otherPort.uiAttribs.objType;

        data.portsOut.push(o);

        setupPorts();

        gui.scene().link(
            otherPort.parent,
            otherPort.getName(),
            op,
            newName
        );

        dataLoaded = true;
        saveData();
    }
    else
    {
        setTimeout(function ()
        {
            op.dynOut.removeLinks();
            gui.patch().removeDeadLinks();
        }, 100);

        op.log("dynOut unlinked...");
    }
    gui.patch().removeDeadLinks();
};

function getSubPatchOutputOp()
{
    let patchOutputOP = op.patch.getSubPatchOp(op.patchId.get(), "Ops.Ui.PatchOutput");

    if (!patchOutputOP)
    {
        op.patch.addOp("Ops.Ui.PatchOutput", { "subPatch": op.patchId.get() });
        patchOutputOP = op.patch.getSubPatchOp(op.patchId.get(), "Ops.Ui.PatchOutput");

        if (!patchOutputOP) op.warn("no patchinput2!");
    }
    return patchOutputOP;
}

function getSubPatchInputOp()
{
    let patchInputOP = op.patch.getSubPatchOp(op.patchId.get(), "Ops.Ui.PatchInput");

    if (!patchInputOP)
    {
        op.patch.addOp("Ops.Ui.PatchInput", { "subPatch": op.patchId.get() });
        patchInputOP = op.patch.getSubPatchOp(op.patchId.get(), "Ops.Ui.PatchInput");
        if (!patchInputOP) op.warn("no patchinput2!");
    }

    return patchInputOP;
}

op.addSubLink = function (p, p2)
{
    const num = data.ports.length;
    const sublPortname = "in" + (num - 1) + " " + p2.parent.name + " " + p2.name;

    if (p.direction == CABLES.PORT_DIR_IN)
    {
        gui.scene().link(
            p.parent,
            p.getName(),
            getSubPatchInputOp(),
            sublPortname
        );
    }
    else
    {
        gui.scene().link(
            p.parent,
            p.getName(),
            getSubPatchOutputOp(),
            "out" + (num) + " " + p2.parent.name + " " + p2.name
        );
    }

    const bounds = gui.patchView.getSubPatchBounds(op.patchId.get());
    op.log("subpatchbounds", bounds);
    getSubPatchInputOp().uiAttr(
        {
            "translate":
            {
                "x": bounds.minx,
                "y": bounds.miny - 100
            }
        });

    getSubPatchOutputOp().uiAttr(
        {
            "translate":
            {
                "x": bounds.minx,
                "y": bounds.maxy + 100
            }
        });
    saveData();
    return sublPortname;
};

op.onDelete = function ()
{
    for (let i = op.patch.ops.length - 1; i >= 0; i--)
    {
        if (op.patch.ops[i] && op.patch.ops[i].uiAttribs && op.patch.ops[i].uiAttribs.subPatch == op.patchId.get())
        {
            op.patch.deleteOp(op.patch.ops[i].id);
        }
    }
};


};

Ops.Ui.SubPatch.prototype = new CABLES.Op();
CABLES.OPS["84d9a6f0-ed7a-466d-b386-225ed9e89c60"]={f:Ops.Ui.SubPatch,objName:"Ops.Ui.SubPatch"};




// **************************************************************
// 
// Ops.Json.AjaxRequest_v2
// 
// **************************************************************

Ops.Json.AjaxRequest_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const filename = op.inUrl("file"),
    jsonp = op.inValueBool("JsonP", false),
    headers = op.inObject("headers", {}),
    inBody = op.inStringEditor("body", ""),
    inMethod = op.inDropDown("HTTP Method", ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "CONNECT", "OPTIONS", "TRACE"], "GET"),
    inContentType = op.inString("Content-Type", "application/json"),
    inParseJson = op.inBool("parse json", true),
    inAutoRequest = op.inBool("Auto request", true),
    reloadTrigger = op.inTriggerButton("reload"),
    outData = op.outObject("data"),
    outString = op.outString("response"),
    isLoading = op.outValue("Is Loading", false),
    outTrigger = op.outTrigger("Loaded");

filename.setUiAttribs({ "title": "URL" });
reloadTrigger.setUiAttribs({ "buttonTitle": "trigger request" });

outData.ignoreValueSerialize = true;
outString.ignoreValueSerialize = true;

inAutoRequest.onChange = filename.onChange = jsonp.onChange = headers.onChange = inMethod.onChange = inParseJson.onChange = function ()
{
    delayedReload(false);
};

reloadTrigger.onTriggered = function ()
{
    delayedReload(true);
};

let loadingId = 0;
let reloadTimeout = 0;

function delayedReload(force = false)
{
    clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(function () { reload(null, force); }, 100);
}

op.onFileChanged = function (fn)
{
    if (filename.get() && filename.get().indexOf(fn) > -1) reload(true);
};

function reload(addCachebuster, force = false)
{
    if (!inAutoRequest.get() && !force) return;
    if (!filename.get()) return;

    op.patch.loading.finished(loadingId);

    loadingId = op.patch.loading.start("jsonFile", "" + filename.get());
    isLoading.set(true);

    op.setUiAttrib({ "extendTitle": CABLES.basename(filename.get()) });
    op.setUiError("jsonerr", null);

    let httpClient = CABLES.ajax;
    if (jsonp.get()) httpClient = CABLES.jsonp;

    let url = op.patch.getFilePath(filename.get());
    if (addCachebuster)url += "?rnd=" + CABLES.generateUUID();

    op.patch.loading.addAssetLoadingTask(() =>
    {
        const body = inBody.get();
        httpClient(
            url,
            (err, _data, xhr) =>
            {
                if (err)
                {
                    op.patch.loading.finished(loadingId);
                    isLoading.set(false);

                    op.error(err);
                    return;
                }
                try
                {
                    let data = _data;
                    outData.set(null);
                    if (typeof data === "string" && inParseJson.get())
                    {
                        data = JSON.parse(_data);
                        outData.set(data);
                    }
                    outString.set(null);
                    outString.set(_data);
                    op.uiAttr({ "error": null });
                    op.patch.loading.finished(loadingId);
                    outTrigger.trigger();
                    isLoading.set(false);
                }
                catch (e)
                {
                    op.error(e);
                    op.setUiError("jsonerr", "Problem while loading json:<br/>" + e);
                    op.patch.loading.finished(loadingId);
                    isLoading.set(false);
                }
            },
            inMethod.get(),
            (body && body.length > 0) ? body : null,
            inContentType.get(),
            null,
            headers.get() || {}
        );
    });
}


};

Ops.Json.AjaxRequest_v2.prototype = new CABLES.Op();
CABLES.OPS["e0879058-5505-4dc4-b9ff-47a3d3c8a71a"]={f:Ops.Json.AjaxRequest_v2,objName:"Ops.Json.AjaxRequest_v2"};




// **************************************************************
// 
// Ops.Json.ObjectGetString
// 
// **************************************************************

Ops.Json.ObjectGetString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
let data = op.inObject("data");
let key = op.inString("Key");
const result = op.outString("Result");

result.ignoreValueSerialize = true;
data.ignoreValueSerialize = true;

key.onChange = function ()
{
    op.setUiAttrib({ "extendTitle": key.get() });
    exec();
};
data.onChange = exec;

function exec()
{
    if (data.get() && data.get().hasOwnProperty(key.get()))
    {
        result.set(data.get()[key.get()]);
    }
    else
    {
        result.set(null);
    }
}


};

Ops.Json.ObjectGetString.prototype = new CABLES.Op();
CABLES.OPS["7d86cd28-f7d8-44a1-a4da-466c4782aaec"]={f:Ops.Json.ObjectGetString,objName:"Ops.Json.ObjectGetString"};




// **************************************************************
// 
// Ops.Json.ObjectGetObject_v2
// 
// **************************************************************

Ops.Json.ObjectGetObject_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    data = op.inObject("Object"),
    key = op.inString("Key"),
    result = op.outObject("Result");

result.ignoreValueSerialize = true;
data.ignoreValueSerialize = true;

key.onChange = function ()
{
    op.setUiAttrib({ "extendTitle": key.get() });
    update();
};

data.onChange = update;

function update()
{
    if (data.get() && data.get().hasOwnProperty(key.get()))
    {
        result.set(data.get()[key.get()]);
    }
    else
    {
        result.set(null);
    }
}


};

Ops.Json.ObjectGetObject_v2.prototype = new CABLES.Op();
CABLES.OPS["d1dfa305-89db-4ca1-b0ac-2d6321d76ae8"]={f:Ops.Json.ObjectGetObject_v2,objName:"Ops.Json.ObjectGetObject_v2"};




// **************************************************************
// 
// Ops.Trigger.Threshold
// 
// **************************************************************

Ops.Trigger.Threshold = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
//this op will send one trigger out if the threshold has been crossed
// but will not send another until the incoming inValue
//drops below the threshold and go's above it again

const inValue = op.inValue("Input"),
    inThreshold = op.inValue("Threshold"),
    output = op.outTrigger("Output");

var hasThresholdBeenExceeded = false;

inValue.onChange = update;
function update()
{
	if(!hasThresholdBeenExceeded && inValue.get() >= inThreshold.get())
	{
		hasThresholdBeenExceeded = true;
		output.trigger();
	}
	else if(hasThresholdBeenExceeded && inValue.get() <= inThreshold.get())
	{
		hasThresholdBeenExceeded = false;
	}
}




};

Ops.Trigger.Threshold.prototype = new CABLES.Op();
CABLES.OPS["ef0891db-6053-42ba-b7d5-29c7cf6d8208"]={f:Ops.Trigger.Threshold,objName:"Ops.Trigger.Threshold"};




// **************************************************************
// 
// Ops.Anim.Timer_v2
// 
// **************************************************************

Ops.Anim.Timer_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inSpeed = op.inValue("Speed", 1),
    playPause = op.inValueBool("Play", true),
    reset = op.inTriggerButton("Reset"),
    inSyncTimeline = op.inValueBool("Sync to timeline", false),
    outTime = op.outValue("Time");

op.setPortGroup("Controls", [playPause, reset, inSpeed]);

const timer = new CABLES.Timer();
let lastTime = null;
let time = 0;
let syncTimeline = false;

playPause.onChange = setState;
setState();

function setState()
{
    if (playPause.get())
    {
        timer.play();
        op.patch.addOnAnimFrame(op);
    }
    else
    {
        timer.pause();
        op.patch.removeOnAnimFrame(op);
    }
}

reset.onTriggered = doReset;

function doReset()
{
    time = 0;
    lastTime = null;
    timer.setTime(0);
    outTime.set(0);
}

inSyncTimeline.onChange = function ()
{
    syncTimeline = inSyncTimeline.get();
    playPause.setUiAttribs({ "greyout": syncTimeline });
    reset.setUiAttribs({ "greyout": syncTimeline });
};

op.onAnimFrame = function (tt)
{
    if (timer.isPlaying())
    {
        if (CABLES.overwriteTime !== undefined)
        {
            outTime.set(CABLES.overwriteTime * inSpeed.get());
        }
        else

        if (syncTimeline)
        {
            outTime.set(tt * inSpeed.get());
        }
        else
        {
            timer.update();
            const timerVal = timer.get();

            if (lastTime === null)
            {
                lastTime = timerVal;
                return;
            }

            const t = Math.abs(timerVal - lastTime);
            lastTime = timerVal;

            time += t * inSpeed.get();
            if (time != time)time = 0;
            outTime.set(time);
        }
    }
};


};

Ops.Anim.Timer_v2.prototype = new CABLES.Op();
CABLES.OPS["aac7f721-208f-411a-adb3-79adae2e471a"]={f:Ops.Anim.Timer_v2,objName:"Ops.Anim.Timer_v2"};




// **************************************************************
// 
// Ops.Math.Modulo
// 
// **************************************************************

Ops.Math.Modulo = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const result = op.outValue("result");
const number1 = op.inValueFloat("number1");
const number2 = op.inValueFloat("number2");
const pingpong = op.inValueBool("pingpong");

// pointer to function
let calculateFunction = calculateModule;

number1.onChange = exec;
number2.onChange = exec;

number1.set(1);
number2.set(2);

pingpong.onChange = updatePingPong;

function exec()
{
    let n2 = number2.get();
    let n1 = number1.get();

    result.set(calculateFunction(n1, n2));
}

function calculateModule(n1, n2)
{
    let re = ((n1 % n2) + n2) % n2;
    if (re != re) re = 0;
    return re;
}

function calculatePingPong(i, n)
{
    let cycle = 2 * n;
    i %= cycle;
    if (i >= n) return cycle - i;
    else return i;

    // let r = ((n1 % n2) + n2) % n2 * 2;
    // if (r > n2) return n2 * 2.0 - r;
    // else return r;
}

function updatePingPong()
{
    if (pingpong.get()) calculateFunction = calculatePingPong;
    else calculateFunction = calculateModule;
}


};

Ops.Math.Modulo.prototype = new CABLES.Op();
CABLES.OPS["ebc13b25-3705-4265-8f06-5f985b6a7bb1"]={f:Ops.Math.Modulo,objName:"Ops.Math.Modulo"};




// **************************************************************
// 
// Ops.Trigger.TriggerCounter
// 
// **************************************************************

Ops.Trigger.TriggerCounter = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exe = op.inTriggerButton("exe"),
    reset = op.inTriggerButton("reset"),
    trigger = op.outTrigger("trigger"),
    num = op.outValue("timesTriggered");

op.toWorkPortsNeedToBeLinked(exe);

let n = 0;

reset.onTriggered =
op.onLoaded =
    doReset;

exe.onTriggered = function ()
{
    n++;
    num.set(n);
    trigger.trigger();
};

function doReset()
{
    n = 0;
    num.set(n);
}


};

Ops.Trigger.TriggerCounter.prototype = new CABLES.Op();
CABLES.OPS["e640619f-235c-4543-bbf8-b358e0283180"]={f:Ops.Trigger.TriggerCounter,objName:"Ops.Trigger.TriggerCounter"};




// **************************************************************
// 
// Ops.Sidebar.TextInput_v2
// 
// **************************************************************

Ops.Sidebar.TextInput_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("Link");
const labelPort = op.inString("Text", "Text");
const defaultValuePort = op.inString("Default", "");
const inPlaceholder = op.inString("Placeholder", "");
const inTextArea = op.inBool("TextArea", false);
const inGreyOut = op.inBool("Grey Out", false);
const inVisible = op.inBool("Visible", true);

// outputs
const siblingsPort = op.outObject("Children");
const valuePort = op.outString("Result", defaultValuePort.get());
const outFocus = op.outBool("Focus");

// vars
const el = document.createElement("div");

el.classList.add("sidebar__item");
el.classList.add("sidebar__text-input");
el.classList.add("sidebar__reloadable");

const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);

label.addEventListener("dblclick", function ()
{
    valuePort.set(defaultValuePort.get());
    input.value = defaultValuePort.get();
});

let input = null;
creatElement();

op.toWorkPortsNeedToBeLinked(parentPort);

inTextArea.onChange = creatElement;

function creatElement()
{
    if (input)input.remove();
    if (!inTextArea.get())
    {
        input = document.createElement("input");
    }
    else
    {
        input = document.createElement("textarea");
        onDefaultValueChanged();
    }

    input.classList.add("sidebar__text-input-input");
    input.setAttribute("type", "text");
    input.setAttribute("value", defaultValuePort.get());
    input.setAttribute("placeholder", inPlaceholder.get());

    el.appendChild(input);
    input.addEventListener("input", onInput);
    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
}

const greyOut = document.createElement("div");
greyOut.classList.add("sidebar__greyout");
el.appendChild(greyOut);
greyOut.style.display = "none";

function onFocus()
{
    outFocus.set(true);
}
function onBlur()
{
    outFocus.set(false);
}

inPlaceholder.onChange = () =>
{
    input.setAttribute("placeholder", inPlaceholder.get());
};

inGreyOut.onChange = function ()
{
    greyOut.style.display = inGreyOut.get() ? "block" : "none";
};

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
op.onDelete = onDelete;

// functions

function onInput(ev)
{
    valuePort.set(ev.target.value);
}

function onDefaultValueChanged()
{
    const defaultValue = defaultValuePort.get();
    valuePort.set(defaultValue);
    input.value = defaultValue;
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI)
    {
        op.setTitle("Text Input: " + labelText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.TextInput_v2.prototype = new CABLES.Op();
CABLES.OPS["6538a190-e73c-451b-964e-d010ee267aa9"]={f:Ops.Sidebar.TextInput_v2,objName:"Ops.Sidebar.TextInput_v2"};




// **************************************************************
// 
// Ops.Sidebar.NumberInput_v2
// 
// **************************************************************

Ops.Sidebar.NumberInput_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("Link");
const labelPort = op.inString("Text", "Number");
const inputValuePort = op.inValue("Input", 0);
const setDefaultValueButtonPort = op.inTriggerButton("Set Default");
const defaultValuePort = op.inValue("Default", 0);
defaultValuePort.setUiAttribs({ "hidePort": true, "greyout": true });

// outputs
const siblingsPort = op.outObject("Children");
const valuePort = op.outValue("Result", defaultValuePort.get());

// vars
const el = document.createElement("div");
el.addEventListener("dblclick", function ()
{
    valuePort.set(parseFloat(defaultValuePort.get()));
    inputValuePort.set(parseFloat(defaultValuePort.get()));
});

el.classList.add("sidebar__item");
el.classList.add("sidebar__text-input");
el.classList.add("sidebar__reloadable");

const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelTextNode = document.createTextNode(labelPort.get());
label.appendChild(labelTextNode);
el.appendChild(label);
// var inputWrapper = document.createElement('div');
// inputWrapper.classList.add('sidebar__text-input-input-wrapper');
// el.appendChild(inputWrapper);
const input = document.createElement("input");
input.classList.add("sidebar__text-input-input");
input.setAttribute("type", "text");
input.setAttribute("value", defaultValuePort.get());
// inputWrapper.appendChild(input);
el.appendChild(input);
input.addEventListener("input", onInput);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
op.onDelete = onDelete;
inputValuePort.onChange = onInputValuePortChanged;
setDefaultValueButtonPort.onTriggered = setDefaultValue;

// functions

function setDefaultValue()
{
    defaultValuePort.set(parseFloat(inputValuePort.get()));
    if (CABLES.UI && op.isCurrentUiOp())
    {
        gui.opParams.show(op); /* update DOM */
    }
}

function onInputValuePortChanged()
{
    let val = parseFloat(inputValuePort.get());
    if (isNaN(val)) { val = 0; }
    input.value = val;
    valuePort.set(val);
}

function onInput(ev)
{
    let newVal = parseFloat(ev.target.value);
    if (isNaN(newVal)) { newVal = 0; }
    valuePort.set(newVal);
    inputValuePort.set(newVal);
    if (CABLES.UI && op.isCurrentUiOp())
    {
        gui.opParams.show(op); /* update DOM */
    }
}

function onDefaultValueChanged()
{
    /*
    var defaultValue = defaultValuePort.get();
    valuePort.set(defaultValue);
    input.value = defaultValue;
    */
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI)
    {
        op.setTitle("Number Input: " + labelText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(element)
{
    if (element)
    {
        element.style.display = "block";
    }
}

function hideElement(element)
{
    if (element)
    {
        element.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(element)
{
    if (element && element.parentNode && element.parentNode.removeChild)
    {
        element.parentNode.removeChild(element);
    }
}


};

Ops.Sidebar.NumberInput_v2.prototype = new CABLES.Op();
CABLES.OPS["c4f3f1d7-de07-4c06-921e-32baeef4fc68"]={f:Ops.Sidebar.NumberInput_v2,objName:"Ops.Sidebar.NumberInput_v2"};




// **************************************************************
// 
// Ops.Sidebar.Button_v2
// 
// **************************************************************

Ops.Sidebar.Button_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("link");
const buttonTextPort = op.inString("Text", "Button");

// outputs
const siblingsPort = op.outObject("childs");
const buttonPressedPort = op.outTrigger("Pressed Trigger");

const inGreyOut = op.inBool("Grey Out", false);
const inVisible = op.inBool("Visible", true);


// vars
const el = document.createElement("div");
el.classList.add("sidebar__item");
el.classList.add("sidebar--button");
const input = document.createElement("div");
input.classList.add("sidebar__button-input");
el.appendChild(input);
input.addEventListener("click", onButtonClick);
const inputText = document.createTextNode(buttonTextPort.get());
input.appendChild(inputText);
op.toWorkNeedsParent("Ops.Sidebar.Sidebar");

// events
parentPort.onChange = onParentChanged;
buttonTextPort.onChange = onButtonTextChanged;
op.onDelete = onDelete;

const greyOut = document.createElement("div");
greyOut.classList.add("sidebar__greyout");
el.appendChild(greyOut);
greyOut.style.display = "none";

inGreyOut.onChange = function ()
{
    greyOut.style.display = inGreyOut.get() ? "block" : "none";
};

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};


function onButtonClick()
{
    buttonPressedPort.trigger();
}

function onButtonTextChanged()
{
    const buttonText = buttonTextPort.get();
    input.textContent = buttonText;
    if (CABLES.UI)
    {
        op.setTitle("Button: " + buttonText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.Button_v2.prototype = new CABLES.Op();
CABLES.OPS["5e9c6933-0605-4bf7-8671-a016d917f327"]={f:Ops.Sidebar.Button_v2,objName:"Ops.Sidebar.Button_v2"};




// **************************************************************
// 
// Ops.Html.HyperLink_v2
// 
// **************************************************************

Ops.Html.HyperLink_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exec=op.inTrigger("Open"),
    inUrl=op.inString("URL","https://cables.gl"),
    inTarget=op.inString("Target Name","_self"),
    inSpecs=op.inString("Specs","");


exec.onTriggered=function()
{
    // document.location.href=inUrl.get();
    window.open(inUrl.get(), inTarget.get(), inSpecs.get());
};

};

Ops.Html.HyperLink_v2.prototype = new CABLES.Op();
CABLES.OPS["a669d4f7-1e35-463c-bf8b-08c9f1b68e04"]={f:Ops.Html.HyperLink_v2,objName:"Ops.Html.HyperLink_v2"};




// **************************************************************
// 
// Ops.Math.MathExpression
// 
// **************************************************************

Ops.Math.MathExpression = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const inA = op.inFloat("A", 0);
const inB = op.inFloat("B", 1);
const inC = op.inFloat("C", 2);
const inD = op.inFloat("D", 3);
op.setPortGroup("Parameters", [inA, inB, inC, inD]);
const inExpression = op.inString("Expression", "a*(b+c+d)");
op.setPortGroup("Expression", [inExpression]);
const outResult = op.outNumber("Result");
const outExpressionIsValid = op.outBool("Expression Valid");

let currentFunction = inExpression.get();
let functionValid = false;

const createFunction = () =>
{
    try
    {
        currentFunction = new Function("m", "a", "b", "c", "d", `with(m) { return ${inExpression.get()} }`);
        functionValid = true;
        evaluateFunction();
        outExpressionIsValid.set(functionValid);
    }
    catch (e)
    {
        functionValid = false;
        outExpressionIsValid.set(functionValid);
        if (e instanceof ReferenceError || e instanceof SyntaxError) return;
    }
};

const evaluateFunction = () =>
{
    if (functionValid)
    {
        outResult.set(currentFunction(Math, inA.get(), inB.get(), inC.get(), inD.get()));
        if (!inExpression.get()) outResult.set(0);
    }

    outExpressionIsValid.set(functionValid);
};


inA.onChange = inB.onChange = inC.onChange = inD.onChange = evaluateFunction;
inExpression.onChange = createFunction;
createFunction();


};

Ops.Math.MathExpression.prototype = new CABLES.Op();
CABLES.OPS["d2343a1e-64ea-45b2-99ed-46e167bbdcd3"]={f:Ops.Math.MathExpression,objName:"Ops.Math.MathExpression"};




// **************************************************************
// 
// Ops.String.ParseFloat
// 
// **************************************************************

Ops.String.ParseFloat = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    str=op.inString("String",5711),
    outNum=op.outValue("Number");

str.onChange=function()
{
    var num=parseFloat(str.get());
    if(num!=num) num=0;
    outNum.set(num);
};



};

Ops.String.ParseFloat.prototype = new CABLES.Op();
CABLES.OPS["fa36a56b-a64d-4269-9a9e-addc16493006"]={f:Ops.String.ParseFloat,objName:"Ops.String.ParseFloat"};




// **************************************************************
// 
// Ops.String.ParseInt_v2
// 
// **************************************************************

Ops.String.ParseInt_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    str=op.inString("String",5711),
    outNum=op.outValue("Number");

str.onChange=function()
{
    var num=parseInt(str.get());
    if(num!=num) num=0;
    outNum.set(num);
};



};

Ops.String.ParseInt_v2.prototype = new CABLES.Op();
CABLES.OPS["6d208424-daf2-4a2b-874f-daac406c1f66"]={f:Ops.String.ParseInt_v2,objName:"Ops.String.ParseInt_v2"};




// **************************************************************
// 
// Ops.Sidebar.Toggle_v2
// 
// **************************************************************

Ops.Sidebar.Toggle_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const DEFAULT_VALUE_DEFAULT = true;

// inputs
const parentPort = op.inObject("link");
const labelPort = op.inString("Text", "Toggle");
const inputValuePort = op.inValueBool("Input", DEFAULT_VALUE_DEFAULT);
const setDefaultValueButtonPort = op.inTriggerButton("Set Default");
const defaultValuePort = op.inValueBool("Default", DEFAULT_VALUE_DEFAULT);
defaultValuePort.setUiAttribs({ "hidePort": true, "greyout": true });
const inGreyOut = op.inBool("Grey Out", false);
const inVisible = op.inBool("Visible", true);

// outputs
const siblingsPort = op.outObject("childs");
const valuePort = op.outValue("Value", defaultValuePort.get());

// vars
const el = document.createElement("div");
el.classList.add("sidebar__item");
el.classList.add("sidebar__toggle");
el.classList.add("sidebar__reloadable");

if (DEFAULT_VALUE_DEFAULT) el.classList.add("sidebar__toggle--active");

el.addEventListener("dblclick", function ()
{
    valuePort.set(defaultValuePort.get());
    inputValuePort.set(defaultValuePort.get());
});

const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);
// var value = document.createElement('div');
// value.textContent = DEFAULT_VALUE_DEFAULT;
// value.classList.add('sidebar__item-value-label');
// el.appendChild(value);
// var input = document.createElement('div');
// input.classList.add('sidebar__toggle-input');
// el.appendChild(input);

const icon = document.createElement("div");
icon.classList.add("icon_toggle");
icon.addEventListener("click", onInputClick);
el.appendChild(icon);

const greyOut = document.createElement("div");
greyOut.classList.add("sidebar__greyout");
el.appendChild(greyOut);
greyOut.style.display = "none";

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
inputValuePort.onChange = onInputValuePortChanged;
op.onDelete = onDelete;
setDefaultValueButtonPort.onTriggered = setDefaultValue;
// op.toWorkNeedsParent('Ops.Sidebar.Sidebar');

function setDefaultValue()
{
    const defaultValue = inputValuePort.get();
    defaultValuePort.set(defaultValue);
    valuePort.set(defaultValue);
    if (CABLES.UI && op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */
}

function onInputClick()
{
    el.classList.toggle("sidebar__toggle--active");
    if (el.classList.contains("sidebar__toggle--active"))
    {
        valuePort.set(true);
        inputValuePort.set(true);
        // value.textContent = 'true';
        icon.classList.add("icon_toggle_true");
        icon.classList.remove("icon_toggle_false");
    }
    else
    {
        icon.classList.remove("icon_toggle_true");
        icon.classList.add("icon_toggle_false");

        valuePort.set(false);
        inputValuePort.set(false);
        // value.textContent = 'false';
    }
    if (CABLES.UI && op.isCurrentUiOp()) gui.opParams.show(op); /* update DOM */
}

function onInputValuePortChanged()
{
    const inputValue = inputValuePort.get();
    if (inputValue)
    {
        el.classList.add("sidebar__toggle--active");
        valuePort.set(true);
        // value.textContent = 'true';
    }
    else
    {
        el.classList.remove("sidebar__toggle--active");
        valuePort.set(false);
        // value.textContent = 'false';
    }
}

function onDefaultValueChanged()
{
    /*
    var defaultValue = defaultValuePort.get();
    if(defaultValue) {
        el.classList.add('sidebar__toggle--active');
        valuePort.set(true);
    } else {
        el.classList.remove('sidebar__toggle--active');
        valuePort.set(false);
    }
    */
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI) op.setTitle("Toggle: " + labelText);
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else if (el.parentElement) el.parentElement.removeChild(el);
}

function showElement(el)
{
    if (el) el.style.display = "block";
}

function hideElement(el)
{
    if (el) el.style.display = "none";
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild) el.parentNode.removeChild(el);
}

inGreyOut.onChange = function ()
{
    greyOut.style.display = inGreyOut.get() ? "block" : "none";
};

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};


};

Ops.Sidebar.Toggle_v2.prototype = new CABLES.Op();
CABLES.OPS["98bf9661-6aa4-4c33-970f-ed99428a94aa"]={f:Ops.Sidebar.Toggle_v2,objName:"Ops.Sidebar.Toggle_v2"};




// **************************************************************
// 
// Ops.Value.Integer
// 
// **************************************************************

Ops.Value.Integer = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    input = op.inInt("Integer",0),
    output = op.outNumber("Number out");

input.onChange=function()
{
    output.set(Math.floor(input.get()));
}

};

Ops.Value.Integer.prototype = new CABLES.Op();
CABLES.OPS["17bc01d7-04ad-4aab-b88b-bb09744c4a69"]={f:Ops.Value.Integer,objName:"Ops.Value.Integer"};




// **************************************************************
// 
// Ops.User.alivemachine.MyWebcam
// 
// **************************************************************

Ops.User.alivemachine.MyWebcam = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// todo: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
loadDaFun();
function loadDaFun() {
   var script = document.createElement('script');
   script.src = 'https://webrtc.github.io/adapter/adapter-latest.js';
   var head = document.getElementsByTagName("head")[0];
   head.appendChild(script);
}
const
    inFacing = op.inSwitch("Facing", ["environment", "user"], "user"),
    flip = op.inValueBool("flip"),
    fps = op.inValueInt("fps"),
    width = op.inValueInt("inWidth", 640),
    height = op.inValueInt("inHeight", 480),
    inActive = op.inValueBool("Active", true),
    inStyle = op.inValueEditor("Style", "position:absolute;z-index:9999;", "none"),
    inCap = op.inTriggerButton("Capture"),
    textureOut = op.outTexture("texture"),
    outRatio = op.outValue("Ratio"),
    available = op.outValue("Available"),
    outWidth = op.outNumber("outWidth"),
    outHeight = op.outNumber("outHeight"),
    outEleId = op.outString("Element Id"),
    outObj = op.outObject("Element"),
    outClicked = op.outTrigger("Clicked"),
    outCap = op.outString("Captured");

width.onChange =
    height.onChange =
    inFacing.onChange = startWebcam;
inStyle.onChange = updateStyle;
inCap.onTriggered=onMouseClick;
fps.set(30);
flip.set(true);

const cgl = op.patch.cgl;
const videoElement = document.createElement("video");
const eleId = "webcam" + CABLES.uuid();
if(inActive.get()===false){
    videoElement.style.display = "none";
}else{
    videoElement.style.display = "block";
}
videoElement.setAttribute("id", eleId);
videoElement.setAttribute("autoplay", "");
videoElement.setAttribute("muted", "");
videoElement.setAttribute("playsinline", "");
videoElement.addEventListener("mousedown", onMouseClick);
videoElement.addEventListener("mouseup", onMouseUp);
var mouseisup = true;
op.patch.cgl.canvas.parentElement.appendChild(videoElement);

const tex = new CGL.Texture(cgl);
tex.setSize(8, 8);
textureOut.set(tex);
let timeout = null;

let canceled = false;

op.onDelete = removeElement;

function removeElement()
{
    if (videoElement) videoElement.remove();
    clearTimeout(timeout);
}


inActive.onChange = function ()
{
    if (inActive.get())
    {
        canceled = false;
        videoElement.style.display = "block";
        updateTexture();
    }
    else
    {
        videoElement.style.display = "none";
        canceled = true;
    }
};

fps.onChange = function ()
{
    if (fps.get() < 1)fps.set(1);
    clearTimeout(timeout);
    timeout = setTimeout(updateTexture, 1000 / fps.get());
};

function updateTexture()
{
    cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, tex.tex);
    cgl.gl.pixelStorei(cgl.gl.UNPACK_FLIP_Y_WEBGL, flip.get());

    cgl.gl.texImage2D(cgl.gl.TEXTURE_2D, 0, cgl.gl.RGBA, cgl.gl.RGBA, cgl.gl.UNSIGNED_BYTE, videoElement);
    cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, null);

    if (!canceled) timeout = setTimeout(updateTexture, 1000 / fps.get());
}

function camInitComplete(stream)
{
    tex.videoElement = videoElement;
    // videoElement.src = window.URL.createObjectURL(stream);
    videoElement.srcObject = stream;
    // tex.videoElement=stream;

    videoElement.onloadedmetadata = function (e)
    {
        available.set(true);

        outHeight.set(videoElement.videoHeight);
        outWidth.set(videoElement.videoWidth);
        videoElement.width=width.get();
        videoElement.height=height.get();
        tex.setSize(videoElement.videoWidth, videoElement.videoHeight);

        outRatio.set(videoElement.videoWidth / videoElement.videoHeight);

        videoElement.play();
        outObj.set(videoElement);
        updateTexture();
    };
}

function startWebcam()
{
    //removeElement();
    const constraints =
    {
        audio: false,
        video: {
                width:1920,
                height:1080
        }
    };

    constraints.video.facingMode = inFacing.get();

    navigator.getUserMedia = navigator.getUserMedia || navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (navigator.getUserMedia)
    {
        navigator.getUserMedia(constraints, camInitComplete,
            function ()
            {
                available.set(false);
                // console.log('error webcam');
            });
    }
    else
    {
        // the ios way...

        navigator.mediaDevices.getUserMedia(constraints)
            .then(camInitComplete)
            .catch(function (error)
            {
                console.log(error.name + ": " + error.message);
            });
    }
}
function updateStyle()
{
    if (inStyle.get() != videoElement.style)
    {
        videoElement.setAttribute("style", inStyle.get());
        outObj.set(null);
        outObj.set(videoElement);
    }
}

var cursorPosY;
var cursorPosX;
var cursorWidth;
var cursorHeight;
function onMouseClick(e)
{
   //if(inActive.get()){
    mouseisup = false;
    cursorPosY = e.clientY-videoElement.getBoundingClientRect().top;
    cursorPosX = e.clientX-videoElement.getBoundingClientRect().left;

    //}else{
    //    outCap.set('');
    //}
}
function onMouseUp(e){
    mouseisup = true;
    cursorHeight = e.clientY-cursorPosY-videoElement.getBoundingClientRect().top;
    cursorWidth = e.clientX-cursorPosX-videoElement.getBoundingClientRect().left;
    selectZone(cursorPosX,cursorPosY,cursorHeight,cursorWidth);
}

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
function selectZone(x,y,h,w){
    if(h>=8 && w>=8){
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(videoElement,x*(1280/width.get()),y*(720/height.get()),w*(1280/width.get()),h*(720/height.get()),0,0,w,h);
        var b64webcam = canvas.toDataURL('image/png', .1);
	    outCap.set(b64webcam);
    }else{
        outClicked.trigger();
    }
}

updateStyle();
startWebcam();


};

Ops.User.alivemachine.MyWebcam.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.User.alivemachine.Boids03
// 
// **************************************************************

Ops.User.alivemachine.Boids03 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var active = op.inBool("active",true);
var cheight = op.inInt("height",300);
var cwidth = op.inInt("width",300);
var scIn = op.inInt("starlingCount",10);
var homIn = op.inFloatSlider("homing",.5);
var alIn = op.inFloatSlider("alignment",.5);
var coIn = op.inFloatSlider("cohesion",.5);
var sepIn = op.inFloatSlider("separation",.5);
var sizeIn = op.inFloat("size",1);
var hcIn = op.inInt("homeChangeInterval",3);
var speedIn = op.inFloat("speed",1);
var distIn = op.inFloat("neighbourDistance",400);
var randhoIn = op.inBool("randomiseHome",true);
var surfaceIn = op.inFloatSlider("surface",.1);
var particle = op.inString("image");
var imgAlpha = op.inFloatSlider("image alpha",1);
var hueRot = op.inFloat("HueRotate",0);
var paint = op.inBool("Paint",0);
var rt = op.inFloatSlider("rt",1),
    gt = op.inFloatSlider("gt",0),
    bt = op.inFloatSlider("bt",1),
    at = op.inFloatSlider("at",1),
    blurt = op.inFloatSlider("blurt",0);
var rb = op.inFloatSlider("rb",1),
    gb = op.inFloatSlider("gb",0),
    bb = op.inFloatSlider("bb",1),
    ab = op.inFloatSlider("ab",1),
    blurb = op.inFloatSlider("blurb",0);
var comp=op.inValueSelect("compositing",['source-over','source-in','source-out','source-atop','destination-over','destination-in','destination-out','destination-atop','lighter','copy','xor','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity']);
var inStyle = op.inValueEditor("Style", "position:absolute;z-index:9999;", "none");

var outCanvas=op.outObject("canvas");

comp.set('source-over');
inStyle.onChange = updateStyle;

op.setPortGroup('Top',[rt,gt,bt,at, blurt]);
op.setPortGroup('Bottom',[rb,gb,bb,ab, blurb]);

var img = new Image();
img.crossOrigin = 'Anonymous';
particle.onChange=reloadPar;
function reloadPar(){
    img.src = particle.get();
}
var Murmuration = function () {
  "use strict";

  function s(t, i, e) {
    void 0 === t && (t = 0), void 0 === i && (i = 0), void 0 === e && (e = 0), this.x = t, this.y = i, this.z = e
  }
  s.prototype.getDistanceFrom = function (t) {
    var i = {};
    return i.x = this.x - t.x, i.y = this.y - t.y, i.z = this.z - t.z, Math.abs(Math.sqrt(i.x * i.x + i.y * i.y + i.z * i.z))
  }, s.prototype.normalise = function (t) {
    var i = Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    this.x = t * (this.x / i), this.y = t * (this.y / i), this.z = t * (this.z / i)
  }, s.prototype.add = function (t) {
    this.x += t.x, this.y += t.y, this.z += t.z
  }, s.prototype.multiply = function (t) {
    this.x *= t, this.y *= t, this.z *= t
  }, s.prototype.reset = function () {
    this.x = 0, this.y = 0, this.z = 0
  }, s.prototype.toString = function () {
    return "<" + this.x + "," + this.y + "," + this.z + ">"
  };

  function t(t) {
    var i = this;
    this.starlingCount = scIn.get(), this.homing = 1, this.alignment = 1, this.cohesion = 1, this.separation = 1, this.randomiseHome = !0, this.homeChangeInterval = 1e3, this.neighbourDistance = 400, this.parentElem = document.body, this.worldWidth = 100, this.worldHeight = 100, this.home = new s(this.worldWidth / 2, this.worldHeight / 2, 0), this.starlings = [], this.homingMod = .024 * this.homing, this.alignmentMod = 18e-5 * this.alignment, this.cohesionMod = 6 * this.cohesion, this.separationMod = 5.994 * this.separation, this.onUpdate = function (t) {}, Object.assign(this, t);
    for (var e = 0; e < this.starlingCount; e++) this.addStarling();
    this.randomiseHome && (this._changeHomeFunc = function () {
      i._changeHome(), setTimeout(i._changeHomeFunc, i.homeChangeInterval)
    }, this._changeHomeFunc()), this.averageDistance = new s, this.averagePosition = new s, this.averageVelocity = new s, this.homingVelocity = new s;
  }

  var a = function (s) {
    function t(t, i, e) {
      s.call(this, t, i, e), this.zMod = 1e-4, this.velocity = new s(Math.random(), Math.random(), Math.random()), this.maxSpeed = speedIn.get(), this.skill = Math.random() / 10, this.skillVariant = new s
    }
    return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.update = function () {
      this.skillVariant.x = (Math.random() - .5) * this.skill, this.skillVariant.y = (Math.random() - .5) * this.skill, this.skillVariant.z = (Math.random() - .5) * this.skill, this.velocity.normalise(this.maxSpeed*speedIn.get()), this.velocity.add(this.skillVariant), this.x += this.velocity.x, this.y += this.velocity.y, this.z += this.velocity.z, this.skillVariant.reset()
    }, t
  }(s);
  return t.prototype.addStarling = function () {
    var t = Math.random() * this.worldWidth / 4 + this.worldWidth / 4,
      i = Math.random() * this.worldHeight / 4 + this.worldHeight / 4,
      e = new a(t, i, 0);
    this.starlings.push(e)
  }, t.prototype._changeHome = function () {
    this.home.x = this.worldWidth*surfaceIn.get() * (Math.random()*2-1)+this.worldWidth/2, this.home.y = this.worldHeight*surfaceIn.get() * (Math.random()*2-1)+this.worldHeight/2, this.home.z = .1
  }, t.prototype.run = function () {
    var t = this;
    requestAnimationFrame(function () {
      if(active.get()==true){ return t.run() }else{return}
    }), this.updateStarlings(), this.onUpdate(this.starlings)
  }, t.prototype.alignStarling = function (t) {
    for (var i = 0, e = 0; e < this.starlingCount; e++) {
      var s = this.starlings[e];
      t != s && t.getDistanceFrom(s) < this.neighbourDistance && (this.averageVelocity.x = s.velocity.x, this.averageVelocity.y = s.velocity.y, this.averageVelocity.z = s.velocity.z, i++)
    }
    this.averageVelocity.x /= i, this.averageVelocity.y /= i, this.averageVelocity.z /= i, this.averageVelocity.normalise(1), this.averageVelocity.multiply(this.alignmentMod), 0 < i && t.velocity.add(this.averageVelocity), this.averageVelocity.reset()
  }, t.prototype.cohereStarling = function (t) {
    for (var i = 0, e = 0; e < this.starlingCount; e++) {
      var s = this.starlings[e];
      t != s && (t.getDistanceFrom(s) < this.neighbourDistance && (this.averageDistance.x = s.x - t.x, this.averageDistance.y = s.y - t.y, this.averageDistance.z = s.z - t.z, i++), this.averagePosition.x += s.x, this.averagePosition.y += s.y, this.averagePosition.z += s.z)
    }
    this.averagePosition.x /= this.starlings.length - 1, this.averagePosition.y /= this.starlings.length - 1, this.averagePosition.z /= this.starlings.length - 1, this.averageDistance.x /= i, this.averageDistance.y /= i, this.averageDistance.z /= i, this.averageDistance.normalise(1), this.averageDistance.multiply(this.cohesionMod), 0 < i && t.velocity.add(this.averageDistance), this.averageDistance.reset(), this.averagePosition.reset()
  }, t.prototype.separateStarling = function (t) {
    for (var i = 0, e = 0; e < this.starlingCount; e++) {
      var s = this.starlings[e];
      t != s && t.getDistanceFrom(s) < this.neighbourDistance && (this.averageDistance.x = s.x - t.x, this.averageDistance.y = s.y - t.y, this.averageDistance.z = s.z - t.z, i++)
    }
    this.averageDistance.x /= i, this.averageDistance.y /= i, this.averageDistance.z /= i, this.averageDistance.normalise(1), this.averageDistance.multiply(this.separationMod), 0 < i && (t.velocity.x += -1 * this.averageDistance.x, t.velocity.y += -1 * this.averageDistance.y, t.velocity.z += -1 * this.averageDistance.z), this.averageDistance.reset()
  }, t.prototype.homeStarling = function (t) {
    this.homingVelocity.x = this.home.x - t.x, this.homingVelocity.y = this.home.y - t.y, this.homingVelocity.z = this.home.z - t.z, this.homingVelocity.normalise(1), this.homingVelocity.multiply(this.homingMod * (10 * Math.random())), t.velocity.add(this.homingVelocity), this.homingVelocity.reset()
  }, t.prototype.updateStarlings = function () {
    for (var t = 0; t < sc; t++) {
      var i = this.starlings[t];
      this.alignStarling(i), this.cohereStarling(i), this.separateStarling(i), this.homeStarling(i), i.update()
    }
  }, t
}();




    var sc = scIn.get();
    var size = sizeIn.get();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	//canvas.style.backgroundColor = 'grey';
	canvas.height=cheight.get();
	canvas.width=cwidth.get();
	outCanvas.set(canvas);


function paintToggle(){
    if(paint.get()==true){
        return 0;
    }else{
        return 1;
    }
}


    var murmuration;
function newmurmur(){
		 murmuration = new Murmuration({
			worldWidth: canvas.width,
			worldHeight: canvas.height,
			starlingCount: sc,
			onUpdate: function(starlings) {
				ctx.clearRect(0, 0, paintToggle()*canvas.width, paintToggle()*canvas.height);
				for(let i = 0; i < sc; i++) {
					let scale 	  = ((100 * (starlings[i].z * starlings[i].zMod)))+size;
					let transform = `scale(${scale < 0 ? 0 : scale})`;
					let left 	  = `${starlings[i].x}`;
					let bottom 	  = `${starlings[i].y}`;
					//Object.assign(letters[i].style,{transform,left,bottom});

					ctx.beginPath();
					ctx.globalCompositeOperation = comp.get();
					ctx.arc(left, bottom, scale, 0, Math.PI * 2);
					//ctx.rect(left, bottom, scale, scale);
					ctx.globalAlpha = imgAlpha.get();
					ctx.drawImage(img, left-scale/2, bottom-scale/2, scale, scale);

					var r = lerp(rb.get(), rt.get(), i/sc);
					var g = lerp(gb.get(), gt.get(), i/sc);
					var b = lerp(bb.get(), bt.get(), i/sc);
					var a = lerp(ab.get(), at.get(), i/sc);

					var blur = lerp(blurb.get(), blurt.get(), i/sc)*100;
					var hr = 0;
					ctx.filter = 'blur('+blur+'px)';
					//ctx.filter = 'hue-rotate('+hr+'deg)';
					ctx.fillStyle = "rgba("+r*255+","+g*255+","+b*255+","+a+")";
					ctx.fill();

					ctx.closePath();
				}
			}
		});
	murmuration.run();
}
newmurmur();

function lerp(a, b, f) {
    return (a * (1.0 - f)) + (b * f);
}



active.onChange=activate;
randhoIn.onChange=scIn.onChange=updateCount;
cheight.onChange=cwidth.onChange=updateStyle;
surfaceIn.onChange=distIn.onChange=homIn.onChange=alIn.onChange=coIn.onChange=speedIn.onChange=sepIn.onChange=hcIn.onChange=sizeIn.onChange=update;

function activate(){
    if(active.get()==true){
        canvas.style.display='block';
        murmuration.run();
    }else{
        canvas.style.display='none';
    }

}
function update(){
    murmuration.homingMod = homIn.get()*.024;
    murmuration.alignmentMod = alIn.get()*18e-5;
    murmuration.cohesionMod = coIn.get()*6;
    murmuration.separationMod = sepIn.get()*5.994;
    size = sizeIn.get();
    murmuration.homeChangeInterval = hcIn.get()*1000;
    murmuration.neighbourDistance = distIn.get();

    //homingVelocity.x = speedIn.get();
   // homingVelocity.y = speedIn.get();
}
function updateCount(){
    if(sc<0){sc = 0;}else{sc = scIn.get();}
    if(murmuration.starlings.length < sc){
        murmuration.addStarling();
        updateCount();
    }else if(murmuration.starlings.length > sc){
        murmuration.starlings.pop();
        console.log(murmuration.starlings);
        updateCount();
    }else{
        murmuration.starlingCount=sc;
        console.log(murmuration.starlings.length);
        murmuration.randomiseHome=randhoIn.get();
    }

}

function updateStyle()
{
    if (inStyle.get() != canvas.style)
    {
        canvas.setAttribute("style", inStyle.get());
    }
    canvas.height=cheight.get();
	canvas.width=cwidth.get();
	murmuration.worldWidth = canvas.width;
	murmuration.worldHeight = canvas.height;
	outCanvas.set(canvas);
}
updateStyle();



};

Ops.User.alivemachine.Boids03.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.String.FilterValidString
// 
// **************************************************************

Ops.String.FilterValidString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

const
    inStr=op.inString("String",""),
    checkNull=op.inBool("Invalid if null",true),
    checkUndefined=op.inBool("Invalid if undefined",true),
    checkEmpty=op.inBool("Invalid if empty",true),
    checkZero=op.inBool("Invalid if 0",true),
    outStr=op.outString("Last Valid String"),
    result=op.outBool("Is Valid");

inStr.onChange=
checkNull.onChange=
checkUndefined.onChange=
checkEmpty.onChange=
function()
{
    const str=inStr.get();
    var r=true;

    if(r===false)r=false;
    if(r && checkZero.get() && (str===0 || str==="0")) r=false;
    if(r && checkNull.get() && str===null) r=false;
    if(r && checkUndefined.get() && str===undefined) r=false;
    if(r && checkEmpty.get() && str==="") r=false;

    if(r)outStr.set(str);

    result.set(r);

};


};

Ops.String.FilterValidString.prototype = new CABLES.Op();
CABLES.OPS["a522235d-f220-46ea-bc26-13a5b20ec8c6"]={f:Ops.String.FilterValidString,objName:"Ops.String.FilterValidString"};




// **************************************************************
// 
// Ops.String.ConcatMulti
// 
// **************************************************************

Ops.String.ConcatMulti = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

const addSpacesCheckBox = op.inBool("add spaces", false),
    newLinesCheckBox = op.inBool("new lines", false),
    stringPorts = [],
    result = op.outString("concat string");


stringPorts.onChange = addSpacesCheckBox.onChange =
newLinesCheckBox.onChange = update;

addSpacesCheckBox.setUiAttribs({ "hidePort": true });
newLinesCheckBox.setUiAttribs({ "hidePort": true });

for (let i = 0; i < 8; i++)
{
    let p = op.inString("string " + i);
    stringPorts.push(p);
    p.onChange = update;
}

function update()
{
    let str = "";
    let nl = "";
    let space = addSpacesCheckBox.get();

    for (let i = 0; i < stringPorts.length; i++)
    {
        const inString = stringPorts[i].get();
        if (!inString) continue;
        if (space) str += " ";
        if (i > 0 && newLinesCheckBox.get()) nl = "\n";
        str += nl;
        str += inString;
    }
    result.set(str);
}


};

Ops.String.ConcatMulti.prototype = new CABLES.Op();
CABLES.OPS["21d3dcc6-3c5b-4e94-97dc-ef7720e9e00d"]={f:Ops.String.ConcatMulti,objName:"Ops.String.ConcatMulti"};




// **************************************************************
// 
// Ops.Trigger.TriggerOnChangeString
// 
// **************************************************************

Ops.Trigger.TriggerOnChangeString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inval=op.inString("String"),
    next=op.outTrigger("Changed"),
    outStr=op.outString("Result");

inval.onChange=function()
{
    outStr.set(inval.get());
    next.trigger();
};

};

Ops.Trigger.TriggerOnChangeString.prototype = new CABLES.Op();
CABLES.OPS["319d07e0-5cbe-4bc1-89fb-a934fd41b0c4"]={f:Ops.Trigger.TriggerOnChangeString,objName:"Ops.Trigger.TriggerOnChangeString"};




// **************************************************************
// 
// Ops.Html.DivElement_v2
// 
// **************************************************************

Ops.Html.DivElement_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inText = op.inString("Text", "Hello Div"),
    inId = op.inString("Id"),
    inClass = op.inString("Class"),
    inStyle = op.inValueEditor("Style", "position:absolute;\nz-index:100;", "css"),
    inInteractive = op.inValueBool("Interactive", false),
    inVisible = op.inValueBool("Visible", true),
    inBreaks = op.inValueBool("Convert Line Breaks", false),
    inPropagation = op.inValueBool("Propagate Click-Events", true),
    outElement = op.outObject("DOM Element"),
    outHover = op.outValue("Hover"),
    outClicked = op.outTrigger("Clicked");

let listenerElement = null;
let oldStr = null;
let prevDisplay = "block";

const div = document.createElement("div");
div.dataset.op = op.id;
div.classList.add("cablesEle");

const canvas = op.patch.cgl.canvas.parentElement;

canvas.appendChild(div);
outElement.set(div);

inClass.onChange = updateClass;
inBreaks.onChange = inText.onChange = updateText;
inStyle.onChange = updateStyle;
inInteractive.onChange = updateInteractive;
inVisible.onChange = updateVisibility;

updateText();
updateStyle();
warning();
updateInteractive();

op.onDelete = removeElement;

outElement.onLinkChanged = updateStyle;

function setCSSVisible(visible)
{
    if (!visible)
    {
        div.style.visibility = "hidden";
        prevDisplay = div.style.display || "block";
        div.style.display = "none";
    }
    else
    {
        // prevDisplay=div.style.display||'block';
        if (prevDisplay == "none") prevDisplay = "block";
        div.style.visibility = "visible";
        div.style.display = prevDisplay;
    }
}

function updateVisibility()
{
    setCSSVisible(inVisible.get());
}

function updateText()
{
    let str = inText.get();

    if (oldStr === str) return;
    oldStr = str;

    if (str && inBreaks.get()) str = str.replace(/(?:\r\n|\r|\n)/g, "<br>");

    if (div.innerHTML != str) div.innerHTML = str;
    outElement.set(null);
    outElement.set(div);
}

function removeElement()
{
    if (div) removeClasses();
    if (div && div.parentNode) div.parentNode.removeChild(div);
}

// inline css inisde div
function updateStyle()
{
    if (inStyle.get() != div.style)
    {
        div.setAttribute("style", inStyle.get());
        updateVisibility();
        outElement.set(null);
        outElement.set(div);
    }

    if (!div.parentElement)
    {
        canvas.appendChild(div);
    }

    warning();
}

let oldClassesStr = "";

function removeClasses()
{
    const classes = (inClass.get() || "").split(" ");
    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i]) div.classList.remove(classes[i]);
    }
    oldClassesStr = "";
}

function updateClass()
{
    const classes = (inClass.get() || "").split(" ");
    const oldClasses = (oldClassesStr || "").split(" ");

    let found = false;

    for (let i = 0; i < oldClasses.length; i++)
    {
        if (
            oldClasses[i] &&
            classes.indexOf(oldClasses[i].trim()) == -1)
        {
            found = true;
            div.classList.remove(oldClasses[i]);
        }
    }

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i])
        {
            div.classList.add(classes[i].trim());
        }
    }

    oldClassesStr = inClass.get();
    warning();
}

function onMouseEnter(e)
{
    outHover.set(true);
}

function onMouseLeave(e)
{
    outHover.set(false);
}

function onMouseClick(e)
{
    if (!inPropagation.get())
    {
        e.stopPropagation();
    }
    outClicked.trigger();
}

function updateInteractive()
{
    removeListeners();
    if (inInteractive.get()) addListeners();
}

inId.onChange = function ()
{
    div.id = inId.get();
};

function removeListeners()
{
    if (listenerElement)
    {
        listenerElement.removeEventListener("pointerdown", onMouseClick);
        listenerElement.removeEventListener("pointerleave", onMouseLeave);
        listenerElement.removeEventListener("pointerenter", onMouseEnter);
        listenerElement = null;
    }
}

function addListeners()
{
    if (listenerElement)removeListeners();

    listenerElement = div;

    if (listenerElement)
    {
        listenerElement.addEventListener("pointerdown", onMouseClick);
        listenerElement.addEventListener("pointerleave", onMouseLeave);
        listenerElement.addEventListener("pointerenter", onMouseEnter);
    }
}

op.addEventListener("onEnabledChange", function (enabled)
{
    setCSSVisible(div.style.visibility != "visible");
});

function warning()
{
    if (inClass.get() && inStyle.get())
    {
        op.setUiError("error", "DIV uses external and inline CSS", 1);
    }
    else
    {
        op.setUiError("error", null);
    }
}


};

Ops.Html.DivElement_v2.prototype = new CABLES.Op();
CABLES.OPS["db36db6d-83e4-4d27-b84c-8a20067aaffc"]={f:Ops.Html.DivElement_v2,objName:"Ops.Html.DivElement_v2"};




// **************************************************************
// 
// Ops.Html.CSSProperty_v2
// 
// **************************************************************

Ops.Html.CSSProperty_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inEle = op.inObject("Element"),
    inProperty = op.inString("Property"),
    inValue = op.inFloat("Value"),
    inValueSuffix = op.inString("Value Suffix", "px"),
    outEle = op.outObject("HTML Element");

op.setPortGroup("Element", [inEle]);
op.setPortGroup("Attributes", [inProperty, inValue, inValueSuffix]);

inProperty.onChange = updateProperty;
inValue.onChange = update;
inValueSuffix.onChange = update;
let ele = null;

inEle.onChange = inEle.onLinkChanged = function ()
{
    if (ele && ele.style)
    {
        ele.style[inProperty.get()] = "initial";
    }
    update();
};

function updateProperty()
{
    update();
    op.setUiAttrib({ "extendTitle": inProperty.get() + "" });
}

function update()
{
    ele = inEle.get();
    if (ele && ele.style)
    {
        const str = inValue.get() + inValueSuffix.get();
        try
        {
            if (ele.style[inProperty.get()] != str)
                ele.style[inProperty.get()] = str;
        }
        catch (e)
        {
            op.error(e);
        }
    }
    else
    {
        setTimeout(update, 50);
    }

    outEle.set(inEle.get());
}


};

Ops.Html.CSSProperty_v2.prototype = new CABLES.Op();
CABLES.OPS["c179aa0e-b558-4130-8c2d-2deab2919a07"]={f:Ops.Html.CSSProperty_v2,objName:"Ops.Html.CSSProperty_v2"};




// **************************************************************
// 
// Ops.Boolean.MonoFlop
// 
// **************************************************************

Ops.Boolean.MonoFlop = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    trigger = op.inTriggerButton("Trigger"),
    duration = op.inValue("Duration", 1),
    valueTrue = op.inValue("Value True", 1),
    valueFalse = op.inValue("Value False", 0),
    resetButton = op.inTriggerButton("Reset"),
    outAct = op.outTrigger("Activated"),
    result = op.outValue("Result", false);

let lastTimeout = -1;

resetButton.onTriggered = function ()
{
    result.set(valueFalse.get());

    clearTimeout(lastTimeout);
};

trigger.onTriggered = function ()
{
    if (result.get() == valueFalse.get())outAct.trigger();
    result.set(valueTrue.get());


    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(function ()
    {
        result.set(valueFalse.get());
    }, duration.get() * 1000);
};


};

Ops.Boolean.MonoFlop.prototype = new CABLES.Op();
CABLES.OPS["3a4b0a78-4172-41c7-8248-95cb0856ecc8"]={f:Ops.Boolean.MonoFlop,objName:"Ops.Boolean.MonoFlop"};




// **************************************************************
// 
// Ops.Html.WindowInfo
// 
// **************************************************************

Ops.Html.WindowInfo = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    outWidth=op.outNumber("clientWidth"),
    outHeight=op.outNumber("clientHeight");


window.addEventListener('resize', update);

update();

function update()
{
    outWidth.set(window.innerWidth);
    outHeight.set(window.innerHeight);
}



};

Ops.Html.WindowInfo.prototype = new CABLES.Op();
CABLES.OPS["9655045c-3539-457d-be65-a1456a58906a"]={f:Ops.Html.WindowInfo,objName:"Ops.Html.WindowInfo"};




// **************************************************************
// 
// Ops.Math.TriggerRandomNumber_v2
// 
// **************************************************************

Ops.Math.TriggerRandomNumber_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exe=op.inTriggerButton('Generate'),
    min=op.inValue("min",0),
    max=op.inValue("max",1),
    outTrig = op.outTrigger("next"),
    result=op.outValue("result"),
    inInteger=op.inValueBool("Integer",false);

exe.onTriggered=genRandom;
max.onChange=genRandom;
min.onChange=genRandom;
inInteger.onChange=genRandom;

op.setPortGroup("Value Range",[min,max]);
genRandom();

function genRandom()
{
    var r=(Math.random()*(max.get()-min.get()))+min.get();
    if(inInteger.get())r=Math.floor((Math.random()*((max.get()-min.get()+1)))+min.get());
    result.set(r);
    outTrig.trigger();
}


};

Ops.Math.TriggerRandomNumber_v2.prototype = new CABLES.Op();
CABLES.OPS["26f446cc-9107-4164-8209-5254487fa132"]={f:Ops.Math.TriggerRandomNumber_v2,objName:"Ops.Math.TriggerRandomNumber_v2"};




// **************************************************************
// 
// Ops.Math.Math
// 
// **************************************************************

Ops.Math.Math = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const num0 = op.inFloat("number 0",0),
    num1 = op.inFloat("number 1",0),
    mathDropDown = op.inSwitch("math mode",['+','-','*','/','%','min','max'], "+"),
    result = op.outNumber("result");

var mathFunc;

num0.onChange = num1.onChange = update;
mathDropDown.onChange = onFilterChange;

var n0=0;
var n1=0;

const mathFuncAdd = function(a,b){return a+b};
const mathFuncSub = function(a,b){return a-b};
const mathFuncMul = function(a,b){return a*b};
const mathFuncDiv = function(a,b){return a/b};
const mathFuncMod = function(a,b){return a%b};
const mathFuncMin = function(a,b){return Math.min(a,b)};
const mathFuncMax = function(a,b){return Math.max(a,b)};


function onFilterChange()
{
    var mathSelectValue = mathDropDown.get();

    if(mathSelectValue == '+')         mathFunc = mathFuncAdd;
    else if(mathSelectValue == '-')    mathFunc = mathFuncSub;
    else if(mathSelectValue == '*')    mathFunc = mathFuncMul;
    else if(mathSelectValue == '/')    mathFunc = mathFuncDiv;
    else if(mathSelectValue == '%')    mathFunc = mathFuncMod;
    else if(mathSelectValue == 'min')  mathFunc = mathFuncMin;
    else if(mathSelectValue == 'max')  mathFunc = mathFuncMax;
    update();
    op.setUiAttrib({"extendTitle":mathSelectValue});
}

function update()
{
   n0 = num0.get();
   n1 = num1.get();

   result.set(mathFunc(n0,n1));
}

onFilterChange();


};

Ops.Math.Math.prototype = new CABLES.Op();
CABLES.OPS["e9fdcaca-a007-4563-8a4d-e94e08506e0f"]={f:Ops.Math.Math,objName:"Ops.Math.Math"};




// **************************************************************
// 
// Ops.Sidebar.DropDown_v2
// 
// **************************************************************

Ops.Sidebar.DropDown_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
const parentPort = op.inObject("Link");
const labelPort = op.inString("Text", "Value");
const valuesPort = op.inArray("Values");
const defaultValuePort = op.inString("Default", "");
const inGreyOut = op.inBool("Grey Out", false);
const inVisible = op.inBool("Visible", true);

// outputs
const siblingsPort = op.outObject("Children");
const valuePort = op.outString("Result", defaultValuePort.get());
const outIndex = op.outNumber("Index");

// vars
const el = document.createElement("div");
el.addEventListener("dblclick", function ()
{
    valuePort.set(defaultValuePort.get());
    const optionElements = input.querySelectorAll("option");
    optionElements.forEach(function (optionElement, index)
    {
        if (optionElement.value.trim() === defaultValuePort.get())
        {
            optionElement.selected = true;
            outIndex.set(index);
        }
        else
        {
            optionElement.removeAttribute("selected");
        }
    });
});

el.classList.add("sidebar__item");
el.classList.add("sidebar__select");
el.classList.add("sidebar__reloadable");

const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);
const input = document.createElement("select");
input.classList.add("sidebar__select-select");
el.appendChild(input);
input.addEventListener("input", onInput);

const greyOut = document.createElement("div");
greyOut.classList.add("sidebar__greyout");
el.appendChild(greyOut);
greyOut.style.display = "none";

inGreyOut.onChange = function ()
{
    greyOut.style.display = inGreyOut.get() ? "block" : "none";
};

inVisible.onChange = function ()
{
    el.style.display = inVisible.get() ? "block" : "none";
};

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
op.onDelete = onDelete;
valuesPort.onChange = onValuesPortChange;

let options = [];
// functions

op.onLoaded = function ()
{
    valuePort.set(defaultValuePort.get());
};

function onValuesPortChange()
{
    // remove all children
    while (input.lastChild)
    {
        input.removeChild(input.lastChild);
    }
    options = valuesPort.get();
    const defaultValue = defaultValuePort.get();
    if (options)
    {
        options.forEach(function (option)
        {
            const optionEl = document.createElement("option");
            optionEl.setAttribute("value", option);
            if (option === defaultValue || option === valuePort.get())
            {
                optionEl.setAttribute("selected", "");
            }
            const textEl = document.createTextNode(option);
            optionEl.appendChild(textEl);
            input.appendChild(optionEl);
        });
    }
    else
    {
        valuePort.set("");
    }

    outIndex.set(0);
    setSelectedProperty(); /* set the selected property for the default value */
}

let finalIndex = 0;
function setSelectedProperty()
{
    const defaultItem = defaultValuePort.get() + "";
    const optionElements = input.querySelectorAll("option");

    let finalEle = null;

    optionElements.forEach(function (optionElement, index)
    {
        if (optionElement.value.trim() === defaultItem.trim())
        {
            finalEle = optionElement;
            finalIndex = index;
            // optionElement.setAttribute("selected", "");
            // outIndex.set(index);
        }

        optionElement.removeAttribute("selected");
    });

    optionElements.forEach(function (optionElement, index)
    {
        if (optionElement.value.trim() === valuePort.get())
        {
            finalEle = optionElement;
            finalIndex = index;

            // optionElement.setAttribute("selected", "");
            // outIndex.set(index);
        }
    });

    if (finalEle) finalEle.setAttribute("selected", "");
    outIndex.set(finalIndex);
}

function onInput(ev)
{
    valuePort.set(ev.target.value);
    outIndex.set(options.indexOf(ev.target.value));
    setSelectedProperty();
}

function onDefaultValueChanged()
{
    const defaultValue = defaultValuePort.get();
    valuePort.set(defaultValue);
    // input.value = defaultValue;
    setSelectedProperty();
}

function onLabelTextChanged()
{
    const labelText = labelPort.get();
    label.textContent = labelText;
    if (CABLES.UI)
    {
        op.setTitle("Dropdown: " + labelText);
    }
}

function onParentChanged()
{
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    }
    else
    { // detach
        if (el.parentElement)
        {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el)
{
    if (el)
    {
        el.style.display = "block";
    }
    setSelectedProperty();
}

function hideElement(el)
{
    if (el)
    {
        el.style.display = "none";
    }
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild)
    {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.DropDown_v2.prototype = new CABLES.Op();
CABLES.OPS["7b3f93d6-4de1-41fd-aa26-e74c8285c662"]={f:Ops.Sidebar.DropDown_v2,objName:"Ops.Sidebar.DropDown_v2"};




// **************************************************************
// 
// Ops.Array.ParseArray_v2
// 
// **************************************************************

Ops.Array.ParseArray_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const text = op.inStringEditor("text", "1,2,3"),
    separator = op.inString("separator", ","),
    toNumber = op.inValueBool("Numbers", true),
    trim = op.inValueBool("Trim", true),
    parsed = op.outTrigger("Parsed"),
    arr = op.outArray("array"),
    len = op.outValue("length");

text.onChange = separator.onChange = toNumber.onChange = trim.onChange = parse;

parse();

function parse()
{
    if (!text.get())
    {
        arr.set(null);
        arr.set([]);
        len.set(0);
        return;
    }

    let textInput = text.get();
    if (trim.get() && textInput)
    {
        textInput = textInput.replace(/^\s+|\s+$/g, "");
        textInput = textInput.trim();
    }

    const sep = separator.get();
    if (separator.get() == "\\n")sep == "\n";
    const r = textInput.split(sep);

    if (r[r.length - 1] === "") r.length -= 1;

    len.set(r.length);

    if (trim.get())
    {
        for (let i = 0; i < r.length; i++)
        {
            r[i] = r[i].replace(/^\s+|\s+$/g, "");
            r[i] = r[i].trim();
        }
    }

    op.setUiError("notnum", null);
    if (toNumber.get())
    {
        let hasStrings = false;
        for (let i = 0; i < r.length; i++)
        {
            r[i] = Number(r[i]);
            if (!CABLES.UTILS.isNumeric(r[i]))
            {
                hasStrings = true;
            }
        }
        if (hasStrings)
        {
            op.setUiError("notnum", "Parse Error / Not all values numerical!");
        }
    }

    arr.set(null);
    arr.set(r);
    parsed.trigger();
}


};

Ops.Array.ParseArray_v2.prototype = new CABLES.Op();
CABLES.OPS["c974de41-4ce4-4432-b94d-724741109c71"]={f:Ops.Array.ParseArray_v2,objName:"Ops.Array.ParseArray_v2"};




// **************************************************************
// 
// Ops.User.alivemachine.Morphcast
// 
// **************************************************************

Ops.User.alivemachine.Morphcast = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

  class ScriptLoader {
    static loadScript(url) {
      return new Promise(resolve => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  //IE
          script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {  //Others
          script.onload = function () {
            resolve();
          };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    }

    static downloadAiSDK() {
      if (ScriptLoader.p == null) {
        ScriptLoader.p = ScriptLoader.loadScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js")
          .then(() => ScriptLoader.loadScript("https://ai-sdk.morphcast.com/v1.14/ai-sdk.js"))
          .then(() => CY); // CY is a global var
      }
      return ScriptLoader.p;
    }
  }
/*
  ScriptLoader.downloadAiSDK().then((CY) => { // here, the local variable CY can be changed to everything else (eg. AI)
    CY.loader()
      .addModule(CY.modules().FACE_DETECTOR.name)
      .load()
      .then(({ start, stop }) => start());

    window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
      //console.log('Face detector result', evt.detail);
    });
  });
*/

//////////////////////////////////////////////////////////////////////////

var log = op.inBool("log",true);

var FD = op.inBool("FACE_DETECTOR",false);
var FP = op.inBool("FACE_POSE",false);
var FA = op.inBool("FACE_AGE",false);
var FE = op.inBool("FACE_EMOTION",false);
var FF = op.inBool("FACE_FEATURES",false);
var FG = op.inBool("FACE_GENDER",false);
var FAV = op.inBool("FACE_AROUSAL_VALENCE",false);
var FAtt = op.inBool("FACE_ATTENTION",false);
var FW = op.inBool("FACE_WISH",false);

const FDobj = op.outObject("FACE_DETECTOR_obj");
const FPobj = op.outObject("FACE_POSE_obj");
const FAobj = op.outObject("FACE_AGE_obj");
const FEobj = op.outObject("FACE_EMOTION_obj");
const FFobj = op.outObject("FACE_FEATURES_obj");
const FGobj = op.outObject("FACE_GENDER_obj");
const FAVobj = op.outObject("FACE_AROUSAL_VALENCE_obj");
const FAttobj = op.outObject("FACE_ATTENTION_obj");
const FWobj = op.outObject("FACE_WISH_obj");


const pose = {smoothness: 0.65};
const emotion = {smoothness: 0.40, enableBalancer : false};
const gender = {smoothness: 0.95, threshold: 0.70};
const feat = {smoothness: 0.90};
const arousal = {smoothness: 0.70};
const attention = {smoothness: 0.83};
const wish = {smoothness: 0.8};
let stopSDK, terminateSDK, startSDK;
ScriptLoader.downloadAiSDK().then((CY) => { // here, the local variable CY can be changed to everything else (eg. AI)
CY.loader()
.licenseKey("b644b944c73299c4d720c2388435b94daf2fd046600e")
.source(CY.getUserMediaCameraFactory().createCamera())
.addModule(CY.modules().FACE_POSE.name, pose)
.addModule(CY.modules().FACE_DETECTOR.name, {})
.addModule(CY.modules().FACE_AGE.name, {})
.addModule(CY.modules().FACE_EMOTION.name, emotion)
.addModule(CY.modules().FACE_GENDER.name, gender)
.addModule(CY.modules().FACE_FEATURES.name, feat)
.addModule(CY.modules().FACE_AROUSAL_VALENCE.name, arousal)
.addModule(CY.modules().FACE_ATTENTION.name, attention)
.addModule(CY.modules().FACE_WISH.name, wish)
.load()
.then(({ start, stop, terminate }) => {
         stopSDK = stop;
         terminateSDK = terminate;
         startSDK = start;
         start();
         //setTimeout(terminateSDK, 20000); // SDK will be unloaded after 20 seconds
        //setTimeout(startSDK, 10000); // SDK will be stopped after 10 seconds after loading
});

window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
    if(FD.get()==true){FDobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_POSE.eventName, (evt) => {
    if(FP.get()==true){FPobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
  if(FA.get()==true){FAobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
  if(FE.get()==true){FEobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
  if(FG.get()==true){FGobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_FEATURES.eventName, (evt) => {
  if(FF.get()==true){FFobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt) => {
  if(FAV.get()==true){FAVobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_ATTENTION.eventName, (evt) => {
  if(FAtt.get()==true){FAttobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});
window.addEventListener(CY.modules().FACE_WISH.eventName, (evt) => {
  if(FW.get()==true){FWobj.set(evt.detail);if(log.get()==true){console.log(evt.detail);}}
});


});





};

Ops.User.alivemachine.Morphcast.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.Json.ObjectKeys
// 
// **************************************************************

Ops.Json.ObjectKeys = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

var inObj=op.inObject("Object");

var outNumKeys=op.outValue("Num Keys");
var outKeys=op.outArray("Keys");

inObj.onChange=function()
{
    var o=inObj.get();
    if(!o)
    {
        outNumKeys.set(0);
        outKeys.set([]);
        return;
    }
    
    
    var keys=Object.keys(o);
    outNumKeys.set(keys.length);
    outKeys.set(keys);

    

    // result.set(outObject.set(inObject.get()));
};


};

Ops.Json.ObjectKeys.prototype = new CABLES.Op();
CABLES.OPS["83b4d148-8cb3-4a45-8824-957eeaf02e22"]={f:Ops.Json.ObjectKeys,objName:"Ops.Json.ObjectKeys"};




// **************************************************************
// 
// Ops.Json.ObjectGetNumber_v2
// 
// **************************************************************

Ops.Json.ObjectGetNumber_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    data = op.inObject("Data"),
    key = op.inString("Key"),
    result = op.outValue("Result"),
    outFound = op.outBool("Found");

result.ignoreValueSerialize = true;
data.ignoreValueSerialize = true;

data.onChange = exec;

key.onChange = function ()
{
    op.setUiAttrib({ "extendTitle": key.get() });
    exec();
};

function exec()
{
    if (data.get() && data.get().hasOwnProperty(key.get()))
    {
        result.set(data.get()[key.get()]);
        outFound.set(1);
    }
    else
    {
        result.set(null);
        outFound.set(0);
    }
}


};

Ops.Json.ObjectGetNumber_v2.prototype = new CABLES.Op();
CABLES.OPS["a7335e79-046e-40da-9e9c-db779b0a5e53"]={f:Ops.Json.ObjectGetNumber_v2,objName:"Ops.Json.ObjectGetNumber_v2"};




// **************************************************************
// 
// Ops.Json.ObjectToArray
// 
// **************************************************************

Ops.Json.ObjectToArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var inObj=op.inObject("Object");
var outArray=op.outArray("Array");

inObj.onChange=function()
{
    outArray.set(inObj.get());
};

};

Ops.Json.ObjectToArray.prototype = new CABLES.Op();
CABLES.OPS["f8ac4574-ffe3-4618-a27f-30d190308e2c"]={f:Ops.Json.ObjectToArray,objName:"Ops.Json.ObjectToArray"};




// **************************************************************
// 
// Ops.Value.Number
// 
// **************************************************************

Ops.Value.Number = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const v = op.inValueFloat("value");
const result = op.outValue("result");

v.onChange = exec;

function exec()
{
    result.set(Number(v.get()));
}


};

Ops.Value.Number.prototype = new CABLES.Op();
CABLES.OPS["8fb2bb5d-665a-4d0a-8079-12710ae453be"]={f:Ops.Value.Number,objName:"Ops.Value.Number"};




// **************************************************************
// 
// Ops.Devices.Mobile.MotionSensor_v2
// 
// **************************************************************

Ops.Devices.Mobile.MotionSensor_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    mulAxis = op.inValue("Mul Orientation", 1),
    req = op.inTrigger("Request Permissions"),
    axis1 = op.outValue("Orientation Alpha"),
    axis2 = op.outValue("Orientation Beta"),
    axis3 = op.outValue("Orientation Gamma"),
    accX = op.outValue("Acceleration X"),
    accY = op.outValue("Acceleration Y"),
    accZ = op.outValue("Acceleration Z"),
    accNoGravX = op.outValue("Acceleration X no gravity"),
    accNoGravY = op.outValue("Acceleration Y no gravity"),
    accNoGravZ = op.outValue("Acceleration Z no gravity"),

    rotRate1 = op.outValue("Rotation Rate Alpha"),
    rotRate2 = op.outValue("Rotation Rate Beta"),
    rotRate3 = op.outValue("Rotation Rate Gamma"),

    outObj = op.outObject("Object");

let lastTime = 0;
let lastTimeAcc = 0;
let obj = {};

function handleDeviceMotion(event)
{
    if (CABLES.now() - lastTimeAcc > 15)
    {
        lastTimeAcc = CABLES.now();

        accX.set(event.accelerationIncludingGravity.x || 0);
        accY.set(event.accelerationIncludingGravity.y || 0);
        accZ.set(event.accelerationIncludingGravity.z || 0);

        accNoGravX.set(event.acceleration.x || 0);
        accNoGravY.set(event.acceleration.y || 0);
        accNoGravZ.set(event.acceleration.z || 0);

        obj.AccelerationX = accX.get();
        obj.AccelerationY = accY.get();
        obj.AccelerationZ = accZ.get();

        rotRate1.set(event.rotationRate.alpha || 0);
        rotRate2.set(event.rotationRate.beta || 0);
        rotRate3.set(event.rotationRate.gamma || 0);

        outObj.set(null);
        outObj.set(obj);
    }
}

function handleDeviceOrientation(event)
{
    if (CABLES.now() - lastTime > 15)
    {
        lastTime = CABLES.now();
        axis1.set((event.alpha || 0) * mulAxis.get());
        axis2.set((event.beta || 0) * mulAxis.get());
        axis3.set((event.gamma || 0) * mulAxis.get());

        obj.OrientationAlpha = axis1.get();
        obj.OrientationBeta = axis2.get();
        obj.OrientationGamma = axis3.get();

        outObj.set(null);
        outObj.set(obj);
    }
}

req.onTriggered = function ()
{
    if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission)
    {
        window.DeviceMotionEvent.requestPermission()
            .then((response) =>
            {
                if (response == "granted")
                {
                    window.addEventListener("devicemotion", handleDeviceMotion, true);
                }
            })
            .catch(op.error);


        window.DeviceOrientationEvent.requestPermission()
            .then((response) =>
            {
                if (response == "granted")
                {
                    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
                }
            })
            .catch(op.error);
    }
    else
    {
        window.addEventListener("devicemotion", handleDeviceMotion, true);
        window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    }
};


};

Ops.Devices.Mobile.MotionSensor_v2.prototype = new CABLES.Op();
CABLES.OPS["f4102f07-e5ff-4c1e-ac5b-6a4758b81727"]={f:Ops.Devices.Mobile.MotionSensor_v2,objName:"Ops.Devices.Mobile.MotionSensor_v2"};




// **************************************************************
// 
// Ops.Devices.Mobile.GeoLocation
// 
// **************************************************************

Ops.Devices.Mobile.GeoLocation = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    outSupported = op.outValue("Browser Support", navigator.geolocation != false),
    outLat = op.outValue("Latitude"),
    outLon = op.outValue("Longitude"),
    outData = op.outObject("Data");

if (navigator.geolocation && navigator.geolocation.watchPosition)
    navigator.geolocation.watchPosition(updatePos);

function updatePos(position)
{
    outLat.set(position.coords.latitude);
    outLon.set(position.coords.longitude);
    outData.set(position);
}


};

Ops.Devices.Mobile.GeoLocation.prototype = new CABLES.Op();
CABLES.OPS["7d9ae643-d011-417e-afe3-b3acb78a6d63"]={f:Ops.Devices.Mobile.GeoLocation,objName:"Ops.Devices.Mobile.GeoLocation"};




// **************************************************************
// 
// Ops.Math.Round
// 
// **************************************************************

Ops.Math.Round = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    result=op.outValue("result"),
    number1=op.inValueFloat("number"),
    decPlaces=op.inInt("Decimal Places",0);

number1.onChange=decPlaces.onChange=exec;

function exec()
{
    var decm=Math.pow(10,decPlaces.get());
    result.set(Math.round(number1.get()*decm)/decm);
}



};

Ops.Math.Round.prototype = new CABLES.Op();
CABLES.OPS["1a1ef636-6d02-42ba-ae1e-627b917d0d2b"]={f:Ops.Math.Round,objName:"Ops.Math.Round"};




// **************************************************************
// 
// Ops.Boolean.BoolToString
// 
// **************************************************************

Ops.Boolean.BoolToString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inBool = op.inBool("Boolean", false),
    inTrue = op.inString("True", "true"),
    inFalse = op.inString("False", "false"),
    result = op.outString("String", "false");

inTrue.onChange =
    inFalse.onChange =
    inBool.onChange = update;

function update()
{
    if (inBool.get()) result.set(inTrue.get());
    else result.set(inFalse.get());
}


};

Ops.Boolean.BoolToString.prototype = new CABLES.Op();
CABLES.OPS["22a734aa-8b08-4db7-929b-393d4704e1d6"]={f:Ops.Boolean.BoolToString,objName:"Ops.Boolean.BoolToString"};




// **************************************************************
// 
// Ops.WebAudio.TextToSpeech.Say_v2
// 
// **************************************************************

Ops.WebAudio.TextToSpeech.Say_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

// default / min /max values
var PITCH_DEFAULT = 1;
var PITCH_MIN = 0;
var PITCH_MAX = 2;
var RATE_DEFAULT = 1;
var RATE_MIN = 0.1;
var RATE_MAX = 10;
var VOLUME_DEFAULT = 1;
var VOLUME_MIN = 0;
var VOLUME_MAX = 1;

// vars
var synth = window.speechSynthesis;
var voiceMap = getVoiceMap(synth.getVoices());
var voiceMapKeys = Object.keys(voiceMap);

// inputs
var updateStatePort = op.inTrigger("Update State");
var textPort = op.inString("Text", "Wazzup");
var triggerPort = op.inTriggerButton("Say");
var voicePort = op.addInPort( new CABLES.Port( op, "Voice", CABLES.OP_PORT_TYPE_VALUE, { display: 'dropdown', values: voiceMapKeys } ) );
var pitchPort = op.addInPort( new CABLES.Port( op, "Pitch", CABLES.OP_PORT_TYPE_VALUE, { 'display': 'range', 'min': PITCH_MIN, 'max': PITCH_MAX } ));
pitchPort.set(PITCH_DEFAULT);
var ratePort = op.addInPort( new CABLES.Port( op, "Rate", CABLES.OP_PORT_TYPE_VALUE, { 'display': 'range', 'min': RATE_MIN, 'max': RATE_MAX } ));
ratePort.set(RATE_DEFAULT);
var volumePort = op.addInPort( new CABLES.Port( op, "Volume", CABLES.OP_PORT_TYPE_VALUE, { 'display': 'range', 'min': VOLUME_MIN, 'max': VOLUME_MAX } ));
volumePort.set(VOLUME_DEFAULT);
var sayOnTextChangePort = op.inValueBool("Say on Text Change", false);
var pausePort = op.inTriggerButton("Pause");
var resumePort = op.inTriggerButton("Resume");
var cancelPort = op.inTriggerButton("Cancel");

// outputs
var nextPort = op.outTrigger("Next");
var speakingPort = op.outValue("Speaking", false);
var pendingPort = op.outValue("Pending", false);
var pausedPort = op.outValue("Paused", false);

// change listeners
updateStatePort.onTriggered = updateState;
triggerPort.onTriggered = say;
sayOnTextChangePort.onChange = function() {
    if(sayOnTextChangePort.get()) {
        textPort.onChange = say;
    } else {
        textPort.onChange = function() {}; // don't do anything
    }
}
pausePort.onTriggered = function() {
    synth.pause();
};
resumePort.onTriggered = function() {
    synth.resume();
};
cancelPort.onTriggered = function() {
    synth.cancel();
};

// voices loaded callback (async)
window.speechSynthesis.onvoiceschanged = function() {
    voiceMap = getVoiceMap(synth.getVoices());
    voiceMapKeys = Object.keys(voiceMap);
    if(CABLES.UI) {
        voicePort.uiAttribs.values = voiceMapKeys; // update dropdown values
        gui.opParams.show(op); // update visible dropdown menu
    }
};

/**
 * Updates the state output ports
 */
function updateState() {
    speakingPort.set(synth.speaking);
    pendingPort.set(synth.pending);
    pausedPort.set(synth.paused);
    nextPort.trigger();
}

/**
 * says the text from text-port using voice voice
 */
function say() {
    var text = textPort.get();
    var voice;
    var voiceDisplayName = voicePort.get();
    if( voiceDisplayName && voiceMap.hasOwnProperty(voiceDisplayName)) { // voices are loaded async, at start it may not be there
        voice = voiceMap[voiceDisplayName];
    }
    var utterance = new SpeechSynthesisUtterance(text);
    if(voice) {
        utterance.voice = voice;
    }
    var pitch = pitchPort.get();
    if(pitch < PITCH_MIN) { pitch = PITCH_MIN; }
    else if(pitch > PITCH_MAX) { pitch = PITCH_MAX; }
    utterance.pitch = pitch;
    var rate = ratePort.get();
    if(rate < RATE_MIN) { rate = RATE_MIN; }
    else if(rate > RATE_MAX) { rate = RATE_MAX; }
    utterance.rate = rate;
    var volume = volumePort.get();
    if(volume < VOLUME_MIN) { volume = VOLUME_MIN; }
    else if(volume > VOLUME_MAX) { volume = VOLUME_MAX; }
    utterance.volume = volume;
    synth.speak(utterance);
}

/**
 * Returns a map of voices
 * e.g. { "Alex (de-DE)": { voice object }, ...}
 */
function getVoiceMap(voices) {
    var ret = {};
    if(!voices || voices.length === 0) { return ret; }

    voices.forEach(function (voice) {
        var key = voice.name + " (" + voice.lang + ")"
        ret[key] = voice;
    });
    return ret;
}


};

Ops.WebAudio.TextToSpeech.Say_v2.prototype = new CABLES.Op();
CABLES.OPS["eb71ad36-9756-449b-89e6-54bf5c944d81"]={f:Ops.WebAudio.TextToSpeech.Say_v2,objName:"Ops.WebAudio.TextToSpeech.Say_v2"};




// **************************************************************
// 
// Ops.Date.DateAndTime
// 
// **************************************************************

Ops.Date.DateAndTime = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var UPDATE_RATE_DEFAULT = 500;
var UPDATE_RATE_MIN = 50;
var updateRate = UPDATE_RATE_DEFAULT;

var outYear=op.outValue("Year");
var outMonth=op.outValue("Month");
var outDay=op.outValue("Day");
var outHours=op.outValue("Hours");
var outMinutes=op.outValue("Minutes");
var outSeconds=op.outValue("Seconds");
var outTimestemp=op.outValue("Timestamp");
var d = new Date();
var updateRatePort = op.inValue("Update Rate", UPDATE_RATE_DEFAULT);

var timeout=setTimeout(update, UPDATE_RATE_DEFAULT);
update();

function update()
{
    d = new Date();

    outSeconds.set( d.getSeconds() );
    outMinutes.set( d.getMinutes() );
    outHours.set( d.getHours() );
    outDay.set( d.getDate() );
    outMonth.set( d.getMonth() );
    outYear.set( d.getFullYear() );
    
    timeout=setTimeout(update, updateRate);
    
    outTimestemp.set(Date.now());
}

updateRatePort.onChange = function() {
    var newUpdateRate = updateRatePort.get();
    if(newUpdateRate && newUpdateRate >= UPDATE_RATE_MIN) {
        updateRate = newUpdateRate;
    }
};

op.onDelete=function()
{
    clearTimeout(timeout);
};

};

Ops.Date.DateAndTime.prototype = new CABLES.Op();
CABLES.OPS["beff95ec-7b50-4b6e-80b8-a7e4ab97d8cc"]={f:Ops.Date.DateAndTime,objName:"Ops.Date.DateAndTime"};




// **************************************************************
// 
// Ops.Boolean.TriggerChangedFalse
// 
// **************************************************************

Ops.Boolean.TriggerChangedFalse = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

var val=op.inValueBool("Value",false);

var next=op.outTrigger("Next");

var oldVal=0;

val.onChange=function()
{
    var newVal=val.get();
    if(oldVal && !newVal)
    {
        oldVal=false;
        next.trigger();
    }
    else
    {
        oldVal=true;
    }
};

};

Ops.Boolean.TriggerChangedFalse.prototype = new CABLES.Op();
CABLES.OPS["6387bcb0-6091-4199-8ab7-f96ad4aa3c7d"]={f:Ops.Boolean.TriggerChangedFalse,objName:"Ops.Boolean.TriggerChangedFalse"};




// **************************************************************
// 
// Ops.User.alivemachine.MySpeech
// 
// **************************************************************

Ops.User.alivemachine.MySpeech = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inLang=op.inString("Language","us-US"),
    active=op.inBool("Active",true),
    result=op.outString("Result"),
    confidence=op.outNumber("Confidence"),
    outSupported=op.outBool("Supported",false),
    outResult=op.outTrigger("New Result",""),
    outActive=op.outBool("Started",false);


active.onChange=startStop;

window.SpeechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition || window.mozSpeechRecognition;

var recognition=null;

inLang.onChange=changeLang;

function startStop(){
    if(!recognition) return;

    try{

        if(active.get()!=outActive.get())
        {
            if(active.get()) {
                //console.log("start");
                recognition.start();
                //console.log("started");
            }
            else {
                //console.log("aborting");
                recognition.stop();
                outActive.set(false);
                //console.log("aborted");
            }
        }

    }
    catch(e)
    {
        console.log(e);
    }
}


op.init=function()
{
   // startStop();
};

function changeLang()
{
    if(!recognition)return;

    recognition.lang = inLang.get();
    recognition.stop();

    setTimeout(function(){
        try{recognition.start();}catch(e){}},500);



}

startAPI();

function startAPI()
{
    if(window.SpeechRecognition)
    {
        outSupported.set(true);

        if(recognition) recognition.abort();

        recognition=new SpeechRecognition();

        recognition.lang = inLang.get();
        recognition.interimResults = false;
        recognition.maxAlternatives = 0;
        recognition.continuous=true;
        SpeechRecognition.interimResults=true;


        recognition.onstart = function() { outActive.set(true); console.log("Listenning to you");};
        recognition.onstop = function() { outActive.set(false); };
        recognition.onend = function() { outActive.set(false);console.log("Not listenning");recognition.stop(); /*if(active===true){startStop();}*/ };

        recognition.onresult = function(event) { op.log('recognition result'); };
        //recognition.onerror = function(event) { op.log('recognition error',result); };


        recognition.onresult = function(event)
        {
            const idx=event.results.length-1;

            result.set(event.results[idx][0].transcript);
            confidence.set(event.results[idx][0].confidence);
            op.log('', event.results[idx][0].transcript);
            outResult.trigger();
        };

    }

}



};

Ops.User.alivemachine.MySpeech.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.Html.CSSPropertyString
// 
// **************************************************************

Ops.Html.CSSPropertyString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inEle = op.inObject("Element"),
    inProperty = op.inString("Property"),
    inValue = op.inString("Value"),
    outEle = op.outObject("HTML Element");

op.setPortGroup("Element", [inEle]);
op.setPortGroup("Attributes", [inProperty, inValue]);

inProperty.onChange = updateProperty;
inValue.onChange = update;
let ele = null;

inEle.onChange = inEle.onLinkChanged = function ()
{
    if (ele && ele.style)
    {
        ele.style[inProperty.get()] = "initial";
    }
    update();
};

function updateProperty()
{
    update();
    op.setUiAttrib({ "extendTitle": inProperty.get() + "" });
}

function update()
{
    ele = inEle.get();
    if (ele && ele.style)
    {
        const str = inValue.get();
        try
        {
            ele.style[inProperty.get()] = str;
        }
        catch (e)
        {
            op.error(e);
        }
    }

    outEle.set(inEle.get());
}


};

Ops.Html.CSSPropertyString.prototype = new CABLES.Op();
CABLES.OPS["a7abdfb9-4c2a-4ddb-8fc6-55b3fdfbdaf3"]={f:Ops.Html.CSSPropertyString,objName:"Ops.Html.CSSPropertyString"};




// **************************************************************
// 
// Ops.User.alivemachine.Runway
// 
// **************************************************************

Ops.User.alivemachine.Runway = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// your new op
// have a look at the documentation at:
// https://docs.cables.gl/dev_hello_op/dev_hello_op.html
// inputs

const triggerIn = op.inTrigger("trigger");
const routeIn = op.inString("route");
//const filterIn = op.inString("inputkey","");
const dataIn = op.inString("inputdata","");
//const filterOut = op.inString("outputkey","");

//const imageIn = op.inTexture("image");


// outputs


const dataOut = op.outString("outputdata","");


dataIn.onChange = go;
triggerIn.onTriggered = go;
var outputs = ["output_image", "image", "output", "result", "generated_text", "caption", "stylizedImage"]

function  go() {
    //op.log("go")
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open( "GET", routeIn.get(), false ); // false for synchronous request
    //xmlHttp.send( null );
    //dataOut.set(JSON.parse(xmlHttp.responseText)[filterOut.get])
    if(dataIn.get()!=""){
    httpPostAsync(routeIn.get()+"query", function(result){
        //dataOut.set(JSON.parse(result)[filterOut.get()])

        for(var i = 0; i<outputs.length; i++){
            if(JSON.parse(result)[outputs[i]]!="undefined"){
                dataOut.set(JSON.parse(result)[outputs[i]])
            }
        }

        //dataOut.set(JSON.parse(result)[filterOut.get()])
    })
    }
}
/*
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
*/

function httpPostAsync(theUrl, callback) {
    var dat = dataIn.get();
const inputs = {
  "caption":dat,
  "input_image":dat,
  "contentImage":dat,
  "image":dat,
  "num_octaves": 2,
  "iterations": 50,
  "octave_scale": 1,
  "features_mixed_2": 1.8,
  "features_mixed_3": 1.7,
  "features_mixed_4": 1.4,
  "features_mixed_5": 1.9,
  "alpha_normal": 1,
  "prompt": dat,
  "max_characters": 128,
  "top_p": .5,
  "seed": 54,
  "semantic_map":dat
};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.send(JSON.stringify(inputs));
}


};

Ops.User.alivemachine.Runway.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.Trigger.TriggerString
// 
// **************************************************************

Ops.Trigger.TriggerString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exec = op.inTriggerButton("Trigger"),
    inString = op.inString("String", ""),
    next = op.outTrigger("Next"),
    outString = op.outString("Result");

outString.changeAlways = true;
exec.onTriggered = function ()
{
    outString.set(inString.get());
    next.trigger();
};


};

Ops.Trigger.TriggerString.prototype = new CABLES.Op();
CABLES.OPS["217482b8-2ee6-4609-b7ad-4550e6aaa371"]={f:Ops.Trigger.TriggerString,objName:"Ops.Trigger.TriggerString"};




// **************************************************************
// 
// Ops.String.String_v2
// 
// **************************************************************

Ops.String.String_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    v=op.inString("value",""),
    result=op.outString("String");

v.onChange=function()
{
    result.set(v.get());
};



};

Ops.String.String_v2.prototype = new CABLES.Op();
CABLES.OPS["d697ff82-74fd-4f31-8f54-295bc64e713d"]={f:Ops.String.String_v2,objName:"Ops.String.String_v2"};




// **************************************************************
// 
// Ops.Array.ArrayGetString
// 
// **************************************************************

Ops.Array.ArrayGetString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var array=op.inArray("array");
var index=op.inValueInt("index");

//when out is set to op.outString then index.onChange doesn't work
var result=op.outString("result");//original code

//setting it to a op.outValue does work on change
//var result=op.outValue("result");

array.ignoreValueSerialize=true;

index.onChange=update;
var arr=null;

array.onChange=function()
{
    arr=array.get();
    update();
};

function update()
{
    if(arr) result.set( arr[index.get()]);
}

};

Ops.Array.ArrayGetString.prototype = new CABLES.Op();
CABLES.OPS["be8f16c0-0c8a-48a2-a92b-45dbf88c76c1"]={f:Ops.Array.ArrayGetString,objName:"Ops.Array.ArrayGetString"};




// **************************************************************
// 
// Ops.String.GateString
// 
// **************************************************************

Ops.String.GateString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    valueInPort = op.inString('String In', 'hello'),
    passThroughPort = op.inValueBool('Pass Through',false),
    valueOutPort = op.outString('String Out','');

valueInPort.onChange =
passThroughPort.onChange = update;

function update()
{
    if(passThroughPort.get())
    {
        valueOutPort.set(null);
        valueOutPort.set(valueInPort.get());
    }
        // else
        // valueOutPort.set('');
}

};

Ops.String.GateString.prototype = new CABLES.Op();
CABLES.OPS["0ce14933-2d91-4381-9d82-2304aae22c0e"]={f:Ops.String.GateString,objName:"Ops.String.GateString"};




// **************************************************************
// 
// Ops.User.alivemachine.ObjectSummoner
// 
// **************************************************************

Ops.User.alivemachine.ObjectSummoner = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const inString  = op.inString("String in", "default string");
const parentID = op.inString("parentID","objectReceiver");
const durationImg = op.inInt("duration Img",3);
const durationIframe = op.inInt("duration iframe",6);
const outImg = op.outString("out Img");
var parent = document.getElementById(parentID.get());
inString.onChange = update;
function update()
{
    parent = document.getElementById(parentID.get());
    if(inString.get().substring(0, 10)=="data:image"){

        var img = document.createElement("IMG");
        img.src = inString.get();
        img.setAttribute("class", "window");
        img.addEventListener('click', function (e) {outImg.set(e.target.src);}, false);
        parent.prepend(img);
        animate(img, durationImg.get()*1000);
    }else if(inString.get().substring(0, 4)=="http"){
        var frame = document.createElement("iframe");
        frame.src = inString.get();
        frame.style.border = "0";
        frame.setAttribute("class", "iframe");
        parent.prepend(frame);
        animate(frame, durationIframe.get()*1000);
    }



}


function animate(elem, dur){
    elem.style.top=getRandomArbitrary(25,75)+'%';
        elem.style.left=getRandomArbitrary(25,75)+'%';

          setTimeout(function(){
            elem.style.opacity='';
            elem.style.filter='';
            setTimeout(function(){
               elem.remove();
            }, 1000);
           },dur);
        setTimeout(function(){
               elem.style.opacity='1';
        elem.style.filter='blur(0px)';
          elem.style.transform='scale(.6)';
            }, 100);
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

};

Ops.User.alivemachine.ObjectSummoner.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.Gl.Meshes.Helix
// 
// **************************************************************

Ops.Gl.Meshes.Helix = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

var render=op.inTrigger('render');

var draw=op.inValueBool("Draw",true);
var segments=op.inValue("Segments",40);
var freq=op.inValue("Frequency",1);
var radius=op.inValue("Radius",1);
var radiusEnd=op.inValue("Radius End",1);
var height=op.inValue("Height");

var next=op.outTrigger("Next");
var outPoints=op.outArray("Points");

var cgl=op.patch.cgl;
var pos=[];
var needsCalc=true;
var mesh=null;

segments.onChange=calcLater;
radius.onChange=calcLater;
height.onChange=calcLater;
freq.onChange=calcLater;
radiusEnd.onChange=calcLater;
draw.onChange=calcLater;

render.onTriggered=doRender;

function doRender()
{
    if(needsCalc)calc();
    
    if(mesh)
    {
        var shader=cgl.getShader();
        if(!shader)return;
        var oldPrim=shader.glPrimitive;
        shader.glPrimitive=cgl.gl.LINE_STRIP;
        mesh.render(shader);
        shader.glPrimitive=oldPrim;
    }
    
    next.trigger();
}

function calcLater()
{
    needsCalc=true;
}

function calc()
{
    needsCalc=false;
    pos.length=0;

    var i=0,degInRad=0;
    var segs=Math.floor(segments.get());
    if(segs<1)segs=1;

    for (i=0; i < segs; i++)
    {
        var perc=(i/segs);
        var z=perc*height.get();
        var rad=(perc*radiusEnd.get())+((1.0-perc)*radius.get());
        degInRad = (360/segs)*i*CGL.DEG2RAD;
        pos.push(
            Math.sin(degInRad*freq.get())*rad,
            Math.cos(degInRad*freq.get())*rad,
            z );
    }

    if(draw.get())
    {
        var buff=new Float32Array(pos);
        var geom=new CGL.Geometry("helix");
        geom.vertices=buff;

        mesh=new CGL.Mesh(cgl,geom);
    }
    else mesh=null;

    outPoints.set(null);
    outPoints.set(pos);
}



};

Ops.Gl.Meshes.Helix.prototype = new CABLES.Op();
CABLES.OPS["f41fabfc-14c0-4472-a00a-6ab1dcdcc4bc"]={f:Ops.Gl.Meshes.Helix,objName:"Ops.Gl.Meshes.Helix"};




// **************************************************************
// 
// Ops.Gl.Meshes.PointCloudFromArray
// 
// **************************************************************

Ops.Gl.Meshes.PointCloudFromArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exe = op.inTrigger("exe"),
    arr = op.inArray("Array"),
    numPoints = op.inValueInt("Num Points"),
    outTrigger = op.outTrigger("Trigger out"),
    outGeom = op.outObject("Geometry"),
    pTexCoordRand = op.inValueBool("Scramble Texcoords", true),
    seed = op.inValue("Seed"),
    inCoords = op.inArray("Coordinates"),
    vertCols = op.inArray("Vertex Colors");

const cgl = op.patch.cgl;

inCoords.onChange = updateTexCoordsPorts;
pTexCoordRand.onChange = updateTexCoordsPorts;

vertCols.onChange = seed.onChange = arr.onChange = reset;
numPoints.onChange = updateNumVerts;

op.toWorkPortsNeedToBeLinked(arr, exe);

op.setPortGroup("Texture Coordinates", [pTexCoordRand, seed, inCoords]);

let deactivated = false;

exe.onTriggered = doRender;

let mesh = null;
const geom = new CGL.Geometry("pointcloudfromarray");
let texCoords = [];
let needsRebuild = true;

let showingError = false;

function doRender()
{
    outTrigger.trigger();
    if (CABLES.UI)
    {
        let shader = cgl.getShader();
        if (shader.glPrimitive != cgl.gl.POINTS) op.setUiError("nopointmat", "Using a Material not made for point rendering. Try to use PointMaterial.");
        else op.setUiError("nopointmat", null);
    }

    if (needsRebuild || !mesh)rebuild();
    if (!deactivated && mesh) mesh.render(cgl.getShader());
}

function reset()
{
    deactivated = arr.get() == null;

    if (!deactivated)needsRebuild = true;
    else needsRebuild = false;
}

function updateTexCoordsPorts()
{
    if (inCoords.isLinked())
    {
        seed.setUiAttribs({ "greyout": true });
        pTexCoordRand.setUiAttribs({ "greyout": true });
    }
    else
    {
        pTexCoordRand.setUiAttribs({ "greyout": false });

        if (!pTexCoordRand.get()) seed.setUiAttribs({ "greyout": true });
        else seed.setUiAttribs({ "greyout": false });
    }

    needsRebuild = true;
}

function updateNumVerts()
{
    if (mesh)
    {
        mesh.setNumVertices(Math.min(geom.vertices.length / 3, numPoints.get()));
        if (numPoints.get() == 0)mesh.setNumVertices(geom.vertices.length / 3);
    }
}

function rebuild()
{
    let verts = arr.get();

    if (!verts || verts.length == 0)
    {
        // mesh=null;
        return;
    }

    if (verts.length % 3 !== 0)
    {
        // if (!showingError)
        // {
        op.setUiError("div3", "Array length not multiple of 3");

        // op.uiAttr({ "error": "Array length not divisible by 3!" });
        // showingError = true;
        // }
        return;
    }
    else op.setUiError("div3", null);

    if (geom.vertices.length == verts.length && mesh && !inCoords.isLinked() && !vertCols.isLinked())
    {
        mesh.setAttribute(CGL.SHADERVAR_VERTEX_POSITION, verts, 3);
        geom.vertices = verts;
        needsRebuild = false;
        return;
    }

    geom.clear();
    let num = verts.length / 3;
    num = Math.abs(Math.floor(num));

    if (num == 0) return;

    if (!texCoords || texCoords.length != num * 2) texCoords = new Float32Array(num * 2); // num*2;//=

    let changed = false;
    let rndTc = pTexCoordRand.get();

    Math.randomSeed = seed.get();
    let genCoords = !inCoords.isLinked();
    changed = !inCoords.isLinked();

    for (let i = 0; i < num; i++)
    {
        if (geom.vertices[i * 3] != verts[i * 3] ||
            geom.vertices[i * 3 + 1] != verts[i * 3 + 1] ||
            geom.vertices[i * 3 + 2] != verts[i * 3 + 2])
        {
            if (genCoords)
                if (rndTc)
                {
                    texCoords[i * 2] = Math.seededRandom();
                    texCoords[i * 2 + 1] = Math.seededRandom();
                }
                else
                {
                    texCoords[i * 2] = i / num;
                    texCoords[i * 2 + 1] = i / num;
                }
            changed = true;
        }
    }

    if (vertCols.get())
    {
        if (!showingError && vertCols.get().length != num * 4)
        {
            op.uiAttr({ "error": "Color array does not have the correct length! (should be " + num * 4 + ")" });
            showingError = true;
            mesh = null;
            return;
        }

        geom.vertexColors = vertCols.get();
    }
    else geom.vertexColors = [];

    if (changed)
    {
        if (!genCoords) texCoords = inCoords.get();

        geom.setPointVertices(verts);
        geom.setTexCoords(texCoords);
        geom.verticesIndices = [];

        if (mesh)mesh.dispose();
        mesh = new CGL.Mesh(cgl, geom, cgl.gl.POINTS);

        mesh.addVertexNumbers = true;
        mesh.setGeom(geom);
        outGeom.set(geom);
    }

    updateNumVerts();
    needsRebuild = false;
}


};

Ops.Gl.Meshes.PointCloudFromArray.prototype = new CABLES.Op();
CABLES.OPS["0a6d9c6f-6459-45ca-88ad-268a1f7304db"]={f:Ops.Gl.Meshes.PointCloudFromArray,objName:"Ops.Gl.Meshes.PointCloudFromArray"};




// **************************************************************
// 
// Ops.Gl.Matrix.Transform
// 
// **************************************************************

Ops.Gl.Matrix.Transform = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    render = op.inTrigger("render"),
    posX = op.inValue("posX", 0),
    posY = op.inValue("posY", 0),
    posZ = op.inValue("posZ", 0),
    scale = op.inValue("scale", 1),
    rotX = op.inValue("rotX", 0),
    rotY = op.inValue("rotY", 0),
    rotZ = op.inValue("rotZ", 0),
    trigger = op.outTrigger("trigger");

op.setPortGroup("Rotation", [rotX, rotY, rotZ]);
op.setPortGroup("Position", [posX, posY, posZ]);
op.setPortGroup("Scale", [scale]);
op.setUiAxisPorts(posX, posY, posZ);

const cgl = op.patch.cgl;
const vPos = vec3.create();
const vScale = vec3.create();
const transMatrix = mat4.create();
mat4.identity(transMatrix);

let
    doScale = false,
    doTranslate = false,
    translationChanged = true,
    scaleChanged = true,
    rotChanged = true;

rotX.onChange = rotY.onChange = rotZ.onChange = setRotChanged;
posX.onChange = posY.onChange = posZ.onChange = setTranslateChanged;
scale.onChange = setScaleChanged;

render.onTriggered = function ()
{
    // if(!CGL.TextureEffect.checkOpNotInTextureEffect(op)) return;

    let updateMatrix = false;
    if (translationChanged)
    {
        updateTranslation();
        updateMatrix = true;
    }
    if (scaleChanged)
    {
        updateScale();
        updateMatrix = true;
    }
    if (rotChanged) updateMatrix = true;

    if (updateMatrix) doUpdateMatrix();

    cgl.pushModelMatrix();
    mat4.multiply(cgl.mMatrix, cgl.mMatrix, transMatrix);

    trigger.trigger();
    cgl.popModelMatrix();

    if (CABLES.UI && CABLES.UI.showCanvasTransforms) gui.setTransform(op.id, posX.get(), posY.get(), posZ.get());

    if (op.isCurrentUiOp())
        gui.setTransformGizmo(
            {
                "posX": posX,
                "posY": posY,
                "posZ": posZ,
            });
};

op.transform3d = function ()
{
    return { "pos": [posX, posY, posZ] };
};

function doUpdateMatrix()
{
    mat4.identity(transMatrix);
    if (doTranslate)mat4.translate(transMatrix, transMatrix, vPos);

    if (rotX.get() !== 0)mat4.rotateX(transMatrix, transMatrix, rotX.get() * CGL.DEG2RAD);
    if (rotY.get() !== 0)mat4.rotateY(transMatrix, transMatrix, rotY.get() * CGL.DEG2RAD);
    if (rotZ.get() !== 0)mat4.rotateZ(transMatrix, transMatrix, rotZ.get() * CGL.DEG2RAD);

    if (doScale)mat4.scale(transMatrix, transMatrix, vScale);
    rotChanged = false;
}

function updateTranslation()
{
    doTranslate = false;
    if (posX.get() !== 0.0 || posY.get() !== 0.0 || posZ.get() !== 0.0) doTranslate = true;
    vec3.set(vPos, posX.get(), posY.get(), posZ.get());
    translationChanged = false;
}

function updateScale()
{
    // doScale=false;
    // if(scale.get()!==0.0)
    doScale = true;
    vec3.set(vScale, scale.get(), scale.get(), scale.get());
    scaleChanged = false;
}

function setTranslateChanged()
{
    translationChanged = true;
}

function setScaleChanged()
{
    scaleChanged = true;
}

function setRotChanged()
{
    rotChanged = true;
}

doUpdateMatrix();


};

Ops.Gl.Matrix.Transform.prototype = new CABLES.Op();
CABLES.OPS["650baeb1-db2d-4781-9af6-ab4e9d4277be"]={f:Ops.Gl.Matrix.Transform,objName:"Ops.Gl.Matrix.Transform"};




// **************************************************************
// 
// Ops.Gl.MainLoop
// 
// **************************************************************

Ops.Gl.MainLoop = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const fpsLimit = op.inValue("FPS Limit", 0);
const trigger = op.outTrigger("trigger");
const width = op.outValue("width");
const height = op.outValue("height");
const reduceFocusFPS = op.inValueBool("Reduce FPS not focussed", true);
const reduceLoadingFPS = op.inValueBool("Reduce FPS loading");
// const clear = op.inValueBool("Clear", true);
const clearAlpha = op.inValueBool("ClearAlpha", true);
const fullscreen = op.inValueBool("Fullscreen Button", false);
const active = op.inValueBool("Active", true);
const hdpi = op.inValueBool("Hires Displays", false);

op.onAnimFrame = render;
hdpi.onChange = function ()
{
    if (hdpi.get()) op.patch.cgl.pixelDensity = window.devicePixelRatio;
    else op.patch.cgl.pixelDensity = 1;

    op.patch.cgl.updateSize();
    if (CABLES.UI) gui.setLayout();
};

active.onChange = function ()
{
    op.patch.removeOnAnimFrame(op);

    if (active.get())
    {
        op.setUiAttrib({ "extendTitle": "" });
        op.onAnimFrame = render;
        op.patch.addOnAnimFrame(op);
        op.log("adding again!");
    }
    else
    {
        op.setUiAttrib({ "extendTitle": "Inactive" });
    }
};

const cgl = op.patch.cgl;
let rframes = 0;
let rframeStart = 0;

if (!op.patch.cgl) op.uiAttr({ "error": "No webgl cgl context" });

const identTranslate = vec3.create();
vec3.set(identTranslate, 0, 0, 0);
const identTranslateView = vec3.create();
vec3.set(identTranslateView, 0, 0, -2);

fullscreen.onChange = updateFullscreenButton;
setTimeout(updateFullscreenButton, 100);
let fsElement = null;

let winhasFocus = true;
let winVisible = true;

window.addEventListener("blur", () => { winhasFocus = false; });
window.addEventListener("focus", () => { winhasFocus = true; });
document.addEventListener("visibilitychange", () => { winVisible = !document.hidden; });

function getFpsLimit()
{
    if (reduceLoadingFPS.get() && op.patch.loading.getProgress() < 1.0) return 5;

    if (reduceFocusFPS.get())
    {
        if (!winVisible) return 10;
        if (!winhasFocus) return 30;
    }

    return fpsLimit.get();
}

function updateFullscreenButton()
{
    function onMouseEnter()
    {
        if (fsElement)fsElement.style.display = "block";
    }

    function onMouseLeave()
    {
        if (fsElement)fsElement.style.display = "none";
    }

    op.patch.cgl.canvas.addEventListener("mouseleave", onMouseLeave);
    op.patch.cgl.canvas.addEventListener("mouseenter", onMouseEnter);

    if (fullscreen.get())
    {
        if (!fsElement)
        {
            fsElement = document.createElement("div");

            const container = op.patch.cgl.canvas.parentElement;
            if (container)container.appendChild(fsElement);

            fsElement.addEventListener("mouseenter", onMouseEnter);
            fsElement.addEventListener("click", function (e)
            {
                if (CABLES.UI && !e.shiftKey) gui.cycleFullscreen();
                else cgl.fullScreen();
            });
        }

        fsElement.style.padding = "10px";
        fsElement.style.position = "absolute";
        fsElement.style.right = "5px";
        fsElement.style.top = "5px";
        fsElement.style.width = "20px";
        fsElement.style.height = "20px";
        fsElement.style.cursor = "pointer";
        fsElement.style["border-radius"] = "40px";
        fsElement.style.background = "#444";
        fsElement.style["z-index"] = "9999";
        fsElement.style.display = "none";
        fsElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 490 490\" style=\"width:20px;height:20px;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\"><g><path d=\"M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480     c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416     l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z\" fill=\"#FFFFFF\"/><path d=\"M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792     c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262     L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z\" fill=\"#FFFFFF\"/><path d=\"M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667     C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459     c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z\" fill=\"#FFFFFF\"/><path d=\"M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261     c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667     H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z\" fill=\"#FFFFFF\"/></g></svg>";
    }
    else
    {
        if (fsElement)
        {
            fsElement.style.display = "none";
            fsElement.remove();
            fsElement = null;
        }
    }
}

op.onDelete = function ()
{
    cgl.gl.clearColor(0, 0, 0, 0);
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
};

function render(time)
{
    if (!active.get()) return;
    if (cgl.aborted || cgl.canvas.clientWidth === 0 || cgl.canvas.clientHeight === 0) return;

    const startTime = performance.now();

    op.patch.config.fpsLimit = getFpsLimit();

    if (cgl.canvasWidth == -1)
    {
        cgl.setCanvas(op.patch.config.glCanvasId);
        return;
    }

    if (cgl.canvasWidth != width.get() || cgl.canvasHeight != height.get())
    {
        width.set(cgl.canvasWidth);
        height.set(cgl.canvasHeight);
    }

    if (CABLES.now() - rframeStart > 1000)
    {
        CGL.fpsReport = CGL.fpsReport || [];
        if (op.patch.loading.getProgress() >= 1.0 && rframeStart !== 0)CGL.fpsReport.push(rframes);
        rframes = 0;
        rframeStart = CABLES.now();
    }
    CGL.MESH.lastShader = null;
    CGL.MESH.lastMesh = null;

    cgl.renderStart(cgl, identTranslate, identTranslateView);

    // if (clear.get())
    // {
    cgl.gl.clearColor(0, 0, 0, 1);
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
    // }

    trigger.trigger();

    if (CGL.MESH.lastMesh)CGL.MESH.lastMesh.unBind();

    if (CGL.Texture.previewTexture)
    {
        if (!CGL.Texture.texturePreviewer) CGL.Texture.texturePreviewer = new CGL.Texture.texturePreview(cgl);
        CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture);
    }
    cgl.renderEnd(cgl);

    if (clearAlpha.get())
    {
        cgl.gl.clearColor(1, 1, 1, 1);
        cgl.gl.colorMask(false, false, false, true);
        cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT);
        cgl.gl.colorMask(true, true, true, true);
    }

    if (!cgl.frameStore.phong)cgl.frameStore.phong = {};
    rframes++;

    op.patch.cgl.profileData.profileMainloopMs = performance.now() - startTime;
}


};

Ops.Gl.MainLoop.prototype = new CABLES.Op();
CABLES.OPS["b0472a1d-db16-4ba6-8787-f300fbdc77bb"]={f:Ops.Gl.MainLoop,objName:"Ops.Gl.MainLoop"};




// **************************************************************
// 
// Ops.Html.BackgroundImage_v2
// 
// **************************************************************

Ops.Html.BackgroundImage_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inEle = op.inObject("Element"),
    active = op.inValueBool("active", true),
    filename = op.inUrl("image file"),
    inSize = op.inValueSelect("Size", ["auto", "length", "cover", "contain", "initial", "inherit", "75%", "50%", "40%", "30%", "25%", "20%", "10%"], "cover"),
    inRepeat = op.inValueSelect("Repeat", ["no-repeat", "repeat", "repeat-x", "repeat-y"], "no-repeat"),
    inPosition = op.inValueSelect("Position", ["left top", "left center", "left bottom", "right top", "right center", "right bottom", "center top", "center center", "center bottom"], "center center"),
    outEle = op.outObject("HTML Element");

op.onLoadedValueSet =
op.onLoaded =
inPosition.onChange =
inSize.onChange =
inEle.onChange =
inRepeat.onChange =
active.onChange =
filename.onChange = update;

let ele = null;
let cacheBust = null;

op.onFileChanged = function (fn)
{
    if (filename.get() && filename.get().indexOf(fn) > -1)
    {
        if (ele)ele.style["background-image"] = "none";
        cacheBust = CABLES.uuid();
        update();
    }
};

function remove()
{
    if (ele)
    {
        ele.style["background-image"] = "none";
        ele.style["background-size"] = "initial";
        ele.style["background-position"] = "initial";
        ele.style["background-repeat"] = "initial";
    }
}

function update()
{
    if (!inEle.get())
    {
        remove();
        return;
    }

    op.setUiAttrib({ "extendTitle": CABLES.basename(filename.get()) });

    ele = inEle.get();

    if (ele && ele.style && filename.get())
    {
        if (!active.get())
        {
            ele.style["background-image"] = "none";
        }
        else
        {
            let cb = "";
            if (cacheBust)cb = "?cb=" + cacheBust;

            ele.style["background-image"] = "url(" + op.patch.getFilePath(String(filename.get())) + cb + ")";
            ele.style["background-size"] = inSize.get();
            ele.style["background-position"] = inPosition.get();
            ele.style["background-repeat"] = inRepeat.get();
        }
    }
    // else
    // {
    //     // really needed ?
    //     setTimeout(update,100);
    // }

    outEle.set(inEle.get());
}


};

Ops.Html.BackgroundImage_v2.prototype = new CABLES.Op();
CABLES.OPS["081c4328-984d-4acd-8758-5d1379cc3a30"]={f:Ops.Html.BackgroundImage_v2,objName:"Ops.Html.BackgroundImage_v2"};




// **************************************************************
// 
// Ops.Gl.Matrix.OrbitControls
// 
// **************************************************************

Ops.Gl.Matrix.OrbitControls = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const render = op.inTrigger("render");
const minDist = op.inValueFloat("min distance");
const maxDist = op.inValueFloat("max distance");

const minRotY = op.inValue("min rot y", 0);
const maxRotY = op.inValue("max rot y", 0);

// const minRotX=op.inValue("min rot x",0);
// const maxRotX=op.inValue("max rot x",0);

const initialRadius = op.inValue("initial radius", 0);
const initialAxis = op.inValueSlider("initial axis y");
const initialX = op.inValueSlider("initial axis x");

const mul = op.inValueFloat("mul");
const smoothness = op.inValueSlider("Smoothness", 1.0);
const speedX = op.inValue("Speed X", 1);
const speedY = op.inValue("Speed Y", 1);

const active = op.inValueBool("Active", true);

const allowPanning = op.inValueBool("Allow Panning", true);
const allowZooming = op.inValueBool("Allow Zooming", true);
const allowRotation = op.inValueBool("Allow Rotation", true);
const restricted = op.inValueBool("restricted", true);
const pointerLock = op.inValueBool("Pointerlock", false);

const trigger = op.outTrigger("trigger");
const outRadius = op.outValue("radius");
const outXDeg = op.outValue("Rot X");
const outYDeg = op.outValue("Rot Y");

const inReset = op.inTriggerButton("Reset");

op.setPortGroup("Initial Values", [initialAxis, initialX, initialRadius]);
op.setPortGroup("Interaction", [mul, smoothness, speedX, speedY]);
op.setPortGroup("Boundaries", [minRotY, maxRotY, minDist, maxDist]);

mul.set(1);
minDist.set(0.05);
maxDist.set(99999);

inReset.onTriggered = reset;

const cgl = op.patch.cgl;
let eye = vec3.create();
const vUp = vec3.create();
const vCenter = vec3.create();
const viewMatrix = mat4.create();
const tempViewMatrix = mat4.create();
const vOffset = vec3.create();
const finalEyeAbs = vec3.create();

initialAxis.set(0.5);

let mouseDown = false;
let radius = 5;
outRadius.set(radius);

let lastMouseX = 0, lastMouseY = 0;
let percX = 0, percY = 0;

vec3.set(vCenter, 0, 0, 0);
vec3.set(vUp, 0, 1, 0);

const tempEye = vec3.create();
const finalEye = vec3.create();
const tempCenter = vec3.create();
const finalCenter = vec3.create();

let px = 0;
let py = 0;

let divisor = 1;
let element = null;
updateSmoothness();

op.onDelete = unbind;

let doLockPointer = false;

pointerLock.onChange = function ()
{
    doLockPointer = pointerLock.get();
    op.log("doLockPointer", doLockPointer);
};

const halfCircle = Math.PI;
const fullCircle = Math.PI * 2;

function reset()
{
    let off = 0;

    if (px % fullCircle < -halfCircle)
    {
        off = -fullCircle;
        px %= -fullCircle;
    }
    else
    if (px % fullCircle > halfCircle)
    {
        off = fullCircle;
        px %= fullCircle;
    }
    else px %= fullCircle;

    py %= (Math.PI);

    vec3.set(vOffset, 0, 0, 0);
    vec3.set(vCenter, 0, 0, 0);
    vec3.set(vUp, 0, 1, 0);

    percX = (initialX.get() * Math.PI * 2 + off);
    percY = (initialAxis.get() - 0.5);

    radius = initialRadius.get();
    eye = circlePos(percY);
}

function updateSmoothness()
{
    divisor = smoothness.get() * 10 + 1.0;
}

smoothness.onChange = updateSmoothness;

let initializing = true;

function ip(val, goal)
{
    if (initializing) return goal;
    return val + (goal - val) / divisor;
}

let lastPy = 0;
const lastPx = 0;

render.onTriggered = function ()
{
    // if (cgl.frameStore.shadowPass) return trigger.trigger();

    cgl.pushViewMatrix();

    px = ip(px, percX);
    py = ip(py, percY);

    let degY = (py + 0.5) * 180;

    if (minRotY.get() !== 0 && degY < minRotY.get())
    {
        degY = minRotY.get();
        py = lastPy;
    }
    else if (maxRotY.get() !== 0 && degY > maxRotY.get())
    {
        degY = maxRotY.get();
        py = lastPy;
    }
    else
    {
        lastPy = py;
    }

    const degX = (px) * CGL.RAD2DEG;

    outYDeg.set(degY);
    outXDeg.set(degX);

    circlePosi(eye, py);

    vec3.add(tempEye, eye, vOffset);
    vec3.add(tempCenter, vCenter, vOffset);

    finalEye[0] = ip(finalEye[0], tempEye[0]);
    finalEye[1] = ip(finalEye[1], tempEye[1]);
    finalEye[2] = ip(finalEye[2], tempEye[2]);

    finalCenter[0] = ip(finalCenter[0], tempCenter[0]);
    finalCenter[1] = ip(finalCenter[1], tempCenter[1]);
    finalCenter[2] = ip(finalCenter[2], tempCenter[2]);

    const empty = vec3.create();
    // var fpm=mat4.create();

    // mat4.translate(fpm, fpm, finalEye);
    // mat4.rotate(fpm, fpm, px, vUp);
    // mat4.multiply(fpm,fpm, cgl.vMatrix);
    // vec3.transformMat4(finalEyeAbs, empty, fpm);

    // outPosX.set(finalEyeAbs[0]);
    // outPosY.set(finalEyeAbs[1]);
    // outPosZ.set(finalEyeAbs[2]);

    mat4.lookAt(viewMatrix, finalEye, finalCenter, vUp);
    mat4.rotate(viewMatrix, viewMatrix, px, vUp);

    // finaly multiply current scene viewmatrix
    mat4.multiply(cgl.vMatrix, cgl.vMatrix, viewMatrix);

    // vec3.transformMat4(finalEyeAbs, empty, cgl.vMatrix);

    // outPosX.set(finalEyeAbs[0]);
    // outPosY.set(finalEyeAbs[1]);
    // outPosZ.set(finalEyeAbs[2]);

    // var fpm=mat4.create();
    // mat4.identity(fpm);
    // mat4.translate(fpm,fpm,finalEye);
    // mat4.rotate(fpm, fpm, px, vUp);
    // mat4.multiply(fpm,fpm,cgl.vMatrix);

    // // vec3.copy(finalEyeAbs,finalEye);
    // // vec3.set(finalEyeAbs,0,1,0);
    // // mat4.rotate(viewMatrix, viewMatrix, px, vUp);
    // // vec3.transformMat4( finalEyeAbs, finalEye, fpm );

    // // vec3.transformMat4( finalEyeAbs, finalEyeAbs, cgl.vMatrix );
    // // mat4.getTranslation(finalEyeAbs,fpm);
    // var pos=vec3.create();
    // vec3.transformMat4(finalEyeAbs, empty, fpm);

    // outPosX.set(finalEyeAbs[0]);
    // outPosY.set(finalEyeAbs[1]);
    // outPosZ.set(finalEyeAbs[2]);

    trigger.trigger();
    cgl.popViewMatrix();
    initializing = false;
};

function circlePosi(vec, perc)
{
    const mmul = mul.get();
    if (radius < minDist.get() * mmul) radius = minDist.get() * mmul;
    if (radius > maxDist.get() * mmul) radius = maxDist.get() * mmul;

    outRadius.set(radius * mmul);

    let i = 0, degInRad = 0;
    // var vec=vec3.create();
    degInRad = 360 * perc / 2 * CGL.DEG2RAD;
    vec3.set(vec,
        Math.cos(degInRad) * radius * mmul,
        Math.sin(degInRad) * radius * mmul,
        0);
    return vec;
}

function circlePos(perc)
{
    const mmul = mul.get();
    if (radius < minDist.get() * mmul)radius = minDist.get() * mmul;
    if (radius > maxDist.get() * mmul)radius = maxDist.get() * mmul;

    outRadius.set(radius * mmul);

    let i = 0, degInRad = 0;
    const vec = vec3.create();
    degInRad = 360 * perc / 2 * CGL.DEG2RAD;
    vec3.set(vec,
        Math.cos(degInRad) * radius * mmul,
        Math.sin(degInRad) * radius * mmul,
        0);
    return vec;
}

function onmousemove(event)
{
    if (!mouseDown) return;

    const x = event.clientX;
    const y = event.clientY;

    let movementX = (x - lastMouseX);
    let movementY = (y - lastMouseY);

    if (doLockPointer)
    {
        movementX = event.movementX * mul.get();
        movementY = event.movementY * mul.get();
    }

    movementX *= speedX.get();
    movementY *= speedY.get();

    if (event.buttons == 2 && allowPanning.get())
    {
        vOffset[2] += movementX * 0.01 * mul.get();
        vOffset[1] += movementY * 0.01 * mul.get();
    }
    else
    if (event.buttons == 4 && allowZooming.get())
    {
        radius += movementY * 0.05;
        eye = circlePos(percY);
    }
    else
    {
        if (allowRotation.get())
        {
            percX += movementX * 0.003;
            percY += movementY * 0.002;

            if (restricted.get())
            {
                if (percY > 0.5)percY = 0.5;
                if (percY < -0.5)percY = -0.5;
            }
        }
    }

    lastMouseX = x;
    lastMouseY = y;
}

function onMouseDown(event)
{
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    mouseDown = true;

    try { element.setPointerCapture(event.pointerId); }
    catch (e) {}

    if (doLockPointer)
    {
        const el = op.patch.cgl.canvas;
        el.requestPointerLock = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
        if (el.requestPointerLock) el.requestPointerLock();
        else op.warn("no requestPointerLock found");
        // document.addEventListener("mousemove", onmousemove, false);

        document.addEventListener("pointerlockchange", lockChange, false);
        document.addEventListener("mozpointerlockchange", lockChange, false);
        document.addEventListener("webkitpointerlockchange", lockChange, false);
    }
}

function onMouseUp(e)
{
    mouseDown = false;
    // cgl.canvas.style.cursor='url(/ui/img/rotate.png),pointer';

    try { element.releasePointerCapture(e.pointerId); }
    catch (e) {}

    if (doLockPointer)
    {
        document.removeEventListener("pointerlockchange", lockChange, false);
        document.removeEventListener("mozpointerlockchange", lockChange, false);
        document.removeEventListener("webkitpointerlockchange", lockChange, false);

        if (document.exitPointerLock) document.exitPointerLock();
        document.removeEventListener("mousemove", pointerLock, false);
    }
}

function lockChange()
{
    const el = op.patch.cgl.canvas;

    if (document.pointerLockElement === el || document.mozPointerLockElement === el || document.webkitPointerLockElement === el)
    {
        document.addEventListener("mousemove", onmousemove, false);
    }
}

function onMouseEnter(e)
{
    // cgl.canvas.style.cursor='url(/ui/img/rotate.png),pointer';
}

initialRadius.onChange = function ()
{
    radius = initialRadius.get();
    reset();
};

initialX.onChange = function ()
{
    px = percX = (initialX.get() * Math.PI * 2);
};

initialAxis.onChange = function ()
{
    py = percY = (initialAxis.get() - 0.5);
    eye = circlePos(percY);
};

const onMouseWheel = function (event)
{
    if (allowZooming.get())
    {
        const delta = CGL.getWheelSpeed(event) * 0.06;
        radius += (parseFloat(delta)) * 1.2;

        eye = circlePos(percY);
    }
};

const ontouchstart = function (event)
{
    doLockPointer = false;
    if (event.touches && event.touches.length > 0) onMouseDown(event.touches[0]);
};

const ontouchend = function (event)
{
    doLockPointer = false;
    onMouseUp();
};

const ontouchmove = function (event)
{
    doLockPointer = false;
    if (event.touches && event.touches.length > 0) onmousemove(event.touches[0]);
};

active.onChange = function ()
{
    if (active.get())bind();
    else unbind();
};

function setElement(ele)
{
    unbind();
    element = ele;
    bind();
}

function bind()
{
    element.addEventListener("pointermove", onmousemove);
    element.addEventListener("pointerdown", onMouseDown);
    element.addEventListener("pointerup", onMouseUp);
    element.addEventListener("pointerleave", onMouseUp);
    element.addEventListener("pointerenter", onMouseEnter);
    element.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    element.addEventListener("wheel", onMouseWheel, { "passive": true });

    // element.addEventListener("touchmove", ontouchmove, { "passive": true });
    // element.addEventListener("touchstart", ontouchstart, { "passive": true });
    // element.addEventListener("touchend", ontouchend, { "passive": true });
}

function unbind()
{
    if (!element) return;

    element.removeEventListener("pointermove", onmousemove);
    element.removeEventListener("pointerdown", onMouseDown);
    element.removeEventListener("pointerup", onMouseUp);
    element.removeEventListener("pointerleave", onMouseUp);
    element.removeEventListener("pointerenter", onMouseUp);
    element.removeEventListener("wheel", onMouseWheel);

    // element.removeEventListener("touchmove", ontouchmove);
    // element.removeEventListener("touchstart", ontouchstart);
    // element.removeEventListener("touchend", ontouchend);
}

eye = circlePos(0);
setElement(cgl.canvas);

bind();

initialX.set(0.25);
initialRadius.set(0.05);


};

Ops.Gl.Matrix.OrbitControls.prototype = new CABLES.Op();
CABLES.OPS["eaf4f7ce-08a3-4d1b-b9f4-ebc0b7b1cde1"]={f:Ops.Gl.Matrix.OrbitControls,objName:"Ops.Gl.Matrix.OrbitControls"};




// **************************************************************
// 
// Ops.Physics.PhysicsBodiesArray
// 
// **************************************************************

Ops.Physics.PhysicsBodiesArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exec = op.inTrigger("Exec"),
    inPositions = op.inArray("Positions"),
    inName = op.inString("Name", ""),
    inMass = op.inValue("Mass", 0),
    sizeX = op.inValue("sizeX", 1),
    sizeY = op.inValue("sizeY", 1),
    sizeZ = op.inValue("sizeZ", 1),
    inReset = op.inTriggerButton("Reset"),
    next = op.outTrigger("Next"),
    resultArrPos = op.outArray("Simulated Positions"),
    outNames = op.outArray("Names"),
    outNum = op.outNumber("Total Bodies");

const cgl = op.patch.cgl;
const wire = new CGL.WirePoint(cgl, 1);
const vec = vec3.create();
const q = quat.create();
const empty = vec3.create();
const trMat = mat4.create();
const scale = vec3.create();

let lastWorld = null;

let needSetup = true;
const bodies = [];
const body = null;
let skipSimulation = false;

exec.onTriggered = render;

// op.toWorkNeedsParent("Ops.Physics.World");

inPositions.onChange =
    function ()
    {
        const pos = inPositions.get();
        // if (!pos)
        // {
        //     removeBodies(lastWorld);
        // }
        if (!pos || pos.length / 3 != bodies.length)
        {
            needSetup = true;
            removeBodies(lastWorld);
            skipSimulation = true;
            return;
        }
        setBodyPositions();
    };

inReset.onTriggered = () =>
{
    const staticPos = inMass.get() == 0;
    if (staticPos)
    {
        setBodyPositions();
    }
    skipSimulation = true;
};

inMass.onChange = sizeX.onChange = sizeY.onChange = sizeZ.onChange = inName.onChange =
    function ()
    {
        needSetup = true;
    };

exec.onLinkChanged = op.onDelete =
    function ()
    {
        removeBodies(lastWorld);
        lastWorld = null;
    };

function removeBodies(world)
{
    for (let i = 0; i < bodies.length; i++)
    {
        world = world || cgl.frameStore.world;
        if (bodies[i] && world)lastWorld.removeBody(bodies[i]);
    }

    resultsPositions.length = 0;
    resultArrPos.set(null);
    resultArrPos.set(resultsPositions);

    bodies.length = 0;
}

function setup(modelScale)
{
    modelScale = modelScale || 1;
    const world = cgl.frameStore.world;
    if (!world) return;

    const names = [];

    const pos = inPositions.get();
    if (!pos || pos.length < 3) return;

    removeBodies();

    for (let i = 0; i < pos.length; i += 3)
    {
        // shape = new CANNON.Sphere(Math.max(0, inRadius.get() * modelScale));
        const shape = new CANNON.Box(new CANNON.Vec3(sizeX.get() * 0.5, sizeY.get() * 0.5, sizeZ.get() * 0.5));
        const body = new CANNON.Body({
            "mass": inMass.get(), // kg
            "shape": shape
        });

        body.name = inName.get() + "." + (i / 3);
        names.push(body.name);

        bodies.push(body);
        world.addBody(body);
    }

    outNames.set(names);
    lastWorld = world;
    setBodyPositions();
    needSetup = false;
    skipSimulation = true;
}

function getScaling(mat)
{
    const m31 = mat[8];
    const m32 = mat[9];
    const m33 = mat[10];
    return Math.hypot(m31, m32, m33);
}

const resultsPositions = [];

function setSimulatedPositions(pos)
{
    for (let i = 0; i < pos.length; i += 3)
    {
        const body = bodies[i / 3];

        if (!body) continue;

        vec3.set(vec,
            body.position.x,
            body.position.y,
            body.position.z
        );

        resultsPositions[i + 0] = vec[0];
        resultsPositions[i + 1] = vec[1];
        resultsPositions[i + 2] = vec[2];

        // quat.set(q,
        //     body.quaternion.x,
        //     body.quaternion.y,
        //     body.quaternion.z,
        //     body.quaternion.w);
        // quat.invert(q, q);

        // cgl.pushModelMatrix();
    }
}

function setBodyPositions(pos)
{
    if (!pos)pos = inPositions.get();

    const vpos = vec3.create();

    for (let i = 0; i < pos.length; i += 3)
    {
        const body = bodies[i / 3];

        if (!body) continue;

        // vec3.transformMat4(vec, empty, cgl.mMatrix);
        // resultsPositions[i + 0] = body.position.x = vec[0] + pos[i + 0];
        // resultsPositions[i + 1] = body.position.y = vec[1] + pos[i + 1];
        // resultsPositions[i + 2] = body.position.z = vec[2] + pos[i + 2];

        vpos[0] = pos[i + 0];
        vpos[1] = pos[i + 1];
        vpos[2] = pos[i + 2];
        vec3.transformMat4(vpos, vpos, cgl.mMatrix);
        resultsPositions[i + 0] = body.position.x = vpos[0];
        resultsPositions[i + 1] = body.position.y = vpos[1];
        resultsPositions[i + 2] = body.position.z = vpos[2];
    }
}
function updatePositions()
{
    const staticPos = inMass.get() == 0;
    const modelScale = getScaling(cgl.mMatrix);

    const pos = inPositions.get();
    if (!pos || pos.length < 3) return false;

    resultsPositions.length = pos.length;

    if (staticPos)
    {
        setBodyPositions(pos);
    }
    else
    {
        setSimulatedPositions(pos);
    }

    return true;
}

function render()
{
    if (needSetup) setup();
    if (lastWorld != cgl.frameStore.world) setup();

    outNum.set(bodies.length);

    if (inMass.get() == 0.0)
    {
        for (let i = 0; i < bodies.length; i++)
        {
            bodies[i].mass = 0;
            bodies[i].velocity.set(0, 0, 0);
            bodies[i].angularVelocity.set(0, 0, 0);
            bodies[i].updateMassProperties();
        }
    }

    if (!skipSimulation || inMass.get() === 0) updatePositions();

    skipSimulation = false;

    resultArrPos.set(null);
    resultArrPos.set(resultsPositions);

    next.trigger();
}


};

Ops.Physics.PhysicsBodiesArray.prototype = new CABLES.Op();
CABLES.OPS["bd2218d1-b9ac-476b-bc6b-05d675385fcf"]={f:Ops.Physics.PhysicsBodiesArray,objName:"Ops.Physics.PhysicsBodiesArray"};




// **************************************************************
// 
// Ops.Physics.CastRay
// 
// **************************************************************

Ops.Physics.CastRay = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exec = op.inTrigger("Exec"),

    inX = op.inValueFloat("Screen X"),
    inY = op.inValueFloat("Screen Y"),
    inZ = op.inValueFloat("Screen Z"),

    inCursor = op.inBool("Change Cursor", true),

    next = op.outTrigger("Next"),

    hasHit = op.outValue("Has Hit"),
    hitX = op.outValue("Hit X"),
    hitY = op.outValue("Hit Y"),
    hitZ = op.outValue("Hit Z"),
    hitNormalX = op.outValue("Hit Normal X"),
    hitNormalY = op.outValue("Hit Normal Y"),
    hitNormalZ = op.outValue("Hit Normal Z"),
    hitResult = op.outObject("Result"),

    aabbX = op.outValue("aabb x"),
    aabbY = op.outValue("aabb y"),
    aabbZ = op.outValue("aabb z"),

    aabbX2 = op.outValue("aabb x2"),
    aabbY2 = op.outValue("aabb y2"),
    aabbZ2 = op.outValue("aabb z2"),

    toX = op.outValue("to x"),
    toY = op.outValue("to y"),
    toZ = op.outValue("to z"),

    fromX = op.outValue("from x"),
    fromY = op.outValue("from y"),
    fromZ = op.outValue("from z"),

    bodyX = op.outValue("Body x"),
    bodyY = op.outValue("Body y"),
    bodyZ = op.outValue("Body z"),

    outName = op.outString("Name"),

    cgl = op.patch.cgl;
exec.onTriggered = render;

const results = [];
let rayResult = new CANNON.RaycastResult();
let didsetCursor = false;
const mat = mat4.create();

// let ray = new CANNON.Ray(
//     new CANNON.Vec3(0, 0, 0),
//     new CANNON.Vec3(0, 0, 0)
// );

function setRay(world)
{
    mat4.identity(mat);
    // var x = 2.0 * (inX.get() / cgl.canvas.clientWidth) -1;
    // var y = - 2.0 * (inY.get() / cgl.canvas.clientHeight) +1;
    const x = inX.get();
    const y = inY.get();

    const origin = vec3.fromValues(x, y, -1);
    mat4.mul(mat, cgl.pMatrix, cgl.vMatrix);
    mat4.invert(mat, mat);

    vec3.transformMat4(origin, origin, mat);

    // -----------

    const to = vec3.fromValues(x, y, 1);
    mat4.mul(mat, cgl.pMatrix, cgl.vMatrix);
    mat4.invert(mat, mat);

    vec3.transformMat4(to, to, mat);

    // -----------

    // let vx = origin[0] - to[0];
    // let vy = origin[1] - to[1];
    // let vz = origin[2] - to[2];

    // const v3 = vec3.create();
    // vec3.set(v3, vx, vy, vz);
    // vec3.normalize(v3, v3);
    // vx = v3[0];
    // vy = v3[1];
    // vz = v3[2];

    // const huge = 99999;

    // origin[0] = to[0] + vx;
    // origin[1] = to[1] + vy;
    // origin[2] = to[2] + vz;

    // to[0] -= vx * huge;
    // to[1] -= vy * huge;
    // to[2] -= vz * huge;

    // ray = new CANNON.Ray(
    //     new CANNON.Vec3(to[0], to[1], to[2]),
    //     new CANNON.Vec3(origin[0], origin[1], origin[2])
    // );

    fromX.set(origin[0]);
    fromY.set(origin[1]);
    fromZ.set(origin[2]);

    toX.set(to[0]);
    toY.set(to[1]);
    toZ.set(to[2]);

    results.length = 0;

    // rayResult = new CANNON.RaycastResult();
    world.raycastClosest(
        new CANNON.Vec3(origin[0], origin[1], origin[2]),
        new CANNON.Vec3(to[0], to[1], to[2]),
        { "checkCollisionResponse": false },
        rayResult);

    // world.raycastAll(
    //     new CANNON.Vec3(origin[0], origin[1], origin[2]),
    //     new CANNON.Vec3(to[0], to[1], to[2]),
    //     { "skipBackfaces": false },
    //     function (r)
    //     {
    //         // todo sort all results by distance to find closest ?
    //         // check if visible on screen or behind cam...
    //         const pos = vec3.create();
    //         vec3.set(pos, r.hitPointWorld.x, r.hitPointWorld.y, r.hitPointWorld.z);
    //         vec3.transformMat4(pos, pos, cgl.vMatrix);

    //         const screenTrans = vec3.create();
    //         vec3.transformMat4(screenTrans, pos, cgl.pMatrix);

    //         const vp = cgl.getViewPort();

    //         const xp = (screenTrans[0] * vp[2] / 2) + vp[2] / 2;
    //         const yp = (screenTrans[1] * vp[3] / 2) + vp[3] / 2;

    //         const visi = screenTrans[2] < 1 && xp > 0 && xp < vp[2] && yp > 0 && yp < vp[3];

    //         if (visi)rayResult = r;
    //     });
}

function render()
{
    next.trigger();

    const world = cgl.frameStore.world;
    if (!world) return;

    let hitBody = null;

    setRay(world);

    // const r = ray.intersectWorld(world, {});

    if (rayResult)
    {
        hasHit.set(rayResult.hasHit);

        if (rayResult.hasHit && inCursor.get())
        {
            op.patch.cgl.setCursor("pointer");
            didsetCursor = true;
        }
        else if (didsetCursor)
        {
            op.patch.cgl.setCursor("auto");
            didsetCursor = false;
        }

        if (rayResult.body)
        {
            aabbX.set(rayResult.body.aabb.lowerBound.x);
            aabbX.set(rayResult.body.aabb.lowerBound.y);
            aabbX.set(rayResult.body.aabb.lowerBound.z);

            aabbX2.set(rayResult.body.aabb.upperBound.x);
            aabbX2.set(rayResult.body.aabb.upperBound.y);
            aabbX2.set(rayResult.body.aabb.upperBound.z);

            outName.set(rayResult.body.name || "");

            // rayResult.body.dispatchEvent({type:"raycasthit"});
            hitBody = rayResult.body;
            hitBody.raycastHit = true;

            bodyX.set(hitBody.position.x);
            bodyY.set(hitBody.position.y);
            bodyZ.set(hitBody.position.z);
        }
        else outName.set(null);

        hitX.set(rayResult.hitPointWorld.x);
        hitY.set(rayResult.hitPointWorld.y);
        hitZ.set(rayResult.hitPointWorld.z);

        hitNormalX.set(rayResult.hitNormalWorld.x);
        hitNormalY.set(rayResult.hitNormalWorld.y);
        hitNormalZ.set(rayResult.hitNormalWorld.z);
    }
    else
    {
        hasHit.set(false);
        outName.set(null);
    }
    hitResult.set(rayResult);

    for (let i = 0; i < world.bodies.length; i++)
        if (world.bodies[i] != hitBody)world.bodies[i].raycastHit = false;
}


};

Ops.Physics.CastRay.prototype = new CABLES.Op();
CABLES.OPS["88fc51f5-1550-4f00-abd3-6cae8f6f5a57"]={f:Ops.Physics.CastRay,objName:"Ops.Physics.CastRay"};




// **************************************************************
// 
// Ops.Devices.Mouse.Mouse_v2
// 
// **************************************************************

Ops.Devices.Mouse.Mouse_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    active = op.inValueBool("Active", true),
    relative = op.inValueBool("relative"),
    normalize = op.inValueBool("normalize"),
    flipY = op.inValueBool("flip y", true),
    area = op.inValueSelect("Area", ["Canvas", "Document", "Parent Element"], "Canvas"),
    rightClickPrevDef = op.inBool("right click prevent default", true),
    touchscreen = op.inValueBool("Touch support", true),
    smooth = op.inValueBool("smooth"),
    smoothSpeed = op.inValueFloat("smoothSpeed", 20),
    multiply = op.inValueFloat("multiply", 1),
    outMouseX = op.outValue("x", 0),
    outMouseY = op.outValue("y", 0),
    mouseDown = op.outValueBool("button down"),
    mouseClick = op.outTrigger("click"),
    mouseUp = op.outTrigger("Button Up"),
    mouseClickRight = op.outTrigger("click right"),
    mouseOver = op.outValueBool("mouseOver"),
    outButton = op.outValue("button");

op.setPortGroup("Behavior", [relative, normalize, flipY, area, rightClickPrevDef, touchscreen]);
op.setPortGroup("Smoothing", [smooth, smoothSpeed, multiply]);

let smoothTimer = 0;
const cgl = op.patch.cgl;
let listenerElement = null;

function setValue(x, y)
{
    if (normalize.get())
    {
        let w = cgl.canvas.width / cgl.pixelDensity;
        let h = cgl.canvas.height / cgl.pixelDensity;
        if (listenerElement == document.body)
        {
            w = listenerElement.clientWidth / cgl.pixelDensity;
            h = listenerElement.clientHeight / cgl.pixelDensity;
        }
        outMouseX.set(((x || 0) / w * 2.0 - 1.0) * multiply.get());
        outMouseY.set(((y || 0) / h * 2.0 - 1.0) * multiply.get());
    }
    else
    {
        outMouseX.set((x || 0) * multiply.get());
        outMouseY.set((y || 0) * multiply.get());
    }
}

smooth.onChange = function ()
{
    if (smooth.get()) smoothTimer = setInterval(updateSmooth, 5);
    else if (smoothTimer)clearTimeout(smoothTimer);
};

let smoothX, smoothY;
let lineX = 0, lineY = 0;

normalize.onChange = function ()
{
    mouseX = 0;
    mouseY = 0;
    setValue(mouseX, mouseY);
};

var mouseX = cgl.canvas.width / 2;
var mouseY = cgl.canvas.height / 2;

lineX = mouseX;
lineY = mouseY;

outMouseX.set(mouseX);
outMouseY.set(mouseY);

let relLastX = 0;
let relLastY = 0;
let offsetX = 0;
let offsetY = 0;
addListeners();

area.onChange = addListeners;

let speed = 0;

function updateSmooth()
{
    speed = smoothSpeed.get();
    if (speed <= 0)speed = 0.01;
    const distanceX = Math.abs(mouseX - lineX);
    const speedX = Math.round(distanceX / speed, 0);
    lineX = (lineX < mouseX) ? lineX + speedX : lineX - speedX;

    const distanceY = Math.abs(mouseY - lineY);
    const speedY = Math.round(distanceY / speed, 0);
    lineY = (lineY < mouseY) ? lineY + speedY : lineY - speedY;

    setValue(lineX, lineY);
}

function onMouseEnter(e)
{
    mouseDown.set(false);
    mouseOver.set(true);
    speed = smoothSpeed.get();
}

function onMouseDown(e)
{
    outButton.set(e.which);
    mouseDown.set(true);
}

function onMouseUp(e)
{
    outButton.set(0);
    mouseDown.set(false);
    mouseUp.trigger();
}

function onClickRight(e)
{
    mouseClickRight.trigger();
    if (rightClickPrevDef.get()) e.preventDefault();
}

function onmouseclick(e)
{
    mouseClick.trigger();
}

function onMouseLeave(e)
{
    relLastX = 0;
    relLastY = 0;

    speed = 100;

    // disabled for now as it makes no sense that the mouse bounces back to the center
    // if(area.get()!='Document')
    // {
    //     // leave anim
    //     if(smooth.get())
    //     {
    //         mouseX=cgl.canvas.width/2;
    //         mouseY=cgl.canvas.height/2;
    //     }

    // }
    mouseOver.set(false);
    mouseDown.set(false);
}

relative.onChange = function ()
{
    offsetX = 0;
    offsetY = 0;
};

function setCoords(e)
{
    if (!relative.get())
    {
        if (area.get() != "Document")
        {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        }
        else
        {
            offsetX = e.clientX;
            offsetY = e.clientY;
        }

        if (smooth.get())
        {
            mouseX = offsetX;

            if (flipY.get()) mouseY = listenerElement.clientHeight - offsetY;
            else mouseY = offsetY;
        }
        else
        {
            if (flipY.get()) setValue(offsetX, listenerElement.clientHeight - offsetY);
            else setValue(offsetX, offsetY);
        }
    }
    else
    {
        if (relLastX != 0 && relLastY != 0)
        {
            offsetX = e.offsetX - relLastX;
            offsetY = e.offsetY - relLastY;
        }
        else
        {

        }

        relLastX = e.offsetX;
        relLastY = e.offsetY;

        mouseX += offsetX;
        mouseY += offsetY;

        if (mouseY > 460)mouseY = 460;
    }
}

function onmousemove(e)
{
    mouseOver.set(true);
    setCoords(e);
}

function ontouchmove(e)
{
    if (event.touches && event.touches.length > 0) setCoords(e.touches[0]);
}

function ontouchstart(event)
{
    mouseDown.set(true);

    if (event.touches && event.touches.length > 0) onMouseDown(event.touches[0]);
}

function ontouchend(event)
{
    mouseDown.set(false);
    onMouseUp();
}

touchscreen.onChange = function ()
{
    removeListeners();
    addListeners();
};

function removeListeners()
{
    if (!listenerElement) return;
    listenerElement.removeEventListener("touchend", ontouchend);
    listenerElement.removeEventListener("touchstart", ontouchstart);
    listenerElement.removeEventListener("touchmove", ontouchmove);

    listenerElement.removeEventListener("click", onmouseclick);
    listenerElement.removeEventListener("mousemove", onmousemove);
    listenerElement.removeEventListener("mouseleave", onMouseLeave);
    listenerElement.removeEventListener("mousedown", onMouseDown);
    listenerElement.removeEventListener("mouseup", onMouseUp);
    listenerElement.removeEventListener("mouseenter", onMouseEnter);
    listenerElement.removeEventListener("contextmenu", onClickRight);
    listenerElement = null;
}

function addListeners()
{
    if (listenerElement || !active.get())removeListeners();
    if (!active.get()) return;

    listenerElement = cgl.canvas;
    if (area.get() == "Document") listenerElement = document.body;
    if (area.get() == "Parent Element") listenerElement = cgl.canvas.parentElement;

    if (touchscreen.get())
    {
        listenerElement.addEventListener("touchend", ontouchend);
        listenerElement.addEventListener("touchstart", ontouchstart);
        listenerElement.addEventListener("touchmove", ontouchmove);
    }

    listenerElement.addEventListener("mousemove", onmousemove);
    listenerElement.addEventListener("mouseleave", onMouseLeave);
    listenerElement.addEventListener("mousedown", onMouseDown);
    listenerElement.addEventListener("mouseup", onMouseUp);
    listenerElement.addEventListener("mouseenter", onMouseEnter);
    listenerElement.addEventListener("contextmenu", onClickRight);
    listenerElement.addEventListener("click", onmouseclick);
}

active.onChange = function ()
{
    if (listenerElement)removeListeners();
    if (active.get())addListeners();
};

op.onDelete = function ()
{
    removeListeners();
};

addListeners();


};

Ops.Devices.Mouse.Mouse_v2.prototype = new CABLES.Op();
CABLES.OPS["9fa3fc46-3147-4e3a-8ee8-a93ea9e8786e"]={f:Ops.Devices.Mouse.Mouse_v2,objName:"Ops.Devices.Mouse.Mouse_v2"};




// **************************************************************
// 
// Ops.Gl.Shader.PointMaterial_v3
// 
// **************************************************************

Ops.Gl.Shader.PointMaterial_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={pointmat_frag:"\n{{MODULES_HEAD}}\n\nUNI vec4 color;\nIN vec2 texCoord;\nIN vec2 pointCoord;\nIN float ps;\n\n#ifdef HAS_TEXTURE_DIFFUSE\n    UNI sampler2D diffTex;\n#endif\n#ifdef HAS_TEXTURE_MASK\n    UNI sampler2D texMask;\n#endif\n#ifdef HAS_TEXTURE_COLORIZE\n    IN vec4 colorize;\n#endif\n#ifdef HAS_TEXTURE_OPACITY\n    IN float opacity;\n#endif\n#ifdef VERTEX_COLORS\n    IN vec3 vertexColor;\n#endif\n\nvoid main()\n{\n    #ifdef FLIP_TEX\n        vec2 pointCoord=vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y));\n    #endif\n    #ifndef FLIP_TEX\n        vec2 pointCoord=gl_PointCoord;\n    #endif\n    {{MODULE_BEGIN_FRAG}}\n\n    if(ps<1.0)discard;\n\n    vec4 col=color;\n\n    #ifdef HAS_TEXTURES\n\n        #ifdef HAS_TEXTURE_MASK\n            float mask;\n            #ifdef TEXTURE_MASK_R\n                mask=texture(texMask,pointCoord).r;\n            #endif\n            #ifdef TEXTURE_MASK_A\n                mask=texture(texMask,pointCoord).a;\n            #endif\n            #ifdef TEXTURE_MASK_LUMI\n            \tvec3 lumcoeff = vec3(0.299,0.587,0.114);\n            \tmask = dot(texture(texMask,pointCoord).rgb, lumcoeff);\n            #endif\n\n        #endif\n\n        #ifdef HAS_TEXTURE_DIFFUSE\n            col=texture(diffTex,pointCoord);\n            #ifdef COLORIZE_TEXTURE\n              col.rgb*=color.rgb;\n            #endif\n        #endif\n        col.a*=color.a;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    #ifdef MAKE_ROUND\n\n        #ifndef MAKE_ROUNDAA\n            if ((gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5) > 0.25) discard; //col.a=0.0;\n        #endif\n\n        #ifdef MAKE_ROUNDAA\n            float circ=(gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5);\n\n            float a=smoothstep(0.25,0.25-fwidth(gl_PointCoord.x),circ);\n            if(a==0.0)discard;\n            col.a=a;\n            // col.r=0.0;\n        #endif\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col.rgb*=vertexColor;\n    #endif\n\n    #ifdef HAS_TEXTURE_COLORIZE\n        col*=colorize;\n    #endif\n\n    #ifdef TEXTURE_COLORIZE_MUL\n        col*=color;\n    #endif\n\n    #ifdef HAS_TEXTURE_MASK\n        col.a*=mask;\n    #endif\n\n    #ifdef HAS_TEXTURE_OPACITY\n        col.a*=opacity;\n    #endif\n\n\n    if(col.a<=0.0)discard;\n\n    outColor = col;\n}\n",pointmat_vert:"{{MODULES_HEAD}}\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\nIN vec3 attrTangent;\nIN vec3 attrBiTangent;\n\n#ifdef VERTEX_COLORS\n    IN vec3 attrVertColor;\n    OUT vec3 vertexColor;\n#endif\n\nOUT vec3 norm;\nOUT float ps;\n#ifdef HAS_TEXTURES\n    OUT vec2 texCoord;\n#endif\n\n#ifdef HAS_TEXTURE_COLORIZE\n   UNI sampler2D texColorize;\n   OUT vec4 colorize;\n#endif\n#ifdef HAS_TEXTURE_OPACITY\n    UNI sampler2D texOpacity;\n    OUT float opacity;\n#endif\n\n#ifdef HAS_TEXTURE_POINTSIZE\n   UNI sampler2D texPointSize;\n   UNI float texPointSizeMul;\n#endif\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nUNI float pointSize;\nUNI vec3 camPos;\n\nUNI float canvasWidth;\nUNI float canvasHeight;\nUNI float camDistMul;\nUNI float randomSize;\n\nIN float attrVertIndex;\n\n\n\nfloat rand(float n){return fract(sin(n) * 5711.5711123);}\n\n#define POINTMATERIAL\n\nvoid main()\n{\n    norm=attrVertNormal;\n    #ifdef PIXELSIZE\n        float psMul=1.0;\n    #endif\n\n    #ifndef PIXELSIZE\n        float psMul=sqrt(canvasWidth/canvasHeight)+0.00000000001;\n    #endif\n\n    // float sizeMultiply=1.0;\n\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n\n\n    #ifdef VERTEX_COLORS\n        vertexColor=attrVertColor;\n    #endif\n\n    #ifdef HAS_TEXTURES\n        texCoord=attrTexCoord;\n    #endif\n\n    #ifdef HAS_TEXTURE_OPACITY\n        // opacity=texture(texOpacity,vec2(rand(attrVertIndex+texCoord.x*texCoord.y+texCoord.y+texCoord.x),rand(texCoord.y*texCoord.x-texCoord.x-texCoord.y-attrVertIndex))).r;\n        opacity=texture(texOpacity,texCoord).r;\n    #endif\n\n\n    #ifdef HAS_TEXTURE_COLORIZE\n        #ifdef RANDOM_COLORIZE\n            colorize=texture(texColorize,vec2(rand(attrVertIndex+texCoord.x*texCoord.y+texCoord.y+texCoord.x),rand(texCoord.y*texCoord.x-texCoord.x-texCoord.y-attrVertIndex)));\n        #endif\n        #ifndef RANDOM_COLORIZE\n            colorize=texture(texColorize,texCoord);\n        #endif\n    #endif\n\n    mat4 mMatrix=modelMatrix;\n    vec4 pos = vec4( vPosition, 1. );\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 model=mMatrix * pos;\n\n    psMul+=rand(texCoord.x*texCoord.y+texCoord.y*3.0+texCoord.x*2.0+attrVertIndex)*randomSize;\n    // psMul*=sizeMultiply;\n\n    float addPointSize=0.0;\n    #ifdef HAS_TEXTURE_POINTSIZE\n\n        #ifdef POINTSIZE_CHAN_R\n            addPointSize=texture(texPointSize,texCoord).r;\n        #endif\n        #ifdef POINTSIZE_CHAN_G\n            addPointSize=texture(texPointSize,texCoord).g;\n        #endif\n        #ifdef POINTSIZE_CHAN_B\n            addPointSize=texture(texPointSize,texCoord).b;\n        #endif\n\n\n        #ifdef DOTSIZEREMAPABS\n            // addPointSize=(( (texture(texPointSize,texCoord).r) * texPointSizeMul)-0.5)*2.0;\n\n            addPointSize=1.0-(distance(addPointSize,0.5)*2.0);\n            // addPointSize=abs(1.0-(distance(addPointSize,0.5)*2.0));\naddPointSize=addPointSize*addPointSize*addPointSize*2.0;\n\n            // addPointSize=(( (texture(texPointSize,texCoord).r) * texPointSizeMul)-0.5)*2.0;\n        #endif\n\naddPointSize*=texPointSizeMul;\n\n\n    #endif\n\n\n    ps=0.0;\n    #ifndef SCALE_BY_DISTANCE\n        ps = (pointSize+addPointSize) * psMul;\n    #endif\n    #ifdef SCALE_BY_DISTANCE\n        float cameraDist = distance(model.xyz, camPos);\n        ps = ( (pointSize+addPointSize) / cameraDist) * psMul;\n    #endif\n\n    gl_PointSize = ps;\n\n    gl_Position = projMatrix * viewMatrix * model;\n}\n",};
const cgl = op.patch.cgl;

const
    render = op.inTrigger("render"),
    pointSize = op.inValueFloat("PointSize", 3),
    inPixelSize = op.inBool("Size in Pixels", false),
    randomSize = op.inValue("Random Size", 0),
    makeRound = op.inValueBool("Round", true),
    makeRoundAA = op.inValueBool("Round Antialias", false),
    doScale = op.inValueBool("Scale by Distance", false),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("a", 1),
    vertCols = op.inBool("Vertex Colors", false),
    texture = op.inTexture("texture"),
    textureMulColor = op.inBool("Colorize Texture"),
    textureMask = op.inTexture("Texture Mask"),
    texMaskChan = op.inSwitch("Mask Channel", ["R", "A", "Luminance"], "R"),
    textureColorize = op.inTexture("Texture Colorize"),
    colorizeRandom = op.inValueBool("Colorize Randomize", true),
    textureOpacity = op.inTexture("Texture Opacity"),
    texturePointSize = op.inTexture("Texture Point Size"),
    texturePointSizeChannel = op.inSwitch("Point Size Channel", ["R", "G", "B"], "R"),
    texturePointSizeMul = op.inFloat("Texture Point Size Mul", 1),
    texturePointSizeMap = op.inSwitch("Map Size 0", ["Black", "Grey"], "Black"),
    flipTex = op.inValueBool("Flip Texture", false),

    trigger = op.outTrigger("trigger"),
    shaderOut = op.outObject("shader");

op.setPortGroup("Texture", [texture, textureMulColor, textureMask, texMaskChan, textureColorize, textureOpacity, colorizeRandom]);

op.setPortGroup("Color", [r, g, b, a, vertCols]);
op.setPortGroup("Size", [pointSize, randomSize, makeRound, makeRoundAA, doScale, inPixelSize, texturePointSize, texturePointSizeMul, texturePointSizeChannel]);
r.setUiAttribs({ "colorPick": true });

const shader = new CGL.Shader(cgl, "PointMaterial");
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);
shader.define("MAKE_ROUND");

const
    uniPointSize = new CGL.Uniform(shader, "f", "pointSize", pointSize),
    texturePointSizeMulUniform = new CGL.Uniform(shader, "f", "texPointSizeMul", texturePointSizeMul),
    uniRandomSize = new CGL.Uniform(shader, "f", "randomSize", randomSize),
    uniColor = new CGL.Uniform(shader, "4f", "color", r, g, b, a),
    uniWidth = new CGL.Uniform(shader, "f", "canvasWidth", cgl.canvasWidth),
    uniHeight = new CGL.Uniform(shader, "f", "canvasHeight", cgl.canvasHeight),
    textureUniform = new CGL.Uniform(shader, "t", "diffTex", 0),
    textureColorizeUniform = new CGL.Uniform(shader, "t", "texColorize", 0),
    textureOpacityUniform = new CGL.Uniform(shader, "t", "TextureOpacity", 0),

    textureColoPointSize = new CGL.Uniform(shader, "t", "texColorize", 0),
    texturePointSizeUniform = new CGL.Uniform(shader, "t", "texPointSize", 0),
    textureMaskUniform = new CGL.Uniform(shader, "t", "texMask", 0);

shader.setSource(attachments.pointmat_vert, attachments.pointmat_frag);
shader.glPrimitive = cgl.gl.POINTS;
shaderOut.set(shader);
shaderOut.ignoreValueSerialize = true;

render.onTriggered = doRender;
doScale.onChange =
    makeRound.onChange =
    makeRoundAA.onChange =
    texture.onChange =
    textureColorize.onChange =
    textureMask.onChange =
    colorizeRandom.onChange =
    flipTex.onChange =
    texMaskChan.onChange =
    inPixelSize.onChange =
    textureOpacity.onChange =
    texturePointSize.onChange =
    texturePointSizeMap.onChange =
    texturePointSizeChannel.onChange =
    textureMulColor.onChange =
    vertCols.onChange = updateDefines;

op.preRender = function ()
{
    if (shader)shader.bind();
    doRender();
};

function doRender()
{
    uniWidth.setValue(cgl.canvasWidth);
    uniHeight.setValue(cgl.canvasHeight);

    cgl.pushShader(shader);
    shader.popTextures();
    if (texture.get()) shader.pushTexture(textureUniform, texture.get().tex);
    if (textureMask.get()) shader.pushTexture(textureMaskUniform, textureMask.get().tex);
    if (textureColorize.get()) shader.pushTexture(textureColorizeUniform, textureColorize.get().tex);
    if (textureOpacity.get()) shader.pushTexture(textureOpacityUniform, textureOpacity.get().tex);
    if (texturePointSize.get()) shader.pushTexture(texturePointSizeUniform, texturePointSize.get().tex);

    trigger.trigger();

    cgl.popShader();
}

function updateDefines()
{
    shader.toggleDefine("SCALE_BY_DISTANCE", doScale.get());
    shader.toggleDefine("MAKE_ROUND", makeRound.get());
    shader.toggleDefine("MAKE_ROUNDAA", makeRoundAA.get());

    shader.toggleDefine("VERTEX_COLORS", vertCols.get());
    shader.toggleDefine("RANDOM_COLORIZE", colorizeRandom.get());
    shader.toggleDefine("HAS_TEXTURE_DIFFUSE", texture.get());
    shader.toggleDefine("HAS_TEXTURE_MASK", textureMask.get());
    shader.toggleDefine("HAS_TEXTURE_COLORIZE", textureColorize.get());
    shader.toggleDefine("HAS_TEXTURE_OPACITY", textureOpacity.get());
    shader.toggleDefine("HAS_TEXTURE_POINTSIZE", texturePointSize.get());

    shader.toggleDefine("TEXTURE_COLORIZE_MUL", textureMulColor.get());

    shader.toggleDefine("FLIP_TEX", flipTex.get());
    shader.toggleDefine("TEXTURE_MASK_R", texMaskChan.get() == "R");
    shader.toggleDefine("TEXTURE_MASK_A", texMaskChan.get() == "A");
    shader.toggleDefine("TEXTURE_MASK_LUMI", texMaskChan.get() == "Luminance");
    shader.toggleDefine("PIXELSIZE", inPixelSize.get());

    shader.toggleDefine("POINTSIZE_CHAN_R", texturePointSizeChannel.get() == "R");
    shader.toggleDefine("POINTSIZE_CHAN_G", texturePointSizeChannel.get() == "G");
    shader.toggleDefine("POINTSIZE_CHAN_B", texturePointSizeChannel.get() == "B");

    shader.toggleDefine("DOTSIZEREMAPABS", texturePointSizeMap.get() == "Grey");
}


};

Ops.Gl.Shader.PointMaterial_v3.prototype = new CABLES.Op();
CABLES.OPS["3a298144-c92b-45f7-b494-b71b43a3bc38"]={f:Ops.Gl.Shader.PointMaterial_v3,objName:"Ops.Gl.Shader.PointMaterial_v3"};




// **************************************************************
// 
// Ops.Json3d.Scene3d_v2
// 
// **************************************************************

Ops.Json3d.Scene3d_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
op.exe = op.addInPort(new CABLES.Port(op, "exe", CABLES.OP_PORT_TYPE_FUNCTION));
let filename = op.addInPort(new CABLES.Port(op, "file", CABLES.OP_PORT_TYPE_VALUE, { "display": "file", "type": "string", "filter": "3d json" }));
let trigger = op.outTrigger("trigger");
let doCreate = op.inTriggerButton("Create Nodes");
let createNonMesh = op.inValueBool("Create Non Mesh Nodes");
let createMaterials = op.inValueBool("Create Materials", false);
let detectClones = op.inValueBool("Detect Clones", true);
let inReplaceMaterials = op.inObject("Mesh Materials");
let outLoading = op.outValueBool("Loading", false);

let cgl = op.patch.cgl;

let scene = new CABLES.Variable();

cgl.frameStore.currentScene = null;

doCreate.onTriggered = createNodes;

let defaultEasing = CABLES.EASING_LINEAR;
let skipFrames = 1;
let frameNum = 0;
let cloneTransformStore = [];
let data = null;
let prevOp = null;
filename.onChange = reload;
op.exe.onTriggered = render;

let subPatchOpStart = op;
let subPatchId = op.uiAttribs.subPatch;
let subPatchOp = null;

function render()
{
    let oldScene = cgl.frameStore.currentScene;
    cgl.frameStore.currentScene = scene;
    if (cgl.frameStore.currentScene.materials)cgl.frameStore.currentScene.materials.length = 0;
    cgl.frameStore.currentScene.replaceMaterials = inReplaceMaterials.get();

    cgl.frameStore.cloneTransforms = cloneTransformStore;

    cgl.pushModelMatrix();
    trigger.trigger();
    cgl.popModelMatrix();

    cgl.frameStore.currentScene = oldScene;
}

let setPortAnimated = function (p, doLerp)
{
    p.setAnimated(true);
    if (doLerp)p.anim.defaultEasing = defaultEasing;
};


function loadMaterials(data, root)
{
    if (data.materials)
    {
        let lastSetMatop = null;
        for (let i in data.materials)
        {
            let jsonMat = data.materials[i];

            let matName = "";
            for (var j in jsonMat.properties)
            {
                if (jsonMat.properties[j].key == "?mat.name")
                {
                    matName = jsonMat.properties[j].value;
                }
            }

            for (var j in jsonMat.properties)
            {
                if (createMaterials.get() && jsonMat.properties[j].key && jsonMat.properties[j].value && jsonMat.properties[j].key == "$clr.diffuse")
                {
                    const setMatOp = op.patch.addOp("Ops.Json3d.SetMaterial", { "subPatch": subPatchId });

                    setMatOp.getPort("name").set(matName);
                    setMatOp.name = "Set Material " + matName;

                    let matOp = op.patch.addOp("Ops.Gl.Phong.PhongMaterial", { "subPatch": subPatchId });
                    matOp.getPort("diffuse r").set(jsonMat.properties[j].value[0]);
                    matOp.getPort("diffuse g").set(jsonMat.properties[j].value[1]);
                    matOp.getPort("diffuse b").set(jsonMat.properties[j].value[2]);
                    matOp.uiAttribs.title = matOp.name = "" + matName;

                    op.patch.link(setMatOp, "material", matOp, "shader");
                    op.patch.link(setMatOp, "exe", matOp, "trigger");

                    if (lastSetMatop) op.patch.link(lastSetMatop, "trigger", matOp, "render");
                    else op.patch.link(root, "trigger 0", matOp, "render");

                    lastSetMatop = setMatOp;
                    prevOp = matOp;
                }
            }
        }
    }
}


let loadCameras = function (data, seq)
{
    let i = 0;
    var camOp = null;

    function getCamera(root, _cam)
    {
        let cam = { "cam": _cam };
        for (i in root.children)
        {
            if (root.children[i].name == _cam.name)
            {
                cam.eye = root.children[i];
                cam.transformation = root.children[i].transformation;
                mat4.transpose(cam.transformation, cam.transformation);

                // guess camera target (...)
                for (let j = 0; j < root.children.length; j++)
                {
                    if (root.children[j].name == root.children[i].name + "_Target")
                    {
                        op.log("Found cameratarget!");
                        cam.target = root.children[i];
                        root.children.splice(j, 1);
                        root.children.splice(i, 1);
                        return cam;
                    }
                }
            }
        }
        return cam;
    }


    let camSeq = null;

    if (data.hasOwnProperty("cameras"))
    {
        camSeq = op.patch.addOp("Ops.Trigger.TimedSequence", { "subPatch": subPatchId, "translate": { "x": op.uiAttribs.translate.x, "y": op.uiAttribs.translate.y + 50 } });
        op.patch.link(camSeq, "exe", op, "trigger");

        op.log("camera....");

        let camCount = 0;
        for (i in data.cameras)
        {
            let cam = getCamera(data.rootnode, data.cameras[i]);

            if (cam)
            {
                if (!cam.target) continue;

                var camOp = op.patch.addOp("Ops.Gl.Matrix.QuaternionCamera", { "subPatch": subPatchId, "translate": { "x": op.uiAttribs.translate.x + camCount * 200, "y": op.uiAttribs.translate.y + 100 } });
                camOp.uiAttribs.title = camOp.name = "cam " + cam.cam.name;

                var an = dataGetAnimation(data, cam.cam.name);
                op.patch.link(camSeq, "trigger " + camCount, camOp, "render");
                op.patch.link(camOp, "trigger", seq, "exe " + camCount);
                camCount++;

                camOp.getPort("fov").set(cam.cam.horizontalfov);
                camOp.getPort("clip near").set(cam.cam.clipplanenear);
                camOp.getPort("clip far").set(cam.cam.clipplanefar);

                camOp.getPort("centerX").set(cam.cam.lookat[0]);
                camOp.getPort("centerY").set(cam.cam.lookat[1]);
                camOp.getPort("centerZ").set(cam.cam.lookat[2]);

                camOp.getPort("matrix").set(cam.transformation);

                if (an)
                {
                    if (an.positionkeys)
                    {
                        setPortAnimated(camOp.getPort("EyeX"), false);
                        setPortAnimated(camOp.getPort("EyeY"), false);
                        setPortAnimated(camOp.getPort("EyeZ"), false);

                        frameNum = skipFrames;
                        for (var k in an.positionkeys)
                        {
                            if (frameNum % skipFrames === 0)
                            {
                                camOp.getPort("EyeX").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][0]);
                                camOp.getPort("EyeY").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][1]);
                                camOp.getPort("EyeZ").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][2]);
                            }
                            frameNum++;
                        }
                    }

                    if (an.rotationkeys)
                    {
                        setPortAnimated(camOp.getPort("quat x"), false);
                        setPortAnimated(camOp.getPort("quat y"), false);
                        setPortAnimated(camOp.getPort("quat z"), false);
                        setPortAnimated(camOp.getPort("quat w"), false);

                        frameNum = skipFrames;
                        for (var k in an.rotationkeys)
                        {
                            if (frameNum % skipFrames == 0)
                            {
                                camOp.getPort("quat x").anim.setValue(an.rotationkeys[k][0], an.rotationkeys[k][1][0]);
                                camOp.getPort("quat y").anim.setValue(an.rotationkeys[k][0], an.rotationkeys[k][1][1]);
                                camOp.getPort("quat z").anim.setValue(an.rotationkeys[k][0], an.rotationkeys[k][1][2]);
                                camOp.getPort("quat w").anim.setValue(an.rotationkeys[k][0], an.rotationkeys[k][1][3]);
                            }
                            frameNum++;
                        }
                    }
                }
                else
                {
                    var camOp = op.patch.addOp("Ops.Gl.Matrix.LookatCamera", { "subPatch": subPatchId, "translate": { "x": op.uiAttribs.translate.x + camCount * 150, "y": op.uiAttribs.translate.y + 100 } });
                    camOp.uiAttribs.title = camOp.name = "cam " + cam.cam.name;
                    // op.patch.link(camOp,'render',self,'trigger');

                    op.patch.link(camSeq, "trigger " + camCount, camOp, "render");
                    op.patch.link(camOp, "trigger", seq, "exe " + camCount);
                    camCount++;

                    camOp.getPort("eyeX").set(900);
                    camOp.getPort("eyeY").set(900);
                    camOp.getPort("eyeZ").set(-240);

                    var an = dataGetAnimation(data, cam.cam.name);
                    if (an)
                    {
                        setPortAnimated(camOp.getPort("eyeX"), false);
                        setPortAnimated(camOp.getPort("eyeY"), false);
                        setPortAnimated(camOp.getPort("eyeZ"), false);

                        frameNum = skipFrames;
                        for (var k in an.positionkeys)
                        {
                            if (frameNum % skipFrames == 0)
                            {
                                camOp.getPort("eyeX").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][0]);
                                camOp.getPort("eyeY").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][1]);
                                camOp.getPort("eyeZ").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][2]);
                            }
                            frameNum++;
                        }
                    }

                    var an = dataGetAnimation(data, cam.cam.name + "_Target");
                    if (an)
                    {
                        setPortAnimated(camOp.getPort("centerX"), false);
                        setPortAnimated(camOp.getPort("centerY"), false);
                        setPortAnimated(camOp.getPort("centerZ"), false);

                        frameNum = skipFrames;
                        for (var k in an.positionkeys)
                        {
                            if (frameNum % skipFrames == 0)
                            {
                                camOp.getPort("centerX").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][0]);
                                camOp.getPort("centerY").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][1]);
                                camOp.getPort("centerZ").anim.setValue(an.positionkeys[k][0], an.positionkeys[k][1][2]);
                            }
                            frameNum++;
                        }
                    }
                    else
                    {
                        camOp.getPort("centerX").set(cam.target.transformation[12]);
                        camOp.getPort("centerY").set(cam.target.transformation[13]);
                        camOp.getPort("centerZ").set(cam.target.transformation[14]);

                        op.log("target not animated", cam.target.transformation[3]);
                    }
                }
            }
        }
    }

    return null;
};

function dataGetAnimation(data, name)
{
    if (!data.hasOwnProperty("animations")) return false;

    for (let iAnims in data.animations)
    {
        for (let iChannels in data.animations[iAnims].channels)
        {
            if (data.animations[iAnims].channels[iChannels].name == name)
            {
                return data.animations[iAnims].channels[iChannels];
            }
        }
    }
    return false;
}

let maxx = -3;
let row = 0;

function hasMeshChildNode(n)
{
    if (createNonMesh.get()) return true;
    if (n.meshes && n.meshes.length > 0) return true;
    if (n.hasOwnProperty("children"))
    {
        for (let i = 0; i < n.children.length; i++)
        {
            if (n.children[i].meshes && n.children[i].meshes.length > 0) return true;

            let childMeshes = hasMeshChildNode(n.children[i]);
            if (childMeshes) return true;
        }
    }

    op.log("has no childs", n);

    return false;
}

function addChild(data, x, y, parentOp, parentPort, ch)
{
    if (ch.hasOwnProperty("transformation"))
    {
        maxx = Math.max(x, maxx) + 1;
        let prevOp = null;

        if (data.hasOwnProperty("animations"))
        {
            let an = dataGetAnimation(data, ch.name);
            if (an)
            {
                if (an.positionkeys && an.positionkeys.length > 0)
                {
                    let anTransOp = op.patch.addOp("Ops.Json3d.TranslateChannel", { "subPatch": subPatchId });
                    anTransOp.uiAttribs.title = anTransOp.name = ch.name + " trans anim";
                    anTransOp.getPort("channel").set(ch.name);
                    op.patch.link(prevOp, "trigger", anTransOp, "render");

                    if (!prevOp)op.patch.link(parentOp, parentPort, anTransOp, "render");
                    prevOp = anTransOp;
                }


                if (an.rotationkeys && an.rotationkeys.length > 0)
                {
                    let anRotOp = op.patch.addOp("Ops.Json3d.QuaternionChannel", { "subPatch": subPatchId });
                    anRotOp.uiAttribs.title = anRotOp.name = ch.name + " quat rot anim";
                    anRotOp.getPort("channel").set(ch.name);
                    op.patch.link(prevOp, "trigger", anRotOp, "render");

                    if (!prevOp)op.patch.link(parentOp, parentPort, anRotOp, "render");
                    prevOp = anRotOp;
                }


                if (an.scalingkeys && an.scalingkeys.length > 0)
                {
                    let anScaleOp = op.patch.addOp("Ops.Json3d.ScaleChannel", { "subPatch": subPatchId });
                    anScaleOp.uiAttribs.title = anScaleOp.name = ch.name + " scale anim";
                    anScaleOp.getPort("channel").set(ch.name);
                    op.patch.link(prevOp, "trigger", anScaleOp, "render");

                    if (!prevOp)op.patch.link(parentOp, parentPort, anScaleOp, "render");
                    prevOp = anScaleOp;
                }
            }
        }

        let sameMesh = false;

        if (detectClones.get())
        {
            sameMesh = true;

            if (ch.hasOwnProperty("children"))
            {
                // test if children are all same mesh...

                var cloneTransforms = [];
                if (ch.children.length > 1 && ch.children[0].meshes && ch.children[0].meshes.length > 0)
                {
                    for (i = 0; i < ch.children.length; i++)
                    {
                        if (i > 0 && ch.children[i].meshes)
                        {
                            if (ch.children[0].meshes && ch.children[i].meshes && ch.children[i].meshes.length == ch.children[0].meshes.length)
                            {
                                if (ch.children[i].meshes[0] == ch.children[0].meshes[0])
                                {

                                }
                                else { sameMesh = false; }
                            }
                            else { sameMesh = false; }
                        }

                        if (sameMesh)
                        {
                            if (!ch.children[i].transposed)
                            {
                                mat4.transpose(ch.children[i].transformation, ch.children[i].transformation);
                                ch.children[i].transposed = true;
                            }
                            cloneTransforms.push(ch.children[i].transformation);
                        }
                    }
                }
                else { sameMesh = false; }
            }
            else { sameMesh = false; }
        }

        if (!prevOp)
        {
            let eq = mat4.exactEquals(ch.transformation, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

            if (!eq)
            {
                let transOp = op.patch.addOp("Ops.Gl.Matrix.MatrixMul", { "subPatch": subPatchId });

                if (!ch.transposed)
                {
                    ch.transposed = true;
                    mat4.transpose(ch.transformation, ch.transformation);
                }

                transOp.getPort("matrix").set(ch.transformation);
                prevOp = transOp;

                op.patch.link(parentOp, parentPort, prevOp, "render");
                if (ch.name) transOp.uiAttribs.title = transOp.name = ch.name;
            }
            else
                prevOp = parentOp;
        }


        var i = 0;
        if (ch.hasOwnProperty("meshes") || sameMesh)
        {
            let useChildrenMeshes = false;
            let len = 0;
            if (ch.meshes)
            {
                len = ch.meshes.length;
            }
            else
            {
                if (ch.children[0].meshes)
                {
                    len = ch.children[0].meshes.length;
                    useChildrenMeshes = true;
                }
            }

            for (i = 0; i < len; i++)
            {
                let index = -1;

                if (!useChildrenMeshes) index = ch.meshes[i];
                else index = ch.children[0].meshes[0];

                // material
                if (data.meshes[index].hasOwnProperty("materialindex") && data.hasOwnProperty("materials"))
                {
                    let matIndex = data.meshes[index].materialindex;
                    let jsonMat = data.materials[matIndex];

                    if (inReplaceMaterials.get() && inReplaceMaterials.get()[ch.name])
                    {
                        var matOp = op.patch.addOp("Ops.Json3d.SetMaterialShader", { "subPatch": subPatchId });
                        matOp.getPort("Key").set(ch.name);

                        var l = op.patch.link(prevOp, "trigger", matOp, "exe");

                        if (!l)
                        {
                            l = op.patch.link(parentOp, "trigger 15", matOp, "exe");
                        }

                        prevOp = matOp;
                    }
                    else
                    if (createMaterials.get())
                    {
                        var matOp = op.patch.addOp("Ops.Json3d.Material", { "subPatch": subPatchId });
                        op.patch.link(prevOp, "trigger", matOp, "exe");
                        prevOp = matOp;

                        for (let j in jsonMat.properties)
                            if (jsonMat.properties[j].key && jsonMat.properties[j].value && jsonMat.properties[j].key == "?mat.name")
                                matOp.getPort("name").set(jsonMat.properties[j].value);
                    }
                }

                if (!sameMesh)
                {
                    // mesh
                    var meshOp = op.patch.addOp("Ops.Json3d.Mesh", { "subPatch": subPatchId });
                    meshOp.index.val = index;
                    meshOp.uiAttribs.title = meshOp.name = ch.name + "";
                    var l = op.patch.link(prevOp, "trigger", meshOp, "render");

                    if (!l)
                    {
                        var l = op.patch.link(parentOp, "trigger 15", meshOp, "render");
                        op.log("prevOp link", parentOp);
                    }
                }
            }
        }


        if (ch.hasOwnProperty("children"))
        {
            op.log(ch.name + " children are clones: ", sameMesh);

            if (sameMesh)
            {
                let clonedOp = op.patch.addOp("Ops.Json3d.ClonedMesh", { "subPatch": subPatchId });

                clonedOp.getPort("transformations").set(cloneTransforms);

                cloneTransformStore.push(cloneTransforms);

                op.patch.link(prevOp, "trigger", clonedOp, "render");

                var meshOp = op.patch.addOp("Ops.Json3d.Mesh", { "subPatch": subPatchId });
                meshOp.index.val = ch.children[0].meshes[0];
                meshOp.uiAttribs.title = meshOp.name = "clone " + ch.name + " Mesh";
                meshOp.getPort("draw").set(false);

                op.patch.link(prevOp, "trigger", meshOp, "render");
                op.patch.link(clonedOp, "geom", meshOp, "geometry");
            }

            if (!sameMesh)
            {
                y++;
                for (i = 0; i < ch.children.length; i++)
                {
                    let xx = maxx;
                    if (ch.children.length > 1)xx++;

                    if (hasMeshChildNode(ch.children[i]))
                        addChild(data, xx, y, prevOp, "trigger", ch.children[i]);
                }
            }
        }
    }
}

function reload()
{
    doCreate.setUiAttribs({ "greyout": true });
    if (!filename.get()) return;

    function doLoad()
    {
        CABLES.ajax(
            op.patch.getFilePath(filename.get()),
            function (err, _data, xhr)
            {
                if (err)
                {
                    if (CABLES.UI)op.uiAttr({ "error": "could not load file..." });

                    op.error("ajax error:", err);
                    op.patch.loading.finished(loadingId);
                    return;
                }
                else
                {
                    if (CABLES.UI)op.uiAttr({ "error": null });
                }

                try
                {
                    data = JSON.parse(_data);
                }
                catch (ex)
                {
                    outLoading.set(false);
                    op.patch.loading.finished(loadingId);
                    if (CABLES.UI)op.uiAttr({ "error": "could not load file..." });
                    return;
                }


                scene.setValue(data);
                doCreate.setUiAttribs({ "greyout": false });
                op.patch.loading.finished(loadingId);

                outLoading.set(false);
                if (CABLES.UI) gui.jobs().finish("loading3d" + loadingId);
                doCreate.setUiAttribs({ "greyout": false });
            });
    }


    outLoading.set(true);
    var loadingId = op.patch.loading.start("json3dScene", filename.get());
    if (CABLES.UI) gui.jobs().start({ "id": "loading3d" + loadingId, "title": "loading 3d data" }, doLoad);
    else doLoad();
}

function createNodes()
{
    if (!trigger.isLinked())
    {
        let subPatchOpStartPort = "trigger";
        if (!subPatchOp)
        {
            subPatchId = op.uiAttribs.subPatch;
            subPatchOp = op.patch.addOp(CABLES.UI.OPNAME_SUBPATCH, { "subPatch": subPatchId });
            subPatchOp.setTitle("3d scene");
            subPatchId = subPatchOp.getPort("patchId").get();
            op.patch.link(op, "trigger", subPatchOp, "create port");

            let inputs = op.patch.getOpsByObjName("Ops.Ui.PatchInput");

            for (var i = 0; i < inputs.length; i++)
            {
                if (inputs[i].uiAttribs.subPatch == subPatchId)
                {
                    subPatchOpStart = inputs[i];
                    subPatchOpStartPort = subPatchOpStart.portsOut[0].name;
                }
            }
        }


        let rootMatrixOp = op.patch.addOp("Ops.Gl.Matrix.MatrixMul", { "subPatch": subPatchId, "translate": { "x": op.uiAttribs.translate.x, "y": op.uiAttribs.translate.y + 75 } });
        rootMatrixOp.uiAttribs.title = "rootMatrix";

        mat4.transpose(data.rootnode.transformation, data.rootnode.transformation);
        rootMatrixOp.getPort("matrix").set(data.rootnode.transformation);

        // op.patch.link(op,'trigger',rootMatrixOp,'render');
        op.patch.link(subPatchOpStart, subPatchOpStartPort, rootMatrixOp, "render");

        let root = op.patch.addOp("Ops.Sequence", { "subPatch": subPatchId, "translate": { "x": op.uiAttribs.translate.x, "y": op.uiAttribs.translate.y + 150 } });
        let camOp = loadCameras(data, root);

        if (camOp) op.patch.link(camOp, "trigger", root, "exe");
        else op.patch.link(rootMatrixOp, "trigger", root, "exe");

        loadMaterials(data, root);

        for (var i = 0; i < data.rootnode.children.length; i++)
        {
            if (data.rootnode.children[i])
            {
                let ntrigger = i + 2;
                if (ntrigger > 9)ntrigger = 9;

                if (hasMeshChildNode(data.rootnode.children[i]))
                    addChild(data, maxx - 2, 3, root, "trigger " + ntrigger, data.rootnode.children[i]);
            }
        }

        if (CABLES.UI)
        {
            setTimeout(function ()
            {
                // gui.patch().setSelectedOpById(op.id);
                // CABLES.CMD.PATCH.tidyChildOps();

                gui.patch().setSelectedOpById(subPatchOpStart.id);
                CABLES.CMD.PATCH.tidyChildOps();

                gui.patch().updateSubPatches();
            }, 100);
            gui.patch().updateSubPatches();
        }
    }
    else
    {
        if (CABLES.UI)
        {
            CABLES.UI.notifyError("remove child nodes first");
        }
    }
}


};

Ops.Json3d.Scene3d_v2.prototype = new CABLES.Op();
CABLES.OPS["44f0aa70-e97d-41cf-9560-369bffa0d21c"]={f:Ops.Json3d.Scene3d_v2,objName:"Ops.Json3d.Scene3d_v2"};




// **************************************************************
// 
// Ops.Deprecated.Gl.Matrix.MatrixMul
// 
// **************************************************************

Ops.Deprecated.Gl.Matrix.MatrixMul = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const render=op.inTrigger("render");
const trigger=op.outTrigger("trigger");
const matrix=op.inArray("matrix");

const cgl=op.patch.cgl;
var m=mat4.create();

matrix.onChange=function()
{
    m.set(matrix.get());
};

render.onTriggered=function()
{
    cgl.pushModelMatrix();
    mat4.multiply(cgl.mMatrix,cgl.mMatrix,m);
    trigger.trigger();
    cgl.popModelMatrix();
};

matrix.set( [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] );


};

Ops.Deprecated.Gl.Matrix.MatrixMul.prototype = new CABLES.Op();
CABLES.OPS["49f66ac2-9d65-4fc6-9b2f-bb1476073587"]={f:Ops.Deprecated.Gl.Matrix.MatrixMul,objName:"Ops.Deprecated.Gl.Matrix.MatrixMul"};




// **************************************************************
// 
// Ops.Sequence
// 
// **************************************************************

Ops.Sequence = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exe = op.inTrigger("exe"),
    cleanup = op.inTriggerButton("Clean up connections");

const
    exes = [],
    triggers = [],
    num = 16;

let updateTimeout = null;

exe.onTriggered = triggerAll;
cleanup.onTriggered = clean;
cleanup.setUiAttribs({ "hidePort": true });
cleanup.setUiAttribs({ "hideParam": true });

for (let i = 0; i < num; i++)
{
    const p = op.outTrigger("trigger " + i);
    triggers.push(p);
    p.onLinkChanged = updateButton;

    if (i < num - 1)
    {
        let newExe = op.inTrigger("exe " + i);
        newExe.onTriggered = triggerAll;
        exes.push(newExe);
    }
}

function updateButton()
{
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() =>
    {
        let show = false;
        for (let i = 0; i < triggers.length; i++)
            if (triggers[i].links.length > 1) show = true;

        cleanup.setUiAttribs({ "hideParam": !show });

        if (op.isCurrentUiOp()) op.refreshParams();
    }, 60);
}

function triggerAll()
{
    for (let i = 0; i < triggers.length; i++) triggers[i].trigger();
}

function clean()
{
    let count = 0;
    for (let i = 0; i < triggers.length; i++)
    {
        let removeLinks = [];

        if (triggers[i].links.length > 1)
            for (let j = 1; j < triggers[i].links.length; j++)
            {
                while (triggers[count].links.length > 0) count++;

                removeLinks.push(triggers[i].links[j]);
                const otherPort = triggers[i].links[j].getOtherPort(triggers[i]);
                op.patch.link(op, "trigger " + count, otherPort.parent, otherPort.name);
                count++;
            }

        for (let j = 0; j < removeLinks.length; j++) removeLinks[j].remove();
    }
    updateButton();
}


};

Ops.Sequence.prototype = new CABLES.Op();
CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"]={f:Ops.Sequence,objName:"Ops.Sequence"};




// **************************************************************
// 
// Ops.Anim.Timer
// 
// **************************************************************

Ops.Anim.Timer = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var playPause=op.inValueBool("Play",true);
var reset=op.inTriggerButton("Reset");
var outTime=op.outValue("Time");
var inSpeed=op.inValue("Speed",1);

var timer=new CABLES.Timer();

playPause.onChange=setState;
setState();

function setState()
{
    if(playPause.get())
    {
        timer.play();
        op.patch.addOnAnimFrame(op);
    }
    else
    {
        timer.pause();
        op.patch.removeOnAnimFrame(op);
    }
}

reset.onTriggered=function()
{
    timer.setTime(0);
    outTime.set(0);
};

op.onAnimFrame=function()
{
    timer.update();
    outTime.set(timer.get()*inSpeed.get());

};


};

Ops.Anim.Timer.prototype = new CABLES.Op();
CABLES.OPS["65ae3c2e-90d7-48fe-93df-30245f0bcf34"]={f:Ops.Anim.Timer,objName:"Ops.Anim.Timer"};




// **************************************************************
// 
// Ops.Value.TriggerOnChangeNumber
// 
// **************************************************************

Ops.Value.TriggerOnChangeNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inval = op.inFloat("Value"),
    next = op.outTrigger("Next"),
    number = op.outNumber("Number");

inval.onChange = function ()
{
    number.set(inval.get());
    next.trigger();
};


};

Ops.Value.TriggerOnChangeNumber.prototype = new CABLES.Op();
CABLES.OPS["f5c8c433-ce13-49c4-9a33-74e98f110ed0"]={f:Ops.Value.TriggerOnChangeNumber,objName:"Ops.Value.TriggerOnChangeNumber"};




// **************************************************************
// 
// Ops.Json3d.Mesh
// 
// **************************************************************

Ops.Json3d.Mesh = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const render = op.inTrigger("render");
op.index = op.inValueInt("mesh index", 0);
const draw = op.inValueBool("draw", true);
const centerPivot = op.inValueBool("center pivot", false);

const next = op.outTrigger("next");
const geometryOut = op.outObject("geometry");

geometryOut.ignoreValueSerialize = true;

const cgl = op.patch.cgl;
let meshesCache = {};
let currentIndex = 0;

op.index.onChange = reload;
render.onTriggered = doRender;

function doRender()
{
    let idx = op.index.get();
    let mesh = meshesCache[idx];
    if (!mesh) reload();

    if (draw.get())
    {
        if (mesh) mesh.render(cgl.getShader());
    }
    next.trigger();
}

function reload()
{
    if (!cgl.frameStore.currentScene || !cgl.frameStore.currentScene.getValue()) return;
    let meshes = cgl.frameStore.currentScene.getValue().meshes;

    let mesh = null;

    const indx = op.index.get();

    if (cgl.frameStore.currentScene && cgl.frameStore.currentScene.getValue() && indx >= 0)
    {
        op.uiAttr({ "warning": "" });
        op.uiAttr({ "info": "" });

        let jsonMesh = null;

        currentIndex = indx;

        if (CABLES.UTILS.isNumeric(indx))
        {
            if (indx < 0 || indx >= cgl.frameStore.currentScene.getValue().meshes.length)
            {
                op.uiAttr({ "warning": "mesh not found - index out of range " });
                return;
            }

            jsonMesh = cgl.frameStore.currentScene.getValue().meshes[parseInt(indx, 10)];
        }

        if (!jsonMesh)
        {
            mesh = null;
            op.uiAttr({ "warning": "mesh not found" });
            return;
        }
        op.uiAttribs.warning = "";

        let geom = CGL.Geometry.json2geom(jsonMesh);
        // var geom=new CGL.Geometry();
        // geom.vertices=(jsonMesh.vertices||[]).slice();
        // geom.vertexNormals=jsonMesh.normals||[];
        // geom.tangents=jsonMesh.tangents||[];
        // geom.biTangents=jsonMesh.bitangents||[];


        if (centerPivot.get()) geom.center();

        if (jsonMesh.texturecoords) geom.texCoords = jsonMesh.texturecoords[0];
        // geom.verticesIndices=[];


        // for(var i=0;i<jsonMesh.faces.length;i++)
        // {
        //    geom.verticesIndices.push(jsonMesh.faces[i][0],jsonMesh.faces[i][1],jsonMesh.faces[i][2]);
        // }
        // geom.verticesIndices=[].concat.apply([], jsonMesh.faces);

        // var nfo='';
        // nfo += (geom.verticesIndices.length/3)+' faces <br/>';
        // nfo += (geom.vertices.length/3)+' vertices <br/>';
        // nfo += geom.texCoords.length+' texturecoords <br/>';
        // nfo += geom.tangents.length+' tangents <br/>';
        // nfo += geom.biTangents.length+' biTangents <br/>';
        // if(geom.vertexNormals) nfo += geom.vertexNormals.length+' normals <br/>';

        // op.uiAttr({"info":nfo});

        // var
        // indices = geom.verticesIndices || [],
        // faces = jsonMesh.faces,
        // face, i
        // ;

        // if(faces)
        //     for(i = 0; i < faces.length; i++) {
        //         face=jsonMesh.faces[i];
        //         Array.prototype.push.apply(indices, face);
        //     }

        let nfo = "";
        nfo += (geom.verticesIndices.length / 3) + " faces <br/>";
        nfo += (geom.vertices.length / 3) + " vertices <br/>";
        nfo += (geom.texCoords ? geom.texCoords.length / 2 : "no") + " texturecoords <br/>";
        nfo += geom.vertexNormals.length / 3 + " normals <br/>";
        nfo += geom.tangents.length / 3 + " tangents <br/>";
        nfo += geom.biTangents.length / 3 + " biTangents <br/>";
        op.uiAttr({ "info": nfo });

        geometryOut.set(null);
        geometryOut.set(geom);
        mesh = new CGL.Mesh(cgl, geom);
        meshesCache[indx] = mesh;
    }
}

centerPivot.onChange = function ()
{
    // todo: dispose meshes
    meshesCache = {};
};


};

Ops.Json3d.Mesh.prototype = new CABLES.Op();
CABLES.OPS["f6fd7e38-171b-4c53-b215-c198de19c20e"]={f:Ops.Json3d.Mesh,objName:"Ops.Json3d.Mesh"};




// **************************************************************
// 
// Ops.Json3d.Bones.BoneSkin
// 
// **************************************************************

Ops.Json3d.Bones.BoneSkin = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={skin_vert:"\n\nif(skinIndex.x!=-1.0)\n{\n    int index=int(skinIndex.x);\n    vec4 newPos = (bone[index] * pos) * skinWeight.x;\n    vec3 newNorm = (vec4((bone[index] * vec4(norm.xyz, 0.0)) * skinWeight.x).xyz);\n    \n    if(skinIndex.y!=-1.0)\n    {\n        index=int(skinIndex.y);\n        newPos = (bone[index] * pos) * skinWeight.y + newPos;\n        newNorm = (vec4((bone[index] * vec4(norm.xyz, 0.0)) * skinWeight.y).xyz)+newNorm;\n    }\n    \n    if(skinIndex.z!=-1.0)\n    {\n        index=int(skinIndex.z);\n        newPos = (bone[index] * pos) * skinWeight.z + newPos;\n        newNorm = (vec4((bone[index] * vec4(norm.xyz, 0.0)) * skinWeight.z).xyz)+newNorm;\n    }\n\n    if(skinIndex.w!=-1.0)\n    {\n        index=int(skinIndex.w);\n        newPos = (bone[index] * pos) * skinWeight.w + newPos;\n        newNorm = (vec4((bone[index] * vec4(norm.xyz, 0.0)) * skinWeight.w).xyz)+newNorm;\n    }\n    \n    pos=newPos;\n    norm=normalize(newNorm.xyz);\n}\n",skin_head_vert:"\n\nIN vec4 skinIndex;\nIN vec4 skinWeight;\n\nUNI mat4 bone[SKIN_NUM_BONES];",};
// https://www.khronos.org/opengl/wiki/Skeletal_Animation

const render = op.inTrigger("Render");
const inMeshIndex = op.inValueInt("MeshIndex");
const inGeom = op.inObject("Geometry");
const draw = op.inValueBool("draw", true);
const next = op.outTrigger("Next");

let geom = null;
let mesh = null;
let shader = null;

const cgl = op.patch.cgl;
let meshIndex = 0;

const boneMatrices = [];
let boneMatricesUniform = null;
let vertWeights = null;
let vertIndex = null;
let attribWeightsScene = -1;
let moduleVert = null;

render.onLinkChanged = removeModule;
op.onDelete = removeModule;
inMeshIndex.onChange = reset;
inGeom.onChange = setGeom;

function removeModule()
{
    if (shader && moduleVert) shader.removeModule(moduleVert);
    shader = null;
    reset();
}

function reset()
{
    meshIndex = inMeshIndex.get();
    attribWeightsScene = null;
    if (shader)removeModule();
    mesh = null;
    vertWeights = null;
}

function setGeom()
{
    vertWeights = null;
    geom = inGeom.get();

    if (geom)
    {
        mesh = new CGL.Mesh(cgl, geom);
        op.setUiError("geom", null);
    }
    else
    {
        op.setUiError("geom", "no/invalid geometry");
    }
}

function setupIndexWeights(jsonMesh)
{
    if (!mesh)
    {
        return;
    }

    if (!vertWeights || vertWeights.length != geom.vertices.length / 3)
    {
        vertWeights = [];
        vertIndex = [];
        vertWeights.length = geom.vertices.length / 3;
        vertIndex.length = geom.vertices.length / 3;

        for (var i = 0; i < vertWeights.length; i++)
        {
            vertWeights[i] = [-1, -1, -1, -1];
            vertIndex[i] = [-1, -1, -1, -1];
        }
    }

    let maxBone = -1;
    let maxindex = -1;
    const bones = jsonMesh.bones;
    for (var i = 0; i < bones.length; i++)
    {
        const bone = bones[i];
        maxBone = Math.max(maxBone, i);

        for (let w = 0; w < bone.weights.length; w++)
        {
            const index = bone.weights[w][0];
            const weight = bone.weights[w][1];
            maxindex = Math.max(maxindex, index);

            if (vertWeights[index].length)
                if (vertWeights[index][0] == -1)
                {
                    vertWeights[index][0] = weight;
                    vertIndex[index][0] = i;
                }
                else if (vertWeights[index][1] == -1)
                {
                    vertWeights[index][1] = weight;
                    vertIndex[index][1] = i;
                }
                else if (vertWeights[index][2] == -1)
                {
                    vertWeights[index][2] = weight;
                    vertIndex[index][2] = i;
                }
                else if (vertWeights[index][3] == -1)
                {
                    vertWeights[index][3] = weight;
                    vertIndex[index][3] = i;
                }
                else op.warn("too many weights for vertex!");
        }
    }

    shader.define("SKIN_NUM_BONES", bones.length);

    const vi = [].concat.apply([], vertIndex);
    const vw = [].concat.apply([], vertWeights);

    mesh.setAttribute("skinIndex", vi, 4);
    mesh.setAttribute("skinWeight", vw, 4);
}

render.onTriggered = function ()
{
    if (!cgl.getShader()) return;
    const scene = cgl.frameStore.currentScene.getValue();

    if ((mesh && scene && scene.meshes && scene.meshes.length > meshIndex) || cgl.getShader() != shader)
    {
        if (cgl.getShader() != shader)
        {
            var startInit = CABLES.now();

            if (shader)removeModule();
            shader = cgl.getShader();

            moduleVert = shader.addModule(
                {
                    "title": op.objName,
                    "priority": -1,
                    "name": "MODULE_VERTEX_POSITION",
                    "srcHeadVert": attachments.skin_head_vert || "",
                    "srcBodyVert": attachments.skin_vert || ""
                });
            shader.define("SKIN_NUM_BONES", 1);
            boneMatricesUniform = new CGL.Uniform(shader, "m4", "bone", []);
            attribWeightsScene = null;
        }

        if (attribWeightsScene != scene)
        {
            var startInit = CABLES.now();
            vertWeights = null;
            setGeom();
            attribWeightsScene = scene;
            setupIndexWeights(scene.meshes[meshIndex]);
        }

        const bones = scene.meshes[meshIndex].bones;

        for (let i = 0; i < bones.length; i++)
        {
            if (bones[i].matrix)
            {
                if (boneMatrices.length != bones.length * 16)
                    boneMatrices.length = bones.length * 16;

                for (let mi = 0; mi < 16; mi++)
                    boneMatrices[i * 16 + mi] = bones[i].matrix[mi];
            }
            else
            {
                op.warn("no bone matrix", i);
            }
        }

        boneMatricesUniform.setValue(boneMatrices);
    }

    if (draw.get() && mesh)
    {
        if (mesh) mesh.render(cgl.getShader());
        next.trigger();
    }
};


};

Ops.Json3d.Bones.BoneSkin.prototype = new CABLES.Op();
CABLES.OPS["aef4eb37-53ca-43b4-a9db-3bbd8aa00906"]={f:Ops.Json3d.Bones.BoneSkin,objName:"Ops.Json3d.Bones.BoneSkin"};




// **************************************************************
// 
// Ops.Gl.Texture
// 
// **************************************************************

Ops.Gl.Texture = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const filename = op.inFile("file", "image");
const tfilter = op.inSwitch("filter", ["nearest", "linear", "mipmap"]);
const wrap = op.inValueSelect("wrap", ["repeat", "mirrored repeat", "clamp to edge"], "clamp to edge");
const flip = op.inValueBool("flip", false);
const unpackAlpha = op.inValueBool("unpackPreMultipliedAlpha", false);
const aniso = op.inSwitch("Anisotropic", [0, 1, 2, 4, 8, 16], 0);

const textureOut = op.outTexture("texture");
const width = op.outValue("width");
const height = op.outValue("height");
const loading = op.outValue("loading");
const ratio = op.outValue("Aspect Ratio");

op.setPortGroup("Size", [width, height]);

unpackAlpha.setUiAttribs({ "hidePort": true });

op.toWorkPortsNeedToBeLinked(textureOut);

const cgl = op.patch.cgl;
let cgl_filter = 0;
let cgl_wrap = 0;
let cgl_aniso = 0;

filename.onChange = flip.onChange = function () { reloadSoon(); };

aniso.onChange = tfilter.onChange = onFilterChange;
wrap.onChange = onWrapChange;
unpackAlpha.onChange = function () { reloadSoon(); };

let timedLoader = 0;

tfilter.set("mipmap");
wrap.set("repeat");

textureOut.set(CGL.Texture.getEmptyTexture(cgl));

const setTempTexture = function ()
{
    const t = CGL.Texture.getTempTexture(cgl);
    textureOut.set(t);
};

let loadingId = null;
let tex = null;
function reloadSoon(nocache)
{
    clearTimeout(timedLoader);
    timedLoader = setTimeout(function ()
    {
        realReload(nocache);
    }, 30);
}

function realReload(nocache)
{
    if (!loadingId)loadingId = cgl.patch.loading.start("textureOp", filename.get());

    let url = op.patch.getFilePath(String(filename.get()));
    if (nocache)url += "?rnd=" + CABLES.generateUUID();

    if ((filename.get() && filename.get().length > 1))
    {
        loading.set(true);

        if (tex)tex.delete();
        tex = CGL.Texture.load(cgl, url,
            function (err)
            {
                if (err)
                {
                    setTempTexture();
                    op.setUiError("errorload", "could not load texture \"" + filename.get() + "\"", 2);
                    cgl.patch.loading.finished(loadingId);
                    return;
                }
                else op.setUiError("errorload", null);
                // op.uiAttr({'error':null});
                textureOut.set(tex);
                width.set(tex.width);
                height.set(tex.height);
                ratio.set(tex.width / tex.height);

                if (!tex.isPowerOfTwo())
                    op.setUiError("hintnpot", "texture dimensions not power of two! - texture filtering will not work.", 0);
                // op.uiAttr(
                //     {
                //         hint:'texture dimensions not power of two! - texture filtering will not work.',
                //         warning:null
                //     });
                else
                    op.setUiError("hintnpot", null);
                    // op.uiAttr(
                    //     {
                    //         hint:null,
                    //         warning:null
                    //     });

                textureOut.set(null);
                textureOut.set(tex);
                // tex.printInfo();
            }, {
                "anisotropic": cgl_aniso,
                "wrap": cgl_wrap,
                "flip": flip.get(),
                "unpackAlpha": unpackAlpha.get(),
                "filter": cgl_filter
            });

        textureOut.set(null);
        textureOut.set(tex);

        if (!textureOut.get() && nocache)
        {
        }

        cgl.patch.loading.finished(loadingId);
    }
    else
    {
        cgl.patch.loading.finished(loadingId);
        setTempTexture();
    }
}

function onFilterChange()
{
    if (tfilter.get() == "nearest") cgl_filter = CGL.Texture.FILTER_NEAREST;
    else if (tfilter.get() == "linear") cgl_filter = CGL.Texture.FILTER_LINEAR;
    else if (tfilter.get() == "mipmap") cgl_filter = CGL.Texture.FILTER_MIPMAP;
    else if (tfilter.get() == "Anisotropic") cgl_filter = CGL.Texture.FILTER_ANISOTROPIC;

    cgl_aniso = parseFloat(aniso.get());

    reloadSoon();
}

function onWrapChange()
{
    if (wrap.get() == "repeat") cgl_wrap = CGL.Texture.WRAP_REPEAT;
    if (wrap.get() == "mirrored repeat") cgl_wrap = CGL.Texture.WRAP_MIRRORED_REPEAT;
    if (wrap.get() == "clamp to edge") cgl_wrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;

    reloadSoon();
}

op.onFileChanged = function (fn)
{
    if (filename.get() && filename.get().indexOf(fn) > -1)
    {
        textureOut.set(null);
        textureOut.set(CGL.Texture.getTempTexture(cgl));

        realReload(true);
    }
};


};

Ops.Gl.Texture.prototype = new CABLES.Op();
CABLES.OPS["466394d4-6c1a-4e5d-a057-0063ab0f096a"]={f:Ops.Gl.Texture,objName:"Ops.Gl.Texture"};




// **************************************************************
// 
// Ops.Value.GateNumber
// 
// **************************************************************

Ops.Value.GateNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// input
const valueInPort = op.inValue("Value In", 0);
const passThroughPort = op.inValueBool("Pass Through");

// output
const valueOutPort = op.outValue("Value Out");

// change listeners
valueInPort.onChange = update;
passThroughPort.onChange = update;

valueInPort.changeAlways = true;
valueOutPort.changeAlways = true;

function update()
{
    if (passThroughPort.get())
    {
        valueOutPort.set(valueInPort.get());
    }
}


};

Ops.Value.GateNumber.prototype = new CABLES.Op();
CABLES.OPS["594105c8-1fdb-4f3c-bbd5-29b9ad6b33e0"]={f:Ops.Value.GateNumber,objName:"Ops.Value.GateNumber"};




// **************************************************************
// 
// Ops.Color.HexToRGB_v2
// 
// **************************************************************

Ops.Color.HexToRGB_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    hex=op.inString("Hex","#ff0000"),
    asBytes=op.inValueBool("Bytes"),
    outR=op.outValue("R"),
    outG=op.outValue("G"),
    outB=op.outValue("B");

function hexToR(h) {
    return parseInt((cutHex(h)).substring(0,2),16)||0;
}
function hexToG(h) {
    return parseInt((cutHex(h)).substring(2,4),16)||0;
}
function hexToB(h) {
    return parseInt((cutHex(h)).substring(4,6),16)||0;
}
function cutHex(h) {
    return (h.charAt(0)=="#") ? h.substring(1,7):h;
}


hex.onChange=parse;
asBytes.onChange=parse;

function parse()
{
    var str=hex.get()||'';
    var r=hexToR(str);
    var g=hexToG(str);
    var b=hexToB(str);


    if(!asBytes.get())
    {
        r/=255;
        g/=255;
        b/=255;
    }

    outR.set(r);
    outB.set(b);
    outG.set(g);
}

};

Ops.Color.HexToRGB_v2.prototype = new CABLES.Op();
CABLES.OPS["9877f198-8dac-48e5-9310-244ef1a8dec5"]={f:Ops.Color.HexToRGB_v2,objName:"Ops.Color.HexToRGB_v2"};




// **************************************************************
// 
// Ops.Json3d.Bones.BoneSystem
// 
// **************************************************************

Ops.Json3d.Bones.BoneSystem = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// https://www.khronos.org/opengl/wiki/Skeletal_Animation
// http://ogldev.atspace.co.uk/www/tutorial38/tutorial38.html

let render = op.inTrigger("Render");
let inMeshIndex = op.inValueInt("Mesh Index");

let inTime = op.inValue("Time");

let inFade = op.inValueSlider("Fade Times");
let inTime2 = op.inValue("Time2");


let next = op.outTrigger("Next");
let outNumBounes = op.outValue("Num Bones");
let outSpline = op.outArray("Spline");
let outJoint = op.outTrigger("Joint Trigger");

let points = [];
let tempMat = mat4.create();
let tempVec = vec3.create();
let emptyVec = vec3.create();
let transVec = vec3.create();

let alwaysEmptyVec = vec3.create();
let q = quat.create();
let q2 = quat.create();
let qMat = mat4.create();
let boneMatrix = mat4.create();

let cgl = op.patch.cgl;
let scene = null;
let meshIndex = 0;
let bones = 0;
let oldScene = null;
let boneList = [];
let fillBoneList = true;
let pointCounter = 0;

inMeshIndex.onChange = function ()
{
    meshIndex = inMeshIndex.get();
};

function findBoneChilds(n, parent, foundBone)
{
    function isBone(name)
    {
        if (scene.meshes[meshIndex].bones)
            for (let i = 0; i < scene.meshes[meshIndex].bones.length; i++)
                if (scene.meshes[meshIndex].bones[i].name == name)
                    return scene.meshes[meshIndex].bones[i];
        return false;
    }

    function findAnimation(name)
    {
        var an = 0;
        for (var an = 0; an < scene.animations.length; an++)

            for (let i = 0; i < scene.animations[an].channels.length; i++)
                if (scene.animations[an].channels[i].name == name)
                    return scene.animations[an].channels[i];

        return null;
    }

    let time = op.patch.timer.getTime();
    if (inTime.isLinked() || inTime.get() !== 0)time = inTime.get();
    let time2 = inTime2.get();


    cgl.pushModelMatrix();

    let bone = isBone(n.name);

    if ((bone || foundBone) && n != scene.rootnode)
    {
        foundBone = true;

        if (!n.anim)
        {
            // create anim objects for translation/rotation
            let anim = findAnimation(n.name);
            if (anim)
            {
                n.anim = anim;

                if (anim && !n.quatAnimX && anim.rotationkeys)
                {
                    n.quatAnimX = new CABLES.Anim();
                    n.quatAnimY = new CABLES.Anim();
                    n.quatAnimZ = new CABLES.Anim();
                    n.quatAnimW = new CABLES.Anim();

                    for (var k in anim.rotationkeys)
                    {
                        n.quatAnimX.setValue(anim.rotationkeys[k][0], anim.rotationkeys[k][1][1]);
                        n.quatAnimY.setValue(anim.rotationkeys[k][0], anim.rotationkeys[k][1][2]);
                        n.quatAnimZ.setValue(anim.rotationkeys[k][0], anim.rotationkeys[k][1][3]);
                        n.quatAnimW.setValue(anim.rotationkeys[k][0], anim.rotationkeys[k][1][0]);
                    }
                }
                if (anim && !n.posAnimX && anim.positionkeys)
                {
                    n.posAnimX = new CABLES.Anim();
                    n.posAnimY = new CABLES.Anim();
                    n.posAnimZ = new CABLES.Anim();

                    for (var k in anim.positionkeys)
                    {
                        n.posAnimX.setValue(anim.positionkeys[k][0], anim.positionkeys[k][1][0]);
                        n.posAnimY.setValue(anim.positionkeys[k][0], anim.positionkeys[k][1][1]);
                        n.posAnimZ.setValue(anim.positionkeys[k][0], anim.positionkeys[k][1][2]);
                    }
                }
            }
        }

        if (n.posAnimX)
        {
            transVec[0] = n.posAnimX.getValue(time);
            transVec[1] = n.posAnimY.getValue(time);
            transVec[2] = n.posAnimZ.getValue(time);

            if (inFade.get() != 0)
            {
                transVec[0] = (transVec[0] * (1.0 - inFade.get())) + (n.posAnimX.getValue(time2) * inFade.get());
                transVec[1] = (transVec[1] * (1.0 - inFade.get())) + (n.posAnimY.getValue(time2) * inFade.get());
                transVec[2] = (transVec[2] * (1.0 - inFade.get())) + (n.posAnimZ.getValue(time2) * inFade.get());

                mat4.translate(cgl.mMatrix, cgl.mMatrix, transVec);
            }
            else
            {
                mat4.translate(cgl.mMatrix, cgl.mMatrix, transVec);
            }
        }

        if (n.quatAnimX)
        {
            CABLES.TL.Anim.slerpQuaternion(time, q,
                n.quatAnimX,
                n.quatAnimY,
                n.quatAnimZ,
                n.quatAnimW);

            if (inFade.get() != 0)
            {
                CABLES.TL.Anim.slerpQuaternion(time2, q2,
                    n.quatAnimX,
                    n.quatAnimY,
                    n.quatAnimZ,
                    n.quatAnimW);
                quat.slerp(q, q, q2, inFade.get());
            }

            mat4.fromQuat(qMat, q);
            mat4.multiply(cgl.mMatrix, cgl.mMatrix, qMat);
        }

        // get position
        vec3.transformMat4(tempVec, alwaysEmptyVec, cgl.mMatrix);
        if (!n.boneMatrix)
        {
            n.boneMatrix = mat4.create();
            n.transformed = vec3.create();
        }
        vec3.copy(n.transformed, tempVec);

        mat4.copy(n.boneMatrix, cgl.mMatrix);

        // store absolute bone matrix
        if (bone)
        {
            if (!bone.matrix)bone.matrix = mat4.create();
            mat4.copy(bone.matrix, cgl.mMatrix);

            if (!bone.transposedOffsetMatrix)
            {
                mat4.transpose(bone.offsetmatrix, bone.offsetmatrix);
                bone.transposedOffsetMatrix = true;
            }
            mat4.mul(bone.matrix, bone.matrix, bone.offsetmatrix);
        }

        if (parent && parent.transformed)
        {
            points[pointCounter++] = parent.transformed[0];
            points[pointCounter++] = parent.transformed[1];
            points[pointCounter++] = parent.transformed[2];

            points[pointCounter++] = tempVec[0];
            points[pointCounter++] = tempVec[1];
            points[pointCounter++] = tempVec[2];
        }

        if (fillBoneList) boneList.push(n);
        cgl.frameStore.bone = n;
    }

    if (n.children)
    {
        for (let i = 0; i < n.children.length; i++)
        {
            if (isBone(n.children[i].name)) bones++;
            findBoneChilds(n.children[i], n, foundBone);
        }
    }

    cgl.popModelMatrix();

    return bones;
}

render.onTriggered = function ()
{
    pointCounter = 0;
    bones = 0;
    scene = cgl.frameStore.currentScene.getValue();
    cgl.frameStore.bones = boneList;

    if (!scene) return;
    if (scene != oldScene)
    {
        fillBoneList = true;
        boneList.length = 0;
        oldScene = scene;
    }

    cgl.pushModelMatrix();
    mat4.identity(cgl.mMatrix);
    findBoneChilds(scene.rootnode, null, false);
    cgl.popModelMatrix();

    outSpline.set(null);
    outSpline.set(points);
    outNumBounes.set(bones);
    fillBoneList = false;

    next.trigger();
    cgl.frameStore.bones = null;
};


};

Ops.Json3d.Bones.BoneSystem.prototype = new CABLES.Op();
CABLES.OPS["72ed0814-2b80-48ad-90c1-2ef47eeecfe6"]={f:Ops.Json3d.Bones.BoneSystem,objName:"Ops.Json3d.Bones.BoneSystem"};




// **************************************************************
// 
// Ops.Gl.Shader.MatCapMaterialNew
// 
// **************************************************************

Ops.Gl.Shader.MatCapMaterialNew = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={matcap_frag:"\n{{MODULES_HEAD}}\n\nIN vec3 norm;\nIN vec2 texCoord;\nUNI sampler2D tex;\nIN vec3 vNorm;\nUNI mat4 viewMatrix;\n\nUNI float opacity;\n\nUNI float r;\nUNI float g;\nUNI float b;\n\nIN vec3 e;\n\n\n\n#ifdef HAS_DIFFUSE_TEXTURE\n   UNI sampler2D texDiffuse;\n#endif\n\n#ifdef USE_SPECULAR_TEXTURE\n   UNI sampler2D texSpec;\n   UNI sampler2D texSpecMatCap;\n#endif\n\n#ifdef HAS_AO_TEXTURE\n    UNI sampler2D texAo;\n    UNI float aoIntensity;\n#endif\n\n#ifdef HAS_NORMAL_TEXTURE\n   IN vec3 vBiTangent;\n   IN vec3 vTangent;\n\n   UNI sampler2D texNormal;\n   UNI mat4 normalMatrix;\n\n   vec2 vNormt;\n#endif\n\n#ifdef HAS_TEXTURE_OPACITY\n    UNI sampler2D texOpacity;\n#endif\n\n#ifdef CALC_SSNORMALS\n    // from https://www.enkisoftware.com/devlogpost-20150131-1-Normal_generation_in_the_pixel_shader\n    IN vec3 eye_relative_pos;\n#endif\n\n\nconst float normalScale=0.4;\n\nconst vec2 invAtan = vec2(0.1591, 0.3183);\nvec2 sampleSphericalMap(vec3 direction)\n{\n    vec2 uv = vec2(atan(direction.z, direction.x), asin(direction.y));\n    uv *= invAtan;\n    uv += 0.5;\n    return uv;\n}\n\n\nvoid main()\n{\n    vec2 vnOrig=vNorm.xy;\n    vec2 vn=vNorm.xy;\n\n    #ifdef PER_PIXEL\n\n        vec3 ref = reflect( e, vNorm );\n        // ref=(ref);\n\n        // ref.z+=1.;\n        // ref=normalize(ref);\n\n        // float m = 2. * sqrt(\n        //     pow(ref.x, 2.0)+\n        //     pow(ref.y, 2.0)+\n        //     pow(ref.z+1., 2.0)\n        // );\n\n        float m = 2.58284271247461903 * sqrt( (length(ref)) );\n\n        vn.xy = ref.xy / m + 0.5;\n\n\n    #endif\n\n\n\n    #ifdef HAS_TEXTURES\n        vec2 texCoords=texCoord;\n        {{MODULE_BEGIN_FRAG}}\n    #endif\n\n    #ifdef CALC_SSNORMALS\n    \tvec3 dFdxPos = dFdx( eye_relative_pos );\n    \tvec3 dFdyPos = dFdy( eye_relative_pos );\n    \tvec3 ssn = normalize( cross(dFdxPos,dFdyPos ));\n\n        vec3 rr = reflect( e, ssn );\n        float ssm = 2. * sqrt(\n            pow(rr.x, 2.0)+\n            pow(rr.y, 2.0)+\n            pow(rr.z + 1.0, 2.0)\n        );\n\n\n        vn = (rr.xy / ssm + 0.5);\n\n        vn.t=clamp(vn.t, 0.0, 1.0);\n        vn.s=clamp(vn.s, 0.0, 1.0);\n\n        // float dst = dot(abs(coord-center), vec2(1.0));\n        // float aaf = fwidth(dst);\n        // float alpha = smoothstep(radius - aaf, radius, dst);\n\n    #endif\n\n   #ifdef HAS_NORMAL_TEXTURE\n        vec3 tnorm=texture( texNormal, texCoord ).xyz * 2.0 - 1.0;\n\n        tnorm = normalize(tnorm*normalScale);\n\n        vec3 tangent;\n        vec3 binormal;\n\n        #ifdef CALC_TANGENT\n            vec3 c1 = cross(norm, vec3(0.0, 0.0, 1.0));\n//            vec3 c2 = cross(norm, vec3(0.0, 1.0, 0.0));\n//            if(length(c1)>length(c2)) tangent = c2;\n//                else tangent = c1;\n            tangent = c1;\n            tangent = normalize(tangent);\n            binormal = cross(norm, tangent);\n            binormal = normalize(binormal);\n        #endif\n\n        #ifndef CALC_TANGENT\n            tangent=normalize(vTangent);\n//            tangent.y*=-13.0;\n//            binormal=vBiTangent*norm;\n//            binormal.z*=-1.0;\n//            binormal=normalize(binormal);\n            binormal=normalize( cross( normalize(norm), normalize(vBiTangent) ));\n        // vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n        #endif\n\n        tnorm=normalize(tangent*tnorm.x + binormal*tnorm.y + norm*tnorm.z);\n\n        // vec3 n = normalize( mat3(normalMatrix) * (norm+tnorm*normalScale) );\n        vec3 n = normalize( mat3(normalMatrix) * (norm+tnorm*normalScale) );\n\n        vec3 re = reflect( e, n );\n        float m = 2. * sqrt(\n            pow(re.x, 2.0)+\n            pow(re.y, 2.0)+\n            pow(re.z + 1.0, 2.0)\n        );\n\n        vn = (re.xy / m + 0.5);\n\n    #endif\n\n// vn=clamp(vn,0.0,1.0);\n\n\n\n\n\n    vec4 col = texture( tex, vn );\n\n    #ifdef HAS_DIFFUSE_TEXTURE\n        col = col*texture( texDiffuse, texCoords);\n    #endif\n\n    col.r*=r;\n    col.g*=g;\n    col.b*=b;\n\n\n    #ifdef HAS_AO_TEXTURE\n        col = col*\n            mix(\n                vec4(1.0,1.0,1.0,1.0),\n                texture( texAo, texCoords),\n                aoIntensity\n                );\n    #endif\n\n    #ifdef USE_SPECULAR_TEXTURE\n        vec4 spec = texture( texSpecMatCap, vn );\n        spec*= texture( texSpec, texCoords );\n        col+=spec;\n    #endif\n\n    col.a*=opacity;\n    #ifdef HAS_TEXTURE_OPACITY\n            #ifdef TRANSFORMALPHATEXCOORDS\n                texCoords=vec2(texCoord.s,1.0-texCoord.t);\n            #endif\n            #ifdef ALPHA_MASK_ALPHA\n                col.a*=texture(texOpacity,texCoords).a;\n            #endif\n            #ifdef ALPHA_MASK_LUMI\n                col.a*=dot(vec3(0.2126,0.7152,0.0722), texture(texOpacity,texCoords).rgb);\n            #endif\n            #ifdef ALPHA_MASK_R\n                col.a*=texture(texOpacity,texCoords).r;\n            #endif\n            #ifdef ALPHA_MASK_G\n                col.a*=texture(texOpacity,texCoords).g;\n            #endif\n            #ifdef ALPHA_MASK_B\n                col.a*=texture(texOpacity,texCoords).b;\n            #endif\n            // #endif\n    #endif\n\n    {{MODULE_COLOR}}\n\n\n    // #ifdef PER_PIXEL\n\n\n    //     vec2 nn=(vn-0.5)*2.0;\n    //     float ll=length( nn );\n    //     // col.r=0.0;\n    //     // col.b=0.0;\n    //     // col.a=1.0;\n\n    //     // if(ll>0.49 && ll<0.51) col=vec4(0.0,1.0,0.0,1.0);\n    //     // if(ll>0. ) col=vec4(0.0,1.0,0.0,1.0);\n    //     // col=vec4(vn,0.0,1.0);\n\n\n    //     float dd=(vn.x-0.5)*(vn.x-0.5) + (vn.y-0.5)*(vn.y-0.5);\n    //     dd*=4.0;\n\n    //     if(dd>0.94)\n    //     {\n    //     col=vec4(0.0,1.0,0.0,1.0);\n    //         // nn*=0.5;\n    //         // nn+=0.5;\n    //         // nn*=2.0;\n    //         // vn=nn;\n\n    //         // // dd=1.0;\n    //     }\n    //     // else dd=0.0;\n\n    //     // col=vec4(vec3(dd),1.0);\n\n    //     // if(dd>0.95) col=vec4(1.0,0.0,0.0,1.0);\n\n    //     // vec2 test=(vec2(1.0,1.0)-0.5)*2.0;\n    //     // col=vec4(0.0,0.0,length(test),1.0);\n\n    // #endif\n\n\n\n    outColor = col;\n\n}",matcap_vert:"\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\nIN float attrVertIndex;\nIN vec3 attrTangent;\nIN vec3 attrBiTangent;\n\n#ifdef HAS_NORMAL_TEXTURE\n\n   OUT vec3 vBiTangent;\n   OUT vec3 vTangent;\n#endif\n\nOUT vec2 texCoord;\nOUT vec3 norm;\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nOUT vec3 vNorm;\nOUT vec3 e;\n\nUNI vec2 texOffset;\nUNI vec2 texRepeat;\n\n\n#ifndef INSTANCING\n    UNI mat4 normalMatrix;\n#endif\n\n\n{{MODULES_HEAD}}\n\n#ifdef CALC_SSNORMALS\n    // from https://www.enkisoftware.com/devlogpost-20150131-1-Normal_generation_in_the_pixel_shader\n    OUT vec3 eye_relative_pos;\n#endif\n\nUNI vec3 camPos;\n\n\n// mat3 transposeMat3(mat3 m)\n// {\n//     return mat3(m[0][0], m[1][0], m[2][0],\n//         m[0][1], m[1][1], m[2][1],\n//         m[0][2], m[1][2], m[2][2]);\n// }\n\n// mat3 inverseMat3(mat3 m)\n// {\n//     float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n//     float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n//     float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n//     float b01 = a22 * a11 - a12 * a21;\n//     float b11 = -a22 * a10 + a12 * a20;\n//     float b21 = a21 * a10 - a11 * a20;\n\n//     float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n//     return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n//         b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n//         b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n// }\n\nvoid main()\n{\n    texCoord=texRepeat*attrTexCoord+texOffset;\n    norm=attrVertNormal;\n    mat4 mMatrix=modelMatrix;\n    mat4 mvMatrix;\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n\n    #ifdef HAS_NORMAL_TEXTURE\n        vTangent=attrTangent;\n        vBiTangent=attrBiTangent;\n    #endif\n\n    vec4 pos = vec4( vPosition, 1. );\n\n    {{MODULE_VERTEX_POSITION}}\n\n\n    mvMatrix= viewMatrix * mMatrix;\n\n    #ifdef INSTANCING\n        mat4 normalMatrix=mvMatrix;//inverse(transpose(mvMatrix));\n        // mat4 normalMatrix = mat4(transposeMat3(inverseMat3(mat3(mMatrix))));\n\n    #endif\n\n\n    mat3 wmMatrix=mat3(mMatrix);\n\n    e = normalize( vec3( mvMatrix * pos )  );\n    vec3 n = normalize( mat3(normalMatrix*viewMatrix) * (norm) );\n\n    #ifdef PER_PIXEL\n        vNorm=n;\n    #endif\n    #ifndef PER_PIXEL\n        //matcap\n        vec3 r = reflect( e, n );\n\n        // float m = 2. * sqrt(\n        //     pow(r.x, 2.0)+\n        //     pow(r.y, 2.0)+\n        //     pow(r.z + 1.0, 2.0)\n        // );\n\n        float m = 2.58284271247461903 * sqrt(length(r));\n\n        vNorm.xy = r.xy / m + 0.5;\n\n    #endif\n\n\n\n    #ifdef DO_PROJECT_COORDS_XY\n       texCoord=(projMatrix * mvMatrix*pos).xy*0.1;\n    #endif\n\n    #ifdef DO_PROJECT_COORDS_YZ\n       texCoord=(projMatrix * mvMatrix*pos).yz*0.1;\n    #endif\n\n    #ifdef DO_PROJECT_COORDS_XZ\n        texCoord=(projMatrix * mvMatrix*pos).xz*0.1;\n    #endif\n\n    #ifdef CALC_SSNORMALS\n        eye_relative_pos = (mvMatrix * pos ).xyz - camPos;\n    #endif\n\n\n\n   gl_Position = projMatrix * mvMatrix * pos;\n\n}",};
const
    render=op.inTrigger("render"),
    textureMatcap=op.inTexture('MatCap'),
    textureDiffuse=op.inTexture('Diffuse'),
    textureNormal=op.inTexture('Normal'),
    textureSpec=op.inTexture('Specular'),
    textureSpecMatCap=op.inTexture('Specular MatCap'),
    textureAo=op.inTexture('AO Texture'),
    textureOpacity=op.inTexture("Opacity Texture"),
    r=op.inValueSlider('r',1),
    g=op.inValueSlider('g',1),
    b=op.inValueSlider('b',1),
    pOpacity=op.inValueSlider("Opacity",1),
    aoIntensity=op.inValueSlider("AO Intensity",1.0),
    repeatX=op.inValue("Repeat X",1),
    repeatY=op.inValue("Repeat Y",1),
    offsetX=op.inValue("Offset X",0),
    offsetY=op.inValue("Offset Y",0),
    calcTangents = op.inValueBool("calc normal tangents",true),
    projectCoords=op.inValueSelect('projectCoords',['no','xy','yz','xz'],'no'),
    ssNormals=op.inValueBool("Screen Space Normals"),
    next=op.outTrigger("trigger"),
    shaderOut=op.outObject("Shader");

r.setUiAttribs({colorPick:true});

const alphaMaskSource=op.inSwitch("Alpha Mask Source",["Luminance","R","G","B","A"],"Luminance");
alphaMaskSource.setUiAttribs({ greyout:true });

const texCoordAlpha=op.inValueBool("Opacity TexCoords Transform",false);
const discardTransPxl=op.inValueBool("Discard Transparent Pixels");

op.setPortGroup("Texture Opacity",[alphaMaskSource, texCoordAlpha, discardTransPxl]);
op.setPortGroup("Texture maps",[textureDiffuse,textureNormal,textureSpec,textureSpecMatCap,textureAo, textureOpacity]);
op.setPortGroup("Color",[r,g,b,pOpacity]);

const cgl=op.patch.cgl;
const shader=new CGL.Shader(cgl,'MatCapMaterialNew');
var uniOpacity=new CGL.Uniform(shader,'f','opacity',pOpacity);

shader.setModules(['MODULE_VERTEX_POSITION','MODULE_COLOR','MODULE_BEGIN_FRAG']);
shader.setSource(attachments.matcap_vert,attachments.matcap_frag);
shaderOut.set(shader);

var textureMatcapUniform=null;
var textureDiffuseUniform=null;
var textureNormalUniform=null;
var textureSpecUniform=null;
var textureSpecMatCapUniform=null;
var textureAoUniform=null;
const offsetUniform=new CGL.Uniform(shader,'2f','texOffset',offsetX,offsetY);
const repeatUniform=new CGL.Uniform(shader,'2f','texRepeat',repeatX,repeatY);

var aoIntensityUniform=new CGL.Uniform(shader,'f','aoIntensity',aoIntensity);
b.uniform=new CGL.Uniform(shader,'f','b',b);
g.uniform=new CGL.Uniform(shader,'f','g',g);
r.uniform=new CGL.Uniform(shader,'f','r',r);


calcTangents.onChange=updateDefines;
updateDefines();
updateMatcap();

function updateDefines()
{
    if(calcTangents.get()) shader.define('CALC_TANGENT');
        else shader.removeDefine('CALC_TANGENT');

}

ssNormals.onChange=function()
{
    if(ssNormals.get())
    {
        if(cgl.glVersion<2)
        {
            cgl.gl.getExtension('OES_standard_derivatives');
            shader.enableExtension('GL_OES_standard_derivatives');
        }

        shader.define('CALC_SSNORMALS');
    }
    else shader.removeDefine('CALC_SSNORMALS');
};

projectCoords.onChange=function()
{
    shader.toggleDefine('DO_PROJECT_COORDS_XY',projectCoords.get()=='xy');
    shader.toggleDefine('DO_PROJECT_COORDS_YZ',projectCoords.get()=='yz');
    shader.toggleDefine('DO_PROJECT_COORDS_XZ',projectCoords.get()=='xz');
};

textureMatcap.onChange=updateMatcap;

function updateMatcap()
{
    if(textureMatcap.get())
    {
        if(textureMatcapUniform!==null)return;
        shader.removeUniform('tex');
        textureMatcapUniform=new CGL.Uniform(shader,'t','tex',0);
    }
    else
    {
        if(!CGL.defaultTextureMap)
        {
            var pixels=new Uint8Array(256*4);
            for(var x=0;x<16;x++)
            {
                for(var y=0;y<16;y++)
                {
                    var c=y*16;
                    c*=Math.min(1,(x+y/3)/8);
                    pixels[(x+y*16)*4+0]=pixels[(x+y*16)*4+1]=pixels[(x+y*16)*4+2]=c;
                    pixels[(x+y*16)*4+3]=255;
                }
            }

            CGL.defaultTextureMap=new CGL.Texture(cgl);
            CGL.defaultTextureMap.initFromData(pixels,16,16);
        }
        textureMatcap.set(CGL.defaultTextureMap);

        shader.removeUniform('tex');
        textureMatcapUniform=new CGL.Uniform(shader,'t','tex',0);
    }
}

textureDiffuse.onChange=function()
{
    if(textureDiffuse.get())
    {
        if(textureDiffuseUniform!==null)return;
        shader.define('HAS_DIFFUSE_TEXTURE');
        shader.removeUniform('texDiffuse');
        textureDiffuseUniform=new CGL.Uniform(shader,'t','texDiffuse',1);
    }
    else
    {
        shader.removeDefine('HAS_DIFFUSE_TEXTURE');
        shader.removeUniform('texDiffuse');
        textureDiffuseUniform=null;
    }
};

textureNormal.onChange=function()
{
    if(textureNormal.get())
    {
        if(textureNormalUniform!==null)return;
        shader.define('HAS_NORMAL_TEXTURE');
        shader.removeUniform('texNormal');
        textureNormalUniform=new CGL.Uniform(shader,'t','texNormal',2);
    }
    else
    {
        shader.removeDefine('HAS_NORMAL_TEXTURE');
        shader.removeUniform('texNormal');
        textureNormalUniform=null;
    }
};

textureAo.onChange=function()
{
    if(textureAo.get())
    {
        if(textureAoUniform!==null)return;
        shader.define('HAS_AO_TEXTURE');
        shader.removeUniform('texAo');
        textureAoUniform=new CGL.Uniform(shader,'t','texAo',5);
    }
    else
    {
        shader.removeDefine('HAS_AO_TEXTURE');
        shader.removeUniform('texAo');
        textureAoUniform=null;
    }
};

textureSpec.onChange=textureSpecMatCap.onChange=function()
{
    if(textureSpec.get() && textureSpecMatCap.get())
    {
        if(textureSpecUniform!==null)return;
        shader.define('USE_SPECULAR_TEXTURE');
        shader.removeUniform('texSpec');
        shader.removeUniform('texSpecMatCap');
        textureSpecUniform=new CGL.Uniform(shader,'t','texSpec',3);
        textureSpecMatCapUniform=new CGL.Uniform(shader,'t','texSpecMatCap',4);
    }
    else
    {
        shader.removeDefine('USE_SPECULAR_TEXTURE');
        shader.removeUniform('texSpec');
        shader.removeUniform('texSpecMatCap');
        textureSpecUniform=null;
        textureSpecMatCapUniform=null;
    }
};

// TEX OPACITY

function updateAlphaMaskMethod()
{
    if(alphaMaskSource.get()=='Alpha Channel') shader.define('ALPHA_MASK_ALPHA');
        else shader.removeDefine('ALPHA_MASK_ALPHA');

    if(alphaMaskSource.get()=='Luminance') shader.define('ALPHA_MASK_LUMI');
        else shader.removeDefine('ALPHA_MASK_LUMI');

    if(alphaMaskSource.get()=='R') shader.define('ALPHA_MASK_R');
        else shader.removeDefine('ALPHA_MASK_R');

    if(alphaMaskSource.get()=='G') shader.define('ALPHA_MASK_G');
        else shader.removeDefine('ALPHA_MASK_G');

    if(alphaMaskSource.get()=='B') shader.define('ALPHA_MASK_B');
        else shader.removeDefine('ALPHA_MASK_B');
}
alphaMaskSource.onChange=updateAlphaMaskMethod;

var textureOpacityUniform = null;

function updateOpacity()
{

    if(textureOpacity.get())
    {
        if(textureOpacityUniform!==null)return;
        shader.removeUniform('texOpacity');
        shader.define('HAS_TEXTURE_OPACITY');
        if(!textureOpacityUniform) textureOpacityUniform=new CGL.Uniform(shader,'t','texOpacity',6);

        alphaMaskSource.setUiAttribs({greyout:false});
        discardTransPxl.setUiAttribs({greyout:false});
        texCoordAlpha.setUiAttribs({greyout:false});

    }
    else
    {
        shader.removeUniform('texOpacity');
        shader.removeDefine('HAS_TEXTURE_OPACITY');
        textureOpacityUniform=null;

        alphaMaskSource.setUiAttribs({greyout:true});
        discardTransPxl.setUiAttribs({greyout:true});
        texCoordAlpha.setUiAttribs({greyout:true});
    }
    updateAlphaMaskMethod();
};
textureOpacity.onChange=updateOpacity;

discardTransPxl.onChange=function()
{
    if(discardTransPxl.get()) shader.define('DISCARDTRANS');
        else shader.removeDefine('DISCARDTRANS');
};


texCoordAlpha.onChange=function()
{
    if(texCoordAlpha.get()) shader.define('TRANSFORMALPHATEXCOORDS');
        else shader.removeDefine('TRANSFORMALPHATEXCOORDS');
};

// function bindTextures()
// {
//      if(textureMatcap.get())     cgl.setTexture(0,textureMatcap.get().tex);
//      if(textureDiffuse.get())    cgl.setTexture(1,textureDiffuse.get().tex);
//      if(textureNormal.get())     cgl.setTexture(2,textureNormal.get().tex);
//      if(textureSpec.get())       cgl.setTexture(3,textureSpec.get().tex);
//      if(textureSpecMatCap.get()) cgl.setTexture(4,textureSpecMatCap.get().tex);
//      if(textureAo.get())         cgl.setTexture(5,textureAo.get().tex);
//      if(textureOpacity.get())    cgl.setTexture(6, textureOpacity.get().tex);
// };

op.onDelete=function()
{
    if(CGL.defaultTextureMap)
    {
        CGL.defaultTextureMap.delete();
        CGL.defaultTextureMap=null;
    }
};

op.preRender=function()
{
    shader.bind();
};

render.onTriggered=function()
{
    // shader.bindTextures=bindTextures;

    shader.popTextures();
    if(textureMatcap.get() && textureMatcapUniform)     shader.pushTexture(textureMatcapUniform,textureMatcap.get().tex);
    if(textureDiffuse.get() && textureDiffuseUniform)    shader.pushTexture(textureDiffuseUniform,textureDiffuse.get().tex);
    if(textureNormal.get() && textureNormalUniform)     shader.pushTexture(textureNormalUniform,textureNormal.get().tex);
    if(textureSpec.get() && textureSpecUniform)       shader.pushTexture(textureSpecUniform,textureSpec.get().tex);
    if(textureSpecMatCap.get() && textureSpecMatCapUniform) shader.pushTexture(textureSpecMatCapUniform,textureSpecMatCap.get().tex);
    if(textureAo.get() && textureAoUniform)         shader.pushTexture(textureAoUniform,textureAo.get().tex);
    if(textureOpacity.get() && textureOpacityUniform)    shader.pushTexture(textureOpacityUniform, textureOpacity.get().tex);


    cgl.pushShader(shader);
    next.trigger();
    cgl.popShader();
};



};

Ops.Gl.Shader.MatCapMaterialNew.prototype = new CABLES.Op();
CABLES.OPS["7857ee9e-6d60-4c30-9bc0-dfdddf2b47ad"]={f:Ops.Gl.Shader.MatCapMaterialNew,objName:"Ops.Gl.Shader.MatCapMaterialNew"};




// **************************************************************
// 
// Ops.Html.CSS_v2
// 
// **************************************************************

Ops.Html.CSS_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const code = op.inStringEditor("css code");

code.setUiAttribs({ "editorSyntax": "css" });

let styleEle = null;
const eleId = "css_" + CABLES.uuid();

code.onChange = update;
update();

function getCssContent()
{
    let css = code.get();
    // css = css.replaceAll("{{ASSETPATH}}", op.patch.getAssetPath());
    css = css.replace(new RegExp("{{ASSETPATH}}", "g"), op.patch.getAssetPath());

    return css;
}

function update()
{
    styleEle = document.getElementById(eleId);

    if (styleEle)
    {
        styleEle.textContent = getCssContent();
    }
    else
    {
        styleEle = document.createElement("style");
        styleEle.type = "text/css";
        styleEle.id = eleId;
        styleEle.textContent = attachments.css_spinner;

        const head = document.getElementsByTagName("body")[0];
        head.appendChild(styleEle);
    }
}

op.onDelete = function ()
{
    styleEle = document.getElementById(eleId);
    if (styleEle)styleEle.remove();
};


};

Ops.Html.CSS_v2.prototype = new CABLES.Op();
CABLES.OPS["a56d3edd-06ad-44ed-9810-dbf714600c67"]={f:Ops.Html.CSS_v2,objName:"Ops.Html.CSS_v2"};




// **************************************************************
// 
// Ops.Physics.World
// 
// **************************************************************

Ops.Physics.World = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const exec = op.inTrigger("Exec"),

    reset = op.inTriggerButton("Reset"),
    doDraw = op.inValueBool("Draw Bodies", true),
    groundPlane = op.inValueBool("Groundplane", false),

    gravX = op.inValue("Gravity X"),
    gravY = op.inValue("Gravity Y", -9.82),
    gravZ = op.inValue("Gravity Z"),

    inIter = op.inInt("Solver Iterations", 13),

    inDefStiff = op.inInt("Contact Stiffness", 1),
    inDefRelax = op.inInt("Contact Relaxation", 4),

    inSimulate = op.inBool("Simulate", true),

    next = op.outTrigger("next"),
    outNum = op.outNumber("Num Bodies");

inDefRelax.onChange =
inDefStiff.onChange =
inIter.onChange =
gravX.onChange =
gravY.onChange =
gravZ.onChange = setGravity;

groundPlane.onChange = setup;

const cgl = op.patch.cgl;
let world = null;
cgl.frameStore = cgl.frameStore || {};

const fixedTimeStep = 1.0 / 60.0; // seconds
const maxSubSteps = 11;
let lastTime;

const meshCube = new CGL.WireframeCube(cgl);
const wireSphere = new CGL.WirePoint(cgl);
const marker = new CGL.Marker(cgl);

reset.onTriggered = function ()
{
    world = null;
};

function setGravity()
{
    if (!world) return;

    world.gravity.set(gravX.get(), gravY.get(), gravZ.get()); // m/s²
    world.solver.iterations = inIter.get();
}

function setup()
{
    world = new CANNON.World();
    world.uuid = CABLES.uuid();

    world.broadphase = new CANNON.NaiveBroadphase();

    world.defaultContactMaterial.contactEquationStiffness = inDefStiff.get() * 1e10;
    world.defaultContactMaterial.contactEquationRelaxation = inDefRelax.get();
    // world.defaultContactMaterial.contactEquationStiffness = 1e10;
    // world.defaultContactMaterial.contactEquationRelaxation = 4;
    // world.defaultContactMaterial.friction = 9999999999999;
    // world.defaultContactMaterial.restitution = 0;

    // world.gravity.set(0,-9.82,0 ); // m/s²
    // world.gravity.set(0,-9.82,0 ); // m/s²
    // world.gravity.set(gravX.get(),gravY.get(),gravZ.get() ); // m/s²
    setGravity();

    if (groundPlane.get())
    {
        // Create a plane
        // var groundBody = new CANNON.Body({
        //     mass: 0 // mass == 0 makes the body static
        // });
        // var groundShape = new CANNON.Plane();
        // groundBody.addShape(groundShape);

        // var rot = new CANNON.Vec3(0,0,1);
        // groundBody.quaternion.setFromAxisAngle(rot, Math.PI/2);
        // groundBody.position.set(0,0,0);
        // groundBody.quaternion.copy(ground.quaternion);
        // groundBody.position.copy(ground.position);

        // var rotY = new CANNON.Quaternion(0,0,0,1);
        // groundBody.quaternion.setFromAxisAngle(
        //     new CANNON.Vec3(0,0,1),
        //     Math.PI/2);
        // groundBody.position.set(0,0,0);
        // groundBody.quaternion = rotY;//.mult(groundBody.quaternion);

        const groundBody = new CANNON.Body({ "mass": 0 });
        groundBody.name = "groundplane";
        const s = 10000;
        groundBody.addShape(new CANNON.Box(new CANNON.Vec3(s, s, s)));
        // groundBody.position.set(0, -s, 0);
        groundBody.position.set(0, -s, 0);

        world.addBody(groundBody);
    }
}

function draw()
{
    // cgl.pushDepthTest(false);

    for (let i = 0; i < world.bodies.length; i++)
    {
        cgl.pushModelMatrix();
        mat4.identity(cgl.mMatrix);
        mat4.translate(cgl.mMatrix, cgl.mMatrix, [world.bodies[i].position.x, world.bodies[i].position.y, world.bodies[i].position.z]);
        // wireSphere.render(cgl, 0.05);
        // marker.draw(cgl, 0.8, true);

        if (world.bodies[i].raycastHit)meshCube.colorShader.setColor([1, 0, 1, 0]);
        else meshCube.colorShader.setColor([0, 1, 1, 1]);

        if (world.bodies[i].shapes[0].type == CANNON.Shape.types.BOX)
        {
            meshCube.render(
                world.bodies[i].shapes[0].halfExtents.x,
                world.bodies[i].shapes[0].halfExtents.y,
                world.bodies[i].shapes[0].halfExtents.z);
        }
        else if (world.bodies[i].shapes[0].type == CANNON.Shape.types.PLANE)
        {
            // op.log("plane!");
        }
        else if (world.bodies[i].shapes[0].type == CANNON.Shape.types.SPHERE)
        {
            // wireSphere.render(cgl, 1.0);
            meshCube.render(
                1.0,
                1.0,
                1.0);
        }
        else if (world.bodies[i].shapes[0].type == CANNON.Shape.types.TRIMESH)
        {
            meshCube.render(
                1.0,
                1.0,
                1.0);
        }
        // else op.log("unknown!", world.bodies[i].shapes[0].type);

        cgl.popModelMatrix();
    }

    // cgl.popDepthTest();
}

exec.onTriggered = function ()
{
    if (!world)setup();
    const old = cgl.frameStore.world;
    cgl.frameStore.world = world;

    next.trigger();

    outNum.set(world.bodies.length);

    const time = performance.now();

    if (inSimulate.get() && lastTime !== undefined)
    {
        const dt = (time - lastTime) / 1000;
        world.step(fixedTimeStep, dt, maxSubSteps);
    }

    lastTime = time;

    if (doDraw.get()) draw();
    cgl.frameStore.world = old;
};


};

Ops.Physics.World.prototype = new CABLES.Op();
CABLES.OPS["78989530-a0cd-49e4-bf54-83ce3220c4b5"]={f:Ops.Physics.World,objName:"Ops.Physics.World"};




// **************************************************************
// 
// Ops.Gl.TextureFromColorArray
// 
// **************************************************************

Ops.Gl.TextureFromColorArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inExe = op.inTrigger("Update"),
    inArr = op.inArray("array"),
    inWidth = op.inValueInt("width", 32),
    inHeight = op.inValueInt("height", 32),
    tfilter = op.inSwitch("Filter", ["nearest", "linear", "mipmap"], "nearest"),
    wrap = op.inValueSelect("Wrap", ["repeat", "mirrored repeat", "clamp to edge"], "repeat"),
    outNext = op.outTrigger("Next"),
    outTex = op.outTexture("Texture out");

inExe.onTriggered = update;

const cgl = op.patch.cgl;
let tex = new CGL.Texture(cgl);

let arrayResized = true;
let pixels = new Uint8Array(8);

let cgl_filter = CGL.Texture.FILTER_NEAREST;
let cgl_wrap = CGL.Texture.WRAP_REPEAT;

tfilter.onChange =
    wrap.onChange =
    inWidth.onChange =
    inHeight.onChange = function ()
    {
        if (tex)tex.delete();
        tex = null;
        arrayResized = true;

        if (tfilter.get() == "nearest") cgl_filter = CGL.Texture.FILTER_NEAREST;
        else if (tfilter.get() == "linear") cgl_filter = CGL.Texture.FILTER_LINEAR;
        else if (tfilter.get() == "mipmap") cgl_filter = CGL.Texture.FILTER_MIPMAP;
        else if (tfilter.get() == "Anisotropic") cgl_filter = CGL.Texture.FILTER_ANISOTROPIC;

        if (wrap.get() == "repeat") cgl_wrap = CGL.Texture.WRAP_REPEAT;
        else if (wrap.get() == "mirrored repeat") cgl_wrap = CGL.Texture.WRAP_MIRRORED_REPEAT;
        else if (wrap.get() == "clamp to edge") cgl_wrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;
    };

const emptyTex = CGL.Texture.getEmptyTexture(cgl);

function update()
{
    let error = false;
    let w = inWidth.get();
    let h = inHeight.get();
    let data = inArr.get();

    if (w <= 0 || h <= 0 || !data) error = true;

    if (error)
    {
        outTex.set(emptyTex);
        return;
    }

    if (arrayResized)
    {
        pixels = new Uint8Array(w * h * 4);
        arrayResized = false;
    }
    let i = 0;

    for (i = 0; i < data.length; i++)
    {
        pixels[i] = data[i] * 255;
    }
    for (i = data.length; i < w * h * 4; i++)
    {
        pixels[i] = 255;
    }

    if (!tex)tex = new CGL.Texture(cgl);

    tex.initFromData(pixels, w, h, cgl_filter, cgl_wrap);

    outTex.set(tex);

    outNext.trigger();
}


};

Ops.Gl.TextureFromColorArray.prototype = new CABLES.Op();
CABLES.OPS["7984c105-5b33-471a-833c-0fb310916e30"]={f:Ops.Gl.TextureFromColorArray,objName:"Ops.Gl.TextureFromColorArray"};




// **************************************************************
// 
// Ops.Json.ObjectGetArray_v2
// 
// **************************************************************

Ops.Json.ObjectGetArray_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    data = op.inObject("data"),
    key = op.inString("key"),
    result = op.outArray("result"),
    arrLength = op.outValue("Length");

result.ignoreValueSerialize = true;
data.ignoreValueSerialize = true;

data.onChange = update;

key.onChange = function ()
{
    op.setUiAttrib({ "extendTitle": key.get() });
    update();
};

function update()
{
    result.set(null);
    const dat = data.get();
    const k = key.get();
    if (dat && dat.hasOwnProperty(k))
    {
        result.set(dat[k]);
        arrLength.set(result.get().length);
    }
    else
    {
        arrLength.set(0);
    }
}


};

Ops.Json.ObjectGetArray_v2.prototype = new CABLES.Op();
CABLES.OPS["7c06a818-9c07-493a-8c4f-04eb2c7796f5"]={f:Ops.Json.ObjectGetArray_v2,objName:"Ops.Json.ObjectGetArray_v2"};




// **************************************************************
// 
// Ops.Array.Array1toX
// 
// **************************************************************

Ops.Array.Array1toX = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inArr = op.inArray("Array1x"),
    format = op.inSwitch("Format", ["AB", "ABC", "ABCD"], "ABC"),
    axisA = op.inSwitch("A", ["Input", "index", "0-1", "-1-1", "0", "1"], "Input"),
    axisB = op.inSwitch("B", ["Input", "index", "0-1", "-1-1", "0", "1"], "0-1"),
    axisC = op.inSwitch("C", ["Input", "index", "0-1", "-1-1", "0", "1"], "0"),
    axisD = op.inSwitch("D", ["Input", "index", "0-1", "-1-1", "0", "1"], "0"),
    outArr = op.outArray("Array3x"),
    outTotalPoints = op.outNumber("Total points"),
    outArrayLength = op.outNumber("Array length");

const arr = [];

axisA.onChange =
axisB.onChange =
axisC.onChange =
axisD.onChange =
inArr.onChange = update;

format.onChange = function ()
{
    axisC.setUiAttribs({ "greyout": format.get().length < 3 });
    axisD.setUiAttribs({ "greyout": format.get().length < 4 });

    update();
};

function fillArr_0(off, num, stride)
{
    for (let i = 0; i < num; i += stride)
    {
        arr[i + off] = 0;
    }
}

function fillArr_1(off, num, stride)
{
    for (let i = 0; i < num; i += stride)
    {
        arr[i + off] = 1;
    }
}

function fillArr_input(off, num, stride)
{
    const theArray = inArr.get();
    for (let i = 0; i < num; i += stride)
    {
        arr[i + off] = theArray[i / stride];
    }
}

function fillArr_01(off, num, stride)
{
    for (let i = 0; i < num; i += stride)
    {
        arr[i + off] = (i / (num)) || 0;
    }
}

function fillArr_index(off, num, stride)
{
    for (let i = 0; i < num; i += stride)
    {
        arr[i + off] = i / stride;
    }
}

function fillArr(off, meth, stride)
{
    if (meth == "0")fillArr_0(off, arr.length, stride);
    if (meth == "0-1")fillArr_01(off, arr.length, stride);
    if (meth == "1")fillArr_1(off, arr.length, stride);
    if (meth == "Input")fillArr_input(off, arr.length, stride);
    if (meth == "index")fillArr_index(off, arr.length, stride);
}

function update()
{
    const theArray = inArr.get();
    if (!theArray)
    {
        outArr.set(null);
        outTotalPoints.set(0);
        outArrayLength.set(0);
        return;
    }

    const stride = format.get().length;
    const l = theArray.length * stride;
    arr.length = l;

    if (stride >= 2) fillArr(0, axisA.get(), stride);
    if (stride >= 2) fillArr(1, axisB.get(), stride);
    if (stride >= 3) fillArr(2, axisC.get(), stride);
    if (stride >= 4) fillArr(3, axisD.get(), stride);

    // for(var i=0;i<theArray.length;i++)
    // {
    //     arr[i*3+0]=i;
    //     arr[i*3+1]=theArray[i];
    //     arr[i*3+2]=0;
    // }

    outArr.set(null);
    outArr.set(arr);
    outTotalPoints.set(arr.length / stride);
    outArrayLength.set(arr.length);
}


};

Ops.Array.Array1toX.prototype = new CABLES.Op();
CABLES.OPS["6a8947be-79c8-4998-9853-1e0912654800"]={f:Ops.Array.Array1toX,objName:"Ops.Array.Array1toX"};




// **************************************************************
// 
// Ops.Array.InfoArray
// 
// **************************************************************

Ops.Array.InfoArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inArr=op.inArray("Array"),
    outMin=op.outValue("Min"),
    outMax=op.outValue("Max"),
    outAvg=op.outValue("Average");

inArr.onChange=function()
{
    var arr=inArr.get();

    var min=999999999;
    var max=-999999999;
    var avg=0;

    if(arr)
    {
        for(var i=0;i<arr.length;i++)
        {
            avg+=arr[i];
            min=Math.min(min,arr[i]);
            max=Math.max(max,arr[i]);
        }
        avg/=arr.length;
    }
    outMin.set(min);
    outMax.set(max);
    outAvg.set(avg);
};

};

Ops.Array.InfoArray.prototype = new CABLES.Op();
CABLES.OPS["1db230c8-212f-4679-87d6-3531659363da"]={f:Ops.Array.InfoArray,objName:"Ops.Array.InfoArray"};




// **************************************************************
// 
// Ops.Array.MapRangeArray
// 
// **************************************************************

Ops.Array.MapRangeArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const result = op.outArray('result');
const v = op.inArray('array');
const old_min = op.inValueFloat('old min');
const old_max = op.inValueFloat('old max');
const new_min = op.inValueFloat('new min');
const new_max = op.inValueFloat('new max');
const easing = op.inValueSelect('Easing', ['Linear', 'Smoothstep', 'Smootherstep'], 'Linear');

op.setPortGroup('Input Range', [old_min, old_max]);
op.setPortGroup('Output Range', [new_min, new_max]);

let ease = 0;
let r = 0;

easing.onChange = function() {
  if (easing.get() === 'Smoothstep') {
    ease = 1;
  } else if (easing.get() === 'Smootherstep') {
    ease = 2;
  } else {
    ease = 0;
  }
};


function exec() {
  const inArray = v.get();
  if (!inArray || inArray.length === 0) {
    result.set([]);
    return;
  }
  const outArray = Array(inArray.length);
  for (let i = 0; i < inArray.length; i++) {
    let x = inArray[i];

    if (x >= Math.max(old_max.get(), old_min.get())) {
      outArray[i] = new_max.get();
    } else if (x <= Math.min(old_max.get(), old_min.get())) {
      outArray[i] = new_min.get();
    } else {

      const nMin = new_min.get();
      const nMax = new_max.get();
      const oMin = old_min.get();
      const oMax = old_max.get();

      let reverseInput = false;
      const oldMin = Math.min(oMin, oMax);
      const oldMax = Math.max(oMin, oMax);
      if (oldMin !== oMin) reverseInput = true;

      let reverseOutput = false;
      const newMin = Math.min(nMin, nMax);
      const newMax = Math.max(nMin, nMax);
      if (newMin !== nMin) reverseOutput = true;

      let portion = 0;

      if (reverseInput) {
        portion = (oldMax - x) * (newMax - newMin) / (oldMax - oldMin);
      } else {
        portion = (x - oldMin) * (newMax - newMin) / (oldMax - oldMin);
      }

      if (reverseOutput) {
        r = newMax - portion;
      } else {
        r = portion + newMin;
      }

      if (ease === 0) {
        outArray[i] = r;
      } else if (ease === 1) {
        x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
        outArray[i] = nMin + x * x * (3 - 2 * x) * (nMax - nMin); // smoothstep
      } else if (ease === 2) {
        x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
        outArray[i] = nMin + x * x * x * (x * (x * 6 - 15) + 10) * (nMax - nMin); // smootherstep
      }
    }
  }
  result.set(outArray);
}

v.set(null);
old_min.set(0);
old_max.set(1);
new_min.set(-1);
new_max.set(1);


v.onChange = exec;
old_min.onChange = exec;
old_max.onChange = exec;
new_min.onChange = exec;
new_max.onChange = exec;

result.set(null);

exec();

};

Ops.Array.MapRangeArray.prototype = new CABLES.Op();
CABLES.OPS["20f921bf-adc2-45fb-b387-834af4f5e19b"]={f:Ops.Array.MapRangeArray,objName:"Ops.Array.MapRangeArray"};




// **************************************************************
// 
// Ops.Array.ArrayLength
// 
// **************************************************************

Ops.Array.ArrayLength = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    array=op.inArray("array"),
    outLength=op.outValue("length");

outLength.ignoreValueSerialize=true;

function update()
{
    var l=0;
    if(array.get()) l=array.get().length;
    else l=-1;
    outLength.set(l);
}

array.onChange=update;


};

Ops.Array.ArrayLength.prototype = new CABLES.Op();
CABLES.OPS["ea508405-833d-411a-86b4-1a012c135c8a"]={f:Ops.Array.ArrayLength,objName:"Ops.Array.ArrayLength"};




// **************************************************************
// 
// Ops.Vars.VarSetString_v2
// 
// **************************************************************

Ops.Vars.VarSetString_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const val=op.inString("Value","New String");
op.varName=op.inDropDown("Variable",[],"",true);

new CABLES.VarSetOpWrapper(op,"string",val,op.varName);




};

Ops.Vars.VarSetString_v2.prototype = new CABLES.Op();
CABLES.OPS["0b4d9229-8024-4a30-9cc0-f6653942c2e4"]={f:Ops.Vars.VarSetString_v2,objName:"Ops.Vars.VarSetString_v2"};




// **************************************************************
// 
// Ops.Vars.VarGetString
// 
// **************************************************************

Ops.Vars.VarGetString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var val=op.outString("Value");
op.varName=op.inValueSelect("Variable",[],"",true);

new CABLES.VarGetOpWrapper(op,"string",op.varName,val);


};

Ops.Vars.VarGetString.prototype = new CABLES.Op();
CABLES.OPS["3ad08cfc-bce6-4175-9746-fef2817a3b12"]={f:Ops.Vars.VarGetString,objName:"Ops.Vars.VarGetString"};




// **************************************************************
// 
// Ops.Html.LoadingIndicator
// 
// **************************************************************

Ops.Html.LoadingIndicator = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={css_ellipsis_css:".lds-ellipsis {\n\n}\n.lds-ellipsis div {\n  position: absolute;\n  /*top: 33px;*/\n  margin-top:-12px;\n  margin-left:-13px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  background: #fff;\n  animation-timing-function: cubic-bezier(0, 1, 1, 0);\n}\n.lds-ellipsis div:nth-child(1) {\n  left: 8px;\n  animation: lds-ellipsis1 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(2) {\n  left: 8px;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(3) {\n  left: 32px;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(4) {\n  left: 56px;\n  animation: lds-ellipsis3 0.6s infinite;\n}\n@keyframes lds-ellipsis1 {\n  0% {\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes lds-ellipsis3 {\n  0% {\n    transform: scale(1);\n  }\n  100% {\n    transform: scale(0);\n  }\n}\n@keyframes lds-ellipsis2 {\n  0% {\n    transform: translate(0, 0);\n  }\n  100% {\n    transform: translate(24px, 0);\n  }\n}\n",css_ring_css:".lds-ring {\n}\n.lds-ring div {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  border: 3px solid #fff;\n  border-radius: 50%;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: #fff transparent transparent transparent;\n}\n.lds-ring div:nth-child(1) {\n  animation-delay: -0.45s;\n}\n.lds-ring div:nth-child(2) {\n  animation-delay: -0.3s;\n}\n.lds-ring div:nth-child(3) {\n  animation-delay: -0.15s;\n}\n@keyframes lds-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n",css_spinner_css:"._cables_spinner {\n  /*width: 40px;*/\n  /*height: 40px;*/\n  /*margin: 100px auto;*/\n  background-color: #777;\n\n  border-radius: 100%;\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n  animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes sk-scaleout {\n  0% { -webkit-transform: scale(0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 100% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n    opacity: 0;\n  }\n}",};
const
    inVisible = op.inBool("Visible", false),
    inStyle = op.inSwitch("Style", ["Spinner", "Ring", "Ellipsis"], "Ring");

const div = document.createElement("div");
div.dataset.op = op.id;
const canvas = op.patch.cgl.canvas.parentElement;

inStyle.onChange = updateStyle;

div.appendChild(document.createElement("div"));
div.appendChild(document.createElement("div"));
div.appendChild(document.createElement("div"));

const size = 50;

div.style.width = size + "px";
div.style.height = size + "px";
div.style.top = "50%";
div.style.left = "50%";
// div.style.border="1px solid red";

div.style["margin-left"] = "-" + size / 2 + "px";
div.style["margin-top"] = "-" + size / 2 + "px";

div.style.position = "absolute";
div.style["z-index"] = "9999999";

inVisible.onChange = updateVisible;

let eleId = "css_loadingicon_" + CABLES.uuid();

const styleEle = document.createElement("style");
styleEle.type = "text/css";
styleEle.id = eleId;

let head = document.getElementsByTagName("body")[0];
head.appendChild(styleEle);

op.onDelete = remove;

updateStyle();

function updateStyle()
{
    const st = inStyle.get();
    if (st == "Spinner")
    {
        div.classList.add("_cables_spinner");
        styleEle.textContent = attachments.css_spinner_css;
    }
    else div.classList.remove("_cables_spinner");

    if (st == "Ring")
    {
        div.classList.add("lds-ring");
        styleEle.textContent = attachments.css_ring_css;
    }
    else div.classList.remove("lds-ring");

    if (st == "Ellipsis")
    {
        div.classList.add("lds-ellipsis");
        styleEle.textContent = attachments.css_ellipsis_css;
    }
    else div.classList.remove("lds-ellipsis");
}

function remove()
{
    div.remove();
}

function updateVisible()
{
    remove();
    if (inVisible.get()) canvas.appendChild(div);
}


};

Ops.Html.LoadingIndicator.prototype = new CABLES.Op();
CABLES.OPS["e102834c-6dcf-459c-9e22-44ebccfc0d3b"]={f:Ops.Html.LoadingIndicator,objName:"Ops.Html.LoadingIndicator"};




// **************************************************************
// 
// Ops.Array.ArrayGetNumber
// 
// **************************************************************

Ops.Array.ArrayGetNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    array=op.inArray("array"),
    index=op.inValueInt("index"),
    value=op.outValue("value");

array.ignoreValueSerialize=true;

index.onChange=array.onChange=update;

function update()
{
    if(array.get())
    {
        var input=array.get()[index.get()];
        if(isNaN(input))
        {
            value.set(NaN);
            return;
        }
        value.set(input);
    }
}


};

Ops.Array.ArrayGetNumber.prototype = new CABLES.Op();
CABLES.OPS["d1189078-70cf-437d-9a37-b2ebe89acdaf"]={f:Ops.Array.ArrayGetNumber,objName:"Ops.Array.ArrayGetNumber"};




// **************************************************************
// 
// Ops.String.Split_v2
// 
// **************************************************************

Ops.String.Split_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    inString = op.inStringEditor("Input String", "1,2,3"),
    separator = op.inString("Separator", ","),
    splitNewLines = op.inBool("Split Lines", false),
    outArray = op.outArray("Result");

separator.onChange =
    inString.onChange = exec;

exec();

splitNewLines.onChange = () =>
{
    separator.setUiAttribs({ "greyout": splitNewLines.get() });
    exec();
};

function exec()
{
    let s = inString.get();
    if (s)
    {
        let arr;
        if (splitNewLines.get())arr = s.split("\n");
        else arr = s.split(separator.get());
        outArray.set(arr);
    }
}


};

Ops.String.Split_v2.prototype = new CABLES.Op();
CABLES.OPS["3585e0c5-f738-43e9-aa96-8582d1ea97dd"]={f:Ops.String.Split_v2,objName:"Ops.String.Split_v2"};




// **************************************************************
// 
// Ops.Patch.CallBack_v2
// 
// **************************************************************

Ops.Patch.CallBack_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const exe = op.inTriggerButton("exe");
const callbackname = op.inString("Callback Name", "myFunction");
const val0 = op.inString("Parameter 1", "");
const val1 = op.inString("Parameter 2", "");
const val2 = op.inString("Parameter 3", "");

let values = [0, 0, 0];

val0.onChange = function () { values[0] = val0.get(); };
val1.onChange = function () { values[1] = val1.get(); };
val2.onChange = function () { values[2] = val2.get(); };

exe.onTriggered = function ()
{
    if (op.patch.config.hasOwnProperty(callbackname.get()))
    {
        op.patch.config[callbackname.get()](values);
    }
    else
    {
        op.log("callback ", callbackname.get(), " not found! Parameters: ", values);
    }
};


};

Ops.Patch.CallBack_v2.prototype = new CABLES.Op();
CABLES.OPS["cfc87cb1-a74b-482f-9fad-e1777cb7ffd4"]={f:Ops.Patch.CallBack_v2,objName:"Ops.Patch.CallBack_v2"};




// **************************************************************
// 
// Ops.Value.ValueChangedTrigger
// 
// **************************************************************

Ops.Value.ValueChangedTrigger = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    val = op.inFloat("Value", 0),
    exe = op.inTrigger("Execute"),
    trigger = op.outTrigger("trigger");

let changed = false;

exe.onTriggered = function ()
{
    if (changed)
    {
        changed = false;
        trigger.trigger();
    }
};

val.onChange = function ()
{
    changed = true;
};


};

Ops.Value.ValueChangedTrigger.prototype = new CABLES.Op();
CABLES.OPS["9f353fcc-da0b-4af8-ae5c-4edd256fc9e3"]={f:Ops.Value.ValueChangedTrigger,objName:"Ops.Value.ValueChangedTrigger"};




// **************************************************************
// 
// Ops.Trigger.GateTrigger
// 
// **************************************************************

Ops.Trigger.GateTrigger = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    exe = op.inTrigger('Execute'),
    passThrough = op.inValueBool('Pass Through',true),
    triggerOut = op.outTrigger('Trigger out');

exe.onTriggered = function()
{
    if(passThrough.get())
        triggerOut.trigger();
}


};

Ops.Trigger.GateTrigger.prototype = new CABLES.Op();
CABLES.OPS["65e8b8a2-ba13-485f-883a-2bcf377989da"]={f:Ops.Trigger.GateTrigger,objName:"Ops.Trigger.GateTrigger"};


window.addEventListener('load', function(event) {
CABLES.jsLoaded=new Event('CABLES.jsLoaded');
document.dispatchEvent(CABLES.jsLoaded);
});
