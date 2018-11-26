<script>
const Json2csvParser = require('json2csv').Parser;

export default {
  name: 'download-mixin',
  data() {
    return {
      downloadEl: null,
      json2excel
    };
  },
  mounted() {
    const el = document.createElement('a');
    el.setAttribute('tabIndex', '-1');
    this.downloadEl = el;
  },
  methods: {
    download(filetype, fileName, data) {
      if (filetype === 'json') {
        this.downloadJSON(fileName, data);
      } else if (filetype === 'excel') {
        this.downloadExcel(filename, data);
      }
    },
    downloadExcel(fileName, data) {
      const parser = new Json2csvParser();
      const csv = parser.parse(data);
      const file = new Blob([csv], {type: 'text/csv'});
      this.downloadEl.href = URL.createObjectURL(file);
      const date = Date.now();
      this.downloadEl.download = `${fileName}-${date}.csv`;
      this.downloadEl.click();
    },
    downloadJSON(fileName, data) {
      const fileData = JSON.stringify(data);
      const file = new Blob([fileData], {type: 'application/json'});
      this.downloadEl.href = URL.createObjectURL(file);
      const date = Date.now();
      this.downloadEl.download = `${fileName}-${date}.json`;
      this.downloadEl.click();
    }
  }
}
</script>
