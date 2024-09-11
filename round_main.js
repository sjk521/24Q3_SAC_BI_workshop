class ChartPlotareaComponent extends HTMLElement {
    constructor() {
        super();

        // 기본 설정 값 초기화
        this._rounded = true;

        // Shadow DOM 초기화 및 컨테이너 요소 생성
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._containerElement = document.createElement('div');
        this._containerElement.className = 'chart-overlay-container';
        this._containerElement.style.position = 'relative'; 
        this._containerElement.style.pointerEvents = 'none';
        this._containerElement.style.overflow = 'hidden';
        this._shadowRoot.appendChild(this._containerElement);
    }

    /**
     * 사용자 설정 데이터와 함께 차트를 설정합니다.
     */
    setExtensionData(extensionData) {
        console.log(extensionData);
        const { chartType, isHorizontal, chartSize, series } = extensionData;
        this._size = chartSize;
        this._series = series;
        this._chartType = chartType;
        this._isHorizontal = isHorizontal;
        this.render();
    }


    /**
     * 차트의 plotarea를 렌더링합니다.
     */
    render() {

        if (this._chartType !== 'barcolumn') {
            return;
        }

        const { width: chartWidth, height: chartHeight } = this._size;
        this._containerElement.style.width = `${chartWidth}px`;
        this._containerElement.style.height = `${chartHeight}px`;

 
        this._series[0].dataPoints.forEach((dataPoint) => {
            this.renderData(dataPoint.dataInfo);
        });

    }

    /**
     * 주어진 데이터 마커 정보를 사용하여 마커를 렌더링합니다.
     */
    renderData(dataInfo) {
        if (!dataInfo || dataInfo.hidden || dataInfo.outOfViewport) {
            return;
        }

        const { x, y, width, height, color } = dataInfo;
        const dataMarker = document.createElement('div');
        dataMarker.style.position = 'absolute';
        dataMarker.style.top = `${y}px`;
        dataMarker.style.left = `${x}px`;
        dataMarker.style.width = `${width}px`;
        dataMarker.style.height = `${height}px`;
        dataMarker.style.backgroundColor = color;

        if (this._rounded) {
            const roundedStyle = this._isHorizontal
                ? `border-radius: 0 ${height / 2}px ${height / 2}px 0;`
                : `border-radius: ${width / 2}px ${width / 2}px 0 0;`;
            dataMarker.style.cssText += roundedStyle;
        }

        this._containerElement.appendChild(dataMarker);
    }



    /**
     * 사용자 설정에 따라 데이터 마커가 둥글게 그려질지 설정합니다.
     */
    set rounded(value) {
        this._rounded = value;
        this.render();
    }


} // class ChartPlotareaComponent

customElements.define('viz-plotarea-en', ChartPlotareaComponent);
