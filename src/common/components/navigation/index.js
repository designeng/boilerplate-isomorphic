import React from 'react';

import NavigationHeader     from './header';
import NavigationSection    from './section';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <NavigationHeader />
                <NavigationSection itemsType="items"/>
                <NavigationSection itemsType="brands"/>
            </nav>
        )
    }
}