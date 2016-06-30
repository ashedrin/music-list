var SongList = React.createClass({

    getInitialState: function() {
        return { songs: [] };
    },

    componentDidMount: function() {
        this.loadSongs();
    },

    componentDidUpdate: function(prevProps, prevState) {
        if(
            this.props.selectedFilters.performer != prevProps.selectedFilters.performer ||
            this.props.selectedFilters.genre != prevProps.selectedFilters.genre ||
            this.props.selectedFilters.year != prevProps.selectedFilters.year
        ) { this.loadSongs(); }
    },

    loadSongs: function() {
        let $this = this;
        $.get(Router.getPath('api-songs'), this.props.selectedFilters, function(response){
            $this.setState({ songs: response });
        });
    },

    render: function() {
        return (
            <div className="col-sm-9 pull-right">
                <h3>Песни</h3>
                <div className="music-list">
                    <div className="row headline">
                        <div className="col-sm-4 col">
                            Исполнитель
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div className="col-sm-4 col">
                            Песня
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div className="col-sm-2 col">
                            Жанр
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div className="col-sm-2 col">
                            Год
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <div className="wrap">
                            {this.state.songs.map(song => <Song song={song} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});