import React, {Component, PropTypes} from 'react'
import {redbox, message, stack, frame, file, fileLink} from './styles'
import ErrorStackParser from 'error-stack-parser'

export default class RedBox extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired
  }
  static displayName = 'RedBox'
  render () {
    const {error} = this.props
    const frames = ErrorStackParser.parse(error).map(f => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
      return (
        <div style={frame}>
          <div>{f.functionName}</div>
          <div style={file}>
            <a style={fileLink} href={link}>{link}</a>
          </div>
        </div>
      )
    })
    return (
      <div style={redbox}>
        <div style={message}>{error.name}: {error.message}</div>
        <div style={stack}>{frames}</div>
      </div>
    )
  }
}
