var Filter = React.createClass({

    getInitialState: function() {
        return {
            selectedPerformer: '',
            selectedGenre: '',
            selectedYear: '',
            performers: [],
            genres: [],
            startYear: 1970
        };
    },

    getSelected: function() {
        return {
            performer: this.state.selectedPerformer,
            genre: this.state.selectedGenre,
            year: this.state.selectedYear
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if(
            this.state.selectedPerformer != prevState.selectedPerformer ||
            this.state.selectedGenre != prevState.selectedGenre ||
            this.state.selectedYear != prevState.selectedYear
        ) {
            this.props.afterChange(this.getSelected());
        }
    },

    componentDidMount: function() {
        this.loadFilters();
    },

    loadFilters: function() {
        let $this = this;
        $.get(Router.getPath('api-filters'), {}, function(response) {
            $this.setState({ performers: response.performers, genres: response.genres });
        });
    },

    changePerformer: function(event) {
        this.setState({selectedPerformer: event.target.value});
    },

    changeGenre: function(event) {
        this.setState({selectedGenre: event.target.value});
    },

    changeYear: function(event) {
        this.setState({selectedYear: event.target.value});
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
                        <select name="performer" className="form-control" onChange={this.changePerformer.bind(this)}>
                            <option value=""> </option>
                            { this.state.performers.map(performer => <option value={performer.id}>{performer.title}</option>) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Жанр</label>
                        <select name="genre" className="form-control" onChange={this.changeGenre.bind(this)}>
                            <option value=""> </option>
                            { this.state.genres.map(genre => <option value={genre.id}>{genre.title}</option>) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Год</label>
                        <select name="year" className="form-control" onChange={this.changeYear.bind(this)}>
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