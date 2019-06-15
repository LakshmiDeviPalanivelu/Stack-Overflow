import React, {Component} from 'react';
import {Button, Modal, Header, Form, Link} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {transactionList} from '../../actions';

class StatsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentWillMount() {

        if (this.props.open) {
            this.setState({
                open: this.props.open
            })
        }
    }

    render() {
        return (
            <Modal style={{
                "height": "27em",
                "display": "flex",
                "alignItems": "center",
                "marginLeft": "270px",
                "marginTop": "100px",
                "justifyContent": "center"
            }} open={this.state.open}>
                <Modal.Header style={{"color": "red"}}>Authentication failed : Please login to post the
                    question</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <a href="/auth/stack-exchange"/>
                    </Modal.Description>
                    {/*<Form>*/}
                        {/*<Form.Field>*/}
                            {/*<label>Email</label>*/}
                            {/*<input placeholder='email'/>*/}
                        {/*</Form.Field>*/}
                        {/*<Form.Field>*/}
                            {/*<label>Password</label>*/}
                            {/*<input placeholder='password' type="Password"/>*/}
                        {/*</Form.Field>*/}
                    {/*</Form>*/}
                </Modal.Content>
                <Modal.Actions>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Login
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({transactionList}, dispatch)
};

const mapStateToProps = (state) => ({
    list: state.transaction_reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
