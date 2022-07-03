import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname as _dirname, resolve as _resolve } from 'path';
import { get } from 'http';
const openapi = {
  requestLibPath: "import request from '@/utils/request'",
  schemaPath: 'http://192.168.110.214:9002/v3/api-docs',
  projectName: 'api',
};

const srcFolder = '/src';
const url = openapi.schemaPath;

function mkdirsSync(dirname) {
  if (existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(_dirname(dirname))) {
      mkdirSync(dirname);
      return true;
    }
  }
}

function getPath(pathUrl) {
  return _resolve(__dirname, pathUrl);
}

function generateTemplate() {
  return `${openapi.requestLibPath}\n`;
}

function generateFunc({ summary, type, url, requestBody, parameters, functionname, BodyType }) {
  let params = '{';
  let pathparams = [];
  if (parameters) {
    for (let item of parameters) {
      if (item.in === 'path') {
        pathparams.push(item.name);
      }
      const type =
        item.schema.type === 'integer'
          ? 'number'
          : item.schema.type === 'array'
          ? item.schema.items.type === 'integer'
            ? 'number[]'
            : item.schema.items.type + '[]'
          : item.schema.type;
      let name = /\w\.\w/.test(item.name) ? `'${item.name}'` : item.name;
      if (name === 'pageSize') {
        name = 'size';
      }
      if (name === 'pageNumber') {
        name = 'page';
      }
      params =
        params +
        `${item.description ? `\n         /** ${item.description} **/` : ''}
         ${name}${item.required ? '' : '?'}:${type};`;
    }
    params = params + `\n        }`;
  }
  return `
/** ${summary || ''} **/
export async function ${functionname}(
  ${parameters ? `params:${params},` : ''}
  ${requestBody ? `body:${BodyType === 'formdata' ? 'any' : BodyType},` : ''}
  options ? : {[key: string]: any },
) {
   ${
     parameters
       ? `const { ${
           pathparams.length > 0 ? pathparams.join(',') + ',' : ''
         } ...queryParams } = params;`
       : ''
   }
   ${
     BodyType === 'formdata'
       ? `const formdata = new FormData()
   for(const i in body){ formdata.append(i,body[i]) }`
       : ''
   }
   return request.request<any,any>({
   url: ${
     pathparams.length > 0
       ? `\`${pathparams
           .map((i, index) => url.replace(/{.*?}/, '${' + pathparams[index] + '}'))
           .join('/')}\``
       : `'${url}'`
   },
   method: '${type}',
   ${parameters ? `params:{...queryParams},` : ''}
   ${requestBody ? `data:${BodyType === 'formdata' ? 'formdata' : 'body'},` : ''}
   ...(options || {}),
   })
}
\n `;
}

function generateType({ title, properties, required }) {
  const arr = [];
  for (const name in properties) {
    const item = {};
    item.name = name;

    if (required && required.includes(name)) {
      item.required = true;
    }
    const { type, items, description } = properties[name];
    if (type === 'string' || type === 'boolean') {
      item.type = type;
    } else if (type === 'array') {
      if (items.type) {
        item.type = items.type + '[]';
      } else {
        const arr = items.$ref.split('/');
        item.type = 'API.' + arr[arr.length - 1] + '[]';
      }
    } else if (type === 'object') {
      item.type = 'Record<string, any>';
    } else if (type === 'integer') {
      item.type = 'number';
    } else if (properties[name]['$ref']) {
      item.type = 'Record<string, any>';
    }
    if (properties[name]['enum']) {
      item.type = properties[name]['enum'].join('|');
    }
    if (description) {
      item.description = description;
    }
    arr.push(item);
  }
  return `
  type ${title}={
    ${arr
      .map(
        i =>
          `    /**${i.description ? i.description : ''}**/\n    ${i.name}${i.required ? '?' : ''}:${
            i.type
          };`,
      )
      .join('\n')}
  }
          \n `;
}

function httpgetJson(url) {
  return new Promise((resolve, reject) => {
    get(url, res => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error('请求失败。\n' + `状态码: $ { statusCode }`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          '无效的 content-type.\n' + `期望 application / json 但获取的是 $ { contentType }`,
        );
      }
      if (error) {
        console.error(error.message);
        // 消耗响应数据以释放内存
        res.resume();
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(`错误: ${e.message}`);
        }
      });
    }).on('error', e => {
      reject(`错误: ${e.message}
    `);
    });
  });
}

// const argv = process.argv
// console.log(argv)

async function main() {
  console.log('获取远程json文件中...');
  const {
    paths,
    components: { schemas },
    // components
  } = await httpgetJson(url);
  console.log('获取成功正在生成api文件');
  const obj = {};
  for (const name in paths) {
    const path = paths[name];
    for (const item in path) {
      if (path[item]) {
        const arr = name.replace(/\/{.*?}/, '').split('/');
        const current = {
          tags: path[item].tags,
          summary: path[item].summary,
          operationId: path[item].operationId,
          requestBody: path[item].requestBody,
          response: path[item].responses,
          type: item,
          url: name,
          parameters: path[item].parameters,
          folder: path[item]['tags'][0],
          functionname: arr[arr.length - 1] + 'By' + item,
        };
        if (current.requestBody) {
          const { type, $ref, items } = current.requestBody.content['application/json'].schema;
          if (type) {
            if (type === 'integer' || type === 'string') {
              current.BodyType = 'formdata';
            }
            if (type === 'array') {
              if (items.type) {
                current.BodyType = items.type + '[]';
              } else {
                const arr = items.$ref.split('/');
                current.BodyType = 'API.' + arr[arr.length - 1] + '[]';
              }
            }
          } else {
            const arr = $ref.split('/');
            current.BodyType = 'API.' + arr[arr.length - 1];
          }
        }
        if (current.response['200'].content) {
          const { schema } = current.response['200'].content['*/*'];
          const arr = schema.$ref.split('/');
          current.responseType = 'API.' + arr[arr.length - 1];
        } else {
          current.responseType = 'any';
        }
        if (obj[current['folder']]) {
          obj[current['folder']].push(current);
        } else {
          obj[current['folder']] = [current];
        }
      }
    }
  }

  //生成typings.d
  let typetsstring = `declare namespace API {
  type ResultBody<T> = {
    code?: string | number;
    message?: string;
    result?: T | Record<string, any>;
    data?: T | Record<string, any>;
    }
    \n `;
  for (const typename in schemas) {
    typetsstring += generateType(schemas[typename]);
  }
  typetsstring = typetsstring + `}`;
  writeFileSync(getPath(`..${srcFolder}/api/typings.d.ts`), typetsstring);
  for (const foldername in obj) {
    let jsString = '';
    let index = 0;
    const arr = [];
    for (const item of obj[foldername]) {
      if (arr.some(i => i.functionname === item.functionname)) {
        index++;
        item.functionname = item.functionname + '_' + index;
      }
      arr.push(item);
      jsString += generateFunc(item);
    }
    jsString = generateTemplate() + jsString;
    mkdirsSync(getPath(`..${srcFolder}/${openapi.projectName}/${foldername}`));
    writeFileSync(
      getPath(`..${srcFolder}/${openapi.projectName}/${foldername}/index.ts`),
      jsString,
    );
  }
  console.log('生成完毕😁 感觉怎么样');
}

if (!openapi) {
  console.log('请先配置openapi');
} else {
  main();
}
