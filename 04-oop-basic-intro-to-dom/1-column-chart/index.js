export default class ColumnChart {
  element;
  dataElements = {};
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.render();
  }

  getColumns(data) {
    const maxValue = Math.max(...data);
    return data.map(item => {
      const size = this.chartHeight / maxValue;
      const percent = (item / maxValue * 100).toFixed(0);
      return `<div style="--value: ${Math.floor(item * size)}" data-tooltip="${percent}%"></div>`;
    })
      .join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getTemplate() {
    return (
      `<div class="column-chart column-chart_loading">
         <div class="column-chart__title">
             Total ${this.label}
             ${this.getLink()}
         </div>
         <div class="column-chart__container">
           <div class = "column-chart__header">
             ${this.formatHeading ? this.formatHeading(this.value) : this.value}
           </div>
           <div data-element="data" class="column-chart__chart" style="--value: ${this.chartHeight}">
             ${this.getColumns(this.data)}
           </div>
         </div>
    </div>`);
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
    this.dataElements = this.getDataElements(this.element);
  }

  getDataElements(element) {
    const elements = element.querySelectorAll('[data-element="data"]');
    return elements[0];
  }

  update(data) {
    this.dataElements.innerHTML = this.getColumns(data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
