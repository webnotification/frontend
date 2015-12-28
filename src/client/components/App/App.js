/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import { CSSTransitionGroup } from 'react/addons';
import styles from './App.styl';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

import { RouteHandler } from 'react-router';
import Router from 'react-router';

// import mui from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
// let ThemeManager = mui.Styles.ThemeManager;

@withContext
@withStyles(styles)
class App extends Component {

	static propTypes = {
		error: PropTypes.object
	}

	static childContextTypes = {
		router: React.PropTypes.func,
		routeDepth: React.PropTypes.number,
		muiTheme: React.PropTypes.object
	}

	getChildContext() {
		return {
			 muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
		};
	}

	render() {
		let key = this.props.pathname;

		return !this.props.error ? (
			<div className='app-container'>
				<Header/>
				{ /*<CSSTransitionGroup component="div" transitionName='fade'>
						{
							React.cloneElement( this.props.children || <div/> , { key: key, className: 'app-content' })
						}
					</CSSTransitionGroup> */
				}
				<div className='app-content'>
					<RouteHandler/>
				</div>
				<Footer />
			</div>
		) : <RouteHandler/> || this.props.children ;
	}
}

export default App;
