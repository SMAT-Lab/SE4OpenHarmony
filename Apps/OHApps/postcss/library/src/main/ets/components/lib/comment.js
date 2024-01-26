
'use strict'
import Node from './node'

class Comment extends Node {
  constructor(defaults) {
    super(defaults)
    this.type = 'comment'
  }
}

export default Comment
