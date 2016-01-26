import React from 'react';

export default class NavigationHeader extends React.Component {

    render() {
        const wrapper      = "nav-mobile-trigger-wrapper";
        const input        = "nav-mobile-trigger";
        const inputLabel   = "nav-mobile-trigger-label";

        return  <div className={wrapper}>
                    <input 
                        type="checkbox"
                        id={input}
                        className={input}
                        defaultChecked={true}
                    />
                    <label htmlFor={input} className={inputLabel}></label>
                    <div id="#header">
                        <a id="logo" href="/">ДРАЙВ</a>
                    </div>
                </div>
    }
}