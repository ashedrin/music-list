var Filter = React.createClass({

    getInitialState: function() {
        return {
            performers: [],
            genres: [],
            startYear: 1970
        };
    },

    componentWillMount: function() {
        let $this = this;
        $.get(Router.getPath('api-filters'), {}, function(response) {
            $this.setState({ performers: response.performers, genres: response.genres });
        });
    },

    change: function(event) {
        console.debug(event.target.value);
    },

    range: function(start, end) {
        var list = [];
        for(var i = start; i < end; i++) { list.push(i); }
        return list;
    },

    render: function() {
        return (
            <div className="col-sm-3 filters-container">
                <h3>Фильтр</h3>
                <div className="filters">
                    <div className="form-group">
                        <label>Исполнитель</label>
                        <select name="performer" className="form-control" onChange={this.change}>
                            <option value=""> </option>
                            { this.state.performers.map(performer => <option value={performer.id}>{performer.title}</option>) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Жанр</label>
                        <select name="genre" className="form-control" onChange={this.change}>
                            <option value=""> </option>
                            { this.state.genres.map(genre => <option value={genre.id}>{genre.title}</option>) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Год</label>
                        <select name="year" className="form-control" onChange={this.change}>
                            <option value=""> </option>
                            {
                                this.range(
                                    this.state.startYear,
                                    new Date().getFullYear()
                                ).map(
                                    year => <option value={year}>{year}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
});

var Song = React.createClass({
    render: function() {
        return (
            <div className="row item">
                <div className="col-sm-4">{this.props.song.performer}</div>
                <div className="col-sm-4">{this.props.song.title}</div>
                <div className="col-sm-2">{this.props.song.genre}</div>
                <div className="col-sm-2">{this.props.song.year}</div>
            </div>
        );
    }
});

var SongList = React.createClass({

    getInitialState: function() {
        return { songs: [] };
    },

    componentDidMount: function() {
        this.loadSongs();
    },

    loadSongs: function() {
        let $this = this;
        $.get(Router.getPath('api-songs'), {}, function(response){
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

var App = React.createClass({
    render: function() {
        return (
            <div className="row">
                <Filter />
                <SongList />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));