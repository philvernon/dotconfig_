#!/usr/bin/env node
// Minimal MCP HTTP adapter for local use.
// POST /invoke  -> { tool, method, params }
// Currently supports: tool: "open-websearch", method: "search"

const http = require('http')
const { spawn } = require('child_process')
const os = require('os')

const PORT = process.env.MCP_PORT ? Number(process.env.MCP_PORT) : 8080
const HOST = process.env.MCP_HOST || '127.0.0.1'
const TIMEOUT_MS = 25_000

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj)
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  })
  res.end(body)
}

function runOpenWebSearch(params, cb) {
  const q = params && params.q ? String(params.q) : ''
  if (!q) return cb(new Error('missing params.q'))
  const args = ['-y', 'open-websearch@latest', q]
  // allow optional limit
  if (params.limit) args.push('--limit', String(params.limit))
  if (params.engines && Array.isArray(params.engines)) {
    args.push('--engines', params.engines.join(','))
  }

  const proc = spawn('npx', args, { stdio: ['ignore', 'pipe', 'pipe'] })
  let stdout = ''
  let stderr = ''
  const to = setTimeout(() => {
    proc.kill('SIGTERM')
    cb(new Error('timeout'))
  }, TIMEOUT_MS)

  proc.stdout.on('data', (c) => { stdout += c.toString() })
  proc.stderr.on('data', (c) => { stderr += c.toString() })
  proc.on('error', (err) => {
    clearTimeout(to)
    cb(err)
  })
  proc.on('close', (code) => {
    clearTimeout(to)
    if (code !== 0) return cb(new Error(`exit ${code}: ${stderr.trim() || stdout.trim()}`))
    cb(null, { raw: stdout })
  })
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/invoke') {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('not found')
    return
  }

  let body = ''
  req.setEncoding('utf8')
  req.on('data', (c) => { body += c })
  req.on('end', () => {
    let payload
    try { payload = body ? JSON.parse(body) : {} } catch (e) {
      return sendJSON(res, 400, { ok: false, error: { message: 'invalid json' } })
    }

    const tool = payload.tool
    const method = payload.method
    const params = payload.params || {}

    if (tool === 'open-websearch' && method === 'search') {
      runOpenWebSearch(params, (err, result) => {
        if (err) return sendJSON(res, 500, { ok: false, error: { message: err.message } })
        return sendJSON(res, 200, { ok: true, results: result })
      })
      return
    }

    sendJSON(res, 400, { ok: false, error: { message: 'unsupported tool/method' } })
  })
})

server.on('listening', () => {
  console.log(`MCP HTTP adapter listening http://${HOST}:${PORT}/invoke`)
  console.log(`PID ${process.pid} ${os.userInfo().username}`)
})

server.on('error', (err) => {
  console.error('server error', err && err.message)
  process.exit(1)
})

server.listen(PORT, HOST)
