import { renderToStaticMarkup } from 'react-dom/server'

export function createElementToString(element: React.ReactElement) {
  return renderToStaticMarkup(element)
}
