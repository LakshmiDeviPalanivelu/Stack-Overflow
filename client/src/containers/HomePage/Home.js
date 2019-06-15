import React, {Component} from 'react';
import {Button, Segment, Container, Label, Input, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendData} from '../../actions';
import StatsPage from '../StatsPage/Stats';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            data: '',
            title: '',
            disable: true,
            isOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.list.data) {
                this.setList(nextProps);
            }
        }
    }

    setList = props => {
        if (props && props.list.data) {
            this.setState(() => ({
                data: props.list.data,
                disable: false
            }));
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleItemClick = () => {
        this.setState({
            isOpen: true
        })
    }

    handleClick = () => {
        const title = this.state.title;
        const question = this.state.question;
        this.props.sendData(title,question);
    }

    render() {
        const {data, disable} = this.state;
        return (
            <div>
                <Segment
                    style={{"height": "40em", "display": "flex", "alignItems": "center", "justifyContent": "center"}}
                    textAlign='center' padded='very'>
                    <Container>
                        <Grid style={{"margin": 0}}>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <label style={{"fontSize": 25, "clear": "right"}}>Title:</label>
                                </Grid.Column>
                                <Grid.Column width={10} style={{marginLeft: 90}}>
                                    <Input fluid name='title' onChange = {this.handleChange} placeholder='Enter your title'/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <label style={{"fontSize": 25, "clear": "right"}}>Question:</label>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <Input fluid name='question' onChange={this.handleChange}
                                           label={<Button icon onClick={() => this.handleClick()}> Predict </Button>}
                                           labelPosition='right' placeholder='Find domain'/>
                                </Grid.Column>
                            </Grid.Row>
                            {
                                data &&
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <label style={{"fontSize": 25}}>Tags:</label>
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        {data.map(key => (
                                            <Label as='a' size={'big'} tag>
                                                {key}
                                            </Label>
                                        ))}
                                    </Grid.Column>
                                </Grid.Row>
                            }
                            <Grid.Row>
                                <Grid.Column>
                                    <Button disabled={disable} size='big' style={{"marginLeft": "120px"}} positive
                                            onClick={this.handleItemClick}>Post</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                {
                    this.state.isOpen &&
                    <StatsPage open={this.state.isOpen}/>
                }
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({sendData}, dispatch)
};

const mapStateToProps = (state) => ({
    list: state.transaction_reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
