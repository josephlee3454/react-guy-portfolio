import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Without this, Turbopack walks up past the repo and infers the workspace
  // root from a stray package-lock.json in ~/workspace.
  turbopack: { root: __dirname },
};

export default nextConfig;

// No transpilePackages or optimizePackageImports entry for MUI:
// @mui/material is already in Next 16's default optimizePackageImports list.
