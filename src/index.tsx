import { Hono } from 'hono'
import { renderer } from './renderer'
import Form from './components/form'

const app = new Hono<{ Bindings: { KV: KVNamespace } }>()

app.use(renderer)

app.post("/", async (c) => {
  const formData = await c.req.formData()
  const url = formData.get("url")
  const id = formData.get("id")

  if (typeof url === "string" && typeof id === "string") {
    const value = await c.env.KV.get(id)
    if (value) {
      return c.redirect("/?error=true&reason=duplicate")
    }

    await c.env.KV.put(id, url)

    return c.redirect("/")
  }

  return c.redirect("/?error=true")
})

app.get('/', (c) => {
  const { error, reason } = c.req.query()
  return c.render(
    <>
      <h1>URL Shortener</h1>
      <Form />
      {error && <div>Error occurred...</div>}
      {reason && <div>Reason: {reason}</div>}
    </>
  )
})

app.get("/:key", async (c) => {
  const { key } = c.req.param()
  const value = await c.env.KV.get(key)

  if (value) {
    return c.redirect(value)
  }

  return c.render(
    <>
      <h1>404 Not found</h1>
    </>
  )
})

export default app
