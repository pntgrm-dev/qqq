import "dotenv/config";

export const fetchArticles = async () => {
    
    const option = {
      url: process.env.API_URL,
      key: process.env.KEY,
      method: "GET",
      json: true,
    };

    try {
        const response = await fetch(option.url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};