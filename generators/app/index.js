/**
 * @index.js
 *
 * @authors zhengmeiyu (zhengmeiyu@baidu.com)
 * @date    2018-04-08 10:16:16
 * @version 1.0.0
 */

'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const moment = require('moment');
const _ = require('lodash');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.props = {
            appName: this.appname.replace(/\s+/g, '-'),
            appDesc: this.appname.replace(/\s+/g, '-'),
            appAuthor: this.user.git.name(),
            appEmail: this.user.git.email(),
            createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            createYear: moment().format('YYYY')
        };
    }

    prompting() {
        this.log(yosay(
            '📻'
        ));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: '应用名称',
            required: true,
            default: this.props.appName
        }, {
            type: 'input',
            name: 'appDesc',
            message: '应用详情',
            required: true,
            default: this.props.appDesc
        }, {
            type: 'input',
            name: 'appAuthor',
            message: '用户名',
            required: true,
            default: this.props.appAuthor
        }, {
            type: 'input',
            name: 'appEmail',
            message: '邮件地址',
            required: true,
            default: this.props.appEmail
        }];

        return this.prompt(prompts).then((props) => {
            this.props = _.merge({}, this.props, props);
        });
    }
    writing() {
        const files = [
            '.babelrc',
            '.editorconfig',
            '.eslintrc.js',
            'gitignore',
            'npmignore',
            'npmrc',
            'CHANGELOG.md',
            'package.json',
            'README.md',
            'TODO.md',
            'src',
            'test'
        ];

        files.forEach((fileName) => {
            // 此处为 npm 默认 ignore
            // 无法自动配置
            // github 上提的 issue 还未解决已被关掉
            // 只能在此处 hack 了
            if (fileName === 'npmrc'
                 || fileName === 'gitignore'
                 || fileName === 'npmignore') {
                this.fs.copyTpl(
                    this.templatePath(fileName),
                    this.destinationPath('.' + fileName),
                    this.props
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath(fileName),
                    this.destinationPath(fileName),
                    this.props
                );
            }
        });
    }
};