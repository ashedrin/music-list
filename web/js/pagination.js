let Pagination = React.createClass({

    range: function(start, end) {
        var list = [];
        for(var i = start; i < end; i++) { list.push(i); }
        return list;
    },

    renderItem: function(page) {
        let itemCSSClass = 'item';
        itemCSSClass += page == this.props.currentPage ? ' current' : '';
        return (<span className={itemCSSClass} data-page={page} onClick={this.props.change}>{page}</span>)
    },
    
    render: function() {
        return (
            <div className="pagination">
                {this.props.pageCount > 1 && this.range(1, this.props.pageCount + 1).map(page => this.renderItem(page))}
            </div>
        );
    }
});