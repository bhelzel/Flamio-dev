const axios = require('axios');

export default class Albums {

    constructor(container) {
        this.container = container;
    }

    render() {
        let contents = '<div class="albums-container">';

        axios.get('/albums')
            .then(res => {
                console.log(res);
                // res.data.forEach(album => {

                // });
                contents.concat('</div>');
                this.container.innerHTML = contents;
            });
    }
}
