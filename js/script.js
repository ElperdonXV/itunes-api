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
            loading: false,
            color: 0, // 0 for light mode, 1 for dark mode
            textSearch: null,
        },
        methods: {
            callItunes: function(){
                this.results = null;
                if(this.counter != null){
                    this.counter = null;
                }
                this.textSearch = this.text;
                const parametri= {
                    term: this.text,
                    media: this.value,
                    country: 'it',
                    offset: this.offset,
                    limit: 28,

                }
                this.loading = true;
                
                    axios.get(`${this.queryPath}`, { params: parametri }
                        ).then((result)=>{
                            this.results= result.data.results;
                            this.results.forEach(element => {
                                element.artworkUrl30 = element.artworkUrl30.replace('30x30', '300x300');
                                element.artworkUrl60 = element.artworkUrl60.replace('60x60', '600x600');
                                element.artworkUrl100 = element.artworkUrl100.replace('100x100', '1000x1000');
                                let array = element.releaseDate.split("T");
                                element.releaseDate = array[0];
                            });
                            this.loading = false;
                            this.resultsLength = this.results.length;
                        }).catch((error)=>{
                            this.loading = false;
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
                setTimeout(()=>{
                    this.scroll();
                }, 500);
            },

            prvPage: function(){
                this.offset = this.offset - 28;
                this.callItunes();
                setTimeout(()=>{
                    this.scroll();
                }, 500);
            },

            scroll: function(){
                var element = this.$refs['main'];
                var top = element.offsetTop;
                window.scrollTo(0, top);
            },

            firstCall: function(){
                this.offset = 0;
                this.firstSearch = 1;
                this.results = null;
                this.loading = true;
                setTimeout(() =>{
                    this.callItunes();
                }, 1000);
                setTimeout(()=>{
                    this.scroll();
                }, 1500);
            },

            theme: function(){
                if(this.color == 0){
                    this.color = 1;
                }
                else{
                    this.color = 0;
                }
            }, 
            
        }
    }
);