#!/usr/bin/env sh

# https://www.sojson.com/robots/ 生成Robots.txt
# https://www.xml-sitemaps.com/  生成sitemap.xml站点地图

# 确保脚本抛出遇到的错误
set -e
# fd0073ed132eb69233860692ecb5cae8cafa61aa
basepath=$(cd `dirname $0`; pwd)
sourcePath=$basepath'/docs/.vuepress/dist/'

echo "开始构建项目"
# 生成静态文件
npm run build
echo "构建完毕"

cd $sourcePath

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git config user.name "HerryLo"
git config user.email "herryloyopai@163.com"
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:HerryLo/HerryLo.github.io.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:HerryLo/HerryLo.github.io.git master

# git push -f https://${access_token}@github.com/HerryLo/HerryLo.github.io.git master

cd -