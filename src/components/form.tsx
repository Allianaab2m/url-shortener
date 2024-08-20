export default function Form() {
  return (
    <div>
      <form id="urlForm" method="post" action="/">
        <label>
          URL
          <input type="url" name="url" />
        </label>
        {"=>"}
        <label>
          Shortened URL
          <input type="text" name="id" />
        </label>
        <button type="submit">Short!!</button>
      </form>
    </div>
  )
}
