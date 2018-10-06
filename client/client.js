const API_URL = 'http://localhost:5000/search/minneapolis/'

const app = new Vue({
    el: '#app',
    data: {
        loading: false,
        term: '',
        terms: [],
        activeTerm: null,
        activeResults: [],
        hiddenResults: {}
    },
    mounted() {
        if (localStorage.terms) {
            this.terms = JSON.parse(localStorage.terms);
        }

        if (localStorage.hiddenResults) {
            this.hiddenResults = JSON.parse(localStorage.hiddenResults);
        }
    },
    methods: {
        addTerm() {
            if (this.term && !this.terms.includes(this.term)) {
                this.terms.push(this.term)
                localStorage.terms = JSON.stringify(this.terms);
            }
        },
        setActiveTerm(term) {
            this.activeResults = [];
            this.activeTerm = term;
            this.loading = true;
            const url = `${API_URL}${term}`;
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.activeResults = json.results;
                    this.loading = false;
                });
        },
        hideResult(result) {
            this.$set(this.hiddenResults, result.link, true);
            localStorage.hiddenResults = JSON.stringify(this.hiddenResults);
        },
        hideActiveTerm(term) {
            const index = this.terms.indexOf(term);
            this.terms.splice(index, 1);
            localStorage.terms = JSON.stringify(this.terms);
            this.activeResults = [];
            this.activeTerm = '';
        },
    }
});