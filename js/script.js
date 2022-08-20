const app = new Vue(
    {
        el: '#app',
        data: {
            queryPath: 'https://itunes.apple.com/search',
            text: '',
            results: null,
            value: 'all',
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
        }
    }
);