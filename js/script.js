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
            offset: 0,
            firstSearch: 0,
            resultsLength: null,
            color: 0, // 0 for light mode, 1 for dark mode
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
                    offset: this.offset,
                    limit: 28,

                }
                axios.get(`${this.queryPath}`, { params: parametri }
                ).then((result)=>{
                    this.results= result.data.results;
                    this.resultsLength = this.results.length;
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
            },

            nxtPage: function(){
                this.offset = this.offset + 28;
                this.callItunes();
            },

            prvPage: function(){
                this.offset = this.offset - 28;
                this.callItunes();
            },

            firstCall: function(){
                this.offset = 0;
                this.firstSearch = 1;
                this.callItunes();
            },

            theme: function(){
                if(this.color == 0){
                    this.color = 1;
                }
                else{
                    this.color = 0;
                }
            }
        }
    }
);