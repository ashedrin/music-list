var Song = React.createClass({
    render: function() {
        return (
            <div className="row song">
                <div className="col-sm-3">{this.props.song.performer}</div>
                <div className="col-sm-5">{this.props.song.title}</div>
                <div className="col-sm-2">{this.props.song.genre}</div>
                <div className="col-sm-2">{this.props.song.year}</div>
            </div>
        );
    }
});