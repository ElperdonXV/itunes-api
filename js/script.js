const app = new Vue(
    {
        el: '#app',
        data: {
            queryPath: 'https://itunes.apple.com/search',
            text: '',
            reserch: [],
        },
        methods: {
            callItunes: function(){
                const parametri= {
                    term: this.text,
                    media: this.value,
                }
                axios.get(`${this.queryPath}`, { params: parametri }
                ).then((result)=>{
                    //this.reserch= result.data.results;
                    console.log(result.data.results);
                }).catch((error)=>{
                    console.log(error);
                });
            },
        }
    }
);