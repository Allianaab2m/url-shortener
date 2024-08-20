import { Hono } from 'hono'
import { renderer } from './renderer'
import Form from './components/form'

const app = new Hono<{ Bindings: { KV: KVNamespace } }>()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      <h1>URL Shortener</h1>
      <Form />
    </>
  )
})

export default app
