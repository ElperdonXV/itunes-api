const app = new Vue(
    {
        el: '#app',
        data: {
            queryPath: 'https://itunes.apple.com/search',
            text: '',
            results: null,
            value: 'all',
            counter: null,
            details: null,
        },
        methods: {
            callItunes: function(){
                const parametri= {
                    term: this.text,
                    media: this.value,
                    country: 'it',
                }
                axios.get(`${this.queryPath}`, { params: parametri }
                ).then((result)=>{
                    this.results= result.data.results;
                    console.log(this.results);
                }).catch((error)=>{
                    console.log(error);
                });
            },

            show: function(index){
                this.counter = index;
                console.log(this.counter);
                this.details = this.results[this.counter];
                console.log(this.details);
            },

            hide: function(){
                this.counter = null;
                this.details = null;
            }
        }
    }
);