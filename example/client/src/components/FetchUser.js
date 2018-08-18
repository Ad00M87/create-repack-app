import { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/user';
import axios from 'axios';

class FetchUser extends Component {
  state = { loaded: false };

  componentDidMount() {
    const { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      this.loaded()
    } else {
      axios.get('/api/auth/validate_token')
        .then( res => {
          dispatch(login(res.data.data))
          this.loaded()
        }).catch( () => this.loaded() )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loaded) this.loaded();
  }

  loaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.user.id };
};

export default connect(mapStateToProps)(FetchUser);
