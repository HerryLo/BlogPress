#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
# fd0073ed132eb69233860692ecb5cae8cafa61aa
basepath=$(cd `dirname $0`; pwd)
sourcePath=$basepath'/docs/.vuepress/dist/'

# 遍历html 插入友盟
function fileForEach() {
    for file in `ls $1`
    do 
        if [ -d $1"/"$file ]
        then
            if [ -n "`find $1$file -maxdepth 1 -name '*.html'`" ];
            then
                # echo $1$file"/"*.html
                sed -i '' '/<html/a\
<script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=1277950578&web_id=1277950578"></script><style>body>a{display:none!important;}</style>' $1$file"/"*.html
            fi
        fi
    done
}

echo "开始构建项目"
# 生成静态文件
npm run build
echo "构建完毕"

fileForEach $sourcePath

cd $sourcePath

echo "添加友盟代码"
# ergodic $sourcePath
sed -i '' '/<html/a\ 
<script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=1277950578&web_id=1277950578"></script><style>body>a{display:none!important;}</style>' $sourcePath'/index.html'
echo "添加代码执行完毕"

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:HerryLo/HerryLo.github.io.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git config user.name "HerryLo"
git config user.email "herryloyopai@163.com"

git push -f git@github.com:HerryLo/HerryLo.github.io.git master

# git push -f https://${access_token}@github.com/HerryLo/HerryLo.github.io.git master

cd -