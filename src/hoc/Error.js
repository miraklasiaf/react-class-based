import React, {Component} from 'react'
import Modal from '../components/UI/Modal/Modal'
import Auxiliary from './Auxiliary'

const Error = (WrappedComponent, axios) => {
    return class extends Component {
      state = {
        error: null
      };

      constructor(props) {
        super(props);
        this.reqIntercep = axios.interceptors.request.use(req => {
          this.setState({
            error: null
          });
          return req
        });
        this.resIntercep = axios.interceptors.response.use(res => res, error => {
          this.setState({
            error: error
          });
        });
      }

      clearError = () => {
          this.setState({
              error: null
          })
      }

      componentWillUnmount() {
        //  console.log('will Unmount', this.reqIntercep, this.resIntercep)
        axios.interceptors.request.eject(this.reqIntercep)
        axios.interceptors.response.eject(this.resIntercep);
      }

      render() {
        return (
          <Auxiliary>
            <Modal
                isShow={this.state.error}
                isClose={this.clearError}
            >
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Auxiliary>
        );
      }
    };
}

export default Error
