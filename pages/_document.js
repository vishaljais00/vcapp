import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
            type="module"
            src="https://unpkg.com/zego-zim-web@2.5.0/index.js"
            />
        <Script
            type="module"
            src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"
        />
      </body>
    </Html>
  )
}
