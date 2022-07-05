import { useState } from 'react'
import Head from 'next/head'

const Home = () => {
  const [ topic, setTopic ] = useState('')
  const [ error, setError ] = useState(null)
  const [ horror, setHorror ] = useState('')

  const submit = e => {
    e?.preventDefault?.()
    if (horror === '...' && !error) return

    setHorror('...')
    setError(null)

    fetch('/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: e?.topic ?? topic })
    })
    .then(resp => {
      if (!resp.ok) throw resp
      return resp.json()
    })
    .then(data => {
      setHorror(data)
    })
    .catch(async e =>
      setError(e.headers?.get('Content-Type').match(/^application\/json/)
          ? await e.json()
          : { message: e.statusText, error: e.status }))
  }

  const examples = {
    en: [
      'Putin Still Lives',
      'Ran out of Rum',
      'Dead Cat'
    ],
    cs: [
      'Zeman stále žije',
      'Usnula v Brně',
      'Štěňátko',
    ]
  }

  const setExample = topic => e => {
    e?.preventDefault()
    setTopic(topic)
    submit({ topic })
  }

  return <>
    <Head>
      <title>Horror Generator</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel='shortuct' href='/favicon.png' />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Griffy&family=PT+Mono&display=swap" rel="stylesheet" />
    </Head>

    <main className={error ? 'error' : ''}>
      <h1>Horror Generator</h1>

      <section className='description'>
        <p>
          AI Horror Generator based on <a href='https://openai.com/' target='_blank'>OpenAI</a>'s DaVinci GPT-3,
          creating short horror stories. Utilizing <a href='https://www.deepl.com/' target='_blank'>DeepL</a> to understand many languages.
        </p>

        <div className='sm:flex spacing-2 w-full'>
          <dl className='flex-1'>
            <dt>Examples:</dt>
            { examples.en.map((example, i) =>
                <dd key={i}><a href='#' onClick={setExample(example)}>{ example }</a></dd>
            )}
          </dl>
          <dl className='flex-1'>
            <dt>Příklady:</dt>
            { examples.cs.map((example, i) =>
                <dd key={i}><a href='#' onClick={setExample(example)}>{ example }</a></dd>
            )}
          </dl>
        </div>
      </section>

      <section>

        <form onSubmit={submit}>
          <input value={topic} onChange={e => setTopic(e.target.value)} size={10}
                 placeholder='I.E.: He still lives' autoFocus required autoComplete='off' />
          <button type='submit'>✍️</button>
        </form>

        <article>
          { error
              ? `ERROR: ${error.error}: ${error.message}`
              : horror }
        </article>

      </section>
    </main>

    <footer className='description'>
      made for fun by <a href='https://deltazero.cz' target='_blank'>deltazero</a>
    </footer>
  </>
}

export default Home
