import fs from "fs-extra";
import { markdown } from "./markdown.js";

const render = (file_path)=>{

  return new Promise(async (resolve)=>{

    // markdown source
    const content = await fs.readFile(file_path, "utf8");

    // converted to HTML
    const rendered = await markdown.render(content);

      const htmlFile = `<!DOCTYPE html>

      <html lang="en">

      <head>

        <meta charset="UTF-8" />

        <title>Markdown Document</title>


        <link rel="stylesheet" href="./bundle/default.css">

        <link rel="stylesheet" href="./bundle/highlight.js.css">

        <link rel="stylesheet" type="text/css" href="./bundle/github.css" id="_theme">
        
        <link rel="stylesheet" type="text/css" href="./bundle/prism.min.css" id="_prism">
        
        <link rel="stylesheet" href="./bundle/fonts.css">

        <link rel="stylesheet" href="./bundle/bootstrap.min.css">
        <script src="./bundle/jquery-3.2.1.slim.min.js"></script>
        <script src="./bundle/popper.min.js"></script>
        <script src="./bundle/bootstrap.min.js"></script>
  

      </head>

      <body class="_theme-github">
      
        <div id="_html" class="markdown-body _width-undefined md_main_div">
          
          ${rendered}

        </div>

      </body>

      </html>`;

      resolve(htmlFile);

      // await fs.mkdirs("./public");

      // await fs.writeFile("./public/index.html", htmlFile, "utf8");

      // // await fs.copy(
      // //   "./node_modules/highlight.js/styles/default.css",
      // //   "./public/default.css",
      // //   { overwrite: true }
      // // );
  });
}

export default render;