import 'colors'
import util from 'util'
import { getBaseError } from './helper.js'

const backup = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  debug: (console.debug || console.log).bind(console)
}

function assign (cmd, prefix) {
  console[cmd] = function () {
    const s = typeof prefix === 'function' ? prefix() : prefix
    arguments[0] = util.format(s, arguments[0])

    backup[cmd].apply(console, arguments)
  }
}

console.error = (error) => {
  backup.log('[error]'.red, getBaseError(error))
}

assign('log', '[log]'.black)
assign('info', '[info]'.blue)
assign('warn', '[warn]'.yellow)
