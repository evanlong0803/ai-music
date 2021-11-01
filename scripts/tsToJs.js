const path = require('path');
const fs = require('fs');
const { transformSync } = require('@babel/core');
const { CLIEngine } = require('eslint');
const glob = require('glob');
const cheerio = require('cheerio');

const files = glob.sync('src/**/*.@(*)');

const cwd = process.cwd();

const engine = new CLIEngine({
  fix: true,
  useEslintrc: false,
  baseConfig: require('../.eslintrc.js'),
});

fs.readFile('index.html', 'utf8', function (err, test) {
  var result = test.replace(/\/src\/main.ts/g, '/src/main.js');
  fs.writeFile('index.html', result, 'utf8', function (err) {
    if (err) {
      console.log(err);
    }
  });
});

files.forEach(file => {
  console.log('files: ', file);
  const isVue = file.endsWith('.vue');
  const isTs = file.endsWith('.ts') || file.endsWith('.tsx');
  const source = fs.readFileSync(path.join(cwd, file)).toString();
  const dirs = file.split('/');
  dirs.pop();
  if (isTs || isVue) {
    let content = '';
    let template = '';
    let style = '';

    if (isVue) {
      const $ = cheerio.load(source);
      template = source.match(/<template>[\s\S]*<\/template>/)[0];
      content = $('script').html();
      style = source.match(/<style [\s\S]*<\/style>/)?.[0];
    } else if (isTs) {
      content = source;
    }
    const { code } = transformSync(content, {
      configFile: false,
      plugins: [
        [
          require.resolve('@babel/plugin-transform-typescript'),
          {
            isTSX: true,
          },
        ],
      ],
    });

    const report = engine.executeOnText(code);

    let output = report.results[0].output;
    output = output ? output.trim() : output;
    if (output) {
      fs.mkdirSync(`js/${dirs.join('/')}`, {
        recursive: true,
      });
      let res = isVue
        ? `${template}
<script>
${output}
</script>

${style || ''}
`
        : output;
      res = `${res.trim()}
`;
      fs.writeFileSync(path.join(cwd, `js/${file.replace('.ts', '.js')}`), res);
    }
  } else {
    fs.mkdirSync(`js/${dirs.join('/')}`, {
      recursive: true,
    });
    fs.copyFileSync(path.join(cwd, file), path.join(cwd, `js/${file}`));
  }
});
