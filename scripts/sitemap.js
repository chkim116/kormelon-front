const fs = require('fs');
const axios = require('axios');
const globby = require('globby');

const fetchUrl = 'https://api.kormelon.com/post/all';
const YOUR_URL = 'https://kormelon.com';
const getDate = new Date().toISOString();

async function generateSiteMap() {
  const fetchPosts = async () => await axios.get(fetchUrl).then((res) => res.data.postTitleList);
  const pages = await globby([
    '../pages/**/*.tsx',
    '../pages/*.tsx',
    '!../pages/_*.tsx',
    '!../pages/404/*.tsx',
    '!../pages/search/*.tsx',
    '!../pages/login.tsx',
    '!../pages/write.tsx',
    '!../pages/**/[title].tsx',
    '!../pages/**/[categories].tsx',
  ]);

  let posts = await fetchPosts();

  const postList = `
        ${posts
          .map((post) => {
            return `
              <url>
                <loc>${`${YOUR_URL}/contents/${post}`}</loc>
                  <changefreq>weekly</changefreq>
                  <priority>0.7</priority>
                <lastmod>${getDate}</lastmod>
              </url>`;
          })
          .join('')}
      `;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${pages
       .map((page) => {
         const path = page
           .replace('../pages/', '')
           .replace('.tsx', '')
           .replace(/\/index/g, '');
         const routePath = path === 'index' ? '' : path;
         return `
            <url>
              <loc>${YOUR_URL}/${routePath}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
              <lastmod>${getDate}</lastmod>
            </url>
          `;
       })
       .join('')}
         ${postList}
      </urlset>
  `;

  fs.writeFileSync('./public/sitemap.xml', sitemap);
}

generateSiteMap();
