import { Translator, SourceLanguageCode, TargetLanguageCode } from 'deepl-node'
export type Translated = {
  text: string
  detectedSourceLang?: string
}

export default function translate(text: string, source: SourceLanguageCode, target: TargetLanguageCode) : Promise<Translated> {
  const trans = new Translator(process.env.DEEPL_API_KEY as string)

  return trans.translateText(text, source, target)
}
