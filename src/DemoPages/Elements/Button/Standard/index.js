import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

import {ModalContainer, ModalDialog} from 'react-modal-dialog';

// Examples
import ButtonsStandardSolid from './Examples/Solid';


export default class ButtonsStandard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false,
          }
    }
  
    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => this.setState({isShowingModal: false})
      
    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Containers"
                    subheading="Vous pouvez administrer vos containers "
                    icon="pe-7s-plugin icon-gradient bg-tempting-azure"
                />
                <div onClick={this.handleClick}>
                  {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                      <ModalDialog onClose={this.handleClose}>
                        <h1>Dialog Content</h1>
                        <p>More Content. Anything goes here</p>
                      </ModalDialog>
                    </ModalContainer>
                  }
                </div>
            </Fragment>
        );
    }
}