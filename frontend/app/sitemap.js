const URL = "http://localhost:3000";

export default function sitemap() {
    return [
        {
            url: `${URL}/`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/login`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/register`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/chat`,
            lastModified: new Date(),
        },
    ];
}
