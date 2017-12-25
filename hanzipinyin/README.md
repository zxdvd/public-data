
常用汉字以及拼音(不含音调)的原始数据，包含一个js的转换程序，使用了`pinyin`这个外部库(需要`npm install pinyin`).
1. 纯汉字文件(逗号或者空格分割)转换成紧凑的拼音汉字文件
```
INPUT=input-5000.txt  node  pinyin.js  >> output.txt
```
2. 由紧凑的拼音汉字文件生成`汉字->拼音`的字典的一个示例
```
DECODE_FILE=output-5000.txt  node pinyin.js
```

#### 数据来源
1. [5000个汉字](http://doc.okbase.net/2510243/archive/249920.html)

