import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	route("dns-checker", "routes/dns-checker.tsx"),
	route("whois", "routes/whois.tsx"),
] satisfies RouteConfig