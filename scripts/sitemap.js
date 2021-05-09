const fs = require("fs")
const axios = require("axios")
const globby = require("globby")

const fetchUrl = "https://api.kormelon.cf/post/all"
const YOUR_URL = "https://kormelon.cf"
const getDate = new Date().toISOString()

async function generateSiteMap() {
    const fetchPosts = async () =>
        await axios.get(fetchUrl).then((res) => res.data.postTitleList)

    const pages = await globby([
        "../pages/**/*.tsx",
        "../pages/*.tsx",
        "!../pages/_*.tsx",
        "!../pages/404/*.tsx",
        "!../pages/search/*.tsx",
        "!../pages/login.tsx",
        "!../pages/upload.tsx",
        "!../pages/**/[title].tsx",
        "!../pages/**/[categories].tsx",
    ])

    let posts = await fetchPosts()

    const postList = `
        ${posts
            .map((post) => {
                let title = post.title
                return `
              <url>
                <loc>${`${YOUR_URL}/contents/${title}`}</loc>
                <lastmod>${getDate}</lastmod>
              </url>`
            })
            .join("")}
      `

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${pages
         .map((page) => {
             const path = page
                 .replace("../pages/", "")
                 .replace(".tsx", "")
                 .replace(/\/index/g, "")
             const routePath = path === "index" ? "" : path
             return `
            <url>
              <loc>${YOUR_URL}/${routePath}</loc>
              <lastmod>${getDate}</lastmod>
            </url>
          `
         })
         .join("")}
         ${postList}
      </urlset>
  `

    fs.writeFileSync("./public/sitemap.xml", sitemap)
}

generateSiteMap()
