import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';

import Fab from '@material-ui/core/Fab';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';


export default class CardDocker extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',

        };
    }

    render() {

        return (
                <Card className="mb-3">
                    <CardBody className="pt-2">
                        <img src={this.props.imageDocker}/>
                    </CardBody>
                    <CardFooter>
                        <div>{this.props.adressDocker}</div>
                        <Fab variant="extended" aria-label="like" className={classes.fab}>
                            <MoreVertRoundedIcon />
                        </Fab>
                    </CardFooter>
                </Card>
        )
    }
}
