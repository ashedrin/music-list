let DisplayCounter = React.createClass({

    renderItem: function(count) {
        let itemCSSClass = 'item';
        itemCSSClass += count == this.props.currentDisplayCount ? ' current' : '';
        return (<span className={itemCSSClass} data-count={count} onClick={this.props.change}>{count}</span>)
    },

    render: function() {
        return (
            <div className="display-counter">
                {this.props.items.map(count => this.renderItem(count))}
            </div>
        );
    }
});