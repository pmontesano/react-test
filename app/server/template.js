module.exports = (bundle, component) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="/${bundle}.css" />
    </head>
    <body>
      <div id="root">${component}</div>
      <script src="/${bundle}.js"></script>
    </body>
  </html>
`;