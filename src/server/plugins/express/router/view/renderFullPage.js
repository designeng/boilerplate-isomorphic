export default function renderFullPage(html, initialState){
    const styleLink = process.env.NODE_ENV === 'development' ? `` : `<link rel="stylesheet" type="text/css" href="/static/app.css">`;
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Boilerplate</title>
        ${styleLink}
      </head>
      <body >
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}