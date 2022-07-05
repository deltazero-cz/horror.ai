import Wrapper, { Exception } from 'next-api-wrapper'
import translate from '../../lib/translate'
import makeHorror from '../../lib/makeHorror'
import log from '../../lib/log'

export default Wrapper({
  POST: async ({ body: { topic }, ip }) => {
    if (typeof topic !== 'string' || topic.trim().length < 4)
      throw new Exception('Topic Too Short')

    const { text: topicTranslated, detectedSourceLang: language } = await translate(topic, null, 'en-US')
    const horror = await makeHorror(topicTranslated)
    const horrorTranslated = language === 'en'
        ? horror
        : (await translate(horror, 'en', language)).text

    log ({
      ts: new Date(),
      ip,
      topic,
      topicTranslated,
      language,
      horror,
      horrorTranslated
    })
    return horrorTranslated
  }
})
