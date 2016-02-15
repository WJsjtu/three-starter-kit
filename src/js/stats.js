/**
 * Created by jasonwang on 16/2/7.
 */

import Utils from './utils';
require('./../css/stats.css');

export default class Stats {

    get domElement() {
        return this._domElement;
    }

    constructor(height, width) {
        this._height = height || 30;
        this._width = width || 120;
        this._now = ( self.performance && self.performance.now ) ? self.performance.now.bind(self.performance) : Date.now;

        let container = Stats.createDom('div', 'stats');

        // FPS

        let fps = 0, fpsMin = Infinity, fpsMax = 0;
        let fpsDiv = this.createPanel('#0ff', '#002');
        let fpsText = fpsDiv.children[0], fpsGraph = fpsDiv.children[1];
        fpsText.innerHTML = '&nbsp;';
        container.appendChild(fpsDiv);

        // MS
        let ms = 0, msMin = Infinity, msMax = 0;
        let msDiv = this.createPanel('#0f0', '#020');
        let msText = msDiv.children[0], msGraph = msDiv.children[1];
        msText.innerHTML = '&nbsp;';
        container.appendChild(msDiv);

        // MEM
        if (self.performance && self.performance.memory) {
            var mem = 0, memMin = Infinity, memMax = 0;
            var memDiv = this.createPanel('#f08', '#201');
            var memText = memDiv.children[0], memGraph = memDiv.children[1];
            memText.innerHTML = '&nbsp;';
            container.appendChild(memDiv);
        }

        this._domElement = container;

        //
        let frames = 0;
        this._startTime = null;
        this._prevTime = null;
        this.update = () => {
            let time = this._now();
            if (!this._startTime) {
                this._prevTime = this._startTime = time;
                return;
            }
            ms = time - this._startTime;
            msMin = Math.min(msMin, ms);
            msMax = Math.max(msMax, ms);
            msText.textContent = ( ms | 0 ) + ' MS (' + ( msMin | 0 ) + '-' + ( msMax | 0 ) + ')';
            Stats.updateGraph(msGraph, ms / 200);

            frames++;
            if (time > this._prevTime + 1000) {

                fps = Math.round(( frames * 1000 ) / ( time - this._prevTime ));
                fpsMin = Math.min(fpsMin, fps);
                fpsMax = Math.max(fpsMax, fps);

                fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
                Stats.updateGraph(fpsGraph, fps / 100);

                this._prevTime = time;
                frames = 0;
                if (mem !== undefined) {
                    let heapSize = self.performance.memory.usedJSHeapSize;
                    let heapSizeLimit = self.performance.memory.jsHeapSizeLimit;
                    mem = Math.round(heapSize * 0.000000954);
                    memMin = Math.min(memMin, mem);
                    memMax = Math.max(memMax, mem);
                    memText.textContent = mem + ' MB (' + memMin + '-' + memMax + ')';
                    Stats.updateGraph(memGraph, heapSize / heapSizeLimit);
                }
            }
            this._startTime = time;
        };

    }

    createPanel(fgColor, bgColor) {
        let panel = Stats.createDom('div', 'panel'),
            text = Stats.createDom('div', 'text'),
            graph = Stats.createDom('div', 'graph');
        panel.style.background = bgColor;
        text.style.color = graph.style.background = fgColor;
        graph.style.width = this._width + 'px';
        graph.style.height = this._height + 'px';
        panel.appendChild(text);
        panel.appendChild(graph);
        for (let i = 0; i < this._width; i++) {
            let span = Stats.createDom('span', '');
            span.style.background = bgColor;
            span.style.height = this._height + 'px';
            graph.appendChild(span);
        }
        return panel;
    }
};

Stats.createDom = (tag, cls) => {
    return (new Utils.DOM(document.createElement(tag))).addClass(cls).domElement;
};
Stats.updateGraph = (dom, value) => {
    let child = dom.appendChild(dom.firstChild);
    child.style.height = Math.min(30, 30 - value * 30) + 'px';
};