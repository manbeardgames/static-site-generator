import * as ejs from 'ejs';
import * as frontmatter from 'front-matter';
import * as fse from 'fs-extra';
import * as glob from 'glob';
import * as marked from 'marked';
import * as path from 'path';

interface IPageMatter {
  header: {
    description: string;
    title: string;
  };
  og: {
    description: string;
    image: string;
    title: string;
  };
  page: {
    layout: string;
    navHeader: string;
  };
}

export function Process(viewSource: string, viewDestination: string, layoutSource: string, dbSource: string): void {
  //  Get the path to the defualt front-matter for pages
  const defaultMatterFilePath = path.join(dbSource, 'default_matter.yaml');

  //  Read the content of the default front-matter file
  const defaultMatterContent = fse.readFileSync(defaultMatterFilePath, 'utf-8');

  //  Parse the yaml front matter, and get hte attributes as an IPageMatter type
  const defaultMatter = frontmatter(defaultMatterContent).attributes as IPageMatter;

  //  Get a list of all view viles
  let viewFiles = glob.sync('**/*.@(md|ejs|html))', { cwd: viewSource });

  viewFiles = glob.sync('index.ejs', { cwd: viewSource });

  //  Iterate each view and process
  viewFiles.forEach((view, i) => {
    //  Get the view's file info
    const viewFileInfo = path.parse(view);

    //  Get a full file path
    const viewFilePath = path.join(viewSource, view);

    //  Read the content of the view file
    const viewContent = fse.readFileSync(viewFilePath, 'utf-8');

    //  Parse the front-matter if any exists
    const viewFrontMatter = frontmatter(viewContent);

    //  If there are attributes in the view front matter, we need
    //  to combine this with the default matter
    let pageData = Object.assign({}, defaultMatter);
    if (viewFrontMatter.attributes) {
      const viewData = viewFrontMatter.attributes as IPageMatter;
      pageData = Object.assign({}, pageData, viewData);
    }

    //  Render the page based on the file extension
    let renderedPage;
    switch (viewFileInfo.ext) {
      case '.md':
        renderedPage = marked(viewFrontMatter.body);
        break;
      case '.ejs':
        renderedPage = ejs.render(viewFrontMatter.body, pageData, {
          filename: viewFilePath,
        });
        break;
      default:
        renderedPage = viewFrontMatter.body;
    }

    //  Get the name of the layout to use
    const layoutName = pageData.page.layout || 'default';

    //  Get the path ot the layout file
    const layoutFilePath = path.join(layoutSource, `${layoutName}.ejs`);

    //  Read the contents of the file for the layout
    const layoutContent = fse.readFileSync(layoutFilePath, 'utf-8');

    //  Create the data to be used by the layout
    const layoutData = Object.assign({}, pageData, {
      body: renderedPage,
      filename: layoutFilePath,
    });

    //  Render the layout
    const renderedLayout = ejs.render(layoutContent, layoutData);

    //  Write the render to disk as a .html file
    fse.writeFileSync(path.join(viewDestination, `${viewFileInfo.name}.html`), renderedLayout);
  });
}
