const settings = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_WS_URL: process.env.NEXT_PUBLIC_API_WS_URL,
  NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  // you can set filter for url. example: "/path/image"
  NEXT_PUBLIC_ALLOWED_CACHED_PATHS: ["/groups/panorama/", "/groups/avatar/"],
  CREDENTIALS: "include",
};

export default settings;
