import React from 'react';
import connectModel from 'connect-data-decorator';

// import styles from './Section.css';

@connectModel({
    sourcePath: '/navigation/model.json'
})
export default class NavigationSection extends React.Component {

    // static propTypes = {
    //     itemsType: React.PropTypes.string
    // }

    constructor() {
        super()
        this.state = {items: []}
    }

    componentWillMount() {
        var {itemsType} = this.props;
        
        this.context.model.getValue([itemsType])
            .then(response => this.setState({items: response}))
    }

    render() {
        var items = Object.keys(this.state.items).map(idx => {
            return <li key={idx} className={styles.item}>
                <a className={styles.itemLink} href={"#" + this.state.items[idx].href} >
                    {this.state.items[idx].name}
                </a></li>
        });
        return <ul>{items}</ul>
    }
}