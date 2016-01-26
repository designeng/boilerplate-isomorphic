import React from 'react';
import connectModel from 'connect-data-decorator';

import styles from './News.css';

@connectModel({
    sourcePath: '/news/model.json'
})
export default class NewsList extends React.Component {

    static propTypes = {
        type: React.PropTypes.string
    }

    constructor() {
        super()
        this.state = {items: []}
    }

    componentWillMount() {
        var {type} = this.props;
        
        this.context.model.getValue([type])
            .then(response => this.setState({items: response}))
    }

    render() {
        const noopLink          = "#/drive-test/";

        let items = Object.keys(this.state.items).map(idx => {
            return  <a key={idx} href={noopLink} className={styles.link}>
                        <div className={styles.cell}>
                            <img className={styles.cellImage} src={this.state.items[idx].img} width="460" height="260" alt="" ></img>
                        </div>
                        <div className={styles.cell}><span className={styles.caption}>{this.state.items[idx].caption}</span></div>
                    </a>
        });

        return <div className={styles.list}>{items}</div>
    }
}