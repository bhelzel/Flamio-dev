export default class Song {

    constructor(container) {
        this.container = container;
    }

    render() {
        let contents = '<div class="song-container">';

        axios.get('/song')
            .then(res => {
                // res.data.forEach(song => {

                // });
                contents.concat('</div>');
                this.container.innerHTML = contents;
            });
    }
}