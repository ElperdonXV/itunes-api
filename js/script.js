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
                if(this.counter != null){
                    this.counter = null;
                }
                const parametri= {
                    term: this.text,
                    media: this.value,
                    country: 'it',
                }
                axios.get(`${this.queryPath}`, { params: parametri }
                ).then((result)=>{
                    this.results= result.data.results;
                }).catch((error)=>{
                    console.log(error);
                });
            },

            show: function(index){
                this.counter = index;
                this.details = this.results[this.counter];
            },

            hide: function(){
                this.counter = null;
                this.details = null;
            }
        }
    }
);