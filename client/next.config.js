/** @type {import('next').NextConfig} */

const path = require("path")

const basePath = "/good-feeds"

// IS_DEPLOY determines whether or not the dist bundle should include
// the basePath. This is not required on Github Pages as the files are
// hosted at the basePath (assuming basePath matches repo name)
const distDir = process.env.IS_DEPLOY ? "dist" : path.join("dist", basePath)

const nextConfig = {
  output: "export",
  basePath,
  distDir,
  // Force trailing slashes to prevent 404 when accessing index route on Github Pages
  trailingSlash: true,
}

module.exports = nextConfig
