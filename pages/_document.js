import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        
        return {...initialProps}
    }

    render () {
        
        return (
            <Html>
                <Head>
                    <meta charset="UTF-8" />
                    <meta property="og:url"                content="https://sahlabusiness.com" />
                    <meta property="og:type"               content="website" />
                    <meta property="og:title"              content="Sahla Title" />
                    <meta property="og:description"        content="Sahla Description." />
                    <meta property="og:image"              content="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument