let SORT_TRIGGER_PERFORMER = 'performer';
let SORT_TRIGGER_SONG = 'title';
let SORT_TRIGGER_GENRE = 'genre';
let SORT_TRIGGER_YEAR = 'year';

let SORT_TRIGGER_DIRECTION_ASC = 'asc';
let SORT_TRIGGER_DIRECTION_DESC = 'desc';


let SongList = React.createClass({

    getInitialState: function() {
        return { 
            songs: [], 
            loading: false, 
            sort: { 
                trigger: SORT_TRIGGER_PERFORMER, 
                direction: SORT_TRIGGER_DIRECTION_ASC
            }
        };
    },

    componentDidMount: function() {
        this.loadSongs();
    },

    componentWillUpdate: function(nextProps, nextState) {
        this.sort(nextState.sort);
    },

    sort: function(sort) {
        let $this = this;
        this.state.songs.sort(function(prevSong, nextSong){
            if(prevSong[sort.trigger] == nextSong[sort.trigger]) { return 0; }
            if(sort.direction == SORT_TRIGGER_DIRECTION_ASC) {
                return prevSong[sort.trigger] > nextSong[sort.trigger] ? 1 : -1;
            } else {
                return prevSong[sort.trigger] > nextSong[sort.trigger] ? -1 : 1;
            }
        });
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
    
    clickSortTrigger: function(event) {
        let trigger = event.currentTarget.getAttribute('data-sort-trigger');
        this.setState(
            {
                sort: {
                    trigger,
                    direction: this.state.sort.direction == 'asc' ? 'desc': 'asc'
                }
            }
        );
    },

    getSortTriggersCSSClasses: function() {
        let performerSortTriggerCSSClass = "col-sm-3 col";
        performerSortTriggerCSSClass +=
            this.state.sort.trigger == SORT_TRIGGER_PERFORMER ? ' sort-' + this.state.sort.direction : '';

        let songSortTriggerCSSClass = "col-sm-5 col";
        songSortTriggerCSSClass +=
            this.state.sort.trigger == SORT_TRIGGER_SONG ? ' sort-' + this.state.sort.direction : '';

        let genreSortTriggerCSSClass = "col-sm-2 col";
        genreSortTriggerCSSClass +=
            this.state.sort.trigger == SORT_TRIGGER_GENRE ? ' sort-' + this.state.sort.direction : '';

        let yearSortTriggerCSSClass = "col-sm-2 col";
        yearSortTriggerCSSClass +=
            this.state.sort.trigger == SORT_TRIGGER_YEAR ? ' sort-' + this.state.sort.direction : '';

        return {
            performerSortTriggerCSSClass,
            songSortTriggerCSSClass,
            genreSortTriggerCSSClass,
            yearSortTriggerCSSClass
        };
    },

    render: function() {

        let {
            performerSortTriggerCSSClass,
            songSortTriggerCSSClass,
            genreSortTriggerCSSClass,
            yearSortTriggerCSSClass
        } = this.getSortTriggersCSSClasses();

        return (
            <div className="col-sm-9 pull-right">
                <h3>Песни</h3>
                <div className="music-list">
                    <div className="row headline">
                        <div
                            className={performerSortTriggerCSSClass}
                            data-sort-trigger={SORT_TRIGGER_PERFORMER}
                            onClick={this.clickSortTrigger}
                        >
                            Исполнитель
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div
                            className={songSortTriggerCSSClass}
                            data-sort-trigger={SORT_TRIGGER_SONG}
                            onClick={this.clickSortTrigger}
                        >
                            Песня
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div
                            className={genreSortTriggerCSSClass}
                            data-sort-trigger={SORT_TRIGGER_GENRE}
                            onClick={this.clickSortTrigger}
                        >
                            Жанр
                            <div className="sort-group">
                                <i className="fa fa-caret-up" />
                                <i className="fa fa-caret-down" />
                            </div>
                        </div>
                        <div
                            className={yearSortTriggerCSSClass}
                            data-sort-trigger={SORT_TRIGGER_YEAR}
                            onClick={this.clickSortTrigger}
                        >
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