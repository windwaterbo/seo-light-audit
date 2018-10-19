# Introduction

The current **seo-light-audit** module can find this functionality useful for your SEO tips with html. 

# Enviroment

Node.js Version : **v10.12.0**

# Installation

```
npm install seo-light-audit
```

# Quick Start

## API

```js
const seoAudit = require('seo-light-audit');

seoAudit({option_setting}, '../path/file.html');
```

## Sample

How to launch the seo-light-audit to audit your html?

```js
const seoAudit = require('seo-light-audit');
const path = require('path');
const userSetting = {
  "keywords":["CHOCO TV","如懿傳"],
  "title.text.keywordRequired":true
}

seoAudit(userSetting, path.join('hello.html'));
```

## Demo

```
npm run demo
```

# Using Guide

The current **seo-light-audit** module contains an initial set of SEO audits which we’re planning in the default setting. Make the audits available by default in this package.
Howerver you can extend the setting by yourself.


There have default setting with "seo-light-audit" module as bellow.

- **keywords** : `{array}`, default is **false**. if you want to assign keywords, just give ['google bot', 'free']
- **meta**, **title**, **strong**, **h1**, **a**, **link**, these are html tag. 
  - Tags has standrad keys : `attributes`, `required`, `text`
  - **attributes** : `{object}`, there have keys is customized by user self that is the name of attributes.  howerver, there have the uniform keys under the attributes name. It is `value`, `required`, `keywordRequired`.
  - **required** : `{boolean}`, **true**: check this tag. **false**: not checking this tag
  - **text** : `{object}`, there have uniform keys : `value`, `required`, `keywordRequired`
- **value**, **required**, **keywordRequired**  
  - **value** : `{array}`, default is **[]**. the checker don't check the value of item whether mating the value on the default state. If assign an list at there, like ['expedia', 'agoda', 'booking'], the checker will be checked the html raw data whether matching the setting.
  - **required** : `{boolean}`, **true**: checking this item. **false**: not checking.
  - **keywordRequired** : `{boolean}`, **true**: checking this content of item whether contain keywords. **false**: not checking

```json
{
  "keywords": false,
  "meta": {
    "attributes": {
      "property": {
        "value": ["og:description", "og:title", "description"],
        "required": true
      },
      "name": {
        "value": ["description"],
        "required": true
      },
      "content": {
        "value": [],
        "required": true,
        "keywordRequired": false
      }
    },
    "required":true
  },
  "title": {
    "attributes":{},
    "text":{
      "value":[],
      "required":true,
      "keywordRequired":false
    },
    "required":true
  },
  "strong": {
    "attributes":{},
    "text":{
      "value":[],
      "required":true,
      "keywordRequired":false
    },
    "required":true
  },
  "h1": {
    "attributes":{},
    "text":{
      "value":[],
      "required":true,
      "keywordRequired":false
    },
    "required":true
  },
  "a": {
    "attributes": {
    },
    "text":{
      "value":[],
      "required":true,
      "keywordRequired":false
    },
    "required":true
  },
  "link": {
    "attributes": {
      "rel": {
        "value": [],
        "required": true
      },
      "hreflang": {
        "value": [],
        "required": true
      }
    },
    "required":true
  },
  "video": {
    "attributes":{
      "src":{
        "value": [],
        "required": true
      },
      "type":{
        "value": [],
        "required": true
      }
    },
    "required":false
  },
  "source":{
    "attributes":{
      "src":{
        "value": [],
        "required": true
      },
      "type":{
        "value": [],
        "required": true
      }
    },
    "required":false
  }
}
```

- User can definition audit settings by self

As Sample

```json
{
  "keywords":["CHOCO TV","NBA"],
  "meta.attributes.property.values":["og:title"],
  "meta.attributes.property.required":false,
  "a.required":false,
  "title.text.keywordRequired":true
}
```