#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
basepath=$(cd `dirname $0`; pwd)
sourcePath=$basepath'/docs/.vuepress/dist/'

function ergodic(){
    for file in ` ls $1 `
    do
        if [ -d $1"/"$file ]
        then
            sed -i '' '/<html/a\ 
<script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=1277950578&web_id=1277950578"></script><style>body a {display:none!important;}</style>' index.html

            echo $file
            
            ergodic $1"/"$file
        fi
    done
}

echo "开始构建项目"
# 生成静态文件
npm run build
echo "构建完毕"

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'

echo "添加代码"
ergodic $sourcePath
echo "添加代码执行完毕"

cd $sourcePath
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:HerryLo/HerryLo.github.io.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git config --local user.name "HerryLo"
git config --local user.email "herryloyopai@163.com"

echo "开始上传-----------"
git push -f git@github.com:HerryLo/HerryLo.github.io.git master

echo "上传完毕"
cd -