window.onload = async () => {
  try {
    const res = await fetch("/articles");
    if (!res.ok) throw new Error("データの取得に失敗しました");
    const articles = await res.json();

    const articleContainer = document.querySelector(".Card");
    if (!articleContainer) return; // コンテナがない場合は処理を中断

    // 記事データが空、または配列でない場合のガード
    if (!articles || !Array.isArray(articles)) {
      console.error("記事データが正しくありません");
      return;
    }

    articles.slice(0, 50).forEach((article) => {
      // 必須データ（タイトル）がない記事はスキップする、または「タイトルなし」にする
      if (!article.title && !article.description) return;

      const articleElement = document.createElement("div");
      articleElement.className = "Article_Item"; // スタイル用にクラスを付与することをお勧めします

      // データがない場合の補完処理
      const title = article.title || "タイトルなし";
      const description = article.description || "";

      // 画像がない場合はそのエリア自体を表示しないための条件分岐
      const imageHTML = article.urlToImage
        ? `<div class="div_image">
             <img class="contentImage" src="${article.urlToImage}" alt="${title}">
           </div>`
        : "";

      articleElement.innerHTML = `
        <h2 class="Card__title">${title}</h2>
        ${description ? `<p>${description}</p>` : ""}
        ${imageHTML}
      `;

      articleContainer.appendChild(articleElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
