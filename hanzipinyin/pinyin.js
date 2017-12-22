
const fs = require('fs')
// need to npm install pinyin
const pinyin = require('pinyin')


function getPinyinOfChar(c) {
  // 开启多音字支持，不要声调
  const py = pinyin(c, { heteronym: true, style: pinyin.STYLE_NORMAL })
  if (py && py.length)
    return py[0]
}

function convertInputToArray(filename) {
  return fs.readFileSync(filename, { encoding: 'utf8' }).split(/\s*,\s*/)
}

// ['一', '二', '三', '以'] ==> {yi: ['一', '以'], er: ['二'], san: ['三']}
function genPinyinMap(arr) {
  const output = {}
  for (let hanzi of arr) {
    const pys = getPinyinOfChar(hanzi)
    if (!pys)
      continue
    for (let p1 of pys) {
      if (!output[p1])
        output[p1] = [hanzi]
      else if (!output[p1].includes(hanzi))
        output[p1].push(hanzi)
    }
  }
  return output
}

// {yi: ['一', '以'], er: ['二'], san: ['三']} ==> 'yi一以er二san三'
function getResult(obj) {
  const arr = []
  for (let py in obj) {
    hanzis = obj[py]
    arr.push(`${py}${hanzis.join('')}`)
  }
  return arr.join('')
}

function encode(filename) {
  const hanzis = convertInputToArray(filename)
  const pinyinMap = genPinyinMap(hanzis)
  console.log(getResult(pinyinMap))
}

// 输出文件反解成object的一个示例，实际情况需要根据自己需求进一步处理
function decode(filename) {
  const str = fs.readFileSync(filename, { encoding: 'utf8' })
  const reg = /([a-z]+)([^a-z]+)/gu
  let match
  let obj = {}
  while((match = reg.exec(str)) !== null) {
    obj[match[1]] = match[2]
  }
  console.log(obj)
}

function usage() {
  console.log(`1. 纯汉字文件转换成拼音汉字文件: INPUT=xx_file node pinyin.js
2. 编码后的文件解析成object: DECODE_FILE=xx_file node pinyin.js`)
}

function main() {
  const filename = process.env.INPUT
  try {
    if (filename && filename.length) {
      encode(filename)
    } else {
      const filename = process.env.DECODE_FILE
      decode(filename)
    }
  } catch (err) {
    usage()
  }
}

main()
process.exit()
