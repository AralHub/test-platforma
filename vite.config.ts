import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			semicolons: false,
			quoteStyle: "double"
		}),
		react(),
		visualizer({
			open: true
		})
	],
	build: {
		target: "esnext"
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src")
		}
	}
})
