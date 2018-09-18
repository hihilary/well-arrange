import * as React from 'react';
import './App.css';
import FileDropZone from './FileDropZone';
import {connect} from 'react-redux'
import {IStoreState} from './interface'

interface IProps{
  file1: any,
  file2: any,
  file3: any,
  file4: any,
}

class App extends React.Component<IProps, any> {

  constructor(props :IProps) {
    super(props)
  }
  public render() {
    return (
      <div className="App">
      <FileDropZone which="file1"/>
      <FileDropZone which="file2"/>
      <FileDropZone which="file3"/>
      <FileDropZone which="file4"/>
      <button onClick={this.startArrange}>Start</button>
      </div>
    );
  }

  private startArrange = () => {
    // console.log(this.state)
    const file1 = this.props.file1
    const file2 = this.props.file2
    const file3 = this.props.file3
    const file4 = this.props.file4
    if (file1!=='' && file2!=='' && file3 !== '' && file4 !== '') {
        console.log(file1)

      } else {
        alert('not enough files')
      }
  }
}

function mapStateToProps(state :IStoreState) {
  // console.log(state)
  return {
    file1: state.file1,
    file2: state.file2,
    file3: state.file3,
    file4: state.file4,
  }
}

export default connect(mapStateToProps, null)(App);
