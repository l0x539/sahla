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
                    <meta charSet="UTF-8" />
                    <meta property="og:url"                content="https://sahlabusiness.com" />
                    <meta property="og:type"               content="website" />
                    <meta property="og:title"              content="Sahla Business" />
                    <meta property="og:description"        content="Find best services and products nearby you." />
                    <meta property="og:image"              content="https://sahlabusiness.com/assets/preview.png" />
                    <link rel="icon" type="image/png" href="https://sahlabusiness.com/assets/logoFooter.png" />
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