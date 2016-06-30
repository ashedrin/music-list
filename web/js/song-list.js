var SongList = React.createClass({

    getInitialState: function() {
        return { songs: [], loading: false };
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
        this.setState({loading: true});
        $.get(Router.getPath('api-songs'), this.props.selectedFilters, function(response){
            $this.setState({ songs: response, loading: false });
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
                            {this.state.loading && <i className="fa fa-spinner fa-pulse fa-3x fa-fw loading"/>}
                            {!this.state.loading && this.state.songs.map(song => <Song song={song} />)}
                            {
                                this.state.songs.length == 0 &&
                                <div className="message">Этому набору фильтров не соответствует ни одна композиция</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});