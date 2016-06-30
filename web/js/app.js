var App = React.createClass({
    
    getInitialState: function() {
        return {
            selectedFilters: {
                performer: '',
                genre: '',
                year: ''
            }
        };
    },
    
    filterAfterChange: function(selectedFilters) {
        this.setState({selectedFilters: selectedFilters});
    },
    
    render: function() {
        return (
            <div className="row">
                <Filter afterChange={this.filterAfterChange.bind(this)} />
                <SongList selectedFilters={this.state.selectedFilters} />
            </div>
        );
    }
});

$(function(){
    ReactDOM.render(<App />, document.getElementById('app'));
});
